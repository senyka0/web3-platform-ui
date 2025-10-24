import React from "react";
import { useNavigate } from "react-router-dom";
import { Select } from "../common/Select";
import { TagSelector } from "../modules/TagSelector";
import { ModuleSettings } from "../modules/ModuleSettings";
import { usePreset } from "../../hooks/usePreset";
import { PageLayout } from "../layout/PageLayout";
import { Button } from "../ui/Button";

export function MainPage() {
  const navigate = useNavigate();
  const {
    tags,
    selectedTags,
    restart,
    projects,
    selectedProject,
    modules,
    selectedModule,
    editableSettings,
    settingsTypeInfo,
    enumOptions,
    networks,
    startingPreset,
    presetResponse,
    handleTagChange,
    handleSettingChange,
    startPreset,
    setSelectedProject,
    setSelectedModule,
    setRestart,
  } = usePreset();

  const rightButton = (
    <Button
      variant="secondary"
      position="top-6 right-6"
      onClick={() => navigate("/reports")}
    >
      Reports
    </Button>
  );

  return (
    <PageLayout showBackButton backPath="/" rightButton={rightButton}>
      <div className="w-full max-w-5xl mx-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
              Account Tags
            </h2>
            <TagSelector
              tags={tags}
              selectedTags={selectedTags}
              onTagChange={handleTagChange}
            />

            <div className="flex justify-center mt-4">
              <div className="w-48">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Restart
                </h2>
                <Select
                  value={restart.toString()}
                  onChange={(e) => setRestart(e.target.value === "true")}
                  options={["false", "true"]}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Projects
              </h2>
              <Select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                options={projects}
                placeholder="Select a project..."
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Modules
              </h2>
              <Select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                options={modules}
                placeholder="Select a module..."
                disabled={!selectedProject}
              />
            </div>
          </div>

          {editableSettings && Object.keys(editableSettings).length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                Module Settings
              </h2>
              <ModuleSettings
                settings={editableSettings}
                settingsTypeInfo={settingsTypeInfo}
                enumOptions={enumOptions}
                networks={networks}
                onSettingChange={handleSettingChange}
                onStartPreset={startPreset}
                isStarting={startingPreset}
                response={presetResponse}
              />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
