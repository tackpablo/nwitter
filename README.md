# Nwitter

A twitter clone used to learn and explore Google Firebase Authentication, Database and Storage.

This app was built based on the tutorial from [NomadCoders](https://nomadcoders.co/).

### Project Learning Outcomes

- Learning to read documentation - using Web version 9
- Google Firebase Authentication Providers
  - Email/Password Login
  - Social Login
    - GMail
    - Github
- Firestore Database
  - NoSQL manipulation
- Firebase Storage
  - File storage (images)
- Increased exposure to ES6 features
  - Nested destructuring
  - Shorthand and spread
- Multiple state management for form values
- Github Pages deployment

### Improvements

- Nweets displayed in chronological order
- Show's user's ID for each nweet
- Styling

### Future improvement ideas

- Show user name for nweets
  - Requires addition of database collection and relationship between authentication provider and nweets
- User photo
  - Need to store photos for each user in Storage
  - Separate from nweet image uploading
- Update non-mobile views
  - Currently optimized for mobile devices
- Profile updates
  - Currently only display name can be changed

# Live Demo

Please visit my app [here](https://tackpablo.github.io/nwitter/) hosted on Github Pages.

## Features

- User authentication
  - Email/Password Login
  - Social Login
    - GMail
    - Github
- User Profile page
- Real time CRUD operations for nweets
- FireStorage for photo storage
  - Using NoSQL
- Firebase Database for nweets
- React frontend for realtime nweets and profile updates

## Stack

- React.js
- Node.js
- HTML/CSS
- Google Firebase
- Git
- Github Pages

# Getting Started

## Setup

1. Clone application:

```sh
git clone git@github.com:tackpablo/nwitter.git <project name>
```

2. Install dependencies

```sh
cd <project name>
```

```sh
npm install --save-dev
```

3. Create Firebase account and a new project to get credentials

- Firebase requires you to have a google account. If you do not have one, please make one at the [google](https://www.google.com/gmail/about/) website under **Create an account**

- Go to the [firebase](https://firebase.google.com/) website and register for an account by clicking **Get started**

- Once registered, go to your firebase console and create a new project. Name it as 'nwitter'

- Once created, add a new app called 'Nwitter' and check the information under the 'Firebase SDK Snippet'

- Make sure to read how firebase storage works, pay attention to the pricing scheme as google may charge you for the amount of data used

4. Create .ENV file in root directory of project

- Copy these lines into .ENV file

```sh
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

- Fill environment variables with credentials obtained from Firebase. Remove double quotes ("") for all values.

- Example (these keys are examples and do not work)

```sh
REACT_APP_API_KEY=IsdAasfSfDF-Gf-49i9aASDJAFsa
REACT_APP_STORAGE_BUCKET=nwitter-65465165161.appspot.com
```

- Don't forget to save

6. Starting the app

- To start app:

```sh
npm run start
```

- This will automatically open a new window, and start the app with http://localhost:3000.
- If it doesn't open a new browser, open http://localhost:3000 to view it in the browser manually.
- The page will reload if you make edits.
- You will also see any lint errors in the console.
