# Captea Platform - AI Agent Configuration

This directory contains comprehensive GitHub Copilot agent instructions and session prompts for the Captea Platform project.

---

## Files Overview

### 1. `copilot-instructions.md`

**Purpose**: Master AI agent instructions document

**Contains**:

- Complete project overview and tech stack
- Development environment setup
- Code standards and best practices
- Component architecture patterns
- Authentication and security guidelines
- Real-time features implementation
- Performance optimization strategies
- Testing methodology
- Phase-by-phase implementation guide (Phases 0-5)

**Use Case**: This file is automatically loaded by GitHub Copilot when you work in this project. It provides context-aware code suggestions and explanations.

**Size**: ~50KB (comprehensive reference guide)

### 2. `session-prompts.md`

**Purpose**: Ready-to-use prompts for GitHub Copilot Chat

**Contains**:

- 50+ pre-written prompts organized by development phase
- Getting started prompts
- Phase-specific implementation prompts (Setup, UI, Auth, Features, etc.)
- Debugging prompts for common issues
- Code review request templates
- Production deployment guidance

**Use Case**: Copy-paste these prompts into Copilot Chat to get instant, context-aware assistance for specific tasks.

**Size**: ~25KB (prompt library)

---

## How to Use This Setup

### Initial Setup

1. **Open Project in VS Code**:

   ```bash
   cd ~/projects/captea-platform
   code .
   ```

2. **Verify GitHub Copilot Extension**:
   - Ensure GitHub Copilot extension is installed
   - Sign in with your GitHub account
   - Enable Copilot for this workspace

3. **Load Context** (First Time):
   - Open Copilot Chat (`Cmd+I` or `Ctrl+I`)
   - Paste this prompt:

   ```
   Load the Captea Platform project context from .github/copilot-instructions.md.
   This is a React Native social media app using Expo Router (SDK 51) and Supabase.
   Review the current project structure and identify which phase we're in based on
   existing files. Then provide:
   1. Current project status summary
   2. Next recommended tasks
   3. Any immediate issues or missing dependencies
   ```

### Daily Workflow

#### Starting a New Session

```
Load project context from .github/copilot-instructions.md.
Analyze current state and tell me what we should work on next.
```

#### Implementing a Specific Feature

1. Find the relevant prompt in `session-prompts.md`
2. Copy the prompt
3. Paste into Copilot Chat
4. Review generated code
5. Implement and test

**Example**: Creating the Button component

```
Create components/Button.jsx following these requirements:
- Accept props: title, onPress, loading, hasShadow, buttonStyle, textStyle
- Show ActivityIndicator when loading=true
- Apply conditional shadow styling when hasShadow=true
- Use theme colors and responsive HP/WP values
- Be fully reusable across the app
- Include proper JSDoc comments

Reference the exact pattern in .github/copilot-instructions.md Component Architecture section.
```

#### Debugging an Issue

1. Go to "Debugging Prompts" section in `session-prompts.md`
2. Find the relevant debugging prompt
3. Add specific error details
4. Get diagnostic steps and fixes

**Example**: Auth not working

```
Supabase authentication is not working properly:
- Session not persisting after app restart
- Login succeeds but user is null

Check AsyncStorage configuration and provide fixes.
```

### Code Suggestions (Inline)

GitHub Copilot will automatically provide inline suggestions as you type based on:

- Current file context
- Project structure
- `copilot-instructions.md` patterns and best practices

**Tips**:

- Start typing a function name and Copilot will suggest the implementation
- Add a comment describing what you need: `// Create a function to handle post liking`
- Press `Tab` to accept suggestions
- Press `Cmd+→` (Mac) or `Alt+→` (Windows) to accept word-by-word

---

## Project Phases Reference

The project is divided into 5 phases. Use prompts from the corresponding section:

| Phase | Focus | Session Prompts Section |
|-------|-------|------------------------|
| **Phase 0** | Project setup, environment, structure | [Phase 0: Setup Prompts](#phase-0-setup-prompts) |
| **Phase 1** | Foundational UI components | [Phase 1: UI Components Prompts](#phase-1-ui-components-prompts) |
| **Phase 2** | Authentication & routing | [Phase 2: Authentication Prompts](#phase-2-authentication-prompts) |
| **Phase 3** | Core social features | [Phase 3: Social Features Prompts](#phase-3-social-features-prompts) |
| **Phase 4** | Profile & notifications | [Phase 4: Profile & Notifications Prompts](#phase-4-profile--notifications-prompts) |
| **Phase 5** | Production deployment | [Phase 5: Production Prompts](#phase-5-production-prompts) |

---

## Best Practices

### ✅ DO

- **Load context at session start**: Always begin with context-loading prompt
- **Use specific prompts**: Copy exact prompts from `session-prompts.md`
- **Reference instructions**: Ask Copilot to follow patterns in `copilot-instructions.md`
- **Test incrementally**: Implement one feature at a time, test before moving on
- **Commit working code**: Save progress after each successful feature
- **Ask for reviews**: Use code review prompts before merging

### ❌ DON'T

- **Skip context loading**: Copilot needs project context for best results
- **Be too vague**: "Create a button" vs "Create components/Button.jsx with loading state, shadow, and proper types"
- **Ignore errors**: Always use debugging prompts when issues arise
- **Batch too many changes**: Implement features one at a time
- **Override patterns**: Follow established code style in instructions

---

## Agent Capabilities

This AI agent setup provides:

### 1. Context-Aware Code Generation

```javascript
// Type: const handleLogin =
// Copilot suggests complete implementation following project patterns

const handleLogin = async () => {
  const email = emailRef.current;
  const password = passwordRef.current;

  if (!email || !password) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }

  setLoading(true);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  setLoading(false);

  if (error) {
    Alert.alert('Login Failed', error.message);
  } else {
    router.push('/home');
  }
};
```

### 2. Component Scaffolding

Ask: "Create PostCard component"

Get: Complete component with:

- Proper imports
- Props interface
- Event handlers
- Styled layout
- Memoization for performance
- JSDoc comments

### 3. Debugging Assistance

Describe error → Get:

- Root cause analysis
- Step-by-step diagnostic
- Specific code fixes
- Prevention tips

### 4. Code Review

Paste code → Get:

- Performance issues
- Security vulnerabilities
- Best practice violations
- Specific improvements with code examples

### 5. Architecture Guidance

Ask about structure → Get:

- Recommended file organization
- Component hierarchy
- State management approach
- Real-time integration patterns

---

## Troubleshooting

### Copilot Not Providing Suggestions

**Problem**: No inline suggestions appearing

**Solution**:

1. Check Copilot icon in status bar (should be active)
2. Reload VS Code window (`Cmd+Shift+P` → "Reload Window")
3. Open Copilot logs: `Cmd+Shift+P` → "Copilot: Show Output Channel"
4. Verify file is not in `.gitignore` or excluded

### Suggestions Not Following Project Patterns

**Problem**: Generated code doesn't match project style

**Solution**:

1. Explicitly mention instructions in prompt:

   ```
   Create Button.jsx following the exact pattern in
   .github/copilot-instructions.md Component Architecture section
   ```

2. Include file path in request for context
3. Show example from existing code: "Create similar to Input.jsx"

### Chat Not Loading Context

**Problem**: Copilot Chat seems unaware of project setup

**Solution**:

1. Start with context-loading prompt (see "Initial Setup" above)
2. Reference specific sections: "As described in .github/copilot-instructions.md Phase 2..."
3. Attach relevant files to chat: Use `@workspace` or `#file:copilot-instructions.md`

### Prompts Too Generic

**Problem**: Need more specific guidance

**Solution**:

1. Combine multiple prompts from `session-prompts.md`
2. Add specific requirements:

   ```
   Create Button.jsx with:
   - Specific height: HP(7.2)
   - Shadow only when hasShadow=true
   - Loading state replaces text with ActivityIndicator
   - Use theme.colors.primary for background
   ```

---

## Updating This Setup

### When to Update

- **New feature patterns emerge**: Add to `copilot-instructions.md`
- **Common debugging scenarios**: Add to `session-prompts.md` Debugging section
- **Phase completion**: Document lessons learned
- **Tech stack changes**: Update configuration and dependencies

### How to Update

1. **Edit Instructions**:

   ```bash
   code .github/copilot-instructions.md
   ```

2. **Add New Prompts**:

   ```bash
   code .github/session-prompts.md
   ```

3. **Test Changes**:
   - Reload VS Code
   - Try a prompt to verify it uses new context
   - Get code review from Copilot

4. **Document Changes**:
   - Update version number in file headers
   - Add to "Last Updated" timestamp
   - Commit with descriptive message

---

## Advanced Usage

### Custom Modes

Create specialized agent modes for specific tasks:

**Research Mode**:

```
Act as a React Native performance expert. Analyze this component
and suggest optimizations for 60 FPS scrolling on older devices.
```

**Security Audit Mode**:

```
Act as a security auditor. Review this authentication flow for
vulnerabilities, especially around token storage and session management.
```

**Architect Mode**:

```
Act as a senior software architect. Review our current folder structure
and suggest improvements for scalability to 100+ screens.
```

### Multi-File Context

For complex features spanning multiple files:

```
I'm implementing the post creation flow. This involves:
- app/(tabs)/create.jsx (screen)
- components/RichTextEditor.jsx (new component)
- hooks/useMediaUpload.js (new hook)
- services/posts.js (API calls)

Guide me through creating all 4 files with proper integration.
```

### Iterative Refinement

Start broad, then refine:

```
Session 1: Create basic PostCard component
Session 2: Add like functionality to PostCard
Session 3: Add comment preview to PostCard
Session 4: Optimize PostCard with memoization
Session 5: Add accessibility labels to PostCard
```

---

## Resources

### Project Documentation

- **Main README**: `../README.md` (project overview)
- **Package.json**: `../package.json` (dependencies)
- **App Config**: `../app.json` (Expo configuration)
- **Environment**: `../.env.example` (environment variables template)

### External Documentation

- **React Native**: <https://reactnative.dev/docs/getting-started>
- **Expo**: <https://docs.expo.dev/>
- **Expo Router**: <https://docs.expo.dev/router/introduction/>
- **Supabase**: <https://supabase.com/docs>
- **React Native SVG**: <https://github.com/software-mansion/react-native-svg>

### Cosmaslabs Standards

- **Cosmaslabs Documentation**: `/usr/share/doc/cosmaslabs/`
- **Enterprise Standards**: `/usr/share/doc/cosmaslabs/.github/ENTERPRISE_STANDARDS.md`
- **Delta Model Framework**: `/usr/share/doc/cosmaslabs/strategic-frameworks/`

---

## Support

### Getting Help

1. **Check Session Prompts**: Most common questions have pre-written prompts
2. **Ask Copilot Chat**: Use debugging prompts for specific issues
3. **Review Instructions**: `copilot-instructions.md` has comprehensive patterns
4. **Cosmaslabs Team**: Contact senior development team for architecture questions

### Reporting Issues

If you find issues with the agent setup:

1. Document the issue:
   - What you asked
   - What Copilot suggested
   - What was wrong/missing

2. Create improvement proposal:
   - Suggest better prompt wording
   - Add missing context to instructions
   - Propose new patterns

3. Submit update:
   - Update relevant file
   - Test with Copilot
   - Commit changes

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | Nov 19, 2025 | Initial creation | Cosmaslabs AI Agent |

---

**Maintained By**: Cosmaslabs Inc - Senior Development Team
**Last Updated**: November 19, 2025
**Status**: ACTIVE
**Classification**: INTERNAL
