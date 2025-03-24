-- Création de la base de données
CREATE DATABASE appartements_db;

-- Utilisation de la base de données
\c appartements_db;

-- Table des immeubles
CREATE TABLE immeubles (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    code_postal VARCHAR(20) NOT NULL,
    pays VARCHAR(50) NOT NULL,
    date_construction DATE,
    superficie_totale DECIMAL(10, 2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des appartements
CREATE TABLE appartements (
    id SERIAL PRIMARY KEY,
    immeuble_id INTEGER REFERENCES immeubles(id),
    numero VARCHAR(20) NOT NULL,
    etage VARCHAR(10),
    superficie DECIMAL(8, 2) NOT NULL,
    nombre_pieces INTEGER NOT NULL,
    loyer DECIMAL(10, 2) NOT NULL,
    charges DECIMAL(8, 2) NOT NULL,
    statut VARCHAR(20) NOT NULL DEFAULT 'disponible',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des locataires
CREATE TABLE locataires (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telephone VARCHAR(20),
    date_naissance DATE,
    profession VARCHAR(100),
    revenu_mensuel DECIMAL(10, 2),
    documents_fournis JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des contrats
CREATE TABLE contrats (
    id SERIAL PRIMARY KEY,
    appartement_id INTEGER REFERENCES appartements(id),
    locataire_id INTEGER REFERENCES locataires(id),
    date_debut DATE NOT NULL,
    date_fin DATE,
    loyer_mensuel DECIMAL(10, 2) NOT NULL,
    depot_garantie DECIMAL(10, 2) NOT NULL,
    statut VARCHAR(20) NOT NULL DEFAULT 'en attente',
    documents_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des paiements
CREATE TABLE paiements (
    id SERIAL PRIMARY KEY,
    contrat_id INTEGER REFERENCES contrats(id),
    date_paiement DATE NOT NULL,
    montant DECIMAL(10, 2) NOT NULL,
    type VARCHAR(20) NOT NULL,
    methode_paiement VARCHAR(50),
    statut VARCHAR(20) NOT NULL DEFAULT 'en attente',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des incidents
CREATE TABLE incidents (
    id SERIAL PRIMARY KEY,
    appartement_id INTEGER REFERENCES appartements(id),
    date_signalement DATE NOT NULL,
    description TEXT NOT NULL,
    priorite VARCHAR(20) NOT NULL,
    statut VARCHAR(20) NOT NULL DEFAULT 'ouvert',
    cout_reparation DECIMAL(10, 2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX idx_appartements_immeuble_id ON appartements(immeuble_id);
CREATE INDEX idx_contrats_appartement_id ON contrats(appartement_id);
CREATE INDEX idx_contrats_locataire_id ON contrats(locataire_id);
CREATE INDEX idx_paiements_contrat_id ON paiements(contrat_id);
CREATE INDEX idx_incidents_appartement_id ON incidents(appartement_id);