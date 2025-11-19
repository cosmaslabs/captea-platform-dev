# 🚀 Getting Started with Captea Platform AI Agent

**Quick 5-minute guide to start using your AI-powered development setup**

---

## ✨ What You Have

You now have a **senior software developer AI agent** configured for building the Captea Platform (React Native social media app). This setup will guide you through building a production-ready app from scratch.

**Location**: `~/projects/captea-platform/.github/`

---

## 📚 Files Overview

| File | What It Does | When to Use |
|------|-------------|-------------|
| **README.md** | Complete guide to the AI setup | Read first (10 min) |
| **QUICK_REFERENCE.md** | One-page cheat sheet | Keep open while coding |
| **copilot-instructions.md** | AI agent knowledge base (50KB) | Auto-loaded by Copilot |
| **session-prompts.md** | 50+ ready-to-use prompts | Copy-paste into Copilot Chat |
| **PROJECT_INITIALIZATION.md** | Step-by-step setup checklist | Follow to initialize project |

---

## 🎯 Your First 5 Minutes

### Step 1: Read the Overview (2 min)

```bash
cd ~/projects/captea-platform/.github
code README.md
```

Skim the "Files Overview" and "How to Use This Setup" sections.

### Step 2: Open Quick Reference (30 sec)

```bash
code QUICK_REFERENCE.md
```

This is your cheat sheet. Keep it open in a tab.

### Step 3: Start Initialization (2 min)

```bash
code PROJECT_INITIALIZATION.md
```

Start following the checklist. You'll need:

- Node.js v18+
- VS Code with GitHub Copilot extension
- Supabase account (free tier)

### Step 4: Load AI Context (30 sec)

1. Open VS Code: `code ~/projects/captea-platform`
2. Open Copilot Chat: `Cmd+I` (Mac) or `Ctrl+I` (Windows)
3. Paste this:

```
Load the Captea Platform project context from .github/copilot-instructions.md.
Review the project structure and tell me the next steps.
```

### Step 5: Verify It Works (1 min)

Copilot should respond with:

- Project summary (React Native + Expo + Supabase)
- Current phase (Phase 0: Setup)
- Next recommended tasks

✅ **If you see this, you're ready!**

---

## 🛠️ What to Do Next

### Option A: Initialize Project Now (30 min)

Follow `PROJECT_INITIALIZATION.md` step-by-step:

1. Initialize Expo app
2. Install dependencies
3. Create `.env` file with Supabase credentials
4. Create theme system
5. Create responsive helpers
6. Test Expo dev server

By the end, you'll have a working blank app ready for Phase 1.

### Option B: Learn the System First (1 hour)

Read these in order:

1. `README.md` - How the AI agent works
2. `copilot-instructions.md` - Skim the Table of Contents (see what's covered)
3. `session-prompts.md` - Browse the prompts (see what you can ask)

Then start with Option A.

---

## 💡 How to Use the AI Agent

### Daily Workflow

**1. Start Session**:

```
Load project context from .github/copilot-instructions.md.
Analyze current state and tell me what we should work on next.
```

**2. Pick a Task** (from `session-prompts.md`):

```
Create components/Button.jsx with:
- Props: title, onPress, loading, hasShadow
- Show ActivityIndicator when loading
- Use theme colors and responsive sizing
```

**3. Implement**:

- Copilot provides complete code
- Review and customize
- Test in app

**4. Next Task**:

- Commit working code
- Ask for next task
- Repeat

### Example Session

```
You: Load context from .github/copilot-instructions.md

Agent: ✅ Context loaded. You're in Phase 1: UI Components.
       Next task: Create components/Button.jsx

You: Create Button.jsx following the requirements in
     .github/copilot-instructions.md Component Architecture section

Agent: [Provides complete Button.jsx implementation]

You: Create Input.jsx with icon support

Agent: [Provides complete Input.jsx implementation]

You: Now create app/login.jsx using Button and Input components

Agent: [Provides complete login.jsx implementation]
```

---

## 📖 Key Concepts

### The 5 Phases

| Phase | Focus | Duration |
|-------|-------|----------|
| 0 | Setup | 1-2 hours |
| 1 | UI Components | 1-2 days |
| 2 | Authentication | 2-3 days |
| 3 | Social Features | 1-2 weeks |
| 4 | Profile & Notifications | 1 week |
| 5 | Production | 3-5 days |

**Total**: 4-6 weeks to production-ready app

### Code Patterns

**Responsive Sizing**:

```javascript
import { HP, WP } from '../helpers/common';
height: HP(7.2),  // 7.2% of screen height
width: WP(90),    // 90% of screen width
```

**Form Performance**:

```javascript
// ✅ Use useRef (no re-renders)
const emailRef = useRef('');
<Input onChangeText={(value) => (emailRef.current = value)} />

// ❌ Don't use useState (re-renders on every keystroke)
const [email, setEmail] = useState('');
<Input onChangeText={setEmail} />
```

**Real-Time Updates**:

```javascript
// Subscribe to database changes
const subscription = supabase
  .channel('posts')
  .on('postgres_changes', { event: 'INSERT', table: 'posts' },
    (payload) => setPosts([payload.new, ...posts])
  )
  .subscribe();

// Always cleanup
return () => subscription.unsubscribe();
```

---

## 🎓 Learning Resources

### In This Project

- **Full Tech Stack**: `copilot-instructions.md` → "Tech Stack & Architecture"
- **All Code Patterns**: `copilot-instructions.md` → "Component Architecture"
- **All Prompts**: `session-prompts.md` (organized by phase)
- **Troubleshooting**: `README.md` → "Troubleshooting"

### External

- **React Native**: <https://reactnative.dev/docs/getting-started>
- **Expo**: <https://docs.expo.dev/>
- **Expo Router**: <https://docs.expo.dev/router/introduction/>
- **Supabase**: <https://supabase.com/docs>

---

## 🆘 Common Questions

**Q: Do I need to know React Native?**
A: Basic knowledge helps, but the AI agent will guide you. Start with Phase 0 and learn as you build.

**Q: How do I ask the AI for help?**
A: Use prompts from `session-prompts.md`. They're designed to give context-aware answers.

**Q: What if I get stuck?**
A: Use debugging prompts in `session-prompts.md` → "Debugging Prompts" section.

**Q: Can I modify the project structure?**
A: Yes, but discuss with the AI agent first. It knows the optimal patterns.

**Q: How long does each phase take?**
A: Phase 0: 1-2 hours, Phase 1: 1-2 days, Phase 2: 2-3 days, Phase 3: 1-2 weeks, Phase 4: 1 week, Phase 5: 3-5 days.

**Q: Do I need a Mac for iOS development?**
A: For iOS builds, yes. But you can develop on any OS and test on Android/web first.

---

## ✅ Success Checklist

You're ready to build when:

- [ ] GitHub Copilot extension installed and active
- [ ] Read `README.md` (or at least skimmed it)
- [ ] Opened `QUICK_REFERENCE.md` in a tab
- [ ] Loaded AI context in Copilot Chat (got response)
- [ ] Have Node.js v18+ installed
- [ ] Have VS Code with required extensions
- [ ] Have Supabase account (or ready to create one)

**If all checked, start with `PROJECT_INITIALIZATION.md` Step 1!**

---

## 🎉 You're Ready

The AI agent is configured and waiting to help. Start with:

```bash
cd ~/projects/captea-platform
code .
```

Then open Copilot Chat and paste:

```
Load project context from .github/copilot-instructions.md.
Let's start Phase 0: Project Setup. Guide me through creating constants/theme.js.
```

**Happy coding!** 🚀

---

**Questions?** Check `README.md` → "Support" section
**Stuck?** Check `session-prompts.md` → "Debugging Prompts"
**Need quick reference?** Check `QUICK_REFERENCE.md`

---

**Version**: 1.0.0
**Last Updated**: November 19, 2025
**Status**: ACTIVE
