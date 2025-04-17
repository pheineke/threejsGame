import * as THREE from 'three';
import openSimplexNoise from 'https://cdn.skypack.dev/open-simplex-noise';

function makeOrigin() {
    const material_x = new THREE.LineBasicMaterial({
        color: 0xff0000
    });

    const material_y = new THREE.LineBasicMaterial({
        color: 0x00ff00
    });

    const material_z = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });

    const points = [];
    points.push(new THREE.Vector3(0,0,0));
    points.push(new THREE.Vector3(1,0,0));

    points.push(new THREE.Vector3(0,0,0));
    points.push(new THREE.Vector3(0,1,0));
    
    points.push(new THREE.Vector3(0,0,0));
    points.push(new THREE.Vector3(0,0,1));

    const geometry_x = new THREE.BufferGeometry().setFromPoints( points.slice(0,2) );
    const geometry_y = new THREE.BufferGeometry().setFromPoints( points.slice(2,4) );
    const geometry_z = new THREE.BufferGeometry().setFromPoints( points.slice(4,6) );

    const line_x = new THREE.Line(geometry_x, material_x);
    const line_y = new THREE.Line(geometry_y, material_y);
    const line_z = new THREE.Line(geometry_z, material_z);

    return [line_x, line_y, line_z];
}

function makeLight() {
    const color = 0xFFFFFF;
    const intensity = .1;
    const light = new THREE.AmbientLight(color, intensity);
    return light;
}

function makeInstance(width = 5, height = 5) {
    const segments = 20;
    const geometry = new THREE.PlaneGeometry(width, height, 20, 20);
    const material = new THREE.MeshLambertMaterial( { color: 0x00ff00, wireframe: true });
    const instance = new THREE.Mesh(geometry, material);

    const positionAttribute = geometry.attributes.position;

    let noise = openSimplexNoise.makeNoise4D(Date.now());

    for (let i = 0; i < segments; i++) {
        for (let j = 0; j < segments; j++) {
            const x = positionAttribute.getX();
            const y = positionAttribute.getY();
            const z = positionAttribute.getZ();
            const height = noise(x, y, z);
            console.log(height);

            positionAttribute.setY(height);
        }
    }

    positionAttribute.needsUpdate = true;    

    //instance.computeVertexNormals();

    instance.rotation.x = - Math.PI / 2

    return instance;
}

function makeInstanceCube() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial( { color: 0xc0ffee })
    const cube = new THREE.Mesh( geometry, material );

    cube.position.set(0,0,0)

    return cube;
}

function makePlayer() {
    const movementSpeed = 0.4;


    const cube = makeInstanceCube();

    document.addEventListener('keypress', (event) => {
        const movementDirection = new THREE.Vector3(0,0,0);
        console.log("Player movement")
        console.log(event.key);
        switch(event.key) {
            case "w":
                movementDirection.add(
                    new THREE.Vector3(0,1,0)
                )
                break;
            case "s":
                movementDirection.add(
                    new THREE.Vector3(0,-1,0)
                )
                break;
            case "a":
                movementDirection.add(
                    new THREE.Vector3(-1,0,0)
                )
                break;
            
            case "d":
                movementDirection.add(
                    new THREE.Vector3(1,0,0)
                )
                break;
            default:
                break;
        }

        cube.position.add(
            movementDirection.clampLength(-movementSpeed, movementSpeed)
        );

    });

    return cube;
}

export { makeInstance, makeInstanceCube, makePlayer, makeLight, makeOrigin };