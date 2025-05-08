CREATE SCHEMA IF NOT EXISTS "public";

CREATE TABLE "public".userinfo (
    userinfoid      serial       NOT NULL,
    firstname       varchar(255) NOT NULL,
    lastname        varchar(255) NOT NULL,
    phonenumber     varchar(20)  NOT NULL,
    dateofbirth     date         NOT NULL,
    dateofhire      date         NOT NULL,
    sex             varchar(20)  NOT NULL,
    CONSTRAINT user_info_id_pkey PRIMARY KEY (userinfoid)
);
-- Sequence for userinfoid
CREATE SEQUENCE public.userinfo_userinfoid_seq START 1;

CREATE TABLE "public"."user" (
    userid      serial NOT NULL,
    userinfoid  integer NOT NULL,
    email       varchar(255) NOT NULL,
    username    varchar(255) NOT NULL,
    passwd      varchar(255) NOT NULL,
    usertype    varchar DEFAULT 'Employee'::character varying NOT NULL,
    lastlogin   date NOT NULL,
    isActive    BOOLEAN DEFAULT TRUE NOT NULL,
    CONSTRAINT user_id_pkey PRIMARY KEY( userid ),
    CONSTRAINT unique_email_address UNIQUE ( email ),
    CONSTRAINT user_info_id_fkey FOREIGN KEY ( userinfoid ) REFERENCES "public".userinfo( userinfoid )
);
-- Sequence for userid
CREATE SEQUENCE public.user_userid_seq START 1;

CREATE TABLE "public".activesessions (
    sessionid   varchar(128)    PRIMARY KEY,
    userid      integer         NOT NULL,
    createdat   TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT user_session_id_fkey FOREIGN KEY ( userid ) REFERENCES "public"."user"( userid )
);

CREATE TABLE "public".householdmembers (
    householdmemberid     serial        NOT NULL,
    firstname             varchar(255)  NOT NULL,
    lastname              varchar(255)  NOT NULL,
    dateofbirth           date          NOT NULL,
    sex                   varchar(20)   NOT NULL,
    CONSTRAINT household_member_id_pkey PRIMARY KEY  ( householdmemberid )
);
-- Sequence for householdmemberid
CREATE SEQUENCE public.householdmembers_householdmemberid_seq START 1;

CREATE TABLE "public".clientinfo (
    clientinfoid    serial          NOT NULL,
    firstname       varchar(255)    NOT NULL,
    lastname        varchar(255)    NOT NULL,
    phonenumber     varchar(20)     NOT NULL,
    dateofbirth     date            NOT NULL,
    dateadded       date            NOT NULL,
    email           varchar(255)    NOT NULL,
    sex             varchar(20)     NOT NULL,
    CONSTRAINT client_info_id_pkey  PRIMARY KEY ( clientinfoid )
);
-- Sequence for clientinfoid
CREATE SEQUENCE public.clientinfo_clientinfoid_seq START 1;

CREATE TABLE "public".addressinfo (
    addressid       serial          NOT NULL,
    clientid        integer         NOT NULL,
    street          varchar(255)    NOT NULL,
    city            varchar(255)    NOT NULL,
    state           varchar(50)     NOT NULL,
    postalcode      varchar(20)     NOT NULL,
    CONSTRAINT address_info_id_pkey PRIMARY KEY ( addressid ),
    CONSTRAINT fkey_client_info_id_fkey FOREIGN KEY ( clientid ) REFERENCES "public".clientinfo( clientinfoid ) ON DELETE CASCADE
);
-- Sequence for addressid
CREATE SEQUENCE public.addressinfo_addressid_seq START 1;

CREATE TABLE "public".household (
    clientinfoid      integer     NOT NULL,
    householdmemberid integer     NOT NULL,
    CONSTRAINT household_id_pkey PRIMARY KEY ( clientinfoid, householdmemberid ),
    CONSTRAINT client_info_id_fkey FOREIGN KEY ( clientinfoid ) REFERENCES "public".clientinfo( clientinfoid ) ON DELETE CASCADE,
    CONSTRAINT household_member_id_fkey FOREIGN KEY ( householdmemberid ) REFERENCES "public".householdmembers( householdmemberid ) ON DELETE CASCADE
);

CREATE TABLE "public".servicecategory (
    categoryname    varchar(255)    NOT NULL,
    CONSTRAINT category_name_pkey PRIMARY KEY ( categoryname )
);
-- Sequence for categoryname
CREATE SEQUENCE public.servicecategory_categoryname_seq START 1;

CREATE TABLE "public".services (
    serviceid       serial          NOT NULL,
    servicename     varchar(255)    NOT NULL,
    servicedate     date            NOT NULL,
    amount          varchar(255),
    categoryname    varchar(255)    NOT NULL,
    CONSTRAINT service_name_pkey PRIMARY KEY ( servicename ),
    CONSTRAINT service_category_fkey FOREIGN KEY ( categoryname ) REFERENCES "public".servicecategory( categoryname )
);
-- Sequence for serviceid
CREATE SEQUENCE public.services_serviceid_seq START 1;

CREATE TABLE "public".appointments (
    appointmentid       serial      NOT NULL,
    appointmentdate     date        NOT NULL,
    inquirydate         date        NOT NULL,
    revieweddate        date,
    status              varchar(20) NOT NULL,
    clientinfoid        integer     NOT NULL,
    userinfoid          integer     NOT NULL,
    CONSTRAINT appointment_id_pkey    PRIMARY KEY ( appointmentid ),
    CONSTRAINT fk_client_info_id FOREIGN KEY ( clientinfoid ) REFERENCES "public".clientinfo( clientinfoid ),
    CONSTRAINT fk_user_info_id FOREIGN KEY ( userinfoid ) REFERENCES "public".userinfo( userinfoid )
);
-- Sequence for appointmentid
CREATE SEQUENCE public.appointments_appointmentid_seq START 1;

CREATE TABLE "public".appointmentservices (
    appointmentid       integer          NOT NULL,
    servicename         varchar(255)     NOT NULL,
    CONSTRAINT appointment_services_pkey PRIMARY KEY ( appointmentid, servicename ),
    CONSTRAINT appointment_id_fkey  FOREIGN KEY ( appointmentid ) REFERENCES "public".appointments( appointmentid ),
    CONSTRAINT service_id_fkey FOREIGN KEY ( servicename ) REFERENCES "public".services( servicename )
);
