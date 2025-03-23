--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2025-03-23 14:48:55

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.email_setting_subjects_translation DROP CONSTRAINT "FK_f699e8bc25f8946be4979d1e28a";
ALTER TABLE ONLY public.configuration_languages_language DROP CONSTRAINT "FK_f178b4133889e2424829afc1813";
ALTER TABLE ONLY public.email_setting_footers_translation DROP CONSTRAINT "FK_f00dbba1e55e866a027698005e0";
ALTER TABLE ONLY public.user_establishment_role DROP CONSTRAINT "FK_ebbac93cdbc5b31af0fa8eb595d";
ALTER TABLE ONLY public.user_establishment_role DROP CONSTRAINT "FK_e5a9c2c70ed160b7f6ed119e69d";
ALTER TABLE ONLY public.configuration DROP CONSTRAINT "FK_dbbe91bd37dacd531a8cf62f78a";
ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_d4207055ad1a09811cbbb27b287";
ALTER TABLE ONLY public.module_titles_translation DROP CONSTRAINT "FK_d3ae98e2422004d0bfe23fc6cb4";
ALTER TABLE ONLY public.email_setting_titles_translation DROP CONSTRAINT "FK_cf28280a69cfbdd4b67beba9d53";
ALTER TABLE ONLY public.permission DROP CONSTRAINT "FK_cdb4db95384a1cf7a837c4c683e";
ALTER TABLE ONLY public.role_titles_translation DROP CONSTRAINT "FK_bdd65156dc05ffba91d2478d9d8";
ALTER TABLE ONLY public.email_setting_contents_translation DROP CONSTRAINT "FK_b4411086db06900167c713f84ce";
ALTER TABLE ONLY public.user_establishment_role DROP CONSTRAINT "FK_b12c186c99f29d959b6186b6d03";
ALTER TABLE ONLY public.role_descriptions_translation DROP CONSTRAINT "FK_9cb338e9b809f7460bda599a884";
ALTER TABLE ONLY public.permission DROP CONSTRAINT "FK_93f3a12d9c620330c60959c44fc";
ALTER TABLE ONLY public.preference DROP CONSTRAINT "FK_8daa6988da560d702472cf8cbc3";
ALTER TABLE ONLY public.email_setting_contents_translation DROP CONSTRAINT "FK_8657704a67845ab991c951580b8";
ALTER TABLE ONLY public.functionality_titles_translation DROP CONSTRAINT "FK_82d7d7534db2fb9196b565a55f2";
ALTER TABLE ONLY public.configuration DROP CONSTRAINT "FK_82ce91191fa180b111d46293066";
ALTER TABLE ONLY public.email_setting DROP CONSTRAINT "FK_7ebd8e59725c95d9814dae5be62";
ALTER TABLE ONLY public.translation DROP CONSTRAINT "FK_7c256f0ca19bb69a49f3b23e002";
ALTER TABLE ONLY public.email_setting_footers_translation DROP CONSTRAINT "FK_7237d3b67c4d23e6438b99ad973";
ALTER TABLE ONLY public.role_descriptions_translation DROP CONSTRAINT "FK_7212b94d000085f7c0911df4cd4";
ALTER TABLE ONLY public.establishment DROP CONSTRAINT "FK_6df81fc013784b858cd7ebb4d64";
ALTER TABLE ONLY public.module_titles_translation DROP CONSTRAINT "FK_6740c22145d5f4f7174ecb65178";
ALTER TABLE ONLY public.configuration_languages_language DROP CONSTRAINT "FK_620cd14dca4444668fd5e28e7f4";
ALTER TABLE ONLY public.configuration DROP CONSTRAINT "FK_5e699c5b5fece26a1bc7c78101a";
ALTER TABLE ONLY public."user" DROP CONSTRAINT "FK_5e028298e103e1694147ada69e5";
ALTER TABLE ONLY public.module DROP CONSTRAINT "FK_5a84e5e50828623d8b310fb868c";
ALTER TABLE ONLY public.email_setting_subjects_translation DROP CONSTRAINT "FK_500838270092832bbe339907a5f";
ALTER TABLE ONLY public.preference DROP CONSTRAINT "FK_482091f89aa94deda3a9f48c625";
ALTER TABLE ONLY public.module_descriptions_translation DROP CONSTRAINT "FK_457b2ba3737cdaa382f7a29f1d8";
ALTER TABLE ONLY public.role DROP CONSTRAINT "FK_2e73270812d16f2fb9d0dd4b0ce";
ALTER TABLE ONLY public.module_descriptions_translation DROP CONSTRAINT "FK_29558b8f091b4efc47d3c5c94d8";
ALTER TABLE ONLY public.functionality_titles_translation DROP CONSTRAINT "FK_27df7a749ebf82453cbede77f78";
ALTER TABLE ONLY public.language DROP CONSTRAINT "FK_242e561e13e04d77281c36e1eb3";
ALTER TABLE ONLY public.functionality DROP CONSTRAINT "FK_206067e19a5d249b18faf01c940";
ALTER TABLE ONLY public.role_titles_translation DROP CONSTRAINT "FK_19689c5f9d2a45063f1caefdbca";
ALTER TABLE ONLY public.email_setting_titles_translation DROP CONSTRAINT "FK_17ed6ad7fcb7c07d52112c776b0";
DROP INDEX public."IDX_session_expire";
DROP INDEX public."IDX_f699e8bc25f8946be4979d1e28";
DROP INDEX public."IDX_f178b4133889e2424829afc181";
DROP INDEX public."IDX_f00dbba1e55e866a027698005e";
DROP INDEX public."IDX_d3ae98e2422004d0bfe23fc6cb";
DROP INDEX public."IDX_cf28280a69cfbdd4b67beba9d5";
DROP INDEX public."IDX_bdd65156dc05ffba91d2478d9d";
DROP INDEX public."IDX_b4411086db06900167c713f84c";
DROP INDEX public."IDX_9cb338e9b809f7460bda599a88";
DROP INDEX public."IDX_8657704a67845ab991c951580b";
DROP INDEX public."IDX_82d7d7534db2fb9196b565a55f";
DROP INDEX public."IDX_7237d3b67c4d23e6438b99ad97";
DROP INDEX public."IDX_7212b94d000085f7c0911df4cd";
DROP INDEX public."IDX_6740c22145d5f4f7174ecb6517";
DROP INDEX public."IDX_620cd14dca4444668fd5e28e7f";
DROP INDEX public."IDX_500838270092832bbe339907a5";
DROP INDEX public."IDX_457b2ba3737cdaa382f7a29f1d";
DROP INDEX public."IDX_29558b8f091b4efc47d3c5c94d";
DROP INDEX public."IDX_27df7a749ebf82453cbede77f7";
DROP INDEX public."IDX_19689c5f9d2a45063f1caefdbc";
DROP INDEX public."IDX_17ed6ad7fcb7c07d52112c776b";
ALTER TABLE ONLY public.sessions DROP CONSTRAINT session_pkey;
ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22";
ALTER TABLE ONLY public.configuration DROP CONSTRAINT "UQ_dbbe91bd37dacd531a8cf62f78a";
ALTER TABLE ONLY public.configuration DROP CONSTRAINT "UQ_82ce91191fa180b111d46293066";
ALTER TABLE ONLY public."user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb";
ALTER TABLE ONLY public.configuration DROP CONSTRAINT "UQ_5e699c5b5fece26a1bc7c78101a";
ALTER TABLE ONLY public.language DROP CONSTRAINT "UQ_242e561e13e04d77281c36e1eb3";
ALTER TABLE ONLY public."user" DROP CONSTRAINT "REL_d4207055ad1a09811cbbb27b28";
ALTER TABLE ONLY public.establishment DROP CONSTRAINT "REL_6df81fc013784b858cd7ebb4d6";
ALTER TABLE ONLY public."user" DROP CONSTRAINT "REL_5e028298e103e1694147ada69e";
ALTER TABLE ONLY public.image DROP CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3";
ALTER TABLE ONLY public.role_titles_translation DROP CONSTRAINT "PK_cc99950a665d20dbdee005121a1";
ALTER TABLE ONLY public.language DROP CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c";
ALTER TABLE ONLY public."user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760";
ALTER TABLE ONLY public.module_titles_translation DROP CONSTRAINT "PK_c95481454d627b945e547b5a05e";
ALTER TABLE ONLY public.role DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2";
ALTER TABLE ONLY public.request_log DROP CONSTRAINT "PK_ae393b42f50b0399df4c90160d6";
ALTER TABLE ONLY public.email_setting_titles_translation DROP CONSTRAINT "PK_9deef6ba50f92fab5c46c0edf10";
ALTER TABLE ONLY public.functionality DROP CONSTRAINT "PK_95a4f9263c9b8d39dade8244fb7";
ALTER TABLE ONLY public.configuration_languages_language DROP CONSTRAINT "PK_94e6da6e483ec79d717712c5d66";
ALTER TABLE ONLY public.module_descriptions_translation DROP CONSTRAINT "PK_9424dc6f069ccd84cd9dba829ec";
ALTER TABLE ONLY public.email_setting_footers_translation DROP CONSTRAINT "PK_80c1be19777878240007a84af2b";
ALTER TABLE ONLY public.translation DROP CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70";
ALTER TABLE ONLY public.user_establishment_role DROP CONSTRAINT "PK_6d22e9262d8af0d9aff2241002b";
ALTER TABLE ONLY public.preference DROP CONSTRAINT "PK_5c4cbf49a1e97dcbc695bf462a6";
ALTER TABLE ONLY public.email_setting_subjects_translation DROP CONSTRAINT "PK_55548390295be5f282bf38d1847";
ALTER TABLE ONLY public.cron_job_log DROP CONSTRAINT "PK_475c38647467a9c768a0c95dce5";
ALTER TABLE ONLY public.functionality_titles_translation DROP CONSTRAINT "PK_460c8bc48d10a56b41a955fae72";
ALTER TABLE ONLY public.permission DROP CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362";
ALTER TABLE ONLY public.role_descriptions_translation DROP CONSTRAINT "PK_37ec044e4b7ff24ec7fc03be305";
ALTER TABLE ONLY public.email_setting DROP CONSTRAINT "PK_2c8c3de75f281ceb6fc70f8044a";
ALTER TABLE ONLY public.email_setting_contents_translation DROP CONSTRAINT "PK_17fa290a1e03fdac60fc7587297";
ALTER TABLE ONLY public.establishment DROP CONSTRAINT "PK_149bd9dc1f2bd4e825a0c474932";
ALTER TABLE ONLY public.module DROP CONSTRAINT "PK_0e20d657f968b051e674fbe3117";
ALTER TABLE ONLY public.configuration DROP CONSTRAINT "PK_03bad512915052d2342358f0d8b";
ALTER TABLE public.user_establishment_role ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."user" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.translation ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.role ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.request_log ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.preference ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.permission ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.module ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.language ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.image ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.functionality ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.establishment ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.email_setting ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.cron_job_log ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.configuration ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.user_id_seq;
DROP SEQUENCE public.user_establishment_role_id_seq;
DROP TABLE public.user_establishment_role;
DROP TABLE public."user";
DROP SEQUENCE public.translation_id_seq;
DROP TABLE public.translation;
DROP TABLE public.sessions;
DROP TABLE public.role_titles_translation;
DROP SEQUENCE public.role_id_seq;
DROP TABLE public.role_descriptions_translation;
DROP TABLE public.role;
DROP SEQUENCE public.request_log_id_seq;
DROP TABLE public.request_log;
DROP SEQUENCE public.preference_id_seq;
DROP TABLE public.preference;
DROP SEQUENCE public.permission_id_seq;
DROP TABLE public.permission;
DROP TABLE public.module_titles_translation;
DROP SEQUENCE public.module_id_seq;
DROP TABLE public.module_descriptions_translation;
DROP TABLE public.module;
DROP SEQUENCE public.language_id_seq;
DROP TABLE public.language;
DROP SEQUENCE public.image_id_seq;
DROP TABLE public.image;
DROP TABLE public.functionality_titles_translation;
DROP SEQUENCE public.functionality_id_seq;
DROP TABLE public.functionality;
DROP SEQUENCE public.establishment_id_seq;
DROP TABLE public.establishment;
DROP TABLE public.email_setting_titles_translation;
DROP TABLE public.email_setting_subjects_translation;
DROP SEQUENCE public.email_setting_id_seq;
DROP TABLE public.email_setting_footers_translation;
DROP TABLE public.email_setting_contents_translation;
DROP TABLE public.email_setting;
DROP SEQUENCE public.cron_job_log_id_seq;
DROP TABLE public.cron_job_log;
DROP TABLE public.configuration_languages_language;
DROP SEQUENCE public.configuration_id_seq;
DROP TABLE public.configuration;
DROP TYPE public.request_log_loglevel_enum;
DROP TYPE public.permission_permissiontype_enum;
DROP TYPE public.language_purpose_enum;
DROP TYPE public.establishment_documenttype_enum;
DROP TYPE public.email_setting_purpose_enum;
--
-- TOC entry 970 (class 1247 OID 395202)
-- Name: email_setting_purpose_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.email_setting_purpose_enum AS ENUM (
    'reset-password',
    'verify-email',
    'contact',
    'welcome'
);


--
-- TOC entry 910 (class 1247 OID 386892)
-- Name: establishment_documenttype_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.establishment_documenttype_enum AS ENUM (
    'cpf',
    'cnpj'
);


--
-- TOC entry 961 (class 1247 OID 388997)
-- Name: language_purpose_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.language_purpose_enum AS ENUM (
    'console',
    'site',
    'both',
    'none'
);


--
-- TOC entry 883 (class 1247 OID 386793)
-- Name: permission_permissiontype_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.permission_permissiontype_enum AS ENUM (
    'general',
    'establishment'
);


--
-- TOC entry 922 (class 1247 OID 386950)
-- Name: request_log_loglevel_enum; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.request_log_loglevel_enum AS ENUM (
    'info',
    'warning',
    'error',
    'fatal'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 254 (class 1259 OID 389011)
-- Name: configuration; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.configuration (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "loginBannerId" integer,
    "loginLogoId" integer,
    "faviconId" integer,
    "projectName" character varying(75) NOT NULL
);


--
-- TOC entry 253 (class 1259 OID 389010)
-- Name: configuration_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.configuration_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5138 (class 0 OID 0)
-- Dependencies: 253
-- Name: configuration_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.configuration_id_seq OWNED BY public.configuration.id;


--
-- TOC entry 255 (class 1259 OID 389040)
-- Name: configuration_languages_language; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.configuration_languages_language (
    "configurationId" integer NOT NULL,
    "languageId" integer NOT NULL
);


--
-- TOC entry 242 (class 1259 OID 386971)
-- Name: cron_job_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cron_job_log (
    id integer NOT NULL,
    "jobName" character varying(70) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "executionTime" character varying(25) NOT NULL,
    result jsonb,
    error jsonb
);


--
-- TOC entry 241 (class 1259 OID 386970)
-- Name: cron_job_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cron_job_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5139 (class 0 OID 0)
-- Dependencies: 241
-- Name: cron_job_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cron_job_log_id_seq OWNED BY public.cron_job_log.id;


--
-- TOC entry 232 (class 1259 OID 386880)
-- Name: email_setting; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.email_setting (
    id integer NOT NULL,
    server character varying(75) NOT NULL,
    username character varying(75) NOT NULL,
    password character varying(75) NOT NULL,
    port integer DEFAULT 465 NOT NULL,
    tls boolean DEFAULT false NOT NULL,
    ssl boolean DEFAULT false NOT NULL,
    sender character varying(75) NOT NULL,
    recipient character varying(75) NOT NULL,
    "recipientCopy" character varying(75),
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "establishmentId" integer,
    purpose public.email_setting_purpose_enum NOT NULL
);


--
-- TOC entry 250 (class 1259 OID 387030)
-- Name: email_setting_contents_translation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.email_setting_contents_translation (
    "emailSettingId" integer NOT NULL,
    "translationId" integer NOT NULL
);


--
-- TOC entry 251 (class 1259 OID 387037)
-- Name: email_setting_footers_translation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.email_setting_footers_translation (
    "emailSettingId" integer NOT NULL,
    "translationId" integer NOT NULL
);


--
-- TOC entry 231 (class 1259 OID 386879)
-- Name: email_setting_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.email_setting_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5140 (class 0 OID 0)
-- Dependencies: 231
-- Name: email_setting_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.email_setting_id_seq OWNED BY public.email_setting.id;


--
-- TOC entry 248 (class 1259 OID 387016)
-- Name: email_setting_subjects_translation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.email_setting_subjects_translation (
    "emailSettingId" integer NOT NULL,
    "translationId" integer NOT NULL
);


--
-- TOC entry 249 (class 1259 OID 387023)
-- Name: email_setting_titles_translation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.email_setting_titles_translation (
    "emailSettingId" integer NOT NULL,
    "translationId" integer NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 386898)
-- Name: establishment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.establishment (
    id integer NOT NULL,
    "corporateName" character varying(75) NOT NULL,
    "fantasyName" character varying(75) NOT NULL,
    address character varying(75) NOT NULL,
    "addressNumber" character varying(25) NOT NULL,
    "zipCode" character varying(25) NOT NULL,
    district character varying(75) NOT NULL,
    document character varying(25) NOT NULL,
    "documentType" public.establishment_documenttype_enum NOT NULL,
    email character varying(150) NOT NULL,
    phone1 character varying(75) NOT NULL,
    phone2 character varying(75),
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "imageId" integer
);


--
-- TOC entry 233 (class 1259 OID 386897)
-- Name: establishment_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.establishment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5141 (class 0 OID 0)
-- Dependencies: 233
-- Name: establishment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.establishment_id_seq OWNED BY public.establishment.id;


--
-- TOC entry 220 (class 1259 OID 386811)
-- Name: functionality; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.functionality (
    id integer NOT NULL,
    slug character varying(25) NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "moduleId" integer,
    "position" integer DEFAULT 0 NOT NULL,
    icon character varying(75)
);


--
-- TOC entry 219 (class 1259 OID 386810)
-- Name: functionality_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.functionality_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5142 (class 0 OID 0)
-- Dependencies: 219
-- Name: functionality_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.functionality_id_seq OWNED BY public.functionality.id;


--
-- TOC entry 245 (class 1259 OID 386995)
-- Name: functionality_titles_translation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.functionality_titles_translation (
    "functionalityId" integer NOT NULL,
    "translationId" integer NOT NULL
);


--
-- TOC entry 236 (class 1259 OID 386920)
-- Name: image; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.image (
    id integer NOT NULL,
    "mimeType" character varying(25) NOT NULL,
    size integer NOT NULL,
    width integer,
    height integer,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "originalName" character varying(300),
    "newName" character varying(300),
    "filePath" text
);


--
-- TOC entry 235 (class 1259 OID 386919)
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5143 (class 0 OID 0)
-- Dependencies: 235
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.image_id_seq OWNED BY public.image.id;


--
-- TOC entry 224 (class 1259 OID 386840)
-- Name: language; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.language (
    id integer NOT NULL,
    name character varying(75) NOT NULL,
    "languageCode" character(2) NOT NULL,
    "regionCode" character(2),
    purpose public.language_purpose_enum NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "iconId" integer
);


--
-- TOC entry 223 (class 1259 OID 386839)
-- Name: language_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.language_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5144 (class 0 OID 0)
-- Dependencies: 223
-- Name: language_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.language_id_seq OWNED BY public.language.id;


--
-- TOC entry 216 (class 1259 OID 386784)
-- Name: module; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.module (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "establishmentId" integer,
    "position" integer DEFAULT 0 NOT NULL
);


--
-- TOC entry 244 (class 1259 OID 386988)
-- Name: module_descriptions_translation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.module_descriptions_translation (
    "moduleId" integer NOT NULL,
    "translationId" integer NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 386783)
-- Name: module_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.module_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5145 (class 0 OID 0)
-- Dependencies: 215
-- Name: module_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.module_id_seq OWNED BY public.module.id;


--
-- TOC entry 243 (class 1259 OID 386981)
-- Name: module_titles_translation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.module_titles_translation (
    "moduleId" integer NOT NULL,
    "translationId" integer NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 386798)
-- Name: permission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.permission (
    id integer NOT NULL,
    "permissionType" public.permission_permissiontype_enum NOT NULL,
    "canRead" boolean DEFAULT true NOT NULL,
    "canCreate" boolean DEFAULT false NOT NULL,
    "canUpdate" boolean DEFAULT false NOT NULL,
    "canDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "functionalityId" integer,
    "roleId" integer
);


--
-- TOC entry 217 (class 1259 OID 386797)
-- Name: permission_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5146 (class 0 OID 0)
-- Dependencies: 217
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.permission_id_seq OWNED BY public.permission.id;


--
-- TOC entry 222 (class 1259 OID 386822)
-- Name: preference; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.preference (
    id integer NOT NULL,
    "moduleOrder" integer[] DEFAULT '{}'::integer[] NOT NULL,
    "functionalityOrder" integer[] DEFAULT '{}'::integer[] NOT NULL,
    preferences jsonb DEFAULT '{}'::jsonb NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "languageId" integer,
    "functionalityId" integer
);


--
-- TOC entry 221 (class 1259 OID 386821)
-- Name: preference_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.preference_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5147 (class 0 OID 0)
-- Dependencies: 221
-- Name: preference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.preference_id_seq OWNED BY public.preference.id;


--
-- TOC entry 240 (class 1259 OID 386960)
-- Name: request_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.request_log (
    id integer NOT NULL,
    "logLevel" public.request_log_loglevel_enum NOT NULL,
    "requestId" character(36) NOT NULL,
    "httpMethod" character varying(10) NOT NULL,
    "responseStatusCode" integer NOT NULL,
    "ipAddress" character varying(45),
    "userAgent" character varying(255),
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "responseTime" character varying(25) NOT NULL,
    "requestHeader" jsonb,
    "requestBody" jsonb,
    "responseBody" jsonb
);


--
-- TOC entry 239 (class 1259 OID 386959)
-- Name: request_log_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.request_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5148 (class 0 OID 0)
-- Dependencies: 239
-- Name: request_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.request_log_id_seq OWNED BY public.request_log.id;


--
-- TOC entry 230 (class 1259 OID 386871)
-- Name: role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "establishmentId" integer
);


--
-- TOC entry 247 (class 1259 OID 387009)
-- Name: role_descriptions_translation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role_descriptions_translation (
    "roleId" integer NOT NULL,
    "translationId" integer NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 386870)
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5149 (class 0 OID 0)
-- Dependencies: 229
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- TOC entry 246 (class 1259 OID 387002)
-- Name: role_titles_translation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role_titles_translation (
    "roleId" integer NOT NULL,
    "translationId" integer NOT NULL
);


--
-- TOC entry 252 (class 1259 OID 387226)
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 386851)
-- Name: translation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.translation (
    id integer NOT NULL,
    text text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "languageId" integer
);


--
-- TOC entry 225 (class 1259 OID 386850)
-- Name: translation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.translation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5150 (class 0 OID 0)
-- Dependencies: 225
-- Name: translation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.translation_id_seq OWNED BY public.translation.id;


--
-- TOC entry 238 (class 1259 OID 386929)
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying(75) NOT NULL,
    email character varying(75) NOT NULL,
    username character varying(75) NOT NULL,
    phone character varying(25) NOT NULL,
    password character varying(300) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "isBlocked" boolean DEFAULT true NOT NULL,
    "lastLoggedAt" timestamp without time zone,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "imageId" integer,
    "preferenceId" integer
);


--
-- TOC entry 228 (class 1259 OID 386862)
-- Name: user_establishment_role; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_establishment_role (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "establishmentId" integer,
    "userId" integer,
    "roleId" integer
);


--
-- TOC entry 227 (class 1259 OID 386861)
-- Name: user_establishment_role_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_establishment_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5151 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_establishment_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_establishment_role_id_seq OWNED BY public.user_establishment_role.id;


--
-- TOC entry 237 (class 1259 OID 386928)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 5152 (class 0 OID 0)
-- Dependencies: 237
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 4817 (class 2604 OID 389014)
-- Name: configuration id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuration ALTER COLUMN id SET DEFAULT nextval('public.configuration_id_seq'::regclass);


--
-- TOC entry 4815 (class 2604 OID 386974)
-- Name: cron_job_log id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cron_job_log ALTER COLUMN id SET DEFAULT nextval('public.cron_job_log_id_seq'::regclass);


--
-- TOC entry 4796 (class 2604 OID 386883)
-- Name: email_setting id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting ALTER COLUMN id SET DEFAULT nextval('public.email_setting_id_seq'::regclass);


--
-- TOC entry 4802 (class 2604 OID 386901)
-- Name: establishment id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.establishment ALTER COLUMN id SET DEFAULT nextval('public.establishment_id_seq'::regclass);


--
-- TOC entry 4774 (class 2604 OID 386814)
-- Name: functionality id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionality ALTER COLUMN id SET DEFAULT nextval('public.functionality_id_seq'::regclass);


--
-- TOC entry 4805 (class 2604 OID 386923)
-- Name: image id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.image ALTER COLUMN id SET DEFAULT nextval('public.image_id_seq'::regclass);


--
-- TOC entry 4784 (class 2604 OID 386843)
-- Name: language id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.language ALTER COLUMN id SET DEFAULT nextval('public.language_id_seq'::regclass);


--
-- TOC entry 4763 (class 2604 OID 386787)
-- Name: module id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.module ALTER COLUMN id SET DEFAULT nextval('public.module_id_seq'::regclass);


--
-- TOC entry 4767 (class 2604 OID 386801)
-- Name: permission id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permission ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);


--
-- TOC entry 4778 (class 2604 OID 386825)
-- Name: preference id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.preference ALTER COLUMN id SET DEFAULT nextval('public.preference_id_seq'::regclass);


--
-- TOC entry 4813 (class 2604 OID 386963)
-- Name: request_log id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request_log ALTER COLUMN id SET DEFAULT nextval('public.request_log_id_seq'::regclass);


--
-- TOC entry 4793 (class 2604 OID 386874)
-- Name: role id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- TOC entry 4787 (class 2604 OID 386854)
-- Name: translation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.translation ALTER COLUMN id SET DEFAULT nextval('public.translation_id_seq'::regclass);


--
-- TOC entry 4808 (class 2604 OID 386932)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 4790 (class 2604 OID 386865)
-- Name: user_establishment_role id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_establishment_role ALTER COLUMN id SET DEFAULT nextval('public.user_establishment_role_id_seq'::regclass);


--
-- TOC entry 5131 (class 0 OID 389011)
-- Dependencies: 254
-- Data for Name: configuration; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.configuration (id, "createdAt", "updatedAt", "loginBannerId", "loginLogoId", "faviconId", "projectName") FROM stdin;
1	2025-01-18 21:41:18.530889	2025-01-18 21:41:18.530889	58	66	69	CMS Contenster
\.


--
-- TOC entry 5132 (class 0 OID 389040)
-- Dependencies: 255
-- Data for Name: configuration_languages_language; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.configuration_languages_language ("configurationId", "languageId") FROM stdin;
1	3
1	2
1	1
\.


--
-- TOC entry 5119 (class 0 OID 386971)
-- Dependencies: 242
-- Data for Name: cron_job_log; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cron_job_log (id, "jobName", "createdAt", "executionTime", result, error) FROM stdin;
50	deleteErrorLogs	2025-03-17 22:00:00.108214	82ms	{"logsRemoved": 0}	\N
77	deleteErrorLogs	2025-03-18 18:00:00.121691	99ms	{"logsRemoved": 0}	\N
51	deleteWarningLogs	2025-03-18 00:00:00.12526	98ms	{"logsRemoved": 0}	\N
52	deleteErrorLogs	2025-03-18 00:00:00.125599	90ms	{"logsRemoved": 0}	\N
16	deleteOrphanedFiles	2025-03-13 20:27:20.102212	86ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
53	deleteInfoLogs	2025-03-18 00:00:00.130811	88ms	{"logsRemoved": 0}	\N
17	deleteOrphanedFiles	2025-03-13 20:27:30.03461	28ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
18	deleteOrphanedFiles	2025-03-13 20:27:40.046395	32ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
19	deleteOrphanedFiles	2025-03-13 20:27:50.029745	27ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
20	deleteOrphanedFiles	2025-03-13 20:28:00.038395	31ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
21	deleteOrphanedFiles	2025-03-13 20:28:10.038331	31ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
22	deleteOrphanedFiles	2025-03-13 20:28:20.035213	23ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
23	deleteOrphanedFiles	2025-03-13 20:28:30.043061	33ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
24	deleteErrorLogs	2025-03-13 22:00:00.138822	87ms	{"logsRemoved": 0}	\N
25	deleteWarningLogs	2025-03-13 22:00:00.139434	95ms	{"logsRemoved": 0}	\N
26	deleteInfoLogs	2025-03-13 22:00:00.140003	115ms	{"logsRemoved": 0}	\N
27	deleteWarningLogs	2025-03-14 09:15:34.042381	488ms	{"logsRemoved": 0}	\N
76	deleteInfoLogs	2025-03-18 18:00:00.113936	98ms	{"logsRemoved": 0}	\N
28	deleteOrphanedFiles	2025-03-14 09:15:34.131655	567ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
29	deleteInfoLogs	2025-03-14 09:15:34.24145	690ms	{"logsRemoved": 0}	\N
30	deleteErrorLogs	2025-03-14 09:15:34.626837	1.07s	{"logsRemoved": 0}	\N
31	deleteInfoLogs	2025-03-14 10:00:00.139877	118ms	{"logsRemoved": 0}	\N
32	deleteErrorLogs	2025-03-14 10:00:00.148059	114ms	{"logsRemoved": 0}	\N
33	deleteWarningLogs	2025-03-14 10:00:00.14707	121ms	{"logsRemoved": 0}	\N
34	deleteWarningLogs	2025-03-15 18:00:00.113274	91ms	{"logsRemoved": 0}	\N
35	deleteErrorLogs	2025-03-15 18:00:00.12	94ms	{"logsRemoved": 0}	\N
36	deleteInfoLogs	2025-03-15 18:00:00.123652	93ms	{"logsRemoved": 0}	\N
37	deleteOrphanedFiles	2025-03-15 18:00:00.159611	130ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
38	deleteWarningLogs	2025-03-15 20:00:00.214956	137ms	{"logsRemoved": 0}	\N
39	deleteInfoLogs	2025-03-15 20:00:00.217055	169ms	{"logsRemoved": 0}	\N
40	deleteErrorLogs	2025-03-15 20:00:00.218354	138ms	{"logsRemoved": 0}	\N
41	deleteErrorLogs	2025-03-15 22:00:00.131003	102ms	{"logsRemoved": 0}	\N
42	deleteWarningLogs	2025-03-15 22:00:00.131905	122ms	{"logsRemoved": 0}	\N
43	deleteInfoLogs	2025-03-15 22:00:00.149985	116ms	{"logsRemoved": 0}	\N
44	deleteInfoLogs	2025-03-16 12:16:21.696654	299ms	{"logsRemoved": 0}	\N
45	deleteWarningLogs	2025-03-16 12:16:21.706432	307ms	{"logsRemoved": 0}	\N
46	deleteErrorLogs	2025-03-16 12:16:21.733186	331ms	{"logsRemoved": 0}	\N
47	deleteOrphanedFiles	2025-03-16 12:16:21.877978	506ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
48	deleteInfoLogs	2025-03-17 22:00:00.094312	75ms	{"logsRemoved": 0}	\N
49	deleteWarningLogs	2025-03-17 22:00:00.09537	71ms	{"logsRemoved": 0}	\N
54	deleteOrphanedFiles	2025-03-18 00:00:00.180362	141ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
55	deleteErrorLogs	2025-03-18 03:07:10.048021	101ms	{"logsRemoved": 0}	\N
56	deleteWarningLogs	2025-03-18 03:07:10.062935	118ms	{"logsRemoved": 0}	\N
57	deleteInfoLogs	2025-03-18 03:07:10.070192	122ms	{"logsRemoved": 0}	\N
58	deleteErrorLogs	2025-03-18 08:25:47.29516	1.50s	{"logsRemoved": 0}	\N
60	deleteInfoLogs	2025-03-18 08:25:47.393634	1.61s	{"logsRemoved": 0}	\N
59	deleteWarningLogs	2025-03-18 08:25:47.368166	1.58s	{"logsRemoved": 0}	\N
61	deleteOrphanedFiles	2025-03-18 08:25:47.560905	1.77s	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
62	deleteWarningLogs	2025-03-18 10:00:00.130182	90ms	{"logsRemoved": 0}	\N
63	deleteInfoLogs	2025-03-18 10:00:00.131561	104ms	{"logsRemoved": 0}	\N
64	deleteErrorLogs	2025-03-18 10:00:00.135518	90ms	{"logsRemoved": 0}	\N
65	deleteInfoLogs	2025-03-18 12:00:00.17856	136ms	{"logsRemoved": 0}	\N
66	deleteWarningLogs	2025-03-18 12:00:00.183263	136ms	{"logsRemoved": 0}	\N
67	deleteErrorLogs	2025-03-18 12:00:00.199383	150ms	{"logsRemoved": 0}	\N
68	deleteOrphanedFiles	2025-03-18 12:00:00.233931	201ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
69	deleteInfoLogs	2025-03-18 14:00:00.12566	107ms	{"logsRemoved": 0}	\N
70	deleteWarningLogs	2025-03-18 14:00:00.125897	103ms	{"logsRemoved": 0}	\N
71	deleteErrorLogs	2025-03-18 14:00:00.126926	101ms	{"logsRemoved": 0}	\N
72	deleteInfoLogs	2025-03-18 16:00:00.103769	85ms	{"logsRemoved": 0}	\N
73	deleteErrorLogs	2025-03-18 16:00:00.107561	82ms	{"logsRemoved": 0}	\N
74	deleteWarningLogs	2025-03-18 16:00:00.107785	85ms	{"logsRemoved": 0}	\N
75	deleteWarningLogs	2025-03-18 18:00:00.110013	89ms	{"logsRemoved": 0}	\N
78	deleteOrphanedFiles	2025-03-18 18:00:00.149255	124ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
79	deleteInfoLogs	2025-03-19 18:00:00.127994	96ms	{"logsRemoved": 0}	\N
80	deleteWarningLogs	2025-03-19 18:00:00.135544	99ms	{"logsRemoved": 0}	\N
81	deleteErrorLogs	2025-03-19 18:00:00.136591	98ms	{"logsRemoved": 0}	\N
82	deleteOrphanedFiles	2025-03-19 18:00:00.165051	139ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [59], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(59) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 59, "size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [60], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(60) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 60, "size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5", "parameters": [62], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "user", "detail": "Chave (id)=(62) ainda é referenciada pela tabela \\"user\\".", "length": 299, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e028298e103e1694147ada69e5"}}, "record": {"id": 62, "size": 34822, "width": 800, "height": 531, "newName": "cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "filePath": "assets/images/cachorro_7c6b12f8307a768a_05_03_2025_19_13_17_319.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:13:17.354Z", "updatedAt": "2025-03-05T22:13:17.354Z", "originalName": "cachorro.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [64], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(64) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 64, "size": 9664, "width": 512, "height": 512, "newName": "logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "filePath": "assets/images/logo512_29dceaebfbaaf1ad_12_03_2025_21_54_42_904.png", "mimeType": "image/png", "createdAt": "2025-03-13T00:54:42.971Z", "updatedAt": "2025-03-13T00:54:42.971Z", "originalName": "logo512.png"}}]}
83	deleteInfoLogs	2025-03-19 20:00:00.114103	98ms	{"logsRemoved": 0}	\N
84	deleteErrorLogs	2025-03-19 20:00:00.114739	86ms	{"logsRemoved": 0}	\N
85	deleteWarningLogs	2025-03-19 20:00:00.115158	83ms	{"logsRemoved": 0}	\N
87	deleteErrorLogs	2025-03-22 12:00:00.125998	89ms	{"logsRemoved": 0}	\N
86	deleteInfoLogs	2025-03-22 12:00:00.125662	94ms	{"logsRemoved": 0}	\N
88	deleteWarningLogs	2025-03-22 12:00:00.128955	86ms	{"logsRemoved": 0}	\N
89	deleteOrphanedFiles	2025-03-22 12:00:00.169746	130ms	{"imagesRemoved": [{"size": 58329, "width": 1504, "height": 392, "newName": "contenster-high-resolution-logo_901bfdf96f983391_22_03_2025_10_36_50_565.PNG", "filePath": "assets/images/contenster-high-resolution-logo_901bfdf96f983391_22_03_2025_10_36_50_565.PNG", "mimeType": "image/png", "createdAt": "2025-03-22T13:36:50.649Z", "updatedAt": "2025-03-22T13:36:50.649Z", "originalName": "contenster-high-resolution-logo.PNG"}, {"size": 5347, "width": 192, "height": 192, "newName": "react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "filePath": "assets/images/react_icon_b348620b5e336173_05_03_2025_19_5_38_356.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:05:38.417Z", "updatedAt": "2025-03-05T22:05:38.417Z", "originalName": "react_icon.png"}, {"size": 18502, "width": 720, "height": 175, "newName": "Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "filePath": "assets/images/Rossato_-_Horizontal_-_Fundo_Claro_c630a40f2951ae5f_05_03_2025_19_8_9_419.png", "mimeType": "image/png", "createdAt": "2025-03-05T22:08:09.505Z", "updatedAt": "2025-03-05T22:08:09.505Z", "originalName": "Rossato - Horizontal - Fundo Claro.png"}]}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(67) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [67], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(67) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 67, "size": 1531, "width": 2000, "height": 135, "newName": "logo-icon_d1b4c5a6d5a127ab_22_03_2025_10_45_27_155.svg", "filePath": "assets/icons/logo-icon_d1b4c5a6d5a127ab_22_03_2025_10_45_27_155.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-22T13:45:27.368Z", "updatedAt": "2025-03-22T13:45:27.368Z", "originalName": "logo-icon.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(66) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [66], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(66) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 66, "size": 18278, "width": 2000, "height": 475, "newName": "contenster-high-resolution-logo-transparent_1ff84d92e1dbad84_22_03_2025_10_38_24_559.png", "filePath": "assets/images/contenster-high-resolution-logo-transparent_1ff84d92e1dbad84_22_03_2025_10_38_24_559.png", "mimeType": "image/png", "createdAt": "2025-03-22T13:38:24.628Z", "updatedAt": "2025-03-22T13:38:24.628Z", "originalName": "contenster-high-resolution-logo-transparent.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}]}
90	deleteWarningLogs	2025-03-22 16:00:00.104633	86ms	{"logsRemoved": 0}	\N
91	deleteInfoLogs	2025-03-22 16:00:00.104889	93ms	{"logsRemoved": 0}	\N
92	deleteErrorLogs	2025-03-22 16:00:00.105077	83ms	{"logsRemoved": 0}	\N
93	deleteInfoLogs	2025-03-22 18:00:00.1349	115ms	{"logsRemoved": 0}	\N
94	deleteWarningLogs	2025-03-22 18:00:00.135458	110ms	{"logsRemoved": 0}	\N
95	deleteErrorLogs	2025-03-22 18:00:00.137491	105ms	{"logsRemoved": 0}	\N
96	deleteOrphanedFiles	2025-03-22 18:00:00.171316	136ms	{"imagesRemoved": [{"size": 1531, "width": 2000, "height": 135, "newName": "logo-icon_d1b4c5a6d5a127ab_22_03_2025_10_45_27_155.svg", "filePath": "assets/icons/logo-icon_d1b4c5a6d5a127ab_22_03_2025_10_45_27_155.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-22T13:45:27.368Z", "updatedAt": "2025-03-22T13:45:27.368Z", "originalName": "logo-icon.svg"}]}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(66) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [66], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(66) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 66, "size": 18278, "width": 2000, "height": 475, "newName": "contenster-high-resolution-logo-transparent_1ff84d92e1dbad84_22_03_2025_10_38_24_559.png", "filePath": "assets/images/contenster-high-resolution-logo-transparent_1ff84d92e1dbad84_22_03_2025_10_38_24_559.png", "mimeType": "image/png", "createdAt": "2025-03-22T13:38:24.628Z", "updatedAt": "2025-03-22T13:38:24.628Z", "originalName": "contenster-high-resolution-logo-transparent.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(68) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [68], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(68) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 68, "size": 4286, "width": null, "height": null, "newName": "logo-color_190339dbe8ec4b21_22_03_2025_14_11_47_221.ico", "filePath": "assets/icons/logo-color_190339dbe8ec4b21_22_03_2025_14_11_47_221.ico", "mimeType": "image/vnd.microsoft.icon", "createdAt": "2025-03-22T17:11:47.281Z", "updatedAt": "2025-03-22T17:11:47.281Z", "originalName": "logo-color.ico"}}]}
97	deleteInfoLogs	2025-03-22 20:00:00.453778	344ms	{"logsRemoved": 0}	\N
98	deleteWarningLogs	2025-03-22 20:00:00.523002	353ms	{"logsRemoved": 0}	\N
99	deleteErrorLogs	2025-03-22 20:00:00.526417	291ms	{"logsRemoved": 0}	\N
100	deleteInfoLogs	2025-03-22 22:00:07.543299	254ms	{"logsRemoved": 0}	\N
101	deleteWarningLogs	2025-03-22 22:00:07.551098	246ms	{"logsRemoved": 0}	\N
102	deleteErrorLogs	2025-03-22 22:00:07.573957	254ms	{"logsRemoved": 0}	\N
104	deleteWarningLogs	2025-03-23 12:11:59.171607	355ms	{"logsRemoved": 0}	\N
103	deleteErrorLogs	2025-03-23 12:11:59.173611	355ms	{"logsRemoved": 0}	\N
105	deleteInfoLogs	2025-03-23 12:11:59.196345	384ms	{"logsRemoved": 0}	\N
106	deleteOrphanedFiles	2025-03-23 12:11:59.363666	541ms	{"imagesRemoved": []}	{"errors": [{"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(69) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a", "parameters": [69], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(69) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_dbbe91bd37dacd531a8cf62f78a"}}, "record": {"id": 69, "size": 1273, "width": 64, "height": 64, "newName": "favicon_5b751f26e653f6a3_22_03_2025_18_3_2_310.svg", "filePath": "assets/icons/favicon_5b751f26e653f6a3_22_03_2025_18_3_2_310.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-22T21:03:02.329Z", "updatedAt": "2025-03-22T21:03:02.329Z", "originalName": "favicon.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [54], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(54) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 54, "size": 4595, "width": 32, "height": 24, "newName": "brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "filePath": "assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:02:43.596Z", "updatedAt": "2025-03-05T22:02:43.596Z", "originalName": "brazil.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [55], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(55) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 55, "size": 21728, "width": 32, "height": 24, "newName": "spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "filePath": "assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:01.243Z", "updatedAt": "2025-03-05T22:03:01.243Z", "originalName": "spain.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3", "parameters": [56], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "language", "detail": "Chave (id)=(56) ainda é referenciada pela tabela \\"language\\".", "length": 311, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_242e561e13e04d77281c36e1eb3"}}, "record": {"id": 56, "size": 4758, "width": 32, "height": 24, "newName": "usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "filePath": "assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-05T22:03:14.456Z", "updatedAt": "2025-03-05T22:03:14.456Z", "originalName": "usa.svg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(66) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a", "parameters": [66], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(66) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_5e699c5b5fece26a1bc7c78101a"}}, "record": {"id": 66, "size": 18278, "width": 2000, "height": 475, "newName": "contenster-high-resolution-logo-transparent_1ff84d92e1dbad84_22_03_2025_10_38_24_559.png", "filePath": "assets/images/contenster-high-resolution-logo-transparent_1ff84d92e1dbad84_22_03_2025_10_38_24_559.png", "mimeType": "image/png", "createdAt": "2025-03-22T13:38:24.628Z", "updatedAt": "2025-03-22T13:38:24.628Z", "originalName": "contenster-high-resolution-logo-transparent.png"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066", "parameters": [58], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "configuration", "detail": "Chave (id)=(58) ainda é referenciada pela tabela \\"configuration\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_82ce91191fa180b111d46293066"}}, "record": {"id": 58, "size": 179389, "width": 848, "height": 477, "newName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "filePath": "assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg", "mimeType": "image/jpeg", "createdAt": "2025-03-05T22:05:14.064Z", "updatedAt": "2025-03-05T22:05:14.064Z", "originalName": "login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg"}}, {"error": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "query": "DELETE FROM \\"image\\" WHERE \\"id\\" = $1", "table": "establishment", "detail": "Chave (id)=(70) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64", "parameters": [70], "driverError": {"code": "23503", "file": "ri_triggers.c", "line": "2633", "name": "error", "table": "establishment", "detail": "Chave (id)=(70) ainda é referenciada pela tabela \\"establishment\\".", "length": 326, "schema": "public", "routine": "ri_ReportViolation", "severity": "ERRO", "constraint": "FK_6df81fc013784b858cd7ebb4d64"}}, "record": {"id": 70, "size": 1270, "width": 64, "height": 64, "newName": "logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg", "filePath": "assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg", "mimeType": "image/svg+xml", "createdAt": "2025-03-22T21:08:58.285Z", "updatedAt": "2025-03-22T21:08:58.285Z", "originalName": "logo_contenster_branco.svg"}}]}
107	deleteWarningLogs	2025-03-23 14:00:00.110144	88ms	{"logsRemoved": 0}	\N
108	deleteInfoLogs	2025-03-23 14:00:00.114155	86ms	{"logsRemoved": 0}	\N
109	deleteErrorLogs	2025-03-23 14:00:00.11449	83ms	{"logsRemoved": 0}	\N
\.


--
-- TOC entry 5110 (class 0 OID 386880)
-- Dependencies: 232
-- Data for Name: email_setting; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.email_setting (id, server, username, password, port, tls, ssl, sender, recipient, "recipientCopy", "createdAt", "updatedAt", "establishmentId", purpose) FROM stdin;
2	smtp.elasticemail.com	panassol1@gmail.com	74265C8C9886EC6D9FC94C44B6EAB47A74ED	2525	f	f	panassol1@gmail.com			2025-03-19 18:36:14.70437	2025-03-19 20:36:54.430757	1	reset-password
\.


--
-- TOC entry 5127 (class 0 OID 387030)
-- Dependencies: 250
-- Data for Name: email_setting_contents_translation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.email_setting_contents_translation ("emailSettingId", "translationId") FROM stdin;
2	200
2	201
2	202
\.


--
-- TOC entry 5128 (class 0 OID 387037)
-- Dependencies: 251
-- Data for Name: email_setting_footers_translation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.email_setting_footers_translation ("emailSettingId", "translationId") FROM stdin;
2	203
2	204
2	205
\.


--
-- TOC entry 5125 (class 0 OID 387016)
-- Dependencies: 248
-- Data for Name: email_setting_subjects_translation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.email_setting_subjects_translation ("emailSettingId", "translationId") FROM stdin;
2	194
2	195
2	196
\.


--
-- TOC entry 5126 (class 0 OID 387023)
-- Dependencies: 249
-- Data for Name: email_setting_titles_translation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.email_setting_titles_translation ("emailSettingId", "translationId") FROM stdin;
2	197
2	198
2	199
\.


--
-- TOC entry 5112 (class 0 OID 386898)
-- Dependencies: 234
-- Data for Name: establishment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.establishment (id, "corporateName", "fantasyName", address, "addressNumber", "zipCode", district, document, "documentType", email, phone1, phone2, "createdAt", "updatedAt", "imageId") FROM stdin;
1	Contenster LTDA	Contenster	Endereço teste	1055	95057520	Centro	99999999999999	cnpj	contenster@contenster.com.br	5554999999999	5554999999999	2024-12-30 22:48:28.952609	2025-03-22 18:10:04.26666	70
\.


--
-- TOC entry 5098 (class 0 OID 386811)
-- Dependencies: 220
-- Data for Name: functionality; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.functionality (id, slug, "createdAt", "updatedAt", "moduleId", "position", icon) FROM stdin;
18	email-setting	2025-03-15 17:43:50.308799	2025-03-15 21:39:49.710702	3	7	assets/icons/system/mail.svg
7	permissions	2024-12-31 09:20:01.997002	2025-03-08 11:36:04.925425	3	6	assets/icons/system/instagram.svg
6	modules	2024-12-31 09:20:01.997002	2025-03-08 11:38:31.050741	3	5	assets/icons/system/command.svg
5	functionalities	2024-12-31 09:20:01.997002	2025-03-08 11:38:58.432976	3	4	assets/icons/system/edit.svg
4	users	2024-12-31 09:20:01.997002	2025-03-08 11:39:54.406852	3	3	assets/icons/system/users.svg
2	establishments	2024-12-31 09:20:01.997002	2025-03-08 19:31:01.009836	3	1	assets/icons/system/coffee.svg
3	roles	2024-12-31 09:20:01.997002	2025-03-08 19:31:16.385669	3	2	assets/icons/system/feather.svg
\.


--
-- TOC entry 5122 (class 0 OID 386995)
-- Dependencies: 245
-- Data for Name: functionality_titles_translation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.functionality_titles_translation ("functionalityId", "translationId") FROM stdin;
7	164
7	165
7	166
6	167
6	168
6	169
5	170
5	171
5	172
4	173
2	174
3	175
18	179
18	180
18	181
4	105
4	106
3	135
3	136
2	138
2	139
\.


--
-- TOC entry 5114 (class 0 OID 386920)
-- Dependencies: 236
-- Data for Name: image; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.image (id, "mimeType", size, width, height, "createdAt", "updatedAt", "originalName", "newName", "filePath") FROM stdin;
69	image/svg+xml	1273	64	64	2025-03-22 18:03:02.329698	2025-03-22 18:03:02.329698	favicon.svg	favicon_5b751f26e653f6a3_22_03_2025_18_3_2_310.svg	assets/icons/favicon_5b751f26e653f6a3_22_03_2025_18_3_2_310.svg
54	image/svg+xml	4595	32	24	2025-03-05 19:02:43.596612	2025-03-05 19:02:43.596612	brazil.svg	brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg	assets/icons/brazil_a578061ed8bb0580_05_03_2025_19_2_43_552.svg
55	image/svg+xml	21728	32	24	2025-03-05 19:03:01.24335	2025-03-05 19:03:01.24335	spain.svg	spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg	assets/icons/spain_6d25b0a3c2d1e400_05_03_2025_19_3_1_224.svg
56	image/svg+xml	4758	32	24	2025-03-05 19:03:14.456285	2025-03-05 19:03:14.456285	usa.svg	usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg	assets/icons/usa_44f575fef843a2a2_05_03_2025_19_3_14_446.svg
66	image/png	18278	2000	475	2025-03-22 10:38:24.628828	2025-03-22 10:38:24.628828	contenster-high-resolution-logo-transparent.png	contenster-high-resolution-logo-transparent_1ff84d92e1dbad84_22_03_2025_10_38_24_559.png	assets/images/contenster-high-resolution-logo-transparent_1ff84d92e1dbad84_22_03_2025_10_38_24_559.png
58	image/jpeg	179389	848	477	2025-03-05 19:05:14.064836	2025-03-05 19:05:14.064836	login_39834b49aa7e699c_18_01_2025_21_22_16_777.jpg	login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg	assets/images/login_39834b49aa7e699c_18_01_2025_21_22_16_777_3bea9bf310405aec_05_03_2025_19_5_13_994.jpg
70	image/svg+xml	1270	64	64	2025-03-22 18:08:58.285996	2025-03-22 18:08:58.285996	logo_contenster_branco.svg	logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg	assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg
\.


--
-- TOC entry 5102 (class 0 OID 386840)
-- Dependencies: 224
-- Data for Name: language; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.language (id, name, "languageCode", "regionCode", purpose, "createdAt", "updatedAt", "iconId") FROM stdin;
1	Português	pt	BR	both	2024-12-30 22:47:12.688055	2024-12-30 22:47:12.688055	54
2	Inglês	en	US	both	2024-12-30 22:47:12.688055	2024-12-30 22:47:12.688055	56
3	Espanhol	es	ES	both	2024-12-30 22:47:12.688055	2024-12-30 22:47:12.688055	55
\.


--
-- TOC entry 5094 (class 0 OID 386784)
-- Dependencies: 216
-- Data for Name: module; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.module (id, "createdAt", "updatedAt", "establishmentId", "position") FROM stdin;
3	2025-03-02 11:26:26.1871	2025-03-02 13:09:00.234928	1	9999
\.


--
-- TOC entry 5121 (class 0 OID 386988)
-- Dependencies: 244
-- Data for Name: module_descriptions_translation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.module_descriptions_translation ("moduleId", "translationId") FROM stdin;
3	25
3	26
3	53
\.


--
-- TOC entry 5120 (class 0 OID 386981)
-- Dependencies: 243
-- Data for Name: module_titles_translation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.module_titles_translation ("moduleId", "translationId") FROM stdin;
3	22
3	23
3	24
\.


--
-- TOC entry 5096 (class 0 OID 386798)
-- Dependencies: 218
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.permission (id, "permissionType", "canRead", "canCreate", "canUpdate", "canDelete", "createdAt", "updatedAt", "functionalityId", "roleId") FROM stdin;
5	general	t	t	t	t	2024-12-31 09:59:32.029682	2024-12-31 09:59:32.029682	5	3
11	general	t	t	t	t	2025-02-15 21:08:33.294238	2025-02-15 21:08:33.294238	3	3
3	general	t	t	t	t	2024-12-31 09:59:32.029682	2025-03-12 20:25:25.718618	7	3
18	establishment	t	t	t	t	2025-03-12 20:40:23.687846	2025-03-12 20:40:23.687846	4	3
10	general	t	t	t	t	2025-02-15 21:08:33.294238	2025-03-12 23:01:09.970059	2	3
22	establishment	t	t	t	t	2025-03-13 21:00:06.624402	2025-03-15 16:51:50.96671	6	3
23	general	t	t	t	t	2025-03-15 17:44:11.18901	2025-03-17 21:42:48.49135	18	3
\.


--
-- TOC entry 5100 (class 0 OID 386822)
-- Dependencies: 222
-- Data for Name: preference; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.preference (id, "moduleOrder", "functionalityOrder", preferences, "createdAt", "updatedAt", "languageId", "functionalityId") FROM stdin;
1	{}	{}	{}	2024-12-31 07:36:58.868657	2025-03-13 10:44:24.008562	1	\N
\.


--
-- TOC entry 5108 (class 0 OID 386871)
-- Dependencies: 230
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.role (id, "createdAt", "updatedAt", "establishmentId") FROM stdin;
3	2025-03-02 14:27:32.891743	2025-03-02 14:27:32.891743	1
\.


--
-- TOC entry 5124 (class 0 OID 387009)
-- Dependencies: 247
-- Data for Name: role_descriptions_translation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.role_descriptions_translation ("roleId", "translationId") FROM stdin;
3	57
3	58
3	59
\.


--
-- TOC entry 5123 (class 0 OID 387002)
-- Dependencies: 246
-- Data for Name: role_titles_translation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.role_titles_translation ("roleId", "translationId") FROM stdin;
3	54
3	55
3	56
\.


--
-- TOC entry 5129 (class 0 OID 387226)
-- Dependencies: 252
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sessions (sid, sess, expire) FROM stdin;
zXPf4FSIXwbkfPWda_VK01a6UdF7a8W7	{"cookie":{"originalMaxAge":7199999,"expires":"2025-03-23T19:37:16.367Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:37:17
lu_SdJ2_bIZggUjPQTzGXSOZlW6VLIhB	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:37:16.434Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:37:17
-oykGvoFc8qVAWUg0_H1Xj7RzI--RMwX	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:37:24.144Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:37:25
jaSHMohhMUKTor60seJYPQbb51n6OIdS	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:37:24.237Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:37:25
ny_4cx4U0HEAI5t2Pj9hJU-4fbaxX8FJ	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:37:30.847Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:37:31
Qw9KrA4-KboR0Y6IiEpu3lEyt6-M4Bq5	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:37:30.858Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:37:31
mPQS6qpekqGYVWvG3ej7MsDma0pSO0kO	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:37:39.254Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:37:40
rTtM5uYTwbFDqBj-u-7mtuKtfCd5aoNT	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:37:39.450Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:37:40
M2E1x_2xZrrxri2fT2-TOM4YPyqi07b3	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:37:45.438Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:37:46
mfY5BNfqapaSDAxabdovEb-rcLmzvfLM	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:37:45.480Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:37:46
1hTzY_nc2GRuaurxMKb4iwU6r9IwG7zp	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:37:47.816Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:37:48
Phj8K33EBWO3pC35Ls2RP15cET3tlrrd	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:37:47.869Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:37:48
KNUnnHPf4PkF4Tm8X4PIIPPQXwrRE6Ws	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:38:18.717Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:38:19
xEk-NWN1kVRswZVcL1-h7L3BGE6Qe7-Q	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:38:18.758Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:38:19
sxIzUZPj55RPEbBMYslY61nL41K0il5V	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:38:25.677Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:38:26
G3oBKi7E4D-mJLp35_CW-23a_LfF26z8	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:38:25.716Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:38:26
iq5V3QpZC1aU_ECW3OUk2pMxJsKbe896	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:38:32.283Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:38:33
gsXiC3zuYuv81yMyrPbXd9wBiek_ejIz	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:38:32.322Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:38:33
3o7ZB1--50emW_wr1C_2fenWuwV1wOKy	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:38:39.813Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:38:40
l14rNC-E4T8Nsp3hDRh0HJcSwUvbVTMA	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:38:39.834Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:38:40
MG7BkQ_RUg1MnNvnluGhFs4Dt6ekS1Oz	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:38:50.121Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:38:51
ZzQLiFRxiOhl-MfNaegzmOnvL4OQ9D0H	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:38:50.171Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:38:51
gOb9nooNBCzznvGG8Vfa7ncPG9ZGmRnv	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:40:21.160Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:40:22
KUNfD3tiO1xSpE7PCRIRKi8VyZnrNBmr	{"cookie":{"originalMaxAge":7199999,"expires":"2025-03-23T19:40:21.230Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:40:22
9gUe75FN1fUaJbFQVc1S1bz255daSJCs	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:44:32.534Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:44:33
jypwDRE_iyvhl-fgafVZUiSpCxyShrmr	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:44:32.591Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:44:33
4xqy_-KWQx48NiUroBUTWokdvPEIiL8y	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:45:25.503Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:45:26
AXsI6ugUghf3dZMIK4N1zMUgId9xCpn2	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:45:32.457Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:45:33
uVONjkzxn9BHb4masuS_oL7gQVEghgRD	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:45:39.480Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:45:40
6Zh30kNU8lMmkeKuu8oBjeiaJW_MfOoo	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:45:39.540Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:45:40
R0HS8-PSZvHj0dtQx_YPHYZ0shC-GHUD	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:45:25.589Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:45:26
sMywBj5hncqluQQyHEmRV5scNKacRVXl	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:45:32.433Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:45:33
B0GllnnM2ynshZ27SKa6ffTPDgtaoJh0	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:47:03.293Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:47:04
1jYEoEuYoNLSxKoGYfxebgO8Ma4QYGHi	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:47:03.355Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:47:04
gCgTO4a-FksVQLrxR5j1OxHLYdRkCzH1	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:47:51.801Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:47:52
N4kYTlpYmGwBX6io6Lt9VU757u5o0T5J	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:47:56.710Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:47:57
zyzFki-nvPdguscFq0qsyrlvIB0NYtE-	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:47:51.874Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:47:52
0MIB4Qzg59mXMXaRI40kGz9x3Uq__3Gi	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:47:56.692Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:47:57
6HOnBU1mtae2Ahy06El19d-6xQE2ijxq	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:48:18.865Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:48:19
p5osBMdLSxwcXq5Fh3oODHUA2Jz3Kozd	{"cookie":{"originalMaxAge":7200000,"expires":"2025-03-23T19:48:18.939Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":3,"title":"Administrador","description":"Administrador do  sistema"},"permissions":[{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":18,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":22,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"establishment"},{"id":23,"title":"Configuração de email","slug":"email-setting","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contenster@contenster.com.br","phone1":"5554999999999","phone2":"5554999999999","address":"Endereço teste","addressNumber":"1055","zipCode":"95057520","district":"Centro","corporateName":"Contenster LTDA","fantasyName":"Contenster","image":"http://localhost:8080/assets/icons/logo_contenster_branco_d7b35c8521f9ab8b_22_03_2025_18_8_58_272.svg"}}}	2025-03-23 16:48:19
HstSJq69F4GArsEiETdwfYaG1qB_u9IZ	{"cookie":{"originalMaxAge":2592000000,"expires":"2025-03-18T01:53:31.271Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"user":{"id":1,"name":"Demian Panassol","email":"panassol1@gmail.com","image":null,"username":"demianpanassol","isActive":true,"phone":"5554992746783","homePage":null,"establishmentCount":1,"role":{"id":1,"title":"Administrador","description":"Administrador do Sistema EN"},"permissions":[{"id":10,"title":"Estabelecimentos","slug":"establishments","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":11,"title":"Perfis","slug":"roles","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":6,"title":"Usuários","slug":"users","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":5,"title":"Funcionalidades","slug":"functionalities","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":4,"title":"Módulos","slug":"modules","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"},{"id":3,"title":"Permissões","slug":"permissions","canRead":true,"canCreate":true,"canUpdate":true,"canDelete":true,"type":"general"}],"establishment":{"id":1,"document":"99999999999999","documentType":"cnpj","email":"contato@xyz.com","phone1":"123456789","phone2":null,"address":"Rua A","addressNumber":"123","zipCode":"12345678","district":"Centro","corporateName":"Empresa XYZ","fantasyName":"XYZ","image":"http://localhost:8080/assets/images/system/react_icon.png"}}}	2025-04-12 17:01:33
\.


--
-- TOC entry 5104 (class 0 OID 386851)
-- Dependencies: 226
-- Data for Name: translation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.translation (id, text, "createdAt", "updatedAt", "languageId") FROM stdin;
170	Funcionalidades	2025-03-13 11:40:18.374397	2025-03-13 11:49:23.593508	1
171	Functionalities	2025-03-13 11:40:18.374397	2025-03-13 11:49:23.593508	2
172	Características	2025-03-13 11:40:18.374397	2025-03-13 11:49:23.593508	3
105	Users	2025-03-08 11:39:54.406852	2025-03-13 11:49:44.270546	2
106	Usuarios	2025-03-08 11:39:54.406852	2025-03-13 11:49:44.270546	3
135	Profiles	2025-03-08 19:31:16.385669	2025-03-13 11:50:05.630818	2
173	Usuários	2025-03-13 11:54:56.017207	2025-03-13 11:54:56.017207	1
175	Perfis	2025-03-13 11:55:23.151436	2025-03-13 11:55:23.151436	1
194	Redefinição de senha	2025-03-19 18:36:14.70437	2025-03-19 18:36:14.70437	1
195	Redefinição de senha EN	2025-03-19 18:36:14.70437	2025-03-19 18:36:14.70437	2
196	Redefinição de senha ES	2025-03-19 18:36:14.70437	2025-03-19 18:36:14.70437	3
197	Redefinição de senha	2025-03-19 18:36:14.70437	2025-03-19 18:36:14.70437	1
198	Redefinição de senha EN	2025-03-19 18:36:14.70437	2025-03-19 18:36:14.70437	2
199	Redefinição de senha ES	2025-03-19 18:36:14.70437	2025-03-19 18:36:14.70437	3
200	Link para redefinição de senha:\n\n[RESET_PASSWORD_LINK]	2025-03-19 18:36:14.70437	2025-03-19 18:36:14.70437	1
201	Link para redefinição de senha:\n\n[RESET_PASSWORD_LINK]	2025-03-19 18:36:14.70437	2025-03-19 18:36:14.70437	2
202	Link para redefinição de senha:\n\n[RESET_PASSWORD_LINK]	2025-03-19 18:36:14.70437	2025-03-19 18:36:14.70437	3
136	Perfiles	2025-03-08 19:31:16.385669	2025-03-13 11:50:05.630818	3
138	Establishments	2025-03-10 18:45:00.17552	2025-03-13 11:50:23.990936	2
139	Establecimientos	2025-03-10 18:45:00.17552	2025-03-13 11:50:23.990936	3
203	Rodapé BR	2025-03-19 18:36:14.70437	2025-03-19 18:36:14.70437	1
204	Rodapé EN	2025-03-19 18:36:14.70437	2025-03-19 18:36:14.70437	2
205	Rodapé ES	2025-03-19 18:36:14.70437	2025-03-19 18:36:14.70437	3
56	Administrador	2025-03-02 14:27:32.891743	2025-03-13 11:47:13.16353	3
54	Administrador	2025-03-02 14:27:32.891743	2025-03-13 11:47:13.16353	1
55	Administrator	2025-03-02 14:27:32.891743	2025-03-13 11:47:13.16353	2
57	Administrador do  sistema	2025-03-02 14:27:32.891743	2025-03-13 11:47:13.16353	1
58	System Administrator	2025-03-02 14:27:32.891743	2025-03-13 11:47:13.16353	2
59	Administrador del sistema	2025-03-02 14:27:32.891743	2025-03-13 11:47:13.16353	3
22	Administração	2025-03-02 11:26:26.1871	2025-03-13 11:48:01.979634	1
23	Administration	2025-03-02 11:26:26.1871	2025-03-13 11:48:01.979634	2
24	Administración	2025-03-02 11:26:26.1871	2025-03-13 11:48:01.979634	3
25	Módulo de administração do sistema	2025-03-02 11:26:26.1871	2025-03-13 11:48:01.979634	1
26	System administration module	2025-03-02 11:26:26.1871	2025-03-13 11:48:01.979634	2
53	Módulo de administración del sistema	2025-03-02 13:04:22.581727	2025-03-13 11:48:01.979634	3
164	Permissões	2025-03-13 11:34:03.12137	2025-03-13 11:48:34.841683	1
165	Permissions	2025-03-13 11:34:03.12137	2025-03-13 11:48:34.841683	2
166	Permisos	2025-03-13 11:34:03.12137	2025-03-13 11:48:34.841683	3
174	Estabelecimentos	2025-03-13 11:55:08.535735	2025-03-13 11:55:08.535735	1
167	Módulos	2025-03-13 11:35:12.487651	2025-03-13 11:50:42.336216	1
168	Modules	2025-03-13 11:35:12.487651	2025-03-13 11:50:42.336216	2
169	Módulos	2025-03-13 11:35:12.487651	2025-03-13 11:50:42.336216	3
179	Configuração de email	2025-03-15 17:43:50.308799	2025-03-15 17:43:50.308799	1
180	Email settings	2025-03-15 17:43:50.308799	2025-03-15 17:43:50.308799	2
181	Configuración de email	2025-03-15 17:43:50.308799	2025-03-19 18:33:08.42132	3
\.


--
-- TOC entry 5116 (class 0 OID 386929)
-- Dependencies: 238
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (id, name, email, username, phone, password, "isActive", "isBlocked", "lastLoggedAt", "createdAt", "updatedAt", "imageId", "preferenceId") FROM stdin;
1	Demian Panassol	panassol1@gmail.com	demianpanassol	5554992746783	f257939c30000e779978be2828b3a92bfc2fd087af1e9a98af5bddfdf4974110cdb92a53051d6fe086b4ee00bc48a38058c894e03c7121a6f3e56f92be516855.bc0b3ca371a939bfe8f30eade5e904cbb8683f736616e401914348e4af23dcd0	t	f	2025-03-22 17:49:37.043	2024-12-30 22:48:07.273297	2025-03-22 17:49:37.043797	\N	\N
\.


--
-- TOC entry 5106 (class 0 OID 386862)
-- Dependencies: 228
-- Data for Name: user_establishment_role; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_establishment_role (id, "createdAt", "updatedAt", "establishmentId", "userId", "roleId") FROM stdin;
23	2025-03-13 11:55:56.139783	2025-03-13 11:55:56.139783	1	1	3
1	2024-12-30 22:54:47.031234	2025-03-13 11:55:56.139783	1	\N	3
\.


--
-- TOC entry 5153 (class 0 OID 0)
-- Dependencies: 253
-- Name: configuration_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.configuration_id_seq', 1, true);


--
-- TOC entry 5154 (class 0 OID 0)
-- Dependencies: 241
-- Name: cron_job_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cron_job_log_id_seq', 109, true);


--
-- TOC entry 5155 (class 0 OID 0)
-- Dependencies: 231
-- Name: email_setting_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.email_setting_id_seq', 2, true);


--
-- TOC entry 5156 (class 0 OID 0)
-- Dependencies: 233
-- Name: establishment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.establishment_id_seq', 2, true);


--
-- TOC entry 5157 (class 0 OID 0)
-- Dependencies: 219
-- Name: functionality_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.functionality_id_seq', 18, true);


--
-- TOC entry 5158 (class 0 OID 0)
-- Dependencies: 235
-- Name: image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.image_id_seq', 70, true);


--
-- TOC entry 5159 (class 0 OID 0)
-- Dependencies: 223
-- Name: language_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.language_id_seq', 5, true);


--
-- TOC entry 5160 (class 0 OID 0)
-- Dependencies: 215
-- Name: module_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.module_id_seq', 11, true);


--
-- TOC entry 5161 (class 0 OID 0)
-- Dependencies: 217
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.permission_id_seq', 23, true);


--
-- TOC entry 5162 (class 0 OID 0)
-- Dependencies: 221
-- Name: preference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.preference_id_seq', 39, true);


--
-- TOC entry 5163 (class 0 OID 0)
-- Dependencies: 239
-- Name: request_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.request_log_id_seq', 2384, true);


--
-- TOC entry 5164 (class 0 OID 0)
-- Dependencies: 229
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.role_id_seq', 4, true);


--
-- TOC entry 5165 (class 0 OID 0)
-- Dependencies: 225
-- Name: translation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.translation_id_seq', 205, true);


--
-- TOC entry 5166 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_establishment_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_establishment_role_id_seq', 23, true);


--
-- TOC entry 5167 (class 0 OID 0)
-- Dependencies: 237
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_id_seq', 36, true);


--
-- TOC entry 4900 (class 2606 OID 389018)
-- Name: configuration PK_03bad512915052d2342358f0d8b; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT "PK_03bad512915052d2342358f0d8b" PRIMARY KEY (id);


--
-- TOC entry 4821 (class 2606 OID 386791)
-- Name: module PK_0e20d657f968b051e674fbe3117; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.module
    ADD CONSTRAINT "PK_0e20d657f968b051e674fbe3117" PRIMARY KEY (id);


--
-- TOC entry 4841 (class 2606 OID 386907)
-- Name: establishment PK_149bd9dc1f2bd4e825a0c474932; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.establishment
    ADD CONSTRAINT "PK_149bd9dc1f2bd4e825a0c474932" PRIMARY KEY (id);


--
-- TOC entry 4891 (class 2606 OID 387034)
-- Name: email_setting_contents_translation PK_17fa290a1e03fdac60fc7587297; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting_contents_translation
    ADD CONSTRAINT "PK_17fa290a1e03fdac60fc7587297" PRIMARY KEY ("emailSettingId", "translationId");


--
-- TOC entry 4839 (class 2606 OID 386890)
-- Name: email_setting PK_2c8c3de75f281ceb6fc70f8044a; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting
    ADD CONSTRAINT "PK_2c8c3de75f281ceb6fc70f8044a" PRIMARY KEY (id);


--
-- TOC entry 4879 (class 2606 OID 387013)
-- Name: role_descriptions_translation PK_37ec044e4b7ff24ec7fc03be305; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_descriptions_translation
    ADD CONSTRAINT "PK_37ec044e4b7ff24ec7fc03be305" PRIMARY KEY ("roleId", "translationId");


--
-- TOC entry 4823 (class 2606 OID 386809)
-- Name: permission PK_3b8b97af9d9d8807e41e6f48362; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY (id);


--
-- TOC entry 4871 (class 2606 OID 386999)
-- Name: functionality_titles_translation PK_460c8bc48d10a56b41a955fae72; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionality_titles_translation
    ADD CONSTRAINT "PK_460c8bc48d10a56b41a955fae72" PRIMARY KEY ("functionalityId", "translationId");


--
-- TOC entry 4859 (class 2606 OID 386980)
-- Name: cron_job_log PK_475c38647467a9c768a0c95dce5; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cron_job_log
    ADD CONSTRAINT "PK_475c38647467a9c768a0c95dce5" PRIMARY KEY (id);


--
-- TOC entry 4883 (class 2606 OID 387020)
-- Name: email_setting_subjects_translation PK_55548390295be5f282bf38d1847; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting_subjects_translation
    ADD CONSTRAINT "PK_55548390295be5f282bf38d1847" PRIMARY KEY ("emailSettingId", "translationId");


--
-- TOC entry 4827 (class 2606 OID 386831)
-- Name: preference PK_5c4cbf49a1e97dcbc695bf462a6; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.preference
    ADD CONSTRAINT "PK_5c4cbf49a1e97dcbc695bf462a6" PRIMARY KEY (id);


--
-- TOC entry 4835 (class 2606 OID 386869)
-- Name: user_establishment_role PK_6d22e9262d8af0d9aff2241002b; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_establishment_role
    ADD CONSTRAINT "PK_6d22e9262d8af0d9aff2241002b" PRIMARY KEY (id);


--
-- TOC entry 4833 (class 2606 OID 386860)
-- Name: translation PK_7aef875e43ab80d34a0cdd39c70; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.translation
    ADD CONSTRAINT "PK_7aef875e43ab80d34a0cdd39c70" PRIMARY KEY (id);


--
-- TOC entry 4895 (class 2606 OID 387041)
-- Name: email_setting_footers_translation PK_80c1be19777878240007a84af2b; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting_footers_translation
    ADD CONSTRAINT "PK_80c1be19777878240007a84af2b" PRIMARY KEY ("emailSettingId", "translationId");


--
-- TOC entry 4867 (class 2606 OID 386992)
-- Name: module_descriptions_translation PK_9424dc6f069ccd84cd9dba829ec; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.module_descriptions_translation
    ADD CONSTRAINT "PK_9424dc6f069ccd84cd9dba829ec" PRIMARY KEY ("moduleId", "translationId");


--
-- TOC entry 4910 (class 2606 OID 389044)
-- Name: configuration_languages_language PK_94e6da6e483ec79d717712c5d66; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuration_languages_language
    ADD CONSTRAINT "PK_94e6da6e483ec79d717712c5d66" PRIMARY KEY ("configurationId", "languageId");


--
-- TOC entry 4825 (class 2606 OID 386818)
-- Name: functionality PK_95a4f9263c9b8d39dade8244fb7; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionality
    ADD CONSTRAINT "PK_95a4f9263c9b8d39dade8244fb7" PRIMARY KEY (id);


--
-- TOC entry 4887 (class 2606 OID 387027)
-- Name: email_setting_titles_translation PK_9deef6ba50f92fab5c46c0edf10; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting_titles_translation
    ADD CONSTRAINT "PK_9deef6ba50f92fab5c46c0edf10" PRIMARY KEY ("emailSettingId", "translationId");


--
-- TOC entry 4857 (class 2606 OID 386969)
-- Name: request_log PK_ae393b42f50b0399df4c90160d6; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.request_log
    ADD CONSTRAINT "PK_ae393b42f50b0399df4c90160d6" PRIMARY KEY (id);


--
-- TOC entry 4837 (class 2606 OID 386878)
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- TOC entry 4863 (class 2606 OID 386985)
-- Name: module_titles_translation PK_c95481454d627b945e547b5a05e; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.module_titles_translation
    ADD CONSTRAINT "PK_c95481454d627b945e547b5a05e" PRIMARY KEY ("moduleId", "translationId");


--
-- TOC entry 4847 (class 2606 OID 386940)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 4829 (class 2606 OID 386849)
-- Name: language PK_cc0a99e710eb3733f6fb42b1d4c; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.language
    ADD CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY (id);


--
-- TOC entry 4875 (class 2606 OID 387006)
-- Name: role_titles_translation PK_cc99950a665d20dbdee005121a1; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_titles_translation
    ADD CONSTRAINT "PK_cc99950a665d20dbdee005121a1" PRIMARY KEY ("roleId", "translationId");


--
-- TOC entry 4845 (class 2606 OID 386927)
-- Name: image PK_d6db1ab4ee9ad9dbe86c64e4cc3; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY (id);


--
-- TOC entry 4849 (class 2606 OID 386946)
-- Name: user REL_5e028298e103e1694147ada69e; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_5e028298e103e1694147ada69e" UNIQUE ("imageId");


--
-- TOC entry 4843 (class 2606 OID 386909)
-- Name: establishment REL_6df81fc013784b858cd7ebb4d6; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.establishment
    ADD CONSTRAINT "REL_6df81fc013784b858cd7ebb4d6" UNIQUE ("imageId");


--
-- TOC entry 4851 (class 2606 OID 386948)
-- Name: user REL_d4207055ad1a09811cbbb27b28; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_d4207055ad1a09811cbbb27b28" UNIQUE ("preferenceId");


--
-- TOC entry 4831 (class 2606 OID 388990)
-- Name: language UQ_242e561e13e04d77281c36e1eb3; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.language
    ADD CONSTRAINT "UQ_242e561e13e04d77281c36e1eb3" UNIQUE ("iconId");


--
-- TOC entry 4902 (class 2606 OID 389022)
-- Name: configuration UQ_5e699c5b5fece26a1bc7c78101a; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT "UQ_5e699c5b5fece26a1bc7c78101a" UNIQUE ("loginLogoId");


--
-- TOC entry 4853 (class 2606 OID 386944)
-- Name: user UQ_78a916df40e02a9deb1c4b75edb; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username);


--
-- TOC entry 4904 (class 2606 OID 389020)
-- Name: configuration UQ_82ce91191fa180b111d46293066; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT "UQ_82ce91191fa180b111d46293066" UNIQUE ("loginBannerId");


--
-- TOC entry 4906 (class 2606 OID 389024)
-- Name: configuration UQ_dbbe91bd37dacd531a8cf62f78a; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT "UQ_dbbe91bd37dacd531a8cf62f78a" UNIQUE ("faviconId");


--
-- TOC entry 4855 (class 2606 OID 386942)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- TOC entry 4898 (class 2606 OID 387232)
-- Name: sessions session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 4884 (class 1259 OID 387029)
-- Name: IDX_17ed6ad7fcb7c07d52112c776b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_17ed6ad7fcb7c07d52112c776b" ON public.email_setting_titles_translation USING btree ("translationId");


--
-- TOC entry 4872 (class 1259 OID 387008)
-- Name: IDX_19689c5f9d2a45063f1caefdbc; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_19689c5f9d2a45063f1caefdbc" ON public.role_titles_translation USING btree ("translationId");


--
-- TOC entry 4868 (class 1259 OID 387001)
-- Name: IDX_27df7a749ebf82453cbede77f7; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_27df7a749ebf82453cbede77f7" ON public.functionality_titles_translation USING btree ("translationId");


--
-- TOC entry 4864 (class 1259 OID 386994)
-- Name: IDX_29558b8f091b4efc47d3c5c94d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_29558b8f091b4efc47d3c5c94d" ON public.module_descriptions_translation USING btree ("translationId");


--
-- TOC entry 4865 (class 1259 OID 386993)
-- Name: IDX_457b2ba3737cdaa382f7a29f1d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_457b2ba3737cdaa382f7a29f1d" ON public.module_descriptions_translation USING btree ("moduleId");


--
-- TOC entry 4880 (class 1259 OID 387022)
-- Name: IDX_500838270092832bbe339907a5; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_500838270092832bbe339907a5" ON public.email_setting_subjects_translation USING btree ("translationId");


--
-- TOC entry 4907 (class 1259 OID 389046)
-- Name: IDX_620cd14dca4444668fd5e28e7f; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_620cd14dca4444668fd5e28e7f" ON public.configuration_languages_language USING btree ("languageId");


--
-- TOC entry 4860 (class 1259 OID 386987)
-- Name: IDX_6740c22145d5f4f7174ecb6517; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_6740c22145d5f4f7174ecb6517" ON public.module_titles_translation USING btree ("translationId");


--
-- TOC entry 4876 (class 1259 OID 387014)
-- Name: IDX_7212b94d000085f7c0911df4cd; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_7212b94d000085f7c0911df4cd" ON public.role_descriptions_translation USING btree ("roleId");


--
-- TOC entry 4892 (class 1259 OID 387043)
-- Name: IDX_7237d3b67c4d23e6438b99ad97; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_7237d3b67c4d23e6438b99ad97" ON public.email_setting_footers_translation USING btree ("translationId");


--
-- TOC entry 4869 (class 1259 OID 387000)
-- Name: IDX_82d7d7534db2fb9196b565a55f; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_82d7d7534db2fb9196b565a55f" ON public.functionality_titles_translation USING btree ("functionalityId");


--
-- TOC entry 4888 (class 1259 OID 387036)
-- Name: IDX_8657704a67845ab991c951580b; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_8657704a67845ab991c951580b" ON public.email_setting_contents_translation USING btree ("translationId");


--
-- TOC entry 4877 (class 1259 OID 387015)
-- Name: IDX_9cb338e9b809f7460bda599a88; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_9cb338e9b809f7460bda599a88" ON public.role_descriptions_translation USING btree ("translationId");


--
-- TOC entry 4889 (class 1259 OID 387035)
-- Name: IDX_b4411086db06900167c713f84c; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_b4411086db06900167c713f84c" ON public.email_setting_contents_translation USING btree ("emailSettingId");


--
-- TOC entry 4873 (class 1259 OID 387007)
-- Name: IDX_bdd65156dc05ffba91d2478d9d; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_bdd65156dc05ffba91d2478d9d" ON public.role_titles_translation USING btree ("roleId");


--
-- TOC entry 4885 (class 1259 OID 387028)
-- Name: IDX_cf28280a69cfbdd4b67beba9d5; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_cf28280a69cfbdd4b67beba9d5" ON public.email_setting_titles_translation USING btree ("emailSettingId");


--
-- TOC entry 4861 (class 1259 OID 386986)
-- Name: IDX_d3ae98e2422004d0bfe23fc6cb; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_d3ae98e2422004d0bfe23fc6cb" ON public.module_titles_translation USING btree ("moduleId");


--
-- TOC entry 4893 (class 1259 OID 387042)
-- Name: IDX_f00dbba1e55e866a027698005e; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_f00dbba1e55e866a027698005e" ON public.email_setting_footers_translation USING btree ("emailSettingId");


--
-- TOC entry 4908 (class 1259 OID 389045)
-- Name: IDX_f178b4133889e2424829afc181; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_f178b4133889e2424829afc181" ON public.configuration_languages_language USING btree ("configurationId");


--
-- TOC entry 4881 (class 1259 OID 387021)
-- Name: IDX_f699e8bc25f8946be4979d1e28; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_f699e8bc25f8946be4979d1e28" ON public.email_setting_subjects_translation USING btree ("emailSettingId");


--
-- TOC entry 4896 (class 1259 OID 387233)
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.sessions USING btree (expire);


--
-- TOC entry 4939 (class 2606 OID 387199)
-- Name: email_setting_titles_translation FK_17ed6ad7fcb7c07d52112c776b0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting_titles_translation
    ADD CONSTRAINT "FK_17ed6ad7fcb7c07d52112c776b0" FOREIGN KEY ("translationId") REFERENCES public.translation(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4933 (class 2606 OID 387169)
-- Name: role_titles_translation FK_19689c5f9d2a45063f1caefdbca; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_titles_translation
    ADD CONSTRAINT "FK_19689c5f9d2a45063f1caefdbca" FOREIGN KEY ("translationId") REFERENCES public.translation(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4914 (class 2606 OID 387064)
-- Name: functionality FK_206067e19a5d249b18faf01c940; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionality
    ADD CONSTRAINT "FK_206067e19a5d249b18faf01c940" FOREIGN KEY ("moduleId") REFERENCES public.module(id);


--
-- TOC entry 4917 (class 2606 OID 388991)
-- Name: language FK_242e561e13e04d77281c36e1eb3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.language
    ADD CONSTRAINT "FK_242e561e13e04d77281c36e1eb3" FOREIGN KEY ("iconId") REFERENCES public.image(id);


--
-- TOC entry 4931 (class 2606 OID 387159)
-- Name: functionality_titles_translation FK_27df7a749ebf82453cbede77f78; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionality_titles_translation
    ADD CONSTRAINT "FK_27df7a749ebf82453cbede77f78" FOREIGN KEY ("translationId") REFERENCES public.translation(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4929 (class 2606 OID 387149)
-- Name: module_descriptions_translation FK_29558b8f091b4efc47d3c5c94d8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.module_descriptions_translation
    ADD CONSTRAINT "FK_29558b8f091b4efc47d3c5c94d8" FOREIGN KEY ("translationId") REFERENCES public.translation(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4922 (class 2606 OID 387109)
-- Name: role FK_2e73270812d16f2fb9d0dd4b0ce; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "FK_2e73270812d16f2fb9d0dd4b0ce" FOREIGN KEY ("establishmentId") REFERENCES public.establishment(id);


--
-- TOC entry 4930 (class 2606 OID 387144)
-- Name: module_descriptions_translation FK_457b2ba3737cdaa382f7a29f1d8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.module_descriptions_translation
    ADD CONSTRAINT "FK_457b2ba3737cdaa382f7a29f1d8" FOREIGN KEY ("moduleId") REFERENCES public.module(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4915 (class 2606 OID 387079)
-- Name: preference FK_482091f89aa94deda3a9f48c625; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.preference
    ADD CONSTRAINT "FK_482091f89aa94deda3a9f48c625" FOREIGN KEY ("languageId") REFERENCES public.language(id);


--
-- TOC entry 4937 (class 2606 OID 387189)
-- Name: email_setting_subjects_translation FK_500838270092832bbe339907a5f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting_subjects_translation
    ADD CONSTRAINT "FK_500838270092832bbe339907a5f" FOREIGN KEY ("translationId") REFERENCES public.translation(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4911 (class 2606 OID 387044)
-- Name: module FK_5a84e5e50828623d8b310fb868c; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.module
    ADD CONSTRAINT "FK_5a84e5e50828623d8b310fb868c" FOREIGN KEY ("establishmentId") REFERENCES public.establishment(id);


--
-- TOC entry 4925 (class 2606 OID 390432)
-- Name: user FK_5e028298e103e1694147ada69e5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_5e028298e103e1694147ada69e5" FOREIGN KEY ("imageId") REFERENCES public.image(id);


--
-- TOC entry 4945 (class 2606 OID 389030)
-- Name: configuration FK_5e699c5b5fece26a1bc7c78101a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT "FK_5e699c5b5fece26a1bc7c78101a" FOREIGN KEY ("loginLogoId") REFERENCES public.image(id);


--
-- TOC entry 4948 (class 2606 OID 389052)
-- Name: configuration_languages_language FK_620cd14dca4444668fd5e28e7f4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuration_languages_language
    ADD CONSTRAINT "FK_620cd14dca4444668fd5e28e7f4" FOREIGN KEY ("languageId") REFERENCES public.language(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4927 (class 2606 OID 387139)
-- Name: module_titles_translation FK_6740c22145d5f4f7174ecb65178; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.module_titles_translation
    ADD CONSTRAINT "FK_6740c22145d5f4f7174ecb65178" FOREIGN KEY ("translationId") REFERENCES public.translation(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4924 (class 2606 OID 387119)
-- Name: establishment FK_6df81fc013784b858cd7ebb4d64; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.establishment
    ADD CONSTRAINT "FK_6df81fc013784b858cd7ebb4d64" FOREIGN KEY ("imageId") REFERENCES public.image(id);


--
-- TOC entry 4935 (class 2606 OID 387174)
-- Name: role_descriptions_translation FK_7212b94d000085f7c0911df4cd4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_descriptions_translation
    ADD CONSTRAINT "FK_7212b94d000085f7c0911df4cd4" FOREIGN KEY ("roleId") REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4943 (class 2606 OID 387219)
-- Name: email_setting_footers_translation FK_7237d3b67c4d23e6438b99ad973; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting_footers_translation
    ADD CONSTRAINT "FK_7237d3b67c4d23e6438b99ad973" FOREIGN KEY ("translationId") REFERENCES public.translation(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4918 (class 2606 OID 387089)
-- Name: translation FK_7c256f0ca19bb69a49f3b23e002; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.translation
    ADD CONSTRAINT "FK_7c256f0ca19bb69a49f3b23e002" FOREIGN KEY ("languageId") REFERENCES public.language(id);


--
-- TOC entry 4923 (class 2606 OID 387114)
-- Name: email_setting FK_7ebd8e59725c95d9814dae5be62; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting
    ADD CONSTRAINT "FK_7ebd8e59725c95d9814dae5be62" FOREIGN KEY ("establishmentId") REFERENCES public.establishment(id);


--
-- TOC entry 4946 (class 2606 OID 389025)
-- Name: configuration FK_82ce91191fa180b111d46293066; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT "FK_82ce91191fa180b111d46293066" FOREIGN KEY ("loginBannerId") REFERENCES public.image(id);


--
-- TOC entry 4932 (class 2606 OID 387154)
-- Name: functionality_titles_translation FK_82d7d7534db2fb9196b565a55f2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.functionality_titles_translation
    ADD CONSTRAINT "FK_82d7d7534db2fb9196b565a55f2" FOREIGN KEY ("functionalityId") REFERENCES public.functionality(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4941 (class 2606 OID 387209)
-- Name: email_setting_contents_translation FK_8657704a67845ab991c951580b8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting_contents_translation
    ADD CONSTRAINT "FK_8657704a67845ab991c951580b8" FOREIGN KEY ("translationId") REFERENCES public.translation(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4916 (class 2606 OID 387084)
-- Name: preference FK_8daa6988da560d702472cf8cbc3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.preference
    ADD CONSTRAINT "FK_8daa6988da560d702472cf8cbc3" FOREIGN KEY ("functionalityId") REFERENCES public.functionality(id);


--
-- TOC entry 4912 (class 2606 OID 387049)
-- Name: permission FK_93f3a12d9c620330c60959c44fc; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "FK_93f3a12d9c620330c60959c44fc" FOREIGN KEY ("functionalityId") REFERENCES public.functionality(id);


--
-- TOC entry 4936 (class 2606 OID 387179)
-- Name: role_descriptions_translation FK_9cb338e9b809f7460bda599a884; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_descriptions_translation
    ADD CONSTRAINT "FK_9cb338e9b809f7460bda599a884" FOREIGN KEY ("translationId") REFERENCES public.translation(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4919 (class 2606 OID 387094)
-- Name: user_establishment_role FK_b12c186c99f29d959b6186b6d03; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_establishment_role
    ADD CONSTRAINT "FK_b12c186c99f29d959b6186b6d03" FOREIGN KEY ("establishmentId") REFERENCES public.establishment(id);


--
-- TOC entry 4942 (class 2606 OID 387204)
-- Name: email_setting_contents_translation FK_b4411086db06900167c713f84ce; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting_contents_translation
    ADD CONSTRAINT "FK_b4411086db06900167c713f84ce" FOREIGN KEY ("emailSettingId") REFERENCES public.email_setting(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4934 (class 2606 OID 387164)
-- Name: role_titles_translation FK_bdd65156dc05ffba91d2478d9d8; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_titles_translation
    ADD CONSTRAINT "FK_bdd65156dc05ffba91d2478d9d8" FOREIGN KEY ("roleId") REFERENCES public.role(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4913 (class 2606 OID 387054)
-- Name: permission FK_cdb4db95384a1cf7a837c4c683e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT "FK_cdb4db95384a1cf7a837c4c683e" FOREIGN KEY ("roleId") REFERENCES public.role(id);


--
-- TOC entry 4940 (class 2606 OID 387194)
-- Name: email_setting_titles_translation FK_cf28280a69cfbdd4b67beba9d53; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting_titles_translation
    ADD CONSTRAINT "FK_cf28280a69cfbdd4b67beba9d53" FOREIGN KEY ("emailSettingId") REFERENCES public.email_setting(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4928 (class 2606 OID 387134)
-- Name: module_titles_translation FK_d3ae98e2422004d0bfe23fc6cb4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.module_titles_translation
    ADD CONSTRAINT "FK_d3ae98e2422004d0bfe23fc6cb4" FOREIGN KEY ("moduleId") REFERENCES public.module(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4926 (class 2606 OID 390437)
-- Name: user FK_d4207055ad1a09811cbbb27b287; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_d4207055ad1a09811cbbb27b287" FOREIGN KEY ("preferenceId") REFERENCES public.preference(id);


--
-- TOC entry 4947 (class 2606 OID 389035)
-- Name: configuration FK_dbbe91bd37dacd531a8cf62f78a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT "FK_dbbe91bd37dacd531a8cf62f78a" FOREIGN KEY ("faviconId") REFERENCES public.image(id);


--
-- TOC entry 4920 (class 2606 OID 387104)
-- Name: user_establishment_role FK_e5a9c2c70ed160b7f6ed119e69d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_establishment_role
    ADD CONSTRAINT "FK_e5a9c2c70ed160b7f6ed119e69d" FOREIGN KEY ("roleId") REFERENCES public.role(id);


--
-- TOC entry 4921 (class 2606 OID 390427)
-- Name: user_establishment_role FK_ebbac93cdbc5b31af0fa8eb595d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_establishment_role
    ADD CONSTRAINT "FK_ebbac93cdbc5b31af0fa8eb595d" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- TOC entry 4944 (class 2606 OID 387214)
-- Name: email_setting_footers_translation FK_f00dbba1e55e866a027698005e0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting_footers_translation
    ADD CONSTRAINT "FK_f00dbba1e55e866a027698005e0" FOREIGN KEY ("emailSettingId") REFERENCES public.email_setting(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4949 (class 2606 OID 389047)
-- Name: configuration_languages_language FK_f178b4133889e2424829afc1813; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configuration_languages_language
    ADD CONSTRAINT "FK_f178b4133889e2424829afc1813" FOREIGN KEY ("configurationId") REFERENCES public.configuration(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4938 (class 2606 OID 387184)
-- Name: email_setting_subjects_translation FK_f699e8bc25f8946be4979d1e28a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.email_setting_subjects_translation
    ADD CONSTRAINT "FK_f699e8bc25f8946be4979d1e28a" FOREIGN KEY ("emailSettingId") REFERENCES public.email_setting(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-03-23 14:49:01

--
-- PostgreSQL database dump complete
--

