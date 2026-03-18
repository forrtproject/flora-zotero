/**
 * Unit test setup — provides minimal Zotero global stub
 * Loaded via mocha --require before any test files
 */

const prefs = new Map<string, any>();

(globalThis as any).Zotero = {
  debug: () => {},
  logError: () => {},
  Prefs: {
    get: (key: string) => prefs.get(key),
    set: (key: string, value: any) => prefs.set(key, value),
  },
  HTTP: {
    request: async () => {
      throw new Error("Zotero.HTTP.request not mocked");
    },
  },
};

// Root hook plugin: reset prefs between tests
export const mochaHooks = {
  beforeEach() {
    prefs.clear();
  },
};
