--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE greenify;
DROP DATABASE planer;
DROP DATABASE varve;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:qibkvxmIO5//GeGE1qVUAw==$qXPskBBhj76bWt8AskFqB8XUhQu56wjXl64XTGz2+Po=:JmBNR/Rm39/KgSfp8eVM/RUBU+QhYgJ//3TsgZrXTOM=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

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

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "greenify" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

--
-- Name: greenify; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE greenify WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE greenify OWNER TO postgres;

\connect greenify

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

--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'User',
    'Admin'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Status" AS ENUM (
    'Active',
    'Draft'
);


ALTER TYPE public."Status" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name character varying(60) NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: File; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."File" (
    id text NOT NULL,
    "productId" integer,
    url text NOT NULL
);


ALTER TABLE public."File" OWNER TO postgres;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    customer text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    line1 text,
    line2 text,
    state text,
    city text,
    "postalCode" text,
    country text,
    total integer NOT NULL,
    "shippingCost" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deliveredAt" timestamp(3) without time zone
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: OrdersOnProducts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrdersOnProducts" (
    "productId" integer NOT NULL,
    "orderId" text NOT NULL,
    qty integer NOT NULL
);


ALTER TABLE public."OrdersOnProducts" OWNER TO postgres;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name character varying(120) NOT NULL,
    "desc" text NOT NULL,
    price double precision NOT NULL,
    "inStock" integer NOT NULL,
    "categoryId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status public."Status" DEFAULT 'Active'::public."Status" NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    "firstName" character varying(20) NOT NULL,
    "lastName" character varying(30) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    roles public."Role"[] DEFAULT ARRAY['User'::public."Role"]
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name) FROM stdin;
\.


--
-- Data for Name: File; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."File" (id, "productId", url) FROM stdin;
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, customer, email, phone, line1, line2, state, city, "postalCode", country, total, "shippingCost", "createdAt", "deliveredAt") FROM stdin;
\.


--
-- Data for Name: OrdersOnProducts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrdersOnProducts" ("productId", "orderId", qty) FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, "desc", price, "inStock", "categoryId", "createdAt", "updatedAt", status) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, "firstName", "lastName", email, password, "createdAt", "updatedAt", roles) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
97ebaa97-ce88-402c-beb4-5a19c39b2ccc	577ca1caa6472c8a496be0a6b994a0462df45b74394d474e37bdd193e9b19c54	2024-05-04 10:13:43.288755+00	20230904025920_init	\N	\N	2024-05-04 10:13:43.170562+00	1
acf73a1b-0bb0-44ba-b960-0efba48fce77	97da99d64cdde9fc7b165b73278fa225c4ad8d18ee0d2d55dc959a68389c81ca	2024-05-04 10:13:43.350625+00	20230904045135_change_price_to_float	\N	\N	2024-05-04 10:13:43.306304+00	1
24bce036-378f-4fe1-9b34-6c3884e7c779	2f54e978891ba98fc46b0dca822bad39eaac1c744c63dfa3a2db0f8a65257be8	2024-05-04 10:13:43.435567+00	20240205075920_switch_to_s3	\N	\N	2024-05-04 10:13:43.371913+00	1
\.


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 1, false);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 1, false);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, false);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: File File_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."File"
    ADD CONSTRAINT "File_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: OrdersOnProducts OrdersOnProducts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrdersOnProducts"
    ADD CONSTRAINT "OrdersOnProducts_pkey" PRIMARY KEY ("productId", "orderId");


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Product_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_name_key" ON public."Product" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: File File_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."File"
    ADD CONSTRAINT "File_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrdersOnProducts OrdersOnProducts_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrdersOnProducts"
    ADD CONSTRAINT "OrdersOnProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrdersOnProducts OrdersOnProducts_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrdersOnProducts"
    ADD CONSTRAINT "OrdersOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

--
-- Database "planer" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

--
-- Name: planer; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE planer WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE planer OWNER TO postgres;

\connect planer

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner:
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    notes character varying,
    color character varying DEFAULT 'gray'::character varying NOT NULL,
    "creatorId" uuid
);


ALTER TABLE public.event OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    first_name character varying,
    last_name character varying,
    joined_at timestamp without time zone DEFAULT now() NOT NULL,
    refresh_token character varying
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Data for Name: event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event (id, name, start_time, end_time, created_at, updated_at, notes, color, "creatorId") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, password, first_name, last_name, joined_at, refresh_token) FROM stdin;
7032628a-cd86-41a0-8181-dfebe90199e2	tim@foo.com	$argon2id$v=19$m=65536,t=3,p=4$q0seMu95voXtbMwb60uF5A$7R3jxhtsuvozBdrRHgd7lYgW81044vuS/zGM12+MFwQ	\N	\N	2024-05-02 03:09:25.355296	\N
df141ec7-0c5d-4a7f-8f91-83077f6f5307	anhtt@galo.com	$argon2id$v=19$m=65536,t=3,p=4$PDQ+ZlLwJRqaIQWkIhK5UQ$iUuFq7QwAliLr9ky89EWbS/EAClqPQeIbiYHJ70+FxE	\N	\N	2024-05-02 03:09:25.355296	\N
3aae5e21-7a7b-4446-a879-9ef8410fde11	galo@acacia.com	$argon2id$v=19$m=65536,t=3,p=4$Zvq2V8ZUbOrnx261RjVFkg$gLIoIKcSVfhoYR1Bc3YFXOOlO9p/8Nj6DbLPHtMsu6g	\N	\N	2024-05-02 03:09:25.355296	\N
559a390b-7314-4660-b230-afd3e66af46a	galo@one.com	$argon2id$v=19$m=65536,t=3,p=4$ghaL1PDdV3XTajinwXYOcQ$DGOrpgBu8U9J0H7eor2QoYSHFY+xjPzO8QiczmwMRHs	Galo	Acacia	2024-05-02 05:32:39.75555	\N
\.


--
-- Name: event PK_30c2f3bbaf6d34a55f8ae6e4614; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: event FK_7a773352fcf1271324f2e5a3e41; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT "FK_7a773352fcf1271324f2e5a3e41" FOREIGN KEY ("creatorId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- Database "varve" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

--
-- Name: varve; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE varve WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE varve OWNER TO postgres;

\connect varve

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'User',
    'Admin'
);


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Status" AS ENUM (
    'Active',
    'Draft',
    'Archived'
);


ALTER TYPE public."Status" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    slug character varying(60) NOT NULL,
    name character varying(60) NOT NULL,
    "parentCategoryId" integer
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: File; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."File" (
    id text NOT NULL,
    url text NOT NULL
);


ALTER TABLE public."File" OWNER TO postgres;

--
-- Name: Image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Image" (
    "fileId" text NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE public."Image" OWNER TO postgres;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    customer text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    line1 text,
    line2 text,
    state text,
    city text,
    "postalCode" text,
    country text,
    total integer NOT NULL,
    "shippingCost" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deliveredAt" timestamp(3) without time zone,
    tax integer NOT NULL
);


ALTER TABLE public."Order" OWNER TO postgres;

--
-- Name: OrdersOnProducts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."OrdersOnProducts" (
    "productId" integer NOT NULL,
    "orderId" text NOT NULL,
    qty integer NOT NULL
);


ALTER TABLE public."OrdersOnProducts" OWNER TO postgres;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name character varying(120) NOT NULL,
    slug text NOT NULL,
    "desc" text NOT NULL,
    price double precision NOT NULL,
    "inStock" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    status public."Status" DEFAULT 'Active'::public."Status" NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    "firstName" character varying(20) NOT NULL,
    "lastName" character varying(30) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    roles public."Role"[] DEFAULT ARRAY['User'::public."Role"]
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _CategoryToProduct; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_CategoryToProduct" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_CategoryToProduct" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, slug, name, "parentCategoryId") FROM stdin;
102	plants	Plants	\N
103	care	Care	\N
104	indoor	Indoor	102
105	outdoor	Outdoor	102
106	succulents	Succulents	104
107	foliage	Foliage	104
108	flowering	Flowering	104
109	air-purifying	Air-purifying	104
110	trees-shrubs	Trees and Shrubs	105
111	perennials	Perennials	105
112	annuals	Annuals	105
113	vines-climbers	Vines and Climbers	105
114	edible	Edible	102
115	herbs	Herbs	114
116	vegetables	Vegetables	114
117	fruits	Fruits	114
118	microgreens	Microgreens	114
119	soil-fertilizers	Soil and Fertilizers	103
120	potting-soil	Potting Soil	119
121	fertilizers	Fertilizers	119
122	compost-mulch	Compost and Mulch	119
123	pots-planters	Pots and Planters	103
124	indoor-pots	Indoor Pots	123
125	outdoor-planters	Outdoor Planters	123
126	decorative-planters	Decorative Planters	123
127	tools-accessories	Tools and Accessories	103
128	gardening-tools	Gardening Tools	127
129	plant-supports	Plant Supports	127
130	plant-care-accessories	Plant Care Accessories	127
131	holiday	Holiday	102
132	decorative	Decorative	104
133	low-light	Low-light	104
134	christmas	Christmas	131
135	halloween	Halloween	131
136	valentine	Valentine	131
137	lunar-new-year	Lunar New Year	131
\.

--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, slug, "desc", price, "inStock", "createdAt", "updatedAt", status) FROM stdin;
109	Snake Plant (Sansevieria Trifasciata)	snake-plant	The Elegant Snake Plant, also known as Sansevieria Trifasciata or Mother-in-Law's Tongue, is a versatile and low-maintenance houseplant perfect for any indoor space. Known for its air-purifying qualities, this plant helps to filter indoor air, removing toxins and improving air quality. With its striking upright leaves and attractive green and yellow variegation, the Elegant Snake Plant adds a touch of natural elegance to your home or office decor.\n\n•  Light Requirements: Thrives in bright, indirect light but can tolerate low light conditions.\n•  Watering: Water sparingly; allow the soil to dry between waterings. Overwatering can lead to root rot.\n•  Size: Approximately 12-18 inches tall.\n•  Pot Included: Comes in a modern, white ceramic pot with drainage holes.\n\nCare Instructions:\n•  Light: Place in a well-lit area, away from direct sunlight.\n•  Water: Water once every 2-3 weeks, ensuring the soil is dry before watering again.\n•  Temperature: Prefers temperatures between 60-85°F (15-29°C).\n•  Fertilizer: Feed with a balanced houseplant fertilizer every 2-3 months during the growing season.\n\nAdditional Information:\n•  Botanical Name: Sansevieria Trifasciata\n•  Common Names: Snake Plant, Mother-in-Law's Tongue\n•  Origin: Native to West Africa\n•  Toxicity: Toxic to pets if ingested; keep out of reach of cats and dogs.	29.99	3	2024-05-18 06:42:00.226	2024-05-18 07:02:22.824	Active
111	Peace Lily (Spathiphyllum)	peace-lily	The Peace Lily, or Spathiphyllum, is a stunning indoor plant known for its glossy green leaves and elegant white flowers. Renowned for its ability to thrive in low-light conditions and purify the air, the Peace Lily is a perfect addition to any home or office. Its beautiful blooms and easy-care nature make it a favorite among plant enthusiasts.\n\n•  Light Requirements: Thrives in low to bright indirect light.\n•  Watering: Keep the soil consistently moist but not waterlogged.\n•  Size: Approximately 18-24 inches tall.\n•  Pot Included: Comes in a classic, white ceramic pot with drainage holes.\n\nCare Instructions:\n•  Light: Place in a well-lit area, avoiding direct sunlight.\n•  Water: Water regularly to keep the soil moist but not soggy.\n•  Temperature: Prefers temperatures between 65-80°F (18-27°C).\n•  Fertilizer: Feed with a balanced houseplant fertilizer every 2-3 months.\n\nAdditional Information:\n•  Botanical Name: Spathiphyllum\n•  Common Names: Peace Lily, White Sail Plant\n•  Origin: Native to Central and South America\n•  Toxicity: Toxic to pets if ingested; keep out of reach of cats and dogs.	34.99	2	2024-05-18 06:51:52.59	2024-05-18 07:02:47.654	Archived
112	ZZ Plant (Zamioculcas Zamiifolia)	zz-plant	The ZZ Plant, scientifically known as Zamioculcas Zamiifolia, is a popular indoor plant cherished for its striking, glossy green leaves and exceptional resilience. This low-maintenance plant is perfect for both novice and experienced plant parents, thriving in a variety of indoor conditions. Known for its air-purifying abilities, the ZZ Plant helps to create a healthier indoor environment.\n\n•  Light Requirements: Can tolerate low light but prefers bright, indirect light.\n•  Watering: Allow the soil to dry out completely between waterings.\n•  Size: Approximately 12-24 inches tall.\n•  Pot Included: Comes in a sleek, gray plastic pot with drainage holes.\n\nCare Instructions:\n•  Light: Place in a location with low to bright indirect light.\n•  Water: Water once every 2-3 weeks, ensuring the soil is dry before watering again.\n•  Temperature: Thrives in temperatures between 60-75°F (15-24°C).\n•  Fertilizer: Feed with a balanced houseplant fertilizer every 3-4 months during the growing season.\n\nAdditional Information:\n•  Botanical Name: Zamioculcas Zamiifolia\n•  Common Names: ZZ Plant, Zanzibar Gem\n•  Origin: Native to Eastern Africa\n•  Toxicity: Toxic to pets if ingested; keep out of reach of cats and dogs.	32.99	0	2024-05-18 06:53:40.543	2024-05-18 07:05:19.308	Archived
113	Anthurium (Anthurium Andraeanum)	anthurium	The Anthurium, also known as Anthurium Andraeanum or Flamingo Flower, is a stunning indoor plant celebrated for its vibrant, heart-shaped flowers and glossy, dark green leaves. This tropical plant is perfect for adding a touch of color and elegance to any indoor space. With proper care, the Anthurium can bloom year-round, making it a delightful addition to your home or office.\n\n•  Light Requirements: Prefers bright, indirect light but can tolerate lower light conditions.\n•  Watering: Keep the soil consistently moist but not waterlogged. Allow the top inch of soil to dry out between waterings.\n•  Size: Approximately 18-24 inches tall.\n•  Pot Included: Comes in a chic, red ceramic pot with drainage holes.\n\nCare Instructions:\n•  Light: Place in a well-lit area with indirect sunlight.\n•  Water: Water regularly to keep the soil moist but not soggy.\n•  Temperature: Thrives in temperatures between 65-80°F (18-27°C).\n•  Fertilizer: Feed with a balanced houseplant fertilizer every 6-8 weeks during the growing season.\n\nAdditional Information:\n•  Botanical Name: Anthurium Andraeanum\n•  Common Names: Flamingo Flower, Laceleaf\n•  Origin: Native to Central and South America\n•  Toxicity: Toxic to pets if ingested; keep out of reach of cats and dogs.	39.99	1	2024-05-18 07:13:47.128	2024-05-18 07:13:47.128	Active
114	Bromeliad (Bromeliaceae)	bromeliad	The Bromeliad, belonging to the Bromeliaceae family, is a striking indoor plant known for its vibrant, long-lasting flowers and rosette of sturdy leaves. This tropical plant brings a burst of color to any indoor space and is relatively easy to care for. Bromeliads are also known for their unique water-holding capacity in the central cup formed by their leaves, making them fascinating and functional decor pieces.\n\n•  Light Requirements: Prefers bright, indirect light.\n•  Watering: Keep the central cup filled with water and mist the leaves regularly. Water the soil sparingly.\n•  Size: Approximately 12-18 inches tall.\n•  Pot Included: Comes in a modern, black plastic pot with drainage holes.\n\nCare Instructions:\n•  Light: Place in a well-lit area with indirect sunlight.\n•  Water: Keep the central cup filled with water and mist the leaves regularly.\n•  Temperature: Prefers temperatures between 60-80°F (15-27°C).\n•  Fertilizer: Feed with a diluted balanced fertilizer every 2-4 weeks during the growing season.\n\nAdditional Information:\n•  Botanical Name: Bromeliaceae\n•  Common Names: Bromeliad\n•  Origin: Native to tropical Americas\n•  Toxicity: Non-toxic to pets.	29.99	4	2024-05-18 07:17:50.572	2024-05-18 07:17:50.572	Archived
115	Orchid (Orchidaceae)	orchid	The Orchid, part of the Orchidaceae family, is an elegant and exotic indoor plant admired for its stunning blooms and delicate beauty. Orchids are perfect for adding a touch of sophistication to any room and can thrive with proper care. Available in a variety of colors and patterns, orchids are a favorite among plant enthusiasts and make for a lovely gift.\n\n•  Light Requirements: Prefers bright, indirect light.\n•  Watering: Water thoroughly when the potting medium is almost dry. Ensure proper drainage.\n•  Size: Approximately 18-24 inches tall.\n•  Pot Included: Comes in an elegant, white ceramic pot with drainage holes.\n\nCare Instructions:\n•  Light: Place in a well-lit area with indirect sunlight.\n•  Water: Water thoroughly when the potting medium is almost dry. Ensure proper drainage.\n•  Temperature: Thrives in temperatures between 60-75°F (15-24°C).\n•  Fertilizer: Feed with an orchid-specific fertilizer every 2-4 weeks during the growing season.\n\nAdditional Information:\n•  Botanical Name: Orchidaceae\n•  Common Names: Orchid\n•  Origin: Found worldwide, especially in tropical regions\n•  Toxicity: Non-toxic to pets.	49.99	9	2024-05-18 07:23:33.073	2024-05-18 07:23:33.073	Active
116	Cherry Tomato Plant (Solanum Lycopersicum)	cherry-tomato-plant	The Cherry Tomato Plant, scientifically known as Solanum Lycopersicum, is a delightful addition to any vegetable garden or patio container. This compact and prolific plant produces an abundance of sweet and juicy cherry tomatoes throughout the growing season. Perfect for salads, snacking, or adding a burst of flavor to your favorite dishes, the Cherry Tomato Plant is easy to grow and rewarding to harvest.\n\n•  Light Requirements: Requires full sun; place in a location with at least 6-8 hours of sunlight per day.\n•  Watering: Keep the soil consistently moist, especially during hot weather.\n•  Size: Grows to approximately 18-24 inches tall.\n•  Container Included: Comes in a sturdy, plastic container with drainage holes.\n\nCare Instructions:\n•  Light: Requires full sun; place in a sunny spot with at least 6-8 hours of sunlight per day.\n•  Water: Keep the soil consistently moist, but avoid overwatering to prevent root rot.\n•  Temperature: Thrives in temperatures between 65-85°F (18-29°C).\n•  Fertilizer: Feed with a balanced vegetable fertilizer every 3-4 weeks during the growing season.\n\nAdditional Information:\n•  Botanical Name: Solanum Lycopersicum\n•  Common Names: Cherry Tomato, Grape Tomato\n•  Origin: Native to South America\n•  Harvest Time: Expect to harvest ripe tomatoes within 60-80 days after planting.	12.99	3	2024-05-18 07:30:55.139	2024-05-18 07:30:55.139	Active
117	All-Purpose Potting Soil	all-purpose-potting-soil	Our All-Purpose Potting Soil is a premium blend designed to provide the perfect growing medium for a wide variety of indoor and outdoor plants. Formulated with high-quality ingredients, including peat moss, perlite, and composted bark, this soil promotes healthy root development and optimal plant growth. Ideal for potting, repotting, and transplanting, our all-purpose soil is suitable for use with houseplants, vegetables, flowers, and more.\n\n•  Composition: Peat moss, perlite, composted bark, and other organic materials.\n•  Usage: Suitable for indoor and outdoor plants in containers, raised beds, and garden beds.\n•  Package Size: 1 cubic foot bag (approximately 7.5 gallons).\n•  Packaging: Comes in a sturdy, resealable plastic bag for easy storage and use.\n\nDirections for Use:\n•  Potting: Fill pots or containers with All-Purpose Potting Soil, leaving space for plant roots.\n•  Planting: Plant seeds or transplants according to specific plant instructions.\n•  Watering: Water thoroughly after planting and as needed to keep the soil evenly moist.\n•  Fertilizing: Use a balanced fertilizer as needed to provide additional nutrients.\n\nAdditional Information:\n•  Suitable for: Indoor and outdoor plants, including houseplants, vegetables, herbs, flowers, and more.\n•  Organic: Contains organic materials for improved soil structure and nutrient retention.\n•  pH Balanced: Neutral pH level suitable for a wide range of plant types.	9.99	4	2024-05-18 07:36:32.893	2024-05-18 07:36:32.893	Active
118	Hanging Air Plant Terrarium Kit	hanging-air-plant-terrarium-kit	Create your own miniature garden with our Hanging Air Plant Terrarium Kit. This DIY kit includes everything you need to assemble a stunning terrarium featuring easy-care air plants suspended in a glass globe. Perfect for adding a touch of greenery to any room, this terrarium kit is a great gift for plant lovers and a fun project for all ages.\n\n•  Kit Includes: Glass globe terrarium, assorted air plants, decorative rocks, preserved moss, and hanging materials.\n•  Assembly: Easy-to-follow instructions for assembling and caring for your terrarium.\n•  Size: Terrarium measures approximately 4 inches in diameter.\n•  Maintenance: Air plants require occasional misting and indirect light to thrive.\n\nContents:\n•  Glass Globe Terrarium: Clear glass globe with an opening for placing plants and decorative elements.\n•  Assorted Air Plants: Selection of small air plants in various shapes and sizes.\n•  Decorative Rocks: Natural stones to add texture and visual interest to your terrarium.\n•  Preserved Moss: Soft moss for creating a natural base and enhancing the terrarium's aesthetics.\n•  Hanging Materials: Nylon cord or metal chain for suspending the terrarium from a hook or ceiling.\n\nAdditional Information:\n•  Care: Mist air plants with water every 1-2 weeks and provide indirect sunlight.\n•  Ideal for: Home decor, office desks, and gift-giving for plant enthusiasts.\n•  Customization: Add your own personal touch with additional decorations such as shells, crystals, or miniature figurines.	29.99	2	2024-05-18 07:46:12.43	2024-05-18 07:46:12.43	Active
119	Herb Garden Kit (Assorted Herbs)	herb-garden-kit	The Herb Garden Kit is perfect for those looking to grow their own fresh herbs at home. This kit includes everything you need to cultivate a variety of aromatic and flavorful herbs, ideal for enhancing your culinary creations. Each kit contains seeds for basil, parsley, cilantro, and thyme, along with biodegradable pots and soil discs.\n\n•  Light Requirements: Prefers bright, indirect light.\n•  Watering: Keep the soil consistently moist but not waterlogged.\n•  Size: Each pot is approximately 4 inches in diameter.\n•  Kit Includes: Biodegradable pots, soil discs, herb seeds (basil, parsley, cilantro, thyme), and detailed growing instructions.\n\nCare Instructions:\n•  Light: Place in a well-lit area with indirect sunlight.\n•  Water: Water regularly to keep the soil moist but not soggy.\n•  Temperature: Thrives in temperatures between 65-75°F (18-24°C).\n•  Fertilizer: Not necessary; the soil discs are enriched with essential nutrients.\n\nAdditional Information:\n•  Botanical Names: Ocimum basilicum (Basil), Petroselinum crispum (Parsley), Coriandrum sativum (Cilantro), Thymus vulgaris (Thyme)\n•  Common Names: Herb Garden Kit\n•  Origin: Various regions\n•  Toxicity: Non-toxic to pets.	19.99	2	2024-05-18 07:52:39.939	2024-05-18 07:52:39.939	Draft
120	Japanese Maple (Acer Palmatum)	japanese-maple	The Japanese Maple, or Acer Palmatum, is a stunning deciduous tree known for its delicate, deeply lobed leaves and vibrant fall colors. This tree is a favorite in landscapes and gardens for its elegant form and striking foliage. Perfect for adding a touch of serenity and beauty to your outdoor space, the Japanese Maple is relatively easy to care for and can be a focal point in any garden.\n\n•  Light Requirements: Prefers partial shade to full sun.\n•  Watering: Keep the soil consistently moist but well-drained.\n•  Size: Can grow up to 10-25 feet tall and wide.\n\nCare Instructions:\n•  Light: Plant in an area with partial shade to full sun.\n•  Water: Water regularly to keep the soil moist but not waterlogged.\n•  Temperature: Thrives in USDA hardiness zones 5-8.\n•  Fertilizer: Feed with a balanced fertilizer in spring.\n\nAdditional Information:\n•  Botanical Name: Acer Palmatum\n•  Common Names: Japanese Maple\n•  Origin: Native to Japan, Korea, and China\n•  Toxicity: Non-toxic to pets.	59.99	5	2024-05-19 03:53:30.872	2024-05-19 03:53:30.872	Active
110	Golden Pothos (Epipremnum Aureum)	golden-pothos	Product Description:\nThe Golden Pothos, also known as Epipremnum Aureum, is a popular and resilient houseplant known for its trailing vines and vibrant green leaves with golden-yellow variegation. This easy-to-care-for plant is perfect for beginners and can thrive in a variety of indoor conditions, making it a versatile addition to any home or office. The Golden Pothos is also known for its air-purifying properties, helping to remove toxins from the air.\n\n•  Light Requirements: Prefers bright, indirect light but can tolerate low light conditions.\n•  Watering: Water when the top inch of soil feels dry. Avoid overwatering.\n•  Size: Vines can grow up to 6-10 feet long.\n•  Pot Included: Comes in a stylish, black plastic pot with drainage holes.\n\nCare Instructions:\n•  Light: Place in a well-lit area with indirect sunlight.\n•  Water: Water once a week or when the top inch of soil is dry.\n•  Temperature: Thrives in temperatures between 60-80°F (15-27°C).\n•  Fertilizer: Feed with a balanced houseplant fertilizer every 4-6 weeks during the growing season.\n\nAdditional Information:\n•  Botanical Name: Epipremnum Aureum\n•  Common Names: Golden Pothos, Devil's Ivy\n•  Origin: Native to Southeast Asia\n•  Toxicity: Toxic to pets if ingested; keep out of reach of cats and dogs.	24.99	0	2024-05-18 06:47:13.476	2024-05-19 13:36:58.209	Active
\.

--
-- Data for Name: File; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."File" (id, url) FROM stdin;
products/18175c7c-65a1-4c8e-a76e-14152a9764e2-_0b293f0e-9a45-4273-8d8e-5860c17fe1ad.jpg	https://varve.s3.us-east-1.amazonaws.com/products/18175c7c-65a1-4c8e-a76e-14152a9764e2-_0b293f0e-9a45-4273-8d8e-5860c17fe1ad.jpg
products/656c17ae-015f-4b9c-b414-b6fb1451c68d-_7ecbcc82-bc96-4d78-9ddd-67706c3fb42c.jpg	https://varve.s3.us-east-1.amazonaws.com/products/656c17ae-015f-4b9c-b414-b6fb1451c68d-_7ecbcc82-bc96-4d78-9ddd-67706c3fb42c.jpg
products/048fa62a-bbc4-4f1b-9a45-60f0bab3315b-_833072db-0792-4f46-a356-115be3505367.jpg	https://varve.s3.us-east-1.amazonaws.com/products/048fa62a-bbc4-4f1b-9a45-60f0bab3315b-_833072db-0792-4f46-a356-115be3505367.jpg
products/ba7f5e30-cb1a-4c45-8610-2ddd35cfa88f-_c03fdb01-4566-4f7b-853c-2045a54789d5.jpg	https://varve.s3.us-east-1.amazonaws.com/products/ba7f5e30-cb1a-4c45-8610-2ddd35cfa88f-_c03fdb01-4566-4f7b-853c-2045a54789d5.jpg
products/f6e5329c-96fc-4a79-b19c-3a4a13e1f96e-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/f6e5329c-96fc-4a79-b19c-3a4a13e1f96e-pic-1.jpg
products/2045d1ea-cc5c-496c-9713-e9cd7df570b6-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/2045d1ea-cc5c-496c-9713-e9cd7df570b6-pic-2.jpg
products/35591b6e-20a6-4e21-8bd3-52f4e510e3bc-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/35591b6e-20a6-4e21-8bd3-52f4e510e3bc-pic-3.jpg
products/a5ddd0e9-2827-4bce-b841-f29d4b7d9255-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/a5ddd0e9-2827-4bce-b841-f29d4b7d9255-pic-4.jpg
products/0ce49a5d-e8b4-435b-920b-e9d2f0b7138e-_1a6fafad-2847-4a65-9a19-4f09ce596c89.jpg	https://varve.s3.us-east-1.amazonaws.com/products/0ce49a5d-e8b4-435b-920b-e9d2f0b7138e-_1a6fafad-2847-4a65-9a19-4f09ce596c89.jpg
products/f6b973e8-4bae-47a0-a93f-c5c401274cb3-_a8f5cc00-7bdf-4d4f-b55a-f4f65e293091.jpg	https://varve.s3.us-east-1.amazonaws.com/products/f6b973e8-4bae-47a0-a93f-c5c401274cb3-_a8f5cc00-7bdf-4d4f-b55a-f4f65e293091.jpg
products/24c23359-571a-43f0-b56a-5d81f123ebe2-_c2b02563-3885-4229-8b8f-d03e049409b3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/24c23359-571a-43f0-b56a-5d81f123ebe2-_c2b02563-3885-4229-8b8f-d03e049409b3.jpg
products/2e12f589-8885-43c8-9964-e42d4e62e650-_e16725dc-48b4-42b3-b9dc-fb3d71a4ed52.jpg	https://varve.s3.us-east-1.amazonaws.com/products/2e12f589-8885-43c8-9964-e42d4e62e650-_e16725dc-48b4-42b3-b9dc-fb3d71a4ed52.jpg
products/e8015795-e22f-4c92-a16a-2d969ed04b45-_4b1535fa-24a2-4200-8cf3-1ce0ddf1b114.jpg	https://varve.s3.us-east-1.amazonaws.com/products/e8015795-e22f-4c92-a16a-2d969ed04b45-_4b1535fa-24a2-4200-8cf3-1ce0ddf1b114.jpg
products/9b77fe3e-b923-4da6-bc7a-2497d62370c6-_71accbcf-f4de-452d-ad27-2ba3b1800ca6.jpg	https://varve.s3.us-east-1.amazonaws.com/products/9b77fe3e-b923-4da6-bc7a-2497d62370c6-_71accbcf-f4de-452d-ad27-2ba3b1800ca6.jpg
products/bb0cb68f-f08a-42b9-88e6-7f27ddfddf2a-_b57bcfe9-49b6-4c24-ab8a-d1219ca5c2a0.jpg	https://varve.s3.us-east-1.amazonaws.com/products/bb0cb68f-f08a-42b9-88e6-7f27ddfddf2a-_b57bcfe9-49b6-4c24-ab8a-d1219ca5c2a0.jpg
products/4dec7372-7de1-4c88-9e15-955cf3b97974-_c87c9a2c-2f57-447a-8209-01a1eca65157.jpg	https://varve.s3.us-east-1.amazonaws.com/products/4dec7372-7de1-4c88-9e15-955cf3b97974-_c87c9a2c-2f57-447a-8209-01a1eca65157.jpg
products/e1042ce5-86a1-478f-b5af-669561a60042-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/e1042ce5-86a1-478f-b5af-669561a60042-pic-1.jpg
products/21e630f0-9982-4a3e-9e31-21fef945da5f-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/21e630f0-9982-4a3e-9e31-21fef945da5f-pic-2.jpg
products/3c49d08e-ac40-4d04-a927-903fdbce6cc3-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/3c49d08e-ac40-4d04-a927-903fdbce6cc3-pic-3.jpg
products/5cef8379-c886-4d1f-9629-64d571e9b0a1-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/5cef8379-c886-4d1f-9629-64d571e9b0a1-pic-4.jpg
products/3dcce0d5-6d59-4644-a92b-62719d99a6e5-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/3dcce0d5-6d59-4644-a92b-62719d99a6e5-pic-1.jpg
products/9b88bd4a-b9df-496a-b694-f09ba08cb800-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/9b88bd4a-b9df-496a-b694-f09ba08cb800-pic-2.jpg
products/d769a50d-9373-4780-b5f4-22d5695334da-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/d769a50d-9373-4780-b5f4-22d5695334da-pic-3.jpg
products/ebab26b9-7b8a-4f43-a960-c7c6917c47f0-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/ebab26b9-7b8a-4f43-a960-c7c6917c47f0-pic-4.jpg
products/cebd2fa6-b069-464d-9bf9-29f2c13341bd-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/cebd2fa6-b069-464d-9bf9-29f2c13341bd-pic-1.jpg
products/37aff175-7238-4aef-9e89-7f7ba40c9cb5-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/37aff175-7238-4aef-9e89-7f7ba40c9cb5-pic-2.jpg
products/c9f8319e-2827-4173-84b5-09ab3ab8f7a7-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/c9f8319e-2827-4173-84b5-09ab3ab8f7a7-pic-3.jpg
products/be2f830b-4aaf-4f34-830c-77173e61bb22-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/be2f830b-4aaf-4f34-830c-77173e61bb22-pic-4.jpg
products/3ee6b354-39b1-4597-8b6b-bdf7b0f3fe15-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/3ee6b354-39b1-4597-8b6b-bdf7b0f3fe15-pic-1.jpg
products/9505697d-2774-4e74-9c68-3beb651f118b-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/9505697d-2774-4e74-9c68-3beb651f118b-pic-2.jpg
products/20233952-81e9-4eb0-a6ca-94366407cb72-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/20233952-81e9-4eb0-a6ca-94366407cb72-pic-3.jpg
products/84014e93-2f58-406a-b463-afbc4c7c01ed-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/84014e93-2f58-406a-b463-afbc4c7c01ed-pic-1.jpg
products/3b08aa29-a415-4d14-bbd0-e749febc7555-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/3b08aa29-a415-4d14-bbd0-e749febc7555-pic-2.jpg
products/4c735e74-9128-4365-a830-f3578c378580-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/4c735e74-9128-4365-a830-f3578c378580-pic-3.jpg
products/121ff285-f4d3-47ca-b623-3000dc1e7132-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/121ff285-f4d3-47ca-b623-3000dc1e7132-pic-1.jpg
products/43064169-1d49-481d-b9fc-d6dd020113a5-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/43064169-1d49-481d-b9fc-d6dd020113a5-pic-2.jpg
products/b1c933c3-6737-4e93-8f35-cf8797e43b3d-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/b1c933c3-6737-4e93-8f35-cf8797e43b3d-pic-3.jpg
products/1c2ce3f2-30a5-4036-a8e7-2c49eaafea19-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/1c2ce3f2-30a5-4036-a8e7-2c49eaafea19-pic-4.jpg
products/53e5b799-c91a-4b0f-b184-4074caca842e-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/53e5b799-c91a-4b0f-b184-4074caca842e-pic-1.jpg
products/20bf8e1a-a656-4b6f-845c-6d896bfaedd5-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/20bf8e1a-a656-4b6f-845c-6d896bfaedd5-pic-2.jpg
products/c5abadf7-8bd0-45b7-9d70-cab8703c1162-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/c5abadf7-8bd0-45b7-9d70-cab8703c1162-pic-3.jpg
products/a229f6cb-d402-47d2-a3c2-a62fa676109f-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/a229f6cb-d402-47d2-a3c2-a62fa676109f-pic-4.jpg
products/89b713e9-b8d9-480a-b652-79c18edfab97-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/89b713e9-b8d9-480a-b652-79c18edfab97-pic-1.jpg
products/734ff023-c322-4cdb-861d-ddd25f7d16cc-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/734ff023-c322-4cdb-861d-ddd25f7d16cc-pic-2.jpg
products/a13e3ca8-8385-4c2d-a151-68dd01a4d7bc-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/a13e3ca8-8385-4c2d-a151-68dd01a4d7bc-pic-3.jpg
products/567ce5e1-1d67-4f8c-b75c-1330b3957ca6-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/567ce5e1-1d67-4f8c-b75c-1330b3957ca6-pic-4.jpg
\.


--
-- Data for Name: Image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Image" ("fileId", "productId") FROM stdin;
products/18175c7c-65a1-4c8e-a76e-14152a9764e2-_0b293f0e-9a45-4273-8d8e-5860c17fe1ad.jpg	109
products/656c17ae-015f-4b9c-b414-b6fb1451c68d-_7ecbcc82-bc96-4d78-9ddd-67706c3fb42c.jpg	109
products/048fa62a-bbc4-4f1b-9a45-60f0bab3315b-_833072db-0792-4f46-a356-115be3505367.jpg	109
products/ba7f5e30-cb1a-4c45-8610-2ddd35cfa88f-_c03fdb01-4566-4f7b-853c-2045a54789d5.jpg	109
products/f6e5329c-96fc-4a79-b19c-3a4a13e1f96e-pic-1.jpg	110
products/2045d1ea-cc5c-496c-9713-e9cd7df570b6-pic-2.jpg	110
products/35591b6e-20a6-4e21-8bd3-52f4e510e3bc-pic-3.jpg	110
products/a5ddd0e9-2827-4bce-b841-f29d4b7d9255-pic-4.jpg	110
products/0ce49a5d-e8b4-435b-920b-e9d2f0b7138e-_1a6fafad-2847-4a65-9a19-4f09ce596c89.jpg	111
products/f6b973e8-4bae-47a0-a93f-c5c401274cb3-_a8f5cc00-7bdf-4d4f-b55a-f4f65e293091.jpg	111
products/24c23359-571a-43f0-b56a-5d81f123ebe2-_c2b02563-3885-4229-8b8f-d03e049409b3.jpg	111
products/2e12f589-8885-43c8-9964-e42d4e62e650-_e16725dc-48b4-42b3-b9dc-fb3d71a4ed52.jpg	111
products/e8015795-e22f-4c92-a16a-2d969ed04b45-_4b1535fa-24a2-4200-8cf3-1ce0ddf1b114.jpg	112
products/9b77fe3e-b923-4da6-bc7a-2497d62370c6-_71accbcf-f4de-452d-ad27-2ba3b1800ca6.jpg	112
products/bb0cb68f-f08a-42b9-88e6-7f27ddfddf2a-_b57bcfe9-49b6-4c24-ab8a-d1219ca5c2a0.jpg	112
products/4dec7372-7de1-4c88-9e15-955cf3b97974-_c87c9a2c-2f57-447a-8209-01a1eca65157.jpg	112
products/e1042ce5-86a1-478f-b5af-669561a60042-pic-1.jpg	113
products/21e630f0-9982-4a3e-9e31-21fef945da5f-pic-2.jpg	113
products/3c49d08e-ac40-4d04-a927-903fdbce6cc3-pic-3.jpg	113
products/5cef8379-c886-4d1f-9629-64d571e9b0a1-pic-4.jpg	113
products/3dcce0d5-6d59-4644-a92b-62719d99a6e5-pic-1.jpg	114
products/9b88bd4a-b9df-496a-b694-f09ba08cb800-pic-2.jpg	114
products/d769a50d-9373-4780-b5f4-22d5695334da-pic-3.jpg	114
products/ebab26b9-7b8a-4f43-a960-c7c6917c47f0-pic-4.jpg	114
products/cebd2fa6-b069-464d-9bf9-29f2c13341bd-pic-1.jpg	115
products/37aff175-7238-4aef-9e89-7f7ba40c9cb5-pic-2.jpg	115
products/c9f8319e-2827-4173-84b5-09ab3ab8f7a7-pic-3.jpg	115
products/be2f830b-4aaf-4f34-830c-77173e61bb22-pic-4.jpg	115
products/3ee6b354-39b1-4597-8b6b-bdf7b0f3fe15-pic-1.jpg	116
products/9505697d-2774-4e74-9c68-3beb651f118b-pic-2.jpg	116
products/20233952-81e9-4eb0-a6ca-94366407cb72-pic-3.jpg	116
products/84014e93-2f58-406a-b463-afbc4c7c01ed-pic-1.jpg	117
products/3b08aa29-a415-4d14-bbd0-e749febc7555-pic-2.jpg	117
products/4c735e74-9128-4365-a830-f3578c378580-pic-3.jpg	117
products/121ff285-f4d3-47ca-b623-3000dc1e7132-pic-1.jpg	118
products/43064169-1d49-481d-b9fc-d6dd020113a5-pic-2.jpg	118
products/b1c933c3-6737-4e93-8f35-cf8797e43b3d-pic-3.jpg	118
products/1c2ce3f2-30a5-4036-a8e7-2c49eaafea19-pic-4.jpg	118
products/53e5b799-c91a-4b0f-b184-4074caca842e-pic-1.jpg	119
products/20bf8e1a-a656-4b6f-845c-6d896bfaedd5-pic-2.jpg	119
products/c5abadf7-8bd0-45b7-9d70-cab8703c1162-pic-3.jpg	119
products/a229f6cb-d402-47d2-a3c2-a62fa676109f-pic-4.jpg	119
products/89b713e9-b8d9-480a-b652-79c18edfab97-pic-1.jpg	120
products/734ff023-c322-4cdb-861d-ddd25f7d16cc-pic-2.jpg	120
products/a13e3ca8-8385-4c2d-a151-68dd01a4d7bc-pic-3.jpg	120
products/567ce5e1-1d67-4f8c-b75c-1330b3957ca6-pic-4.jpg	120
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, customer, email, phone, line1, line2, state, city, "postalCode", country, total, "shippingCost", "createdAt", "deliveredAt", tax) FROM stdin;
3PIRNsLSaS4OxJUp1Xfmmq9d	Tim Foo	tim@foo.com	+12015554444	27 Fredrick Ave	\N	OR	Brother	97712	US	102	0	2024-05-20 08:15:46.896	\N	0
3PIRTQLSaS4OxJUp1crbKjfj	Tim Foo	alphazero25811@gmail.com	+12015554444	27 Fredrick Ave	\N	OR	Brother	97712	US	204	15	2024-05-20 08:21:30.822	\N	0
\.


--
-- Data for Name: OrdersOnProducts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrdersOnProducts" ("productId", "orderId", qty) FROM stdin;
115	3PIRNsLSaS4OxJUp1Xfmmq9d	1
113	3PIRNsLSaS4OxJUp1Xfmmq9d	1
116	3PIRNsLSaS4OxJUp1Xfmmq9d	1
109	3PIRTQLSaS4OxJUp1crbKjfj	3
115	3PIRTQLSaS4OxJUp1crbKjfj	2
\.



--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, "firstName", "lastName", email, password, "createdAt", "updatedAt", roles) FROM stdin;
1	Tim	Foo	tim@foo.com	$argon2id$v=19$m=65536,t=3,p=4$rEvJVfFpaokgOcsiPC2lVw$PnHEoikY3A+MCYXh+N03EqKD/BHWxEWmVv22y+0Nrx0	2024-05-13 01:49:51.015	2024-05-13 01:50:17.404	{User,Admin}
\.


--
-- Data for Name: _CategoryToProduct; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_CategoryToProduct" ("A", "B") FROM stdin;
102	109
104	109
109	109
102	110
104	110
107	110
102	111
104	111
108	111
102	112
104	112
109	112
133	112
102	113
104	113
108	113
102	114
104	114
108	114
102	115
104	115
108	115
102	116
114	116
116	116
103	117
119	117
120	117
103	118
127	118
130	118
102	119
114	119
115	119
102	120
105	120
110	120
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
5135ccc2-75c9-4d1e-9f1f-9c103dba5eeb	849bb26afd43f6cec77810bff771ecff44ec13e86394cd56e08991c823800a52	2024-05-12 04:48:05.050539+00	20240512044804_update_schema_v2	\N	\N	2024-05-12 04:48:04.943868+00	1
44789378-3e74-4e1c-999c-d51951166102	d1d373452e9f33140c15844ca2a1b717c0bc3202cc0034dc599db1a381e86dfc	2024-05-16 05:12:04.160009+00	20240516051204_update_order_schema	\N	\N	2024-05-16 05:12:04.140944+00	1
7ac6e41c-1858-443c-b7e9-021cd1bb1e81	5e33edae838ef18e7c79f9996091370e8e0f6d97f97efc188c5cc76852f146d1	\N	20240517041128_import_data	A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20240517041128_import_data\n\nDatabase error code: 42601\n\nDatabase error:\nERROR: syntax error at or near "failed"\n\nPosition:\n[1m  0[0m\n[1m  1[1;31m failed to get console mode for stdout: The handle is invalid.[0m\n\nDbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E42601), message: "syntax error at or near \\"failed\\"", detail: None, hint: None, position: Some(Original(1)), where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("scan.l"), line: Some(1241), routine: Some("scanner_yyerror") }\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name="20240517041128_import_data"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name="20240517041128_import_data"\n             at schema-engine\\core\\src\\commands\\apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:201	\N	2024-05-17 04:35:05.369341+00	0
\.


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 137, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 120, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 1, true);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: File File_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."File"
    ADD CONSTRAINT "File_pkey" PRIMARY KEY (id);


--
-- Name: Image Image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "Image_pkey" PRIMARY KEY ("fileId");


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: OrdersOnProducts OrdersOnProducts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrdersOnProducts"
    ADD CONSTRAINT "OrdersOnProducts_pkey" PRIMARY KEY ("productId", "orderId");


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Category_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_slug_key" ON public."Category" USING btree (slug);


--
-- Name: Product_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_name_key" ON public."Product" USING btree (name);


--
-- Name: Product_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_slug_key" ON public."Product" USING btree (slug);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _CategoryToProduct_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON public."_CategoryToProduct" USING btree ("A", "B");


--
-- Name: _CategoryToProduct_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_CategoryToProduct_B_index" ON public."_CategoryToProduct" USING btree ("B");


--
-- Name: Category Category_parentCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Image Image_fileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "Image_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES public."File"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Image Image_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Image"
    ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrdersOnProducts OrdersOnProducts_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrdersOnProducts"
    ADD CONSTRAINT "OrdersOnProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: OrdersOnProducts OrdersOnProducts_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."OrdersOnProducts"
    ADD CONSTRAINT "OrdersOnProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _CategoryToProduct _CategoryToProduct_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CategoryToProduct"
    ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CategoryToProduct _CategoryToProduct_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_CategoryToProduct"
    ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--
