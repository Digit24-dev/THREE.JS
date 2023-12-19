import * as THREE from 'three'
// import {
//   OrbitControls
// } from 'three/examples/jsm/controls'
import { WEBGL } from './webgl'



if (WEBGL.isWebGLAvailable()) {
  // 이 곳에 코드를 삽입한다.

  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0,0,1);
  // // 카메라
  // const fov = 100;
  // const aspect = window.innerWidth / window.innerHeight;
  // const near = 0.001;
  // const far = 10;
  // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  
  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha : true,
    antialias : true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
  
  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 12);
  scene.add(pointLight);


  // 텍스쳐 추가
  const textureLoader = new THREE.TextureLoader();
  const textureBaseColor = textureLoader.load('../static/textures/stone_01/Stylized_Stone_Floor_005_basecolor.jpg');
  const textureHeight = textureLoader.load('../static/textures/stone_01/Stylized_Stone_Floor_005_height.png');
  const textureNormalMap = textureLoader.load('../static/textures/stone_01/Stylized_Stone_Floor_005_normal.jpg');
  const textureRougnessMap = textureLoader.load('../static/textures/stone_01/Stylized_Stone_Floor_005_roughness.jpg');


  // 도형 추가
  const geometry = new THREE.SphereGeometry(0.3, 32, 16);

  // mat 1
  const material01 = new THREE.MeshStandardMaterial({
    map: textureBaseColor
  });
  const obj01 = new THREE.Mesh(geometry, material01);
  obj01.position.x = -2;
  scene.add(obj01);

  // mat 2
  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap
  });
  const obj02 = new THREE.Mesh(geometry, material02);
  obj02.position.x = -1;
  scene.add(obj02);

  // mat 3
  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeight,
    displacementScale: 0.05
  });

  const obj03 = new THREE.Mesh(geometry, material03);
  obj03.position.x = 0;
  scene.add(obj03);

  // mat 4
  const material04 = new THREE.MeshPhysicalMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeight,
    displacementScale: 0.05,
    roughnessMap: textureRougnessMap
  });
  const obj04 = new THREE.Mesh(geometry, material04);
  obj04.position.x = 1;
  scene.add(obj04);

  // mat 5
  const material05 = new THREE.MeshPhongMaterial({
    color: 0xFF7F00,
    shininess: 60,
    specular: 0x004ff
  });
  const obj05 = new THREE.Mesh(geometry, material05);
  obj05.position.x = 2;
  scene.add(obj05);


  function render(time) {
    time *= 0.0005;  // convert time to seconds
    
    // obj01.rotation.x = time;
    obj01.rotation.y = time;
    
    // obj02.rotation.x = time;
    obj02.rotation.y = time;
    
    // obj03.rotation.x = time;
    obj03.rotation.y = time;

    obj04.rotation.y = time;

    obj05.rotation.y = time;

    renderer.render(scene, camera);
    
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);


  // 반응형 처리
  function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
