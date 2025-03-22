---
name: Bug report
about: Create a report to help us improve
title: Lucide React Icons Misalignment in Player
labels: ''
assignees: ''

---

# Bug Report: Lucide React Icons Misalignment in Player

## Description
There is an issue with **Lucide React icons** in the music player component. The icons are not properly centered or aligned, causing a visually inconsistent UI.

## Steps to Reproduce
1. Run the project locally.
2. Open the player UI.
3. Observe the play, pause, and other control icons – they appear misaligned.

## Expected Behavior
Icons should be perfectly centered within their respective buttons and aligned uniformly with other UI elements.

## Actual Behavior
- Some icons appear slightly off-center.
- Uneven spacing between icons.
- Alignment shifts when resizing the screen.

## Suggested Fix
- Use **flexbox (`flex justify-center items-center`)** or **grid layout** to ensure proper centering.
- Check `size` and `strokeWidth` props of Lucide icons.
- Adjust padding/margins for consistency.

## Environment
- **Framework:** Next.js
- **UI Library:** Tailwind CSS, Lucide React
- **Browser:** Chrome, Firefox, Edge (Issue persists across all)

## Additional Notes
A temporary workaround is setting explicit `width` and `height` for icons or wrapping them in a flex container. A long-term fix should ensure consistency across all screen sizes.
