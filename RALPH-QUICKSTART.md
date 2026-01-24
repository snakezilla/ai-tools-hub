# Ralph Loop Deployment - Quick Start

## Prerequisites Checklist

Before starting, verify all of these:

```bash
# 1. Claude Code is installed and working
claude --version
# Should show version number

# 2. You're logged into Claude Code
claude
# Then type: /login (if not already logged in)
# Exit with: /exit

# 3. Node.js 18+ is installed
node --version
# Should show v18.x.x or higher

# 4. tmux is installed
tmux -V
# Should show version. If not: brew install tmux (Mac) or apt install tmux (Linux)

# 5. Ralph Loop is cloned
ls ~/Documents/ralph-claude-code
# Should show ralph.sh and other files
# If not: git clone https://github.com/frankbria/ralph-claude-code ~/Documents/ralph-claude-code

# 6. Ralph dependencies installed
cd ~/Documents/ralph-claude-code && npm install
```

---

## Step 1: Swap to New Files

```bash
cd ~/ralphprojects/ai-tools-hub

# Backup originals
mv PROMPT.md PROMPT-original.md
mv @fix_plan.md @fix_plan-original.md

# Use new files
mv PROMPT-v2.md PROMPT.md
mv @fix_plan-v2.md @fix_plan.md
```

---

## Step 2: Review the Plan

Before starting Ralph, review what it will do:

```bash
# Open the main instructions
cat PROMPT.md | head -100

# Open the task checklist
cat @fix_plan.md | head -50

# Open the content plan
cat docs/CONTENT-PLAN.md | head -50
```

---

## Step 3: Start Ralph Loop

```bash
# Make sure you're in the project directory
cd ~/ralphprojects/ai-tools-hub

# Start Ralph
~/Documents/ralph-claude-code/ralph.sh
```

A tmux window will open showing Claude Code working autonomously.

---

## Step 4: Monitor Progress

### Option A: Watch Live
The tmux window shows real-time progress. Just watch.

### Option B: Detach and Check Later
```bash
# Detach from tmux (Ralph keeps running)
# Press: Ctrl+B, then D

# Check if Ralph is still running
tmux ls
# Should show: ralph: 1 windows...

# Reattach to watch
tmux attach -t ralph
```

### Option C: Check Logs
```bash
# View recent activity
tail -100 logs/claude_output_*.log | tail -50
```

---

## Step 5: Stop Ralph

### Graceful Stop (Recommended)
```bash
# Reattach to tmux
tmux attach -t ralph

# Press Ctrl+C to stop current task
# Ralph will finish cleanly
```

### Force Stop
```bash
tmux kill-session -t ralph
```

---

## Step 6: Review Changes

After Ralph completes a phase:

```bash
# See what changed
git status
git diff

# If happy, commit
git add .
git commit -m "feat: phase 1 complete - simplified tool pages"

# Push to GitHub
git push origin main
```

---

## Troubleshooting

### "Ralph isn't starting"
```bash
# Check if Claude Code works
claude
# If error, reinstall: curl -fsSL https://claude.ai/install.sh | sh
```

### "Ralph seems stuck"
```bash
# Check the status file
cat status.json

# Check logs
tail -50 logs/claude_output_*.log
```

### "Ralph made a mistake"
```bash
# Stop Ralph
tmux kill-session -t ralph

# Revert changes
git checkout -- .

# Fix the PROMPT.md instructions
# Then restart Ralph
```

### "Build is failing"
```bash
# Run build manually
npm run build

# Fix errors shown
# Then restart Ralph with updated instructions
```

---

## Phase-by-Phase Deployment

You don't have to run all phases at once. Run Ralph for each phase:

### Phase 1 Only (Simplify Tool Pages)
1. Edit `@fix_plan.md` to only include Phase 1 tasks
2. Run Ralph
3. Stop when Phase 1 complete
4. Commit: `git commit -m "refactor: simplify tool pages"`
5. Test: `npm run dev` and review in browser

### Phase 2 Only (New Pages)
1. Edit `@fix_plan.md` to focus on Phase 2
2. Run Ralph
3. Stop when complete
4. Commit: `git commit -m "feat: add contact, pricing, courses pages"`

### And so on...

---

## Recommended Workflow

```
┌─────────────────────────────────────────────┐
│  1. Review PROMPT.md and @fix_plan.md       │
│  2. Start Ralph                             │
│  3. Let it work for 1-2 hours               │
│  4. Stop and review changes                 │
│  5. Test locally: npm run dev               │
│  6. Fix any issues manually                 │
│  7. Commit good changes                     │
│  8. Update @fix_plan.md (mark complete)     │
│  9. Repeat for next phase                   │
└─────────────────────────────────────────────┘
```

---

## Files Overview

| File | Purpose |
|------|---------|
| `PROMPT.md` | Main instructions Ralph follows |
| `@fix_plan.md` | Task checklist with code snippets |
| `docs/CONTENT-PLAN.md` | Guide content to create |
| `docs/tools-simplified-example.ts` | Reference for new data format |
| `status.json` | Ralph's progress tracking |
| `logs/` | Session logs for debugging |

---

## Expected Outcomes by Phase

| Phase | What You Get |
|-------|--------------|
| 1 | Simplified tool pages, difficulty badges |
| 2 | Contact page, pricing page, course template |
| 3 | Working Stripe checkout, payment flow |
| 4 | Guides system with 4 launch guides |
| 5 | Skills library page |
| 6 | Mobile optimized, analytics ready |
| 7 | 4+ written guides, content system |

---

## Need Help?

- Ralph issues: https://github.com/frankbria/ralph-claude-code/issues
- Claude Code issues: https://github.com/anthropics/claude-code/issues
- This project: Check the logs, revert, and try again with clearer instructions
