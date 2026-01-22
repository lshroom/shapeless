export interface SonobusSession {
  id: string;
  name: string;
  host: string;
  port: number;
  password?: string;
  genre: string;
  participants: number;
  maxParticipants: number;
  isActive: boolean;
  createdAt: Date;
}

export interface ConnectionDetails {
  serverAddress: string;
  groupName: string;
  password?: string;
  audioQuality: 'low' | 'medium' | 'high' | 'ultra';
  bufferTime: number;
}
