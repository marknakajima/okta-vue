# JWT protected Vue app with Okta


![](https://github.com/marknakajima/public_assets/blob/master/images/okta-vue/gh-logo.png)

A walkthrough on adding secure authentication to a Vue app with Okta in 10 minutes. 

## Sign up for Okta 

Create a free account at Okta and and create application auth logic

- Create a free account at Okta [https://developer.okta.com/signup/](https://developer.okta.com/signup/)
- Login to your new Okta admin and click "Applications", "Add Application" then "Create New App"
- Choose "SPA" for Platform then "Create"
- Application settings
    1. Name : any
    2. Base URIs : http://localhost:8080/
    3. Login redirect URIs : http://localhost:8080/implicit/callback
	4. Logout redirect URIs : http://localhost:8080
	5. Group assignments : Everyone
	6. Grant type allowed : Checkbox checked for "Authorization Code" and "Implicit"
- Note the "Client ID" and "Okta domain" after successful creation of the app logic. We will need to place these variables in our environment variables shortly.


## Create a user and assign them to the app

We will now create a user so that they can login to our secure app

- Log in to your Okta admin page
- Click "Directory" , "People", "Add person"
- Fill in the users basic data and "Save"
- Now we assign this user to have access to the app. Click on the created user then press "Assign Applications". Click on "Assign" next to the app you have just created.

Now this user can access your app after with their email and password at the login screen when spinning up the dev server

## Create .env files to store credentials

Create a .env file in root and set up 2 variables with "Okta domain" and "Client ID"

```
VUE_APP_OKTA_ISSUER={YOUR OKTA DOMAIN}/oauth2/default
VUE_APP_OKTA_CLIENT_ID={YOUR CLIENT ID}
```

## Testing the setup in dev server

Spin up your dev server with `npm run serve`. At the Okta login prompt on screen enter the user's password and id created earlier.  Confirm logging in/out function using the button at the top right corner.

## Illustrations

From [https://undraw.co/illustrations](https://undraw.co/illustrations)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
