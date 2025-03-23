--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2025-03-23 14:44:21

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
-- TOC entry 5098 (class 0 OID 0)
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
-- TOC entry 5099 (class 0 OID 0)
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
-- TOC entry 5100 (class 0 OID 0)
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
-- TOC entry 5101 (class 0 OID 0)
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
-- TOC entry 5102 (class 0 OID 0)
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
-- TOC entry 5103 (class 0 OID 0)
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
-- TOC entry 5104 (class 0 OID 0)
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
-- TOC entry 5105 (class 0 OID 0)
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
-- TOC entry 5106 (class 0 OID 0)
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
-- TOC entry 5107 (class 0 OID 0)
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
-- TOC entry 5108 (class 0 OID 0)
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
-- TOC entry 5109 (class 0 OID 0)
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
-- TOC entry 5110 (class 0 OID 0)
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
-- TOC entry 5111 (class 0 OID 0)
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
-- TOC entry 5112 (class 0 OID 0)
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


-- Completed on 2025-03-23 14:44:26

--
-- PostgreSQL database dump complete
--

