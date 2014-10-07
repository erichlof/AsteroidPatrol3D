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
* nothing much, just MAKE A 3D ASTEROIDS GAME FROM SCRATCH! - ha ha :)
* Add UFO saucer that can be shot at (and UFO can shoot back!)
* If player is killed, create algorithm to respawn at a safe location (far enough from current asteroids)
* Make explosion effect when asteroids are shot
* Possibly add a radar in the corner of the screen to warn against surrounding asteroids
* Possibly add a player ship model and pull the camera back and slightly up, for a 3rd-person playing experience
* Add 3D spatial sound FX to surround the player from all angles


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


July 12, 2014 Progress Note
---------------------------

Sorry for the lack of updates - busy summer :) . Added multiple Large asteroids by creating an array[] called largeAsteroids[].  Each asteroid in this group has its own position, speed, rotation, collision bounding-sphere, etc.  Next order of business will be to have the Large asteroids break apart into 2 Medium asteroids, which will each break apart into 2 Small asteroids.  Also asteroid object-creation will be necessary each level (1 or 2 more asteroids added to each new level, to increase difficulty), as well as asteroid object-deletion when an asteroid is shot.
