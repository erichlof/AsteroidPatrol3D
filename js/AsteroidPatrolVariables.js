// GLOBAL VARIABLES ////////////////////////////////////////////////////////////////////////////

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 3000);
scene.add(camera);
var clock = new THREE.Clock();

var keyboard = new THREEx.KeyboardState();
var joystick = new VirtualJoystick({
	container: document.getElementById("container"),
	mouseSupport: true,
	add2Buttons: true,
	//stationaryBase: true,
	hideJoystick: true,
	//hideButtons: false,
	//baseX: 100,
	//baseY: 250,
	button1X: 320,
	button1Y: 250,
	button2X: 220,
	button2Y: 250
	//limitStickTravel: true,
	//stickRadius: 50	
});
var mouseControl = false;
var canPressM = true;
var controls = new THREEx.FirstPersonControls(camera);
var lookVector = new THREE.Vector3();
var renderer = new THREE.WebGLRenderer({
	antialias: true
});

// Planet
var planetTexture = new THREE.ImageUtils.loadTexture('images/mars.png');
var planetMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(180,100,100)',
	transparent: true,
	map: planetTexture
});
var planetGeometry = new THREE.PlaneGeometry(800, 800);
var planet = new THREE.Mesh(planetGeometry, planetMaterial);
planet.position.x = camera.position.x - 900;
planet.position.y = camera.position.y - 900;
planet.position.z = camera.position.z - 900;
planet.lookAt(camera.position);
scene.add(planet);

// SkyBox
var imagePrefix = "images/skybox/nebula-";
var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
var imageSuffix = ".jpg";
var skyGeometry = new THREE.BoxGeometry( 2900, 2900, 2900 );	

var materialArray = [];
for (var i = 0; i < 6; i++) {
	materialArray.push( new THREE.MeshBasicMaterial({
		color: 'rgb(170,170,200)',
		map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
		side: THREE.BackSide
	}));
}
var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
scene.add( skyBox );



var arenaHalfSize = 400;
var gridLineSpacing = 50;
//calculate small amount to add to gridLineSpacing in order to make all the grid-lines correctly line up,
//even when 2 grid plane sizes may differ slightly from one another.
var gridLineOffset = 1 / (arenaHalfSize / gridLineSpacing);
//offset size by 1 to eliminate z-fighting between arena-cube's edge lines overlapping
var topGrid = new THREE.GridHelper(arenaHalfSize + 1, gridLineSpacing + gridLineOffset);
topGrid.setColors(0x990000, 0x990000);
topGrid.position.y = arenaHalfSize;
scene.add(topGrid);
var bottomGrid = new THREE.GridHelper(arenaHalfSize + 1, gridLineSpacing + gridLineOffset);
bottomGrid.setColors(0x990000, 0x990000);
bottomGrid.position.y = -arenaHalfSize;
scene.add(bottomGrid);
var frontGrid = new THREE.GridHelper(arenaHalfSize, gridLineSpacing);
frontGrid.setColors(0x009900, 0x009900);
frontGrid.position.z = -arenaHalfSize;
frontGrid.rotation.x = Math.PI / 2;
scene.add(frontGrid);
var backGrid = new THREE.GridHelper(arenaHalfSize, gridLineSpacing);
backGrid.setColors(0x009900, 0x009900);
backGrid.position.z = arenaHalfSize;
backGrid.rotation.x = Math.PI / 2;
scene.add(backGrid);
var rightGrid = new THREE.GridHelper(arenaHalfSize + 1, gridLineSpacing + gridLineOffset);
rightGrid.setColors(0x000099, 0x000099);
rightGrid.position.x = arenaHalfSize;
rightGrid.rotation.z = Math.PI / 2;
scene.add(rightGrid);
var leftGrid = new THREE.GridHelper(arenaHalfSize + 1, gridLineSpacing + gridLineOffset);
leftGrid.setColors(0x000099, 0x000099);
leftGrid.position.x = -arenaHalfSize;
leftGrid.rotation.z = Math.PI / 2;
scene.add(leftGrid);

// Grid Generator Pyramids
var pyramidGeometry = new THREE.CylinderGeometry(0,8,24,3,1,false);
pyramidGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI / 2) );
pyramidGeometry.applyMatrix( new THREE.Matrix4().makeRotationZ( Math.PI ) );
var pyramidMaterial = new THREE.MeshPhongMaterial({
	metal: true,
	shading: THREE.FlatShading,
	color: 'rgb(70,70,70)',
	specular: 'rgb(255,255,255)',
	emissive: 'rgb(10,10,10)',
	shininess: 5	
});
//left rear wall generators facing backwards
var pyramid = [];
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
	pyramid[i].position.set(-arenaHalfSize, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset), -arenaHalfSize - 12);
	scene.add(pyramid[i]);
}
//right rear wall generators facing backwards
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
	pyramid[i].position.set(arenaHalfSize, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset), -arenaHalfSize - 12);
	scene.add(pyramid[i]);
}
//var wireframe = new THREE.WireframeHelper(pyramid, 0x222222);
//scene.add(wireframe);

var boxGeometry = new THREE.BoxGeometry(20, 20, 20);
var boxMaterial = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 0,
	color: 'rgb(0,0,0)'
});
var box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
var helper = new THREE.BoxHelper(box);
scene.add(helper);

var asteroidGeometry = new THREE.IcosahedronGeometry(40, 1);//0 for small asteroids
var asteroidMaterial = new THREE.MeshLambertMaterial({
	color: 'rgb(75,45,15)',
	//ambient: 'rgb(55,25,5)',
	emissive: 'rgb(30,15,5)',
	shading: THREE.FlatShading
});
var asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
asteroid.scale.set( 0.7 + (Math.random() * 3 / 10), 0.7 + (Math.random() * 3 / 10), 0.7 + (Math.random() * 3 / 10) );
for ( var i = 0, l = asteroid.geometry.vertices.length; i < l; i++ ) {

	asteroid.geometry.vertices[i].add( new THREE.Vector3( Math.random() * 5 - 2, Math.random() * 5 - 2, Math.random() * 5 - 2 ) );

}
asteroid.geometry.computeFaceNormals();
asteroid.geometry.computeVertexNormals();
asteroid.geometry.verticesNeedUpdate = true;
asteroid.geometry.normalsNeedUpdate = true;
THREE.GeometryUtils.center( asteroid.geometry );
asteroid.geometry.computeBoundingSphere();
scene.add(asteroid);
//var wireframe = new THREE.WireframeHelper(asteroid);
//scene.add(wireframe);

var bulletGeometry = new THREE.SphereGeometry(3);
var bulletMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(255,0,0)'
});
var bulletSphere = new THREE.Mesh(bulletGeometry, bulletMaterial);
scene.add(bulletSphere);

// Sunlight
var sunLight = new THREE.DirectionalLight('rgb(255,255,255)', 1);
sunLight.position.set(-1, 1, 1);
scene.add(sunLight);

// HUD SPRITES
var crossHairsTexture = THREE.ImageUtils.loadTexture('images/crosshairs01.png');
var crossHairsMaterial = new THREE.SpriteMaterial( { map: crossHairsTexture, depthTest: false } );
crossHairsSprite = new THREE.Sprite(crossHairsMaterial);
//move crossHairsSprite back a little so we can see it
crossHairsSprite.position.set(0, 0, -1.5);
//scale the crossHairsSprite
crossHairsSprite.scale.set(0.5, 0.5, 0.5);
//add crossHairsSprite as a child of our camera object, so it will stay in camera's view
camera.add(crossHairsSprite);

var frameTime = 0;
var spriteAngle = 0;
var groundNormal = new THREE.Vector3(0, 1, 0);
var bulletSpeed = 400;
var bulletDirection = new THREE.Vector3(0, 0, -1);
var bulletAlive = false;
//var bulletCounter = 0;
var canShoot = true;
var playingWarpAnimation = false;
var fovIncrementAmount = 600;
var aspectIncrementAmount = -8;


var thrustVector = new THREE.Vector3(0, 0, -1);
var frictionVector = new THREE.Vector3();
var ship = new THREE.Object3D();
var shipSpeed = 0;
var shipVelocity = new THREE.Vector3(0, 0, 0);
var normalizedShipDirection = new THREE.Vector3(0, 0, 0);

var collisionSphere = new THREE.Sphere();
var bulletRay = new THREE.Ray();
var bulletRayCollisionPoint = new THREE.Vector3();
var oldBulletSpherePos = new THREE.Vector3();
var newBulletSpherePos = new THREE.Vector3();
var collisionNormal = new THREE.Vector3();
var asteroidRotationAxis = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
asteroidRotationAxis.normalize();
var asteroidRotationAmount = Math.random() + 0.5;
var asteroidDirection = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
asteroidDirection.normalize();
var asteroidSpeed = Math.random() * 20 + 10;

var debugText1 = document.getElementById("debug1");
var debugText2 = document.getElementById("debug2");
var debugText3 = document.getElementById("debug3");
var debugText4 = document.getElementById("debug4");

THREE.Ray.prototype.intersectSphere = function () {

	// from http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-sphere-intersection/
		
	var v1 = new THREE.Vector3();
		
	return function ( sphere, optionalTarget ) {

		v1.subVectors( sphere.center, this.origin );

		var tca = v1.dot( this.direction );

		var d2 = v1.dot( v1 ) - tca * tca;

		var radius2 = sphere.radius * sphere.radius;
			
		if ( d2 > radius2 ) return null;

		var thc = Math.sqrt( radius2 - d2 );
			
		// t0 = first intersect point - entrance on front of sphere
		var t0 = tca - thc;

		// t1 = second intersect point - exit point on back of sphere
		var t1 = tca + thc;
			
		// test to see if both t0 and t1 are behind the ray - if so, return null
		if ( t0 < 0 && t1 < 0 ) return null;
		
		// test to see if t0 is behind the ray:
		// if it is, the ray is inside the sphere, so return the second exit point scaled by t1,
		// in order to always return an intersect point that is in front of the ray.
		if ( t0 < 0 ) return this.at( t1, optionalTarget );

		// else t0 is in front of the ray, so return the first collision point scaled by t0 
		return this.at( t0, optionalTarget );
			
	};
	
}();

// END GLOBAL VARIABLES /////////////////////////////////////////////////////////////////
