## Core Behavioral Rules

1. **Always invoke Superpowers:** You MUST ALWAYS begin every single session and task by implicitly running or checking the `/using-superpowers` skill. No exceptions.
2. **Always update Graphify:** Any time you modify code files in this session, you MUST run `graphify update .` as a background command before considering the task finished. Never forget to do this, and do not hallucinate the update (actually run the command).
3. **Always run Verification:** You MUST ALWAYS finish off your work by running the Verification & Quality Assurance skill checks (e.g., `npx ruflo@alpha verify check`). This ensures all tasks are verified against the truth scoring system with a 0.95 threshold before being considered complete.
