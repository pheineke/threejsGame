import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { makeInstance, makeInstanceCube, makePlayer, makeLight, makeOrigin } from './terrain.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.minDistance = 2
controls.update();

const origin = makeOrigin();
scene.add(origin[0]);
scene.add(origin[1]);
scene.add(origin[2]);


const light = makeLight();
scene.add(light);

const player = makePlayer();
scene.add(player);

const terrain = makeInstance(10, 10);
terrain.position.set(0,0,0);
terrain.rotation.x = 0;
scene.add(terrain);

function animate() {

    player.rotation.x +=.01
    
    renderer.render( scene, camera );
}

setInterval(() => {
    console.log(player.position);
}, 500);

renderer.setAnimationLoop( animate );