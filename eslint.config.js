import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([globalIgnores(["src/components/ui/**"])]);
