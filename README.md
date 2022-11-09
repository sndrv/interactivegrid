# interactivegrid
SnapAR interactive grid


This code is dependent on a number of SceneObjects, to be created in the Lens Studio tool. See the screenshot.png image for an overview of items to be created and their connections to the script.js which has to be attached to one of the SceneObjects. In this case: "engine"

The workings of the grid can be changed by setting a "mode". In each mode a number of parameters can be set. 

This first version of the script is optimised to create an interactive scene at a spot where people pass by or stand still briefly. Delay for falling of a ball is set at 1. After 4.5 seconds fallen balls are repositioned back into the grid (and their color is set to invisible, which leaves the collision detection active)

