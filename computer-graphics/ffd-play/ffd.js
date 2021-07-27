/*
 =====================================================================
 @license MIT
 @author Francis
 @copyright 2021 Francis.Luo
 @end
 =====================================================================
 */
import { OrbitControls } from "./resources/OrbitControls.js";
import * as THREE from "./resources/three.module.js";

const OPEN_MFILE_DIALOG        = 0,     // open file dialog
      USER_CHOOSE_REAL_PROJECT = 1,     // real project, not used
      COLOR_ID                 = 2 ,    // background color id
      OBJECT_COLOR_ID          = 3,     // model's color
      TRANSFORM_ROTATE         = 4 ,    // rotate
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
      QUIT_BUTTON              = 24;    // quit

// UI related variables
let display_mode = DISPLAY_SMOOTH;
let cubeRotation = 0.0;
// will set to true when video can be copied to texture
let gl, renderer, arrowRenderer, arrowScene, arrowCamera, axises_group, canvasRender;
let scene, camera, camera_oro, camera_per, material, orbit_ctrl, world_axis, help_plane;
let arrowHelper_z, arrowHelper_y, arrowHelper_x;
let drawaxisflag=true, drawlatticeflag=false, view_type=VIEW_3D, vtcamera=PROJECTION_PER,algorithm=DECASTELJAU;
let object_scale=1.0;

// background and object color
let bk_r=new THREE.Color( "rgb(242, 242, 242)");
//const ob_r = new THREE.Color( "rgb(227, 227, 227)");
let ob_r = new THREE.Color("rgb(163, 162, 162)");

function Point(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

//store the up 4 points of bounding box
var bbu = [new Point(0,0,0), new Point(0,0,0), new Point(0,0,0), new Point(0,0,0)];
//store the down 4 points of bounding box
var bbd = [new Point(0,0,0), new Point(0,0,0), new Point(0,0,0), new Point(0,0,0)]; 

var minP = new Point(100000, 100000, 100000);
var maxP = new Point(-100000,-100000,-100000);
var size = new Point(0, 0, 0);
var boxs = 0;

var axis_x=1.5;
var axis_y=1.5;
var axis_z=1.5;


let Half_Edges=[];
let half_faces=[];
let half_vertices=[];
let vertex_positions=[];
let face_positions=[];
let m_positions=[];
let object_pos_undeformed=[];
let object_mesh=[];
let All_Half_Edges=[];
let normals=[];

// FFD: control points of a lattice
let lattice = null;
let ctrl_pt_meshes = [];
let ctrl_line_meshes=[];
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

let bbox=new THREE.Box3();
let mbbox=new THREE.Box3();
let ctrlPointsSize=new THREE.Vector3(0, 0, 0);
let totalCtrlPointsSize=0;

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
animate();


//
// Start here
//
function main() {
  canvasRender = document.getElementById("glcanvas");
  console.log("canvasRender---", canvasRender);
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0, 1000, 10000 );
  camera_per = new THREE.PerspectiveCamera( 75, canvasRender.offsetWidth / canvasRender.offsetHeight, 0.1, 1000 );
  //camera_per = new THREE.PerspectiveCamera( 75, xy_aspect, 0.1, 2000 );
  camera_oro = new THREE.OrthographicCamera(-18, 18, 9, -9, 1, 2000);
  //camera_oro = new THREE.OrthographicCamera(-1 * xy_aspect, 1 * xy_aspect, 1, -1, 1, 2000);
  //camera_oro = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 2000);
  camera=camera_per;
  camera.position.set(8,2,8);
  renderer = new THREE.WebGLRenderer({canvas: canvasRender, antialias: true } );

  renderer.setClearColor( bk_r, 1 );
  renderer.setPixelRatio( window.devicePixelRatio );

  window.addEventListener( 'resize', onWindowResize, false );
  renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
  renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
  renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
  renderer.domElement.oncontextmenu = function (e) {
     e.preventDefault();
     return false; 
  }

  function onWindowResize() {
    camera.aspect = canvasRender.clientWidth / canvasRender.clientHeight;
    camera.updateProjectionMatrix();
  }
  /*var lightdirect = new THREE.DirectionalLight( new THREE.Color(0x328965), 1 );
  var lightambinent = new THREE.AmbientLight( new THREE.Color(0x328965), 1 );

  const ambientLight = new THREE.AmbientLight( new THREE.Color(0x328965) );
  scene.add( ambientLight );

  const light1 = new THREE.PointLight( 0xffffff, 1, 0 );
  light1.position.set( 0, 20, 0 );
  scene.add( light1 );

  const light2 = new THREE.PointLight( 0xffffff, 1, 0 );
  light2.position.set( 10, 20, 10 );
  scene.add( light2 );

  const light3 = new THREE.PointLight( 0xffffff, 1, 0 );
  light3.position.set( - 10, - 20, - 10 );
  scene.add( light3 );

  lightdirect.position.set( 20,20, 0 );
  lightambinent.position.set( 20,20, 0 );
  scene.add( lightdirect );
  scene.add( lightambinent );*/



  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  //gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  //var light = new THREE.DirectionalLight( 0xffffff );
  var light = new THREE.DirectionalLight( ob_r );
  light.position.set( 0, 300, 300 );
  light.castShadow = true;
  scene.add( light );

  //var ambientLight = new THREE.AmbientLight( 0x3f2806 );
  var ambientLight = new THREE.AmbientLight( ob_r );
  scene.add( ambientLight );

  //var pointLight = new THREE.PointLight( 0xffaa00, 1, 5000 );
  var pointLight = new THREE.PointLight( ob_r, 1, 5000 );
  scene.add( pointLight );

  /*const shadowConfig = {

  shadowCameraVisible: false,
  shadowCameraNear: 750,
  shadowCameraFar: 4000,
  shadowBias: - 0.0002

  };

  var sunLight = new THREE.DirectionalLight( 0xffffff, 0.3 );
  sunLight.position.set( 1000, 2000, 1000 );
  //sunLight.castShadow = true;
  sunLight.shadow.camera.top = 750;
  sunLight.shadow.camera.bottom = - 750;
  sunLight.shadow.camera.left = - 750;
  sunLight.shadow.camera.right = 750;
  sunLight.shadow.camera.near = shadowConfig.shadowCameraNear;
  sunLight.shadow.camera.far = shadowConfig.shadowCameraFar;
  sunLight.shadow.mapSize.set( 1024, 1024 );
  sunLight.shadow.bias = shadowConfig.shadowBias;

  scene.add( sunLight );*/


  help_plane = new THREE.GridHelper(20, 50);
  scene.add(help_plane);

  // Axises
  let axises=generateAxises();
  scene.add(axises);

  /*controls = new OrbitControls(camera,renderer.domElement);
  controls.zoomSpeed = 0.5;
  controls.panSpeed = 0.5;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = false;

  controls.minDistance = 0.0;
  controls.maxDistance = 10.0;
  controls.panSpeed = 0.1;
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.rotateSpeed = 0.1;*/
  orbit_ctrl = new OrbitControls(camera, renderer.domElement);
  orbit_ctrl.damping = 0.2;
  orbit_ctrl.update();
  initCanvas();
  //renderer.render( scene, camera );
}

function generateAxises(){
  axises_group = new THREE.Group();
  let dir_x = new THREE.Vector3(6, 0, 0);
  let dir_y = new THREE.Vector3(0, 6, 0);
  let dir_z = new THREE.Vector3(0, 0, 6);
  
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

  axises_group.add(arrowHelper_z);
  axises_group.add(arrowHelper_y);
  axises_group.add(arrowHelper_x);

  return axises_group;
}

//-------------------------------------------------------------------------
//  re-initialize the variables.
//-------------------------------------------------------------------------
function reinitialization()
{
  // Half edges
  if(Half_Edges.length) Half_Edges.length=0;
  // half_faces
  if(half_faces.length) half_faces.length=0;
  // half_vertices
  if(half_vertices.length) half_vertices.length=0;
  // face_positions
  if(face_positions.length) face_positions.length=0;
  // normals
  if(normals.length) normals.length=0;
}

document.addEventListener('input',(e)=>{

  if(e.target.getAttribute('name')=="stylechoice"){
    display_mode = 10 + parseInt(e.target.id);
    removeObjects();
    if(drawlatticeflag && deformed_positions.length>0){
      drawObject(deformed_positions, normals, false);
    }else{
      drawObject(m_positions, normals, false);
    }

  }
  if(e.target.getAttribute('name')=="axis"){
    drawaxisflag=e.target.checked;
    drawAxis(drawaxisflag);
  }

  if(e.target.getAttribute('name')=="grid"){
    drawaxisflag=e.target.checked;
    drawHelpPlane(drawaxisflag);
  }

  if(e.target.getAttribute('name')=="lattice"){
    drawlatticeflag=e.target.checked;
    if(drawlatticeflag) {
      drawLatticeWrap(false);
    }else{
      console.log("remove lattice!");
      removeLattice();
    }
  }

  if(e.target.getAttribute('name')=="objectColor"){
    ob_r =  event.target.value;
    object_mesh.material.color.set(ob_r);
  }

  if(e.target.getAttribute('name')=="backgroundColor"){
    bk_r =  event.target.value;
    renderer.setClearColor( bk_r, 1 );
  }

  if(e.target.getAttribute('name')=="cameraType"){
    vtcamera = parseInt(e.target.id);
    onCameraViewType(vtcamera);
    //console.log(view_type);
  }

  if(e.target.getAttribute('name')=="viewType"){
    view_type = parseInt(e.target.id);
    viewTypeEye(view_type);
    //console.log(view_type);
  }

  if(e.target.getAttribute('name')=="algorithms"){
    algorithm = parseInt(e.target.id);
  }

  //initCanvas();
  animate();

})

function viewTypeEye(viewType) {
  console.log(viewType,VIEW_ZX);
  if(vtcamera==PROJECTION_ORO) return;
  camera=camera_per;
  console.log(viewType==VIEW_ZX);
  if(viewType==VIEW_3D){
    camera.position.set(8,2,8);
  }else if(viewType==VIEW_ZX){
    camera.position.set(0, 8, 0);
  }else if(viewType==VIEW_YZ){
    camera.position.set(8, 0, 0);
  }else if(viewType==VIEW_XY){
    camera.position.set(0, 0, 8);
  }

  //animate();
}

function onCameraViewType(camType) {
  console.log("cameraViewType---", camType);
  vtcamera = camType
  if(vtcamera==PROJECTION_PER){
    camera = camera_per;
    camera.position.set(8,2,8);
  }else if(vtcamera==PROJECTION_ORO){
    camera = camera_oro;
    camera.position.x = 1;
    camera.position.y = 1;
    camera.position.z = 1;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }
  orbit_ctrl.update();

}

function drawAxis(flag){
  console.log("drawAxis----", flag);
  if(flag) {
    scene.add(axises_group);
  }else{
    scene.remove(axises_group);
  }
  render();
}

function drawHelpPlane(flag){
  if(flag){
    scene.add(help_plane);
  }else{
    scene.remove(help_plane);
  }
  render();
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
  if (file) {
    //re-initialize variable
    //reinitialization();
    new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function (evt) {
        resolve(evt.target.result);
      };
      reader.readAsText(file);
      reader.onerror = reject;
    })
    .then(processFileContent)
    .catch(function(err) {
      console.log(err)
    });
  }
}

function processFileContent(data) {
  processMeshFileContnet(data);
  calculate_Normals();
  console.log("m_positions---", m_positions.length);
  drawObject(m_positions, normals, true);
  //if(drawlatticeflag) drawLatticeWrap(false);
}

function processMeshFileContnet(data) {
  //console.log(data);
  let lines = data.split(/\r\n|\n/);
  let minP = new THREE.Vector3(100000, 100000, 100000);
  let maxP = new THREE.Vector3(-100000,-100000,-100000);             
  //alert(lines[0]);
  let All_Half_Edges=new Map();
  for(let i = 0; i < lines.length; i++){
    //console.log(lines[i]);
    let parts = lines[i].split(/[ ]+/);
    if(parts[0]==="Face") break;
    //alert(parts.length);
    let index=parts[1];
    let x=parts[2];
    let y=parts[3];
    let z=parts[4];
    //console.log(parts[0],parts[1],parts[2],parts[3],parts[4]);
    switch(parts[0]){
      case "Vertex":
        minP.x=Math.min(minP.x,x);
        minP.y=Math.min(minP.y,y);
        minP.z=Math.min(minP.z,z);
        maxP.x=Math.max(maxP.x,x);
        maxP.y=Math.max(maxP.y,y);
        maxP.z=Math.max(maxP.z,z);
        break;
      case "Face":
        break;
      case "#":
    }
  }

  // make the model fit for current screen size, reason:
  // the mesh file's contents/number's unit is different, maybe one is:0.01, another is:1000
  let size=new THREE.Vector3(maxP.x-minP.x, maxP.y-minP.y, maxP.z-minP.z);
  let maxAxis = Math.max(size.x, size.y, size.z);
  object_scale=1.0 /maxAxis *5;
  console.log("maxAxis--object_scale--", maxAxis, object_scale);
  
  for(let i = 0; i < lines.length; i++){
    let parts = lines[i].split(/[ ]+/);
    //alert(parts.length);
    let index=parts[1];
    let x=parts[2];
    let y=parts[3];
    let z=parts[4];
    switch(parts[0]){
      case "Vertex":
        // make the model fit for current screen size, reason:
        // the mesh file's contents/number's unit is different, maybe one is:0.01, another is:1000
        const v = new HE_Vertex(index-1, x*object_scale, y*object_scale, z*object_scale);
        half_vertices[index-1]=v;
        vertex_positions.push(v.x, v.y, v.z);
        break;
      case "Face":
        //store face information
        var half_edge1 = new HE_Edge(half_vertices[x - 1]);
        var half_edge2 = new HE_Edge(half_vertices[y - 1]);
        var half_edge3 = new HE_Edge(half_vertices[z - 1]);
        // store half edge info into the vertex information
        if(half_vertices[x-1].he == null) half_vertices[x-1].he = half_edge1;

        // half edge 2
        if(half_vertices[y-1].he == null) half_vertices[y-1].he = half_edge2;

        // half edge 3
        if(half_vertices[z-1].he == null) half_vertices[z-1].he = half_edge3;

        // store pre, next half edges of every edge
        half_edge1.pre = half_edge3;
        half_edge1.next = half_edge2;
        var v1_key = x.toString() + "-" + y.toString();
        half_edge1.pair_key = y.toString() + "-" + x.toString();
        //            
        half_edge2.pre = half_edge1;
        half_edge2.next = half_edge3;
        var v2_key = y.toString() + "-" + z.toString();
        half_edge2.pair_key = z.toString() + "-" + y.toString();
        //
        half_edge3.pre = half_edge2;
        half_edge3.next = half_edge1;
        var v3_key = z.toString() + "-" + x.toString();
        half_edge3.pair_key = x.toString() + "-" + z.toString();

        // store half faces
        var half_face= new HE_Face(index - 1, x-1, y-1, z-1);
        half_face.he = half_edge1;
        half_faces[index-1]=half_face;
        face_positions.push(half_face.he.pre.ver.x, half_face.he.pre.ver.y, half_face.he.pre.ver.z);
        face_positions.push(half_face.he.ver.x, half_face.he.ver.y, half_face.he.ver.z);
        face_positions.push(half_face.he.next.ver.x, half_face.he.next.ver.y, half_face.he.next.ver.z);

        // store half face into three half edges
        half_edge1.face = half_face;
        half_edge2.face = half_face;
        half_edge3.face = half_face;

        // store half edges
        All_Half_Edges.set(v1_key,half_edge1);
        All_Half_Edges.set(v2_key,half_edge2);
        All_Half_Edges.set(v3_key,half_edge3);
        break;
      case "#":
        //continue;
    }
  }
  m_positions=[...face_positions];

  //sotre pair half edges
  for (const each_half_edge of All_Half_Edges.values()) {
    each_half_edge.pair=All_Half_Edges.get(each_half_edge.pair_key);
  }
}


//-------------------------------------------------------------------------
//  Calculate the normals for every vertex
//-------------------------------------------------------------------------
function calculate_Normals()  {
  let _normals=[];
  for(const vertice of half_vertices) {
    let he = vertice.he;
    let curr=he;
    let index = 0;
    let totalArea = 0.0;
    let areaGroup=new Map();
    let noramlsTemp=new Map();

    do
    {
      // calculate the first normal
      var P1 = curr.pre.ver;
      var P2 = curr.ver;
      var P3 = curr.next.ver;

      // calculate Vector P21, P23
      var P12=new Point(0,0,0);
      var P23=new Point(0,0,0);
      var P21CrossP23=new Point(0,0,0);
      P12.x = P2.x - P1.x;
      P12.y = P2.y - P1.y;
      P12.z = P2.z - P1.z;

      P23.x = P3.x - P2.x;
      P23.y = P3.y - P2.y;
      P23.z = P3.z - P2.z;

      P21CrossP23.x = P12.y * P23.z - P12.z * P23.y;
      P21CrossP23.y = P12.z * P23.x - P12.x * P23.z;
      P21CrossP23.z = P12.x * P23.y - P12.y * P23.x;
      // calculate Area
      let AreaParallelSquat = Math.sqrt(P21CrossP23.x * P21CrossP23.x + P21CrossP23.y * P21CrossP23.y + P21CrossP23.z * P21CrossP23.z);
      let AreaP123 = 1/2.0 * AreaParallelSquat;
      totalArea += AreaP123;

      // store every triangle's area
      areaGroup.set(index, AreaP123);

      // calculate normal
      let ver=new Point(P21CrossP23.x / AreaParallelSquat, P21CrossP23.y / AreaParallelSquat, P21CrossP23.z / AreaParallelSquat);
      noramlsTemp.set(index, ver);

      if(typeof curr.pair !== "undefined" && typeof curr.pair.next !== "undefined")
      {
        curr = curr.pair.next;
      }

      index++;
    }while(typeof curr.pair !== "undefined" && typeof curr.pair.next !== "undefined" && curr.pair.next !== he);

    // calculate average normal
    var noraml_X= 0.0, noraml_Y= 0.0, noraml_Z= 0.0;
    if(totalArea > 0.0)
    {
      for(var j = 0; j < index; j++)
      {
         noraml_X += noramlsTemp.get(j).x * areaGroup.get(j) / totalArea;
         noraml_Y += noramlsTemp.get(j).y * areaGroup.get(j) / totalArea;
         noraml_Z += noramlsTemp.get(j).z * areaGroup.get(j) / totalArea;
      }
    }
    else
    {
      console.log("Bad--", i);
    }
    // the last average normal of every vertex
    var normal=new Point(noraml_X, noraml_Y, noraml_Z);
      _normals.push(normal);
    }

    // generate noramls arrays
    for(const hf of half_faces){
      normals.push(_normals[hf.he.pre.ver.id].x, _normals[hf.he.pre.ver.id].y, _normals[hf.he.pre.ver.id].z);
      normals.push(_normals[hf.he.ver.id].x, _normals[hf.he.ver.id].y, _normals[hf.he.ver.id].z);
      normals.push(_normals[hf.he.next.ver.id].x, _normals[hf.he.next.ver.id].y, _normals[hf.he.next.ver.id].z);
    }
}

function initCanvas() {

  /*var canvas = document.getElementById("glcanvas");
  var ctx = canvas.getContext("2d");
  if(ctx !== null){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }*/
  scene.remove(object_mesh);
  scene.remove(material);
  renderer.render( scene, camera );
  //arrowRenderer.render( arrowScene, arrowCamera );

  //renderer = new THREE.WebGLRenderer({canvas: canvasRender, antialias: true } );

}

//
// Display function
//

function display() {
  //drawCustomAxis();
  //drawObject();
  animate();
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

//
// drawObject
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function drawObject(positions, noramls,newModel) {
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



// draw lattice
function drawLatticeWrap(span_change_only){
  // remove exist lattice firstly
  removeLattice();
  if(span_change_only){
    bbox=mbbox;
  }else{
    bbox = new THREE.Box3().setFromObject(object_mesh);
  }
  let span_size_copy=new THREE.Vector3(spanSize, spanSize, spanSize);
  rebuildLattice(bbox, span_size_copy);
  drawLattice();
  scene.add(latticeGroup);
}


function rebuildLattice(b_box, span_size){
  if(mbbox.equals(b_box) && spanSize.x === span_size.x &&
     spanSize.y === span_size.y && spanSize.z === span_size.z){
    // control box size isn't change, dont' need to re-draw generate it.
    return;
  }

  // re-initialize 
  ctrlPtsPoints.length=0;

  mbbox = b_box; 
  spanSize=span_size.clone();
  ctrlPointsSize=new THREE.Vector3(span_size.x+1, span_size.y+1, span_size.z+1);
  totalCtrlPointsSize=ctrlPointsSize.x * ctrlPointsSize.y * ctrlPointsSize.z;

  let S=new THREE.Vector3(0, 0, 0);
  let T=new THREE.Vector3(0, 0, 0);
  let U=new THREE.Vector3(0, 0, 0);

  // Set the S/T/U axes.
  S.x = mbbox.max.x - mbbox.min.x;
  T.y = mbbox.max.y - mbbox.min.y;
  U.z = mbbox.max.z - mbbox.min.z;

  // Assign a new position to each control point.
  for(let i=0;i<ctrlPointsSize.x;i++){
    for(let j=0;j<ctrlPointsSize.y;j++){
      for(let k=0;k<ctrlPointsSize.z;k++){
        let position=new THREE.Vector3(
          mbbox.min.x + (i / spanSize.x) * S.x,
          mbbox.min.y + (j / spanSize.y) * T.y,
          mbbox.min.z + (k / spanSize.z) * U.z);
          setPositionToCtrlPoints(i,j,k,position);
      }
    }
  }
}

function drawLattice() {
  latticeGroup = new THREE.Group();
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
    latticeGroup.add(ctrl_pt_mesh);
  }

  // add adjecnet control points in the same plane
  const planes = [];
  planes.push(getPointsOnPlane(ctrl_pt_meshes, mbbox.min.x, null , null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, mbbox.max.x, null , null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , mbbox.min.y, null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , mbbox.max.y, null));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , null , mbbox.min.z));
  planes.push(getPointsOnPlane(ctrl_pt_meshes, null , null , mbbox.max.z));

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
        latticeGroup.add(lineMesh);
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
        latticeGroup.add(lineMesh);
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
        latticeGroup.add(lineMesh);
        //scene.add( lineMesh );
      }
    }
  }
}

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
      reCalculateVertices(algorithm);
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

function setRaycaster(event){
  let rec=canvasRender.getBoundingClientRect();
  mouse.x = ((event.clientX - rec.left) / canvasRender.offsetWidth) * 2 - 1;
  mouse.y = -((event.clientY - rec.top) / canvasRender.offsetHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
}

function setRaycasterV1(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
}

function refreshVariables() {
  if(deformed_positions.length>0){
    deformed_positions=[];
    deformed_positions.length=0;
  }
  if(m_positions.length>0) {
    m_positions=[];
    m_positions.length=0;
  }
  if(normals.length>0){
    normals=[];
    normals.length=0;
  } 
  if(object_pos_undeformed.length>0){
   object_pos_undeformed=[];
   object_pos_undeformed.length=0;
  }
  // Half edges
  if(Half_Edges.length) Half_Edges.length=0;
  // half_faces
  if(half_faces.length) half_faces.length=0;
  // half_vertices
  if(half_vertices.length) half_vertices.length=0;
  // face_positions
  if(face_positions.length) face_positions.length=0;
  // normals
  if(normals.length) normals.length=0;
}

// FFD algorithm
function reCalculateVertices_bspolynomial(){
  let ctrlPtSize = ctrlPointsSize;
  let attribute=object_mesh.geometry.attributes.position;
  let positions=object_mesh.geometry.attributes.position.array;

  let poistison_count=object_pos_undeformed.length/3;
  for(let index=0;index<poistison_count;index++){
    let diff = new THREE.Vector3(0,0,0);
    let point = getPosofUndeformedModel(index).clone();
    let mAxes = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
    // Set the S/T/U axes.
    mAxes[0].x = mbbox.max.x - mbbox.min.x;
    mAxes[1].y = mbbox.max.y - mbbox.min.y;
    mAxes[2].z = mbbox.max.z - mbbox.min.z;

    let res=convertToParam(point.clone()).clone();

    // validate whether the point P is accureate or not
    let tmp_p = mbbox.min.clone().add(mAxes[0].clone().multiplyScalar(res.x)).add(mAxes[1].clone().multiplyScalar(res.y)).add(mAxes[2].clone().multiplyScalar(res.z));
    let distance=tmp_p.clone().distanceTo( point.clone());
    if(distance > 0.001){
      let numer = cross[0].dot(point.clone().sub(mbbox.min));
      let denom = cross[0].dot(mAxes[0]);
      console.log("Warning, mismatched parameterization!!!!!!!!!!!!!!!!", index, distance, point.clone(), tmp_p.clone() );
      return;
    }

    let deform_pt=evalTrivariate(res.x, res.y, res.z, ctrlPtSize).clone();
    let ori_indx_pos = 3 * index;
    positions[ori_indx_pos]  =deform_pt.clone().x;
    positions[ori_indx_pos+1]=deform_pt.clone().y;
    positions[ori_indx_pos+2]=deform_pt.clone().z;
  }
  object_mesh.geometry.attributes.position.needsUpdate = true;
  //store deformed postions
  deformed_positions=[...positions];
}

function evalTrivariate(s, t, u, ctrlPtSize) {
  let l=ctrlPtSize.x, m=ctrlPtSize.y, n=ctrlPtSize.z;
  let eval_pt = new THREE.Vector3(0, 0, 0);
  for (let i = 0; i < l; i++) {
    let point1 = new THREE.Vector3(0, 0, 0);
    for (let j = 0; j < m; j++) {
      let point2 = new THREE.Vector3(0, 0, 0);
      for (let k = 0; k < n; k++) {
        let position = getPositionToCtrlPoints(i,j,k);
        let poly_u = bernstein(n-1, k, u);
        point2.addScaledVector(position, poly_u);
      }
      let poly_t = bernstein(m-1, j, t);
      point1.addScaledVector(point2, poly_t);
    }
    let poly_s = bernstein(l-1, i, s);
    eval_pt.addScaledVector(point1, poly_s);
  }
  return eval_pt;
}

// Returns n-factorial.
function facto(n) {
  let fac = 1;
  for (let i = n; i > 0; i--)
    fac *= i;
  return fac;
}

// Returns the Bernstein polynomial in one parameter, u.
function bernstein(n, k, u) {
  // Binomial coefficient
  let coeff = facto(n) / (facto(k) * facto(n - k));
  return coeff * Math.pow(1 - u, n - k) * Math.pow(u, k);
}

function getPosofUndeformedModel(index){
    let offsetPosition = 3 * index;
    let point = new THREE.Vector3(object_pos_undeformed[offsetPosition], 
                                  object_pos_undeformed[offsetPosition+1], 
                                  object_pos_undeformed[offsetPosition+2]);
    return point.clone();
}

function reCalculateVertices_decas(){
  let ctrlPtSize = ctrlPointsSize;
  let p0 = new THREE.Vector3(mbbox.min.x, mbbox.min.y, mbbox.min.z);
  let l=ctrlPtSize.x, m=ctrlPtSize.y, n=ctrlPtSize.z;

  // re-initialize this variable
  let attribute=object_mesh.geometry.attributes.position;
  let positions=object_mesh.geometry.attributes.position.array;

  //for(let index=0;index<attribute.count;index++){
  //console.log("length----", object_pos_undeformed.length);
  let poistison_count=object_pos_undeformed.length/3;
  for(let index=0;index<poistison_count;index++){
    let diff = new THREE.Vector3(0,0,0);
    diff.copy(getPosofUndeformedModel(index).clone().sub(mbbox.min));
    //console.log("index point--mbbox.min--differ", index, point,mbbox.min, diff);

    let S=new THREE.Vector3(0,0,0); let T=new THREE.Vector3(0,0,0); let U=new THREE.Vector3(0,0,0);
    S.x = mbbox.max.x - mbbox.min.x;
    T.y = mbbox.max.y - mbbox.min.y;
    U.z = mbbox.max.z - mbbox.min.z;
    //console.log("S--T--U", S, T, U);

    let TcU=new THREE.Vector3(); let ScU=new THREE.Vector3();let ScT=new THREE.Vector3();
    TcU.crossVectors(T,U);
    ScU.crossVectors(S,U);    
    ScT.crossVectors(S,T);
    //console.log("TcU--ScU--ScT", TcU, ScU, ScT);

    let TcUdS=new THREE.Vector3(); let ScUdT=new THREE.Vector3(); let ScTdU=new THREE.Vector3();
    TcUdS = TcU.dot(S);
    ScUdT = ScU.dot(T);
    ScTdU = ScT.dot(U);

    //console.log("TcUdS--ScUdT--ScTdU", TcUdS, ScUdT, ScTdU);

    const s = (TcU.dot(diff))/TcUdS;
    const t = (ScU.dot(diff))/ScUdT;
    const u = (ScT.dot(diff))/ScTdU;
    //console.log("s--t--u", s, t, u);

    const ctrlPoints_S=[];
    const ctrlPoints_T=[];
    const ctrlPoints_U=[];

    //for(int i = 0; i <=4; i++)
    for(let i = 0; i <l; i++) {
      // re-initialize the variable on T axes
      if(ctrlPoints_T.length > 0) ctrlPoints_T.length=0;
      for(let j = 0; j <m; j++) {
        // re-initialize the variable on U axes
        if(ctrlPoints_U.length > 0) ctrlPoints_U.length=0;
        for(let k = 0; k < n; k++) {
          let ctrlPtPos=getPositionToCtrlPoints(i,j,k).clone();
          ctrlPoints_U.push(ctrlPtPos.clone());
        }
        // call de castuljau algorithm on U axes
        let poly_u = decasteljauAlgorithm(ctrlPoints_U, n, u);
        ctrlPoints_T.push(poly_u);
      }
      // call de castuljau algorithm on T axes
      let poly_t = decasteljauAlgorithm(ctrlPoints_T, m, t);
      ctrlPoints_S.push(poly_t);
      
    }
    // call de castuljau algorithm on T axes
    var deform_pt=decasteljauAlgorithm(ctrlPoints_S, l, s).clone();

    let ori_indx_pos = 3 * index;
    positions[ori_indx_pos]  =deform_pt.x;
    positions[ori_indx_pos+1]=deform_pt.y;
    positions[ori_indx_pos+2]=deform_pt.z;

  }
  object_mesh.geometry.attributes.position.needsUpdate = true;
  //store deformed postions
  deformed_positions=[...positions];
}

// decasteljau algorithm, for calculating bernstein polynomial
function decasteljauAlgorithm(pts, contNum, t) {
  let pointsFinal=pts;
  for(let k = 1; k < contNum; k++) {
    for(let i = 0; i < contNum - k; i++){
      pointsFinal[i].x = (1.0 - t) * pointsFinal[i].clone().x + t * pointsFinal[i + 1].clone().x;
      pointsFinal[i].y = (1.0 - t) * pointsFinal[i].clone().y + t * pointsFinal[i + 1].clone().y;
      pointsFinal[i].z = (1.0 - t) * pointsFinal[i].clone().z + t * pointsFinal[i + 1].clone().z;
    }
  }
  return pointsFinal[0].clone();
}

function convertToParam(world_pt) {
  var mAxes = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];

  // Set the S/T/U axes.
  mAxes[0].x = mbbox.max.x - mbbox.min.x;
  mAxes[1].y = mbbox.max.y - mbbox.min.y;
  mAxes[2].z = mbbox.max.z - mbbox.min.z;
  //console.log("new way S,T,U---",mAxes[0], mAxes[1], mAxes[2]);

  // A vector from the mininmum point of the bounding box to the given world point.
  var min2world = new THREE.Vector3(world_pt.x, world_pt.y, world_pt.z);
  //console.log("point, min---",min2world,mbbox.min);

  min2world.sub(mbbox.min);
  //console.log("point ---",min2world);

  var cross = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()];
  cross[0].crossVectors(mAxes[1], mAxes[2]);
  cross[1].crossVectors(mAxes[0], mAxes[2]);
  cross[2].crossVectors(mAxes[0], mAxes[1]);

  //console.log("TcU-ScU-ScT---", cross[0], cross[1], cross[2]);

  var param = new THREE.Vector3();
  for (var i = 0; i < 3; i++) {
    var numer = cross[i].dot(min2world);
    var denom = cross[i].dot(mAxes[i]);
    param.setComponent(i, numer / denom);
  }
  return param;
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

function animate() {
  requestAnimationFrame( animate );
  orbit_ctrl.update();
  render();
}

function render(){
  renderer.render( scene, camera );
}
