# Peace Platform 🕊️🎵

A Next.js-based platform for collaborative music creation and community building between Israeli and Palestinian artists, promoting peace through creative expression.

## 🌟 Features

### 🎥 Video Composite Mixer
- Multi-layer video compositing with VDO.Ninja integration
- Real-time director controls (opacity, blend modes, filters)
- Keyboard shortcuts for live production
- Embeddable in external websites (Wix, WordPress, etc.)

### 🎵 SonoBus Session Manager
- Browse and create collaborative audio sessions
- One-click connection details with copy functionality
- Integration with SonoBus for ultra-low-latency audio
- Perfect for remote music collaboration

### 🌊 Wave-Based Growth System
- Exponential community growth tracking (each member invites 2)
- Real-time progress visualization
- Wave milestones and celebrations
- Gamified onboarding experience

### 🤖 AI-Powered Moderation
- **Gemini (Google AI)**: Fast bulk moderation for routine content
- **Claude (Anthropic)**: Nuanced final-layer review for sensitive topics
- Hybrid approach balancing speed and accuracy
- Peace-focused guidelines with cultural sensitivity

### 👥 Team Management
- Expertise-based matching
- Collaborative project spaces
- Music genre and skill filtering
- Team formation for wave-based releases

### 📅 Coordinated Releases
- Schedule synchronized content drops
- Multi-team collaboration
- "Mega wave" awareness campaigns
- Built-in countdown and coordination tools

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Google AI API key (Gemini - free for nonprofits)
- Anthropic API key (Claude)
- Discord Bot Token (optional, for Discord integration)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/shapeless.git
cd shapeless/peace-platform

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env and add your API keys
nano .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Environment Variables

```env
GOOGLE_AI_API_KEY=your_google_ai_key      # Get from Google AI Studio
ANTHROPIC_API_KEY=your_anthropic_key      # Get from Anthropic Console
DISCORD_BOT_TOKEN=your_discord_token      # Optional
JWT_SECRET=your_random_secret             # Generate random string
```

## 📦 Project Structure

```
peace-platform/
├── app/
│   ├── api/                    # Next.js API routes
│   │   ├── moderation/         # AI moderation endpoints
│   │   ├── waves/              # Wave tracking
│   │   ├── users/              # User management
│   │   └── teams/              # Team coordination
│   ├── embed/                  # Embeddable components
│   │   ├── video-composite/    # Video mixer embed
│   │   └── sonobus/            # SonoBus embed
│   ├── page.tsx                # Main landing page
│   └── layout.tsx              # Root layout
├── components/
│   ├── video-composite/        # Video compositing components
│   ├── sonobus/                # SonoBus components
│   └── waves/                  # Wave tracking components
├── lib/
│   ├── ai/                     # AI moderation logic
│   │   ├── gemini-moderator.ts
│   │   └── claude-moderator.ts
│   ├── db/                     # Database utilities
│   └── types.ts                # TypeScript types
└── public/                     # Static assets
```

## 🎨 Key Components

### Video Composite (`/embed/video-composite`)

Multi-layer video mixer with full director controls:

```tsx
import { VideoComposite } from '@/components/video-composite';

<VideoComposite
  roomName="shapeless"
  defaultParticipants={[
    { id: 'shapeless-kitchen', name: 'Kitchen Stream' }
  ]}
  sonobusUrl="sonobus://join/shapeless"
/>
```

### SonoBus Manager (`/embed/sonobus`)

Session browser and connection manager:

```tsx
import { SonobusManager } from '@/components/sonobus';

<SonobusManager />
```

### Wave Tracker

Growth visualization component:

```tsx
import WaveTracker from '@/components/waves/WaveTracker';

<WaveTracker />
```

## 🔌 API Endpoints

### Moderation

```bash
# Single moderation request
POST /api/moderation
{
  "content": "Message to moderate",
  "userId": "user_123",
  "context": "chat",
  "mode": "hybrid"  # gemini | claude | hybrid
}

# Bulk moderation
PUT /api/moderation
{
  "requests": [...]
}
```

### Wave Tracking

```bash
# Get current wave
GET /api/waves/current
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/shapeless)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 🎯 Wix Integration

The platform is designed to embed seamlessly into Wix websites:

1. Deploy to Vercel
2. Copy embed URL (e.g., `https://yourapp.vercel.app/embed/video-composite`)
3. In Wix: Add → Embed → HTML iframe
4. Paste embed code

**See [WIX_EMBED_GUIDE.md](./WIX_EMBED_GUIDE.md) for detailed instructions.**

## 🤝 How the Movement Works

1. **Wave 1**: 2 founding members each invite 2 people → 4 total
2. **Wave 2**: Each of those 4 invite 2 more → 8 total
3. **Wave 3**: 16 members
4. **Wave 4**: 32 members
5. Continue exponentially...

Each wave forms teams based on expertise (musicians, producers, artists, etc.).
Teams collaborate on creative projects.
When ready, all teams release content simultaneously for maximum impact.

## 🔒 Moderation Strategy

### Two-Layer System

1. **Gemini (Fast Layer)**
   - Processes all content initially
   - Handles clear-cut cases
   - Free/cheap via Google for Nonprofits
   - ~85% of moderation resolved here

2. **Claude (Nuanced Layer)**
   - Handles flagged content
   - Cultural sensitivity and context
   - Distinguishes pain from hate
   - Final human-like judgment

### Guidelines

✅ **Encouraged:**
- Music collaboration
- Personal stories
- Cultural sharing
- Constructive dialogue
- Creative expression

❌ **Blocked:**
- Hate speech
- Dehumanization
- Threats/violence
- Inflammatory rhetoric
- Misinformation

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **AI**: Google Gemini (bulk), Anthropic Claude (nuanced)
- **Video**: VDO.Ninja integration
- **Audio**: SonoBus integration
- **Deployment**: Vercel
- **Database**: In-memory (dev), PostgreSQL/MongoDB (production)

## 📊 Roadmap

- [x] Video composite mixer
- [x] SonoBus session manager
- [x] Wave tracking system
- [x] AI moderation (Gemini + Claude)
- [x] Vercel deployment config
- [x] Wix embedding
- [ ] Discord bot integration
- [ ] User authentication
- [ ] Team management dashboard
- [ ] Release coordination system
- [ ] Mobile app (React Native)
- [ ] Real-time chat
- [ ] Database integration (PostgreSQL)

## 🤲 Contributing

We welcome contributions! This is a peace-building project - all collaborators commit to respectful, constructive engagement.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 💖 Support

This is a nonprofit peace initiative. If you'd like to support:

- 🌟 Star the repository
- 📢 Share with others
- 🎵 Join as a collaborator
- 💰 Donate (link to your NGO donation page)

## 📞 Contact

- Website: [your-wix-site.com]
- Email: [your-email]
- Discord: [your-discord]
- GitHub: [your-github]

---

Made with ❤️ for peace through music 🎵🕊️
