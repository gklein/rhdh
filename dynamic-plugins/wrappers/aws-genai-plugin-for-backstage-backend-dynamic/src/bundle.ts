import { createBackendFeatureLoader } from '@backstage/backend-plugin-api';

import genAIAgentModule from '@aws/genai-plugin-for-backstage-backend';
import genAIPlugin from '@aws/genai-plugin-langgraph-agent-for-backstage';

export const bundle = createBackendFeatureLoader({
  async loader() {
    return [genAIPlugin, genAIAgentModule];
  },
});