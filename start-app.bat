@echo off
echo Installation des dependances...
call npm install
cd backend
call npm install
cd ../frontend
call npm install
cd ..

echo Demarrage du backend et du frontend...
start cmd /k "cd backend && npm run dev"
start cmd /k "cd frontend && npm start"

echo Application demarree !
echo Backend sur http://localhost:3002
echo Frontend sur http://localhost:3001
