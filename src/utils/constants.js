export const BUTTON_STYLES = {
  primary:
    "bg-[#f08f05] text-[#792f01] font-bold py-6 px-12 rounded-xl text-3xl transition-all transform hover:scale-105 active:scale-95 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] active:bg-[#ad3404]",
  secondary:
    "bg-[#f08f05] text-[#792f01] font-bold py-3 px-6 rounded-xl text-xl transition-all transform hover:scale-105 active:scale-95 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] active:bg-[#ad3404]",
  disabled: "!bg-[#ad3404] !text-white opacity-75 cursor-not-allowed",
  navigation:
    "absolute font-bold py-3 px-6 rounded-xl text-xl transition-all transform hover:scale-105 active:scale-95 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] z-30",
};

export const INPUT_STYLES = {
  base: "w-full py-4 px-6 rounded-xl text-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] bg-[#f08f05] text-[#792f01] focus:outline-none focus:ring-0",
  placeholder: "placeholder-[#792f01] placeholder-opacity-50",
  select: "appearance-none cursor-pointer",
};

export const CARD_STYLES = {
  base: "bg-[#f08f05] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] rounded-xl shadow-[-4px_4px_8px_rgba(0,0,0,0.40)]",
};

export const LAYOUT_STYLES = {
  pageContainer:
    "min-h-screen bg-gradient-to-tr from-[#ad3404] to-[#fab52a] flex items-center justify-center relative overflow-hidden",
  contentContainer: "p-8 w-2/3 min-h-[50vh] text-center relative z-10",
  contentArea: "relative z-20",
};

export const COLORS = {
  primary: "#792f01",
  secondary: "#f08f05",
  accent: "#ee9718",
  border: "#c13700",
  success: "#ad3404",
  background: {
    from: "#ad3404",
    to: "#fab52a",
  },
};

export const Z_INDEX = {
  background: 0,
  content: 10,
  contentArea: 20,
  navigation: 30,
  modal: 40,
  tooltip: 50,
};
