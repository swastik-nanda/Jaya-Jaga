# 🤖 AI Agent Guidelines & Protocols

This document serves as a persistent memory for AI agents working on this project. **Before executing any complex phase, the AI must review this file.**

## 1. The "Model Handover" Protocol (Crucial)
The user holds different AI subscriptions with different rate limits (e.g., Google AI Pro vs Plus) and prefers different models for different types of work. 

**Rule:** When transitioning between planning and heavy coding phases, the AI MUST explicitly PAUSE and ASK the user if they want to switch models. 
- Example: *Planning is done using Gemini 3.1 Pro. Before writing 500 lines of React code, the AI must stop and say: "I am ready to code. Please switch to Claude Sonnet/Opus if desired, and tell me to continue."*

**Soft Guardrail:** This is a strong preference, not a hard blockade. If the user tells the AI to "just continue anyway" or if Claude tokens are exhausted, the current model should proceed without arguing. But the AI must always offer the pause first.

## 2. Active Approval
The AI must never assume implicit approval for executing a major plan. Always wait for an explicit "Go ahead" or "Yes, build it" from the user before generating code for a new Phase.

## 3. Transparency
If the AI system auto-approves something (due to backend system hooks), the AI should still communicate to the user what happened so the user doesn't feel ignored.

## 4. Documentation Upkeep
Whenever a Day/Phase of the implementation plan is finished, the AI must go back to the relevant Markdown planning files (`Backend_plan.md`, `ML_plan.md`, `UI_plan.md`, `task.md`) and actively update their status to `[IMPLEMENTED]`. Do not leave documentation out of sync with reality.
