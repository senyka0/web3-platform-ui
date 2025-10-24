import React from "react";

export const Select = ({ value, onChange, options, placeholder, disabled }) => {
  const handleSelectChange = (e) => {
    onChange(e);
    e.target.blur();
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={handleSelectChange}
        onBlur={(e) => e.target.blur()}
        disabled={disabled}
        className={`w-full py-4 px-6 rounded-xl text-xl font-bold transition-all transform hover:scale-105 active:scale-105 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] bg-[#f08f05] text-[#792f01] disabled:opacity-50 disabled:cursor-not-allowed appearance-none cursor-pointer focus:outline-none focus:ring-0`}
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23792f01' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          backgroundSize: "1.5em",
        }}
      >
        <option
          value=""
          className="py-2 px-4 text-xl font-bold bg-white text-[#792f01]"
        >
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="py-2 px-4 text-xl font-bold bg-white text-[#792f01] hover:bg-[#fef6e4]"
          >
            {option
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </option>
        ))}
      </select>
    </div>
  );
};
