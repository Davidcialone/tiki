-- Suppression des tables si elles existent
DROP TABLE IF EXISTS Reservations CASCADE;
DROP TABLE IF EXISTS MenuItems CASCADE;
DROP TABLE IF EXISTS Categories CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Zones CASCADE;
DROP TABLE IF EXISTS Roles CASCADE;

-- Type ENUM pour `status`
CREATE TYPE status_enum AS ENUM ('pending', 'confirmed', 'cancelled');

-- Table `Roles`
CREATE TABLE Roles (
    "id" SERIAL PRIMARY KEY,                       
    "name" VARCHAR(100) NOT NULL UNIQUE,          
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now()        
);

-- Insertion des rôles
INSERT INTO Roles (name, created_at, updated_at) VALUES
    ('client', now(), now()),
    ('worker', now(), now()),
    ('manager', now(), now());

-- Table `Zones`
CREATE TABLE Zones (
    "id" SERIAL PRIMARY KEY,                       
    "name" VARCHAR(100) NOT NULL UNIQUE,          
    "capacity" INT NOT NULL,                      
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now()        
);

-- Table `Users`
CREATE TABLE Users (
    "id" SERIAL PRIMARY KEY,                       
    "lastname" VARCHAR(100) NOT NULL,             
    "firstname" VARCHAR(100) NOT NULL,            
    "email" VARCHAR(150) UNIQUE,                  
    "phone" VARCHAR(20),                          
    "password" VARCHAR(255),                      
    "role_id" INT NOT NULL DEFAULT 1,             
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now(),       
    CONSTRAINT phone_format CHECK (phone ~ '^\+?[0-9]*$'),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE 
);

-- Table `Categories`
CREATE TABLE Categories (
    "id" SERIAL PRIMARY KEY,                      
    "name" VARCHAR(100) NOT NULL UNIQUE,          
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now()        
);

-- Table `MenuItems`
CREATE TABLE MenuItems (
    "id" SERIAL PRIMARY KEY,                       
    "name" VARCHAR(150) NOT NULL,                
    "description" TEXT,                          
    "price" NUMERIC(10, 2) NOT NULL,             
    "category_id" INT NOT NULL,                  
    "image_url" TEXT,                            
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now(),      
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE CASCADE
);

-- Table `Reservations`
CREATE TABLE Reservations (
    "id" SERIAL PRIMARY KEY,                      
    "user_id" INT NOT NULL,                      
    "reservation_date" DATE NOT NULL,            
    "reservation_time" TIME NOT NULL,            
    "number_of_people" INT NOT NULL,             
    "places_used" INT GENERATED ALWAYS AS (
        CASE 
            WHEN number_of_people % 2 = 0 THEN number_of_people 
            ELSE number_of_people + 1 
        END
    ) STORED,                                     
    "end_time" TIME,                             
    "note" VARCHAR(255),                         
    status status_enum NOT NULL DEFAULT 'pending',
    "zone_id" INT,                               
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now(),      
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
CREATE INDEX idx_reservation_date_time
ON Reservations (reservation_date, reservation_time);

-- Autres Index pour optimisations
CREATE INDEX idx_reservation_status
ON Reservations (status);
CREATE INDEX idx_reservation_user_id
ON Reservations (user_id);
CREATE INDEX idx_reservation_zone_id
ON Reservations (zone_id);
