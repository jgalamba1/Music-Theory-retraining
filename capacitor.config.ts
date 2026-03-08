import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.musictheoryprogram.app",
  appName: "Music Theory Program",
  webDir: "dist",
  android: {
    backgroundColor: "#18253d",
    allowMixedContent: false,
  },
  plugins: {
    Keyboard: {
      resize: "body",
      style: "dark",
    },
  },
};

export default config;
