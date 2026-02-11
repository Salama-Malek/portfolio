import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  lazy,
  Suspense,
} from "react";
import { TypeAnimation } from "react-type-animation";
import { Link as ScrollLink } from "react-scroll";
import SocialBtns from "./SocialBtns";
import { useTranslation } from "react-i18next";
import OptimizedImage from "./OptimizedImage";
import type { SocialLink, TypeAnimationSequence } from "../types/common";

const Particles = lazy(() => import("./Particles"));
const LiquidEther = lazy(() => import("./LiquidEther"));

interface HeroData {
  name?: string;
  heading?: string;
  typingText?: (string | number)[];
  description?: string;
  btnText?: string;
  btnUrl?: string;
  cvUrl?: string;
  imgUrl?: string;
}

interface HeroProps {
  data?: HeroData;
  socialData?: SocialLink[];
}

interface LiquidEtherConfig {
  mouseForce: number;
  cursorSize: number;
  isViscous: boolean;
  viscous: number;
  iterationsViscous: number;
  iterationsPoisson: number;
  resolution: number;
  isBounce: boolean;
  autoDemo: boolean;
  autoSpeed: number;
  autoIntensity: number;
  takeoverDuration: number;
  autoResumeDelay: number;
  autoRampDuration: number;
}

const EFFECTS_DELAY_MS = 1200;

export default function Hero({
  data = {},
  socialData = [],
}: HeroProps): React.JSX.Element | null {
  const {
    name,
    heading,
    typingText,
    description,
    btnText,
    btnUrl,
    cvUrl,
    imgUrl,
  } = data;
  const safeTypingText: TypeAnimationSequence = typingText ?? [];

  const { t } = useTranslation();
  const heroImgRef = useRef<HTMLDivElement>(null);

  const [showEffects, setShowEffects] = useState<boolean>(false);
  const [showTyping, setShowTyping] = useState<boolean>(false);
  const [allowMotion, setAllowMotion] = useState<boolean>(true);
  const [isHeroVisible, setIsHeroVisible] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = (): void => {
      setAllowMotion(!mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const target = heroImgRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const typingTimeout = window.setTimeout(() => setShowTyping(true), 800);

    if (!allowMotion || !isHeroVisible) {
      setShowEffects(false);
      return () => {
        window.clearTimeout(typingTimeout);
      };
    }

    const activateEffects = (): void => {
      window.setTimeout(() => setShowEffects(true), EFFECTS_DELAY_MS);
    };

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(activateEffects, { timeout: 2500 });
      return () => {
        window.clearTimeout(typingTimeout);
        window.cancelIdleCallback(idleId);
      };
    }

    const fallbackTimeout = window.setTimeout(activateEffects, 1200);
    return () => {
      window.clearTimeout(typingTimeout);
      window.clearTimeout(fallbackTimeout);
    };
  }, [allowMotion, isHeroVisible]);

  const liquidEtherConfig = useMemo(
    (): LiquidEtherConfig => ({
      mouseForce: 20,
      cursorSize: 100,
      isViscous: false,
      viscous: 30,
      iterationsViscous: 32,
      iterationsPoisson: 32,
      resolution: 0.5,
      isBounce: false,
      autoDemo: true,
      autoSpeed: 0.5,
      autoIntensity: 2.2,
      takeoverDuration: 0.25,
      autoResumeDelay: 3000,
      autoRampDuration: 0.6,
    }),
    [],
  );

  if (!name || !heading) return null;

  return (
    <section className="hero-section" id="home">
      {showEffects && (
        <Suspense fallback={null}>
          <Particles />
          <div className="hero-liquid-container">
            <LiquidEther {...liquidEtherConfig} />
          </div>
        </Suspense>
      )}

      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-xl-6">
            <div className="hero-text">
              <h6>{name}</h6>
              <h1>{heading}</h1>

              {showTyping && safeTypingText.length > 0 && (
                <div className="typing-animation-wrapper">
                  <h2>
                    <TypeAnimation
                      sequence={safeTypingText}
                      speed={50}
                      repeat={Infinity}
                    />
                  </h2>
                </div>
              )}

              <p>{description}</p>

              <div className="btn-bar">
                {btnUrl && (
                  <ScrollLink
                    to={btnUrl}
                    smooth
                    offset={-80}
                    duration={500}
                    className="px-btn"
                  >
                    {btnText}
                  </ScrollLink>
                )}

                {cvUrl && (
                  <a
                    href={cvUrl}
                    className="px-btn-outline"
                    download
                    aria-label={t("hero.downloadCv")}
                  >
                    ⬇ <span>{t("hero.downloadCv")}</span>
                  </a>
                )}
              </div>

              <div className="social-links">
                <SocialBtns socialBtns={socialData} />
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-xl-6">
            <div className="hero-img-wrapper" ref={heroImgRef}>
              <OptimizedImage
                src={imgUrl}
                alt={name}
                className="hero-img"
                aspectRatio={1}
                loading="eager"
                fetchpriority="high"
                sizes="(max-width: 575px) 90vw, (max-width: 991px) 70vw, 42vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
