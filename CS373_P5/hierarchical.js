/* COMPSCI 373 Project 5: Hierarchical Scene */

const width = 1000, height = 800;
const fov = 60;
const cameraz = 5;
const aspect = width/height;
const smoothShading = true;
let   animation_speed = 1.0;
let gear = 0;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(fov, aspect, 1, 1000);
camera.position.set(0, 1, -cameraz);

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0x202020);
renderer.localClippingEnabled = true;
window.onload = function(e) {
	document.getElementById('window').appendChild(renderer.domElement);
}
let orbit = new THREE.OrbitControls(camera, renderer.domElement);	// create mouse control

let light0 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light0.position.set(camera.position.x, camera.position.y, camera.position.z);	// this light is at the camera
scene.add(light0);

let light1 = new THREE.DirectionalLight(0xCCCCCC, 1.0); // red light
light1.position.set(-1, 1, 0);
scene.add(light1);

let light2 = new THREE.DirectionalLight(0x444444, 1.0); // blue light
light2.position.set(1, 1, 0);
scene.add(light2);

let amblight = new THREE.AmbientLight(0x202020);	// ambient light
scene.add(amblight);

let material = new THREE.MeshPhongMaterial({color:0x808080, specular:0x111111, shininess: 25, side:THREE.FrontSide});
//delete m1 after done
let m1 = new THREE.MeshPhongMaterial({color:0xE06666, specular:0x101010, shininess: 25, side:THREE.FrontSide});
//
let m2= new THREE.MeshPhongMaterial({color:0xEA9999, specular:0x101010, shininess: 25, side:THREE.FrontSide});
let m3= new THREE.MeshPhongMaterial({color:0x9FC5E8, specular:0x101010, shininess: 25, side:THREE.FrontSide});
let out = new THREE.Plane(new THREE.Vector3(0, 0, 1), -1.25);
let reg = new THREE.Plane(new THREE.Vector3(0, 0, -1), 1.25);
let clout = [out];
let clreg = [reg];
let m4 = new THREE.MeshPhongMaterial({color:0xFFD966, specular:0x111111, shininess: 25, side:THREE.FrontSide, clippingPlanes: clout, clipIntersection: true});
let m5 = new THREE.MeshPhongMaterial({color:0x444444, specular:0x111111, shininess: 25, side:THREE.FrontSide, clippingPlanes: clreg, clipIntersection: true});
let models = []; // array that stores all models
let numModelsLoaded = 0;
let numModelsExpected = 0;

// load models
// ===YOUR CODE STARTS HERE===
loadModel(MainShaft_model, m4, 'Mout');
loadModel(MainShaft_model, m5, 'M');
loadModel(DrivenShaft_model, material, 'D');
loadModel(FirstD_model, m2, '1D');
loadModel(SecondD_model, m2, '2D');
loadModel(SecondM_model, m3, '2M');
loadModel(ThirdD_model, m2, '3D');
loadModel(ThirdM_model, m3, '3M');
loadModel(FourthD_model, m3, '4D');
loadModel(FourthM_model, m2, '4M');
loadModel(FifthD_model, m3, '5D');
loadModel(FifthM_model, m2, '5M');
loadModel(gearbox_model, m1, 'G');

// ---YOUR CODE ENDS HERE---
// loadModel(bunny_model, material, 'sun');
// loadModel(bunny_model, material, 'earth');

// 'label' is a unique name for the model for accessing it later
function loadModel(objstring, material, label) {
	numModelsExpected++;
	loadOBJFromString(objstring, function(mesh) { // callback function for non-blocking load
		mesh.computeFaceNormals();
		if(smoothShading) mesh.computeVertexNormals();
		models[label] = new THREE.Mesh(mesh, material);
		numModelsLoaded++;
	}, function() {}, function() {});
}

let initialized = false;
function animate() {
	requestAnimationFrame( animate );
	if(numModelsLoaded == numModelsExpected) {	// all models have been loaded
		if(!initialized) {
			initialized = true;
			// construct the scene by adding models
// ===YOUR CODE STARTS HERE===

			//Flip around
			models['D'].applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
			models['1D'].applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
			models['5D'].applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
			models['3D'].applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
			models['4D'].applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
			models['2D'].applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

			models['M'].applyMatrix(new THREE.Matrix4().makeScale(1, 1, -1));
			models['Mout'].applyMatrix(new THREE.Matrix4().makeScale(1, 1, -1));
			models['5M'].applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
			models['3M'].applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
			models['4M'].applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));
			models['2M'].applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

			//Counter shaft and gears

				//Move counter shaft to left
			models['D'].position.x =
			models['1D'].position.x =
			models['5D'].position.x =
			models['3D'].position.x =
			models['4D'].position.x =
			models['2D'].position.x = -.45;

				//Counter shaft
			models['D'].scale.x=models['D'].scale.y=models['D'].scale.z=1.5;
			scene.add(models['D']);
				//1st gear
			models['1D'].position.z = .56;
			models['1D'].scale.x=models['1D'].scale.y=models['1D'].scale.z=.7;
			scene.add(models['1D']);
				//5th gear
			models['5D'].position.z = .175;
			models['5D'].scale.x=models['5D'].scale.y=models['5D'].scale.z = 0.5;
			scene.add(models['5D']);
				//3rd gear
			models['3D'].position.z = -.2;
			models['3D'].scale.x=models['3D'].scale.y=models['3D'].scale.z = 0.4;
			scene.add(models['3D']);
				//4th gear
			models['4D'].position.z = -.7;
			models['4D'].scale.x=models['4D'].scale.y=models['4D'].scale.z = .5;
			scene.add(models['4D']);
				//2nd gear
			models['2D'].position.z = -1.13;
			models['2D'].scale.x=models['2D'].scale.y=models['2D'].scale.z=.6;
			scene.add(models['2D']);
			////////////////////////////



			//Main shaft and gears
			
				//Move main shaft to right
			models['M'].position.x =
			models['Mout'].position.x =
			models['5M'].position.x =
			models['3M'].position.x =
			models['4M'].position.x =
			models['2M'].position.x = .45;

				//Main shaft
			models['M'].scale.x=models['M'].scale.y=models['M'].scale.z=1.9;
			models['M'].position.z = .17;
			models['Mout'].scale.x=models['Mout'].scale.y=models['Mout'].scale.z=1.9;
			models['Mout'].position.z = .17;
			scene.add(models['M']);
			scene.add(models['Mout']);
				//5th gear
			models['5M'].position.z = .18;
			models['5M'].scale.x=models['5M'].scale.y=models['5M'].scale.z=.5;
			scene.add(models['5M']);
				//3rd gear
			models['3M'].position.z = -.26;
			models['3M'].scale.x=models['3M'].scale.y=models['3M'].scale.z=.6;
			scene.add(models['3M']);
				//4th gear
			models['4M'].position.z = -.765;
			models['4M'].scale.x=models['4M'].scale.y=models['4M'].scale.z=.55;
			scene.add(models['4M']);
				//2nd gear
			models['2M'].position.z = -1.13;
			models['2M'].scale.x=models['2M'].scale.y=models['2M'].scale.z=.38;
			scene.add(models['2M']);

// ---YOUR CODE ENDS HERE---
			// scene.add(models['sun']);
			// models['earth'].position.x=3;
			// scene.add(models['earth']);
		}
		// animate the scene
// ===YOUR CODE STARTS HERE===
		models['D'].rotation.z-=0.02*animation_speed;
		models['1D'].rotation.z-=0.02*animation_speed;
		models['2D'].rotation.z-=0.02*animation_speed;
		models['3D'].rotation.z-=0.02*animation_speed;
		models['4D'].rotation.z-=0.02*animation_speed;
		models['5D'].rotation.z-=0.02*animation_speed;

		models['M'].rotation.z-=0.02*animation_speed;
		models['Mout'].rotation.z-=0.05*animation_speed;
		models['2M'].rotation.z+=0.02*animation_speed;
		models['3M'].rotation.z+=0.02*animation_speed;
		models['4M'].rotation.z+=0.02*animation_speed;
		models['5M'].rotation.z+=0.02*animation_speed;

		switch(gear) {
			case 0:
				if (models['3M'].position.z >= -.26)
					models['3M'].position.z +=0.002;
				//models['Mout'].rotation.z = animation_speed;
				break;
			case 1:
				if (models['5D'].position.z <= 0.3)
					models['5D'].position.z+=0.002;
				if (dir == 0)
					models['Mout'].rotation.z -= 0.05*animation_speed;
				else
					models['Mout'].rotation.z += 0.05*animation_speed;
				break;
			case 2:
				if (models['4D'].position.z >= -1)
					models['4D'].position.z -=0.002;
				if (models['5D'].position.z >= .175)
					models['5D'].position.z-=0.002;
				if (dir == 0)
					models['Mout'].rotation.z -= 0.05*animation_speed;
				else
					models['Mout'].rotation.z += 0.05*animation_speed;
				break;
			case 3:
				if (models['4D'].position.z <= -.4)
					models['4D'].position.z +=0.002;
				if (dir == 0)
					models['Mout'].rotation.z -= 0.05*animation_speed;
				else
					models['Mout'].rotation.z += 0.05*animation_speed;
				break;
			case 4:
				if (models['4D'].position.z >= -.7)
					models['4D'].position.z -=0.002;
				if (models['3M'].position.z >= -.46)
					models['3M'].position.z -=0.002;
				if (dir == 0)
					models['Mout'].rotation.z -= 0.05*animation_speed;
				else
					models['Mout'].rotation.z += 0.05*animation_speed;
				break;
			case 5:
				if (models['3M'].position.z <= 0)
					models['3M'].position.z +=0.004;
				if (dir == 0)
					models['Mout'].rotation.z -= 0.05*animation_speed;
				else
					models['Mout'].rotation.z += 0.05*animation_speed;
				break;
		}
// ---YOUR CODE ENDS HERE---
		// models['sun'].rotation.y+=0.01*animation_speed;
		// models['earth'].rotation.y+=0.05*animation_speed;
	}
	light0.position.set(camera.position.x, camera.position.y, camera.position.z); // light0 always follows camera position
	renderer.render(scene, camera);

}

animate();

function onKeyDown(event) {
	switch(event.key) {
		case 'w':
		case 'W':
			material.wireframe = !material.wireframe;
			break;
		case '=':
		case '+':
			animation_speed += 0.05;
			document.getElementById('msg').innerHTML = 'animation_speed = '+animation_speed.toFixed(2);
			break;
		case '-':
		case '_':
			if(animation_speed>0) animation_speed-=0.05;
			document.getElementById('msg').innerHTML = 'animation_speed = '+animation_speed.toFixed(2);
			break;
		case 'r':
		case 'R':
			orbit.reset();
			break;
	}
}

gears = ['N', '1', '2', '3', '4', '5', '6'];
//0 - forward, 1 - back
dir = 0;

function shift() {
	if (gear == 6)
		dir = 1;
	else if (gear == 0)
		dir = 0;

	if (dir == 0)
		gear++;
	else
		gear--;
}

window.addEventListener('keydown', onKeyDown, false); // as key control if you need
window.setInterval(shift, 3000);
