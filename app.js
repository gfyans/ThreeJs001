// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------
var example = (function() {
  "use strict";

  var scene, renderer, light, camera, ambientlight;
  var sphere, box, cloud, space, glow;
  var stats;
  var sphereRadius = 200;
  var offset = 180;

  function initScene() {
    initStats();

    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({ antialias: true }) : new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    ambientlight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientlight);

    light = new THREE.DirectionalLight(0xffffff, 0.2);
    light.position.z = 2;
    light.position.x = 1.2;
    scene.add(light);

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;
    scene.add(camera);

    var textureLoader = new THREE.TextureLoader();

    var material = new THREE.MeshPhongMaterial();
    material.map    = textureLoader.load('images/earthmap1k.jpg');
    material.bumpMap    = textureLoader.load('images/earthbump1k.jpg');
    material.bumpScale = 60;
    material.specularMap    = textureLoader.load('images/earthspec1k.jpg');
    material.specular  = new THREE.Color('grey');

    var sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
    sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.rotation.y = 4.3;
    sphere.rotation.x = 0.5;
    scene.add(sphere);

    var boxMaterial = new THREE.MeshPhongMaterial({
      vertexColors: THREE.VertexColors,
      side: THREE.DoubleSide,
      wireframe: true
    });

    var boxGeometry = new THREE.BoxGeometry(20, 20, 20, 5, 5, 5);
    box = new THREE.Mesh(boxGeometry, boxMaterial);
    sphere.add(box);

    var cloudGeometry   = new THREE.SphereGeometry(202, 32, 32);
    var cloudMaterial  = new THREE.MeshBasicMaterial({
      map     : textureLoader.load("images/earthcloudmap.jpg"),
        alphaMap     : textureLoader.load("images/earthcloudmaptrans.jpg"),
        bumpMap:  textureLoader.load("images/earthcloudmaptrans.jpg"),
        bumpScale: 100,
      side        : THREE.DoubleSide,
      opacity     : 0.7,
      transparent : true,
      depthWrite  : false,
    });
    cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloud);

    // create the geometry sphere
    var spaceGeometry  = new THREE.SphereGeometry(1100, 32, 32);
    var spaceMaterial  = new THREE.MeshBasicMaterial();
    spaceMaterial.map   = textureLoader.load('images/galaxy_starfield.png');
    spaceMaterial.side  = THREE.BackSide;
    space  = new THREE.Mesh(spaceGeometry, spaceMaterial);
    scene.add(space);

    render();
  }

  function initStats() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild(stats.domElement);
  }

  function render() {
    var boxPos = ll(55.8553807, -4.372204 - offset);

    box.position.x = sphereRadius * Math.sin(boxPos[0]) * Math.cos(boxPos[1]);
    box.position.y = sphereRadius * Math.cos(boxPos[0]);
    box.position.z = sphereRadius * Math.sin(boxPos[0]) * Math.sin(boxPos[1]);

    sphere.rotation.y += 0.001;
    cloud.rotation.y -= 0.001;

    renderer.render(scene, camera);

    requestAnimationFrame(render);

    stats.update();
  }

  function ll(lat, lng) {
    var phi = (90 - lat) * Math.PI / 180;
    var theta = (180 - lng) * Math.PI / 180;

    return [phi, theta];
  }

  window.onload = initScene;

return {
  scene: scene
};
})();
