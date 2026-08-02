# Design System

## Theme & Color Strategy
- **Mode**: Dark neumorphic luxury palette (`neo-classic`)
- **Base Background**: `#2a2e35` (`--neo-bg-base`)
- **Raised Surfaces (Cards/Inputs)**: `#32363f` (`--neo-bg-raised`)
- **Inset Surfaces (Fields/Active Containers)**: `#23272e` (`--neo-bg-inset`)
- **Primary Brand Accent**: `#ff7043` (`--neo-accent`)
- **Accent Hover / Light**: `#ff8a65` (`--neo-accent-light`)
- **Accent Dark / Active**: `#e64a19` (`--neo-accent-dark`)
- **Primary Text**: `#f0f2f5` (`--neo-text-primary`)
- **Muted Text**: `#9aa3b2` (`--neo-text-muted`)

## Typography
- **Display Headings**: `"butik-display-normal", "Bodoni Moda", Georgia, serif`
- **UI & Form Labels**: `"Inter", system-ui, -apple-system, sans-serif`

## Neumorphic Shadows & Borders
- **Soft Raised Shadow**: Convex ambient shadows with subtle light source top-left
- **Soft Inset Shadow**: Concave inset shadow for focused inputs and selected cards
- **Subtle Borders**: `rgba(255, 255, 255, 0.08)` (`--neo-border-subtle`)

## Component Rules & Form Interactions
- **Inputs & Fields**: Clear focus states with `--neo-accent-glow`, min 44px touch height, clear error feedback.
- **Buttons & Actions**: High-contrast primary buttons using `--neo-accent-gradient` or solid `#ff7043` with crisp white text (`#ffffff`).
- **Cards & Selection Tiles**: Tactile selection indicators with subtle glow, inset border, and smooth transition.
