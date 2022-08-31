# WallApp API

## Getting started

Start Dev Server

`npm run dev`

Run Tests

`npm run test`

## Setup Authorizer For User Authentication

Deploy an instance of Authorizer to Heroku [see docs](https://docs.authorizer.dev/deployment/heroku#create-instance) after deploying visit the app to retreive your `AUTH_URL` and `AUTH_CLIENT_ID` for your environment variables

## Setup Sendgrid

Firt you will need to [create a free account](https://signup.sendgrid.com/)
if you do not already have one. Next you will [create an api key](https://app.sendgrid.com/guide/integrate/langs/nodejs)
after creating an api key you must [verify sender email address](https://app.sendgrid.com/settings/sender_auth) to prove ownership of your email account

## Provision a Postgres Database

you will need a development data base and a test dabse, you can set this up locally or via a [free railway account](https://railway.app/), if you setup your databse locally you may need to reconfigure the knexfile.js [see docs](https://knexjs.org/guide/migrations.html#basic-configuration)

### Environment variables needed

```
AUTH_URL
AUTH_CLIENT_ID
SITE_URL //localhost:3000
SENDGRID_API_KEY
VERIFIED_SENDER_EMAIL
DATABASE_URI
TEST_DATABASE_URI=
```
