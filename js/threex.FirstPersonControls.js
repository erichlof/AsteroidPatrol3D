/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 * adapted for THREEx by erichlof
 */

THREEx.FirstPersonControls = function ( object, domElement ) {

	this.object = object;
	this.target = new THREE.Vector3( 0, 0, 0 );

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.movementSpeed = 1.0;
	this.lookSpeed = 0.005;

	this.lookVertical = true;

	this.mouseX = 0;
	this.mouseY = 0;

	this.lon = 0;//-90 (left and right rotation)
	this.lat = 0;//0 (up and down rotation)
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


		this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
		
		this.phi = THREE.Math.degToRad( 90 - this.lat );
		
		this.theta = THREE.Math.degToRad( this.lon - 90);//added - 90

		targetPosition = this.target;
		position = this.object.position;

		targetPosition.x = position.x + Math.sin( this.phi ) * Math.cos( this.theta ); //position.x + 100
		targetPosition.y = position.y + Math.cos( this.phi );//position.y + 100
		targetPosition.z = position.z + Math.sin( this.phi ) * Math.sin( this.theta );//position.z + 100
		
		this.object.lookAt( targetPosition );
		
	};


	this.handleResize();

};
