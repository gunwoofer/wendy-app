import 'dotenv/config';

export default {
  "expo": {
    "name": "wendy-app",
    "jsEngine": "hermes",
    "slug": "wendy-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "googleServicesFile": "./google-services.json",
      "supportsTablet": true,
      "bundleIdentifier": "com.gunwoofer.wendyapp",
      "config": {
        "imagePicker": {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      }
    },
    "android": {
      "googleServicesFile": "./google-services.json",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.gunwoofer.wendyapp",
      "config": {
        "imagePicker": {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "react-native-auth0",
        {
          "domain": "wendy-app.us.auth0.com",
          "customScheme": "wendy"
        }
      ],
      "expo-image-picker"
    ],
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      "eas": {
        "projectId": "53734999-b99f-4a44-81ac-76384e74fa9d"
      }
    }
  }
}
