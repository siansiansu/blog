---
slug: my-claude-code-setup
title: 我的 Claude Code 設定
description: 分享我日常使用的 Claude Code 設定，包含 CLAUDE.md、settings.json、plugins、rules、custom agents 與 skills 的配置方式。
keywords: [Claude Code, AI, CLAUDE.md, settings, plugins, skills, 開發工具]
tags: [dev]
---

紀錄一下目前的 Claude Code 設定。

<!-- truncate -->

## 安裝 Claude Code

```bash
# macOS / Linux
curl -fsSL https://claude.ai/install.sh | sh

# 確認安裝
claude --version

# 更新
claude update
```

## 設定檔管理

所有 Claude Code 設定集中放在一個 git repo 裡，再用 symlink 連到 `~/.claude/`：

```
~/Workspace/configurations/claude/
├── CLAUDE.md       → ~/.claude/CLAUDE.md
├── settings.json   → ~/.claude/settings.json
├── rules/          → ~/.claude/rules/
│   ├── python.md
│   ├── swift.md
│   └── kotlin.md
├── agents/         → ~/.claude/agents/
│   └── ios-developer.md
└── skills/         → ~/.claude/skills/
    ├── find-docs/
    ├── stop-slop/
    ├── magi-ex/
    ├── modern-python/
    ├── naming-analyzer/
    └── second-opinions/
```

換電腦的時候 clone 下來跑一次 symlink 就好。

## CLAUDE.md

放在 `~/.claude/CLAUDE.md`，所有專案共用：

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

放在 `~/.claude/rules/`，用 `paths` 指定對應的檔案類型才會載入。

### python.md

```markdown
---
paths: ["**/*.py"]
---

- Target Python >= 3.13；使用 union types `X | Y`、pattern matching
- 系統 Python 腳本維持 3.9 相容性
- 用 `uv` 管理專案，`ruff` 做 linting/formatting，`pytest` 跑測試
- pyproject.toml 中鎖定精確版本（不用 `>=`、`~=`、`^`）
- 用 `TypedDict` 取代 plain dict 做結構化設定
```

### swift.md

```markdown
---
paths: ["**/*.swift"]
---

- 遵循 SwiftUI / UIKit 官方最佳實踐
- 優先使用 async/await，不用 completion handler
- 優先選擇 value types（struct, enum）
- delegate 使用 `weak` 避免 retain cycle
- SwiftUI View 和 Controller 分離
- Guard early, reduce nesting
```

### kotlin.md

```markdown
---
paths: ["**/*.kt"]
---

- 善用 Kotlin idioms：let、apply、also、run、with
- 優先 `val` 和 immutable collections
- 用 sealed classes 做 restricted hierarchies
- 用 coroutines 做非同步，避免 callbacks
- IME 元件遵循 Android Keyboard Design Guidelines
```

## Settings

`~/.claude/settings.json` 的配置：

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
  "effortLevel": "high",
  "skipDangerousModePermissionPrompt": true
}
```

`deny` 封鎖危險指令，`ask` 讓網路操作需要手動確認。

## Plugins

安裝指令：

```bash
claude plugin install swift-lsp@claude-plugins-official
claude plugin install kotlin-lsp@claude-plugins-official
claude plugin install code-simplifier@claude-plugins-official
claude plugin install commit-commands@claude-plugins-official
claude plugin install claude-md-management@claude-plugins-official
claude plugin install claude-code-setup@claude-plugins-official

# 查看已安裝的 plugins
claude plugin list
```

| Plugin | 用途 |
|--------|------|
| swift-lsp | Swift 語言伺服器支援 |
| kotlin-lsp | Kotlin 語言伺服器支援 |
| code-simplifier | 程式碼簡化與重構建議 |
| commit-commands | Git commit 相關指令（commit, push, PR） |
| claude-md-management | CLAUDE.md 檔案管理與更新 |
| claude-code-setup | Claude Code 設定分析與建議 |

## Marketplaces

```bash
# 加入第三方 marketplace
claude plugin marketplace add anthropics/skills
claude plugin marketplace add trailofbits/skills

# 查看所有 marketplace
claude plugin marketplace list

# 更新 marketplace
claude plugin marketplace update
```

| Marketplace | 來源 | 說明 |
|------------|------|------|
| claude-plugins-official | anthropics/claude-plugins-official | 預設，官方 plugins |
| anthropic-agent-skills | anthropics/skills | 官方 skills，有開 auto-update |
| trailofbits | trailofbits/skills | 資安相關 skills |

## Custom Agents

放在 `~/.claude/agents/`。目前有一個 iOS 開發用的 agent：

```markdown
---
name: ios-developer
description: Native iOS development specialist with Swift and SwiftUI.
tools: Read, Write, Edit, Bash
model: sonnet
---

專注 SwiftUI、UIKit、Core Data、async/await，使用 MVVM 架構。
遵循 Apple Human Interface Guidelines。
```

`model: sonnet` 用較快的模型跑 iOS 工作，不需要每次都動用 Opus。

## Skills

安裝指令：

```bash
npx skills add https://github.com/hardikpandya/stop-slop -g
npx skills add https://github.com/upstash/context7 --skill find-docs -g
npx skills add https://github.com/softaworks/agent-toolkit --skill naming-analyzer -g
npx skills add https://github.com/trailofbits/skills --skill modern-python -g

# 查看已安裝的 skills
npx skills list -g

# 更新所有 skills
npx skills update -g
```

| Skill | 用途 |
|-------|------|
| stop-slop | 移除文字中的 AI 寫作痕跡 |
| find-docs | 查詢技術文件和 API reference |
| second-opinions | 取得 Codex/Gemini 的獨立觀點 |
| naming-analyzer | 變數和函式命名建議 |
| magi-ex | 多模型腦力激盪（Opus/Codex/Gemini） |
| modern-python | Python 專案現代化工具鏈設定 |

`second-opinions` 和 `magi-ex` 會送給 Codex/Gemini 做獨立審查，不同模型的訓練偏差能互補盲點。

## Project-Level Settings

個別專案可以在 `.claude/settings.local.json` 覆寫全域設定。例如這個 blog 專案：

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

讓 `cp` 和 `git add` 不用每次都按確認。

## 參考資料

- [skills.sh](https://skills.sh/) - Skill 目錄
- [Claude Code Documentation](https://code.claude.com/docs)
