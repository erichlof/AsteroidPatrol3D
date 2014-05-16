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
* Add large containing laser-grid-cube around game arena, that serves as the game boundaries
* If you cross one of these laser-boundaries, you get instantly teleported to the opposite boundary, just like screen-wrap of the original Asteroids game.
* Add asteroids and UFO saucer that can be shot at (and UFO can shoot back!)
* Add Space-themed background SkyBox (maybe just off-Earth or off-Mars, so we can see a planet in the distance)
* Add ability for Asteroids to collide with each other, UFO, and of course your ship
* Add 3D spatial sound FX to surround the player from all angles

May 16, 2014 Progress Note
----------------------------

Implemented collision detection between player missle and asteroid (ported a C++ ray-sphere mathematical algorithm to JavaScript to be added to the core three.js library).  Created low-poly retro-looking asteroid shape that can be randomly scaled/stretched each time the game is started.  Also all asteroids will have their own randomly-picked rotation axis and rotation speed.  Bigger asteroids will rotate slower - smaller asteroids will rotate faster.


April 29, 2014 Progress Note
----------------------------

Mobile controls (cell phone, tablet, etc..) are now working properly, allowing for any combination of multiple button presses and simultaneous joystick movements.  I'm really happy with how the mobile interface is turning out!  When you slow-swipe with your finger, the camera looks around your environment in 3D, just like id software's Quake-mouselook!
