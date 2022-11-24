# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположите в директории `backend/`, а фронтенд - в `frontend/`.

#### Запуск:
frontend:
```
cd frontend
npm run start
```
backend:
```
cd backend
npm run start
```

#### Зависимости:
frontend:
```
"dependencies": {
    "@testing-library/jest-dom": "^5.16.4",
    "@testing-library/react": "^13.3.0",
    "@testing-library/user-event": "^13.5.0",
    "core-js": "^3.23.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.3.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "@babel/core": "^7.18.6",
    "@babel/preset-env": "^7.18.6",
    "autoprefixer": "^10.4.7",
    "babel-loader": "^8.2.5",
    "clean-webpack-plugin": "^4.0.0",
    "css-loader": "^6.7.1",
    "cssnano": "^5.1.12",
    "eslint": "^8.23.1",
    "eslint-plugin-react": "^7.31.8",
    "html-webpack-plugin": "^5.5.0",
    "mini-css-extract-plugin": "^2.6.1",
    "postcss-loader": "^7.0.0",
    "webpack": "^5.73.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.9.2"
  }
```
backend:
```
"devDependencies": {
    "eslint": "^8.22.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.26.0",
    "nodemon": "^2.0.19"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.0",
    "celebrate": "^15.0.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.2",
    "express": "^4.18.1",
    "express-winston": "^4.2.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.5.2",
    "validator": "^13.7.0",
    "winston": "^3.8.2"
  }
```