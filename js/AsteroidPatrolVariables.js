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

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	//camera.fov = 1000 * (camera.aspect * 0.01);
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	controls.handleResize();
			
	//crossHairsSprite.position.x = spritePositionX * camera.aspect;
	//crossHairsSprite.position.y = spritePositionY;
			
}

// SkyBox
var imagePrefix = "images/skybox/nebula-";
var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
var imageSuffix = ".jpg";
var skyGeometry = new THREE.BoxGeometry( 2900, 2900, 2900 );	

var materialArray = [];
for (var i = 0; i < 6; i++) {
	materialArray.push( new THREE.MeshBasicMaterial({
		color: 'rgb(230,230,255)',
		map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
		side: THREE.BackSide
	}));
}
var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
scene.add( skyBox );
/*
// stars
var i, r = 2500, vertex, s, starsGeometry = [ new THREE.Geometry(), new THREE.Geometry() ];

for ( i = 0; i < 250; i ++ ) {

	vertex = new THREE.Vector3();
	vertex.x = Math.random() * 2 - 1;
	vertex.y = Math.random() * 2 - 1;
	vertex.z = Math.random() * 2 - 1;
	vertex.multiplyScalar( r );
	//stars must stay outside the arena
	if(Math.abs(vertex.x) < 1000 && Math.abs(vertex.y) < 1000 && Math.abs(vertex.z) < 1000)
		continue;
	
	starsGeometry[ 0 ].vertices.push( vertex );

}

for ( i = 0; i < 1500; i ++ ) {

	vertex = new THREE.Vector3();
	vertex.x = Math.random() * 2 - 1;
	vertex.y = Math.random() * 2 - 1;
	vertex.z = Math.random() * 2 - 1;
	vertex.multiplyScalar( r );
	
	//stars must stay outside the arena
	if(Math.abs(vertex.x) < 1000 && Math.abs(vertex.y) < 1000 && Math.abs(vertex.z) < 1000)
		continue;
	
	starsGeometry[ 1 ].vertices.push( vertex ); //else

}

var stars;
var starsMaterials = [
	new THREE.PointCloudMaterial( { color: 0xdddddd, size: 1, sizeAttenuation: false } ),
	new THREE.PointCloudMaterial( { color: 0xdddddd, size: 1, sizeAttenuation: false } ),
	new THREE.PointCloudMaterial( { color: 0xaaaaaa, size: 1, sizeAttenuation: false } ),
	new THREE.PointCloudMaterial( { color: 0xaaaaaa, size: 1, sizeAttenuation: false } ),
	new THREE.PointCloudMaterial( { color: 0x777777, size: 1, sizeAttenuation: false } ),
	new THREE.PointCloudMaterial( { color: 0x777777, size: 1, sizeAttenuation: false } )
];

for ( i = 10; i < 30; i ++ ) {

	stars = new THREE.PointCloud( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );

	stars.rotation.x = Math.random() * 6;
	stars.rotation.y = Math.random() * 6;
	stars.rotation.z = Math.random() * 6;

	//s = i * 10;
	//stars.scale.set( s, s, s );

	stars.matrixAutoUpdate = false;
	stars.updateMatrix();

	scene.add( stars );

}

*/
// stars
var i, r = 2500, vertex, s, starsGeometry = new THREE.Geometry();

for ( i = 0; i < 1500; i ++ ) {

	vertex = new THREE.Vector3();
	vertex.x = Math.random() * 2 - 1;
	vertex.y = Math.random() * 2 - 1;
	vertex.z = Math.random() * 2 - 1;
	vertex.multiplyScalar( r );
	
	//stars must stay outside the arena
	if(Math.abs(vertex.x) < 1000 && Math.abs(vertex.y) < 1000 && Math.abs(vertex.z) < 1000)
		continue;
	
	else starsGeometry.vertices.push( vertex ); //else

}

var stars;
var starsMaterials = [
	new THREE.PointCloudMaterial( { color: 0xdddddd, size: 1, sizeAttenuation: false } ),
	new THREE.PointCloudMaterial( { color: 0xdddddd, size: 1, sizeAttenuation: false } ),
	new THREE.PointCloudMaterial( { color: 0xaaaaaa, size: 1, sizeAttenuation: false } ),
	new THREE.PointCloudMaterial( { color: 0xaaaaaa, size: 1, sizeAttenuation: false } ),
	new THREE.PointCloudMaterial( { color: 0x777777, size: 1, sizeAttenuation: false } ),
	new THREE.PointCloudMaterial( { color: 0x777777, size: 1, sizeAttenuation: false } )
];

for ( i = 0; i < 10; i ++ ) {

	stars = new THREE.PointCloud( starsGeometry, starsMaterials[ i % 6 ] );

	stars.rotation.x = Math.random() * 6;
	stars.rotation.y = Math.random() * 6;
	stars.rotation.z = Math.random() * 6;

	stars.matrixAutoUpdate = false;
	stars.updateMatrix();

	scene.add( stars );

}


// Planet
var planetTexture = new THREE.ImageUtils.loadTexture('images/mars.png');
var planetMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(200,120,100)',
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
var pyramidTowardsGeometry = new THREE.CylinderGeometry(0,8,24,3,1,false);
var pyramidAwayGeometry = new THREE.CylinderGeometry(0,8,24,3,1,false);
var pyramidLeftGeometry = new THREE.CylinderGeometry(0,8,24,3,1,false);
var pyramidRightGeometry = new THREE.CylinderGeometry(0,8,24,3,1,false);
var pyramidDownGeometry = new THREE.CylinderGeometry(0,8,24,3,1,false);
var pyramidUpGeometry = new THREE.CylinderGeometry(0,8,24,3,1,false);
//facing towards us
pyramidTowardsGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2) );
pyramidTowardsGeometry.applyMatrix( new THREE.Matrix4().makeRotationY( Math.PI ) );
pyramidTowardsGeometry.applyMatrix( new THREE.Matrix4().makeRotationZ( Math.PI / 2 ) );
//facing away from us
pyramidAwayGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2) );
pyramidAwayGeometry.applyMatrix( new THREE.Matrix4().makeRotationZ( -Math.PI / 2) );
//facing left
pyramidLeftGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI ) );
pyramidLeftGeometry.applyMatrix( new THREE.Matrix4().makeRotationZ( -Math.PI / 2) );
//facing right
pyramidRightGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI / 2) );
pyramidRightGeometry.applyMatrix( new THREE.Matrix4().makeRotationZ( -Math.PI / 2 ) );
pyramidRightGeometry.applyMatrix( new THREE.Matrix4().makeRotationY( -Math.PI / 2) );
//facing down
pyramidDownGeometry.applyMatrix( new THREE.Matrix4().makeRotationX( -Math.PI ) );
pyramidDownGeometry.applyMatrix( new THREE.Matrix4().makeRotationY( -Math.PI / 2) );
//facing up
pyramidUpGeometry.applyMatrix( new THREE.Matrix4().makeRotationY( -Math.PI / 2) );

var pyramidMaterial = new THREE.MeshLambertMaterial({
	//metal: true,
	//shading: THREE.FlatShading,
	//shininess: 10,
	//specular: 'rgb(105,105,105)',
	//emissive: 'rgb(0,0,0)'
	color: 'rgb(30,30,30)'
});

var pyramid = [];
//left back wall generators facing right
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidRightGeometry, pyramidMaterial);
	pyramid[i].position.set(-arenaHalfSize - 12, (-arenaHalfSize) + i * (gridLineSpacing), -arenaHalfSize);
	scene.add(pyramid[i]);
}
//left front wall generators facing away from us
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidAwayGeometry, pyramidMaterial);
	pyramid[i].position.set(-arenaHalfSize, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset), arenaHalfSize + 12);
	scene.add(pyramid[i]);
}
//right back wall generators facing towards us
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidTowardsGeometry, pyramidMaterial);
	pyramid[i].position.set(arenaHalfSize, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset), -arenaHalfSize - 12);
	scene.add(pyramid[i]);
}
//right front wall generators facing left
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidLeftGeometry, pyramidMaterial);
	pyramid[i].position.set(arenaHalfSize + 12, (-arenaHalfSize) + i * (gridLineSpacing), arenaHalfSize);
	scene.add(pyramid[i]);
}
//left bottom wall generators facing right
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidRightGeometry, pyramidMaterial);
	pyramid[i].position.set(-arenaHalfSize - 12, -arenaHalfSize, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset) );
	pyramid[i].rotateX(-Math.PI / 2);
	scene.add(pyramid[i]);
}
//right bottom wall generators facing up
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidUpGeometry, pyramidMaterial);
	pyramid[i].position.set(arenaHalfSize, -arenaHalfSize - 12, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset) );
	scene.add(pyramid[i]);
}
//right top wall generators facing left
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidLeftGeometry, pyramidMaterial);
	pyramid[i].position.set(arenaHalfSize + 12, arenaHalfSize, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset) );
	pyramid[i].rotateX(-Math.PI / 2);
	scene.add(pyramid[i]);
}
//left top wall generators facing down
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidDownGeometry, pyramidMaterial);
	pyramid[i].position.set(-arenaHalfSize, arenaHalfSize + 12, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset) );
	scene.add(pyramid[i]);
}
//top back wall generators facing down
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidDownGeometry, pyramidMaterial);
	pyramid[i].position.set( (-arenaHalfSize) + i * (gridLineSpacing), arenaHalfSize + 12, -arenaHalfSize );
	pyramid[i].rotateY(-Math.PI / 2);
	scene.add(pyramid[i]);
}
//bottom back wall generators facing towards us
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidTowardsGeometry, pyramidMaterial);
	pyramid[i].position.set( (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset), -arenaHalfSize , -arenaHalfSize - 12);
	pyramid[i].rotateZ(-Math.PI / 2);
	scene.add(pyramid[i]);
}
//bottom front wall generators facing up
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidUpGeometry, pyramidMaterial);
	pyramid[i].position.set( (-arenaHalfSize) + i * (gridLineSpacing), -arenaHalfSize - 12 , arenaHalfSize );
	pyramid[i].rotateY(-Math.PI / 2);
	scene.add(pyramid[i]);
}
//top back wall generators facing away from us
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidAwayGeometry, pyramidMaterial);
	pyramid[i].position.set( (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset), arenaHalfSize , arenaHalfSize + 12);
	pyramid[i].rotateZ(-Math.PI / 2);
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

var numberOfLargeAsteroids = 10;
var largeAsteroids = [];
var collisionSpheres = [];
var asteroidMaterial = new THREE.MeshLambertMaterial({
	color: 'rgb(75,45,15)',
	//ambient: 'rgb(55,25,5)',
	emissive: 'rgb(30,15,5)',
	shading: THREE.FlatShading
});

var largeAsteroidGeometry = new THREE.IcosahedronGeometry(40, 1);//0 for small asteroids
var lvLength = largeAsteroidGeometry.vertices.length;
var deformVec = new THREE.Vector3();

for (var i = 0; i < numberOfLargeAsteroids; i++) {

	largeAsteroidGeometry = new THREE.IcosahedronGeometry(40, 1);//0 for small asteroids
	
	for (var v = 0; v < lvLength; v++) {	
		deformVec.set(Math.random() * 10, Math.random() * 10, Math.random() * 10);
		largeAsteroidGeometry.vertices[v].add(deformVec);
	}
	
	largeAsteroids[i] = new THREE.Mesh(largeAsteroidGeometry, asteroidMaterial);
	largeAsteroids[i].scale.set( 0.7 + (Math.random() * 3 / 10), 0.7 + (Math.random() * 3 / 10), 0.7 + (Math.random() * 3 / 10) );
	
	largeAsteroids[i].geometry.computeFaceNormals();
	largeAsteroids[i].geometry.computeVertexNormals();
	largeAsteroids[i].geometry.verticesNeedUpdate = true;
	largeAsteroids[i].geometry.normalsNeedUpdate = true;
	largeAsteroids[i].geometry.center();
	largeAsteroids[i].geometry.computeBoundingSphere();
	scene.add(largeAsteroids[i]);
	
	largeAsteroids[i].rotationAxis = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
	largeAsteroids[i].rotationAxis.normalize();
	largeAsteroids[i].rotationAmount = Math.random() + 0.5;
	largeAsteroids[i].direction = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
	largeAsteroids[i].direction.normalize();
	largeAsteroids[i].speed = Math.random() * 20 + 10;
	
	collisionSpheres[i] = new THREE.Sphere();
}
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

var bulletRay = new THREE.Ray();
var bulletRayCollisionPoint = new THREE.Vector3();
var oldBulletSpherePos = new THREE.Vector3();
var newBulletSpherePos = new THREE.Vector3();
var collisionNormal = new THREE.Vector3();


var debugText1 = document.getElementById("debug1");
var debugText2 = document.getElementById("debug2");
var debugText3 = document.getElementById("debug3");
var debugText4 = document.getElementById("debug4");


// END GLOBAL VARIABLES /////////////////////////////////////////////////////////////////
