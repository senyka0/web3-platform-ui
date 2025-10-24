import React from "react";
import { useNavigate } from "react-router-dom";
import { useEncoding } from "../../hooks/useEncoding";
import { useEnvVariable } from "../../hooks/useEnvVariable";
import { PageLayout } from "../layout/PageLayout";
import { Button } from "../ui/Button";
import { Input, Select } from "../ui/Input";

const EnvVariableInput = ({ envKey, config, value, onChange }) => {
  if (config.options) {
    return (
      <Select
        value={value || ""}
        onChange={(e) => onChange(envKey, e.target.value)}
        options={config.options}
        placeholder={config.placeholder}
      />
    );
  }

  return (
    <Input
      type={config.type || "text"}
      value={value || ""}
      onChange={(e) => onChange(envKey, e.target.value)}
      placeholder={config.placeholder}
    />
  );
};

export function WelcomePage() {
  const navigate = useNavigate();
  const { isEncoding, isEncodingDone, handleEncode } = useEncoding();
  const {
    showEnvForm,
    envVariables,
    envVariableOptions,
    isUpdating,
    updateDone,
    isUpdateButtonDisabled,
    handleEnvChange,
    toggleEnvForm,
    handleUpdateEnv,
  } = useEnvVariable();

  return (
    <PageLayout title="VseDozvoleno" subtitle="testnet automitizer">
      <div className="flex flex-col gap-6 max-w-xl mx-auto">
        <Button onClick={() => navigate("/main")}>Start Preset</Button>

        <Button onClick={handleEncode} disabled={isEncoding || isEncodingDone}>
          {isEncoding
            ? "Encoding..."
            : isEncodingDone
            ? "Done"
            : "Encode Accounts"}
        </Button>

        <Button onClick={toggleEnvForm}>
          {showEnvForm ? "Cancel" : "Add Env Variable"}
        </Button>

        {showEnvForm && (
          <div className="flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(envVariableOptions).map(([envKey, config]) => (
                <div key={envKey} className="flex flex-col gap-2">
                  <EnvVariableInput
                    envKey={envKey}
                    config={config}
                    value={envVariables[envKey]}
                    onChange={handleEnvChange}
                  />
                </div>
              ))}
            </div>

            <Button onClick={handleUpdateEnv} disabled={isUpdateButtonDisabled}>
              {isUpdating ? "Updating..." : updateDone ? "Done" : "Update Env"}
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
