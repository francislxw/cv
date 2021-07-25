/*
 =====================================================================
 @license MIT
 @author Francis
 @copyright 2021 Francis.Luo
 @end
 =====================================================================
 */

import * as THREE from './three.module.js';
class HEVertex {
  constructor(id = 0, x = 0, y = 0, z = 0){
    this.id = id;
    this.x = x;
    this.y = y;
    this.z = z;
    this.he = null;
  }

  set(id, x, y, z){
    this.id = id;
    this.x = x;
    this.y = y;
    this.z = z;

    return this;
  }
}
HEVertex.prototype.isHEVertex = true;

class HEEdge {
  constructor(vertex){
    this.ver = vertex;   // start point of this half edge
    this.pair = null;    // the twin half dege of this half edge
    this.face =null;    // the face which includes this half-edge (left one, CCW according to this half-edge)
    this.pre = null;     // previous half-edge
    this.next = null;    // next half-edge

    this.pair_key=null;
    // define your methods (constructor, destructor, etc)
  }
}
HEEdge.prototype.isHEEdge = true;

class HEFace {
  constructor(id, v1, v2, v3){
    this.id = id;
    this.v1 = v1;
    this.v2 = v2;
    this.v3 = v3;
  }
}
HEFace.prototype.isHEFace = true;

class LoadMesh {
  constructor(data) {
    this.half_vertices=[];
    this.half_faces=[];
    this.object_scale = 1.0;
    this.vertex_positions = [];
    this.face_positions = [];
    this.normals = [];    // faces' normals
    this._normals = [];   // all normals

    this.processFileContentMesh(data);
    this.calcuNormals();
  }

  processFileContentMesh(data) {
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
    this.object_scale=1.0 /maxAxis *5;
    console.log("maxAxis--object_scale--", maxAxis, this.object_scale);
    
    for(let i = 0; i < lines.length; i++){
      //console.log(lines[i]);
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
          const v = new HEVertex(index-1, x*this.object_scale, y*this.object_scale, z*this.object_scale);
          this.half_vertices[index-1]=v;
          this.vertex_positions.push(v.x, v.y, v.z);
          break;
        case "Face":
          //store face information
          var half_edge1 = new HEEdge(this.half_vertices[x - 1]);
          var half_edge2 = new HEEdge(this.half_vertices[y - 1]);
          var half_edge3 = new HEEdge(this.half_vertices[z - 1]);
          // store half edge info into the vertex information
          // half edge 1
          if(this.half_vertices[x-1].he === null) this.half_vertices[x-1].he = half_edge1;
          // half edge 2
          if(this.half_vertices[y-1].he === null) this.half_vertices[y-1].he = half_edge2;
          // half edge 3
          if(this.half_vertices[z-1].he === null) this.half_vertices[z-1].he = half_edge3;

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
          var half_face= new HEFace(index - 1, x-1, y-1, z-1);
          half_face.he = half_edge1;
          //let normal=calcuNormals(curr.pre.ver,curr.ver,curr.next.ver);
          this.half_faces[index-1]=half_face;
          this.face_positions.push(half_face.he.pre.ver.x, half_face.he.pre.ver.y, half_face.he.pre.ver.z);
          this.face_positions.push(half_face.he.ver.x, half_face.he.ver.y, half_face.he.ver.z);
          this.face_positions.push(half_face.he.next.ver.x, half_face.he.next.ver.y, half_face.he.next.ver.z);

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
      }
    }

    //sotre pair half edges
    for (const each_half_edge of All_Half_Edges.values()) {
      each_half_edge.pair=All_Half_Edges.get(each_half_edge.pair_key);
    }
  }

  //-------------------------------------------------------------------------
  //  Calculate the normals for every vertex
  //-------------------------------------------------------------------------
  calcuNormals() {
    for(const vertice of this.half_vertices) {
      let he = vertice.he;
      let curr=he;
      let index = 0;
      let totalArea = 0.0;
      let areaGroup=new Map();
      let noramls=new Map();

      do
      {
        // calculate the first normal
        let P1 = curr.pre.ver;
        let P2 = curr.ver;
        let P3 = curr.next.ver;

        // calculate Vector P21, P23
        let P12=new THREE.Vector3(0,0,0);
        let P23=new THREE.Vector3(0,0,0);
        let P21CrossP23=new THREE.Vector3(0,0,0);
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
        let ver=new THREE.Vector3(P21CrossP23.x / AreaParallelSquat, P21CrossP23.y / AreaParallelSquat, P21CrossP23.z / AreaParallelSquat);
        noramls.set(index, ver);

        if(typeof curr.pair !== "undefined" && typeof curr.pair.next !== "undefined")
        {
          curr = curr.pair.next;
        }

        index++;
      }while(typeof curr.pair !== "undefined" && typeof curr.pair.next !== "undefined" && curr.pair.next !== he);

      // calculate average normal
      let noraml_X= 0.0, noraml_Y= 0.0, noraml_Z= 0.0;
      if(totalArea > 0.0)
      {
        for(let j = 0; j < index; j++)
        {
           noraml_X += noramls.get(j).x * areaGroup.get(j) / totalArea;
           noraml_Y += noramls.get(j).y * areaGroup.get(j) / totalArea;
           noraml_Z += noramls.get(j).z * areaGroup.get(j) / totalArea;
        }
      }
      else
      {
        console.log("Bad--", i);
      }
      // the last average normal of every vertex
      let normal=new THREE.Vector3(noraml_X, noraml_Y, noraml_Z);
      this._normals.push(normal);
    }

    // generate noramls arrays
    for(const hf of this.half_faces){
      this.normals.push(this._normals[hf.he.pre.ver.id].x, this._normals[hf.he.pre.ver.id].y, this._normals[hf.he.pre.ver.id].z);
      this.normals.push(this._normals[hf.he.ver.id].x, this._normals[hf.he.ver.id].y, this._normals[hf.he.ver.id].z);
      this.normals.push(this._normals[hf.he.next.ver.id].x, this._normals[hf.he.next.ver.id].y, this._normals[hf.he.next.ver.id].z);
    }
  }

  getFaces(){
    return this.half_faces;
  }

  getVertices(){
    return this.half_vertices;
  }

  getVertexPositions(){
    return this.vertex_positions;
  }

  getFacesPositions(){
    return this.face_positions;
  }

  getNoramls() {
    return this.normals;
  }

  getObjectScale() {
    return this.object_scale;
  }
}


export {HEVertex, HEEdge, HEFace, LoadMesh};