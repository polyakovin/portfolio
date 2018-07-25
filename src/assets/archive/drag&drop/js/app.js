// инициализируем глобальные переменные
var renderer;
var scene;
var camera;
var plane;
var selectedObject;
var offset = new THREE.Vector3();
var objects = [];


function init() {
  // сцена
  scene = new THREE.Scene();

  // камера
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  // позиционируем камеру
  camera.position.x = 10;
  camera.position.y = 10;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  // визуализатор
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xffffff);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // прикрепляем к HTML-документу
  document.getElementById("WebGL_output").appendChild(renderer.domElement);

  // добавляем освещение (источник 1)
  var dirLight = new THREE.DirectionalLight();
  dirLight.position.set(25, 23, 15);
  scene.add(dirLight);

  // добавляем освещение (источник 2)
  var dirLight2 = new THREE.DirectionalLight();
  dirLight2.position.set(-25, 23, 15);
  scene.add(dirLight2);


  // рисуем плоскость
  // задаём параметры
  var planeGeometry = new THREE.PlaneBufferGeometry(50,50,1,1);
  var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
  var planeReal = new THREE.Mesh(planeGeometry,planeMaterial);

  // кладём плоскость горизонтально
  planeReal.rotation.x=-0.5*Math.PI;

  planeReal.position.x = 0;
  planeReal.position.y = -1;
  planeReal.position.z = 0;

  // добавляем на сцену
  scene.add(planeReal);



  // создаём плоскость, по которой перемещается выбранный объект
  var planeG = new THREE.PlaneBufferGeometry(2000, 2000, 18, 18)
  var planeM = new THREE.MeshBasicMaterial();
  plane = new THREE.Mesh(planeG, planeM);

  // кладём плоскость горизонтально
  plane.rotation.x=-0.5*Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;

  // плоскость вспомогательная, проходит через геометрические центры объектов
  plane.visible = false;

  // добавляем на сцену
  scene.add(plane);


  // размещаем объекты на плоскости

   // цилиндр
  // задаём параметры
  var cylinderGeometry = new THREE.CylinderGeometry( 1, 1, 2, 100, 1, false );
  var cylinderMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
  cylinderMaterial.transparent = true;
  var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

  // размещаем куб произвольным образом на плоскости
  cylinder.position.x = Math.random() * 10 - 5;
  cylinder.position.y = 0;
  cylinder.position.z = Math.random() * 10 - 5;

  // добавляем  на сцену
  scene.add(cylinder);


   // куб
  // задаём параметры
  var cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
  cubeMaterial.transparent = true;
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // размещаем произвольным образом на плоскости
  cube.position.x = Math.random() * 10 - 5;
  cube.position.y = 0;
  cube.position.z = Math.random() * 10 - 5;

  // добавляем на сцену
  scene.add(cube);


   // сфера
  // задаём параметры
  var sphereGeometry = new THREE.SphereGeometry(1, 30, 30);
  var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x0000ff});
  sphereMaterial.transparent = true;
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // размещаем произвольным образом на плоскости
  sphere.position.x = Math.random() * 10 - 5;
  sphere.position.y = 0;
  sphere.position.z = Math.random() * 10 - 5;

  // добавляем на сцену
  scene.add(sphere);


  // кладём всё в массив драгабельных объектов
  objects.push(cylinder);
  objects.push(cube);
  objects.push(sphere);

  // отрисовка сцены
  render();
}

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

// действия при нажатии клавиши мыши
document.onmousedown = function (event) {
  // получаем координаты курсора
  var mouse_x = ( event.clientX / window.innerWidth ) * 2 - 1;
  var mouse_y = -( event.clientY / window.innerHeight ) * 2 + 1;


  // переводим координаты курсора на плоскости в координаты курсора в пространстве
  var vector = new THREE.Vector3(mouse_x, mouse_y, 0.5);
  vector.unproject(camera);
  // получаем все объекты пересекающиеся с нормалью к плоскости монитора, проведённой из точки положения курсора
  var raycaster = new THREE.Raycaster(camera.position,
      vector.sub(camera.position).normalize());

  // определяем место, где произошёл клик
  var intersects = raycaster.intersectObjects(objects);

  if (intersects.length > 0) {
    // определяем объект по которому кликнули
    selectedObject = intersects[0].object;

    // вычисляем расстояние между центрами объекта и вспомогательной плоскостью
    var intersects = raycaster.intersectObject(plane);
    offset.copy(intersects[0].point).sub(plane.position);
  }
};

// действия при движении мышью
document.onmousemove = function (event) {
  // получаем координаты курсора
  var mouse_x = ( event.clientX / window.innerWidth ) * 2 - 1;
  var mouse_y = -( event.clientY / window.innerHeight ) * 2 + 1;

  // переводим координаты курсора на плоскости в координаты курсора в пространстве
  var vector = new THREE.Vector3(mouse_x, mouse_y, 0.5);
  vector.unproject(camera);
  // получаем все объекты пересекающиеся с нормалью к плоскости монитора, проведённой из точки положения курсора
  var raycaster = new THREE.Raycaster(camera.position,
      vector.sub(camera.position).normalize());

  // проверяем, нажали ли мы на какой-либо объект
  if (selectedObject) {
    // определяем место, где произошло нажатие по объекту
    var intersects = raycaster.intersectObject(plane);
    // помещаем объект в соответствующее место на сцене
    selectedObject.position.copy(intersects[0].point.sub(offset));
  } else {
    // отслеживаем позицию перемещаемого объекта (чтобы не было скачков в начало координат)
    var intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      plane.position.copy(intersects[0].object.position);
    }
  }
};

// действия при отпускании клавиши мыши
document.onmouseup = function (event) {
  // обнуляем состояние
  selectedObject = null;
}

// запускаем программу после загрузки документа
window.onload = init;