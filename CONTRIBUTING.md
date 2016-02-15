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

#### Uploading archives (AWS S3)

Archive uploads for plugin versions are streamed to an AWS S3 bucket. You will
need to configure the name of a bucket that you have write access to. There is
no mechanism built into the server itself to configure AWS credentials -
instead, you should take advantage of the [Shared Credentials](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_the_Shared_Credentials_File_____aws_credentials_)
method as described by the official AWS SDK documentation. The `default`
[profile](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Using_Profiles_with_the_SDK)
is used if no custom profile is configured.

You can specify the S3 bucket and profile in your `config/kpm.dev.js`:

```js
export default {
  // ... the rest of your dev config
  s3: { bucket: 'custombucket', profile: 'customprofile' }
};
```
