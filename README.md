# davamigo/crazy-tank-driver

This is an API to use in the [Tank Wars serverless camp](https://tankwars.serverless.camp/)

## External Links

* [Serverless camp](https://serverless.camp/)
* [Tank Wars serverless camp](https://tankwars.serverless.camp/)
* [Installing and configuring claudia.js](https://claudiajs.com/tutorials/installing.html)
* [Github: serverlesscamp/tankwars-example-tanks](https://github.com/serverlesscamp/tankwars-example-tanks)

## Installing

To install this tanks to your AWS account, run:

```
$ npm install
````

Then:

```
$ npm start
```

or:

```
$ claudia create --region eu-west-1 --api-module api
```

To update the API, after modifying the code, run:

```
$ npm run deploy
```

or:

```
$ claudia update
```

## Try it live

Use the following URL to try this tank APIs preinstalled, live:

```
https://evjf5dqvfj.execute-api.eu-west-1.amazonaws.com/latest
```

