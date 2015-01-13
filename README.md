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

* Add buttons to turn sound on/off and adjust volume
* Slightly increase the difficulty each level (speed of asteroids and UFO)


January 13, 2015 Progress Note
--------------------------------

Added 3D positional sound FX using WebAudio.  I ended up choosing Howler.js for the WebAudio helper library.  As of this date however, Howler.js 2.0 is under Beta development and that is the version I need (which includes WebAudio's 3D stereo panner).  I am currently using the 2.0 branch of howler.js and everything works great - the sounds surround the player (especially if you wear headphones) giving the feeling you are immersed in the action!  If Howler.js 2.0 undergoes changes before its release, I will change my source copy of howler.js here on my repo to make sure everything still works.  Next TODO will be adding a simple button to turn sounds ON/OFF and maybe adjust the volume to preset levels (low, med, high), etc..  I also might investigate capturing/locking the mouse pointer for desktop users so they don't have to look at the mouse pointer all the time while playing the game. 


December 22, 2014 Progress Note
--------------------------------

Completed 'ghost' asteroid warning system behind arena walls.  Now when the player is about to go through a wall and warp to the other side, holographic images of any threatening asteroids are displayed in an orange-red color.  Next up is to add 3D sound effects.  I am still deciding on which WebAudio API sound library to use.  Once sounds are implemented, I'll put some final touches on the game: maybe inside the left-top corner radar HUD, have the close asteroids blink red/white faster and faster as they get closer to the player's ship. Also increase difficulty slightly every level by making UFO and Asteroids a little faster.


December 11, 2014 Progress Note
--------------------------------

The radar mini-cam in the HUD is now complete.  Also, re-worked some of the buttons placement code for mobile devices.  Now the placement of the purple/orange Thrust and Fire buttons is percentage-based and responsive to portrait and landscape modes in mobile devices (it used to be pixel-based and unresponsive).  Next TODO is adding 'ghost' asteroids behind the grid boundaries to warn players before they warp their ship to other side and unknowingly crash into those as-yet-unseen asteroids (as in the portal openings in Valve's game 'Portal', to warn players of what they're stepping into before they teleport). Shortly after I've implemented that, I will add sound FX and some simple html 'button' elements to turn on/off game sounds and adjust the volume to preset levels (low, med, and high).  This game is in the home stretch! :)


November 15, 2014 Progress Note
--------------------------------

Now the player can crash into asteroids and be shot by the UFO saucer.  When player's ship is destroyed, the ships remaining goes down by one and an orbital camera death animation is played for 4 seconds.  Also I added a scoring system that reflects the original arcade: Large Asteroids - 20 points, Medium Asteroids - 50 points, Small Asteroids - 100 points, UFO - 500 points.  Each time the player accumulates 10,000 points, an extra ship/life is rewarded. Next update will have a 2D graphical representation of ships remaining, maybe using the old Atari arcade ship as a bitmap and placing ships remaining all in a row in the corner of the screen.  Also, I'm trying to fine-tune the difficulty progression as the player advances each level.  There should be a balance between too easy (being able to just coast through without dying ever) and too hard (not being able to reach the 1up 10,000 point goal before all ships remaining are depleted).   


October 31, 2014 Progress Note
--------------------------------

Added simple AI to Enemy UFO.  Like the orginal arcade, it appears at random times, navigates a path from one side of the arena to the other, and then disappears.  It shoots laser bullets in random directions.  Its laser bullets can break apart asteroids if they hit them, and the enemy UFO can smash into asteroids if it gets too close.  I also made the laser bullets look like balls of plasma energy.  I achieved this effect by rapidly alternating different-colored textures on transparent square polygons and then rotating the final image always towards the player's camera.  This is also known as 'billboarding'.  Next TODO will be randomly changing the asteroid colors and materials, so that their re-appearance every level seems a little fresher.


October 17, 2014 Progress Note
--------------------------------

Now when asteroids are shot there is a cool explosion effect!  Also, added enemy UFO saucer with a little green alien inside. :) I created the saucer and alien from basic THREE.js primitives such as spheres and cylinders.  Then I sized and scaled these basic shapes to make the end result look right.  Procedurally generating the objects in this way means a faster load time for the game's web page, since the end user doesn't have to download any game models.  For the next update I will give the enemy some simple AI, enough to shoot and navigate a random path through the asteroid arena.  The game will have to test for collisions between the UFO and asteroids/player ship (if he slips up) and the UFO's bullets and asteroids/player (if he aims well enough).


October 7, 2014 Progress Note
--------------------------------

Collision detection and collision response is now working for all sizes of asteroids.  They each have their own bounding spheres and masses so when they collide, it looks pretty realistic!  I put a link to the original game physics book in the source code comments of the html file. Next TODO is to add the UFO flying saucer that can shoot randomly (like the original Asteroids arcade).  Must implement simple path following and detect collisions between the alien craft and asteroids/player and alien bullets and asteroids/player.  Also, I am trying to avoid making players download 3d models, so I must figure out how to procedurally/geometrically generate the alien saucer. Should be fun!
