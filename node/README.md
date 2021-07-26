# Stock Manager

Simple web app to provider manager and projections about stock market

## Requirements

- [**Node.js** 14.15.3](https://nodejs.org) or erlier
- [**NPM** 7.18.1](https://docs.npmjs.com/about-npm) or [**Yarn** 1.23.0](https://classic.yarnpkg.com/en/docs/install/#debian-stable)

## Getting start

### Clone this repo

```bash
git clone https://github.com/victorfernandesraton/hiring.git
```

### Install dependencies using NPM or Yarn

### NPM

```bash
cd ./backend/ && npm install && cd ../frontent && npm install

```

### Yarn

```bash
cd ./backend/ && yarn install && cd ../backend && yarn install
```

## Enviroment variables

Create a file `.env-cmdrc` in backend root directory like this

(Read more about [cross-env end of life](https://github.com/kentcdodds/cross-env/issues/257))

**WARNING:** development , production and test also so refer to abient enviroments, commands like ` test` or `start` shoud be unexpected behavior if `.env-cmdrc` file is not created

**WARNING** backend server write using esm features and esm import pattern

```json
{
  // if you need an api key read this: https://www.alphavantage.co/support/#api-key
  "development": {
    "ALPHA_VANTAGE_API_KEY": "ypur key api",
    "AlPHA_VANTAGE_API_URI": "https://www.alphavantage.co/"
  },
  "production": {
    "ALPHA_VANTAGE_API_KEY": "ypur key api",
    "AlPHA_VANTAGE_API_URI": "https://www.alphavantage.co/"
  },
  "test": {
    "ALPHA_VANTAGE_API_KEY": "ypur key api",
    "AlPHA_VANTAGE_API_URI": "https://www.alphavantage.co/"
  }
}
```
## Frontend app

```bash
cd frontend && npm install
npm run dev
```
