# About Game of Wits

This project is an inspiration of mini-games I've played. It is developed with ReactJS.
Currently there is only 1 game in production, but I hope that in the future I can add more after fine-tuning the current game.

## Game 1 : 3D

Number hunt game. A 3-digit number is generated from the digits 1-9 without repeats. Guess the correct digits from clues given within the shortest steps possible!


## Development

1. Fork this repository and checkout to **dev** branch
    ```
    git checkout dev
    ```

2. Make sure you have node and npm installed. Current node engine is 12.18.4, and npm engine is 6.14.6.
    https://www.npmjs.com/get-npm
    
    Afterwards, install the necessary packages.\
    You'll need to run this both within the main project directory (for client) and inside the backend folder (for server).
    ```
    npm install
    ```
    If later on at steps 3 or 4 you encounter issues with missing dependencies, run
    ```
    npm -i <insert missing dependencies>
    ```

3. From the project directory, open 2 terminal tabs and first run the following to start the server
    ```
    cd backend/ && nodemon server.js
    ```
 
4. Then on the second tab, run the following to start react client app
    ```
    npm run start-client
    ```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.\
As we are using nodemon to run the server, any changes made on server.js will automatically refresh it.

## Deployment

This project is deployed on Heroku.

