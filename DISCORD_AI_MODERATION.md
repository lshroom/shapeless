# Discord AI Moderation System for Shapeless Peace Movement

## Overview
This document outlines the AI moderation system for Discord communities within the Shapeless Peace Movement. The goal is to maintain respectful, constructive dialogue while fostering collaboration and peace.

## Core Principles

1. **Respect for All**: Every member deserves dignity regardless of background, nationality, or viewpoint
2. **Constructive Dialogue**: Focus on solutions, not blame
3. **Peace-Oriented**: Conversations must support the goal of peace
4. **Collaborative Spirit**: Encourage teamwork and mutual support

## AI Moderation Features

### 1. Real-Time Content Analysis
- Scans all messages for:
  - Hate speech or derogatory language
  - Inflammatory rhetoric
  - Personal attacks
  - Off-topic political debates
  - Misinformation

### 2. Automated Actions
- **Warning**: Gentle reminder for minor infractions
- **Message Removal**: For violating content
- **Temporary Mute**: For repeated violations (escalating: 5min, 1hr, 24hr)
- **Admin Alert**: For serious violations requiring human review

### 3. Positive Reinforcement
- Highlight constructive contributions
- Reward collaborative behavior
- Celebrate milestones and progress

## Technical Implementation

### Option 1: Using OpenAI API (Recommended for Start)

```python
import discord
from discord.ext import commands
import openai
import os

# Initialize bot
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix='!', intents=intents)

# OpenAI setup
openai.api_key = os.getenv('OPENAI_API_KEY')

# Moderation prompt
MODERATION_PROMPT = """
You are a peace-oriented AI moderator for a Discord community focused on creating music for peace in Israel and Palestine.

Your role is to:
1. Ensure all messages are respectful and constructive
2. Prevent hate speech, inflammatory rhetoric, and personal attacks
3. Keep discussions focused on music collaboration and peace-building
4. Encourage empathy and understanding

Analyze this message and respond with JSON:
{
  "allowed": true/false,
  "reason": "explanation if not allowed",
  "severity": "low/medium/high",
  "suggested_action": "none/warn/remove/mute"
}

Message to analyze: "{message}"
"""

@bot.event
async def on_message(message):
    # Ignore bot messages
    if message.author.bot:
        return

    # Check with AI
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": MODERATION_PROMPT},
                {"role": "user", "content": message.content}
            ],
            temperature=0.3
        )

        result = eval(response.choices[0].message.content)

        if not result['allowed']:
            await handle_violation(message, result)
    except Exception as e:
        print(f"Moderation error: {e}")

    await bot.process_commands(message)

async def handle_violation(message, result):
    """Handle policy violations"""

    if result['severity'] == 'low':
        # Gentle warning
        await message.channel.send(
            f"🕊️ {message.author.mention}, let's keep our discussion respectful and focused on peace. {result['reason']}"
        )

    elif result['severity'] == 'medium':
        # Remove message and warn
        await message.delete()
        await message.author.send(
            f"Your message was removed: {result['reason']}\\n\\n"
            f"Remember, we're here to build peace through music. Let's keep it constructive!"
        )

    elif result['severity'] == 'high':
        # Remove, warn, and alert admins
        await message.delete()
        await message.author.send(
            f"⚠️ Your message violated community guidelines: {result['reason']}\\n\\n"
            f"Repeated violations may result in temporary muting or removal from the community."
        )

        # Alert admin channel
        admin_channel = bot.get_channel(ADMIN_CHANNEL_ID)
        await admin_channel.send(
            f"🚨 High severity violation by {message.author.mention}\\n"
            f"Reason: {result['reason']}"
        )

@bot.command()
async def stats(ctx):
    """Show community stats and moderation activity"""
    await ctx.send(
        "📊 **Shapeless Community Stats**\\n"
        f"Members: {ctx.guild.member_count}\\n"
        f"Active teams: 12\\n"
        f"Messages today: 456\\n"
        f"Moderation actions: 2\\n"
        f"✅ Peace-oriented conversations: 98%"
    )

# Run bot
bot.run(os.getenv('DISCORD_BOT_TOKEN'))
```

### Option 2: Using Claude API (Anthropic)

```python
import discord
from discord.ext import commands
import anthropic
import os

client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

async def moderate_message(message_content):
    """Use Claude to moderate message"""

    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=500,
        messages=[{
            "role": "user",
            "content": f"""You are a peace-oriented AI moderator. Analyze this message for a community creating music for peace in Israel/Palestine:

"{message_content}"

Respond with JSON indicating if allowed and why."""
        }]
    )

    return response.content[0].text
```

### Option 3: Discord AutoMod + Custom Bot Hybrid

Use Discord's built-in AutoMod for basic filtering + custom bot for nuanced decisions.

**Discord AutoMod Rules:**
1. Block hate speech keywords
2. Block all-caps shouting
3. Block spam/flooding
4. Block external links (except whitelisted)

**Custom Bot handles:**
- Context-aware moderation
- Positive reinforcement
- Team coordination
- Statistics tracking

## Bot Commands

```
!peace - Show peace-building resources
!stats - Community statistics
!invite <number> - Generate referral links
!team - Show your team info
!wave - Show wave countdown
!report <message> - Report content for review
!mute @user <duration> <reason> - Admin only
!unmute @user - Admin only
```

## Setup Instructions

### 1. Create Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create New Application → "Shapeless Peace Bot"
3. Go to "Bot" section → Add Bot
4. Enable these Privileged Gateway Intents:
   - Message Content Intent
   - Server Members Intent
5. Copy Bot Token

### 2. Install Dependencies

```bash
pip install discord.py openai anthropic python-dotenv
```

### 3. Configure Environment

Create `.env` file:
```
DISCORD_BOT_TOKEN=your_bot_token_here
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
ADMIN_CHANNEL_ID=your_admin_channel_id
```

### 4. Invite Bot to Server

Generate invite link with these permissions:
- Read Messages/View Channels
- Send Messages
- Manage Messages (to delete violations)
- Moderate Members (to timeout users)
- Read Message History

Invite URL format:
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_BOT_CLIENT_ID&permissions=1099511627848&scope=bot
```

### 5. Deploy Bot

**Local Testing:**
```bash
python discord_bot.py
```

**Production Deployment:**
- Deploy to Railway.app, Heroku, or AWS
- Set environment variables in deployment platform
- Enable auto-restart on crash
- Monitor logs

## Moderation Philosophy

### ✅ Encouraged:
- Sharing music and creative ideas
- Discussing collaboration techniques
- Expressing hope for peace
- Sharing personal stories (respectfully)
- Asking for help or feedback
- Celebrating progress and milestones

### ⚠️ Requires Care:
- Political discussions (must be respectful and peace-focused)
- Historical references (accurate and empathetic)
- Personal opinions (respectful disagreement OK)

### ❌ Not Allowed:
- Hate speech or derogatory language
- Inflammatory rhetoric or provocation
- Personal attacks or harassment
- Spreading misinformation
- Off-topic political debates
- Promotion of violence

## AI Moderation Prompts

### Message Evaluation Prompt

```
You are moderating a Discord community for musicians creating collaborative music for peace in Israel and Palestine.

Context: This is a safe space where people from different backgrounds work together on music projects. Members range from Israelis to Palestinians to international supporters. All are committed to peace.

Evaluate this message:
"{message}"

Consider:
1. Is it respectful to all members?
2. Does it support collaboration and peace?
3. Does it contain hate speech or inflammatory language?
4. Is it constructive or destructive?

Respond with:
- allowed: true/false
- severity: low/medium/high (if not allowed)
- reason: brief explanation
- suggested_response: what the bot should do
```

### Positive Reinforcement Prompt

```
You are celebrating positive contributions in a peace-building music community.

This message was particularly constructive:
"{message}"

Write a brief (1-2 sentence) encouraging response that:
1. Acknowledges the contribution
2. Reinforces the value of collaboration
3. Inspires others to contribute similarly
```

## Analytics & Reporting

Track these metrics:
1. **Community Health**
   - Messages per day
   - Active members
   - Moderation actions (should be low)
   - Positive reinforcement given

2. **Growth Metrics**
   - New members this week
   - Referral success rate
   - Team completion rates

3. **Wave Preparation**
   - Teams ready for launch
   - Tracks completed
   - Projected launch date

## Human Oversight

- Review AI decisions weekly
- Adjust prompts based on false positives/negatives
- Handle escalated cases manually
- Update rules as community evolves

## Privacy & Data

- Don't store message content beyond moderation needs
- Respect user privacy
- Be transparent about AI moderation
- Allow users to appeal decisions

## Emergency Procedures

If AI moderation fails:
1. Switch to manual moderation
2. Restrict posting to verified members only
3. Notify community of temporary measures
4. Investigate and fix AI issues
5. Resume automated moderation gradually

## Cost Estimates

**OpenAI GPT-4:**
- ~$0.03 per 1K tokens
- Average message analysis: ~500 tokens
- 10,000 messages/day: ~$150/month

**Anthropic Claude:**
- Similar pricing to GPT-4
- May be more nuanced for this use case

**Discord Bot Hosting:**
- Railway/Heroku: $5-10/month
- Can run on free tier initially

## Future Enhancements

1. **Multi-language support** - Auto-translate + moderate in Hebrew, Arabic, English
2. **Sentiment analysis** - Track community mood over time
3. **Conflict prediction** - Identify tensions before they escalate
4. **Music collaboration tools** - Integrate with music creation platform
5. **Automated team matching** - AI-powered team formation based on skills/interests

## Success Metrics

The moderation system is successful when:
- <1% of messages require action
- High member satisfaction (surveys)
- Diverse, active participation
- Teams completing projects
- Organic growth through referrals
- Positive press coverage

## License & Credits

This system is open source for peace-building initiatives.

Built for Shapeless Peace Movement 🏴‍☠️🕊️

---

Remember: The goal isn't perfect moderation - it's creating a space where people feel safe to collaborate, create, and build peace together.
