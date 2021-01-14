# About Game of Wits

This project is an inspiration of mini-games I've played. It is developed with ReactJS.
Currently there is only 1 game in production, but I hope that in the future I can add more after fine-tuning the current game.

## Game 1 : 3D

Number hunt game. A 3-digit number is generated from the digits 1-9 without repeats. Guess the correct digits from clues given within the shortest steps possible!

## Development

1. Fork this repository and checkout to dev branch

2. Open backend/server.js and edit port number on line 2 from 3000 to 3001
    ```javascript
    const port = process.env.PORT || 3001;
    ```

3. Open RoomJoin.jsx and RoomHost.jsx:

    Include "localhost:3001" when initializing socket.io
    ```javascript
    socket.current = socketIOClient("localhost:3001");
    ```

5. From the project directory, open terminal and run the following to start the server
    ```console
    cd backend/ && nodemon server.js
    ```
 
6. Then open a new terminal tab and run the following to start react client app
    ```console
    npm run start-client
    ```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Deployment

This project is deployed on Heroku.

