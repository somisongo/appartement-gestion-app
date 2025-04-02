@echo off
echo Installation des dependances...

REM Verifier l'existence du package.json avant de lancer npm install
if exist package.json (
  call npm install
) else (
  echo Fichier package.json non trouve a la racine. Creation du fichier...
  echo {"name":"appartement-gestion-app","version":"1.0.0","description":"Application web de gestion d'appartements","scripts":{"install:all":"npm run install:backend && npm run install:frontend","install:backend":"cd backend && npm install","install:frontend":"cd frontend && npm install","start":"concurrently \"npm run start:backend\" \"npm run start:frontend\"","start:backend":"cd backend && npm run dev","start:frontend":"cd frontend && npm start","build":"cd frontend && npm run build"},"devDependencies":{"concurrently":"^7.6.0"},"engines":{"node":">=14.0.0"},"private":true} > package.json
  call npm install
)

REM Installation des dependances du backend
cd backend
if exist package.json (
  call npm install
) else (
  echo Fichier package.json non trouve dans backend.
  exit /b 1
)

REM Installation des dependances du frontend
cd ../frontend
if exist package.json (
  call npm install
) else (
  echo Fichier package.json non trouve dans frontend.
  exit /b 1
)

REM Verifier l'existence du dossier public
if not exist public (
  echo Dossier public non trouve. Creation du dossier...
  mkdir public
)

REM Verifier l'existence du fichier index.html
if not exist public\index.html (
  echo Fichier index.html non trouve. Creation du fichier...
  echo ^<!DOCTYPE html^>^<html lang="fr"^>^<head^>^<meta charset="utf-8" /^>^<meta name="viewport" content="width=device-width, initial-scale=1" /^>^<meta name="theme-color" content="#000000" /^>^<meta name="description" content="Application de gestion d'appartements" /^>^<title^>Gestion d'Appartements^</title^>^</head^>^<body^>^<noscript^>Vous devez activer JavaScript pour executer cette application.^</noscript^>^<div id="root"^>^</div^>^</body^>^</html^> > public\index.html
)

cd ..

echo Demarrage du backend et du frontend...
start cmd /k "cd backend && npm run dev"
start cmd /k "cd frontend && npm start"

echo Application demarree !
echo Backend sur http://localhost:3002
echo Frontend sur http://localhost:3001
