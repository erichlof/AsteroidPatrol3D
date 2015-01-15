/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 * adapted for THREEx by erichlof
 */

/** @namespace */
var THREEx = THREEx || {};

THREEx.FirstPersonControls = function ( object, domElement ) {

	this.object = object;
	this.target = new THREE.Vector3( 0, 0, 0 );

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.movementSpeed = 1.0;
	this.lookSpeed = 0.005;

	this.lookVertical = true;

	this.mouseX = 0;
	this.mouseY = 0;

	this.lon = 0;//left and right rotation
	this.lat = 0;//up and down rotation
	this.phi = 0;
	this.theta = 0;

	this.moveForward = false;
	this.moveBackward = false;
	this.moveLeft = false;
	this.moveRight = false;

	this.viewHalfX = 0;
	this.viewHalfY = 0;
	//moved
	var actualMoveSpeed = 0;
	var actualLookSpeed = 0;
	var targetPosition = 0;
	var position = 0;

	if ( this.domElement !== document ) {

		this.domElement.setAttribute( 'tabindex', -1 );

	}


	this.handleResize = function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	};

	
	this.update = function( delta ) {

		actualMoveSpeed = delta * this.movementSpeed;

		if ( this.moveForward ) this.object.translateZ( - ( actualMoveSpeed ) );
		if ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );

		if ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );
		if ( this.moveRight ) this.object.translateX( actualMoveSpeed );

		if ( this.moveUp ) this.object.translateY( actualMoveSpeed );
		if ( this.moveDown ) this.object.translateY( - actualMoveSpeed );

		//clamp vertical motion at north and south poles
		if ( this.lat > 85 ) this.lat = 85;
		if ( this.lat < -85 ) this.lat = -85;

		this.phi = THREE.Math.degToRad( 90 - this.lat );
		
		//added '- 90' so that on startup, camera faces down -Z axis
		this.theta = THREE.Math.degToRad( this.lon - 90 );
		
		targetPosition = this.target;
		position = this.object.position;

		targetPosition.x = position.x + Math.sin( this.phi ) * Math.cos( this.theta );
		targetPosition.y = position.y + Math.cos( this.phi );
		targetPosition.z = position.z + Math.sin( this.phi ) * Math.sin( this.theta );
		
		this.object.lookAt( targetPosition );
		
	};


	this.handleResize();

};
