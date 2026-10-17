# Swipe to Delete – Todo List

A mobile-style todo list where tasks are removed by swiping them to the left, similar to list behavior in iOS and Android apps. Built with plain HTML, CSS, and JavaScript. No frameworks, no build step.


## Features

- Swipe a task left to delete it, using mouse drag or touch
- Red delete background with a trash icon that grows and fades in as you drag
- Task snaps back if you release before reaching the delete threshold (100px)
- Delete animation: the card slides out, the trash icon pops, and the row collapses
- Tap the circle to mark a task as done (green check and strikethrough title)
- Each task shows a title, a subtitle, and a colored priority dot
- Phone-style card layout with a dark theme

## Tech Stack

- HTML5
- CSS3 (transitions, keyframe animations, flexbox)
- Vanilla JavaScript (mouse and touch events)

## Project Structure

```
swipe_delete/
├── index.html   # Page markup and list container
├── style.css    # Layout, theme, and animations
└── script.js    # Task data, item rendering, and swipe logic
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/niraj5511/swipe_delete.git
   cd swipe_delete
   ```
2. Open `index.html` in your browser.

No installation or build is needed.

## How It Works

`script.js` holds the tasks in an `items` array and builds one row per task. Each row has a red background layer (with the trash icon) and a foreground card on top. While you drag, the card follows your pointer to the left and the trash icon scales up with the drag distance. On release:

- If you dragged past 100px, the card slides off, the row collapses, and the element is removed.
- Otherwise, the card springs back to its original position.

## Customization

- **Tasks:** edit the `items` array at the top of `script.js` (`title`, `subtitle`, and `priority` color).
- **Delete distance:** change the `threshold` value in `script.js`.
- **Colors:** edit the color values in `style.css`.

## Known Limitations

- Deleted tasks are only removed from the page. Nothing is saved, so refreshing restores the full list.
- Task text is inserted as HTML, so only use trusted text in the `items` array.
- Swipe works in one direction only (left).
