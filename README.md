<p align="center">
  <img src="https://github.com/CodeIO-BMSCE/Webcampus/blob/main/apps/web/public/bmsce.svg" alt="BMSCE Logo" width="120" />
</p>

<h1 align="center">BMSCE WebCampus</h1>

## Prerequisites

### Install Bun

Follow the official Bun installation guide for your OS:
👉 [https://bun.sh/docs/installation](https://bun.sh/docs/installation)

> Bun supports:
>
> * Windows (via WSL or native PowerShell)
> * macOS (Intel & Apple Silicon)
> * Linux (Ubuntu, Arch, etc.)

### Install Docker

Make sure Docker Desktop is installed and running on your system:
👉 [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

> Required for local database setup using PostgreSQL and pgAdmin.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/CodeIO-BMSCE/Webcampus.git
cd Webcampus
```

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

```bash
cp packages/db/.env.example packages/db/.env
bunx turbo db:migrate
bunx turbo db:generate
bunx turbo db:deploy
```

Follow the [pgAdmin Setup Guide](./pgadmin.md) to connect to the PostgreSQL database.

---

## Contributing

1. Create a new branch
2. Make your changes
3. Open a Pull Request
