import React, { useMemo } from "react";
import Particles from "@tsparticles/react";
import { useThemeContext } from "../ThemeProvider";
import particlesOptions from "../particles.json";
import { getCssVariableValue } from "../utils/themeTokens";

const ParticlesComponent = (): JSX.Element => {
  const { theme } = useThemeContext();

  const particleColor = useMemo((): string => {
    const fallback = theme === "dark" ? "#ffffff" : "#000000";
    return getCssVariableValue("--text-primary", fallback);
  }, [theme]);

  const particlesConfig = {
    ...particlesOptions,
    particles: {
      ...particlesOptions.particles,
      color: {
        value: particleColor,
      },
      links: {
        ...(particlesOptions.particles as any).links,
        color: particleColor,
      },
    },
  } as any;

  return <Particles id="tsparticles" options={particlesConfig} />;
};

export default ParticlesComponent;
