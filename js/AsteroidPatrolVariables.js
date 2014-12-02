/*
// GLOBAL VARIABLES
*/

var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var SCREEN_WIDTH_DIV_BY_FOUR = SCREEN_WIDTH / 4;
var SCREEN_HEIGHT_DIV_BY_FOUR = SCREEN_HEIGHT / 4;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(65, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000);
scene.add(camera);
var radarScene = new THREE.Scene();
var camera2 = new THREE.PerspectiveCamera(65, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 3000);
radarScene.add(camera2);

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

renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
document.getElementById("container").appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize, false);
var fontAspect = 0;

var livesRemaining = 2;

function onWindowResize() {
	
	SCREEN_WIDTH = window.innerWidth;
	SCREEN_HEIGHT = window.innerHeight;
	
	SCREEN_WIDTH_DIV_BY_FOUR = SCREEN_WIDTH / 4;
	SCREEN_HEIGHT_DIV_BY_FOUR = SCREEN_HEIGHT / 4;
	
	fontAspect = (SCREEN_WIDTH / 175) * (SCREEN_HEIGHT / 200);
	if (fontAspect > 20) fontAspect = 20;
	if (fontAspect < 5) fontAspect = 5;
	
	fontAspect *= 2;
	document.getElementById("score").style.fontSize = fontAspect + "px";
	fontAspect *= 3;
	document.getElementById("level").style.fontSize = fontAspect + "px";
	document.getElementById("gameover").style.fontSize = fontAspect + "px";
	
	sunUniforms.resolution.value.x = SCREEN_WIDTH;
	sunUniforms.resolution.value.y = SCREEN_HEIGHT;
	explosionBillboardUniforms.resolution.value.x = SCREEN_WIDTH;
	explosionBillboardUniforms.resolution.value.y = SCREEN_HEIGHT;
	
	camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();
	camera2.aspect = SCREEN_WIDTH_DIV_BY_FOUR / SCREEN_HEIGHT_DIV_BY_FOUR;
	camera2.updateProjectionMatrix();
	
	//update HUD Sprites X positions
	crossHairsSprite.position.x = crosshairPositionX * camera.aspect;
	tempPercent = 93;//93
	for (var i = 0; i < livesRemaining; i++) {    //93
		livesRemainingPercentX[i] = tempPercent;
		//each shipRemaining icon moves 4 units to the left
		tempPercent -= 6 - ( SCREEN_WIDTH * 0.002 );
		livesRemainingPositionX[i] = (livesRemainingPercentX[i] / 100) * 2 - 1;
		livesRemainingSprites[i].position.x = livesRemainingPositionX[i] * camera.aspect;
	}

	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	controls.handleResize();
			
}

// GAME SCENE OBJECTS ///////////////////////////////////////////////////////////////////////////////

// SkyBox
var imagePrefix = "images/skybox/nebula-";
var directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
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

	stars.updateMatrix();
	stars.matrixAutoUpdate = false;

	scene.add( stars );

}


// Planet
var planetTexture = new THREE.ImageUtils.loadTexture('images/mars.png');
var planetMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(200,120,100)',
	transparent: true,
	map: planetTexture
});
var planetGeometry = new THREE.PlaneBufferGeometry(800, 800);
var planet = new THREE.Mesh(planetGeometry, planetMaterial);
planet.position.copy(camera.position).addScalar(-900);
planet.lookAt(camera.position);
scene.add(planet);

// Sun
var sunGeometry = new THREE.PlaneBufferGeometry(1200, 1200);
var sunUniforms = {
	time: { type: "f", value: 1.0 },
	resolution: { type: "v2", value: new THREE.Vector2(SCREEN_WIDTH, SCREEN_HEIGHT) }
};	
var sunMaterial = new THREE.ShaderMaterial( {
	transparent: true,
	uniforms: sunUniforms,
	vertexShader: document.getElementById( 'SunVertexShader' ).textContent,
	fragmentShader: document.getElementById( 'SunFragmentShader' ).textContent
} );
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(-700, 700, 700);
sun.lookAt(scene.position);
scene.add(sun);

// Explosion Billboards
var explosionBillboardGeometry = new THREE.PlaneBufferGeometry(1, 1);
var explosionBillboardUniforms = {
	time: { type: "f", value: 1.0 },
	resolution: { type: "v2", value: new THREE.Vector2(SCREEN_WIDTH, SCREEN_HEIGHT) },
	explosionTransparency: { type: "f", value: 1.0 }
};	
var explosionBillboardMaterial = new THREE.ShaderMaterial( {
	transparent: true,
	uniforms: explosionBillboardUniforms,
	vertexShader: document.getElementById( 'ExplosionVertexShader' ).textContent,
	fragmentShader: document.getElementById( 'ExplosionFragmentShader' ).textContent
} );
var explosionBillboard = new THREE.Mesh(explosionBillboardGeometry, explosionBillboardMaterial);
explosionBillboard.visible = false;
scene.add(explosionBillboard);


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
	color: 'rgb(30,30,30)'
});

var pyramid = [];
//left back wall generators facing right
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidRightGeometry, pyramidMaterial);
	pyramid[i].position.set(-arenaHalfSize - 12, (-arenaHalfSize) + i * (gridLineSpacing), -arenaHalfSize);
	scene.add(pyramid[i]);
	pyramid[i].updateMatrix();
	pyramid[i].matrixAutoUpdate = false;
}
//left front wall generators facing away from us
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidAwayGeometry, pyramidMaterial);
	pyramid[i].position.set(-arenaHalfSize, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset), arenaHalfSize + 12);
	scene.add(pyramid[i]);
	pyramid[i].updateMatrix();
	pyramid[i].matrixAutoUpdate = false;
}
//right back wall generators facing towards us
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidTowardsGeometry, pyramidMaterial);
	pyramid[i].position.set(arenaHalfSize, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset), -arenaHalfSize - 12);
	scene.add(pyramid[i]);
	pyramid[i].updateMatrix();
	pyramid[i].matrixAutoUpdate = false;
}
//right front wall generators facing left
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidLeftGeometry, pyramidMaterial);
	pyramid[i].position.set(arenaHalfSize + 12, (-arenaHalfSize) + i * (gridLineSpacing), arenaHalfSize);
	scene.add(pyramid[i]);
	pyramid[i].updateMatrix();
	pyramid[i].matrixAutoUpdate = false;
}
//left bottom wall generators facing right
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidRightGeometry, pyramidMaterial);
	pyramid[i].position.set(-arenaHalfSize - 12, -arenaHalfSize, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset) );
	pyramid[i].rotateX(-Math.PI / 2);
	scene.add(pyramid[i]);
	pyramid[i].updateMatrix();
	pyramid[i].matrixAutoUpdate = false;
}
//right bottom wall generators facing up
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidUpGeometry, pyramidMaterial);
	pyramid[i].position.set(arenaHalfSize, -arenaHalfSize - 12, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset) );
	scene.add(pyramid[i]);
	pyramid[i].updateMatrix();
	pyramid[i].matrixAutoUpdate = false;
}
//right top wall generators facing left
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidLeftGeometry, pyramidMaterial);
	pyramid[i].position.set(arenaHalfSize + 12, arenaHalfSize, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset) );
	pyramid[i].rotateX(-Math.PI / 2);
	scene.add(pyramid[i]);
	pyramid[i].updateMatrix();
	pyramid[i].matrixAutoUpdate = false;
}
//left top wall generators facing down
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidDownGeometry, pyramidMaterial);
	pyramid[i].position.set(-arenaHalfSize, arenaHalfSize + 12, (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset) );
	scene.add(pyramid[i]);
	pyramid[i].updateMatrix();
	pyramid[i].matrixAutoUpdate = false;
}
//top back wall generators facing down
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidDownGeometry, pyramidMaterial);
	pyramid[i].position.set( (-arenaHalfSize) + i * (gridLineSpacing), arenaHalfSize + 12, -arenaHalfSize );
	pyramid[i].rotateY(-Math.PI / 2);
	scene.add(pyramid[i]);
	pyramid[i].updateMatrix();
	pyramid[i].matrixAutoUpdate = false;
}
//bottom back wall generators facing towards us
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidTowardsGeometry, pyramidMaterial);
	pyramid[i].position.set( (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset), -arenaHalfSize , -arenaHalfSize - 12);
	pyramid[i].rotateZ(-Math.PI / 2);
	scene.add(pyramid[i]);
	pyramid[i].updateMatrix();
	pyramid[i].matrixAutoUpdate = false;
}
//bottom front wall generators facing up
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidUpGeometry, pyramidMaterial);
	pyramid[i].position.set( (-arenaHalfSize) + i * (gridLineSpacing), -arenaHalfSize - 12 , arenaHalfSize );
	pyramid[i].rotateY(-Math.PI / 2);
	scene.add(pyramid[i]);
	pyramid[i].updateMatrix();
	pyramid[i].matrixAutoUpdate = false;
}
//top back wall generators facing away from us
for (var i = 0; i < 17; i++) {
	pyramid[i] = new THREE.Mesh(pyramidAwayGeometry, pyramidMaterial);
	pyramid[i].position.set( (-arenaHalfSize - 1) + i * (gridLineSpacing + gridLineOffset), arenaHalfSize , arenaHalfSize + 12);
	pyramid[i].rotateZ(-Math.PI / 2);
	scene.add(pyramid[i]);
	pyramid[i].updateMatrix();
	pyramid[i].matrixAutoUpdate = false;
}
//var wireframe = new THREE.WireframeHelper(pyramid, 0x222222);
//scene.add(wireframe);

var boxGeometry = new THREE.BoxGeometry(800, 800, 800);
var boxMaterial = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 0,
	color: 'rgb(0,0,0)'
});

var box = new THREE.Mesh(boxGeometry, boxMaterial);
radarScene.add(box);
var boxHelper = new THREE.BoxHelper(box); //TODO set color using new BoxHelper's constructor
radarScene.add(boxHelper);

//test radar mini-cam objects
var shipSphereGeometry = new THREE.SphereGeometry(20,6,6);
var shipSphereMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(255,255,255)',
	wireframe: true
});
var shipSphere = new THREE.Mesh(shipSphereGeometry, shipSphereMaterial);
radarScene.add(shipSphere);

var level = 0;
var placingShip = true;
var placingLargeAsteroids = true;
var numberOfLargeAsteroids = 0;
var numberOfLargeAsteroidsCreated = 0;
var numberOfMediumAsteroids = 0;
var numberOfSmallAsteroids = 0;
var largeAsteroids = [];
var mediumAsteroids = [];
var smallAsteroids = [];

var testSphere = new THREE.Sphere();

//Asteroid Materials
var asteroidMaterials = [];
//brown rock
asteroidMaterials[0] = new THREE.MeshLambertMaterial({
	color: 'rgb(100,45,15)',
	emissive: 'rgb(30,15,5)',
	shading: THREE.FlatShading
});
//dark grey rock
asteroidMaterials[1] = new THREE.MeshLambertMaterial({
	color: 'rgb(40,40,40)',
	emissive: 'rgb(20,20,20)',
	shading: THREE.FlatShading
});
//high-contrast, 'snowy' comet-like rock
asteroidMaterials[2] = new THREE.MeshLambertMaterial({
	color: 'rgb(240,240,240)',
	emissive: 'rgb(20,20,20)',
	shading: THREE.FlatShading
});
//red, mars-like rock
asteroidMaterials[3] = new THREE.MeshLambertMaterial({
	color: 'rgb(100,10,0)',
	emissive: 'rgb(30,5,0)',
	shading: THREE.FlatShading
});
//blue, transparent water-ice rock
asteroidMaterials[4] = new THREE.MeshLambertMaterial({
	transparent: true,
	opacity: 0.85,
	color: 'rgb(0,150,255)',
	emissive: 'rgb(0,75,120)',
	side: THREE.DoubleSide,
	shading: THREE.FlatShading
});

//Asteroid Explosion Pieces
var asteroidExplosionMaterials = [];
//brown rock
asteroidExplosionMaterials[0] = new THREE.MeshBasicMaterial({
	color: 'rgb(100,45,15)',
	emissive: 'rgb(30,15,5)'
});
//dark grey rock
asteroidExplosionMaterials[1] = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 1.0,
	color: 'rgb(40,40,40)',
	emissive: 'rgb(20,20,20)'
});
//high-contrast, 'snowy' comet-like rock
asteroidExplosionMaterials[2] = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 1.0,
	color: 'rgb(240,240,240)',
	emissive: 'rgb(20,20,20)'
});
//red, mars-like rock
asteroidExplosionMaterials[3] = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 1.0,
	color: 'rgb(100,10,0)',
	emissive: 'rgb(30,5,0)'
});
//blue, transparent water-ice rock
asteroidExplosionMaterials[4] = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 1.0,
	color: 'rgb(0,150,255)',
	emissive: 'rgb(0,75,120)'
});


var explosionPieces = [];     //CylinderGeometry( radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded )
var explosionPiecesGeometry = new THREE.CylinderGeometry( 0, 2, 2, 2, 1, false );
var numberOfExplosionPieces = 100;//100
var isExploding = false;
var explosionTimer = new THREEx.GameTimer(4);

//enemy saucer explosion pieces material
var enemyExplosionMaterial = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 1.0,
	color: 'rgb(150,0,255)',
	emissive: 'rgb(59,0,100)'
});
var enemyExplosionPieces = [];
var enemyIsExploding = false;
var enemyExplosionTimer = new THREEx.GameTimer(4);

//Player explosion pieces material
var playerExplosionMaterial = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 1.0,
	color: 'rgb(0,0,255)',
	emissive: 'rgb(0,0,100)'
});
var playerExplosionPieces = [];
var playerIsExploding = false;
var playerExplosionTimer = new THREEx.GameTimer(4);

var explosionSphereGeometry = new THREE.SphereGeometry(5,10,10);
var explosionSphereMaterial = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 0.3,
	color: 'rgb(255,170,0)',
	depthTest: false,
	side: THREE.DoubleSide
});
var explosionSphere = new THREE.Mesh(explosionSphereGeometry, explosionSphereMaterial);
var explosionScale = 1.0;
explosionSphere.visible = false;
scene.add(explosionSphere);

var largeAsteroidRadius = 70;
var mediumAsteroidRadius = 40;
var smallAsteroidRadius = 20;
var largeAsteroidGeometry = new THREE.IcosahedronGeometry(largeAsteroidRadius, 2);//this number needs to match html file
var mediumAsteroidGeometry = new THREE.IcosahedronGeometry(mediumAsteroidRadius, 1);//this number needs to match html file
var smallAsteroidGeometry = new THREE.IcosahedronGeometry(smallAsteroidRadius, 0);//this number needs to match html file
var lvLength = largeAsteroidGeometry.vertices.length;
var mvLength = mediumAsteroidGeometry.vertices.length;
var svLength = smallAsteroidGeometry.vertices.length;
var deformVec = new THREE.Vector3();
var smallAsteroidsRemaining = 0;
var collisionSphereRadiusSquared = 0;
//var wireframe = new THREE.WireframeHelper(asteroid);
//scene.add(wireframe);

// Sunlight
var sunLight = new THREE.DirectionalLight('rgb(255,255,255)', 1);
sunLight.position.set(-1, 1, 1);
sunLight.lookAt(scene.position);
scene.add(sunLight);

// HUD SPRITES
var crossHairsTexture = THREE.ImageUtils.loadTexture('images/crosshairs01.png');
var crossHairsMaterial = new THREE.SpriteMaterial( { map: crossHairsTexture, depthTest: false } );
crossHairsSprite = new THREE.Sprite(crossHairsMaterial);
//scale the crossHairsSprite
crossHairsSprite.scale.set(0.5, 0.5, 0.5);
//position sprites by percent X:(100 is all the way to the right, 0 is left, 50 is centered)
//                            Y:(100 is all the way to the top, 0 is bottom, 50 is centered)
var crosshairPercentX = 50;
var crosshairPercentY = 50;
var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;
//move crossHairsSprite back 1.5 units along the -Z axis so we can see it
crossHairsSprite.position.set(crosshairPositionX * camera.aspect, crosshairPositionY, -1.5);
crossHairsSprite.visible = false;
//add crossHairsSprite as a child of our camera object, so it will stay in camera's view
camera.add(crossHairsSprite);

var livesRemainingTexture = THREE.ImageUtils.loadTexture('images/AsteroidShip.png');
var livesRemainingMaterial = new THREE.SpriteMaterial( {
	color: 'rgb(200,200,255)',
	map: livesRemainingTexture, 
	depthTest: false 
} );
var livesRemainingSprites = [];
var livesRemainingPercentX = [];
var livesRemainingPercentY = 83;
var livesRemainingPositionX = [];
var livesRemainingPositionY = (livesRemainingPercentY / 100) * 2 - 1;
for (var i = 0; i < 10; i++) {
	livesRemainingSprites[i] = new THREE.Sprite(livesRemainingMaterial);
	//livesRemainingSprites[i].material.rotation = -0.4;
	livesRemainingSprites[i].scale.set(0.12, 0.12, 0.12);
	livesRemainingPercentX[i] = 93;
	livesRemainingPositionX[i] = (livesRemainingPercentX[i] / 100) * 2 - 1;
	livesRemainingSprites[i].position.set(livesRemainingPositionX[i] * camera.aspect, livesRemainingPositionY, -1.5);
	camera.add(livesRemainingSprites[i]);
	if (i >= livesRemaining) livesRemainingSprites[i].visible = false;
}
livesRemainingSprites[0].material.rotation = 0.5;


//Enemy UFO Object
var enemy = new THREE.Object3D();
scene.add(enemy);
enemy.visible = false;

//Enemy Saucer
var enemySaucerGeometry = new THREE.SphereGeometry(50,20,4);
var enemySaucerMaterial = new THREE.MeshPhongMaterial({
	//shading: THREE.FlatShading,
	metal: true,
	shininess: 10,
	specular: 'rgb(255,255,255)',
	emissive: 'rgb(59,0,100)',
	color: 'rgb(150,0,255)'
});
var enemySaucer = new THREE.Mesh(enemySaucerGeometry, enemySaucerMaterial);
enemySaucer.scale.set(0.5, 0.15, 0.5);//this makes the boundingSphere radius 25
enemySaucer.updateMatrix();
enemySaucer.matrixAutoUpdate = false;
enemySaucer.geometry.center();
enemySaucer.geometry.computeBoundingSphere();
//give a little extra padding so our shots will more easily hit the moving UFO
enemySaucer.geometry.boundingSphere.radius = 30;
enemy.add(enemySaucer);

//Enemy Saucer Tripod Feet (Spheres)
var enemySaucerFeetGeometry = new THREE.SphereGeometry(3,6,6);

var enemySaucerFoot1 = new THREE.Mesh(enemySaucerFeetGeometry, enemySaucerMaterial);
enemySaucerFoot1.scale.set(0.5,0.5,0.5);
enemySaucerFoot1.position.set(20, -14, 9.75);
enemySaucerFoot1.updateMatrix();
enemySaucerFoot1.matrixAutoUpdate = false;
enemy.add(enemySaucerFoot1);
var enemySaucerFoot2 = new THREE.Mesh(enemySaucerFeetGeometry, enemySaucerMaterial);
enemySaucerFoot2.scale.set(0.5,0.5,0.5);
enemySaucerFoot2.position.set(-20, -14, 9.75);
enemySaucerFoot2.updateMatrix();
enemySaucerFoot2.matrixAutoUpdate = false;
enemy.add(enemySaucerFoot2);
var enemySaucerFoot3 = new THREE.Mesh(enemySaucerFeetGeometry, enemySaucerMaterial);
enemySaucerFoot3.scale.set(0.5,0.5,0.5);
enemySaucerFoot3.position.set(0, -14, -22.5);
enemySaucerFoot3.updateMatrix();
enemySaucerFoot3.matrixAutoUpdate = false;
enemy.add(enemySaucerFoot3);

//Enemy Saucer Landing Tripod Legs //CylinderGeometry( radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded )
var enemyTripodGeometry = new THREE.CylinderGeometry( 4, 0, 33, 6, 1, false );
var enemyTripodMaterial = new THREE.MeshPhongMaterial({
	shading: THREE.FlatShading,
	metal: true,
	shininess: 10,
	specular: 'rgb(255,255,255)',
	emissive: 'rgb(50,50,50)',
	color: 'rgb(100,100,100)'
});
var enemyTripod1 = new THREE.Mesh(enemyTripodGeometry, enemyTripodMaterial);
enemyTripod1.scale.set(0.5,0.5,0.5);
enemyTripod1.position.set(15, -9, 7.5);
enemyTripod1.lookAt( new THREE.Vector3(400, 400, 200) );
enemyTripod1.updateMatrix();
enemyTripod1.matrixAutoUpdate = false;
enemy.add(enemyTripod1);
var enemyTripod2 = new THREE.Mesh(enemyTripodGeometry, enemyTripodMaterial);
enemyTripod2.scale.set(0.5,0.5,0.5);
enemyTripod2.position.set(-15, -9, 7.5);
enemyTripod2.lookAt( new THREE.Vector3(-400, 400, 200) );
enemyTripod2.updateMatrix();
enemyTripod2.matrixAutoUpdate = false;
enemy.add(enemyTripod2);
var enemyTripod3 = new THREE.Mesh(enemyTripodGeometry, enemyTripodMaterial);
enemyTripod3.scale.set(0.5,0.5,0.5);
enemyTripod3.position.set(0, -9, -16.7705);
enemyTripod3.lookAt( new THREE.Vector3(0, 400, -400) );
enemyTripod3.updateMatrix();
enemyTripod3.matrixAutoUpdate = false;
enemy.add(enemyTripod3);

//Enemy ship glass dome
var enemyDomeGeometry = new THREE.SphereGeometry(25,10,10);
var enemyDomeMaterial = new THREE.MeshPhongMaterial({
	transparent: true,
	opacity: 0.2,
	//metal: true,
	shininess: 200,
	emissive: 'rgb(0,40,50)',
	specular: 'rgb(255,255,255)',
	color: 'rgb(0,100,120)'
});
var enemyDome = new THREE.Mesh(enemyDomeGeometry, enemyDomeMaterial);
enemyDome.scale.set(0.5, 0.45, 0.5);
enemyDome.position.set(0, 7, 0);
enemyDome.updateMatrix();
enemyDome.matrixAutoUpdate = false;
enemy.add(enemyDome);

//Enemy Alien Head
var enemyHeadGeometry = new THREE.SphereGeometry(3,10,10);
var enemyHeadMaterial = new THREE.MeshLambertMaterial({
	color: 'rgb(0,255,0)',
	emissive: 'rgb(0,55,0)'
});
var enemyHead = new THREE.Mesh(enemyHeadGeometry, enemyHeadMaterial);
enemyHead.scale.set(0.5, 0.6, 0.5);
enemyHead.position.set(0, 11, 0);
enemyHead.updateMatrix();
enemyHead.matrixAutoUpdate = false;
enemy.add(enemyHead);

//Enemy Alien Antenna
var enemyAntennaGeometry = new THREE.CylinderGeometry( 0.3, 0.3, 6, 4, 1, false );
var enemyAntenna1 = new THREE.Mesh(enemyAntennaGeometry, enemyHeadMaterial);
enemyAntenna1.scale.set(0.5, 0.5, 0.5);
enemyAntenna1.position.set(-1, 12.5, 0);
enemyAntenna1.lookAt( new THREE.Vector3(400, 400, 0) );
enemyAntenna1.updateMatrix();
enemyAntenna1.matrixAutoUpdate = false;
enemy.add(enemyAntenna1);
var enemyAntenna2 = new THREE.Mesh(enemyAntennaGeometry, enemyHeadMaterial);
enemyAntenna2.scale.set(0.5, 0.5, 0.5);
enemyAntenna2.position.set(1, 12.5, 0);
enemyAntenna2.lookAt( new THREE.Vector3(-400, 400, 0) );
enemyAntenna2.updateMatrix();
enemyAntenna2.matrixAutoUpdate = false;
enemy.add(enemyAntenna2);

//Enemy Alien Body
var enemyBodyGeometry = new THREE.SphereGeometry(2,6,6);
var enemyBodyMaterial = new THREE.MeshLambertMaterial({
	color: 'rgb(20,20,20)',
	emissive: 'rgb(5,5,5)'
});
var enemyBody = new THREE.Mesh(enemyBodyGeometry, enemyBodyMaterial);
enemyBody.scale.set(0.5, 0.75, 0.5);
enemyBody.position.set(0, 8, 0);
enemyBody.updateMatrix();
enemyBody.matrixAutoUpdate = false;
enemy.add(enemyBody);



// GAME VARIABLES ////////////////////////////////////////////////////////////////////////////////////

var TWO_PI = Math.PI * 2;
var enemyDirection = new THREE.Vector3();
var enemySpeed = 70;
var enemyMoveTargetLocation = new THREE.Vector3();
var enemyShootTargetLocation = new THREE.Vector3();
var enemySpawnTimer = new THREEx.GameTimer();
var enemyChangeDirectionTimer = new THREEx.GameTimer();
var enemyShootTimer = new THREEx.GameTimer();
var enemyAlive = false;
var playerAlive = false;
var randomPick = 0;
var whichSide = 0;
var FRONT_WALL = 1; var BACK_WALL = 2;
var RIGHT_WALL = 3; var LEFT_WALL = 4;
var TOP_WALL = 5; var BOTTOM_WALL = 6;
var randMaterialIndex = 0;
var previousRandMaterialIndex = 0;
//bullets
var MAX_BULLETS = 20;
var bulletSpeed = 400;//400
var bulletCounter = 0;
var spinCounter = 0;
//bullet 'billboards' (always facing player)
var bulletTexture = new THREE.ImageUtils.loadTexture('images/lensflare.png');
var bulletMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(0,120,255)',
	transparent: true,
	opacity: 0.7,
	map: bulletTexture
});
var bulletCopyMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(200,255,255)',
	transparent: true,
	opacity: 1.0,
	map: bulletTexture
});
var bulletGeometry = new THREE.PlaneBufferGeometry(80, 80);//50,50

var bulletArray = [];
var bulletTexPlaneCopy = [];
for (var i = 0; i < MAX_BULLETS; i++) {
	bulletArray[i] = new THREE.Mesh(bulletGeometry, bulletMaterial);
	bulletTexPlaneCopy[i] = new THREE.Mesh(bulletGeometry, bulletCopyMaterial);
	scene.add(bulletArray[i]);
	bulletArray[i].visible = false;
	bulletArray[i].alive = false;
	bulletArray[i].direction = new THREE.Vector3();
	scene.add(bulletTexPlaneCopy[i]);
	bulletTexPlaneCopy[i].visible = false;
	//bulletTexPlaneCopy[i].direction = new THREE.Vector3();
}
var bulletFlipper = true;
var bulletRay = new THREE.Ray();
var bulletRayCollisionPoint = new THREE.Vector3();
var oldBulletSpherePos = new THREE.Vector3();
var newBulletSpherePos = new THREE.Vector3();
var canShoot = true;

//enemy bullets
var ENEMY_MAX_BULLETS = 10;
var enemyBulletSpeed = 300;//300
var enemyBulletCounter = 0;
var enemyBulletMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(150,0,255)',
	transparent: true,
	opacity: 0.7,
	map: bulletTexture
});
var enemyBulletCopyMaterial = new THREE.MeshBasicMaterial({
	color: 'rgb(255,200,255)',
	transparent: true,
	opacity: 1.0,
	map: bulletTexture
});
var enemyBulletGeometry = new THREE.PlaneBufferGeometry(80, 80);//50,50

var enemyBulletArray = [];
var enemyBulletTexPlaneCopy = [];
for (var i = 0; i < ENEMY_MAX_BULLETS; i++) {
	enemyBulletArray[i] = new THREE.Mesh(enemyBulletGeometry, enemyBulletMaterial);
	enemyBulletTexPlaneCopy[i] = new THREE.Mesh(enemyBulletGeometry, enemyBulletCopyMaterial);
	scene.add(enemyBulletArray[i]);
	enemyBulletArray[i].visible = false;
	enemyBulletArray[i].alive = false;
	enemyBulletArray[i].direction = new THREE.Vector3();
	scene.add(enemyBulletTexPlaneCopy[i]);
	enemyBulletTexPlaneCopy[i].visible = false;
	//enemyBulletTexPlaneCopy[i].direction = new THREE.Vector3();
}
var enemyBulletRay = new THREE.Ray();
var enemyBulletRayCollisionPoint = new THREE.Vector3();
var oldEnemyBulletSpherePos = new THREE.Vector3();
var newEnemyBulletSpherePos = new THREE.Vector3();

//physics variables
var combinedRadii = 0;
var distanceBetweenBodies = new THREE.Vector3();
var separation = 0;
var collisionNormal = new THREE.Vector3();
var velocity1 = new THREE.Vector3();
var velocity2 = new THREE.Vector3();
var relativeVelocity = new THREE.Vector3();
var relativeDotNormal = 0;
var Vcn1 = new THREE.Vector3();
var Vcn2 = new THREE.Vector3();
var asteroidCopy1 = new THREE.Object3D();
var asteroidCopy2 = new THREE.Object3D();
asteroidCopy1.direction = new THREE.Vector3();
asteroidCopy2.direction = new THREE.Vector3();
asteroidCopy1.speed = 0;
asteroidCopy2.speed = 0;

var frameTime = 0;
var playingDeathAnimation = false;
var deathAnimationTimer = new THREEx.GameTimer(4);
var playingBeginLevelIntro = false;
var beginLevelTimer = new THREEx.GameTimer(4);//3
var cutsceneCameraAngle = 0;
var cutsceneCameraDistance = 50;//0
var playingWarpAnimation = false;
var fovIncrementAmount = 600;
var aspectIncrementAmount = -8;

var thrustVector = new THREE.Vector3(0, 0, -1);
var frictionVector = new THREE.Vector3();
var ship = new THREE.Object3D();
var shipSpeed = 0;
var shipVelocity = new THREE.Vector3(0, 0, 0);
var normalizedShipDirection = new THREE.Vector3(0, 0, 0);
var fTime = 0;
var tryAgain = false;
var check = 0;
var impulseAmount = 0;
var numOfAsteroidCollisions = 0;
var score = 0;
var extraLifeScore = 10000;
var gameOver = false;
var playingGameOverAnimation = false;
var gameOverTimer = new THREEx.GameTimer(4);

var tempPercent = 0;
var scoreText = document.getElementById("score");
var levelText = document.getElementById("level");
var gameOverText = document.getElementById("gameover");

var debugText1 = document.getElementById("debug1");
var debugText2 = document.getElementById("debug2");
var debugText3 = document.getElementById("debug3");
var debugText4 = document.getElementById("debug4");

//disable clicking and selecting/highlighting text of help, score, level, 
//   and gameOver banner texts

document.getElementById("help").style.cursor = "default";
document.getElementById("help").style.webkitUserSelect = "none";
document.getElementById("help").style.MozUserSelect = "none";
document.getElementById("help").style.msUserSelect = "none";
document.getElementById("help").style.userSelect = "none";
document.getElementById("help1").style.cursor = "default";
document.getElementById("help1").style.webkitUserSelect = "none";
document.getElementById("help1").style.MozUserSelect = "none";
document.getElementById("help1").style.msUserSelect = "none";
document.getElementById("help1").style.userSelect = "none";
document.getElementById("help2").style.cursor = "default";
document.getElementById("help2").style.webkitUserSelect = "none";
document.getElementById("help2").style.MozUserSelect = "none";
document.getElementById("help2").style.msUserSelect = "none";
document.getElementById("help2").style.userSelect = "none";
document.getElementById("score").style.cursor = "default";
document.getElementById("score").style.webkitUserSelect = "none";
document.getElementById("score").style.MozUserSelect = "none";
document.getElementById("score").style.msUserSelect = "none";
document.getElementById("score").style.userSelect = "none";
document.getElementById("level").style.cursor = "default";
document.getElementById("level").style.webkitUserSelect = "none";
document.getElementById("level").style.MozUserSelect = "none";
document.getElementById("level").style.msUserSelect = "none";
document.getElementById("level").style.userSelect = "none";
document.getElementById("gameover").style.cursor = "default";
document.getElementById("gameover").style.webkitUserSelect = "none";
document.getElementById("gameover").style.MozUserSelect = "none";
document.getElementById("gameover").style.msUserSelect = "none";
document.getElementById("gameover").style.userSelect = "none";
