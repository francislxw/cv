/*
 =====================================================================
 @license MIT
 @author Francis
 @copyright 2021 Francis.Luo
 @end
 =====================================================================
 */
import * as THREE from './threejs/three.module.js';
import * as HALFTHREE from './threejs/HalfThree.js';
import * as LATTICES from './threejs/Lattices.js';
//import { dat } from './threejs/dat.gui.min.js';
import { GUI } from './threejs/dat.gui.module.js';
import { OrbitControls } from './threejs/OrbitControls.js';
import { OBJLoader } from './threejs/OBJLoader.js';

//gui part
const OPEN_MFILE_DIALOG        = 0,     // open file dialog
      USER_CHOOSE_REAL_PROJECT = 1,     // real project, not used
      COLOR_ID                 = 2 ,    // background color id
      OBJECT_COLOR_ID          = 3,     // model's color
      TRANSFORM_TRANSLATE      = 5,     // translate
      TRANSFORM_SCALE          = 6,     // scale
      TRANSFORM_NONE           = 7,     // none
      SCALE_SPINNER            = 8,     // spinner, not used
      DISPLAY_TYPE_ID          = 9,     // display id
      DISPLAY_POINTS           = 10,    // point
      DISPLAY_WIRE             = 11,    // wire
      DISPLAY_FLAT             = 12,    // flat
      DISPLAY_SMOOTH           = 13,    // smooth
      PROJECTION_ID            = 14,    // projection
      PROJECTION_ORO           = 15,    // oroth
      PROJECTION_PER           = 16,    // perspective
      VIEW_ID                  = 17,    // projection mode
      VIEW_3D                  = 18,    // 3D
      VIEW_ZX                  = 19,    // ZX
      VIEW_YZ                  = 20,    // YZ
      VIEW_XY                  = 21,    // XY
      DECASTELJAU              = 22,    // De Casteljau algorithm
      BSPOLYNOMIAL             = 23,    // Bernstein's Polynomial algorithm
      MESHFILE                 = 24,    // file type: mesh file
      OBJFILE                  = 25,    // file type: Obj file
      QUIT_BUTTON              = 24;    // quit

const styleMap= {
  "Points" : DISPLAY_POINTS,
  "Wireframe" : DISPLAY_WIRE,
  "FlatShading" : DISPLAY_FLAT,
  "SmoothShading" : DISPLAY_SMOOTH
}
const veiwCamTypeMap = {
  "Orthogonal" : PROJECTION_ORO,
  "Perspective" : PROJECTION_PER
}

const personViewTypeMap = {
  "3D" : VIEW_3D,
  "ZX" : VIEW_ZX,
  "YZ" : VIEW_YZ,
  "XY" : VIEW_XY
}

const algorithmMap = {
  "DeCasteljau"  : DECASTELJAU,
  "BSPolynomial" : BSPOLYNOMIAL
}

// Scene
let container, camera, camera_per, camera_oro, scene, renderer, user_options, orbit_ctrl, help_plane, Axises_group;
let light1, light2, light3, light4;
//let bk_r=new THREE.Color( "rgb(242, 242, 242)");
let bk_r="#030000";
//bk_r=new THREE.Color("black");
//let ob_r = new THREE.Color("rgb(163, 162, 162)");
let ob_r = "#e8e6e6";

// Subdivision surface
let smooth_mesh;
let smooth_mesh_undeformed=[];
let model_index=0;
let model_scale=1.0;

// GUI
let display_mode = DISPLAY_SMOOTH,view_type=VIEW_3D, vtcamera=PROJECTION_PER;
let algorithm=DECASTELJAU, fileType=MESHFILE;
let drawbboxflag=false;

// FFD: control points of a lattice
let lattice = null;
let ctrl_pt_meshes = [];
let latticeGroup = null;
let ctrlPtsPoints = [];
let spanSize = 2;
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

// model
let currentModel = 'cap';
let object_pos_undeformed=[];
let m_positions=[];
let normals=[];

// geometry related
let object_mesh, material, bbox;
let object_scale=1.0;


// start scene
init();
initialize();
initGUI();
animate();

function init(){
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
  camera.position.set(10,2,10);

  scene = new THREE.Scene();

  // Light
  let light0 = new THREE.PointLight(0xffffff, 1.5);
  light0.position.set(1000, 1000, 2000);
  scene.add(light0);

 /*  // light2
  var light = new THREE.DirectionalLight( ob_r );
  light.position.set( 0, 300, 300 );
  light.castShadow = true;
  light.shadow.camera.near = 1000;
  light.shadow.camera.far = 4000;
  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;
  scene.add(light);

 //var ambientLight = new THREE.AmbientLight( 0x3f2806 );
  var ambientLight = new THREE.AmbientLight( ob_r );
  scene.add( ambientLight );

  //var pointLight = new THREE.PointLight( 0xffaa00, 1, 5000 );
  var pointLight = new THREE.PointLight( ob_r, 1, 5000 );
  scene.add( pointLight );*/
  

  //lights
  const sphere = new THREE.SphereGeometry( 0.2, 16, 8 );
  light1 = new THREE.PointLight( 0xff0040, 2, 50 );
  light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
  scene.add( light1 );

  light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
  light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
  scene.add( light2 );

  light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
  light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
  scene.add( light3 );

  light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
  light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
  scene.add( light4 );


  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("black");
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
  renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
  renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
  renderer.domElement.oncontextmenu = function (e) {
     e.preventDefault();
     return false; 
  }

  // Orbit controls
  orbit_ctrl = new OrbitControls(camera, renderer.domElement);
  orbit_ctrl.damping = 0.2;
  //orbit_ctrl.addEventListener('change', renderer);

  // Help plane
  help_plane = new THREE.GridHelper(80, 50);
  //help_plane = new THREE.GridHelper( 1000, 10, 0x888888, 0x444444 );
  scene.add(help_plane);

  // Axises
  let axises=generateAxises();
  scene.add(axises);

  window.addEventListener('resize', onWindowResize, false);
}

function generateAxises(){
  Axises_group = new THREE.Group();
  let dir_x = new THREE.Vector3(10, 0, 0);
  let dir_y = new THREE.Vector3(0, 10, 0);
  let dir_z = new THREE.Vector3(0, 0, 10);
  
  // normalize x, y, z
  dir_z.normalize();
  dir_x.normalize();
  dir_y.normalize();

  // the point of arrows
  let origin = new THREE.Vector3(0, 0, 0);

  // length of arrows
  let length = 5;

  // color definition, default value: 0xffff00
  let hex_x = 0xFF0000;
  let hex_y = 0x207F20;
  let hex_z = 0xffff00;

  // depth of arrows, default value 0.2 *length
  let headLength = 0.5;
  
  // length of arrows, default value is: 0.2 * headLength。
  let headWidth = 0.2;
  
  // helper of arrows
  let arrowHelper_x = new THREE.ArrowHelper(dir_x, origin, length, hex_x,headLength,headWidth);
  let arrowHelper_y = new THREE.ArrowHelper(dir_y, origin, length, hex_y,headLength,headWidth);
  let arrowHelper_z = new THREE.ArrowHelper(dir_z, origin, length, hex_z,headLength,headWidth);

  Axises_group.add(arrowHelper_z);
  Axises_group.add(arrowHelper_y);
  Axises_group.add(arrowHelper_x);

  return Axises_group;
}

function initialize() {
  lattice = new LATTICES.Lattice();
}

function refreshVariables() {
  if(deformed_positions.length>0) deformed_positions=[];
  if(m_positions.length>0) m_positions=[];
  if(normals.length>0) normals=[];
  if(object_pos_undeformed.length>0) object_pos_undeformed=[];
}

function initGUI() {
  let uiSettings = {
    loadFile : function() { 
                document.getElementById('myInput').click();
        },
    mesh: 'sphere',
    displayStyle: 'SmoothShading',
    drawAxis: true,
    drawGrid: true,
    drawBoundingBox: false,
    objectColor: ob_r,
    bkgundColor: bk_r,     //black    
    cameraType: 'Perspective',
    viewType: '3D',
    algorithmType: 'DeCasteljau',
    vertexSize: 1,
    divisions: 2,

    showLattice: true
  };

  const gui = new GUI();

  gui.add(uiSettings, 'loadFile').name('Load Model...');

  // mesh
  gui.add(uiSettings, 'displayStyle', ['Points', 'Wireframe', 'FlatShading', 'SmoothShading'])
             .setValue('SmoothShading')
             .onChange(() => onChangeStyles(uiSettings.displayStyle));
  // drawings related
  const drawingsFolder=gui.addFolder('ASIST DRAWINGS');
  // draw axis
  drawingsFolder.add(uiSettings, 'drawAxis').onChange(() => onDrawAxis(uiSettings.drawAxis));
  // draw grid helper
  drawingsFolder.add(uiSettings, 'drawGrid').onChange(() => onDrawGrid(uiSettings.drawGrid));
  // draw bounding box
  drawingsFolder.add(uiSettings, 'drawBoundingBox').onChange(() => onDrawBoundBox(uiSettings.drawBoundingBox));
  drawingsFolder.open();

  // model & background colors
  const colorFolder=gui.addFolder('COLOR');
  colorFolder.addColor(uiSettings, 'objectColor').onChange(() => setModelColor(uiSettings.objectColor));
  colorFolder.addColor(uiSettings, 'bkgundColor').onChange(() => setBacgroundColor(uiSettings.bkgundColor));
  colorFolder.open();
  // camera type
  gui.add(uiSettings, 'cameraType', ['Orthogonal', 'Perspective']).onChange(() => onCameraViewType(uiSettings.cameraType));

  // person view type
  gui.add(uiSettings, 'viewType', ['3D', 'YZ', 'ZX', 'XY']).onChange(() => onPersonViewType(uiSettings.viewType));

  // vertex size
  gui.add(uiSettings, 'vertexSize').min(1).max(2).step(0.1).onChange(() => onLatticeVertexSize(uiSettings.vertexSize));

  // division
  gui.add(uiSettings, 'divisions',[1, 2, 3]).onChange(() => onDivisions(uiSettings.divisions));

  // algorithm
  gui.add(uiSettings, 'algorithmType', ['DeCasteljau', 'BSPolynomial']).onChange(() => onAlgoritymType(uiSettings.algorithmType));
}

//-------------------------------------------------------------------------
//  Open M File dialog.
//-------------------------------------------------------------------------
const input = document.querySelector('input');

input.addEventListener('change', openMeshDialog);

function openMeshDialog() {
  const file = input.files[0];
  removeObjects();
  removeLattice();
  refreshVariables();
  if(file.name.indexOf('.m')>0){
    console.log("it's a mesh file");
    fileType = MESHFILE;
    if (file) {
      // continue tacke following things
      new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (evt) {
          resolve(evt.target.result);
        };
        reader.readAsText(file);
        reader.onerror = reject;
      })
      .then(processMeshFileContent)
      .catch(function(err) {
        console.log(err)
      });
    }
  }else if(file.name.indexOf('.obj')>0){
    console.log("it's an obj file", file.name);
    fileType = OBJFILE;
    processObjFileContent("./models/obj/" + file.name);
  }
}
function processMeshFileContent(data) {
  let newModel=new HALFTHREE.LoadMesh(data);
  object_scale=newModel.getObjectScale();
  // it's used in Lattice to get adjecent points of one control point
  lattice.setObjectScale(object_scale);
  m_positions=newModel.getFacesPositions();
  normals=newModel.getNoramls();
  addObject(m_positions, normals, true);
  if(drawbboxflag) drawLattice(false);
}

function processObjFileContent(file) {
  const objLoader = new OBJLoader();
  objLoader.load(file, function( obj ){
    obj.traverse( function( child ) {
      if ( child instanceof THREE.Mesh ) {
        let ori_positions = child.geometry.attributes.position.array;
        let bbox = new THREE.Box3().setFromObject(child);
        let cent = bbox.getCenter(new THREE.Vector3());
        let size = bbox.getSize(new THREE.Vector3());
        let maxAxis = Math.max(size.x, size.y, size.z);
        object_scale=1.0 /maxAxis *5;
        lattice.setObjectScale(object_scale);
        for(let i=0;i<ori_positions.length;i++){
          ori_positions[i] *= object_scale;
        }
        m_positions = [...ori_positions];
        normals = child.geometry.attributes.normal.array;
        addObject(ori_positions, normals, true);
        if(drawbboxflag) drawLattice(false);
      }
    } );
  });
}

function onChangeStyles(style) {
  removeObjects();
  display_mode = styleMap[style];
  console.log("style---display_mode---", style, display_mode);
  if(drawbboxflag && deformed_positions.length>0){
    addObject(deformed_positions, normals, false);
  }else{
    console.log("m_positions---", m_positions.length);
    addObject(m_positions, normals, false);
  }
}

function onDrawAxis(flag) {
  if(flag) {
    scene.add(Axises_group);
  }else{
    scene.remove(Axises_group);
  }
  render();
}

function onDrawGrid(flag) {
  if(flag){
    scene.add(help_plane);
  }else{
    scene.remove(help_plane);
  }
  render();
}

function onDrawBoundBox(flag) {
  console.log("drawBoundBox---", flag);
  drawbboxflag=flag;
  if(flag) {
    drawLattice(false);
  }else{
    console.log("enter,,,,", flag);
    removeLattice();
  }
  render();

}

function drawLattice(span_change_only){
  // remove exist lattice firstly
  removeLattice();

  let bbox;
  if(span_change_only){
    bbox=lattice.getBoudndingBox();
  }else{
    bbox = new THREE.Box3().setFromObject(object_mesh);
  }
  let span_size_copy=new THREE.Vector3(spanSize, spanSize, spanSize);
  lattice.rebuildLattice(bbox, span_size_copy);
  lattice.drawLattice();
  latticeGroup=lattice.getLatticeGroup();
  ctrlPtsPoints=[...lattice.getCtrlPoints()];
  ctrl_pt_meshes=[...lattice.getCtrlPointMeshes()];
  scene.add(latticeGroup);
}

function setModelColor(color) {
  ob_r=color;
  object_mesh.material.color.set(ob_r);
  render();
}

function setBacgroundColor(color){
  bk_r = color;
  renderer.setClearColor( bk_r, 1 );
}

function onCameraViewType(camType) {
  console.log("cameraViewType---", camType);
  vtcamera = veiwCamTypeMap[camType];
  if(vtcamera==PROJECTION_PER){
    camera = camera_per;
    camera.position.set(10,2,10);
  }else if(vtcamera==PROJECTION_ORO){
    camera = camera_oro;
    camera.position.x = 400;
    camera.position.y = 400;
    camera.position.z = 400;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }
  orbit_ctrl.update();

}

function onPersonViewType(eyeType) {
  console.log("personViewType---", eyeType);
  if(vtcamera==PROJECTION_ORO) return;
  camera=camera_per;
  if(personViewTypeMap[eyeType] === VIEW_3D){
    camera.position.set(10,2,10);
  }else if(personViewTypeMap[eyeType] === VIEW_ZX){
    camera.position.set(0, 10, 0);
  }else if(personViewTypeMap[eyeType] === VIEW_YZ){
    camera.position.set(10, 0, 0);
  }else if(personViewTypeMap[eyeType] === VIEW_XY){
    camera.position.set(0, 0, 10);
  }
  orbit_ctrl.update();
}

function onLatticeVertexSize (size) {
  for(const contrlPoint of ctrl_pt_meshes) {
    contrlPoint.scale.x = size;
    contrlPoint.scale.y = size;
    contrlPoint.scale.z = size;
  }
}

function onDivisions(nums) {
  console.log("divisions---", nums);
  if(!drawbboxflag) return;
  spanSize=parseInt(nums);
  removeLattice();
  removeObjects();
  drawLattice(true);
  addObject(m_positions, normals, true);
}

function onAlgoritymType(algorithmType) {
  console.log("algorithmType---", algorithmType);
  algorithm=algorithmMap[algorithmType];
}

function removeObjects() {
  scene.remove(object_mesh);
  render();
}

function removeLattice(){
  if(latticeGroup !== null ) scene.remove(latticeGroup);
  ctrlPtsPoints.length=0;
  ctrl_pt_meshes.length=0;
}

function addObject(positions, noramls,newModel) {
  if(positions.length <=0) return;
  if(newModel){
    //only store the oringal undeformed positions of new model info for FFD
    object_pos_undeformed= [...positions];
  }

  let object_geometry = new THREE.BufferGeometry();
  object_geometry.setAttribute( 'position', new THREE.BufferAttribute(new Float32Array(positions), 3 ) );

  if(display_mode === DISPLAY_POINTS)
  {
    material = new THREE.PointsMaterial({
        size: 1.0/object_scale,
        color: ob_r,
        //vertexColors: true,
        transparent: false,
        depthTest: false,
        sizeAttenuation: false
    });
    object_mesh = new THREE.Points(object_geometry, material );
    scene.add(object_mesh);
  } else {
    if(display_mode === DISPLAY_WIRE){
      material = new THREE.MeshLambertMaterial({
          color: ob_r,
          wireframe : true,
          side: THREE.DoubleSide
      });

      object_mesh = new THREE.Mesh(object_geometry, material);
      scene.add( object_mesh );

    } else if(display_mode === DISPLAY_FLAT || display_mode === DISPLAY_SMOOTH){
      object_geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
      material = new THREE.MeshPhongMaterial( { color: ob_r, specular: ob_r, shininess: 20, side: THREE.DoubleSide} );
      object_mesh = new THREE.Mesh( object_geometry, material );
      scene.add( object_mesh );
      if(display_mode == DISPLAY_FLAT){
        object_mesh.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh )
                child.material = new THREE.MeshPhongMaterial( {
                    color: ob_r, specular: ob_r, flatShading: THREE.FlatShading, shininess: 20, side: THREE.DoubleSide} )
        });
      }
    }
  }
  object_geometry.attributes.position.needsUpdate = true;
  scene.updateMatrixWorld(true);
  render();
}

function onShowLatticeChange(showLattice) {
  //
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  setRaycaster(event);
  if ( SELECTED ) {
    if ( raycaster.ray.intersectPlane( plane, intersection ) ) {
      let premove_pos=SELECTED.clone().position;
      //SELECTED.position.copy( intersection.sub(offset));
      let aftermove_pos=intersection.sub(offset);
      const delta = aftermove_pos.clone().sub(premove_pos);
      lattice.onDrag(delta);
      // update lattice
      lattice.updateLattice();
      //re-calculate Object vertices
      reCalculateVertices(algorithm);
      //store deformed postions info for rapidly changing display style
      deformed_positions = lattice.getObjectPostions();
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
    lattice.onControlPointSelect(SELECTED, event.shiftKey, event.ctrlKey);
  }
}

function onDocumentMouseUp(event){
  orbit_ctrl.enabled=true;
  if ( INTERSECTED ) SELECTED = null;
  renderer.domElement.style.cursor = 'auto';
}

function reCalculateVertices(algorithm) {
  lattice.setUndeformedPosition(object_pos_undeformed);
  lattice.setObjectMesh(object_mesh);
  if(algorithm === DECASTELJAU) {
    lattice.reCalculateVertices_decas();
  } else if(algorithm === BSPOLYNOMIAL){
    lattice.reCalculateVertices_bspolynomial();
  }
}

function setRaycaster(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
}

function animate() {
  requestAnimationFrame(animate);
  orbit_ctrl.update();
  render();
}

function render() {

  const time = Date.now() * 0.0005;

  light1.position.x = Math.sin( time * 0.7 ) * 3 * 2;
  light1.position.y = Math.cos( time * 0.5 ) * 4 * 2;
  light1.position.z = Math.cos( time * 0.3 ) * 3 * 2;

  light2.position.x = Math.cos( time * 0.3 ) * 3 * 2;
  light2.position.y = Math.sin( time * 0.5 ) * 4 * 2;
  light2.position.z = Math.sin( time * 0.7 ) * 3 * 2;

  light3.position.x = Math.sin( time * 0.7 ) * 3 * 2;
  light3.position.y = Math.cos( time * 0.3 ) * 4 * 2;
  light3.position.z = Math.sin( time * 0.5 ) * 3 * 2;

  light4.position.x = Math.sin( time * 0.3 ) * 3 * 2;
  light4.position.y = Math.cos( time * 0.7 ) * 4 * 2;
  light4.position.z = Math.sin( time * 0.5 ) * 3 * 2;

  renderer.render(scene, camera);
}
