import * as THREE from 'three';

function makeLight() {
    const color = 0xFFFFFF;
    const intensity = .1;
    const light = new THREE.AmbientLight(color, intensity);
    return light;
}

function makeInstance(width = 5, height = 5) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshLambertMaterial( { color: 0x00ff00 });
    const instance = new THREE.Mesh(geometry, material);

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

export { makeInstance, makeInstanceCube, makePlayer, makeLight };