# WallApp API

## Getting started

API hosted [here](https://wallapp-api-production.up.railway.app/) via railway

Install Dependencies `npm install`

Start Dev Server `npm run dev`

Run Tests `npm run test`

## Setup Authorizer For User Authentication

Deploy an instance of Authorizer to Heroku [see docs](https://docs.authorizer.dev/deployment/heroku#create-instance) after deploying visit the app to retreive your `AUTH_CLIENT_ID` for your environment variables, use the url of your Heroku app as your `AUTH_URL`.

## Get App Password From Google

This app uses nodemailer to send emails via gmail SMTP. You will need a gmail account with 2-step verification enabled and an app password enabled. [Check out the docs](https://support.google.com/accounts/answer/185833?hl=en) for info on how to do this if neccessary.
if you do not already have one.

## Migrate and Seed Database

run `npx knex migrate:latest` to initiate your migration <br>
run `npx knex seed:run` to seed your database

## Environment variables needed

```
AUTH_URL
AUTH_CLIENT_ID
SITE_URL //localhost:3000
APP_PASSWORD //gmail app password
APP_EMAIL //gmail address
```
