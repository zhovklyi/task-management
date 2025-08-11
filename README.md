# Task Management System

A full-stack task management application built with Laravel 12 API and React + TypeScript frontend.

## Project Structure

```
task-management/
├── api/                 # Laravel 12 API Backend
├── app/                 # React + TypeScript Frontend Application
├── docker/              # Docker configuration files
│   ├── api/            # API Dockerfile
│   ├── app/            # App Dockerfile
│   └── docker-compose.yml
└── README.md
```

## Services

- **API**: Laravel 12 REST API (Port 8000)
- **App**: React + TypeScript SPA Frontend (Port 3000)
- **Database**: MySQL (Port 3306)

## Quick Start

1. **Build and start services:**
   ```bash
   cd docker
   docker-compose up --build
   ```

2. **Access applications:**
   - Frontend: http://localhost:3000
   - API: http://localhost:8000
   - Database: localhost:3306

## Development

- **API**: Laravel 12 with PHP 8.2
- **Frontend**: React 18 with TypeScript, Vite, ESLint, and Prettier
- **Database**: MySQL with persistent storage
- **Containerization**: Multi-stage Docker builds for production readiness

## Features

- Modern Laravel 12 API architecture
- React 18 with TypeScript and modern hooks
- Fast development with Vite
- Code quality tools (ESLint, Prettier)
- Production-ready Docker configuration
- Hot-reload development environment
