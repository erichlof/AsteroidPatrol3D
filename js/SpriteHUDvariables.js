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
	color: 'rgb(0,255,0)'
});
var box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

var sphereGeometry = new THREE.SphereGeometry(5);
var sphereMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(255,255,0)'
});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

var bulletGeometry = new THREE.SphereGeometry(5);
var bulletMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(0,0,255)'
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
// crosshairSprite setup
var crosshairTexture = THREE.ImageUtils.loadTexture('images/crosshairs01.png');
var crosshairMaterial = new THREE.SpriteMaterial( { map: crosshairTexture, depthTest: false } );
crosshairSprite = new THREE.Sprite(crosshairMaterial);
//scale the crosshairSprite down in size
crosshairSprite.scale.set(0.2, 0.2, 0.2);
//add crosshairSprite as a child of our camera object, so it will stay centered in camera's view
camera.add(crosshairSprite);
//position sprites by percent X:(100 is all the way to the right, 0 is left, 50 is centered)
//                            Y:(100 is all the way to the top, 0 is bottom, 50 is centered)
var crosshairPercentX = 50;
var crosshairPercentY = 50;
var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;
crosshairSprite.position.x = crosshairPositionX * camera.aspect;
crosshairSprite.position.y = crosshairPositionY;
crosshairSprite.position.z = -1.5;

// redballTexture and Material setup that will be used by all redball Sprites
var redballTexture = THREE.ImageUtils.loadTexture('images/redball.png');
var redballMaterial = new THREE.SpriteMaterial( { map: redballTexture, depthTest: false } );
//redball01Sprite setup
redball01Sprite = new THREE.Sprite(redballMaterial);
redball01Sprite.scale.set(0.3, 0.3, 0.3);
camera.add(redball01Sprite);
var redball01PercentX = 85;
var redball01PercentY = 85;
var redball01PositionX = (redball01PercentX / 100) * 2 - 1;
var redball01PositionY = (redball01PercentY / 100) * 2 - 1;
redball01Sprite.position.x = redball01PositionX * camera.aspect;
redball01Sprite.position.y = redball01PositionY;
redball01Sprite.position.z = -1.5;
//redball02Sprite setup
redball02Sprite = new THREE.Sprite(redballMaterial);
redball02Sprite.scale.set(0.3, 0.3, 0.3);
camera.add(redball02Sprite);
var redball02PercentX = 15;
var redball02PercentY = 15;
var redball02PositionX = (redball02PercentX / 100) * 2 - 1;
var redball02PositionY = (redball02PercentY / 100) * 2 - 1;
redball02Sprite.position.x = redball02PositionX * camera.aspect;
redball02Sprite.position.y = redball02PositionY;
redball02Sprite.position.z = -1.5;
//redball03Sprite setup
redball03Sprite = new THREE.Sprite(redballMaterial);
redball03Sprite.scale.set(0.3, 0.3, 0.3);
camera.add(redball03Sprite);
var redball03PercentX = 15;
var redball03PercentY = 85;
var redball03PositionX = (redball03PercentX / 100) * 2 - 1;
var redball03PositionY = (redball03PercentY / 100) * 2 - 1;
redball03Sprite.position.x = redball03PositionX * camera.aspect;
redball03Sprite.position.y = redball03PositionY;
redball03Sprite.position.z = -1.5;
//redball04Sprite setup
redball04Sprite = new THREE.Sprite(redballMaterial);
redball04Sprite.scale.set(0.3, 0.3, 0.3);
camera.add(redball04Sprite);
var redball04PercentX = 85;
var redball04PercentY = 15;
var redball04PositionX = (redball04PercentX / 100) * 2 - 1;
var redball04PositionY = (redball04PercentY / 100) * 2 - 1;
redball04Sprite.position.x = redball04PositionX * camera.aspect;
redball04Sprite.position.y = redball04PositionY;
redball04Sprite.position.z = -1.5;

var pyramidGeometry = new THREE.TetrahedronGeometry(0.1, 0);
var pyramidMaterial = new THREE.MeshNormalMaterial({
});
var pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
camera.add(pyramid);
var pyramidPercentX = 50;
var pyramidPercentY = 15;
var pyramidPositionX = (pyramidPercentX / 100) * 2 - 1;
var pyramidPositionY = (pyramidPercentY / 100) * 2 - 1;
pyramid.position.x = pyramidPositionX * camera.aspect;
pyramid.position.y = pyramidPositionY;
pyramid.position.z = -1.5;

var frameTime = 0;
var redball01Angle = 0;
var redball02Angle = 0;
var redball04Angle = 0;
var groundNormal = new THREE.Vector3(0, 1, 0);
var bulletSpeed = 400;
var bulletDirection = new THREE.Vector3(0, 0, -1);
var bulletAlive = false;
var canShoot = true;

var thrustVector = new THREE.Vector3(0, 0, -1);
var ship = new THREE.Object3D();
var shipSpeed = 0;
var shipVelocity = new THREE.Vector3(0, 0, 0);
var normalizedShipDirection = new THREE.Vector3(0, 0, 0);
