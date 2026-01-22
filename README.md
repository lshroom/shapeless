# 🏴‍☠️ Shapeless Peace Movement Platform

A decentralized platform for creating collaborative music for peace in Israel and Palestine.

## 🌊 Vision

We believe that music transcends borders and brings people together. Through collaborative music creation, AI-moderated communities, and viral growth mechanics, we're building a wave of peace that can't be ignored.

## 📁 Platform Structure

```
shapeless/
├── index.html                  # Main composite music tool (landing page)
├── peace-platform.html         # Movement landing page and information
├── join-movement.html          # Join the movement with referral tracking
├── join.html                   # Join VDO.ninja session (music collaboration)
├── dashboard.html              # Team dashboard for members
├── composite.html              # Composite music creation tool
├── video-composite.html        # Video composite tool
├── DISCORD_AI_MODERATION.md    # Discord AI bot documentation
├── vercel.json                 # Vercel deployment config
└── README.md                   # This file
```

## 🎯 Core Features

### 1. Collaborative Music Creation
- Real-time video composite tool using VDO.ninja
- Multiple video streams layered with blend modes
- Controls for opacity and visual effects
- Perfect for remote jam sessions

### 2. Peace Movement Platform
- Landing page explaining the movement vision
- Team-based collaboration structure
- AI-moderated Discord communities
- Viral growth through referral system

### 3. Team Dashboard
- Track your team's progress
- Monitor wave countdown
- Manage invites and referrals
- View activity feed
- Quick actions for collaboration

### 4. Referral & Growth System
- Each member invites 2 people per week
- Exponential growth tracking
- Network visualization
- Automated referral link generation

### 5. AI-Moderated Discord
- Real-time message moderation
- Peaceful dialogue enforcement
- Automatic handling of violations
- Positive reinforcement system

## 🚀 Quick Start

### For Members

1. **Join the Movement**
   - Visit `/peace-platform.html` to learn about the movement
   - Click "Join Now" to sign up with referral tracking
   - Fill out the join form with your information

2. **Access Your Dashboard**
   - Go to `/dashboard.html` to see your team
   - View wave countdown and progress
   - Get your unique invite link

3. **Start Creating Music**
   - Use `/composite.html` for music collaboration
   - Join your team's VDO.ninja room
   - Collaborate in real-time with layered video/audio

4. **Invite Others**
   - Share your referral link
   - Goal: 2 people per week
   - Track your network growth

### For Administrators

1. **Set Up Discord Bot**
   - Follow instructions in `DISCORD_AI_MODERATION.md`
   - Configure OpenAI or Anthropic API
   - Deploy bot to server

2. **Configure Teams**
   - Assign new members to teams (5-10 people)
   - Create Discord channels for each team
   - Set up VDO.ninja rooms

3. **Monitor Wave Progress**
   - Track team completion rates
   - Set launch date for coordinated release
   - Prepare marketing materials

## 🎵 How It Works

### The Viral Growth Model

```
Week 0: 1 person (you)
Week 1: 3 people (you + 2 invites)
Week 2: 9 people (each invites 2)
Week 3: 27 people
Week 4: 81 people
Week 8: 6,561 people
Week 12: 531,441 people
```

This exponential growth allows the movement to scale rapidly while maintaining quality through small team structures.

### The Wave Launch

1. **Preparation Phase** (Weeks 1-8)
   - Teams form and begin collaboration
   - Music creation and recording
   - Community building

2. **Completion Phase** (Weeks 9-12)
   - Finalize tracks
   - Coordinate with other teams
   - Prepare for launch

3. **Launch Day**
   - All teams release simultaneously
   - Flood social media with music for peace
   - Invite global audience to join movement

4. **Next Wave**
   - Prepare for Wave 2 with even more teams
   - Continuous growth and impact

## 🛠️ Technical Setup

### Prerequisites
- Node.js (for local development)
- Vercel account (for deployment)
- OpenAI or Anthropic API key (for Discord bot)
- Discord server

### Local Development

```bash
# Serve locally
python -m http.server 8000

# Or use any static server
npx serve

# Access at http://localhost:8000
```

### Vercel Deployment

The platform is configured for Vercel:

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

Deploy:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo to Vercel for auto-deployment
```

### Discord Bot Setup

1. Create bot on Discord Developer Portal
2. Install dependencies: `pip install discord.py openai anthropic`
3. Set environment variables in `.env`
4. Run: `python discord_bot.py`
5. Deploy to Railway, Heroku, or AWS for 24/7 uptime

See `DISCORD_AI_MODERATION.md` for detailed instructions.

## 📊 Analytics & Tracking

### Growth Metrics
- New members per week
- Referral conversion rate
- Network size
- Active teams

### Engagement Metrics
- Discord activity
- Music sessions per team
- Completion rate
- Time to wave launch

### Impact Metrics
- Social media reach on launch day
- Press coverage
- New members from wave launch
- Continued engagement post-launch

## 🔐 Privacy & Security

- No personal data stored beyond necessary contact info
- Referral codes anonymized
- Discord messages not logged (except for moderation)
- GDPR compliant
- Option to delete account and all data

## 🌍 Internationalization

Future support for:
- Hebrew (עברית)
- Arabic (العربية)
- English
- Auto-translation in Discord
- Multi-language landing pages

## 🤝 Community Guidelines

1. **Respect**: Treat all members with dignity
2. **Collaboration**: Work together, not against
3. **Peace**: All actions support peace-building
4. **Creativity**: Express yourself through music
5. **Growth**: Invite others to expand the movement

## 📞 Support & Contact

- Discord: [Join our server]
- Email: contact@shapeless.org (setup needed)
- Issues: GitHub issues for technical problems

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Basic platform infrastructure
- ✅ Composite music tool
- ✅ Landing pages
- ✅ Dashboard
- ✅ Referral system
- ⏳ Discord AI moderation

### Phase 2
- [ ] Backend API for user management
- [ ] Database for tracking referrals
- [ ] Automated email system
- [ ] Team matching algorithm
- [ ] Wave coordination tools

### Phase 3
- [ ] Mobile app
- [ ] Advanced music collaboration tools
- [ ] Live streaming for wave launch
- [ ] Press kit and media outreach
- [ ] Partnerships with peace organizations

### Phase 4
- [ ] Global expansion
- [ ] Multi-language support
- [ ] Regional wave launches
- [ ] Documentary filming
- [ ] Impact measurement

## 💡 Contributing

This is a peace-building initiative. Contributions welcome!

**Areas needing help:**
- Frontend development
- Backend/API development
- Discord bot enhancement
- Design and UX
- Content creation
- Community moderation
- Translation
- Marketing and outreach

## 📜 License

Open source for peace-building initiatives.

MIT License - feel free to fork and adapt for similar causes.

## 🙏 Acknowledgments

Built with:
- VDO.ninja for video collaboration
- Discord for community
- OpenAI/Anthropic for AI moderation
- Vercel for hosting

Inspired by movements for peace worldwide.

## 🎯 Success Metrics

We'll know we're successful when:
- ✓ Thousands of people creating music together
- ✓ Cross-border collaborations happening daily
- ✓ Wave launches creating global awareness
- ✓ Measurable impact on peace dialogue
- ✓ Self-sustaining growth
- ✓ Positive media coverage
- ✓ Real-world peace initiatives spawned

---

**Remember**: Music knows no borders. Peace knows no limits.

🏴‍☠️🕊️ Together we create the wave.

## URL Structure

- `/` - Composite music tool (main entry point)
- `/peace-platform.html` - Learn about the movement
- `/join-movement.html` - Sign up with referral tracking
- `/dashboard.html` - Member dashboard
- `/composite.html` - Music collaboration tool
- `/video-composite.html` - Alternative video composite
- `/join.html` - VDO.ninja session join page

## Environment Variables Needed

For Discord Bot:
```
DISCORD_BOT_TOKEN=your_bot_token
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
ADMIN_CHANNEL_ID=your_admin_channel_id
```

For Backend (future):
```
DATABASE_URL=postgresql://...
JWT_SECRET=random_secret_key
SENDGRID_API_KEY=for_emails
STRIPE_KEY=for_donations (optional)
```

## Next Steps for Development

1. **Set up database** (PostgreSQL or MongoDB)
2. **Build API** (Node.js/Express or Python/FastAPI)
3. **Deploy Discord bot**
4. **Set up email service** (SendGrid)
5. **Create admin panel**
6. **Launch beta with initial teams**
7. **Iterate based on feedback**
8. **Prepare for Wave 1 launch**

---

Let's build peace through music! 🌊🎵🕊️
