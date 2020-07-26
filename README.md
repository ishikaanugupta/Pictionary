# A Computer V/S Player Doodle Drawing And Guessing Game!
Inspired by and designed using Google's [QuickDraw Dataset](https://github.com/googlecreativelab/quickdraw-dataset).

  - A multiclass classifier model (classifying from 10 categories) is deployed in the drawing part of the game. 
  - The guessing part displays sketches stroke by stroke from a MongoDB database (containing 44 categories).
 
## To run the game:
* For server: 
    - From main directory (Pictionary), go to backend directory using the command `cd backend`
    - After changing the directory, run command `nodemon server`
    
* For react application:
    - run command `npm start`
    - open http://localhost:3000/ in browser and enjoy the game!
