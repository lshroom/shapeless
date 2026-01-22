import Anthropic from '@anthropic-ai/sdk';
import { ModerationRequest, ModerationResult } from '../types';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const CLAUDE_MODERATION_PROMPT = `You are the final-layer content moderator for a peace-building platform connecting Israeli and Palestinian musicians.

This content has been flagged for nuanced review. Your role is to make the final decision with deep understanding of:
- Cultural sensitivities and historical context
- The difference between expressing pain/grief vs promoting hatred
- Constructive criticism vs inflammatory rhetoric
- The importance of allowing difficult conversations while maintaining safety

Guidelines:
- Allow expressions of personal pain, loss, and frustration when expressed respectfully
- Distinguish between criticizing actions/policies vs dehumanizing people
- Consider intent and context, not just keywords
- Support genuine dialogue even when uncomfortable
- Block only clear violations: hate speech, threats, incitement, dehumanization

Respond in JSON format:
{
  "approved": boolean,
  "confidence": number (0-100),
  "reason": "detailed nuanced explanation",
  "suggestions": ["specific constructive feedback"],
  "flagged": boolean,
  "requiresHumanReview": boolean
}`;

export async function moderateWithClaude(
  request: ModerationRequest,
  geminiResult?: ModerationResult
): Promise<ModerationResult> {
  try {
    const contextInfo = geminiResult
      ? `\n\nPrevious Gemini Analysis:\nApproved: ${geminiResult.approved}\nConfidence: ${geminiResult.confidence}%\nReason: ${geminiResult.reason}`
      : '';

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `${CLAUDE_MODERATION_PROMPT}

Context: ${request.context}
User ID: ${request.userId}${contextInfo}

User Content:
"${request.content}"

Provide your final moderation decision:`,
        },
      ],
    });

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Claude');
    }

    const moderation: ModerationResult = JSON.parse(jsonMatch[0]);

    return moderation;
  } catch (error) {
    console.error('Claude moderation error:', error);
    // On error, flag for human review
    return {
      approved: false,
      confidence: 0,
      reason: 'Final moderation system error - requires human review',
      flagged: true,
      requiresHumanReview: true,
    };
  }
}

export async function hybridModerate(
  request: ModerationRequest
): Promise<ModerationResult> {
  // First pass: Gemini (fast, bulk moderation)
  const { moderateWithGemini } = await import('./gemini-moderator');
  const geminiResult = await moderateWithGemini(request);

  // If Gemini is confident and approves, accept
  if (geminiResult.approved && geminiResult.confidence >= 85 && !geminiResult.flagged) {
    return geminiResult;
  }

  // Otherwise, escalate to Claude for nuanced review
  const claudeResult = await moderateWithClaude(request, geminiResult);

  return claudeResult;
}
