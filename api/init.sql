-- Suppression des tables si elles existent
DROP TABLE IF EXISTS "Reservation" CASCADE;
DROP TABLE IF EXISTS "MenuItem" CASCADE;
DROP TABLE IF EXISTS "Categorie" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "Zone" CASCADE;
DROP TABLE IF EXISTS "Role" CASCADE;

-- Définir un type ENUM pour `status`
CREATE TYPE "enum_Reservation_status" AS ENUM ('pending', 'reserved', 'cancelled');  -- Vérifiez si le schéma est correct (public, ou sans schéma)


-- Table `Roles`
CREATE TABLE "Role" (
    "id" SERIAL PRIMARY KEY,                       
    "name" VARCHAR(100) NOT NULL UNIQUE,          
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now()        
);

-- Insertion des rôles
INSERT INTO "Role" ("name", "created_at", "updated_at") VALUES
    ('client', now(), now()),
    ('worker', now(), now()),
    ('manager', now(), now());

-- Table `Zones`
CREATE TABLE "Zone" (
    "id" SERIAL PRIMARY KEY,                       
    "name" VARCHAR(100) NOT NULL UNIQUE,          
    "capacity" INT NOT NULL,                      
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now()        
);

-- Table `Users`
CREATE TABLE "User" (
    "id" SERIAL PRIMARY KEY,                       
    "lastname" VARCHAR(100) NOT NULL,             
    "firstname" VARCHAR(100) NOT NULL,            
    "email" VARCHAR(150) UNIQUE,                  
    "phone" VARCHAR(20),                          
    "password" VARCHAR(255),                      
    "role_id" INT NOT NULL DEFAULT 1,             
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now(),       
    CONSTRAINT phone_format CHECK ("phone" ~ '^\+?[0-9]*$'),
    CONSTRAINT fk_role FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE 
);

-- Table `Categories`
CREATE TABLE "Categorie" (
    "id" SERIAL PRIMARY KEY,                      
    "name" VARCHAR(100) NOT NULL UNIQUE,          
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now()        
);

-- Table `MenuItems`
CREATE TABLE "MenuItem" (
    "id" SERIAL PRIMARY KEY,                       
    "name" VARCHAR(150) NOT NULL,                 
    "description" TEXT,                          
    "price" NUMERIC(10, 2) NOT NULL,             
    "category_id" INT NOT NULL,                   
    "image_url" TEXT,                            
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now(),       
    CONSTRAINT fk_category FOREIGN KEY ("category_id") REFERENCES "Categorie"("id") ON DELETE CASCADE
);

-- Table `Reservations`
CREATE TYPE enum_Reservation_status AS ENUM ('pending', 'reserved', 'cancelled'); -- Définir un type ENUM pour `status`

CREATE TABLE "Reservation" (
    "id" SERIAL PRIMARY KEY,                      
    "user_id" INT NOT NULL,                       
    "reservation_date" DATE NOT NULL,             
    "reservation_time" TIME NOT NULL,             
    "number_of_people" INT NOT NULL CHECK ("number_of_people" > 0), -- Validation pour des valeurs positives
    "places_used" INT NOT NULL CHECK ("places_used" > 0), -- Validation pour des tables valides
    "end_time" TIME NOT NULL,                    
    "note" VARCHAR(255),                          
    "status" "enum_Reservation_status" NOT NULL DEFAULT 'pending', -- Utilisation correcte du type ENUM
    "zone_id" INT,                              
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ DEFAULT now(),
    CONSTRAINT fk_user FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE,
    CONSTRAINT fk_zone FOREIGN KEY ("zone_id") REFERENCES "Zone"("id") ON DELETE SET NULL
);

