import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';




var cena = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var loader = new GLTFLoader();

// Adicione um grupo para que você possa rotacionar a cena, se necessário
var grupo = new THREE.Group();

loader.load('./gun.glb', function (gltf) {
    grupo.add(gltf.scene);
    cena.add(grupo);
});
 

// Adicione os controles de órbita
var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;
//controls.minPolarAngle = Math.PI / 2; // Restringe a rotação para baixo



var luzAmbiente = new THREE.AmbientLight(0xffffff, 15); // Cor branca, intensidade 0.5
cena.add(luzAmbiente);

 

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Somente necessário se os controles estiverem habilitados
    renderer.render(cena, camera);
}

animate();

camera.position.set(-2.9354746256156337, 1.8347045425490072, 0.32639611113496253); // Define a posição da câmera para x=0, y=0, z=10


for ( let  i = 0 ; i < 300; i++){
    if(camera.position.x < 1.10035530934001) {
        setTimeout( () => { camera.position.x  += 0.02 } , 10*i);
    }
}

for ( let  i = 0 ; i < 1; i++){
    setTimeout( () => { camera.position.y  += 0.01 } , 10*i);
}



//Debugando 
document.onclick = () => {
    console.log(camera.position)
}

new THREE.TextGeometry( "asdfasdf", {});


var tentadorDeDesativacaoDoCilindro = setInterval(() => {

    cena.traverse((child) => {
        console.log(child) 
        child.userData.name == "Cylinder" ? child.visible = false : ''
        child.userData.name == "Cylinder" ? clearInterval(tentadorDeDesativacaoDoCilindro) : ''
    })  
    
}, 100 )