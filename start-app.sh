#!/bin/bash

# Script pour démarrer l'application complète (backend et frontend)

echo "Installation des dépendances..."
npm install
cd backend && npm install
cd ../frontend && npm install
cd ..

echo "Démarrage du backend et du frontend..."
gnome-terminal --tab --title="Backend" --command="bash -c 'cd backend && npm run dev; exec bash'"
gnome-terminal --tab --title="Frontend" --command="bash -c 'cd frontend && npm start; exec bash'"

echo "Application démarrée !"
echo "Backend sur http://localhost:3002"
echo "Frontend sur http://localhost:3001"
