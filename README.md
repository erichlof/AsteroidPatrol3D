AsteroidPatrol3D
================

A First-Person 3D version of the classic game Asteroids <br>

[play AsteroidPatrol3D](http://erichlof.github.io/AsteroidPatrol3D/AsteroidPatrol3D.html)
\ [[view main source](https://github.com/erichlof/AsteroidPatrol3D/blob/gh-pages/AsteroidPatrol3D.html)\]

<h5>Be sure to check out my other 3D games!</h5>
* [SpacePong3D](https://github.com/erichlof/SpacePong3D)
* [3dLightCycles](https://github.com/erichlof/3dLightCycles)


<h4>Quick instructions for AsteroidPatrol3D:</h4>
<h6>Desktop:</h6> 
Mouse controls ship rotation <br>
Press 'LeftMouseButton' to Fire <br>
Press 'SPACE' to apply Thrusters <br>

<h6>Mobile:</h6> 
slow Swipe to control ship rotation <br>
Press Orange joystick-button1 to Fire <br>
Press Purple joystick-button2 to apply Thrusters <br>


January 29, 2015 Progress Note
--------------------------------

All TODOs are done!  I cleaned up and compressed the source code, as well as added some comments where I thought they might be helpful.  I may revisit this game from time to time in the future if there is a change to one of the game's dependency libraries or if Chrome/Firefox browser support changes.  But other than that, I'm happy with the outcome.  It has been a great learning experience putting all the pieces of this game together.  What excites me most is that I wrote this source code once and the game should work on almost all devices that have a modern browser and WebGL support (the number of which is climbing every day!): Desktop, Tablet, Smartphones, maybe even consoles in the future, etc...  As for the immediate future, I am already thinking about what the next game will be. When I have something concrete, I will start a new repository here on GitHub and link to it from this page.  In the meantime, please enjoy this game on all your devices and I hope you gain something from looking at the source code.  :)


January 20, 2015 Progress Note
--------------------------------

Sometimes you have to take a step back to move forward :) .  While getting PointerLock (mouse capture) up and running, I discovered a bug in the old camera movement code.  It started out fine, but after a couple of minutes of gameplay, the camera would lock up a little bit, and become less responsive.  This may have been due to the old camera system suffering from Gimbal Lock.  Whatever the case, I decided to rip out all the camera, radar camera, and controls code and start over.  I re-purposed mrdoob's (three.js creator) PointerLock controls code to work on mobile as well - I then renamed it to THREEx.FirstPersonControls.js.  If you have a moment, take a look at mrdoob's short and elegant solution to the problem of 3D camera rotation inside this new file (located in the 'js' directory).  Now that we're back to feature parity (and even a little more because it works great now!), I will work on fine-tuning the level of difficuly as the game progresses.


January 13, 2015 Progress Note
--------------------------------

Added 3D positional sound FX using WebAudio.  I ended up choosing Howler.js for the WebAudio helper library.  As of this date however, Howler.js 2.0 is under Beta development and that is the version I need (which includes WebAudio's 3D stereo panner).  I am currently using the 2.0 branch of Howler.js and everything works great - the sounds surround the player (especially if you wear headphones) giving the feeling you are immersed in the action!  If Howler.js 2.0 undergoes changes before its release, I will change my source copy in '/js/howler.js' here on my repo to make sure everything still works.  Next TODO will be adding a simple button to turn sounds ON/OFF and maybe adjust the volume to preset levels (low, med, high), etc..  I also might investigate capturing/locking the mouse pointer for desktop users so they don't have to look at the mouse pointer all the time while playing the game. 


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
