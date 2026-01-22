// Simple in-memory store for development
// TODO: Replace with MongoDB/PostgreSQL for production

import { User, Team, WaveData, DiscordGroup, Release } from '../types';

class MemoryStore {
  private users: Map<string, User> = new Map();
  private teams: Map<string, Team> = new Map();
  private waves: Map<number, WaveData> = new Map();
  private discordGroups: Map<string, DiscordGroup> = new Map();
  private releases: Map<string, Release> = new Map();
  private inviteCodes: Map<string, { userId: string; used: boolean }> = new Map();

  // Users
  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newUser: User = {
      ...user,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, newUser);
    return newUser;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return Array.from(this.users.values()).find((u) => u.email === email) || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return Array.from(this.users.values()).find((u) => u.username === username) || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;

    const updated = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updated);
    return updated;
  }

  async getUsersByWave(wave: number): Promise<User[]> {
    return Array.from(this.users.values()).filter((u) => u.wave === wave);
  }

  // Teams
  async createTeam(team: Omit<Team, 'id' | 'createdAt'>): Promise<Team> {
    const id = `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newTeam: Team = {
      ...team,
      id,
      createdAt: new Date(),
    };
    this.teams.set(id, newTeam);
    return newTeam;
  }

  async getTeamById(id: string): Promise<Team | null> {
    return this.teams.get(id) || null;
  }

  async getAllTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async getTeamsByMember(userId: string): Promise<Team[]> {
    return Array.from(this.teams.values()).filter((t) =>
      t.members.some((m) => m.userId === userId)
    );
  }

  async updateTeam(id: string, updates: Partial<Team>): Promise<Team | null> {
    const team = this.teams.get(id);
    if (!team) return null;

    const updated = { ...team, ...updates };
    this.teams.set(id, updated);
    return updated;
  }

  // Waves
  async getWaveData(waveNumber: number): Promise<WaveData | null> {
    return this.waves.get(waveNumber) || null;
  }

  async getCurrentWave(): Promise<WaveData> {
    const waves = Array.from(this.waves.values());
    if (waves.length === 0) {
      // Initialize wave 1
      const wave1: WaveData = {
        waveNumber: 1,
        totalMembers: 0,
        activeMembers: 0,
        startDate: new Date(),
        targetSize: 4, // 2 people, each invite 2
      };
      this.waves.set(1, wave1);
      return wave1;
    }
    return waves[waves.length - 1];
  }

  async updateWaveData(waveNumber: number, data: Partial<WaveData>): Promise<WaveData> {
    const existing = this.waves.get(waveNumber) || {
      waveNumber,
      totalMembers: 0,
      activeMembers: 0,
      startDate: new Date(),
      targetSize: Math.pow(2, waveNumber + 1),
    };

    const updated = { ...existing, ...data };
    this.waves.set(waveNumber, updated);
    return updated;
  }

  // Discord Groups
  async createDiscordGroup(group: Omit<DiscordGroup, 'id'>): Promise<DiscordGroup> {
    const id = `discord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newGroup: DiscordGroup = { ...group, id };
    this.discordGroups.set(id, newGroup);
    return newGroup;
  }

  async getDiscordGroupByChannelId(channelId: string): Promise<DiscordGroup | null> {
    return (
      Array.from(this.discordGroups.values()).find((g) => g.channelId === channelId) || null
    );
  }

  // Releases
  async createRelease(release: Omit<Release, 'id'>): Promise<Release> {
    const id = `release_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newRelease: Release = { ...release, id };
    this.releases.set(id, newRelease);
    return newRelease;
  }

  async getAllReleases(): Promise<Release[]> {
    return Array.from(this.releases.values());
  }

  async getUpcomingReleases(): Promise<Release[]> {
    const now = new Date();
    return Array.from(this.releases.values())
      .filter((r) => r.scheduledDate > now && r.status !== 'released')
      .sort((a, b) => a.scheduledDate.getTime() - b.scheduledDate.getTime());
  }
}

// Singleton instance
let store: MemoryStore;

export function getStore(): MemoryStore {
  if (!store) {
    store = new MemoryStore();
  }
  return store;
}
