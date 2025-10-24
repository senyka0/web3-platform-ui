import React, { useState, useEffect } from "react";

const settingDescriptions = {
  sleep_before_preset_start:
    "Час (в секундах), який система чекає перед запуском пресету",
  delay_retry_seconds:
    "Час (в секундах), який система буде чекати перед повторною спробою виконання транзакції, якщо вона не вдалася",
  delay_between_activities:
    "Діапазон випадкової затримки (в секундах) між виконанням різних дій. Це допомагає уникнути занадто частих запитів і можливих блокувань",
  max_retry_after_fail_txn:
    "Максимальна кількість повторних спроб при неуспішній транзакції. При невдачі буде виконуватись 3 повторні спроби",
  queue_threads_amount:
    "Кількість потоків, які використовуються для обробки задач",
  proxy_type:
    "Тип використовуваного проксі. (Тимчасово вимкнено з технічних причин і має стояти значення по замовчуванню)",
  network: "Блокчейн-мережа, в якій виконуються транзакції",
  found_balance:
    "Прапорець (true/false), який вказує, чи потрібно перевіряти баланс перед виконанням транзакції. (Тимчасово вимкнено з технічних причин)",
  min_amount:
    "Мінімальна кількість токенів, яку можна використовувати в операції. (Тимчасово вимкнено з технічних причин)",
  random_network:
    "Прапорець (true/false), що визначає, чи буде випадковим чином обрана мережа",
  task_count:
    "Кількість транзакцій, які потрібно виконати. Вказується діапазон, з якого потім буде вибрано випадкове значення",
  from_token: "Початковий токен, який використовується в операції",
  to_network: "Мережа в яку робимо брідж",
  func_name: "Тип операції",
  repay_all:
    "Якщо треба робити repay всього балансу ставимо true, інакше false",
  allowance:
    "Мультиплікатор для апрува токенів, які будуть використані в операції",
  to_token: "Токен, в який відбувається свап",
  amount_boundaries: "Діапазон випадкового вибору суми токенів [min, max]",
  percentage_boundaries: "Діапазон випадкового вибору відсотка [min, max]",
  quantity: "Кількість NFT для мінту",
  pools:
    "Токен, з який буде кластись в пул в парі з from_token. Можна вказати 2 значення, буде обрано рандомне значення",
  delay_between_approve:
    "Затримка між апрувом токенів та основною транзакцією в секундах. Буде обиратись рандомне значення з проміжку",
};

const translateTypeInfo = (typeInfo) => {
  if (!typeInfo) return "";

  let translated = typeInfo
    .replace(/int/g, "цілі числа")
    .replace(/float/g, "число з плаваючою точкою")
    .replace(/str/g, "строка")
    .replace(/string/g, "строка")
    .replace(/bool/g, "логічне значення")
    .replace(/list/g, "список")
    .replace(/array/g, "список")
    .replace(/required/g, "обов'язково")
    .replace(/optional/g, "опціонально")
    .replace(/Required/g, "Обов'язково")
    .replace(/Optional/g, "Опціонально");

  return translated;
};

const getPlaceholder = (key) => {
  if (key === "delay_between_activities") {
    return "min,max";
  }
  if (key === "task_count") {
    return "min,max";
  }
  if (key === "delay_between_approve") {
    return "min,max";
  }
  if (key === "gas_increase") {
    return "30000";
  }
  if (key === "from_token") {
    return "ETH";
  }
  if (key === "to_token") {
    return "USDC";
  }
  if (key === "delay_retry_seconds") {
    return "3";
  }
  if (key === "sleep_before_preset_start") {
    return "1";
  }
  if (key === "max_retry_after_fail_txn") {
    return "3";
  }
  if (key === "min_amount") {
    return "0.1";
  }
  if (key === "allowance") {
    return "1";
  }
  if (key === "from_address") {
    return "0x0000000000000000000000000000000000000000";
  }
  if (key === "token_hold_time") {
    return "min,max";
  }
  if (key === "slippage") {
    return "1";
  }
  if (key === "pools") {
    return "USDC,USDT";
  }
  if (key === "sell_token") {
    return "WETH";
  }
  return "";
};

const SettingTooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative inline-block w-full">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 w-80 p-3 bg-[#792f01] text-[#f08f05] text-sm font-normal rounded-lg shadow-lg border-2 border-[#c13700] top-full left-0 mt-2">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#792f01] border-l-2 border-t-2 border-[#c13700] rotate-45"></div>
          {text}
        </div>
      )}
    </div>
  );
};

const SettingInput = ({ type, value, onChange, className, placeholder }) => {
  if (type === "boolean") {
    const handleBooleanChange = (e) => {
      onChange(e.target.value === "true");
      e.target.blur();
    };

    const booleanValue = value === null || value === undefined ? false : value;

    return (
      <div className="relative">
        <select
          value={booleanValue ? "true" : "false"}
          onChange={handleBooleanChange}
          onBlur={(e) => e.target.blur()}
          className={`w-full py-4 px-6 rounded-xl text-xl font-bold transition-all duration-150 hover:scale-105 active:scale-105 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] bg-[#f08f05] text-[#792f01] appearance-none cursor-pointer focus:outline-none focus:ring-0`}
          style={{
            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23792f01' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
            backgroundSize: "1.5em",
          }}
        >
          <option
            value="false"
            className="py-2 px-4 text-xl font-bold bg-white text-[#792f01] hover:bg-[#fef6e4]"
          >
            false
          </option>
          <option
            value="true"
            className="py-2 px-4 text-xl font-bold bg-white text-[#792f01] hover:bg-[#fef6e4]"
          >
            true
          </option>
        </select>
      </div>
    );
  }

  if (type === "number") {
    const handleChange = (e) => {
      const val = e.target.value;
      if (val === "" || /^-?\d*\.?\d*$/.test(val)) {
        onChange(val === "" ? "" : val);
      }
    };
    return (
      <input
        type="text"
        value={value === null || value === undefined ? "" : value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full py-4 px-6 rounded-xl text-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] bg-[#f08f05] text-[#792f01] focus:outline-none focus:ring-0 placeholder-[#792f01] placeholder-opacity-50`}
        style={{
          MozAppearance: "textfield",
        }}
        onWheel={(e) => e.target.blur()}
        inputMode="decimal"
        autoComplete="off"
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full py-4 px-6 rounded-xl text-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] bg-[#f08f05] text-[#792f01] focus:outline-none focus:ring-0 placeholder-[#792f01] placeholder-opacity-50`}
    />
  );
};

const EnumInput = ({ value, options, onChange }) => {
  const handleSelectChange = (e) => {
    onChange(e.target.value);
    e.target.blur();
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={handleSelectChange}
        onBlur={(e) => e.target.blur()}
        className={`w-full py-4 px-6 rounded-xl text-xl font-bold transition-all duration-150 hover:scale-105 active:scale-105 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] bg-[#f08f05] text-[#792f01] appearance-none cursor-pointer focus:outline-none focus:ring-0`}
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23792f01' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          backgroundSize: "1.5em",
        }}
      >
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

const MultiSelectInput = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);
  const selectedValues = Array.isArray(value) ? value : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    const newSelection = selectedValues.includes(option)
      ? selectedValues.filter((item) => item !== option)
      : [...selectedValues, option];
    onChange(newSelection);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full py-4 px-6 rounded-xl text-xl font-bold transition-all duration-150 hover:scale-105 active:scale-105 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] bg-[#f08f05] text-[#792f01] appearance-none cursor-pointer focus:outline-none focus:ring-0 min-h-[60px] flex items-center justify-between`}
        style={{
          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23792f01' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
          backgroundSize: "1.5em",
        }}
      >
        <div className="flex flex-wrap gap-1">
          {selectedValues.length > 0 ? (
            selectedValues.map((item, index) => (
              <span
                key={index}
                className="bg-[#792f01] text-[#f08f05] px-2 py-1 rounded text-sm font-bold"
              >
                {item
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            ))
          ) : (
            <span className="text-[#792f01] opacity-50">
              Select networks...
            </span>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-[#f08f05] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] rounded-xl shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] z-50 max-h-60 overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
          <div className="no-scrollbar">
            {[
              ...selectedValues,
              ...options.filter((option) => !selectedValues.includes(option)),
            ].map((option) => (
              <div
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`py-3 px-4 text-lg font-bold cursor-pointer transition-colors hover:bg-[#ee9718] ${
                  selectedValues.includes(option)
                    ? "bg-[#792f01] text-[#f08f05] hover:text-[#792f01]"
                    : "text-[#792f01]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>
                    {option
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                  {selectedValues.includes(option) && (
                    <span className="text-[#f08f05] font-bold">✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const BoundariesInput = ({ settings, onSettingChange }) => {
  const [selectedBoundary, setSelectedBoundary] = useState(
    "percentage_boundaries"
  );

  useEffect(() => {
    if (
      settings.percentage_boundaries &&
      settings.percentage_boundaries !== null
    ) {
      setSelectedBoundary("percentage_boundaries");
    } else if (
      settings.amount_boundaries &&
      settings.amount_boundaries !== null
    ) {
      setSelectedBoundary("amount_boundaries");
    }
  }, [settings.percentage_boundaries, settings.amount_boundaries]);

  const handleBoundaryTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedBoundary(newType);
    if (newType === "percentage_boundaries") {
      onSettingChange("amount_boundaries", null);
    } else {
      onSettingChange("percentage_boundaries", null);
    }
    e.target.blur();
  };

  const currentValue =
    selectedBoundary === "percentage_boundaries"
      ? settings.percentage_boundaries
      : settings.amount_boundaries;

  return (
    <div>
      <div className="relative mb-3">
        <SettingTooltip text="Діапазон випадкового вибору: amount_boundaries для суми токенів [min, max], percentage_boundaries для відсотка [min, max]. Необхідно використовувати або один, або інший">
          <select
            value={selectedBoundary}
            onChange={handleBoundaryTypeChange}
            onBlur={(e) => e.target.blur()}
            className={`w-full py-1 px-4 rounded-lg text-md font-bold transition-all duration-150 hover:scale-105 active:scale-105 shadow-[-2px_2px_4px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] bg-[#f08f05] text-gray-900 appearance-none cursor-pointer focus:outline-none focus:ring-0`}
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23792f01' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 1rem center",
              backgroundSize: "1.5em",
            }}
          >
            <option
              value="percentage_boundaries"
              className="py-2 px-4 text-md font-bold bg-white text-gray-900 hover:bg-[#fef6e4]"
            >
              Percentage Boundaries
            </option>
            <option
              value="amount_boundaries"
              className="py-2 px-4 text-md font-bold bg-white text-gray-900 hover:bg-[#fef6e4]"
            >
              Amount Boundaries
            </option>
          </select>
        </SettingTooltip>
      </div>
      <input
        type="text"
        value={currentValue || ""}
        onChange={(e) => onSettingChange(selectedBoundary, e.target.value)}
        placeholder="min,max"
        className={`w-full py-4 px-6 rounded-xl text-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] bg-[#f08f05] text-[#792f01] focus:outline-none focus:ring-0 placeholder-[#792f01] placeholder-opacity-50`}
      />
    </div>
  );
};

export const ModuleSettings = ({
  settings,
  settingsTypeInfo,
  enumOptions,
  networks,
  onSettingChange,
  onStartPreset,
  isStarting,
  response,
}) => {
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    let timer;
    if (isBlocked) {
      timer = setTimeout(() => {
        setIsBlocked(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isBlocked]);

  const handleStartPreset = () => {
    if (!isBlocked) {
      onStartPreset();
      if (!response || response.status !== "error") {
        setIsBlocked(true);
      }
    }
  };

  const renderSettingInput = (key, value) => {
    if (key === "percentage_boundaries" || key === "amount_boundaries") {
      return null;
    }

    if (key === "network" && networks) {
      return (
        <MultiSelectInput
          value={value}
          options={networks}
          onChange={(newValue) => onSettingChange(key, newValue)}
        />
      );
    }

    if (enumOptions && enumOptions[key]) {
      return (
        <EnumInput
          value={value}
          options={enumOptions[key]}
          onChange={(newValue) => onSettingChange(key, newValue)}
        />
      );
    }

    const typeInfo = settingsTypeInfo[key] || "";
    const isBooleanType = typeInfo.includes("bool");

    return (
      <SettingInput
        type={isBooleanType ? "boolean" : typeof value}
        value={value}
        onChange={(newValue) => onSettingChange(key, newValue)}
        placeholder={getPlaceholder(key)}
      />
    );
  };

  const shouldShowBoundariesInput =
    settings.hasOwnProperty("percentage_boundaries") ||
    settings.hasOwnProperty("amount_boundaries");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(settings).map(([key, value]) => {
          if (key === "percentage_boundaries" || key === "amount_boundaries") {
            return null;
          }

          return (
            <div key={key} className="">
              <label className="block font-bold text-gray-900 mb-2">
                <SettingTooltip text={settingDescriptions[key] || ""}>
                  {key
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </SettingTooltip>
                {settingsTypeInfo && settingsTypeInfo[key] && (
                  <div className="text-md font-normal text-gray-900">
                    {translateTypeInfo(settingsTypeInfo[key])}
                  </div>
                )}
                {renderSettingInput(key, value)}
              </label>
            </div>
          );
        })}

        {shouldShowBoundariesInput && (
          <div className="">
            <label className="block font-bold text-[#792f01] mb-2">
              <BoundariesInput
                settings={settings}
                onSettingChange={onSettingChange}
              />
            </label>
          </div>
        )}
      </div>
      {response && (
        <div
          className={`mb-4 p-4 rounded-xl text-xl ${
            response.status === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          <p>{response.message}</p>
        </div>
      )}
      <button
        onClick={handleStartPreset}
        disabled={isBlocked}
        className={`w-full py-6 px-12 rounded-xl text-3xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-[-4px_4px_8px_rgba(0,0,0,0.40)] border-2 border-[#c13700] outline outline-2 outline-[#ee9718] ${
          isBlocked
            ? "opacity-75 cursor-not-allowed bg-[#ad3404] text-white"
            : response?.status === "success"
            ? "bg-[#ad3404] text-white"
            : "bg-[#f08f05] text-[#792f01]"
        }`}
      >
        {isBlocked ? "Starting..." : "Start Preset"}
      </button>
    </>
  );
};
