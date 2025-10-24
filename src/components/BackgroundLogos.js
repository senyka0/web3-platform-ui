import React from "react";
import btc from "../assets/btc.svg";
import eth from "../assets/eth.svg";
import sol from "../assets/sol.svg";
import usdt from "../assets/usdt.svg";
import xrp from "../assets/xrp.svg";

const BackgroundLogos = () => {
  const logoPositions = [
    { logo: btc, x: 15, y: 20, scale: 2.5 },
    { logo: eth, x: 20, y: 70, scale: 2.5 },
    { logo: sol, x: 75, y: 80, scale: 2.5 },
    { logo: usdt, x: 50, y: 30, scale: 2.5 },
    { logo: xrp, x: 85, y: 20, scale: 2.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {logoPositions.map((pos, index) => (
        <img
          key={index}
          src={pos.logo}
          className="absolute transition-transform duration-700 ease-in-out hover:scale-110"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: "96px",
            height: "96px",
            transform: `scale(${pos.scale})`,
            filter:
              "drop-shadow(0 20px 13px rgb(0 0 0 / 0.15)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.2))",
            opacity: 0.15,
          }}
          alt=""
        />
      ))}
    </div>
  );
};

export default BackgroundLogos;
