/** @type {import('@capacitor/cli').CapacitorConfig} */
const config = {
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

module.exports = config;
