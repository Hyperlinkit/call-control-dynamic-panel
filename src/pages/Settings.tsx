
import SettingsComponent from "@/components/settings/Settings";

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure your call management system
        </p>
      </div>
      
      <SettingsComponent />
    </div>
  );
};

export default Settings;
