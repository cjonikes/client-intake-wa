CREATE SCHEMA IF NOT EXISTS public;

-- =========================
-- USERS
-- =========================

CREATE TABLE public.user_info (
    user_info_id   SERIAL PRIMARY KEY,
    first_name     VARCHAR(255) NOT NULL,
    last_name      VARCHAR(255) NOT NULL,
    phone_number   VARCHAR(20),
    date_of_birth  DATE NOT NULL,
    date_of_hire   DATE NOT NULL,
    sex            CHAR(1) NOT NULL CHECK (sex IN ('M', 'F', 'O'))
);

CREATE TABLE public.users (
    user_id        SERIAL PRIMARY KEY,
    user_info_id   INTEGER NOT NULL UNIQUE,
    email          VARCHAR(255) NOT NULL UNIQUE,
    username       VARCHAR(255) NOT NULL UNIQUE,
    password_hash  VARCHAR(255) NOT NULL,
    user_type      VARCHAR(50) NOT NULL DEFAULT 'employee',
    last_login     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_active      BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT fk_user_user_info
        FOREIGN KEY (user_info_id)
        REFERENCES public.user_info (user_info_id)
        ON DELETE CASCADE
);

CREATE TABLE public.active_sessions (
    session_id   VARCHAR(128) PRIMARY KEY,
    user_id      INTEGER NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_session_user
        FOREIGN KEY (user_id)
        REFERENCES public.users (user_id)
        ON DELETE CASCADE
);

-- =========================
-- CLIENTS
-- =========================

CREATE TABLE public.clients (
    client_id      SERIAL PRIMARY KEY,
    first_name     VARCHAR(255) NOT NULL,
    last_name      VARCHAR(255) NOT NULL,
    sex            CHAR(1) NOT NULL CHECK (sex IN ('M', 'F', 'O')),
    date_of_birth  DATE NOT NULL,
    date_added     DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE public.client_info (
    client_info_id SERIAL PRIMARY KEY,
    client_id      INTEGER NOT NULL UNIQUE,
    phone_number   VARCHAR(20),
    email          VARCHAR(255),
    CONSTRAINT fk_client_info_client
        FOREIGN KEY (client_id)
        REFERENCES public.clients (client_id)
        ON DELETE CASCADE
);

-- =========================
-- ADDRESSES
-- =========================

CREATE TABLE public.addresses (
    address_id     SERIAL PRIMARY KEY,
    client_info_id INTEGER NOT NULL,
    street         VARCHAR(255) NOT NULL,
    city           VARCHAR(255) NOT NULL,
    state          VARCHAR(50) NOT NULL,
    postal_code    VARCHAR(20) NOT NULL,
    CONSTRAINT fk_address_client_info
        FOREIGN KEY (client_info_id)
        REFERENCES public.client_info (client_info_id)
        ON DELETE CASCADE
);

-- =========================
-- HOUSEHOLDS
-- =========================

CREATE TABLE public.households (
    household_id SERIAL PRIMARY KEY
);

CREATE TABLE public.household_members (
    client_id     INTEGER NOT NULL,
    household_id  INTEGER NOT NULL,
    PRIMARY KEY (client_id, household_id),
    CONSTRAINT fk_household_client
        FOREIGN KEY (client_id)
        REFERENCES public.clients (client_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_household
        FOREIGN KEY (household_id)
        REFERENCES public.households (household_id)
        ON DELETE CASCADE
);

-- =========================
-- SERVICES
-- =========================

CREATE TABLE public.service_categories (
    category_id   SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE public.services (
    service_id    SERIAL PRIMARY KEY,
    service_name  VARCHAR(255) NOT NULL UNIQUE,
    service_date  DATE NOT NULL,
    amount        NUMERIC(10,2),
    category_id   INTEGER NOT NULL,
    CONSTRAINT fk_service_category
        FOREIGN KEY (category_id)
        REFERENCES public.service_categories (category_id)
);

-- =========================
-- APPOINTMENTS
-- =========================

CREATE TABLE public.appointments (
    appointment_id   SERIAL PRIMARY KEY,
    appointment_date DATE NOT NULL,
    inquiry_date     DATE NOT NULL,
    reviewed_date    DATE,
    status           VARCHAR(20) NOT NULL,
    client_id        INTEGER NOT NULL,
    user_info_id     INTEGER NOT NULL,
    CONSTRAINT fk_appointment_client
        FOREIGN KEY (client_id)
        REFERENCES public.clients (client_id),
    CONSTRAINT fk_appointment_user_info
        FOREIGN KEY (user_info_id)
        REFERENCES public.user_info (user_info_id)
);

CREATE TABLE public.appointment_services (
    appointment_id INTEGER NOT NULL,
    service_id     INTEGER NOT NULL,
    PRIMARY KEY (appointment_id, service_id),
    CONSTRAINT fk_appointment_service_appointment
        FOREIGN KEY (appointment_id)
        REFERENCES public.appointments (appointment_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_appointment_service_service
        FOREIGN KEY (service_id)
        REFERENCES public.services (service_id)
);
