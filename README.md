## Initial Setup

- Download the application via the .zip download or via git (This is more reccomended)
- If you downloaded the zip and did not use git, extract the zip to a empty folder
- In Visual Studio code, click File > Open Folder and select the root of folder you created
- Once opened, click Terminal at the top of the program and then click New Terminal
- Once the terminal has been created, run the follwing series of commands
- `npm install`
- `npm start`
- This will now open [http://localhost:3000](http://localhost:3000) in your browser
- After this, you should be able to run any of the Available Scripts

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

This will launch cypress. Please read up on cypress [Here](https://docs.cypress.io/guides/getting-started/opening-the-app) 

### `npm test_headless`

This will launch cypress in a headless state where it will automatically run all tests it can find. Please read up on cypress [Here](https://docs.cypress.io/guides/getting-started/opening-the-app) 

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

