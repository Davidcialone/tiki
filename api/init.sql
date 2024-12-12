-- Table `Users`
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,           -- Identifiant unique
    lastname VARCHAR(100) NOT NULL,  -- Nom du client
    firstname VARCHAR(100) NOT NULL, -- Prénom du client
    email VARCHAR(150) UNIQUE,       -- Email du client (doit être unique)
    phone VARCHAR(20),               -- Numéro de téléphone
    role_id INT NOT NULL,            -- Identifiant du rôle
    created_at TIMESTAMP DEFAULT NOW(), -- Date de création
    updated_at TIMESTAMP DEFAULT NOW(), -- Date de mise à jour
    CONSTRAINT phone_format CHECK (phone ~ '^\+?[0-9]*$') -- Vérification du format téléphone
);

-- Table `Roles`
CREATE TABLE Roles (
    id SERIAL PRIMARY KEY,           -- Identifiant unique
    name VARCHAR(100) NOT NULL,      -- Nom du rôle
    created_at TIMESTAMP DEFAULT NOW(), -- Date de création
    updated_at TIMESTAMP DEFAULT NOW()  -- Date de mise à jour
);

-- Table `Zones`
CREATE TABLE Zones (
    id SERIAL PRIMARY KEY,           -- Identifiant unique
    name VARCHAR(100) NOT NULL UNIQUE, -- Nom de la zone
    created_at TIMESTAMP DEFAULT NOW(), -- Date de création
    updated_at TIMESTAMP DEFAULT NOW()  -- Date de mise à jour
);

-- Table `Reservations`
CREATE TABLE Reservations (  
    id SERIAL PRIMARY KEY,                  -- Identifiant unique
    user_id INT NOT NULL,                   -- Référence au client
    reservation_date DATE NOT NULL,         -- Date de la réservation
    reservation_time TIME NOT NULL,         -- Heure de début de la réservation
    number_of_people INT NOT NULL,          -- Nombre de personnes
    places_used INT GENERATED ALWAYS AS (CASE 
                                            WHEN number_of_people % 2 = 0 
                                            THEN number_of_people 
                                            ELSE number_of_people + 1 
                                          END) STORED, -- Calcul automatique
    end_time TIME NOT NULL DEFAULT (reservation_time + INTERVAL '1 hour 30 minutes'), -- Durée par défaut 1h30
    note VARCHAR(255),                      -- Note éventuelle             
    zone_id INT,                            -- Référence à une zone
    created_at TIMESTAMP DEFAULT NOW(),     -- Date de création
    updated_at TIMESTAMP DEFAULT NOW(),     -- Date de mise à jour
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
    CONSTRAINT fk_zone FOREIGN KEY (zone_id) REFERENCES Zones (id) ON DELETE SET NULL
);


-- Index pour optimiser les recherches sur les dates et heures
CREATE INDEX idx_reservation_date_time
ON Reservations (reservation_date, reservation_time);
