import React from "react";
import { cn } from "../../utils/classNames";
import { BUTTON_STYLES } from "../../utils/constants";

export const Button = ({
  children,
  variant = "primary",
  disabled = false,
  position = null,
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses = BUTTON_STYLES[variant] || BUTTON_STYLES.primary;
  const positionClasses = position
    ? `${position} ${BUTTON_STYLES.navigation}`
    : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        positionClasses,
        disabled && BUTTON_STYLES.disabled,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
