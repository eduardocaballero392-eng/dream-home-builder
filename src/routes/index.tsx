import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import heroImage from "@/assets/hero.jpg";
import propLoft from "@/assets/prop-loft.jpg";
import propAtico from "@/assets/prop-atico.jpg";
import propCasa from "@/assets/prop-casa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier Vega · Inmobiliaria boutique" },
      {
        name: "description",
        content:
          "Curamos propiedades boutique en las mejores ubicaciones: compra, venta y asesoría inmobiliaria con un criterio estético que respeta tu forma de habitar.",
      },
      { property: "og:title", content: "Atelier Vega · Inmobiliaria boutique" },
      {
        property: "og:description",
        content:
          "Viviendas que se viven, no que se miran. Asesoría privada, curaduría real y gestión completa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Property = {
  id: string;
  price: string;
  type: string;
  location: string;
  beds: number;
  area: number;
  image: string;
  tags: string[];
};

const PROPERTIES: Property[] = [
  {
    id: "loft-norte",
    price: "$8.400.000",
    type: "Loft",
    location: "Barrio Norte · Palermo",
    beds: 2,
    area: 92,
    image: propLoft,
    tags: ["con-vista"],
  },
  {
    id: "atico-madero",
    price: "$12.900.000",
    type: "Ático",
    location: "Puerto Madero · CABA",
    beds: 3,
    area: 148,
    image: propAtico,
    tags: ["atico", "con-vista"],
  },
  {
    id: "casa-hollywood",
    price: "$18.200.000",
    type: "Casa",
    location: "Palermo Hollywood",
    beds: 4,
    area: 260,
    image: propCasa,
    tags: ["casa"],
  },
];

const FILTERS = [
  { id: "todas", label: "Todas" },
  { id: "atico", label: "Ático" },
  { id: "casa", label: "Casa" },
  { id: "con-vista", label: "Con vista" },
];

const LOCATIONS = [
  "Palermo Soho, CABA",
  "Puerto Madero, CABA",
  "Palermo Hollywood, CABA",
  "Belgrano, CABA",
];

const TYPES = ["Departamento", "Casa", "Ático", "Loft"];

const PRICES = [
  "Hasta $12.000.000",
  "Hasta $18.000.000",
  "Sin límite",
];

function Index() {
  const [filter, setFilter] = useState("todas");
  const [location, setLocation] = useState(LOCATIONS[0]!);
  const [type, setType] = useState(TYPES[0]!);
  const [price, setPrice] = useState(PRICES[0]!);

  const visible =
    filter === "todas"
      ? PROPERTIES
      : PROPERTIES.filter((p) => p.tags.includes(filter));

  const scrollToProperties = () => {
    document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <Hero
          location={location}
          setLocation={setLocation}
          type={type}
          setType={setType}
          price={price}
          setPrice={setPrice}
          onSearch={scrollToProperties}
          locations={LOCATIONS}
          types={TYPES}
          prices={PRICES}
        />
        <Featured filter={filter} setFilter={setFilter} properties={visible} />
        <Services />
        <Testimonial />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">
            Atelier&nbsp;Vega
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-brass sm:inline">
            Inmobiliaria
          </span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
          <a href="#propiedades" className="transition-colors hover:text-ink">
            Propiedades
          </a>
          <a href="#servicios" className="transition-colors hover:text-ink">
            Servicios
          </a>
          <a href="#testimonios" className="transition-colors hover:text-ink">
            Nosotros
          </a>
        </nav>
        <a
          href="#contacto"
          className="inline-flex items-center rounded-full bg-ink py-2 pl-4 pr-4 text-sm font-semibold text-paper ring-1 ring-ink transition-colors hover:bg-forest"
        >
          Agendar visita
        </a>
      </div>
    </header>
  );
}

type HeroProps = {
  location: string;
  setLocation: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  onSearch: () => void;
  locations: string[];
  types: string[];
  prices: string[];
};

function Hero({
  location,
  setLocation,
  type,
  setType,
  price,
  setPrice,
  onSearch,
  locations,
  types,
  prices,
}: HeroProps) {
  const selectClass =
    "w-full appearance-none rounded-lg bg-paper px-3 py-2.5 text-sm font-medium text-ink ring-1 ring-ink/10 focus:outline-none focus:ring-brass cursor-pointer";

  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-6 pt-14 pb-20">
        <div className="anim-fade-up">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-brass">
            Colección 2026 · Residencias
          </p>
          <h1 className="font-display max-w-[18ch] text-[clamp(2.75rem,8vw,6.5rem)] leading-none font-medium tracking-tight text-ink">
            Viviendas que se viven, no que se miran.
          </h1>
          <p className="mt-8 max-w-[46ch] text-base text-pretty text-ink/60 sm:text-lg">
            Curamos propiedades boutique en las mejores ubicaciones del país. Sin
            portales genéricos: asesoría cercana y un criterio estético que
            respeta tu forma de habitar.
          </p>
        </div>

        <div className="anim-fade-up mt-12 rounded-2xl bg-sand p-4 ring-1 ring-ink/5 sm:p-5 [animation-delay:.1s]">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1.1fr_1fr_1fr_auto]">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/45">
                Ubicación
              </label>
              <select
                aria-label="Ubicación"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={selectClass}
              >
                {locations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/45">
                Tipo
              </label>
              <select
                aria-label="Tipo"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={selectClass}
              >
                {types.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-ink/45">
                Precio
              </label>
              <select
                aria-label="Precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={selectClass}
              >
                {prices.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={onSearch}
                className="inline-flex w-full items-center gap-2 rounded-lg bg-brass px-5 py-2.5 text-sm font-semibold text-paper ring-1 ring-brass transition-colors hover:bg-ink hover:ring-ink sm:w-auto"
              >
                Buscar
                <span aria-hidden="true" className="text-xs">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="anim-fade-up mt-6 [animation-delay:.2s]">
          <img
            src={heroImage}
            alt="Living de un penthouse boutique al atardecer con ventanas de piso a techo"
            width={1920}
            height={900}
            className="aspect-[16/7] w-full rounded-2xl object-cover ring-1 ring-ink/5"
          />
        </div>
      </div>
    </section>
  );
}

function Featured({
  filter,
  setFilter,
  properties,
}: {
  filter: string;
  setFilter: (v: string) => void;
  properties: Property[];
}) {
  return (
    <section id="propiedades" className="scroll-mt-8 bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brass">
              Selección destacada
            </p>
            <h2 className="font-display max-w-[26ch] text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl">
              Tres propiedades que definen la temporada.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={
                  filter === f.id
                    ? "rounded-full bg-ink px-4 py-2 text-xs font-semibold text-paper ring-1 ring-ink"
                    : "rounded-full bg-transparent px-4 py-2 text-xs font-semibold text-ink/60 ring-1 ring-ink/15 transition-colors hover:ring-ink/40"
                }
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {properties.map((p) => (
            <article
              key={p.id}
              className="group overflow-hidden rounded-2xl bg-sand ring-1 ring-ink/5 transition-transform hover:-translate-y-1"
            >
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.type} en ${p.location}`}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-display text-2xl font-semibold tracking-tight text-ink">
                    {p.price}
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brass">
                    {p.type}
                  </span>
                </div>
                <p className="text-sm font-medium text-ink">{p.location}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-ink/60">
                  <span>
                    <span className="font-semibold text-ink">{p.beds}</span> hab
                  </span>
                  <span className="h-3 w-px bg-ink/15" />
                  <span>
                    <span className="font-semibold text-ink">{p.area}</span> m²
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    number: "01",
    title: "Asesoría privada",
    body: "Un referente único que conoce tu presupuesto, tu estilo y tu zona. Sin listas genéricas.",
  },
  {
    number: "02",
    title: "Curaduría real",
    body: "Cada propiedad pasa por criterio estético y de calidad antes de entrar a la colección.",
  },
  {
    number: "03",
    title: "Gestión completa",
    body: "Documentación, financiamiento y mudanza. Nosotros nos ocupamos del resto.",
  },
];

function Services() {
  return (
    <section id="servicios" className="scroll-mt-8 bg-forest">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-[40ch]">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brass">
            Por qué Atelier Vega
          </p>
          <h2 className="font-display max-w-[22ch] text-3xl font-medium tracking-tight text-balance text-paper sm:text-4xl">
            Un acompañamiento que empieza antes de la primera visita.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-paper/10 ring-1 ring-paper/10 sm:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.number} className="bg-forest p-7">
              <span className="font-display block text-4xl font-medium text-brass">
                {s.number}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-paper">{s.title}</h3>
              <p className="mt-2 text-sm text-pretty text-paper/60">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section id="testimonios" className="scroll-mt-8 bg-paper">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <figure className="text-center">
          <span
            aria-hidden="true"
            className="font-display block text-6xl leading-none text-brass select-none"
          >
            &ldquo;
          </span>
          <blockquote className="font-display mt-2 text-2xl font-medium leading-snug tracking-tight text-balance text-ink sm:text-3xl">
            No parecía una inmobiliaria, parecía un estudio de diseño que también
            vendía casas. Encontramos nuestro departamento en tres visitas.
          </blockquote>
          <figcaption className="mt-8 text-sm text-ink/55">
            <span className="font-semibold text-ink">Marina &amp; Tomás R.</span>{" "}
            · Compraron en Palermo
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section id="contacto" className="scroll-mt-8 bg-brass">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-[32ch]">
            <h2 className="font-display max-w-[16ch] text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl">
              ¿Listo para encontrar tu espacio?
            </h2>
            <p className="mt-4 text-base text-pretty text-ink/70">
              Agenda una conversación de 20 minutos. Sin compromiso, sin presión.
            </p>
          </div>
          <a
            href="mailto:hola@ateliervega.com"
            className="inline-flex items-center gap-2 rounded-full bg-ink py-3 pl-5 pr-5 text-sm font-semibold text-paper ring-1 ring-ink transition-colors hover:bg-forest hover:ring-forest"
          >
            Agendar conversación
            <span aria-hidden="true" className="text-xs">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
        <span className="font-display text-xl font-semibold tracking-tight text-paper">
          Atelier Vega
        </span>
        <p className="text-sm text-paper/50">
          © 2026 Atelier Vega Inmobiliaria · Buenos Aires
        </p>
      </div>
    </footer>
  );
}
