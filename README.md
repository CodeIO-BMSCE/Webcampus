# BMSCE WebCampus Monorepo

## Prerequisites

### Install Bun

Follow the official Bun installation guide for your OS:
👉 https://bun.sh/docs/installation

> Bun supports:
> - Windows (via WSL or native PowerShell)
> - macOS (Intel & Apple Silicon)
> - Linux (Ubuntu, Arch, etc.)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/CodeIOBMSCE/Webcampus.git
cd Webcampus
````

### 2. Install Dependencies

```bash
bun install
```

### 3. Start Development Server

```bash
bun run dev
```

---

## Database Setup

Follow the [pgAdmin Setup Guide](./pgadmin.md) to connect to the PostgreSQL database.

## Common Commands

| Command                    | Description                       |
| -------------------------- | --------------------------------- |
| `bun install`              | Install all dependencies          |
| `bun run dev --filter=app` | Run dev server for a specific app |
| `bun run build`            | Build all apps and packages       |
| `bun run lint`             | Lint the codebase                 |
| `bun run clean`            | Clean Turborepo cache             |

---

## Contributing
1. Create a new branch
2. Make your changes
3. Open a Pull Request