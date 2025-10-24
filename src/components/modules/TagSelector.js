import React from "react";

export const TagSelector = ({ tags, selectedTags, onTagChange }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tags.map((tag) => (
        <label
          key={tag}
          className={`flex items-center px-4 py-2 rounded-xl text-xl font-bold cursor-pointer transition-all transform hover:scale-105 active:scale-95 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] ${
            selectedTags.includes(tag)
              ? "bg-[#ad3404] text-white"
              : "bg-[#f08f05] text-[#792f01]"
          }`}
        >
          <input
            type="checkbox"
            checked={selectedTags.includes(tag)}
            onChange={() => onTagChange(tag)}
            className="sr-only"
          />
          {tag}
        </label>
      ))}
    </div>
  );
};
