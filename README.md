# ft_transcendence

Une plateforme web de jeu Pong moderne développée dans le cadre du cursus 42.

## 📖 Description

ft_transcendence est une application web permettant aux utilisateurs de jouer à Pong en ligne, gérer leur profil, interagir avec d'autres joueurs et consulter leurs statistiques.

Le projet met l'accent sur le développement full-stack, la sécurité, l'authentification et les communications en temps réel.

## ✨ Fonctionnalités

- Authentification des utilisateurs
- Gestion des profils
- Jeu Pong en temps réel
- Matchmaking
- Historique des parties
- Classement des joueurs
- Système d'amis
- Chat en temps réel
- Interface responsive

## 🛠️ Technologies

### Frontend
- JavaScript
- React
- Tailwind CSS

### Backend
- Node.js
- Fastify
- PostgreSQL

### DevOps
- Docker
- Docker Compose
- Nginx

## 🚀 Installation

### Prérequis

- Docker
- Docker Compose

### Cloner le projet

```bash
git clone https://github.com/b-kolani/ft_transcendence.git
cd ft_transcendence
```

### Configuration

Créer un fichier `.env` :

```env
JWT_KEY=
GOOGLE_CLIENT_ID=
DATABASE_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_USERNAME=
VITE_API_BASE_URL=
VITE_GOOGLE_CLIENT_ID=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

### Lancer l'application

```bash
docker compose up --build
```

L'application sera disponible sur :

```
https://localhost:8443
```

## 📂 Structure du projet

```text
.
├── frontend/
├── backend/
├── certs/
├── .env.example
├── docker-compose.yml
├── nginx.conf
└── README.md
```

## 🔒 Sécurité

- Authentification sécurisée
- Gestion des sessions
- Protection contre les attaques courantes
- Communication HTTPS

## 📄 Licence

Projet académique réalisé à des fins pédagogiques dans le cadre de l'école 42.
