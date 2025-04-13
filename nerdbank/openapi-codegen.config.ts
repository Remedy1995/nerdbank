import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from "@openapi-codegen/typescript";
import { defineConfig } from "@openapi-codegen/cli";
export default defineConfig({
  bankapi: {
    from: {
      relativePath: "./openapi.json",
      source: "file",
    },
    outputDir: "bankapi",
    to: async (context) => {
      const filenamePrefix = "bankapi";
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      });
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      });
    },
  },
});
