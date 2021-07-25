/*
 =====================================================================
 @license MIT
 @author Francis
 @copyright 2021 Francis.Luo
 @end
 =====================================================================
 */

import * as THREE from './three.module.js';
class Lattice {
  constructor() {
    this.object_scale = 1.0;
    this.ctrl_pt_meshes=[];
    this.ctrl_line_meshes=[];
    this.ctrlPtsPoints=[];

    this.selectedControlPoints=new Set();;
    this.object_pos_undeformed=[];
    this.objectMesh=null;

    this.latticeGroup=null;
    this.bbox=new THREE.Box3();
    this.spanSize=new THREE.Vector3(0,0,0);
    this.ctrlPointsSize=new THREE.Vector3(0, 0, 0);
    this.totalCtrlPointsSize=0;
  }

  rebuildLattice(b_box, span_size){
    if(this.bbox.equals(b_box) && this.spanSize.x === span_size.x &&
       this.spanSize.y === span_size.y && this.spanSize.z === span_size.z){
      // control box size isn't change, dont' need to re-draw generate it.
      return;
    }

    // re-initialize 
    this.ctrlPtsPoints.length=0;

    this.bbox = b_box; 
    this.spanSize=span_size.clone();
    this.ctrlPointsSize=new THREE.Vector3(span_size.x+1, span_size.y+1, span_size.z+1);
    this.totalCtrlPointsSize=this.ctrlPointsSize.x * this.ctrlPointsSize.y * this.ctrlPointsSize.z;

    // Set the S/T/U axes.
    Lattice.S.x = this.bbox.max.x - this.bbox.min.x;
    Lattice.T.y = this.bbox.max.y - this.bbox.min.y;
    Lattice.U.z = this.bbox.max.z - this.bbox.min.z;
  
    // Assign a new position to each control point.
    for(let i=0;i<this.ctrlPointsSize.x;i++){
      for(let j=0;j<this.ctrlPointsSize.y;j++){
        for(let k=0;k<this.ctrlPointsSize.z;k++){
          let position=new THREE.Vector3(
            this.bbox.min.x + (i / this.spanSize.x) * Lattice.S.x,
            this.bbox.min.y + (j / this.spanSize.y) * Lattice.T.y,
            this.bbox.min.z + (k / this.spanSize.z) * Lattice.U.z);
            this.setPositionToCtrlPoints(i,j,k,position);
        }
      }
    }
  }

  drawLattice() {
    let _latticeGroup = new THREE.Group();
    this.ctrl_pt_meshes.length=0;
    this.ctrl_line_meshes.length=0;

    //let cent = this.bbox.getCenter(new THREE.Vector3());
    //let size = this.bbox.getSize(new THREE.Vector3());

    //
    let ctrl_pt_geom = new THREE.SphereGeometry(0.08,32,32);
    //let ctrl_pt_material = new THREE.MeshLambertMaterial({ color: "yellow" });
    let ctrl_line_material = new THREE.MeshLambertMaterial({ color: "red" });

    // draw control points
    for(let vertexIndex=0;vertexIndex<this.totalCtrlPointsSize;vertexIndex++){
      let ctrl_pt_mesh= new THREE.Mesh(ctrl_pt_geom, Lattice.ctrl_pt_material);
      ctrl_pt_mesh.position.copy(this.getPosition(vertexIndex));
      ctrl_pt_mesh.vertexIndex = vertexIndex;
      ctrl_pt_mesh.adjacentPoints = new Set();
      this.ctrl_pt_meshes.push(ctrl_pt_mesh);
      //scene.add(ctrl_pt_mesh);
      _latticeGroup.add(ctrl_pt_mesh);
    }

    // add adjecnet control points in the same plane
    const planes = [];
    planes.push(this.getPointsOnPlane(this.ctrl_pt_meshes, this.bbox.min.x, null , null));
    planes.push(this.getPointsOnPlane(this.ctrl_pt_meshes, this.bbox.max.x, null , null));
    planes.push(this.getPointsOnPlane(this.ctrl_pt_meshes, null , this.bbox.min.y, null));
    planes.push(this.getPointsOnPlane(this.ctrl_pt_meshes, null , this.bbox.max.y, null));
    planes.push(this.getPointsOnPlane(this.ctrl_pt_meshes, null , null , this.bbox.min.z));
    planes.push(this.getPointsOnPlane(this.ctrl_pt_meshes, null , null , this.bbox.max.z));

    for (const controlPoints of planes) {
      for (const controlPoint of controlPoints) {
        for (const controlPointAdjacent of controlPoints) {
            controlPoint.adjacentPoints.add(controlPointAdjacent);
        }
      }
    }


    // draw lines between control points
    // Lines in S direction
    for(let i=0;i<this.ctrlPointsSize.x-1;i++){
      for(let j=0;j<this.ctrlPointsSize.y;j++){
        for(let k=0;k<this.ctrlPointsSize.z;k++){
          const linePoints=[];
          linePoints.push(this.ctrl_pt_meshes[this.getIndex(i,j,k)].position);
          linePoints.push(this.ctrl_pt_meshes[this.getIndex(i+1,j,k)].position);
          const lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoints );
          const lineMesh = new THREE.Line( lineGeometry, ctrl_line_material );
          lineMesh.geometry.attributes.position.needsUpdate = true;
          this.ctrl_line_meshes.push(lineMesh);
          _latticeGroup.add(lineMesh);
          //scene.add( lineMesh );
        }
      }
    }

    // Lines in T direction
    for(let i=0;i<this.ctrlPointsSize.x;i++){
      for(let j=0;j<this.ctrlPointsSize.y-1;j++){
        for(let k=0;k<this.ctrlPointsSize.z;k++){
          const linePoints=[];
          linePoints.push(this.ctrl_pt_meshes[this.getIndex(i,j,k)].position);
          linePoints.push(this.ctrl_pt_meshes[this.getIndex(i,j+1,k)].position);
          const lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoints );
          const lineMesh = new THREE.Line( lineGeometry, ctrl_line_material );
          lineMesh.geometry.attributes.position.needsUpdate = true;
          this.ctrl_line_meshes.push(lineMesh);
          _latticeGroup.add(lineMesh);
          //scene.add( lineMesh );
        }
      }
    }
    // Lines in U direction
    for(let i=0;i<this.ctrlPointsSize.x;i++){
      for(let j=0;j<this.ctrlPointsSize.y;j++){
        for(let k=0;k<this.ctrlPointsSize.z-1;k++){
          const linePoints=[];
          linePoints.push(this.ctrl_pt_meshes[this.getIndex(i,j,k)].position);
          linePoints.push(this.ctrl_pt_meshes[this.getIndex(i,j,k+1)].position);
          const lineGeometry = new THREE.BufferGeometry().setFromPoints( linePoints );
          const lineMesh = new THREE.Line( lineGeometry, ctrl_line_material );
          lineMesh.geometry.attributes.position.needsUpdate = true;
          this.ctrl_line_meshes.push(lineMesh);
          _latticeGroup.add(lineMesh);
          //scene.add( lineMesh );
        }
      }
    }

    this.latticeGroup = _latticeGroup;
  }

  updateLattice(){
    // Update the positions of all control point in the FFD object.
    for(let i=0;i<this.totalCtrlPointsSize;i++){
      this.setPosition(i, this.ctrl_pt_meshes[i].position);
    }

    // Update the positions of all lines of the lattice.
    let line_index=0;
    // Lines in S direction
    for(let i=0;i<this.ctrlPointsSize.x-1;i++){
      for(let j=0;j<this.ctrlPointsSize.y;j++){
        for(let k=0;k<this.ctrlPointsSize.z;k++){
          let line=this.ctrl_line_meshes[line_index++];
          //console.log("line-----", line, line.geometry.position);
          let linePtPosition=line.geometry.attributes.position.array;
          let ctr_pt_pos1=this.ctrl_pt_meshes[this.getIndex(i, j, k)].position;
          let ctr_pt_pos2=this.ctrl_pt_meshes[this.getIndex(i+1, j, k)].position;
          linePtPosition[0]=ctr_pt_pos1.x;linePtPosition[1]=ctr_pt_pos1.y;linePtPosition[2]=ctr_pt_pos1.z;
          linePtPosition[3]=ctr_pt_pos2.x;linePtPosition[4]=ctr_pt_pos2.y;linePtPosition[5]=ctr_pt_pos2.z;
          line.geometry.attributes.position.needsUpdate = true;
        }
      }
    }
    // Lines in T direction
    for(let i=0;i<this.ctrlPointsSize.x;i++){
      for(let j=0;j<this.ctrlPointsSize.y-1;j++){
        for(let k=0;k<this.ctrlPointsSize.z;k++){
          let line=this.ctrl_line_meshes[line_index++];
          let linePtPosition=line.geometry.attributes.position.array;
          let ctr_pt_pos1=this.ctrl_pt_meshes[this.getIndex(i, j, k)].position;
          let ctr_pt_pos2=this.ctrl_pt_meshes[this.getIndex(i, j+1, k)].position;
          linePtPosition[0]=ctr_pt_pos1.x;linePtPosition[1]=ctr_pt_pos1.y;linePtPosition[2]=ctr_pt_pos1.z;
          linePtPosition[3]=ctr_pt_pos2.x;linePtPosition[4]=ctr_pt_pos2.y;linePtPosition[5]=ctr_pt_pos2.z;
          line.geometry.attributes.position.needsUpdate = true;
        }
      }
    }
    // Lines in T direction
    for(let i=0;i<this.ctrlPointsSize.x;i++){
      for(let j=0;j<this.ctrlPointsSize.y;j++){
        for(let k=0;k<this.ctrlPointsSize.z-1;k++){
          let line=this.ctrl_line_meshes[line_index++];
          let linePtPosition=line.geometry.attributes.position.array;
          let ctr_pt_pos1=this.ctrl_pt_meshes[this.getIndex(i, j, k)].position;
          let ctr_pt_pos2=this.ctrl_pt_meshes[this.getIndex(i, j, k+1)].position;
          linePtPosition[0]=ctr_pt_pos1.x;linePtPosition[1]=ctr_pt_pos1.y;linePtPosition[2]=ctr_pt_pos1.z;
          linePtPosition[3]=ctr_pt_pos2.x;linePtPosition[4]=ctr_pt_pos2.y;linePtPosition[5]=ctr_pt_pos2.z;
          line.geometry.attributes.position.needsUpdate = true;
        }
      }
    }
  }

  // Returns the position of the control point at the given unary index.
  getPosition(index) {
    return this.ctrlPtsPoints[index];
  };

  // Sets the position of the control point at the given unary index.
  setPosition(index, position) {
    this.ctrlPtsPoints[index] = position;
  };

  // Returns the position of the control point at the given ternary index.
  getPositionToCtrlPoints(i, j, k) {
    return this.ctrlPtsPoints[this.getIndex(i, j, k)];
  };

  // Sets the position of the control point at the given ternary index.
  setPositionToCtrlPoints(i, j, k, position){
    this.ctrlPtsPoints[this.getIndex(i,j,k)]=position;
  }

  // Converts the given ternary index to a unary index.
  getIndex(i, j, k) {
    return i * this.ctrlPointsSize.x * this.ctrlPointsSize.y + j * this.ctrlPointsSize.y + k;
  }

  // world location to local postion
  getLocalPositon(position) {
    return this.ctrl_pt_meshes[0].parent.worldToLocal(position.clone())
  }

  //planes.push(getPointsOnPlane(ctrl_pt_meshes, bbox.min.x, null, null));
  getPointsOnPlane(controlPoints, x, y, z) {
      const delta = 0.1/this.object_scale;
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

  onControlPointSelect(object, shiftKey, ctrlKey) {
    console.log("shiftKey---ctrlKey----", shiftKey, ctrlKey);
    if (!this.selectedControlPoints.has(object)) {
      if (!shiftKey) {
        this.clearSelection();
      }
      this.selectedControlPoints.add(object);
      object.material = Lattice.selected_ctrl_pt_material.clone();
    }

    if (ctrlKey) {
      for (const neighborObject of object.adjacentPoints) {
        this.selectedControlPoints.add(neighborObject);
        neighborObject.material = Lattice.selected_ctrl_pt_material.clone();
      }
    }
  }

  clearSelection() {
    for (const controlPoint of this.selectedControlPoints) {
      controlPoint.material = Lattice.ctrl_pt_material.clone();
    }

    this.selectedControlPoints.clear();
  }

  onDrag(delta){
    for (const controlPoint of this.selectedControlPoints) {
      // all contrl points' position will move to the new position
      const newVertexPosition = this.getPosition(controlPoint.vertexIndex).add(delta);
      const localPosition = this.getLocalPositon(newVertexPosition);
      controlPoint.material = Lattice.selected_ctrl_pt_material.clone();
      //console.log("newVertexPosition--controlPoint.vertexIndex-",controlPoint.vertexIndex, newVertexPosition);
      controlPoint.position.copy(newVertexPosition);
    }
  }

  reCalculateVertices_bspolynomial(){
    let ctrlPtSize = this.ctrlPointsSize;
    let attribute=this.objectMesh.geometry.attributes.position;
    let positions=this.objectMesh.geometry.attributes.position.array;

    let poistison_count=this.object_pos_undeformed.length/3;
    for(let index=0;index<poistison_count;index++){
      let diff = new THREE.Vector3(0,0,0);
      let point = this.getPosofUndeformedModel(index).clone();
      var mAxes = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];
      // Set the S/T/U axes.
      mAxes[0].x = this.bbox.max.x - this.bbox.min.x;
      mAxes[1].y = this.bbox.max.y - this.bbox.min.y;
      mAxes[2].z = this.bbox.max.z - this.bbox.min.z;

      var res=this.convertToParam(point.clone()).clone();

      // validate whether the point P is accureate or not
      var tmp_p = this.bbox.min.clone().add(mAxes[0].clone().multiplyScalar(res.x)).add(mAxes[1].clone().multiplyScalar(res.y)).add(mAxes[2].clone().multiplyScalar(res.z));
      let distance=tmp_p.clone().distanceTo( point.clone());
      if(distance > 0.001){
        var numer = cross[0].dot(point.clone().sub(this.bbox.min));
        var denom = cross[0].dot(mAxes[0]);
        console.log("Warning, mismatched parameterization!!!!!!!!!!!!!!!!", index, distance, point.clone(), tmp_p.clone() );
        return;
      }

      var deform_pt=this.evalTrivariate(res.x, res.y, res.z, ctrlPtSize).clone();
      let ori_indx_pos = 3 * index;
      positions[ori_indx_pos]  =deform_pt.clone().x;
      positions[ori_indx_pos+1]=deform_pt.clone().y;
      positions[ori_indx_pos+2]=deform_pt.clone().z;
    }
    this.objectMesh.geometry.attributes.position.needsUpdate = true;
  }

  evalTrivariate(s, t, u, ctrlPtSize) {
    let l=ctrlPtSize.x, m=ctrlPtSize.y, n=ctrlPtSize.z;
    var eval_pt = new THREE.Vector3(0, 0, 0);
    for (var i = 0; i < l; i++) {
      var point1 = new THREE.Vector3(0, 0, 0);
      for (var j = 0; j < m; j++) {
        var point2 = new THREE.Vector3(0, 0, 0);
        for (var k = 0; k < n; k++) {
          var position = this.getPositionToCtrlPoints(i,j,k);
          var poly_u = this.bernstein(n-1, k, u);
          point2.addScaledVector(position, poly_u);
        }
        var poly_t = this.bernstein(m-1, j, t);
        point1.addScaledVector(point2, poly_t);
      }
      var poly_s = this.bernstein(l-1, i, s);
      eval_pt.addScaledVector(point1, poly_s);
    }
    return eval_pt;
  }

  // Returns n-factorial.
  facto(n) {
    var fac = 1;
    for (var i = n; i > 0; i--)
      fac *= i;
    return fac;
  }

  // Returns the Bernstein polynomial in one parameter, u.
  bernstein(n, k, u) {
    // Binomial coefficient
    var coeff = this.facto(n) / (this.facto(k) * this.facto(n - k));
    return coeff * Math.pow(1 - u, n - k) * Math.pow(u, k);
  }

  getPosofUndeformedModel(index){
      let offsetPosition = 3 * index;
      let point = new THREE.Vector3(this.object_pos_undeformed[offsetPosition], 
                                    this.object_pos_undeformed[offsetPosition+1], 
                                    this.object_pos_undeformed[offsetPosition+2]);
      return point.clone();
  }

  reCalculateVertices_decas(){
    let ctrlPtSize = this.ctrlPointsSize;
    let p0 = new THREE.Vector3(this.bbox.min.x, this.bbox.min.y, this.bbox.min.z);
    let l=ctrlPtSize.x, m=ctrlPtSize.y, n=ctrlPtSize.z;

    // re-initialize this variable
    let attribute=this.objectMesh.geometry.attributes.position;
    let positions=this.objectMesh.geometry.attributes.position.array;

    //for(let index=0;index<attribute.count;index++){
    //console.log("length----", object_pos_undeformed.length);
    let poistison_count=this.object_pos_undeformed.length/3;
    for(let index=0;index<poistison_count;index++){
      let diff = new THREE.Vector3(0,0,0);
      diff.copy(this.getPosofUndeformedModel(index).clone().sub(this.bbox.min));
      //console.log("index point--bbox.min--differ", index, point,bbox.min, diff);

      let S=new THREE.Vector3(0,0,0); let T=new THREE.Vector3(0,0,0); let U=new THREE.Vector3(0,0,0);
      S.x = this.bbox.max.x - this.bbox.min.x;
      T.y = this.bbox.max.y - this.bbox.min.y;
      U.z = this.bbox.max.z - this.bbox.min.z;
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
            let ctrlPtPos=this.getPositionToCtrlPoints(i,j,k).clone();
            ctrlPoints_U.push(ctrlPtPos.clone());
          }
          // call de castuljau algorithm on U axes
          let poly_u = this.decasteljauAlgorithm(ctrlPoints_U, n, u);
          ctrlPoints_T.push(poly_u);
        }
        // call de castuljau algorithm on T axes
        let poly_t = this.decasteljauAlgorithm(ctrlPoints_T, m, t);
        ctrlPoints_S.push(poly_t);
        
      }
      // call de castuljau algorithm on T axes
      var deform_pt=this.decasteljauAlgorithm(ctrlPoints_S, l, s).clone();

      let ori_indx_pos = 3 * index;
      positions[ori_indx_pos]  =deform_pt.x;
      positions[ori_indx_pos+1]=deform_pt.y;
      positions[ori_indx_pos+2]=deform_pt.z;

    }
    this.objectMesh.geometry.attributes.position.needsUpdate = true;
  }

  // decasteljau algorithm, for calculating bernstein polynomial
  decasteljauAlgorithm(pts, contNum, t) {
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

  convertToParam(world_pt) {
    var mAxes = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)];

    // Set the S/T/U axes.
    mAxes[0].x = this.bbox.max.x - this.bbox.min.x;
    mAxes[1].y = this.bbox.max.y - this.bbox.min.y;
    mAxes[2].z = this.bbox.max.z - this.bbox.min.z;
    //console.log("new way S,T,U---",mAxes[0], mAxes[1], mAxes[2]);

    // A vector from the mininmum point of the bounding box to the given world point.
    var min2world = new THREE.Vector3(world_pt.x, world_pt.y, world_pt.z);
    //console.log("point, min---",min2world,bbox.min);

    min2world.sub(this.bbox.min);
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

  getLatticeGroup(){
    return this.latticeGroup;
  }

  getCtrlPoints() {
    return this.ctrlPtsPoints;
  }

  getCtrlPointMeshes() {
    console.log("this.ctrl_pt_meshes----", this.ctrl_pt_meshes.length);
    return this.ctrl_pt_meshes;
  }

  getBoudndingBox() {
    return this.bbox;
  }

  setUndeformedPosition(undeformed_pos){
    this.object_pos_undeformed=[...undeformed_pos];
  }

  setObjectScale(scale){
    this.object_scale=scale;
  }

  setObjectMesh(object_mesh){
    this.objectMesh = object_mesh;
  }

  getObjectPostions(){
    return this.objectMesh.geometry.attributes.position.array;
  }

}

Lattice.ctrl_pt_material = new THREE.MeshStandardMaterial({
    color: 'yellow',
    emissive: 0,
    metalness: 0.2,
    side: 2,
    roughness: 0.5
});

Lattice.selected_ctrl_pt_material = new THREE.MeshStandardMaterial({
    color: 'green',
    emissive: 0,
    metalness: 0.2,
    side: 2,
    roughness: 0.5
});

///////////////////////////////////////////////////////////////////////////
// Private members
///////////////////////////////////////////////////////////////////////////

Lattice.S=new THREE.Vector3(0, 0, 0);
Lattice.T=new THREE.Vector3(0, 0, 0);
Lattice.U=new THREE.Vector3(0, 0, 0);

Lattice.prototype.isLattice = true;


export {Lattice};