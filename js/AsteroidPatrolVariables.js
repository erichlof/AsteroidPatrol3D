// GLOBAL VARIABLES ////////////////////////////////////////////////////////////////////////////
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 2000);
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

var boxGeometry = new THREE.BoxGeometry(20, 20, 20);
var boxMaterial = new THREE.MeshLambertMaterial({
	color: 'rgb(0,255,0)'
});
var box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

var sphereGeometry = new THREE.SphereGeometry(10);
var sphereMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(255,255,0)'
});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

var bulletGeometry = new THREE.SphereGeometry(3);
var bulletMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(255,0,0)'
});
var bulletSphere = new THREE.Mesh(bulletGeometry, bulletMaterial);
scene.add(bulletSphere);

var light = new THREE.PointLight('rgb(255,255,255)', 1, 0);
scene.add(light);

// FLOOR
var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(10, 10);
var floorMaterial = new THREE.MeshBasicMaterial({
	map: floorTexture,
	side: THREE.DoubleSide
});
var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -10;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

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
var bulletSpeed = 200;
var bulletDirection = new THREE.Vector3(0, 0, -1);
var bulletAlive = false;
//var bulletCounter = 0;
var canShoot = true;


var thrustVector = new THREE.Vector3(0, 0, -1);
var ship = new THREE.Object3D();
var shipSpeed = 0;
var shipVelocity = new THREE.Vector3(0, 0, 0);
var normalizedShipDirection = new THREE.Vector3(0, 0, 0);

var debugText1 = document.getElementById("debug1");
var debugText2 = document.getElementById("debug2");
var debugText3 = document.getElementById("debug3");
var debugText4 = document.getElementById("debug4");

THREE.Ray.prototype.intersectSphere = function ( sphere, optionalTarget ) {

	// from http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-sphere-intersection/
	var L = new THREE.Vector3();
	var radius = sphere.radius;
	var radius2 = radius * radius;
	
	L.subVectors( sphere.center, this.origin );
	
	var tca = L.dot( this.direction );
	
	if ( tca < 0 ) {
		
		return null;
		
	}
	
	var d2 = L.dot( L ) - tca * tca;
	
	if ( d2 > radius2 ) {
		
		return null;
		
	}
	
	var thc = Math.sqrt( radius2 - d2 );
	// t0 = first collision point entrance on front of sphere
	var t0 = tca - thc;
	
	// t1 = exit point on back of sphere.  Rarely needed, so it is commented out
	// var t1 = tca + thc; 
	
	// Now return the THREE.Vector3() location (collision point) of this Ray,
	//   scaled by amount t0 along Ray.direction  
	// This collision point will always be located somewhere on the mesh's boundingSphere
	return this.at( t0, optionalTarget );
	
};

var collisionSphere = new THREE.Sphere();
var bulletRay = new THREE.Ray();
var bulletRayCollisionPoint = new THREE.Vector3();
var oldBulletSpherePos = new THREE.Vector3();
var newBulletSpherePos = new THREE.Vector3();
var collisionNormal = new THREE.Vector3();

// END GLOBAL VARIABLES /////////////////////////////////////////////////////////////////
