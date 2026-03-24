<div align="center">

# Open Rubik

**A free, open-source, browser-based Rubik's Cube simulator.**

No downloads. No installs. No accounts. Just play.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](#contributing)
[![Built With](https://img.shields.io/badge/built%20with-Three.js-black.svg)](https://threejs.org)

[**Play Now →**](https://rohitmungre.github.io/open-rubik)

</div>

<br>

## Why Open Rubik?

The Rubik's Cube community deserves a world-class, open-source simulator that anyone can play, study, and improve. Open Rubik is that project — built for cubers, by cubers, and open to everyone.

- **Zero friction** — runs entirely in the browser, works on desktop and mobile
- **Fully interactive** — click-and-drag faces, orbit the cube, or use keyboard controls
- **Two keyboard modes** — Classic notation keys for speedcubers, intuitive arrow keys for everyone else
- **Beautiful by default** — futuristic aesthetic with smooth animations and subtle visual effects
- **Lightweight** — single HTML file, no build step, no dependencies beyond Three.js (loaded via CDN)
- **Open source** — MIT licensed, contributions welcome

<br>

## Features

### 🎮 Controls

**Mouse / Touch**
- Click and drag on any face to rotate that layer
- Click and drag on empty space to orbit the camera
- Scroll to zoom in/out

**Classic Keyboard Mode** — standard Rubik's notation

| Key | Action |
|-----|--------|
| `U` `D` `L` `R` `F` `B` | Rotate face (Up, Down, Left, Right, Front, Back) |
| `Shift` + key | Reverse (prime) move |
| `S` | Scramble |

**Arrow Keyboard Mode** — intuitive directional controls

| Key | Action |
|-----|--------|
| `←` `→` | Rotate selected row left / right |
| `↑` `↓` | Rotate selected column up / down |
| `Shift` + `↑` `↓` | Switch active row (Top → Mid → Bottom) |
| `Shift` + `←` `→` | Switch active column (Left → Mid → Right) |
| `Z` / `X` | Rotate front face CW / CCW |

Both modes work simultaneously — use whichever feels natural.

### ⏱️ Timer & Move Counter

- Automatically starts on your first move after a scramble
- Tracks moves and elapsed time
- Scramble moves are never counted
- Displays results on the congratulations screen when solved

### 🧩 Scramble

- 20-move random scramble with no consecutive same-axis moves
- Fast animation during scramble so you're not waiting around
- Auto-scrambles on page load
- Scramble button always accessible in the top-right corner

### 🎉 Solve Detection

- Real-time solve checking after every user move
- Animated congratulations overlay with your stats
- "Play Again" immediately starts a new scramble

### 📱 Responsive Design

- Full desktop experience with keyboard hints and stats
- Tablet-friendly with scaled-down UI
- Mobile-optimized — stats and keyboard hints gracefully hide, touch controls work natively
- Works at any browser width without breaking

### 🎨 Aesthetic

- Deep space background with soft animated nebula and twinkling stars
- Neon-accented UI with Orbitron and Rajdhani typography
- Subtle scanlines and vignette for atmosphere
- Animated gradient logo cycling through all six cube face colors
- Celebration particles on solve

<br>

## Quick Start

### Play in the browser

Visit [**rohitmungre.github.io/open-rubik**](https://rohitmungre.github.io/open-rubik) — that's it.

### Run locally

```bash
git clone https://github.com/rohitmungre/open-rubik.git
cd open-rubik
open index.html
```

No package manager. No build step. No server required. It's a single HTML file.

<br>

## Project Structure

```
open-rubik/
├── index.html      # The entire app — markup, styles, and logic
├── README.md       # You're reading it
└── LICENSE         # MIT License
```

Yes, it's one file. That's intentional — it keeps the barrier to contribution as low as possible and makes the project trivially easy to fork, deploy, or embed.

<br>

## Tech Stack

| Layer | Technology |
|-------|-----------|
| 3D Engine | [Three.js](https://threejs.org) r128 (via CDN) |
| Rendering | WebGL with ACES filmic tone mapping |
| Shaders | Custom GLSL (background particles, grid effects) |
| UI | Vanilla HTML/CSS with CSS custom properties |
| Typography | [Orbitron](https://fonts.google.com/specimen/Orbitron) + [Rajdhani](https://fonts.google.com/specimen/Rajdhani) |
| Build | None — zero tooling required |

<br>

## Roadmap

Open Rubik is just getting started. Here's where we'd love to take it:

- [ ] **Skins** — alternative color schemes, textures, and cubie styles
- [ ] **Backgrounds** — selectable themes (space, grid, minimal, custom)
- [ ] **Speedcuber keyboard layout** — two-handed IJKL / ESDF mapping
- [ ] **Undo / redo** — step back through your moves
- [ ] **Move history** — visual notation log of your solve
- [ ] **Scramble notation display** — show the scramble sequence
- [ ] **Timer improvements** — best times, session averages, ao5/ao12
- [ ] **2×2 and 4×4** — additional cube sizes
- [ ] **Sound effects** — subtle click/snap audio feedback
- [ ] **Algorithms trainer** — practice OLL, PLL, and other algorithm sets
- [ ] **Replay** — watch your solve play back
- [ ] **Multiplayer** — race against others in real time
- [ ] **PWA support** — installable, works offline
- [ ] **Accessibility** — screen reader support, high contrast mode

Want to tackle one of these? We'd love your help. See [Contributing](#contributing) below.

<br>

## Contributing

Open Rubik is built by the community, for the community. Every contribution matters — whether it's a bug fix, a new feature, better docs, or a fresh idea.

### How to contribute

1. **Fork** the repository
2. **Create a branch** for your feature or fix
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** — the entire app is in `index.html`
4. **Test** by opening the file in your browser
5. **Submit a pull request** with a clear description of what you changed and why

### What makes a great contribution

- **Bug fixes** — found something broken? Fix it and submit a PR
- **Performance** — make animations smoother, reduce memory usage
- **New features** — check the roadmap or propose your own
- **Design** — improve the UI, add themes, refine animations
- **Accessibility** — help make the cube playable for everyone
- **Documentation** — improve this README, add code comments, write guides
- **Testing** — help us catch edge cases and cross-browser issues

### Guidelines

- Keep it simple — this is a single-file project and we'd like to keep it that way for as long as practical
- Test on both desktop and mobile before submitting
- Match the existing code style
- Be kind in discussions and code reviews

### First-time contributors

Never contributed to open source before? This is a great place to start. The project is a single HTML file with well-structured sections. Look for comments like `// ========== SECTION NAME ==========` to navigate the codebase.

<br>

## For the Cubing Community

Open Rubik isn't just a toy — it's a foundation. We want this to become the go-to open-source codebase for Rubik's Cube tools on the web.

If you're a **speedcuber**, help us get the keyboard controls right. If you're a **developer**, help us build features the community needs. If you're a **designer**, help us make it beautiful. If you're a **teacher**, help us make it educational.

The cube belongs to everyone. So does this project.

<br>

## License

MIT License — do whatever you want with it. See [LICENSE](LICENSE) for details.

<br>

<div align="center">

---

**[Play Open Rubik →](https://rohitmungre.github.io/open-rubik)**

Made with care for the cubing community.

</div>
