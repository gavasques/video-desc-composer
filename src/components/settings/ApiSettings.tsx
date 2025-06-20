
import { useApiKeyManager } from "@/hooks/useApiKeyManager";
import { useApiTesting } from "@/hooks/useApiTesting";
import { useQuotaMonitoring } from "@/hooks/useQuotaMonitoring";
import ApiKeyConfiguration from "./api/ApiKeyConfiguration";
import QuotaMonitoring from "./api/QuotaMonitoring";
import ApiAdvancedConfig from "./api/ApiAdvancedConfig";

const ApiSettings = () => {
  const { config, saveApiKey, updateConfig } = useApiKeyManager();
  const { isTestingConnection, testConnection } = useApiTesting();
  const { quotaUsage, quotaPercentage, isNearLimit } = useQuotaMonitoring();

  const handleTestConnection = async (apiKey: string) => {
    const status = await testConnection(apiKey);
    updateConfig({ status: status as 'valid' | 'invalid' });
    return status;
  };

  return (
    <div className="space-y-6">
      <ApiKeyConfiguration
        config={config}
        onSave={saveApiKey}
        onTest={handleTestConnection}
        isTestingConnection={isTestingConnection}
      />
      
      <QuotaMonitoring
        quotaUsage={quotaUsage}
        quotaPercentage={quotaPercentage}
        isNearLimit={isNearLimit}
      />
      
      <ApiAdvancedConfig
        config={config}
        onUpdateConfig={updateConfig}
      />
    </div>
  );
};

export default ApiSettings;
