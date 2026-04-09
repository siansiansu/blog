---
pubDate: 2026-04-03
slug: my-claude-code-setup
title: My Claude Code Setup
description: Sharing my daily Claude Code configuration, including CLAUDE.md, settings.json, plugins, rules, custom agents, and skills.
keywords: [Claude Code, AI, CLAUDE.md, settings, plugins, skills, developer tools]
tags: [dev]
---

A quick note on my current Claude Code setup.

<!-- truncate -->

## Installing Claude Code

```bash
# macOS / Linux
curl -fsSL https://claude.ai/install.sh | sh

# Verify installation
claude --version

# Update
claude update
```

## Configuration Management

All Claude Code config files live in a single git repo, symlinked to `~/.claude/`:

```
~/Workspace/configurations/claude/
├── CLAUDE.md       → ~/.claude/CLAUDE.md
├── settings.json   → ~/.claude/settings.json
├── rules/          → ~/.claude/rules/
│   ├── python.md
│   ├── swift.md
│   └── kotlin.md
├── agents/         → ~/.claude/agents/
└── skills/         → ~/.claude/skills/
    ├── find-docs/
    ├── grill-me/
    ├── stop-slop/
    ├── magi-ex/
    ├── modern-python/
    ├── naming-analyzer/
    └── second-opinions/
```

When switching machines, just clone and run the symlink script.

## CLAUDE.md

Located at `~/.claude/CLAUDE.md`, shared across all projects:

```markdown
# Development Guidelines

## Philosophy

### Core Beliefs

- **Incremental progress over big bangs** - Small changes that compile and pass tests
- **Learning from existing code** - Study and plan before implementing
- **Pragmatic over dogmatic** - Adapt to project reality
- **Clear intent over clever code** - Be boring and obvious
- **Never make assumptions** - Always read the documentation first, search the codebase, and only then ask questions if necessary

### Simplicity Means

- Single responsibility per function/class
- Avoid premature abstractions
- No clever tricks - choose the boring solution
- If you need to explain it, it's too complex

## Context Management

- Before starting multi-file edits or complex implementations, assess remaining context capacity
- **Warning signals** that context is constrained:
  - The conversation has accumulated many tool results (10+ file reads, multiple agent outputs)
  - The system has auto-compressed earlier messages
  - You can no longer recall details discussed earlier in the conversation
- **When context is constrained**:
  - Do NOT start large tasks — summarize progress first, then proceed in a fresh scope
  - Delegate file-heavy research to subagents to protect main context
  - Break remaining work into smaller, independently committable steps
- Prefer multiple small passes over one large pass — each pass should be completable within available context

## Process

### 1. Planning & Staging

Break complex work into 3-5 stages. Document in `IMPLEMENTATION_PLAN.md`:

## Stage N: [Name]
**Goal**: [Specific deliverable]
**Success Criteria**: [Testable outcomes]
**Tests**: [Specific test cases]
**Status**: [Not Started|In Progress|Complete]

- Update status as you progress
- Remove file when all stages are done

### 2. Research Directive
- When studying unfamiliar code or planning changes, read all related files thoroughly — understand data flow, edge cases, and dependencies before proposing solutions
- Do not skim; trace the full call chain from entry point to final output
- When asked to research, produce a written summary documenting findings

### 3. Implementation Flow

1. **Understand** - Study existing patterns in codebase
2. **Test** - Write test first (red)
3. **Implement** - Minimal code to pass (green)
4. **Refactor** - Clean up with tests passing
5. **Commit** - With clear message linking to plan

### 4. When Stuck (After 3 Attempts)

**CRITICAL**: Maximum 3 attempts per issue, then STOP.

1. **Document what failed**:
   - What you tried
   - Specific error messages
   - Why you think it failed

2. **Research alternatives**:
   - Find 2-3 similar implementations
   - Note different approaches used

3. **Question fundamentals**:
   - Is this the right abstraction level?
   - Can this be split into smaller problems?
   - Is there a simpler approach entirely?

4. **Try different angle**:
   - Different library/framework feature?
   - Different architectural pattern?
   - Remove abstraction instead of adding?

## Technical Standards

### Architecture Principles

- **Composition over inheritance** - Use dependency injection
- **Interfaces over singletons** - Enable testing and flexibility
- **Explicit over implicit** - Clear data flow and dependencies
- **Test-driven when possible** - Never disable tests, fix them

### Code Quality

- **Every commit must**:
  - Compile successfully
  - Pass all existing tests
  - Include tests for new functionality
  - Follow project formatting/linting

- **Before committing**:
  - Run formatters/linters
  - Self-review changes
  - Ensure commit message explains "why"

### Error Handling

- Fail fast with descriptive messages
- Include context for debugging
- Handle errors at appropriate level
- Never silently swallow exceptions

## Decision Framework

When multiple valid approaches exist, choose based on:

1. **Testability** - Can I easily test this?
2. **Readability** - Will someone understand this in 6 months?
3. **Consistency** - Does this match project patterns?
4. **Simplicity** - Is this the simplest solution that works?
5. **Reversibility** - How hard to change later?

## Project Integration

### Learning the Codebase

- Find 3 similar features/components
- Identify common patterns and conventions
- Use same libraries/utilities when possible
- Follow existing test patterns

### Tooling

- Use project's existing build system
- Use project's test framework
- Use project's formatter/linter settings
- Don't introduce new tools without strong justification

## Quality Gates

### Definition of Done

- [ ] Tests written and passing
- [ ] Code follows project conventions
- [ ] No linter/formatter warnings
- [ ] Commit messages are clear
- [ ] Implementation matches plan
- [ ] No TODOs without issue numbers

### Test Guidelines

- Test behavior, not implementation
- One assertion per test when possible
- Clear test names describing scenario
- Use existing test utilities/helpers
- Tests should be deterministic

## Online Sources

- When referencing libraries, APIs, CLI tools, configs, or dependency versions, prefer checking online documentation (use find-docs skill or WebSearch) over relying on pre-trained knowledge
- Pre-trained knowledge may be outdated — verify current APIs and versions before suggesting

## Important Reminders

**NEVER**:
- Use `--no-verify` to bypass commit hooks
- Disable tests instead of fixing them
- Commit code that doesn't compile
- Make assumptions - verify with existing code

**ALWAYS**:
- Commit working code incrementally
- Update plan documentation as you go
- Learn from existing implementations
- Stop after 3 failed attempts and reassess
```

## Per-File Rules

Located in `~/.claude/rules/`. Each rule file uses `paths` to specify which file types it applies to.

### python.md

```markdown
---
paths: ["**/*.py"]
---

- Target Python >= 3.13; use union types `X | Y`, pattern matching
- System Python scripts maintain 3.9 compatibility
- Use `uv` for project management, `ruff` for linting/formatting, `pytest` for testing
- Pin exact versions in pyproject.toml (no `>=`, `~=`, `^`)
- Use `TypedDict` instead of plain dict for structured config
```

### swift.md

```markdown
---
paths: ["**/*.swift"]
---

- Follow SwiftUI / UIKit official best practices
- Prefer async/await over completion handlers
- Prefer value types (struct, enum)
- Use `weak` for delegates to avoid retain cycles
- Separate SwiftUI Views from Controllers
- Guard early, reduce nesting
```

### kotlin.md

```markdown
---
paths: ["**/*.kt"]
---

- Leverage Kotlin idioms: let, apply, also, run, with
- Prefer `val` and immutable collections
- Use sealed classes for restricted hierarchies
- Use coroutines for async work, avoid callbacks
- IME components follow Android Keyboard Design Guidelines
```

## Settings

`~/.claude/settings.json` configuration:

```json
{
  "permissions": {
    "deny": [
      "Bash(sudo *)",
      "Bash(su *)",
      "Bash(passwd*)",
      "Bash(eval *)",
      "Bash(chown *)",
      "Bash(launchctl *)",
      "Bash(diskutil *)",
      "Bash(security *)",
      "Bash(osascript *)"
    ],
    "ask": [
      "Bash(curl *)",
      "Bash(wget *)",
      "Bash(chmod *)"
    ]
  },
  "enabledPlugins": {
    "swift-lsp@claude-plugins-official": true,
    "code-simplifier@claude-plugins-official": true,
    "commit-commands@claude-plugins-official": true,
    "claude-md-management@claude-plugins-official": true,
    "claude-code-setup@claude-plugins-official": true,
    "kotlin-lsp@claude-plugins-official": true,
    "writing-humanizer@shyuan-marketplace": true
  },
  "extraKnownMarketplaces": {
    "trailofbits": {
      "source": {
        "source": "github",
        "repo": "trailofbits/skills"
      }
    },
    "shyuan-marketplace": {
      "source": {
        "source": "github",
        "repo": "shyuan/shyuan-marketplace"
      }
    }
  },
  "effortLevel": "medium",
  "skipDangerousModePermissionPrompt": true
}
```

`deny` blocks dangerous commands, `ask` requires manual confirmation for network operations.

## Plugins

Installation:

```bash
claude plugin install swift-lsp@claude-plugins-official
claude plugin install kotlin-lsp@claude-plugins-official
claude plugin install code-simplifier@claude-plugins-official
claude plugin install commit-commands@claude-plugins-official
claude plugin install claude-md-management@claude-plugins-official
claude plugin install claude-code-setup@claude-plugins-official
claude plugin install writing-humanizer@shyuan-marketplace

# List installed plugins
claude plugin list
```

| Plugin | Source | Purpose |
|--------|--------|---------|
| swift-lsp | claude-plugins-official | Swift language server support |
| kotlin-lsp | claude-plugins-official | Kotlin language server support |
| code-simplifier | claude-plugins-official | Code simplification and refactoring suggestions |
| commit-commands | claude-plugins-official | Git commit commands (commit, push, PR) |
| claude-md-management | claude-plugins-official | CLAUDE.md file management and updates |
| claude-code-setup | claude-plugins-official | Claude Code setup analysis and recommendations |
| writing-humanizer | shyuan-marketplace | Remove AI-generated patterns and make writing more natural |

## Marketplaces

```bash
# Add third-party marketplaces
claude plugin marketplace add anthropics/skills
claude plugin marketplace add trailofbits/skills

# List all marketplaces
claude plugin marketplace list

# Update marketplaces
claude plugin marketplace update
```

| Marketplace | Source | Description |
|------------|--------|-------------|
| claude-plugins-official | anthropics/claude-plugins-official | Default, official plugins |
| anthropic-agent-skills | anthropics/skills | Official skills, auto-update enabled |
| trailofbits | trailofbits/skills | Security-focused skills |
| shyuan-marketplace | shyuan/shyuan-marketplace | Community skills (writing-humanizer) |

## Skills

Installation:

```bash
npx skills add https://github.com/hardikpandya/stop-slop -g
npx skills add https://github.com/upstash/context7 --skill find-docs -g
npx skills add https://github.com/softaworks/agent-toolkit --skill naming-analyzer -g
npx skills add https://github.com/trailofbits/skills --skill modern-python -g

# List installed skills
npx skills list -g

# Update all skills
npx skills update -g
```

| Skill | Purpose |
|-------|---------|
| stop-slop | Remove AI writing patterns from prose |
| find-docs | Look up technical docs and API references |
| grill-me | Stress-test plans and designs through relentless questioning |
| second-opinions | Get independent reviews from Codex/Gemini |
| naming-analyzer | Variable and function naming suggestions |
| magi-ex | Multi-model brainstorming (Opus/Codex/Gemini) |
| modern-python | Modern Python toolchain setup |
| sync-configs | Check if dotfiles are in sync between repo and active locations |

`second-opinions` and `magi-ex` send work to Codex/Gemini for independent review. Different model training biases help catch blind spots.

## Project-Level Settings

Individual projects can override global settings in `.claude/settings.local.json`. For example, this blog project:

```json
{
  "permissions": {
    "allow": [
      "Bash(cp:*)",
      "Bash(git add:*)"
    ]
  }
}
```

This allows `cp` and `git add` without confirmation prompts.

## References

- [skills.sh](https://skills.sh/) - Skill directory
- [Claude Code Documentation](https://code.claude.com/docs/en/overview)
