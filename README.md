# Random Team Generator (frontend)

A web app that builds random, balanced teams from a list of players based on their skill levels.
Users sign up and log in, manage their players, generate teams and share a link to a generated team.

It needs the API from **[team-flask-app](https://github.com/nawarajsubedi/team-flask-app)** for login and data.
The UI starts without it, but you can't log in.

## Tech stack

- React 18 + TypeScript (Create React App / `react-scripts` 5)
- React Bootstrap 5
- React Router 6
- React Hook Form

## Requirements

| Requirement | Version | Notes |
|---|---|---|
| **OS** | **Linux** (Ubuntu / Debian) | Use Linux to install, build and run. On Windows, use WSL 2 (Ubuntu); see [Other operating systems](#other-operating-systems) |
| Node.js | 18 or newer | Tested on 20 and 26. Install with [nvm](https://github.com/nvm-sh/nvm): `nvm install 20` |
| Yarn | 1.x (classic) | Install with `npm install -g yarn` |
| Backend | team-flask-app | Expected at <http://localhost:5001> |

### Tested on

| OS | Node.js | Result |
|---|---|---|
| **Linux** (Debian 12, Docker `node:20`) | 20.20 | Builds ✅ |
| macOS 26 (Apple Silicon) | 26.12 | Builds and starts ✅ |

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/nawarajsubedi/team-react-app.git
cd team-react-app
npm install -g yarn      # skip if you already have Yarn 1
yarn install
```

> Use Yarn: `yarn.lock` matches `package.json`, but `package-lock.json` is out of date, so `npm ci` fails.
> `npm install` also works, but it rewrites `package-lock.json`.

### 2. Check the API URL

The repo already includes a `.env` file:

```
REACT_APP_API_URL=http://localhost:5001
```

Change it if your backend runs somewhere else. Requests go to `<REACT_APP_API_URL>/api/v1/...`.
Restart `yarn start` after editing `.env`.

### 3. Start the backend

Follow the README in [team-flask-app](https://github.com/nawarajsubedi/team-flask-app). It runs with
`flask --app main --debug run --port 5001`.

### 4. Run the frontend

```bash
yarn start
```

Open <http://localhost:3000>.

## Scripts

| Command | What it does |
|---|---|
| `yarn start` | Dev server with hot reload on port 3000 |
| `yarn build` | Production build into `build/` |
| `yarn test` | Jest tests in watch mode |

To run the dev server on another port: `PORT=3001 yarn start`.

## Other operating systems

The supported OS is **Linux**. The commands above were written and tested for a Linux shell.

- **Windows**: install [WSL 2](https://learn.microsoft.com/windows/wsl/install) with Ubuntu, open the Ubuntu terminal, and follow the Linux steps exactly.
- **macOS**: the same commands work in Terminal (tested on macOS 26).

## Pages

| Path | Page |
|---|---|
| `/login`, `/signup` | Authentication |
| `/console/players` | Manage players and skill levels |
| `/console/team-generation` | Generate teams |
| `/console/teams` | Saved teams |
| `/teams/:teamname/:base64` | Shareable generated team |

## Project structure

```
src/
  app/App.tsx          Routes
  pages/               Login, signup, players, teams, team generation
  components/          Navbars, sidebar, cards, alerts
  services/            API calls (api.ts adds the auth token)
  hooks/               Auth context and form helpers
  common/              Constants (API_URL) and types
```
