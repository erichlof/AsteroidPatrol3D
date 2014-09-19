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
* Add multiple asteroids that break apart when shot
* Make explosion effect when asteroids are shot
* allow multiple bullets, by creating an array[] of them
* Asteroids must collide with each other, UFO saucer, and of course your ship
* Add UFO saucer that can be shot at (and UFO can shoot back!)
* Possibly add a player ship model and pull the camera back and slightly up, for a 3rd-person playing experience
* Add 3D spatial sound FX to surround the player from all angles


September 19, 2014 Progress Note
----------------------------

Added stars that gently move against the background when your ship accelerates.  Developed algorithm to procedurally generate asteroid vertex deformation, so that every asteroid looks slightly different from each other.  Next up is to create medium and small size asteroids when you shoot the larger ones.


July 12, 2014 Progress Note
----------------------------

Sorry for the lack of updates - busy summer :) . Added multiple Large asteroids by creating an array[] called largeAsteroids[].  Each asteroid in this group has its own position, speed, rotation, collision bounding-sphere, etc.  Next order of business will be to have the Large asteroids break apart into 2 Medium asteroids, which will each break apart into 2 Small asteroids.  Also asteroid object-creation will be necessary each level (1 or 2 more asteroids added to each new level, to increase difficulty), as well as asteroid object-deletion when an asteroid is shot.


May 30, 2014 Progress Note
----------------------------

Now when the player's ship crosses an arena boundary, a cool 'warp' effect animation is played, and the ship is instantly teleported to the opposite wall of the arena.  This keeps the action tight inside the game arena and feels a lot like the original 2D Asteroids. :)  Eventually when sound effects are added to this game, I will choose a quick 'reverse-cymbal' type sound to accompany this effect.  June 1st: added randomly-chosen rotation axis, speed, and direction of travel for asteroids. When leaving the arena boundaries, asteroids now warp to the other side.
