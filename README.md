# Cache hit miss assignment

## Getting Started

### Authentication: This app uses jwt for auth, the token will be expired in one hour by default, Can be set in .env.* file as TOKEN_EXPIRY, Takes argument like 1h, 1m , 1d (refer to jsonwebtoken docs)

### Note: Check if your node and yarn version is compatible with the app from package.json

- `env.local` for development
- `env.production` for production
- Preferably install yarn globally by running `npm i -g yarn`
- Run `yarn` or `yarn install`
- Change the variables in config/.env.* according to your environment
    - like MONGO_URI, or STD_TTL (cache time-to-live)
- Finally, run `yarn start` to start the dev server

---

# Postman Collection

Postman collection can be found in api_docs folder

---

# Cache limit

To set cache max limit change `CACHE_MAX_KEYS` in you .env.* file to your desired number, the default value is 10

---

# Structure

The root file is app.js

### src

- controller
    - [folder]
        - index.js (contains routes callback)
        - router.js (all the routes for specific controller)
- db
    - mongo connection
- errors
    - error handling including null routes
- health
    - just to check if the app is running or not (the routes is {{baseUrl}}/health)
- helpers
    - All the reusable functions, enums will be listed here
- middlewares
    - middlewares for the app like `auth`
- index.js includes the function to set up the app
- routes.js contains all the routes available in the app

# models

Contains mongoose models

# migrations

Contains all the migrations created by `mongo-migrate`
depends on``mongo-migrate-config.js` file