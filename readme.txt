##Version 16.x de node:
sudo apt-get install -y nodejs
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
##installer la version d expo
npm install -g npm@latest
npm install -g @expo/ngrok@^4.1.0

npm install react-native-gesture-handler
npx react-native link react-native-gesture-handler
