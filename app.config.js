module.exports = {
  expo: {
    name: "ixxoll-app",
    slug: "ixxoll-app",
    privacy: "unlisted",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./app/assets/icon.png",
    splash: {
      image: "./app/assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#F2F2F2",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      bundleIdentifier: "com.datatech.ixall",
      supportsTablet: false,
    },
    android: {
      package: "com.datatech.ixxallapp",
      adaptiveIcon: {
        foregroundImage: "./app/assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      "eas": {
        "projectId": "d5ef0551-e758-4c35-b532-8ae600481fef"
      },
      dummyData: process.env.dummyData,
    },
    owner: "jinlid",
    slug: "ixxall-app",
    updates: {
      "url": "https://u.expo.dev/d5ef0551-e758-4c35-b532-8ae600481fef"
    },
    "ios": {
      "runtimeVersion": {
        "policy": "sdkVersion"
      }
    },
    plugins: ["sentry-expo"],
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization: "product-marvel",
            project: "ixxall-app",
            authToken: "6xB4u6SaWN2y4SF6cdHQCAs91UZpLOLs_LwgLFFJ",
          },
        },
      ],
    },
  },
  
};
