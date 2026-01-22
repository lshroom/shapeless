import { NextRequest, NextResponse } from 'next/server';
import { hybridModerate } from '@/lib/ai/claude-moderator';
import { moderateWithGemini } from '@/lib/ai/gemini-moderator';
import { ModerationRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: ModerationRequest & { mode?: 'gemini' | 'claude' | 'hybrid' } = await request.json();

    const { content, userId, context, discordChannelId, mode = 'hybrid' } = body;

    if (!content || !userId || !context) {
      return NextResponse.json(
        { error: 'Missing required fields: content, userId, context' },
        { status: 400 }
      );
    }

    const moderationRequest: ModerationRequest = {
      content,
      userId,
      context,
      discordChannelId,
    };

    let result;

    switch (mode) {
      case 'gemini':
        result = await moderateWithGemini(moderationRequest);
        break;
      case 'claude':
        const { moderateWithClaude } = await import('@/lib/ai/claude-moderator');
        result = await moderateWithClaude(moderationRequest);
        break;
      case 'hybrid':
      default:
        result = await hybridModerate(moderationRequest);
        break;
    }

    return NextResponse.json({
      success: true,
      moderation: result,
      mode,
    });
  } catch (error) {
    console.error('Moderation API error:', error);
    return NextResponse.json(
      {
        error: 'Moderation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Batch moderation endpoint
export async function PUT(request: NextRequest) {
  try {
    const { requests }: { requests: ModerationRequest[] } = await request.json();

    if (!Array.isArray(requests) || requests.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or empty requests array' },
        { status: 400 }
      );
    }

    // Use Gemini for bulk moderation (faster, cheaper)
    const results = await Promise.all(
      requests.map((req) => moderateWithGemini(req))
    );

    // Identify items needing Claude review
    const needsClaudeReview = results
      .map((result, index) => ({ result, index }))
      .filter(({ result }) => result.requiresHumanReview || result.confidence < 70);

    return NextResponse.json({
      success: true,
      results,
      needsClaudeReview: needsClaudeReview.map(({ index }) => index),
      stats: {
        total: results.length,
        approved: results.filter((r) => r.approved).length,
        flagged: results.filter((r) => r.flagged).length,
        needsReview: needsClaudeReview.length,
      },
    });
  } catch (error) {
    console.error('Bulk moderation API error:', error);
    return NextResponse.json(
      {
        error: 'Bulk moderation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
