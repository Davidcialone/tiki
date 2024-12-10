
INIT
-- Table `Users` pour stocker les informations des clients
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,           -- Identifiant unique
    lastname VARCHAR(100) NOT NULL,      -- Nom du client
    firstname VARCHAR(100) NOT NULL,    -- Prénom du client
    email VARCHAR(150) UNIQUE,       -- Email du client (doit être unique)
    phone VARCHAR(20),               -- Numéro de téléphone
    role_id INT NOT NULL,            -- Identifiant du rôle
    created_at TIMESTAMP DEFAULT NOW() -- Date de création
    updated_at TIMESTAMP DEFAULT NOW() -- Date de mise à jour
);

CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,           -- Identifiant unique
    name VARCHAR(100) NOT NULL,      -- Nom du rôle
    created_at TIMESTAMP DEFAULT NOW() -- Date de création
    updated_at TIMESTAMP DEFAULT NOW() -- Date de mise à jour
);

-- Table `Reservations` pour stocker les réservations
CREATE TABLE Reservations (
    id SERIAL PRIMARY KEY,               -- Identifiant unique
    user_id INT NOT NULL,                -- Référence au client
    reservation_date DATE NOT NULL,      -- Date de la réservation
    reservation_time TIME NOT NULL,      -- Heure de début de la réservation
    number_of_people INT NOT NULL,       -- Nombre de personnes
    places_used INT NOT NULL CHECK (places_used % 2 = 0), -- Multiple de 2
    end_time TIME NOT NULL CHECK (end_time > reservation_time), -- Vérification durée
    note VARCHAR(255),                   -- Note éventuelle             
    created_at TIMESTAMP DEFAULT NOW(),  -- Date de création
    updated_at TIMESTAMP DEFAULT NOW(),  -- Date de mise à jour
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE
);

-- Index pour optimiser les recherches sur les dates et heures
CREATE INDEX idx_reservation_date_time
ON Reservations (reservation_date, reservation_time);
