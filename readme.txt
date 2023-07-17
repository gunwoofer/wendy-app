##Version 16.x de node:
Ubuntu :
sudo apt-get install -y nodejs
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
Windows :
npm install -g node
iwr -Uri https://deb.nodesource.com/setup_16.x -UseBasicParsing | iex
##Installer la version d expo
npm install -g npm@latest
npm install -g @expo/ngrok@^4.1.0

##Installer le gesture handler
npm install react-native-gesture-handler
npx react-native link react-native-gesture-handler

#Lancer l'application
npx expo start --tunnel
