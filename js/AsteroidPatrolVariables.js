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

var topGrid = new THREE.GridHelper(401, 50.125);
topGrid.setColors(0x660000, 0x660000);
topGrid.position.y = 400;
scene.add(topGrid);
var bottomGrid = new THREE.GridHelper(401, 50.125);
bottomGrid.setColors(0x660000, 0x660000);
bottomGrid.position.y = -400;
scene.add(bottomGrid);
var frontGrid = new THREE.GridHelper(400, 50);
frontGrid.setColors(0x006600, 0x006600);
frontGrid.position.z = -400;
frontGrid.rotation.x = Math.PI / 2;
scene.add(frontGrid);
var backGrid = new THREE.GridHelper(400, 50);
backGrid.setColors(0x006600, 0x006600);
backGrid.position.z = 400;
backGrid.rotation.x = Math.PI / 2;
scene.add(backGrid);
var rightGrid = new THREE.GridHelper(401, 50.125);
rightGrid.setColors(0x000066, 0x000066);
rightGrid.position.x = 400;
rightGrid.rotation.z = Math.PI / 2;
scene.add(rightGrid);
var leftGrid = new THREE.GridHelper(401, 50.125);
leftGrid.setColors(0x000066, 0x000066);
leftGrid.position.x = -400;
leftGrid.rotation.z = Math.PI / 2;
scene.add(leftGrid);

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

var asteroidGeometry = new THREE.IcosahedronGeometry(20, 1);//0 for small asteroids
var asteroidMaterial = new THREE.MeshLambertMaterial({
	color: 'rgb(139,69,19)',
	//transparent: true,
	//opacity: 0,
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

var sunLight = new THREE.DirectionalLight('rgb(255,255,255)', 1);
sunLight.position.set(1, 1, 0);
scene.add(sunLight);

/*
// grid
var gridGeometry = new THREE.PlaneGeometry(500, 500);
var gridTexture = new THREE.ImageUtils.loadTexture('images/laserGrid2.png');
gridTexture.wrapS = gridTexture.wrapT = THREE.RepeatWrapping;
gridTexture.repeat.set(20, 20);
//gridTexture.minFilter = THREE.NearestMipMapLinearFilter;
//red grid
var gridRedMaterial = new THREE.MeshBasicMaterial({
	transparent: true,
	//depthWrite: false,
	//depthTest: false,
	opacity: 5.0,
	color: 'rgb(255,0,0)',
	//side: THREE.DoubleSide,
	map: gridTexture	
});
//green grid
var gridGreenMaterial = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 5.0,
	color: 'rgb(0,255,0)',
	map: gridTexture	
});
//blue grid
var gridBlueMaterial = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 5.0,
	color: 'rgb(0,0,255)',
	map: gridTexture	
});
//6 grid-walls of the arena

var wallBottom = new THREE.Mesh(gridGeometry, gridRedMaterial);
wallBottom.position.y = -250;
wallBottom.rotation.x = -Math.PI / 2;
scene.add(wallBottom);
var wallTop = new THREE.Mesh(gridGeometry, gridRedMaterial);
wallTop.position.y = 250;
wallTop.rotation.x = Math.PI / 2;
scene.add(wallTop);
var wallFront = new THREE.Mesh(gridGeometry, gridGreenMaterial);
wallFront.position.z = -250;
//wallBottom.rotation.x = 0;
scene.add(wallFront);
var wallBack = new THREE.Mesh(gridGeometry, gridGreenMaterial);
wallBack.position.z = 250;
wallBack.rotation.x = Math.PI;
scene.add(wallBack);
var wallRight = new THREE.Mesh(gridGeometry, gridBlueMaterial);
wallRight.position.x = 250;
wallRight.rotation.y = -Math.PI / 2;
scene.add(wallRight);
var wallLeft = new THREE.Mesh(gridGeometry, gridBlueMaterial);
wallLeft.position.x = -250;
wallLeft.rotation.y = Math.PI / 2;
scene.add(wallLeft);
*/

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
var frictionVector = new THREE.Vector3();
var ship = new THREE.Object3D();
var shipSpeed = 0;
var shipVelocity = new THREE.Vector3(0, 0, 0);
var normalizedShipDirection = new THREE.Vector3(0, 0, 0);

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

var collisionSphere = new THREE.Sphere();
var bulletRay = new THREE.Ray();
var bulletRayCollisionPoint = new THREE.Vector3();
var oldBulletSpherePos = new THREE.Vector3();
var newBulletSpherePos = new THREE.Vector3();
var collisionNormal = new THREE.Vector3();
var asteroidRotationAxis = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
asteroidRotationAxis.normalize();
var asteroidRotationAmount = Math.random() * 4 - 2;
var PI_Doubled = Math.PI * 2;
var PI = Math.PI;



// END GLOBAL VARIABLES /////////////////////////////////////////////////////////////////
