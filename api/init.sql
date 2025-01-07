-- Suppression des tables si elles existent
DROP TABLE IF EXISTS Reservations CASCADE;
DROP TABLE IF EXISTS MenuItems CASCADE;
DROP TABLE IF EXISTS Categories CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Zones CASCADE;
DROP TABLE IF EXISTS Roles CASCADE;

-- Création du type ENUM pour les statuts de réservation
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'cancelled');

-- Table `Roles`
CREATE TABLE Roles (
    "id" SERIAL PRIMARY KEY,                       -- Identifiant unique
    "name" VARCHAR(100) NOT NULL UNIQUE,           -- Nom du rôle (doit être unique pour éviter les doublons)
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), -- Date de création
    "updated_at" TIMESTAMPTZ DEFAULT now()        -- Date de mise à jour
);

-- Insertion des rôles
INSERT INTO Roles (name, created_at, updated_at) VALUES
    ('client', now(), now()),
    ('worker', now(), now()),
    ('manager', now(), now());

-- Table `Zones`
CREATE TABLE Zones (
    "id" SERIAL PRIMARY KEY,                       -- Identifiant unique
    "name" VARCHAR(100) NOT NULL UNIQUE,           -- Nom de la zone
    "capacity" INT NOT NULL,                      -- Capacité de la zone
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), -- Date de création
    "updated_at" TIMESTAMPTZ DEFAULT now()        -- Date de mise à jour
);

-- Table `Users`
CREATE TABLE Users (
    "id" SERIAL PRIMARY KEY,                       -- Identifiant unique
    "lastname" VARCHAR(100) NOT NULL,             -- Nom du client
    "firstname" VARCHAR(100) NOT NULL,            -- Prénom du client
    "email" VARCHAR(150) UNIQUE,                  -- Email du client (doit être unique)
    "phone" VARCHAR(20),                          -- Numéro de téléphone
    "password" VARCHAR(255),                      -- Mot de passe
    "role_id" INT NOT NULL,                       -- Identifiant du rôle
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), -- Date de création
    "updated_at" TIMESTAMPTZ DEFAULT now(),      -- Date de mise à jour
    CONSTRAINT phone_format CHECK (phone ~ '^\+?[0-9]*$'), -- Vérification du format téléphone
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE -- Clé étrangère vers la table Roles
);

-- Ajout de la valeur par défaut pour la colonne `role_id` dans la table `Users`
ALTER TABLE "users" ALTER COLUMN "role_id" SET DEFAULT 1;

-- Table `Categories` (pour catégoriser les éléments de menu)
CREATE TABLE Categories (
    "id" SERIAL PRIMARY KEY,                      -- Identifiant unique
    "name" VARCHAR(100) NOT NULL UNIQUE,           -- Nom de la catégorie
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), -- Date de création
    "updated_at" TIMESTAMPTZ DEFAULT now()        -- Date de mise à jour
);

-- Table `MenuItems` (éléments du menu comme plats, desserts, boissons, etc.)
CREATE TABLE MenuItems (
    "id" SERIAL PRIMARY KEY,                      -- Identifiant unique
    "name" VARCHAR(150) NOT NULL,                 -- Nom de l'élément
    "description" TEXT,                           -- Description de l'élément
    "price" NUMERIC(10, 2) NOT NULL,              -- Prix
    "category_id" INT NOT NULL,                   -- Référence à une catégorie
    "image_url" TEXT,                             -- URL d'une image du plat
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), -- Date de création
    "updated_at" TIMESTAMPTZ DEFAULT now(),       -- Date de mise à jour
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE CASCADE
);

-- Table `Reservations`
CREATE TABLE Reservations (
    "id" SERIAL PRIMARY KEY,                      -- Identifiant unique
    "user_id" INT NOT NULL,                       -- Référence au client
    "reservation_date" DATE NOT NULL,             -- Date de la réservation
    "reservation_time" TIME NOT NULL,             -- Heure de début de la réservation
    "number_of_people" INT NOT NULL,              -- Nombre de personnes
    "places_used" INT GENERATED ALWAYS AS (
        CASE 
            WHEN number_of_people % 2 = 0 THEN number_of_people 
            ELSE number_of_people + 1 
        END
    ) STORED,                                     -- Calcul automatique
    "end_time" TIME,                              -- Heure de fin (calculée par trigger)
    "note" VARCHAR(255),                          -- Note pour la réservation
    "status" reservation_status NOT NULL DEFAULT 'pending', -- Utilisation du type ENUM défini plus tôt
    "zone_id" INT,                                -- Référence à une zone
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(), -- Date de création
    "updated_at" TIMESTAMPTZ DEFAULT now(),       -- Date de mise à jour
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
    CONSTRAINT fk_zone FOREIGN KEY (zone_id) REFERENCES Zones(id) ON DELETE SET NULL
);

-- Fonction pour calculer `end_time`
CREATE OR REPLACE FUNCTION calculate_end_time()
RETURNS TRIGGER AS $$ 
BEGIN 
    -- Calcul automatique de `end_time` (ajoute 1h30 à `reservation_time`)
    NEW.end_time := NEW.reservation_time + INTERVAL '1 hour 30 minutes'; 
    RETURN NEW; 
END; 
$$ LANGUAGE plpgsql;

-- Trigger pour appliquer la fonction avant insertion ou mise à jour
CREATE TRIGGER trigger_calculate_end_time
BEFORE INSERT OR UPDATE ON Reservations
FOR EACH ROW
EXECUTE FUNCTION calculate_end_time();

-- Index pour optimiser les recherches sur les dates et heures
CREATE INDEX idx_reservation_date ON Reservations(reservation_date);
CREATE INDEX idx_user_id ON Reservations(user_id);
CREATE INDEX idx_zone_id ON Reservations(zone_id);
CREATE INDEX idx_status ON Reservations(status);
