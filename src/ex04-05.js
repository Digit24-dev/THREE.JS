import * as THREE from 'three'
import {
  OrbitControls
} from 'three/examples/jsm/controls'
import { WEBGL } from './webgl'



if (WEBGL.isWebGLAvailable()) {
  // 이 곳에 코드를 삽입한다.

  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xeeeeee);

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 3;

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

  // 도형 추가
  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40);

  const material01 = new THREE.MeshBasicMaterial({
    color: 0xFF7F00,
  });
  const obj01 = new THREE.Mesh(geometry, material01);
  obj01.position.x = -2;
  scene.add(obj01);

  const material02 = new THREE.MeshBasicMaterial({
    color: 0xFF7F00,
  });
  const obj02 = new THREE.Mesh(geometry, material02);
  obj02.position.x = -1;
  scene.add(obj02);

  const material03 = new THREE.MeshStandardMaterial({
    color: 0xff8f,
    metalness: 0.9,
    roughness: 0.1,
    // wireframe: true,
    // transparent: true,
    // opacity: 0.5
  });
  material03.wireframe = true;

  const obj03 = new THREE.Mesh(geometry, material03);
  obj03.position.x = 0;
  scene.add(obj03);

  const material04 = new THREE.MeshPhysicalMaterial({
    color: 0xFF7F00,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });
  const obj04 = new THREE.Mesh(geometry, material04);
  obj04.position.x = 1;
  scene.add(obj04);

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


  // // 반응형 처리
  // function onWindowResize(){
  //   camera.aspect = window.innerWidth / window.innerHeight;
  //   camera.updateProjectionMatrix();
  //   renderer.setSize(window.innerWidth, window.innerHeight);
  // }
  // window.addEventListener('resize', onWindowResize);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
