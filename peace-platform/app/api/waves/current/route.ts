import { NextResponse } from 'next/server';
import { getStore } from '@/lib/db/memory-store';

export async function GET() {
  try {
    const store = getStore();
    const currentWave = await store.getCurrentWave();
    const users = await store.getUsersByWave(currentWave.waveNumber);

    return NextResponse.json({
      success: true,
      wave: {
        ...currentWave,
        totalMembers: users.length,
        activeMembers: users.filter((u) => u.inviteCount < 2).length,
        progressPercentage: (users.length / currentWave.targetSize) * 100,
      },
    });
  } catch (error) {
    console.error('Get current wave error:', error);
    return NextResponse.json(
      {
        error: 'Failed to get current wave',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
