import * as THREE from 'three'
import { 
  WEBGL 
} from './webgl'

if (WEBGL.isWebGLAvailable()) {

  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // 카메라
  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  const fov = 120;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 1, 2);
  camera.lookAt(new THREE.Vector3(0,0,0));
  // camera.position.x = 0;
  // camera.position.y = 0;
  // camera.position.z = 1;

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha : true,
    antialias : true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;

  // 도형 1
  const geometry01 = new THREE.SphereGeometry(0.5, 32, 16);
  const material01 = new THREE.MeshStandardMaterial({
    color: 0xff7f00
  });
  const cube01 = new THREE.Mesh(geometry01, material01);
  cube01.position.set(0.5, 0.5, 0);
  cube01.castShadow = true;
  scene.add(cube01);

  // 도형 2
  const geometry02 = new THREE.SphereGeometry(0.5, 32, 16);
  const material02 = new THREE.MeshStandardMaterial({
    color: 0xff7f00
  });
  const cube02 = new THREE.Mesh(geometry02, material02);
  cube02.position.set(1, 1, 0.5);
  cube02.castShadow = true;
  scene.add(cube02);

  // 바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5* Math.PI;
  plane.position.y = -0.2;
  plane.receiveShadow = true;
  scene.add(plane);

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  // ambientLight.castShadow = true; // 그림자 X
  // scene.add(ambientLight);

  // directional Light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-0.5, 1.5, -0.5);
  directionalLight.castShadow = true;
  
  // 그림자 해상도 조절 
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.radius  = 6;

  const dlHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2, 0x000000);
  scene.add(directionalLight);
  scene.add(dlHelper);

  // hemisphere Light
  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1);
  // scene.add(hemisphereLight);

  // point Light
  const pointLight01 = new THREE.PointLight(0xffffff, 1);
  pointLight01.position.set(-1, 1, 0.5);
  pointLight01.castShadow = true;
  const plHelper01 = new THREE.PointLightHelper(pointLight01, 0.1);
  // scene.add(pointLight01);
  // scene.add(plHelper01);

  const pointLight02 = new THREE.PointLight(0xffffff, 1);
  pointLight02.position.set(0.5, 0.5, 0.5);
  const plHelper02 = new THREE.PointLightHelper(pointLight02, 0.1);
  // scene.add(pointLight02);
  // scene.add(plHelper02);

  const rectLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1);
  rectLight.position.set(0.5, 0.5, 1);
  rectLight.lookAt(0,0,0);
  rectLight.castShadow = true;
  // scene.add(rectLight);

  const spotLight = new THREE.SpotLight(0xffffff, 0.5);
  // scene.add(spotLight);

  // const pointLight = new THREE.PointLight(0xfffffb, 1);
  // pointLight.position.set(0, 2, 12);
  // scene.add(pointLight);

  function render(time) {
    renderer.render(scene, camera);
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
