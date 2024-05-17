failed to get console mode for stdout: The handle is invalid.
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
    "cardLast4" text NOT NULL,
    "cardType" text NOT NULL,
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
69	men-footwear	Footwear	1
70	men-socks	Socks	69
71	men-accessories	Accessories	1
72	men-watches	Watches	71
77	men-clothing	Clothing	1
78	women-clothing	Clothing	2
79	tights	Tights	78
80	blouses	Blouses	78
81	dresses	Dresses	78
82	skirts	Skirts	78
83	women-hats	Hats	66
84	women-sunglasses	Sunglasses	66
85	women-belts	Belts	66
86	necklaces	Necklaces	66
88	women-watches	Watches	66
89	women-socks	Socks	65
87	rings	Rings	66
90	handbags	Handbags	66
91	women-boots	Boots	65
92	wallets	Wallets	71
93	men-sunglasses	Sunglasses	71
94	special-events	Special Events	\N
95	wedding	Wedding	94
96	women-shirts	Shirts	78
97	men-suits	Suits	77
98	women-costumes	Costumes	2
99	women-jackets	Jackets	78
100	men-t-shirts	T-shirts	77
1	men	Men	\N
2	women	Women	\N
65	women-footwear	Footwear	2
66	women-accessories	Accessories	2
67	mary-janes	Mary Janes	65
68	heels	Heels	65
\.


--
-- Data for Name: File; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."File" (id, url) FROM stdin;
products/3f6ac842-cb9f-439f-aadd-1da8cea7a51b-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/3f6ac842-cb9f-439f-aadd-1da8cea7a51b-pic-1.jpg
products/cd37cbf8-7569-4e93-83ba-12c24da427f9-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/cd37cbf8-7569-4e93-83ba-12c24da427f9-pic-4.jpg
products/ede7330e-1153-4d54-9fac-8709a3be3cae-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/ede7330e-1153-4d54-9fac-8709a3be3cae-pic-3.jpg
products/a65e424d-404d-46f0-bd7c-a19b614b8aec-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/a65e424d-404d-46f0-bd7c-a19b614b8aec-pic-2.jpg
products/115958ea-38bf-4f0a-b729-b49e4170c319-pic-1.jpeg	https://varve.s3.us-east-1.amazonaws.com/products/115958ea-38bf-4f0a-b729-b49e4170c319-pic-1.jpeg
products/2f12c24f-5593-4a97-91e3-095d5b8699b8-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/2f12c24f-5593-4a97-91e3-095d5b8699b8-pic-2.jpg
products/bb5b045d-2a5c-4dfe-a901-f834618fc295-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/bb5b045d-2a5c-4dfe-a901-f834618fc295-pic-1.jpg
products/5a0ed2c6-6cc1-4893-b35e-39703f6fe681-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/5a0ed2c6-6cc1-4893-b35e-39703f6fe681-pic-2.jpg
products/ef6a650c-f736-464f-92ca-83f8f7c3dc6f-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/ef6a650c-f736-464f-92ca-83f8f7c3dc6f-pic-3.jpg
products/cf5aeb67-965c-415d-8aa2-9ddecde0dde1-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/cf5aeb67-965c-415d-8aa2-9ddecde0dde1-pic-4.jpg
products/3a01309c-b856-4a4d-8594-c942b1bcf3ce-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/3a01309c-b856-4a4d-8594-c942b1bcf3ce-pic-1.jpg
products/1596be74-57f6-4699-b573-d98125d5e0f3-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/1596be74-57f6-4699-b573-d98125d5e0f3-pic-2.jpg
products/ea712b5f-fefe-42d8-be04-f12da3f12698-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/ea712b5f-fefe-42d8-be04-f12da3f12698-pic-3.jpg
products/e1b3e3ad-c6bb-44d0-afe5-04604b66e4ac-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/e1b3e3ad-c6bb-44d0-afe5-04604b66e4ac-pic-4.jpg
products/717657bd-9d49-4e31-8dd8-b1e7587061a0-pic-1.jpeg	https://varve.s3.us-east-1.amazonaws.com/products/717657bd-9d49-4e31-8dd8-b1e7587061a0-pic-1.jpeg
products/52ffc9fa-fe0c-4b47-a2fa-9c4c7940bb3a-pic-2.jpeg	https://varve.s3.us-east-1.amazonaws.com/products/52ffc9fa-fe0c-4b47-a2fa-9c4c7940bb3a-pic-2.jpeg
products/106950ea-c3b6-4f85-9562-c94cb95c439f-pic-3.jpeg	https://varve.s3.us-east-1.amazonaws.com/products/106950ea-c3b6-4f85-9562-c94cb95c439f-pic-3.jpeg
products/de5049b7-7929-401d-9e45-3553fcc6a625-pic-4.jpeg	https://varve.s3.us-east-1.amazonaws.com/products/de5049b7-7929-401d-9e45-3553fcc6a625-pic-4.jpeg
products/333e47b3-4f62-4cac-add6-05a9e3cbc7a2-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/333e47b3-4f62-4cac-add6-05a9e3cbc7a2-pic-1.jpg
products/563feae5-785a-4b04-be19-faf1dfd2a115-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/563feae5-785a-4b04-be19-faf1dfd2a115-pic-4.jpg
products/a0575045-4efd-4e97-a781-cc3ad008a429-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/a0575045-4efd-4e97-a781-cc3ad008a429-pic-1.jpg
products/6ad0ee7f-573a-409c-8ef9-07bc479736bf-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/6ad0ee7f-573a-409c-8ef9-07bc479736bf-pic-2.jpg
products/c80529be-238e-444a-8248-ba6f7d2b8220-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/c80529be-238e-444a-8248-ba6f7d2b8220-pic-3.jpg
products/0ac4f3e8-579f-40cb-b96b-552e8bf93a2e-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/0ac4f3e8-579f-40cb-b96b-552e8bf93a2e-pic-4.jpg
products/2e285100-cb86-433d-9f09-6c604d9e347c-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/2e285100-cb86-433d-9f09-6c604d9e347c-pic-1.jpg
products/7d1a5aa4-1dc7-4ee3-ba3d-816b3fd7e1ae-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/7d1a5aa4-1dc7-4ee3-ba3d-816b3fd7e1ae-pic-2.jpg
products/4f4a75d8-134a-4e0d-9d83-45475ed42572-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/4f4a75d8-134a-4e0d-9d83-45475ed42572-pic-3.jpg
products/27094664-5d00-4025-9eee-2a3edfaf3e71-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/27094664-5d00-4025-9eee-2a3edfaf3e71-pic-4.jpg
products/fcf5c60a-7044-455a-9372-f74e37ef0ae7-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/fcf5c60a-7044-455a-9372-f74e37ef0ae7-pic-1.jpg
products/fa9f4e00-165c-4770-b1f3-8251812fef4d-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/fa9f4e00-165c-4770-b1f3-8251812fef4d-pic-2.jpg
products/e85cfb7c-158d-4914-8fcf-2648cb4b578c-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/e85cfb7c-158d-4914-8fcf-2648cb4b578c-pic-1.jpg
products/fc694d6f-564f-4571-9af1-fba9ce1c7937-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/fc694d6f-564f-4571-9af1-fba9ce1c7937-pic-2.jpg
products/df1c840e-515d-4d09-b612-6d00d91453b1-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/df1c840e-515d-4d09-b612-6d00d91453b1-pic-3.jpg
products/08d6b030-e2b6-4145-8306-f91fee7a4199-pic-4.jpg	https://varve.s3.us-east-1.amazonaws.com/products/08d6b030-e2b6-4145-8306-f91fee7a4199-pic-4.jpg
products/24ff9730-bb24-48d4-ac34-3bcb31b67ece-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/24ff9730-bb24-48d4-ac34-3bcb31b67ece-pic-1.jpg
products/711096a1-bfa0-4d00-8685-95a6bf7d2c0d-pic-3.jpg	https://varve.s3.us-east-1.amazonaws.com/products/711096a1-bfa0-4d00-8685-95a6bf7d2c0d-pic-3.jpg
products/c31bd188-ad78-452e-ab24-3fd8b9d3bbc2-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/c31bd188-ad78-452e-ab24-3fd8b9d3bbc2-pic-1.jpg
products/d0656303-6b6e-4220-ad51-2d8d31955bf1-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/d0656303-6b6e-4220-ad51-2d8d31955bf1-pic-1.jpg
products/b03024fa-6e2c-4cca-8509-bdc6927af4e7-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/b03024fa-6e2c-4cca-8509-bdc6927af4e7-pic-2.jpg
products/ae8b5c39-16a9-4b41-9e62-d4ad08cbc5a8-pic-1.jpg	https://varve.s3.us-east-1.amazonaws.com/products/ae8b5c39-16a9-4b41-9e62-d4ad08cbc5a8-pic-1.jpg
products/2c9ee860-838f-4d0a-85e1-6e4a1e0fcfb7-pic-2.jpg	https://varve.s3.us-east-1.amazonaws.com/products/2c9ee860-838f-4d0a-85e1-6e4a1e0fcfb7-pic-2.jpg
products/7f143823-9a91-4d69-82ff-5d9569cd088d-pic-1.jpeg	https://varve.s3.us-east-1.amazonaws.com/products/7f143823-9a91-4d69-82ff-5d9569cd088d-pic-1.jpeg
products/b8cfcbc0-6940-442c-b95e-6abc7b0eccc5-pic-2.jpeg	https://varve.s3.us-east-1.amazonaws.com/products/b8cfcbc0-6940-442c-b95e-6abc7b0eccc5-pic-2.jpeg
products/c4587ef4-36ae-4d59-9704-fa417cfebb18-pic-3.jpeg	https://varve.s3.us-east-1.amazonaws.com/products/c4587ef4-36ae-4d59-9704-fa417cfebb18-pic-3.jpeg
products/05986f01-ae33-4ba9-8883-2fa7f8f86d25-pic-4.jpeg	https://varve.s3.us-east-1.amazonaws.com/products/05986f01-ae33-4ba9-8883-2fa7f8f86d25-pic-4.jpeg
\.


--
-- Data for Name: Image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Image" ("fileId", "productId") FROM stdin;
products/3f6ac842-cb9f-439f-aadd-1da8cea7a51b-pic-1.jpg	92
products/cd37cbf8-7569-4e93-83ba-12c24da427f9-pic-4.jpg	92
products/ede7330e-1153-4d54-9fac-8709a3be3cae-pic-3.jpg	92
products/a65e424d-404d-46f0-bd7c-a19b614b8aec-pic-2.jpg	92
products/115958ea-38bf-4f0a-b729-b49e4170c319-pic-1.jpeg	93
products/2f12c24f-5593-4a97-91e3-095d5b8699b8-pic-2.jpg	93
products/bb5b045d-2a5c-4dfe-a901-f834618fc295-pic-1.jpg	94
products/5a0ed2c6-6cc1-4893-b35e-39703f6fe681-pic-2.jpg	94
products/ef6a650c-f736-464f-92ca-83f8f7c3dc6f-pic-3.jpg	94
products/cf5aeb67-965c-415d-8aa2-9ddecde0dde1-pic-4.jpg	94
products/3a01309c-b856-4a4d-8594-c942b1bcf3ce-pic-1.jpg	95
products/1596be74-57f6-4699-b573-d98125d5e0f3-pic-2.jpg	95
products/ea712b5f-fefe-42d8-be04-f12da3f12698-pic-3.jpg	95
products/e1b3e3ad-c6bb-44d0-afe5-04604b66e4ac-pic-4.jpg	95
products/717657bd-9d49-4e31-8dd8-b1e7587061a0-pic-1.jpeg	96
products/52ffc9fa-fe0c-4b47-a2fa-9c4c7940bb3a-pic-2.jpeg	96
products/106950ea-c3b6-4f85-9562-c94cb95c439f-pic-3.jpeg	96
products/de5049b7-7929-401d-9e45-3553fcc6a625-pic-4.jpeg	96
products/333e47b3-4f62-4cac-add6-05a9e3cbc7a2-pic-1.jpg	97
products/563feae5-785a-4b04-be19-faf1dfd2a115-pic-4.jpg	97
products/a0575045-4efd-4e97-a781-cc3ad008a429-pic-1.jpg	98
products/6ad0ee7f-573a-409c-8ef9-07bc479736bf-pic-2.jpg	98
products/c80529be-238e-444a-8248-ba6f7d2b8220-pic-3.jpg	98
products/0ac4f3e8-579f-40cb-b96b-552e8bf93a2e-pic-4.jpg	98
products/2e285100-cb86-433d-9f09-6c604d9e347c-pic-1.jpg	99
products/7d1a5aa4-1dc7-4ee3-ba3d-816b3fd7e1ae-pic-2.jpg	99
products/4f4a75d8-134a-4e0d-9d83-45475ed42572-pic-3.jpg	99
products/27094664-5d00-4025-9eee-2a3edfaf3e71-pic-4.jpg	99
products/fcf5c60a-7044-455a-9372-f74e37ef0ae7-pic-1.jpg	100
products/fa9f4e00-165c-4770-b1f3-8251812fef4d-pic-2.jpg	100
products/e85cfb7c-158d-4914-8fcf-2648cb4b578c-pic-1.jpg	101
products/fc694d6f-564f-4571-9af1-fba9ce1c7937-pic-2.jpg	101
products/df1c840e-515d-4d09-b612-6d00d91453b1-pic-3.jpg	101
products/08d6b030-e2b6-4145-8306-f91fee7a4199-pic-4.jpg	101
products/24ff9730-bb24-48d4-ac34-3bcb31b67ece-pic-1.jpg	102
products/711096a1-bfa0-4d00-8685-95a6bf7d2c0d-pic-3.jpg	102
products/c31bd188-ad78-452e-ab24-3fd8b9d3bbc2-pic-1.jpg	103
products/d0656303-6b6e-4220-ad51-2d8d31955bf1-pic-1.jpg	104
products/b03024fa-6e2c-4cca-8509-bdc6927af4e7-pic-2.jpg	104
products/ae8b5c39-16a9-4b41-9e62-d4ad08cbc5a8-pic-1.jpg	105
products/2c9ee860-838f-4d0a-85e1-6e4a1e0fcfb7-pic-2.jpg	105
products/7f143823-9a91-4d69-82ff-5d9569cd088d-pic-1.jpeg	106
products/b8cfcbc0-6940-442c-b95e-6abc7b0eccc5-pic-2.jpeg	106
products/c4587ef4-36ae-4d59-9704-fa417cfebb18-pic-3.jpeg	106
products/05986f01-ae33-4ba9-8883-2fa7f8f86d25-pic-4.jpeg	106
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, customer, email, phone, line1, line2, state, city, "postalCode", country, total, "shippingCost", "createdAt", "deliveredAt", "cardLast4", "cardType", tax) FROM stdin;
\.


--
-- Data for Name: OrdersOnProducts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrdersOnProducts" ("productId", "orderId", qty) FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, slug, "desc", price, "inStock", "createdAt", "updatedAt", status) FROM stdin;
96	Ethereal Elegance: Off-the-Shoulder Lace Mermaid Wedding Dress	ethereal-elegance-off-the-shoulder-lace-mermaid-wedding-dress	Make a statement with this breathtaking off-the-shoulder lace mermaid wedding dress. The delicate lace overlay adds a touch of whimsy to the sleek, fitted silhouette, creating a romantic and ethereal look that's perfect for the modern bride.\n\nThe fitted bodice features a sweetheart neckline and delicate lace trim, while the flowing mermaid skirt falls in soft, flowing folds to the floor. The dramatic off-the-shoulder design adds a touch of glamour, making this dress truly unforgettable.\n\nThis stunning wedding dress is made from high-quality satin and lace, ensuring a comfortable and durable fit. The dress is available in sizes 2-12, and can be customized to fit your unique style.	1295.99	2	2024-05-16 08:13:54.781	2024-05-17 03:27:41.638	Archived
93	Sultry Siren: Black Stiletto Heels	sultry-siren-black-stiletto-heels	Make a statement with our Stiletto High Heels! These elegant shoes feature a sleek, slender design with a high heel that adds a touch of sophistication and glamour to any outfit. The slender stiletto heel provides a dramatic height, while the pointed toe and comfortable upper ensure a secure fit. The shoes are made from high-quality materials, ensuring durability and comfort. Perfect for special occasions, job interviews, or a night out on the town.\n\nFeatures:\n- Heel height: 4 inches (10.2 cm)\n- Upper material: Soft, supple leather\n- Sole material: Durable rubber\n- Pointed toe design\n- Cushioned insole for comfort	85.99	0	2024-05-16 07:35:01.715	2024-05-17 03:31:17.628	Draft
92	Classic Comfort: Platform Mary Janes	classic-comfort-platform-mary-janes	Elevate your style with our Platform Mary Janes! These trendy shoes feature a sleek, low-profile design with a sturdy platform sole that adds a boost of height and confidence. Made from high-quality materials, they are comfortable, durable, and easy to slip on and off. The classic Mary Jane silhouette is perfect for work, school, or a casual evening out. The adjustable strap ensures a secure fit, while the cushioned insole and soft upper provide all-day comfort.\n\nFeatures:\n- Platform height: 2.5 inches (6.4 cm)\n- Upper material: Soft, breathable leather\n- Sole material: Durable rubber\n- Adjustable strap with buckle closure\n- Cushioned insole for comfort\n- Classic Mary Jane silhouette	69.99	3	2024-05-16 07:34:20.644	2024-05-16 07:34:20.644	Active
94	Classic White Men's Socks	classic-white-mens-socks	Keep your feet fresh and comfortable with our Men's White Socks! Made from high-quality materials, these socks are designed to provide a snug and comfortable fit. The soft, breathable fabric ensures that your feet stay cool and dry, while the reinforced heel and toe provide added durability. Perfect for everyday wear, athletic activities, or as a stylish accessory for your favorite outfit.\n\nFeatures:\n- Material: Soft, breathable cotton\n- Fabric thickness: Medium\n- Reinforced heel and toe for added durability\n- Arch support for comfortable wear\n- Seamless construction for reduced irritation	12.99	8	2024-05-16 07:35:51.509	2024-05-16 07:35:51.509	Active
98	Timeless Elegance: Classic White Women's Shirt	timeless-elegance-classic-white-womens-shirt	Elevate your everyday style with this crisp, classic white women's shirt. Crafted from high-quality cotton, this shirt boasts a timeless design that exudes sophistication and refinement. The adjustable cuffs add a touch of versatility, allowing you to customize the fit to your preference. Perfect for pairing with jeans, trousers, or a skirt, this shirt is a wardrobe staple for any occasion. Add a statement necklace or a blazer to take your look to the next level.	39.99	2	2024-05-17 03:36:19.97	2024-05-17 03:36:19.97	Active
97	Dreamy Oasis: Turquoise Mint Silk Blouse	dreamy-oasis-turquoise-mint-silk-blouse	Escape to a tranquil oasis with this stunning turquoise mint silk blouse, adorned with delicate embroidery and a flowy silhouette. The soft, lustrous silk fabric drapes elegantly across the body, creating a romantic and whimsical look. The subtle sheen of the fabric catches the light, giving the blouse a mesmerizing allure. Perfect for a summer wedding, garden party, or simply a night out with friends. Pair with sandals or heeled ankle boots for a chic and effortless style.	250	1	2024-05-17 03:30:51.892	2024-05-17 03:33:06.304	Active
99	Iconic Rolex Black Submariner	iconic-rolex-black-submariner	Experience the ultimate in style and functionality with the iconic Rolex Submariner watch. This iconic timepiece is a symbol of luxury and sophistication, featuring a sleek design, exceptional craftsmanship, and unparalleled precision. The Submariner's 40mm case is crafted from high-quality stainless steel, resistant to corrosion and scratches, making it perfect for everyday wear. The distinctive dial features a black or blue bezel, legible hour markers, and precise date display. Whether you're diving into the depths or simply keeping time, this watch is a statement piece that exudes confidence and poise.	12000	0	2024-05-17 03:41:04.658	2024-05-17 03:41:04.658	Draft
95	Pure Perfection: Opaque White Tights	pure-perfection-opaque-white-tights	Elevate your style with our Opaque White Tights! Made from high-quality, opaque fabric, these tights provide a smooth, seamless appearance that's perfect for everyday wear. The opaque material ensures that your legs remain completely covered, making them ideal for work, school, or special occasions. Our tights are designed to provide a comfortable fit, with a soft, breathable fabric that won't chafe or irritate your skin.\n\nFeatures:\n- Material: High-quality, opaque nylon\n- Fabric thickness: Medium-thick\n- Seamless construction for reduced irritation\n- Comfortable fit with a soft, breathable fabric	15.99	0	2024-05-16 07:36:54.45	2024-05-17 03:43:50.325	Draft
100	Elegant Edge: Women's Black Leather Jacket	elegant-edge-womens-black-leather-jacket	Make a statement with this stylish women's black leather jacket. Crafted from premium leather, this jacket is designed to add a touch of sophistication to any outfit. The sleek design features a classic biker-inspired silhouette, complete with a fitted waist, quilted details, and a hint of femininity. The perfect combination of style and substance, this jacket is suitable for everything from casual daily wear to dressy occasions. Pair with a flowy dress, high-waisted jeans, or a crisp white shirt for a chic look.	139.99	9	2024-05-17 03:45:53.913	2024-05-17 03:45:53.913	Active
101	Casual Chic: Women's Denim Skirts	casual-chic-womens-denim-skirts	Add a touch of effortless cool to your wardrobe with these stylish women's denim skirts. Perfect for casual daily wear, these skirts are made from high-quality denim and feature a classic A-line silhouette. The perfect combination of comfort and style, they can be dressed up or down depending on your mood and occasion. Pair with a graphic tee, sneakers, and a denim jacket for a relaxed look, or add a blouse and heels for a more polished appearance.	29.99	0	2024-05-17 03:47:36.323	2024-05-17 03:47:36.323	Archived
102	Elegant Enchantment: Porcelain Turquoise Mint Dress	elegant-enchantment-porcelain-turquoise-mint-dress	Make a statement with this exquisite porcelain turquoise mint dress, adorned with crystal and gold decorations. The perfect blend of whimsy and sophistication, this dress is designed to make you feel like royalty. The delicate porcelain fabric features a soft, luminous sheen, while the turquoise and mint hues create a breathtaking contrast. The crystal and gold decorations add a touch of luxury, making this dress truly unforgettable. Pair with heels, a statement necklace, and a confident smile for a look that's truly fit for a princess.	1599.99	1	2024-05-17 03:58:40.407	2024-05-17 03:58:40.407	Draft
103	Essential Tee: Men's Blue T-Shirt	essential-tee-mens-blue-t-shirt	A wardrobe staple for any man, this men's blue T-shirt is perfect for everyday wear. Made from high-quality, soft-fitting cotton, this tee is designed to keep you comfortable and stylish. The classic blue color is easy to match with your favorite jeans, shorts, or even dress pants. Pair with a pair of sneakers or boots for a relaxed look, or dress it up with a blazer and trousers for a more polished appearance.	12.99	6	2024-05-17 04:00:33.673	2024-05-17 04:00:33.673	Active
104	Timeless Elegance: Blue Hanfu Dress	timeless-elegance-blue-hanfu-dress	Inspired by the ancient traditions of Chinese fashion, this stunning blue Hanfu dress is a masterpiece of craftsmanship and design. The intricate embroidery and delicate fabric create a beautiful, flowing silhouette that is both elegant and feminine. The blue color is a classic choice, perfect for special occasions or everyday wear. Whether you're attending a traditional Chinese festival or simply want to add a touch of cultural heritage to your wardrobe, this dress is sure to make you feel like royalty.	120	1	2024-05-17 04:04:33.135	2024-05-17 04:04:33.135	Draft
105	Sunkissed Chic: Women's Sunglasses	sunkissed-chic-womens-sunglasses	Add a touch of glamour to your everyday look with these stylish women's sunglasses. Featuring a trendy cat-eye design and colorful frames, these shades are perfect for brightening up your day. The polarized lenses offer UV protection and clarity, while the sturdy frames ensure a comfortable fit. Whether you're lounging by the pool, running errands, or simply enjoying a sunny day, these sunglasses are sure to make you feel like a superstar.	12	3	2024-05-17 04:05:43.359	2024-05-17 04:05:43.359	Active
106	Timeless Black Suits	timeless-black-suits	Elevate your style and confidence with this timeless black men's suit. Crafted from high-quality wool or polyester, this suit is designed for both formal and business-casual occasions. Choose from a two-piece or three-piece option to suit your preferences. The fitted jacket and slim-cut trousers create a sleek, streamlined silhouette that's perfect for job interviews, formal events, or everyday wear. Pair with a crisp white shirt and tie for a polished look.	259.99	2	2024-05-17 04:07:06.289	2024-05-17 04:07:06.289	Active
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
2	92
65	92
67	92
2	93
65	93
68	93
69	94
70	94
1	94
2	95
78	96
81	96
94	96
95	96
2	96
78	97
2	97
80	97
78	98
96	98
2	98
71	99
72	99
1	99
78	95
79	95
78	100
99	100
2	100
78	101
82	101
2	101
78	102
81	102
2	102
77	103
100	103
1	103
78	104
81	104
2	104
84	105
2	105
66	105
77	106
97	106
1	106
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
5135ccc2-75c9-4d1e-9f1f-9c103dba5eeb	849bb26afd43f6cec77810bff771ecff44ec13e86394cd56e08991c823800a52	2024-05-12 04:48:05.050539+00	20240512044804_update_schema_v2	\N	\N	2024-05-12 04:48:04.943868+00	1
44789378-3e74-4e1c-999c-d51951166102	d1d373452e9f33140c15844ca2a1b717c0bc3202cc0034dc599db1a381e86dfc	2024-05-16 05:12:04.160009+00	20240516051204_update_order_schema	\N	\N	2024-05-16 05:12:04.140944+00	1
\.


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 100, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 106, true);


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

