// jest.config.js

module.exports = {
  preset: "jest-expo",
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|expo-router|native-base|@sentry/.*)",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
