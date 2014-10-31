AsteroidPatrol3D
================

A First-Person 3D version of the classic game Asteroids <br>

[play AsteroidPatrol3D](http://erichlof.github.io/AsteroidPatrol3D/AsteroidPatrol3D.html)
\ [[view main source](https://github.com/erichlof/AsteroidPatrol3D/blob/gh-pages/AsteroidPatrol3D.html)\]

<h5>Be sure to check out my other 3D games!</h5>
* [SpacePong3D](https://github.com/erichlof/SpacePong3D)


<h4>Quick instructions for AsteroidPatrol3D:</h4>
<h6>Desktop:</h6> 
Press 'M' to rotate your ship with Mouse <br>
Press 'LeftMouseButton' to Fire <br>
Press 'SPACE' to apply Thrusters <br>

<h6>Mobile:</h6> 
slow Swipe to control ship rotation <br>
Press Orange joystick-button1 to Fire <br>
Press Purple joystick-button2 to apply Thrusters <br>


To Do
-----

* Add score to the top of the screen
* Offer '1up' free life when player reaches a certain amount of points
* Add 'ships remaining' in the top corner using simple shapes to represent ships
* Slightly increase the difficulty each level
* Randomly change the Asteroid materials each level so their re-appearance at level start is more fresh feeling
* Possibly add a player ship model and pull the camera back and slightly up, for a 3rd-person playing experience
* Possibly add a radar in the corner of the screen to warn against surrounding asteroids
* Add 3D spatial sound FX to surround the player from all angles


October 31, 2014 Progress Note
--------------------------------

Added simple AI to Enemy UFO.  Like the orginal arcade, it appears at random times, navigates a path from one side of the arena to the other, and then disappears.  It shoots laser bullets in random directions.  Its laser bullets can break apart asteroids if they hit them, and the enemy UFO can smash into asteroids if it gets too close.  I also made the laser bullets look like balls of plasma energy.  I achieved this effect by rapidly alternating different-colored textures on transparent square polygons and then rotating the final image always towards the player's camera.  This is also known as 'billboarding'.  Next TODO will be randomly changing the asteroid colors and materials, so that their re-appearance every level seems a little fresher.


October 17, 2014 Progress Note
--------------------------------

Now when asteroids are shot there is a cool explosion effect!  Also, added enemy UFO saucer with a little green alien inside. :) I created the saucer and alien from basic THREE.js primitives such as spheres and cylinders.  Then I sized and scaled these basic shapes to make the end result look right.  Procedurally generating the objects in this way means a faster load time for the game's web page, since the end user doesn't have to download any game models.  For the next update I will give the enemy some simple AI, enough to shoot and navigate a random path through the asteroid arena.  The game will have to test for collisions between the UFO and asteroids/player ship (if he slips up) and the UFO's bullets and asteroids/player (if he aims well enough).


October 7, 2014 Progress Note
--------------------------------

Collision detection and collision response is now working for all sizes of asteroids.  They each have their own bounding spheres and masses so when they collide, it looks pretty realistic!  I put a link to the original game physics book in the source code comments of the html file. Next TODO is to add the UFO flying saucer that can shoot randomly (like the original Asteroids arcade).  Must implement simple path following and detect collisions between the alien craft and asteroids/player and alien bullets and asteroids/player.  Also, I am trying to avoid making players download 3d models, so I must figure out how to procedurally/geometrically generate the alien saucer. Should be fun!


October 1, 2014 Progress Note
--------------------------------

Asteroids now break apart when shot!  Following the original arcade Asteroids format, Large asteroids break apart into 2 Medium asteroids.  Medium asteroids break apart into 2 Small asteroids.  The chain ends there - once you shoot the Small asteroids, they are completely destroyed.  When all remaining Small asteroids are wiped out, the next level begins with more Large asteroids (of course!) :)  


September 27, 2014 Progress Note
--------------------------------

Now you can rapid-fire multiple shots!  I set the maximum to 30 shots on screen at one time - even the quickest of trigger fingers can't fire more than that and still have the first shot inside the arena.  Plus, this maximum places a limit on the number of loops the program has to perform in order to check for all possible collisions.  This will keep the frame rate smooth, hopefully even after I start adding many different asteroids and the enemy UFO saucer (and his shots to loop through and check for too!).  Next up is to create medium and small size asteroids when you shoot the larger ones.


September 19, 2014 Progress Note
--------------------------------

Added stars that gently move against the background when your ship accelerates.  Developed algorithm to procedurally generate asteroid vertex deformation, so that every asteroid looks slightly different from each other.  In the next update I will add the ability to rapid-fire multiple shots. 
