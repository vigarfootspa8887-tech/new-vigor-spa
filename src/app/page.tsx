const NAV_LINKS = [
  { label: "HOME", href: "#home" },
  { label: "SERVICES", href: "#services" },
  { label: "ABOUT", href: "#about" },
  { label: "GALLERY", href: "#gallery" },
  { label: "CONTACT", href: "#contact" },
] as const;

const SERVICES = [
  {
    title: "Foot Reflexology",
    image: "/images/service-foot.jpg",
    alt: "Foot reflexology treatment at New Vigor Foot Spa",
  },
  {
    title: "Body Massage",
    image: "/images/service-massage.jpg",
    alt: "Relaxing body massage at New Vigor Foot Spa",
  },
  {
    title: "Hot Stone Therapy",
    image: "/images/service-stones.jpg",
    alt: "Hot stone therapy at New Vigor Foot Spa",
  },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Yelp",
    href: "https://www.yelp.com/biz/vigor-foot-spa-smithtown",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M12.271 16.051c.516.172 1.706.586 2.213.758.508.172 1.02.344 1.414.602.387.258.645.688.645 1.117v2.355c0 .602-.387 1.117-.902 1.289a9.18 9.18 0 0 1-2.512.387c-.73 0-1.453-.086-2.168-.301a1.812 1.812 0 0 1-1.203-1.719v-2.262c0-.387.215-.73.516-.945.301-.215.645-.344.989-.387.473-.043.902-.086 1.29-.172.387-.086.602-.172.718-.222zm-1.406-4.498c-.473.473-1.203 1.203-1.633 1.633-.43.43-.945.793-1.543.945-.602.172-1.289.086-1.805-.258l-1.977-1.289c-.516-.344-.731-.945-.602-1.547.215-.859.602-1.633 1.117-2.32a9.3 9.3 0 0 1 1.633-1.891c.473-.387 1.074-.602 1.719-.473.602.129 1.074.516 1.375 1.031l1.633 2.512c.258.387.344.859.215 1.375-.129.516-.387.989-.732 1.332zm2.512-1.418c.301-.473.602-.989.86-1.375.258-.387.516-.73.86-.945.301-.215.687-.344 1.074-.387l2.426-.344c.602-.086 1.203.215 1.461.774.43.816.731 1.719.86 2.684.129.988.086 1.977-.172 2.891-.172.598-.645 1.074-1.246 1.203a1.57 1.57 0 0 1-1.547-.387l-2.598-2.426c-.344-.344-.559-.774-.645-1.247-.086-.472-.043-1.002.215-1.461.031-.043.063-.096.094-.139zm-1.16-3.39c.387-.559.731-1.031 1.031-1.461.301-.43.688-.731 1.16-.86.473-.129.988-.086 1.418.172l2.082 1.461c.473.344.688.989.559 1.633-.086.473-.301.902-.602 1.246-.301.344-.645.602-1.031.774-.387.172-.774.258-1.161.344l-2.598.559c-.387.086-.774.086-1.117-.043-.345-.129-.645-.387-.86-.688-.207-.301-.345-.645-.387-1.031-.044-.387 0-.73.129-1.074.086-.215.172-.473.301-.732.086-.171.172-.332.249-.493zm2.619 5.924c.301.387.559.73.86.989.302.258.645.387 1.032.387.387 0 .773-.129 1.117-.344l2.082-1.461c.516-.387.73-1.117.473-1.762-.387-.989-.945-1.891-1.633-2.598-.473-.473-1.074-.86-1.762-1.074a1.54 1.54 0 0 0-1.547.387l-2.082 2.598c-.258.344-.387.73-.387 1.161 0 .43.172.816.473 1.117.086.086.172.172.258.301.086.128.172.257.248.386z" />
      </svg>
    ),
  },
  {
    label: "Google",
    href: "https://share.google/CeY0Agpjwy2y9gSRy",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Vigor-Foot-Spa/100064836738289/",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/newvigarfootspa/",
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
] as const;

const GALLERY_IMAGES = [
  { src: "/images/gallery-1.jpg", alt: "New Vigor Foot Spa treatment room" },
  { src: "/images/gallery-2.jpg", alt: "New Vigor Foot Spa relaxation area" },
  { src: "/images/gallery-3.jpg", alt: "New Vigor Foot Spa therapy session" },
  { src: "/images/gallery-4.jpg", alt: "New Vigor Foot Spa ambiance" },
  { src: "/images/gallery-5.jpg", alt: "New Vigor Foot Spa decor" },
  { src: "/images/service-stones.jpg", alt: "Hot stone therapy at New Vigor Foot Spa" },
] as const;

function Navbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3">
          <img
            src="/images/logo.png"
            alt="New Vigor Foot Spa"
            className="h-10 w-auto"
          />
          <span className="font-serif text-xl tracking-wide text-white">
            New Vigor Foot Spa
          </span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm tracking-widest text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-screen items-center justify-center overflow-hidden"
    >
      <img
        src="/images/hero-bg.jpg"
        alt="New Vigor Foot Spa relaxing environment"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h1 className="mb-6 font-serif text-5xl leading-tight text-white md:text-7xl">
          Your Escape from Stress
        </h1>
        <p className="mb-10 text-lg text-gray-300 md:text-xl">
          A peaceful place to relax and recharge.
        </p>
        <a
          href="https://go.bychronos.com/l/smithtown-11787-new-vigor-foot-spa-806098/a/services?p=g&rwg_token=AFd1xnGfhHUUgCpJLpbZT4BIXR-KAFV1w3l47SS89uwhQfuX_LabadvFfFbuCn9YhfcotxwptJ7u0SBfCzTYK6bYQuHDKe2khA%3D%3D"
          className="inline-block rounded-full bg-accent px-10 py-4 text-sm font-semibold tracking-widest text-white transition-colors hover:bg-accent-hover"
        >
          BOOK YOUR TIME
        </a>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-bg-cream py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-16 text-center font-serif text-4xl text-brown-deep md:text-5xl">
          Our Services
        </h2>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {SERVICES.map((service) => (
            <div key={service.title} className="flex flex-col items-center">
              <div className="mb-6 size-48 overflow-hidden rounded-full shadow-lg">
                <img
                  src={service.image}
                  alt={service.alt}
                  className="size-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl text-brown-deep">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Prices() {
  return (
    <section id="prices" className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-12 font-serif text-4xl text-brown-deep md:text-5xl">
          Services &amp; Pricing
        </h2>
        <div className="overflow-hidden rounded-xl shadow-lg">
          <img
            src="/images/price.png"
            alt="New Vigor Foot Spa price list"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-8 font-serif text-4xl text-brown-deep md:text-5xl">
          About Us
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600">
          At New Vigor Foot Spa, we believe in the healing power of touch. Our
          skilled therapists combine traditional techniques with modern wellness
          practices to provide you with an unparalleled relaxation experience.
          Step into our tranquil sanctuary and let your journey to wellness
          begin.
        </p>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="bg-bg-warm py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-16 text-center font-serif text-4xl text-brown-deep md:text-5xl">
          Gallery
        </h2>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className="mb-4 break-inside-avoid overflow-hidden rounded-lg shadow-md">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-brown-deep py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-4 text-center font-serif text-4xl text-white md:text-5xl">
          Get in Touch
        </h2>
        <p className="mb-12 text-center text-gray-400">
          Follow us on social media or give us a call
        </p>
        <div className="mb-16 flex flex-wrap justify-center gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold tracking-wider text-white transition-colors hover:bg-white/20"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black py-8">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="mb-2 font-serif text-lg text-white/80">
          New Vigor Foot Spa
        </p>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} New Vigor Foot Spa. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Prices />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </>
  );
}
