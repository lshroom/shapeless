// User types
export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  passwordHash?: string;
  avatar?: string;
  expertise: string[];
  bio?: string;
  location?: string;
  invitedBy?: string;
  wave: number;
  inviteCount: number;
  discordId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Wave tracking
export interface WaveData {
  waveNumber: number;
  totalMembers: number;
  activeMembers: number;
  startDate: Date;
  targetSize: number;
}

// Team types
export interface Team {
  id: string;
  name: string;
  description: string;
  genre: string;
  members: TeamMember[];
  leader: string;
  projectStatus: 'forming' | 'creating' | 'ready' | 'released';
  createdAt: Date;
}

export interface TeamMember {
  userId: string;
  role: string;
  expertise: string[];
  joinedAt: Date;
}

// Moderation types
export interface ModerationRequest {
  content: string;
  userId: string;
  context: 'chat' | 'post' | 'comment';
  discordChannelId?: string;
}

export interface ModerationResult {
  approved: boolean;
  confidence: number;
  reason?: string;
  suggestions?: string[];
  flagged: boolean;
  requiresHumanReview: boolean;
}

// Discord types
export interface DiscordGroup {
  id: string;
  name: string;
  channelId: string;
  wave: number;
  memberCount: number;
  moderationLevel: 'gemini' | 'claude' | 'both';
}

// Release coordination
export interface Release {
  id: string;
  title: string;
  description: string;
  scheduledDate: Date;
  teams: string[];
  content: ReleaseContent[];
  status: 'scheduled' | 'ready' | 'released';
}

export interface ReleaseContent {
  teamId: string;
  type: 'music' | 'video' | 'art' | 'message';
  url?: string;
  metadata: Record<string, any>;
}
