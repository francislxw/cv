import { OrbitControls } from "./resources/OrbitControls.js";
import * as THREE from "./resources/three.module.js";
import GeometryAdapterFactory from './resources/GeometryAdapterFactory.js';
import { GUI } from './resources/dat.gui.module.js';

let cubeRotation = 0.0;
// will set to true when video can be copied to texture
let gl, container, renderer, arrowRenderer, arrowScene, arrowCamera, axises_group, canvasRender;
let scene, camera, camera_oro, camera_per, material, orbit_ctrl, world_axis, help_plane;
let arrowHelper_z, arrowHelper_y, arrowHelper_x;
let drawaxisflag=true, drawlatticeflag=false;
let object_scale=1.0;

// background and object color
//let bk_r=new THREE.Color( "rgb(242, 242, 242)");
let bk_r="black";
//const ob_r = new THREE.Color( "rgb(227, 227, 227)");
//let ob_r = new THREE.Color("rgb(163, 162, 162)");
let ob_r = "#780B0B";
let light_color = "#F4F2F2";

function Point(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

// FFD: control points of a lattice
let lattice = null;
let lattice_lines_mesh=null;
let ctrl_pt_meshes = [];
let ctrl_line_meshes=[];
let latticeGroup = null;
let ctrlPtsPoints = [];
let ctrlPtsPositsArray = [];
let spanSize = new THREE.Vector3(2, 2, 2);
//let spanSize = new THREE.Vector3(1, 1, 1);
let deformed_positions=[];

let raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.08;
let mouse = new THREE.Vector2();
let plane = new THREE.Plane();
let planeNormal = new THREE.Vector3();
let selectedControlPoints = new Set();
let intersection = new THREE.Vector3();
let offset = new THREE.Vector3();
let INTERSECTED = null;
let SELECTED = null;

let bbox=new THREE.Box3();

let ctrlPointsSize=new THREE.Vector3(0, 0, 0);
let totalCtrlPointsSize=0;
let xSize = ctrlPointsSize.x;
let ySize = ctrlPointsSize.y;
let zSize = ctrlPointsSize.z;


//for testing lattice
let unifyLatticeGroup = null;
let sphere_mesh = null
let oneBoxLatticeGeometry = null;

const ctrl_pt_material = new THREE.MeshStandardMaterial({
    color: 'yellow',
    emissive: 0,
    metalness: 0.2,
    side: 2,
    roughness: 0.5
});

const selected_ctrl_pt_material = new THREE.MeshStandardMaterial({
    color: 'green',
    emissive: 0,
    metalness: 0.2,
    side: 2,
    roughness: 0.5
});



function HE_Vertex(v_id, v_x, v_y, v_z){
  this.id = v_id;
  this.x = v_x;
  this.y = v_y;
  this.z = v_z;

  //
  this.he = null;
}

// data structures
function HE_Edge (vertex) {
  this.ver = vertex;   // start point of this half edge
  this.pair = null;    // the twin half dege of this half edge
  this.face =null;    // the face which includes this half-edge (left one, CCW according to this half-edge)
  this.pre = null;     // previous half-edge
  this.next = null;    // next half-edge

  this.pair_key=null;
  // define your methods (constructor, destructor, etc)
}

function HE_Face(v_id, V1, V2, V3){
  this.id = v_id;
  this.v1 = V1;
  this.v2 = V2;
  this.v3 = V3;
}

main();
gui();
animate();


//
// Start here
//
function main() {
  container = document.createElement('div');
  document.body.appendChild(container);

  //User options

  // Camera
  //camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  let xy_aspect=window.innerWidth / window.innerHeight;
  camera_per = new THREE.PerspectiveCamera( 75, xy_aspect, 0.1, 2000 );
  camera_oro = new THREE.OrthographicCamera(-18, 18, 9, -9, 1, 2000);

  //camera_oro = new THREE.OrthographicCamera(-1 * xy_aspect, 1 * xy_aspect, 1, -1, 1, 2000);
  //camera_oro = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 2000);
  camera=camera_per;
  camera.position.set(6,2,6);
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer({antialias: true } );

  renderer.setClearColor("black");
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener( 'resize', onWindowResize, false );
  /*renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
  renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
  renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);*/
  renderer.domElement.oncontextmenu = function (e) {
     e.preventDefault();
     return false; 
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

// add lattice
addLattices("OneFaceCtrlPoints");

  //var light = new THREE.DirectionalLight( 0xffffff );
  var light = new THREE.DirectionalLight( light_color );
  light.position.set( 0, 300, 300 );
  light.castShadow = true;
  scene.add( light );

  //var ambientLight = new THREE.AmbientLight( 0x3f2806 );
  var ambientLight = new THREE.AmbientLight( light_color );
  scene.add( ambientLight );

  //var pointLight = new THREE.PointLight( 0xffaa00, 1, 5000 );
  var pointLight = new THREE.PointLight( light_color, 1, 5000 );
  scene.add( pointLight );

  help_plane = new THREE.GridHelper(20, 50);
  scene.add(help_plane);

  // Axises
  let axises=generateAxises();
  scene.add(axises);

  orbit_ctrl = new OrbitControls(camera, renderer.domElement);
  orbit_ctrl.damping = 0.2;
  orbit_ctrl.update();
  initCanvas();
}

function generateAxises(){
  axises_group = new THREE.Group();
  let dir_x = new THREE.Vector3(3, 0, 0);
  let dir_y = new THREE.Vector3(0, 3, 0);
  let dir_z = new THREE.Vector3(0, 0, 3);
  
  // normalize x, y, z
  dir_z.normalize();
  dir_x.normalize();
  dir_y.normalize();

  // the point of arrows
  let origin = new THREE.Vector3(0, 0, 0);

  // length of arrows
  let length = 3;

  // color definition, default value: 0xffff00
  let hex_x = 0xFF0000;
  let hex_y = 0x207F20;
  let hex_z = 0xffff00;

  // depth of arrows, default value 0.2 *length
  let headLength = 0.2;
  
  // length of arrows, default value is: 0.2 * headLength。
  let headWidth = 0.1;
  
  // helper of arrows
  let arrowHelper_x = new THREE.ArrowHelper(dir_x, origin, length, hex_x,headLength,headWidth);
  let arrowHelper_y = new THREE.ArrowHelper(dir_y, origin, length, hex_y,headLength,headWidth);
  let arrowHelper_z = new THREE.ArrowHelper(dir_z, origin, length, hex_z,headLength,headWidth);

  axises_group.add(arrowHelper_z);
  axises_group.add(arrowHelper_y);
  axises_group.add(arrowHelper_x);

  return axises_group;
}

// web gui
function gui(){
  let uiSettings = {
    latticeChoice: 'OneFaceCtrlPoints'
  };

  var gui = new GUI();
  gui.add(uiSettings, 'latticeChoice', ['OneFaceCtrlPoints', 'OneBoxGeometryPoints', 'ThreeDGridCtrlPoints', 'SelfDrawingPoints'])
     .onChange(() => addLattices(uiSettings.latticeChoice));
}

function addLattices(ltype) {
  removeLatticeGroup();
  removeSphereMesh();
  //refreshVariables();
  console.log("ltype----", ltype);
  if(ltype === "OneFaceCtrlPoints") addOneFaceCtrlPointsMethod();
  else if(ltype === "OneBoxGeometryPoints") addOneBoxGeometryPoints();
  else if(ltype === "ThreeDGridCtrlPoints") addThreeDGridCtrlPoints();
  else if(ltype === "SelfDrawingPoints") addSelfDrawingAll();
}

function removeLatticeGroup() {
  scene.remove(unifyLatticeGroup);
}

function removeSphereMesh(){
  scene.remove(sphere_mesh);
  ctrlPtsPoints.length=0;
  ctrl_pt_meshes.length=0;
}

// method 1
function addOneFaceCtrlPointsMethod() {
  unifyLatticeGroup = new THREE.Group();

  var geometry = new THREE.PlaneBufferGeometry(10, 10, 10, 10);
  geometry.rotateX(-Math.PI * 0.5);

  var plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
    wireframe: true,
    color: "red"
  }));
  unifyLatticeGroup.add(plane);
  //scene.add(plane);

  var points = new THREE.Points(geometry, new THREE.PointsMaterial({
    size: 0.1,
    color: "yellow"
  }));
  unifyLatticeGroup.add(points);
  scene.add(unifyLatticeGroup);

  var raycaster = new THREE.Raycaster();
  raycaster.params.Points.threshold = 0.1;
  var mouse = new THREE.Vector2();
  var intersects = null;
  var plane = new THREE.Plane();
  var planeNormal = new THREE.Vector3();
  var currentIndex = null;
  var planePoint = new THREE.Vector3();
  var dragging = false;

  renderer.domElement.addEventListener("mousedown", mouseDown, false);
  renderer.domElement.addEventListener("mousemove", mouseMove, false);
  renderer.domElement.addEventListener("mouseup", mouseUp, false);

  function mouseDown(event) {
    event.preventDefault();
    setRaycaster(event);
    getIndex();
    dragging = true;
    //orbit_ctrl.enabled=false;
  }

  function mouseMove(event) {
    if (dragging && currentIndex !== null) {
      event.preventDefault();
      setRaycaster(event);
      raycaster.ray.intersectPlane(plane, planePoint);
      orbit_ctrl.enabled=false;
      geometry.attributes.position.setXYZ(currentIndex, planePoint.x, planePoint.y, planePoint.z);
      geometry.attributes.position.needsUpdate = true;
    }
  }

  function mouseUp(event) {
    dragging = false;
    currentIndex = null;
    orbit_ctrl.enabled=true;
  }

  function getIndex() {
    intersects = raycaster.intersectObject(points);
    if (intersects.length === 0) {
      currentIndex = null;
      return;
    }
    currentIndex = intersects[0].index;
    setPlane(intersects[0].point);
  }

  function setPlane(point) {
    planeNormal.subVectors(camera.position, point).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, point);
  }

  function setRaycaster(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
  }

  function getMouseV1(event) {
    let rec=canvasRender.getBoundingClientRect();
    mouse.x = ((event.clientX - rec.left) / canvasRender.offsetWidth) * 2 - 1;
    mouse.y = -((event.clientY - rec.top) / canvasRender.offsetHeight) * 2 + 1;
  }
}


// Method2: Add 1 BoxGeometryPoints method
function addOneBoxGeometryPoints() {
  unifyLatticeGroup = new THREE.Group();

  const adapterFactory = new GeometryAdapterFactory();

  let sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
  let ctrl_pt_geom = new THREE.SphereGeometry(0.08,32,32);
  let ctrl_line_material = new THREE.MeshLambertMaterial({ color: "red" });

  // mesh
  sphere_mesh = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({
              color: 'blue',
              emissive: 0x404040
          }));
  scene.add(sphere_mesh); // add the mesh to the scene

  const bbox = new THREE.Box3().setFromObject(sphere_mesh);

  let size = bbox.max.clone().sub(bbox.min);
  const center = bbox.min.clone().add(size.clone().divideScalar(2));

  //size.multiplyScalar(1.1);

  const latticeBoxGeometry = new THREE.BoxGeometry(size.x, size.y, size.z, spanSize.x, spanSize.y, spanSize.z);

  latticeBoxGeometry.translate(center.x, center.y, center.z);

  let latticeMesh = new THREE.Mesh(latticeBoxGeometry, new THREE.MeshBasicMaterial({color: 'red', wireframe: true, wireframeLinewidth: 1 }));
  unifyLatticeGroup.add(latticeMesh);
  oneBoxLatticeGeometry = adapterFactory.getAdapter(latticeBoxGeometry);

  for (let vertexIndex = 0; vertexIndex < oneBoxLatticeGeometry.numVertices; vertexIndex++) {
    let ctrl_pt_mesh= new THREE.Mesh(ctrl_pt_geom, ctrl_pt_material);
    ctrl_pt_mesh.position.copy(oneBoxLatticeGeometry.getVertex(vertexIndex).clone());
    ctrl_pt_mesh.vertexIndex = vertexIndex;
    ctrl_pt_mesh.adjacentPoints = new Set();
    ctrl_pt_meshes.push(ctrl_pt_mesh);
    //scene.add(ctrl_pt_mesh);
    unifyLatticeGroup.add(ctrl_pt_mesh);
  }

  const planes = [];
  planes.push(getPointsOnPlane(ctrl_pt_meshes, bbox.min.x, null , null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, bbox.max.x, null , null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , bbox.min.y, null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , bbox.max.y, null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , null , bbox.min.z));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , null , bbox.max.z));

  for (const controlPoints of planes) {
      for (const controlPoint of controlPoints) {
          for (const controlPointAdjacent of controlPoints) {
              controlPoint.adjacentPoints.add(controlPointAdjacent);
          }
      }
  }

  scene.add(unifyLatticeGroup);

  renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
  renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
  renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);


  // world location to local postion
  function getLocalPositon(position) {
    return ctrl_pt_meshes[0].parent.worldToLocal(position.clone())
  }

  //planes.push(getPointsOnPlane(ctrl_pt_meshes, bbox.min.x, null, null));
  function getPointsOnPlane(controlPoints, x, y, z) {
      const delta = 0.1/object_scale;
      const result = [];
      for (const controlPoint of controlPoints) {
          if (
              (x === null || Math.abs(controlPoint.position.x - x) < delta)
          &&  (y === null || Math.abs(controlPoint.position.y - y) < delta)
          &&  (z === null || Math.abs(controlPoint.position.z - z) < delta)
          ) {
              result.push(controlPoint);
          }
      }

      return result;
  }

  function onControlPointSelect(object, shiftKey, ctrlKey) {
    if (!selectedControlPoints.has(object)) {
      if (!shiftKey) {
        clearSelection();
      }
      // Francis: need to bind all points whose postions are same as the selected one to be moved together
      // in the vertex of three faces, there are three points, instead of one
      for(const controlPoint of ctrl_pt_meshes){
        let temp=controlPoint.position.distanceTo(object.position);
        if(controlPoint.position.distanceTo(object.position) === 0){
          selectedControlPoints.add(controlPoint);
          object.material = selected_ctrl_pt_material.clone();
        }
      }
    }

    if (ctrlKey) {
      for (const neighborObject of object.adjacentPoints) {
        selectedControlPoints.add(neighborObject);
        neighborObject.material = selected_ctrl_pt_material.clone();
      }
    }
  }

  function clearSelection() {
    for (const controlPoint of selectedControlPoints) {
      controlPoint.material = ctrl_pt_material.clone();
    }

    selectedControlPoints.clear();
  }

  function onDrag(delta){
    for (const controlPoint of selectedControlPoints) {
      // all contrl points' position will move to the new position
      const newVertexPosition = oneBoxLatticeGeometry.getVertex(controlPoint.vertexIndex).clone().add(delta);
      const localPosition = getLocalPositon(newVertexPosition);
      controlPoint.material = selected_ctrl_pt_material.clone();
      //console.log("newVertexPosition--controlPoint.vertexIndex-",controlPoint.vertexIndex, newVertexPosition);
      oneBoxLatticeGeometry.setVertex(controlPoint.vertexIndex, localPosition.x, localPosition.y, localPosition.z);
      controlPoint.position.copy(newVertexPosition);
      oneBoxLatticeGeometry.updateVertices();
    }
  }

  //on mouse move
  function onDocumentMouseMove(event) {
    event.preventDefault();
    setRaycaster(event);
    if ( SELECTED ) {
      if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
        let premove_pos=SELECTED.clone().position;
        //SELECTED.position.copy( intersection.sub(offset));
        let aftermove_pos=intersection.sub(offset);
        const delta = aftermove_pos.clone().sub(premove_pos);
        onDrag(delta);
        // update lattice
        //updateLattice();
        //re-calculate Object vertices
        //reCalculateVertices(algorithm);
      }else{
        console.log("note: no intersection!");
      }
      return;
    }
    
    const intersects = raycaster.intersectObjects( ctrl_pt_meshes );
    if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[0].object ) {
            INTERSECTED = intersects[0].object;
            plane.setFromNormalAndCoplanarPoint(
                camera.getWorldDirection( plane.normal ),
                INTERSECTED.position );
        }
        renderer.domElement.style.cursor = 'pointer';
    } else {
        INTERSECTED = null;
        renderer.domElement.style.cursor = 'auto';
    }
  }

  function onDocumentMouseDown(event){
    event.preventDefault();
    setRaycaster(event);
    const intersects = raycaster.intersectObjects(ctrl_pt_meshes);
    if (intersects.length > 0) {
      orbit_ctrl.enabled=false;
      SELECTED = intersects[0].object;
      if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
          offset.copy(intersection).sub( SELECTED.position );
      }
      renderer.domElement.style.cursor = 'move';
      console.log("herer-----");
      onControlPointSelect(SELECTED, event.shiftKey, event.ctrlKey);
    }
  }

  function onDocumentMouseUp(event){
    orbit_ctrl.enabled=true;
    if ( INTERSECTED ) SELECTED = null;
    renderer.domElement.style.cursor = 'auto';
  }

  function reCalculateVertices(algorithm) {
    if(algorithm === DECASTELJAU) {
      reCalculateVertices_decas();
    } else if(algorithm === BSPOLYNOMIAL){
      reCalculateVertices_bspolynomial();
    }
  }

  function setRaycasterV1(event){
    let rec=canvasRender.getBoundingClientRect();
    mouse.x = ((event.clientX - rec.left) / canvasRender.offsetWidth) * 2 - 1;
    mouse.y = -((event.clientY - rec.top) / canvasRender.offsetHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
  }

  function setRaycaster(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
  }
}


// method 3: 3D grid control points & lattice
function addThreeDGridCtrlPoints() {

  // new method of drawing Lattice, by 3D Grid
  function mapTo3D(i) {
    let z = Math.floor(i / (xSize * ySize));
    i -= z * xSize * ySize;
    let y = Math.floor(i / xSize);
    let x = i % xSize;
    return { x: x, y: y, z: z };
  }

  function mapFrom3D(x, y, z) {
    return x + y * xSize + z * xSize * ySize;
  }


  let sphereGeometry = new THREE.SphereGeometry(2, 32, 32);

  renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
  renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
  renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);

  // mesh
  sphere_mesh = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({
              color: 'BlueViolet',
              emissive: 0x404040
          }));
  scene.add(sphere_mesh); // add the mesh to the scene

  const bbox = new THREE.Box3().setFromObject(sphere_mesh);

  // re-initialize 
  ctrlPtsPoints.length=0;
  ctrlPtsPositsArray.length=0;

  ctrlPointsSize=new THREE.Vector3(spanSize.x+1, spanSize.y+1, spanSize.z+1);
  totalCtrlPointsSize=ctrlPointsSize.x * ctrlPointsSize.y * ctrlPointsSize.z;

  xSize = ctrlPointsSize.x;
  ySize = ctrlPointsSize.y;
  zSize = ctrlPointsSize.z;

  //bbox = new THREE.Box3().setFromObject(object_mesh);
  //let cent = mbbox.getCenter(new THREE.Vector3());
  let size = bbox.getSize(new THREE.Vector3());

  let positions = [];
  for (let i = 0; i < totalCtrlPointsSize; i++) {
    let p = mapTo3D(i);
    let px=bbox.min.x + (p.x / spanSize.x) * size.x;
    let py=bbox.min.y + (p.y / spanSize.y) * size.y;
    let pz=bbox.min.z + (p.z / spanSize.z) * size.z;
    ctrlPtsPositsArray.push(px);
    ctrlPtsPositsArray.push(py);
    ctrlPtsPositsArray.push(pz);

    //store control points positions
    let position=new THREE.Vector3(px, py, pz);
    setPositionToCtrlPoints(p.x,p.y,p.z,position);
  }

  // new THREE GROUP
  unifyLatticeGroup = new THREE.Group();

  let geometry = new THREE.BufferGeometry();
  let ctrl_pt_geom = new THREE.SphereGeometry(0.08,32,32);
  let ctrl_line_material = new THREE.MeshLambertMaterial({ color: "red" });

  //draw points
  for(let vertexIndex=0;vertexIndex<totalCtrlPointsSize;vertexIndex++){
    let ctrl_pt_mesh= new THREE.Mesh(ctrl_pt_geom, ctrl_pt_material);
    ctrl_pt_mesh.position.copy(getPosition(vertexIndex).clone());
    ctrl_pt_mesh.vertexIndex = vertexIndex;
    ctrl_pt_mesh.adjacentPoints = new Set();
    ctrl_pt_meshes.push(ctrl_pt_mesh);
    //scene.add(ctrl_pt_mesh);
    unifyLatticeGroup.add(ctrl_pt_mesh);
  }

  // add adjecnet control points in the same plane
  const planes = [];
  planes.push(getPointsOnPlane(ctrl_pt_meshes, bbox.min.x, null , null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, bbox.max.x, null , null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , bbox.min.y, null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , bbox.max.y, null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , null , bbox.min.z));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , null , bbox.max.z));

  for (const controlPoints of planes) {
    for (const controlPoint of controlPoints) {
      for (const controlPointAdjacent of controlPoints) {
          controlPoint.adjacentPoints.add(controlPointAdjacent);
      }
    }
  }

  let positionAttribute = new THREE.Float32BufferAttribute(ctrlPtsPositsArray, 3);
  geometry.setAttribute("position", positionAttribute);

  // draw lines between control points
  let indexPairs = [];
  for (let i = 0; i < totalCtrlPointsSize; i++) {
    let p = mapTo3D(i);
    if (p.x + 1 < xSize) {
      indexPairs.push(i);
      indexPairs.push(mapFrom3D(p.x + 1, p.y, p.z));
    }
    if (p.y + 1 < ySize) {
      indexPairs.push(i);
      indexPairs.push(mapFrom3D(p.x, p.y + 1, p.z));
    }
    if (p.z + 1 < zSize) {
      indexPairs.push(i);
      indexPairs.push(mapFrom3D(p.x, p.y, p.z + 1));
    }
  }

  geometry.setIndex(indexPairs);
  lattice_lines_mesh = new THREE.LineSegments(geometry, ctrl_line_material);
  unifyLatticeGroup.add(lattice_lines_mesh);

  scene.add(unifyLatticeGroup);


  function updateLattice(){
    // Update the positions of all control point in the FFD object.
    let lattice_lines_mesh_positions=lattice_lines_mesh.geometry.attributes.position.array;
    for(let index=0;index<totalCtrlPointsSize;index++){
      setPosition(index, ctrl_pt_meshes[index].position);
      let offsetPosition = 3 * index;
      lattice_lines_mesh_positions[offsetPosition] = ctrl_pt_meshes[index].position.x;
      lattice_lines_mesh_positions[offsetPosition+1] = ctrl_pt_meshes[index].position.y;
      lattice_lines_mesh_positions[offsetPosition+2] = ctrl_pt_meshes[index].position.z;
    }
    lattice_lines_mesh.geometry.attributes.position.needsUpdate = true;
  }

  // Returns the position of the control point at the given unary index.
  function getPosition(index) {
    return ctrlPtsPoints[index];
  };

  // Sets the position of the control point at the given unary index.
  function setPosition(index, position) {
    ctrlPtsPoints[index] = position;
  };

  // Returns the position of the control point at the given ternary index.
  function getPositionToCtrlPoints(i, j, k) {
    return ctrlPtsPoints[getIndex(i, j, k)];
  };

  // Sets the position of the control point at the given ternary index.
  function setPositionToCtrlPoints(i, j, k, position){
    ctrlPtsPoints[getIndex(i,j,k)]=position;
  }

  // Converts the given ternary index to a unary index.
  function getIndex(i, j, k) {
    //return i * ctrlPointsSize.x * ctrlPointsSize.y + j * ctrlPointsSize.y + k;
    //return x + y * xSize + z * xSize * ySize;
    let index = i + j * ctrlPointsSize.x + k * ctrlPointsSize.x * ctrlPointsSize.y;
    return index;
  }
  function getIndexV1(i, j, k) {
    return i * ctrlPointsSize.x * ctrlPointsSize.y + j * ctrlPointsSize.y + k;
  }

  // world location to local postion
  function getLocalPositon(position) {
    return ctrl_pt_meshes[0].parent.worldToLocal(position.clone())
  }

  //planes.push(getPointsOnPlane(ctrl_pt_meshes, bbox.min.x, null, null));
  function getPointsOnPlane(controlPoints, x, y, z) {
      const delta = 0.1/object_scale;
      const result = [];
      for (const controlPoint of controlPoints) {
          if (
              (x === null || Math.abs(controlPoint.position.x - x) < delta)
          &&  (y === null || Math.abs(controlPoint.position.y - y) < delta)
          &&  (z === null  || Math.abs(controlPoint.position.z - z) < delta)
          ) {
              result.push(controlPoint);
          }
      }

      return result;
  }

  function onControlPointSelect(object, shiftKey, ctrlKey) {
    if (!selectedControlPoints.has(object)) {
      if (!shiftKey) {
        clearSelection();
      }
      selectedControlPoints.add(object);
      object.material = selected_ctrl_pt_material.clone();
    }

    if (ctrlKey) {
      for (const neighborObject of object.adjacentPoints) {
        selectedControlPoints.add(neighborObject);
        neighborObject.material = selected_ctrl_pt_material.clone();
      }
    }
  }

  function clearSelection() {
    for (const controlPoint of selectedControlPoints) {
      controlPoint.material = ctrl_pt_material.clone();
    }

    selectedControlPoints.clear();
  }

  function onDrag(delta){
    for (const controlPoint of selectedControlPoints) {
      // all contrl points' position will move to the new position
      const newVertexPosition = getPosition(controlPoint.vertexIndex).add(delta);
      const localPosition = getLocalPositon(newVertexPosition);
      controlPoint.material = selected_ctrl_pt_material.clone();
      //console.log("newVertexPosition--controlPoint.vertexIndex-",controlPoint.vertexIndex, newVertexPosition);
      controlPoint.position.copy(newVertexPosition);
    }
  }

  //on mouse move
  function onDocumentMouseMove(event) {
    event.preventDefault();
    setRaycaster(event);
    if ( SELECTED ) {
      if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
        let premove_pos=SELECTED.clone().position;
        //SELECTED.position.copy( intersection.sub(offset));
        let aftermove_pos=intersection.sub(offset);
        const delta = aftermove_pos.clone().sub(premove_pos);
        onDrag(delta);
        // update lattice
        updateLattice();
        //re-calculate Object vertices
        //reCalculateVertices(algorithm);
      }else{
        console.log("note: no intersection!");
      }
      return;
    }
    //console.log("******ctrl_pt_meshes****", ctrl_pt_meshes, ctrl_pt_meshes.length);
    const intersects = raycaster.intersectObjects( ctrl_pt_meshes );
    //console.log("**********", intersects, intersects.length);
    if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[0].object ) {
            INTERSECTED = intersects[0].object;
            plane.setFromNormalAndCoplanarPoint(
                camera.getWorldDirection( plane.normal ),
                INTERSECTED.position );
        }
        renderer.domElement.style.cursor = 'pointer';
    } else {
        INTERSECTED = null;
        renderer.domElement.style.cursor = 'auto';
    }
  }

  function onDocumentMouseDown(event){
    event.preventDefault();
    setRaycaster(event);
    const intersects = raycaster.intersectObjects(ctrl_pt_meshes);
    if (intersects.length > 0) {
      orbit_ctrl.enabled=false;
      SELECTED = intersects[0].object;
      if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
          offset.copy(intersection).sub( SELECTED.position );
      }
      renderer.domElement.style.cursor = 'move';
      onControlPointSelect(SELECTED, event.shiftKey, event.ctrlKey);
    }
  }

  function onDocumentMouseUp(event){
    orbit_ctrl.enabled=true;
    if ( INTERSECTED ) SELECTED = null;
    renderer.domElement.style.cursor = 'auto';
  }

  function setRaycasterV1(event){
    let rec=canvasRender.getBoundingClientRect();
    mouse.x = ((event.clientX - rec.left) / canvasRender.offsetWidth) * 2 - 1;
    mouse.y = -((event.clientY - rec.top) / canvasRender.offsetHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
  }

  function setRaycaster(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
  }
}

// method 4: self-drawing
function addSelfDrawingAll() {

  let sphereGeometry = new THREE.SphereGeometry(2, 32, 32);

  renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
  renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
  renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);

  // mesh
  sphere_mesh = new THREE.Mesh(sphereGeometry, new THREE.MeshStandardMaterial({
              color: '#00FF33',
              emissive: 0x404040
          }));
  scene.add(sphere_mesh); // add the mesh to the scene

  const bbox = new THREE.Box3().setFromObject(sphere_mesh);


  // re-initialize 
  ctrlPtsPoints.length=0;

  ctrlPointsSize=new THREE.Vector3(spanSize.x+1, spanSize.y+1, spanSize.z+1);
  totalCtrlPointsSize=ctrlPointsSize.x * ctrlPointsSize.y * ctrlPointsSize.z;

  let S=new THREE.Vector3(0, 0, 0);
  let T=new THREE.Vector3(0, 0, 0);
  let U=new THREE.Vector3(0, 0, 0);

  // Set the S/T/U axes.
  S.x = bbox.max.x - bbox.min.x;
  T.y = bbox.max.y - bbox.min.y;
  U.z = bbox.max.z - bbox.min.z;

  // Assign a new position to each control point.
  for(let i=0;i<ctrlPointsSize.x;i++){
    for(let j=0;j<ctrlPointsSize.y;j++){
      for(let k=0;k<ctrlPointsSize.z;k++){
        let position=new THREE.Vector3(
          bbox.min.x + (i / spanSize.x) * S.x,
          bbox.min.y + (j / spanSize.y) * T.y,
          bbox.min.z + (k / spanSize.z) * U.z);
          setPositionToCtrlPoints(i,j,k,position);
      }
    }
  }


  // draw lattice
  unifyLatticeGroup = new THREE.Group();
  ctrl_pt_meshes.length=0;
  ctrl_line_meshes.length=0;

  //
  let ctrl_pt_geom = new THREE.SphereGeometry(0.08,32,32);
  //let ctrl_pt_material = new THREE.MeshLambertMaterial({ color: "yellow" });
  let ctrl_line_material = new THREE.MeshLambertMaterial({ color: "red" });

  // draw control points
  for(let vertexIndex=0;vertexIndex<totalCtrlPointsSize;vertexIndex++){
    let ctrl_pt_mesh= new THREE.Mesh(ctrl_pt_geom, ctrl_pt_material);
    ctrl_pt_mesh.position.copy(getPosition(vertexIndex));
    ctrl_pt_mesh.vertexIndex = vertexIndex;
    ctrl_pt_mesh.adjacentPoints = new Set();
    ctrl_pt_meshes.push(ctrl_pt_mesh);
    //scene.add(ctrl_pt_mesh);
    unifyLatticeGroup.add(ctrl_pt_mesh);
  }

  // add adjecnet control points in the same plane
  const planes = [];
  planes.push(getPointsOnPlane(ctrl_pt_meshes, bbox.min.x, null , null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, bbox.max.x, null , null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , bbox.min.y, null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , bbox.max.y, null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , null , bbox.min.z));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , null , bbox.max.z));

  for (const controlPoints of planes) {
    for (const controlPoint of controlPoints) {
      for (const controlPointAdjacent of controlPoints) {
          controlPoint.adjacentPoints.add(controlPointAdjacent);
      }
    }
  }


  // draw lines between control points
  // Lines in S direction
  for(let i=0;i<ctrlPointsSize.x-1;i++){
    for(let j=0;j<ctrlPointsSize.y;j++){
      for(let k=0;k<ctrlPointsSize.z;k++){
        const linePoints=[];
        linePoints.push(ctrl_pt_meshes[getIndex(i,j,k)].position);
        linePoints.push(ctrl_pt_meshes[getIndex(i+1,j,k)].position);
        const lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoints );
        const lineMesh = new THREE.Line( lineGeometry, ctrl_line_material );
        lineMesh.geometry.attributes.position.needsUpdate = true;
        ctrl_line_meshes.push(lineMesh);
        unifyLatticeGroup.add(lineMesh);
        //scene.add( lineMesh );
      }
    }
  }

  // Lines in T direction
  for(let i=0;i<ctrlPointsSize.x;i++){
    for(let j=0;j<ctrlPointsSize.y-1;j++){
      for(let k=0;k<ctrlPointsSize.z;k++){
        const linePoints=[];
        linePoints.push(ctrl_pt_meshes[getIndex(i,j,k)].position);
        linePoints.push(ctrl_pt_meshes[getIndex(i,j+1,k)].position);
        const lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoints );
        const lineMesh = new THREE.Line( lineGeometry, ctrl_line_material );
        lineMesh.geometry.attributes.position.needsUpdate = true;
        ctrl_line_meshes.push(lineMesh);
        unifyLatticeGroup.add(lineMesh);
        //scene.add( lineMesh );
      }
    }
  }
  // Lines in U direction
  for(let i=0;i<ctrlPointsSize.x;i++){
    for(let j=0;j<ctrlPointsSize.y;j++){
      for(let k=0;k<ctrlPointsSize.z-1;k++){
        const linePoints=[];
        linePoints.push(ctrl_pt_meshes[getIndex(i,j,k)].position);
        linePoints.push(ctrl_pt_meshes[getIndex(i,j,k+1)].position);
        const lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoints );
        const lineMesh = new THREE.Line( lineGeometry, ctrl_line_material );
        lineMesh.geometry.attributes.position.needsUpdate = true;
        ctrl_line_meshes.push(lineMesh);
        unifyLatticeGroup.add(lineMesh);
        //scene.add( lineMesh );
      }
    }
  }

  scene.add(unifyLatticeGroup);

  function updateLattice(){
    // Update the positions of all control point in the FFD object.
    for(let i=0;i<totalCtrlPointsSize;i++){
      setPosition(i, ctrl_pt_meshes[i].position);
    }

    // Update the positions of all lines of the lattice.
    let line_index=0;
    // Lines in S direction
    for(let i=0;i<ctrlPointsSize.x-1;i++){
      for(let j=0;j<ctrlPointsSize.y;j++){
        for(let k=0;k<ctrlPointsSize.z;k++){
          let line=ctrl_line_meshes[line_index++];
          //console.log("line-----", line, line.geometry.position);
          let linePtPosition=line.geometry.attributes.position.array;
          let ctr_pt_pos1=ctrl_pt_meshes[getIndex(i, j, k)].position;
          let ctr_pt_pos2=ctrl_pt_meshes[getIndex(i+1, j, k)].position;
          linePtPosition[0]=ctr_pt_pos1.x;linePtPosition[1]=ctr_pt_pos1.y;linePtPosition[2]=ctr_pt_pos1.z;
          linePtPosition[3]=ctr_pt_pos2.x;linePtPosition[4]=ctr_pt_pos2.y;linePtPosition[5]=ctr_pt_pos2.z;
          line.geometry.attributes.position.needsUpdate = true;
        }
      }
    }
    // Lines in T direction
    for(let i=0;i<ctrlPointsSize.x;i++){
      for(let j=0;j<ctrlPointsSize.y-1;j++){
        for(let k=0;k<ctrlPointsSize.z;k++){
          let line=ctrl_line_meshes[line_index++];
          let linePtPosition=line.geometry.attributes.position.array;
          let ctr_pt_pos1=ctrl_pt_meshes[getIndex(i, j, k)].position;
          let ctr_pt_pos2=ctrl_pt_meshes[getIndex(i, j+1, k)].position;
          linePtPosition[0]=ctr_pt_pos1.x;linePtPosition[1]=ctr_pt_pos1.y;linePtPosition[2]=ctr_pt_pos1.z;
          linePtPosition[3]=ctr_pt_pos2.x;linePtPosition[4]=ctr_pt_pos2.y;linePtPosition[5]=ctr_pt_pos2.z;
          line.geometry.attributes.position.needsUpdate = true;
        }
      }
    }
    // Lines in T direction
    for(let i=0;i<ctrlPointsSize.x;i++){
      for(let j=0;j<ctrlPointsSize.y;j++){
        for(let k=0;k<ctrlPointsSize.z-1;k++){
          let line=ctrl_line_meshes[line_index++];
          let linePtPosition=line.geometry.attributes.position.array;
          let ctr_pt_pos1=ctrl_pt_meshes[getIndex(i, j, k)].position;
          let ctr_pt_pos2=ctrl_pt_meshes[getIndex(i, j, k+1)].position;
          linePtPosition[0]=ctr_pt_pos1.x;linePtPosition[1]=ctr_pt_pos1.y;linePtPosition[2]=ctr_pt_pos1.z;
          linePtPosition[3]=ctr_pt_pos2.x;linePtPosition[4]=ctr_pt_pos2.y;linePtPosition[5]=ctr_pt_pos2.z;
          line.geometry.attributes.position.needsUpdate = true;
        }
      }
    }
  }


  // Returns the position of the control point at the given unary index.
  function getPosition(index) {
    return ctrlPtsPoints[index];
  };

  // Sets the position of the control point at the given unary index.
  function setPosition(index, position) {
    ctrlPtsPoints[index] = position;
  };

  // Returns the position of the control point at the given ternary index.
  function getPositionToCtrlPoints(i, j, k) {
    return ctrlPtsPoints[getIndex(i, j, k)];
  };

  // Sets the position of the control point at the given ternary index.
  function setPositionToCtrlPoints(i, j, k, position){
    ctrlPtsPoints[getIndex(i,j,k)]=position;
  }

  // Converts the given ternary index to a unary index.
  function getIndex(i, j, k) {
    return i * ctrlPointsSize.x * ctrlPointsSize.y + j * ctrlPointsSize.y + k;
  }

  // world location to local postion
  function getLocalPositon(position) {
    return ctrl_pt_meshes[0].parent.worldToLocal(position.clone())
  }

  //planes.push(getPointsOnPlane(ctrl_pt_meshes, bbox.min.x, null, null));
  function getPointsOnPlane(controlPoints, x, y, z) {
      const delta = 0.1/object_scale;
      const result = [];
      for (const controlPoint of controlPoints) {
          if (
              (x === null || Math.abs(controlPoint.position.x - x) < delta)
          &&  (y === null || Math.abs(controlPoint.position.y - y) < delta)
          &&  (z === null  || Math.abs(controlPoint.position.z - z) < delta)
          ) {
              result.push(controlPoint);
          }
      }

      return result;
  }

  function onControlPointSelect(object, shiftKey, ctrlKey) {
    if (!selectedControlPoints.has(object)) {
      if (!shiftKey) {
        clearSelection();
      }
      selectedControlPoints.add(object);
      object.material = selected_ctrl_pt_material.clone();
    }

    if (ctrlKey) {
      for (const neighborObject of object.adjacentPoints) {
        selectedControlPoints.add(neighborObject);
        neighborObject.material = selected_ctrl_pt_material.clone();
      }
    }
  }

  function clearSelection() {
    for (const controlPoint of selectedControlPoints) {
      controlPoint.material = ctrl_pt_material.clone();
    }

    selectedControlPoints.clear();
  }

  function onDrag(delta){
    for (const controlPoint of selectedControlPoints) {
      // all contrl points' position will move to the new position
      const newVertexPosition = getPosition(controlPoint.vertexIndex).add(delta);
      const localPosition = getLocalPositon(newVertexPosition);
      controlPoint.material = selected_ctrl_pt_material.clone();
      //console.log("newVertexPosition--controlPoint.vertexIndex-",controlPoint.vertexIndex, newVertexPosition);
      controlPoint.position.copy(newVertexPosition);
    }
  }

  //on mouse move
  function onDocumentMouseMove(event) {
    event.preventDefault();
    setRaycaster(event);
    if ( SELECTED ) {
      if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
        let premove_pos=SELECTED.clone().position;
        //SELECTED.position.copy( intersection.sub(offset));
        let aftermove_pos=intersection.sub(offset);
        const delta = aftermove_pos.clone().sub(premove_pos);
        onDrag(delta);
        // update lattice
        updateLattice();
        //re-calculate Object vertices
        //reCalculateVertices(algorithm);
      }else{
        console.log("note: no intersection!");
      }
      return;
    }
    
    const intersects = raycaster.intersectObjects( ctrl_pt_meshes );
    if ( intersects.length > 0 ) {
        if ( INTERSECTED != intersects[0].object ) {
            INTERSECTED = intersects[0].object;
            plane.setFromNormalAndCoplanarPoint(
                camera.getWorldDirection( plane.normal ),
                INTERSECTED.position );
        }
        renderer.domElement.style.cursor = 'pointer';
    } else {
        INTERSECTED = null;
        renderer.domElement.style.cursor = 'auto';
    }
  }

  function onDocumentMouseDown(event){
    event.preventDefault();
    setRaycaster(event);
    const intersects = raycaster.intersectObjects(ctrl_pt_meshes);
    if (intersects.length > 0) {
      orbit_ctrl.enabled=false;
      SELECTED = intersects[0].object;
      if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
          offset.copy(intersection).sub( SELECTED.position );
      }
      renderer.domElement.style.cursor = 'move';
      onControlPointSelect(SELECTED, event.shiftKey, event.ctrlKey);
    }
  }

  function onDocumentMouseUp(event){
    orbit_ctrl.enabled=true;
    if ( INTERSECTED ) SELECTED = null;
    renderer.domElement.style.cursor = 'auto';
  }

  function reCalculateVertices(algorithm) {
    if(algorithm === DECASTELJAU) {
      reCalculateVertices_decas();
    } else if(algorithm === BSPOLYNOMIAL){
      reCalculateVertices_bspolynomial();
    }
  }

  function setRaycasterV1(event){
    let rec=canvasRender.getBoundingClientRect();
    mouse.x = ((event.clientX - rec.left) / canvasRender.offsetWidth) * 2 - 1;
    mouse.y = -((event.clientY - rec.top) / canvasRender.offsetHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
  }

  function setRaycaster(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
  }
}



function initCanvas() {
  scene.remove(material);
  renderer.render( scene, camera );
}

function drawCustomAxis(){
  // ---------------------- inset canvas ----------------------

  var CANVAS_WIDTH = 200;
  var CANVAS_HEIGHT = 200;
  arrowRenderer = new THREE.WebGLRenderer( { alpha: true } ); // clear
  arrowRenderer.setClearColor( 0x000000, 0 );
  arrowRenderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );

  arrowCanvas = document.body.appendChild( arrowRenderer.domElement );
  arrowCanvas.setAttribute('id', 'arrowCanvas');
  arrowCanvas.style.width = CANVAS_WIDTH;
  arrowCanvas.style.height = CANVAS_HEIGHT;
        
  arrowScene = new THREE.Scene();

  var arrowCamera = new THREE.PerspectiveCamera( 50, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000 );
  arrowCamera.up = camera.up; // important!

  var arrowPos = new THREE.Vector3( 0,0,0 );
  arrowScene.add( new THREE.ArrowHelper( new THREE.Vector3( 1,0,0 ), arrowPos, 60, 0x7F2020, 20, 10 ) );
  arrowScene.add( new THREE.ArrowHelper( new THREE.Vector3( 0,1,0 ), arrowPos, 60, 0x207F20, 20, 10 ) );
  arrowScene.add( new THREE.ArrowHelper( new THREE.Vector3( 0,0,1 ), arrowPos, 60, 0x20207F, 20, 10 ) );

}

function animate() {
  requestAnimationFrame( animate );
  orbit_ctrl.update();
  render();
}

function render(){
  renderer.render( scene, camera );
}
