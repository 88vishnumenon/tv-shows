# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Steps to run the application in local system
1.Install all the depedencies from package.json(Yarn add/ npm install).\
2.Run script yarn start / npm start.


## Learn More

### `Tech-Stack of application:`
1.The application does not use any  `UI library` as there was no requirement of  complex elements . The application is built
  using native html components.

2.For making API calls  `axios` has been used . It is not mandatory to use axios ,native browser API fetch can be also used.

3.For mainting data state in front end   `redux` has been used . `Redux toolkit` is used for implementing redux.It was decided to use redux as it is something i am familiar with and also it gives more structure to the data flow.  But other alternatives like zustand , recoil can be also used here.

4.React router dom is used for routing for the application

5.`Jest` and  `React testing lirary` is used for implementing unit test cases for the main components.

6.Node Js version used for development is 16.20.0 and npm version is 8.19.4

5.The folder strucrure is as below.
  
src    
|&nbsp; &nbsp; &nbsp; &nbsp; |---- < components >  |---- component folder |---- components.tsx\
|&nbsp; &nbsp; &nbsp; &nbsp; |---- < servicves >   |---- services.ts\
|&nbsp; &nbsp; &nbsp; &nbsp; |---- < shared >   |---- shared-files.ts\
|&nbsp; &nbsp; &nbsp; &nbsp; |---- < store >   |---- store-files.ts\
|&nbsp; &nbsp; &nbsp; &nbsp; |---- < Types >   |---- types.ts\


## Improvements

1. Implement horizontal lazy load to load shows as and when user scrolls. This will reduce load on the DOM.
2. Increase unit test case coverage.
3. Implement end to end testing using cypress


