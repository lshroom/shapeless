import { GoogleGenerativeAI } from '@google/generative-ai';
import { ModerationRequest, ModerationResult } from '../types';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

const MODERATION_PROMPT = `You are a content moderator for a peace-building platform connecting Israeli and Palestinian musicians.

Your role is to ensure discussions remain constructive, peaceful, and focused on collaboration.

APPROVE content that:
- Promotes peace, understanding, and dialogue
- Discusses music, art, and creative collaboration
- Shares personal stories with respect
- Asks genuine questions to learn
- Expresses emotions constructively

FLAG content that:
- Contains hate speech, threats, or incitement to violence
- Promotes dehumanization of any group
- Spreads misinformation about conflicts
- Uses inflammatory language or insults
- Attempts to derail peaceful discussions

For borderline cases, err on the side of approval but suggest improvements.

Respond in JSON format:
{
  "approved": boolean,
  "confidence": number (0-100),
  "reason": "brief explanation",
  "suggestions": ["improvement suggestions if applicable"],
  "flagged": boolean,
  "requiresHumanReview": boolean
}`;

export async function moderateWithGemini(
  request: ModerationRequest
): Promise<ModerationResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `${MODERATION_PROMPT}

Context: ${request.context}
User Content: "${request.content}"

Provide moderation decision:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Gemini');
    }

    const moderation: ModerationResult = JSON.parse(jsonMatch[0]);

    // If Gemini flags for human review or has low confidence, escalate to Claude
    if (moderation.requiresHumanReview || moderation.confidence < 70) {
      moderation.requiresHumanReview = true;
    }

    return moderation;
  } catch (error) {
    console.error('Gemini moderation error:', error);
    // On error, flag for human review
    return {
      approved: false,
      confidence: 0,
      reason: 'Moderation system error',
      flagged: true,
      requiresHumanReview: true,
    };
  }
}

export async function bulkModerateWithGemini(
  requests: ModerationRequest[]
): Promise<ModerationResult[]> {
  // Process in batches for efficiency
  const results = await Promise.all(
    requests.map((request) => moderateWithGemini(request))
  );
  return results;
}
