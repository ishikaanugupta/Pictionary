# A Doodle Drawing And Guessing Game!
Inspired by and designed using Google's [QuickDraw Dataset](https://github.com/googlecreativelab/quickdraw-dataset).

  - A multiclass classifier model (classifying from 10 categories) is deployed in the drawing part of the game. 
  - The guessing part displays sketches stroke by stroke from a MongoDB database (containing 44 categories).

# Setup:

1 Verify you have Nodejs and Python installed.

2 Install Desktop Development with C++.
  * Install (Visual Studio)[https://visualstudio.microsoft.com/downloads/]
  * Open Visual Studio Installer and install Desktop Development with C++ workload.
  * If you have used Visual Studio Installer before, click on Modify and scroll down to find the same. 
  
3 Open the project folder in VS code and in terminal, run 
  * `npm install`
  * `npm rebuild @tensorflow/tfjs-node build-addon-from-source`
  
  * for frontend, run
    - `npm start`
  * for server, run
    - `cd backend`
    - `nodemon server`
    
 Open http://localhost:3000/ and Enjoy the Game!
