import React from "react";
import { cn } from "../../utils/classNames";
import { INPUT_STYLES } from "../../utils/constants";

export const Input = ({
  type = "text",
  value = "",
  onChange,
  placeholder = "",
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(INPUT_STYLES.base, INPUT_STYLES.placeholder, className)}
      {...props}
    />
  );
};

export const Select = ({
  value = "",
  onChange,
  options = [],
  placeholder = "Select an option...",
  className = "",
  children,
  ...props
}) => {
  const selectStyle = {
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23792f01' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
    backgroundSize: "1.5em",
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className={cn(
          INPUT_STYLES.base,
          INPUT_STYLES.select,
          "duration-150",
          className
        )}
        style={selectStyle}
        {...props}
      >
        {placeholder && (
          <option
            value=""
            className="py-2 px-4 text-xl font-bold bg-white text-[#792f01]"
          >
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="py-2 px-4 text-xl font-bold bg-white text-[#792f01] hover:bg-[#fef6e4]"
          >
            {option}
          </option>
        ))}
        {children}
      </select>
    </div>
  );
};
