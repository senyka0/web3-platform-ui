import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import BackgroundLogos from "../BackgroundLogos";
import logo from "../../assets/logo.png";
import { LAYOUT_STYLES } from "../../utils/constants";

export const PageLayout = ({
  children,
  title,
  subtitle,
  showBackButton = false,
  backPath = "/",
  showLogo = true,
  rightButton = null,
}) => {
  const navigate = useNavigate();

  return (
    <div className={LAYOUT_STYLES.pageContainer}>
      {showBackButton && (
        <Button
          variant="secondary"
          position="top-6 left-6"
          onClick={() => navigate(backPath)}
        >
          Back
        </Button>
      )}

      {rightButton}

      <div className={LAYOUT_STYLES.contentContainer}>
        <BackgroundLogos />

        {showLogo && (
          <div className="w-full flex justify-end">
            <img
              src={logo}
              alt="Logo"
              className="object-contain h-48 filter drop-shadow-[0_0_5px_rgba(0,0,0,0.7)]"
            />
          </div>
        )}

        <div className={LAYOUT_STYLES.contentArea}>
          {title && (
            <h1 className="text-8xl font-bold text-[#792f01] mb-12">{title}</h1>
          )}
          {subtitle && (
            <h2 className="text-4xl font-bold text-[#792f01] mb-12">
              {subtitle}
            </h2>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
