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
	hideJoystick: true,
	button1X: 320,
	button1Y: 250,
	button2X: 220,
	button2Y: 250
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
	emissive: 'rgb(0,50,0)',
	color: 'rgb(0,255,0)'
});
var box = new THREE.Mesh(boxGeometry, boxMaterial);
box.position.set(-55,0,-250);
box.rotation.y = Math.PI / 3.0;
scene.add(box);

var bulletGeometry = new THREE.SphereGeometry(3,10,10);
var bulletMaterial = new THREE.MeshPhongMaterial({
	emissive: 'rgb(100,0,0)',
	color: 'rgb(255,0,0)'
});
var bulletSphere = new THREE.Mesh(bulletGeometry, bulletMaterial);
scene.add(bulletSphere);

var sunLight = new THREE.DirectionalLight('rgb(255,255,255)', 1);
sunLight.position.set(-1, 1, 0);
scene.add(sunLight);

var domeGeometry = new THREE.SphereGeometry(200,20,20);
var domeMaterial = new THREE.MeshLambertMaterial({
	emissive: 'rgb(0,0,100)',
	wireframe: true,
	color: 'rgb(0,0,255)'
});
var dome = new THREE.Mesh(domeGeometry, domeMaterial);
dome.position.set(0, -10, 0);
scene.add(dome);

var whiteSphereGeometry = new THREE.SphereGeometry(30,20,20);
var whiteSphereMaterial = new THREE.MeshPhongMaterial({
	emissive: 'rgb(20,20,20)',
	color: 'rgb(255,255,255)'
});
var whiteSphere = new THREE.Mesh(whiteSphereGeometry, whiteSphereMaterial);
whiteSphere.position.set(50, 50, -100);
scene.add(whiteSphere);

// FLOOR
var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(10, 10);
var floorMaterial = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 0.5,
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

var collisionSphere1 = new THREE.Sphere();
var collisionSphere2 = new THREE.Sphere();
var bulletRay = new THREE.Ray();
var bulletRayCollisionPoint = new THREE.Vector3();
var savedCollisionPoint = new THREE.Vector3();
var oldBulletSpherePos = new THREE.Vector3();
var newBulletSpherePos = new THREE.Vector3();
var collisionNormal = new THREE.Vector3();
var numberOfCollisions = 0;


// END GLOBAL VARIABLES /////////////////////////////////////////////////////////////////
