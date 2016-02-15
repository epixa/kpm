# Contributing to kpm

* Clone the kpm repo and move into it

```sh
git clone https://github.com/epixa/kpm.git
cd kpm
```

## CLI

* Make sure your node version is up to date

```sh
cd cli
nvm install "$(cat .nvmrc)"
```

* Install dependencies

```sh
npm install
```


## Server

* Make sure your node version is up to date

```sh
cd server
nvm install "$(cat .nvmrc)"
```

* Install dependencies

```sh
npm install
```

* Run the dev server (will restart automatically on changes)

```sh
npm run dev
```

* Run the server without restarting automatically

```sh
npm start
```

#### config/kpm.dev.js

The primary server config exists in `config/kpm.js`, but it's not optimized
for development environments and likely won't be sufficient out of the box.
When the app environment is "development" (which happens to be the default),
the server will also load configurations from the `config/kpm.dev.js` file if
it exists.

While *any* config can be overwritten with the `config/kpm.dev.js` file, a
recommended config for development would be:

```js
export default {
  databaseUri: 'nedb://memory',
  logFormat: 'dev',
  prettyTemplates: true
};
```
