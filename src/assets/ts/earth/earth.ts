import * as THREE from 'three';
import {loadObject} from '../../source/loader';
export default class EarthSphere {
  private textureLoader = new THREE.TextureLoader();
   public creatSphere = () => {
    const geometry = new THREE.SphereBufferGeometry(5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      map: loadObject(this.textureLoader, 'earth'),
      bumpMap: loadObject(this.textureLoader, 'earthBump'),
      bumpScale: 0.15,
      specularMap: loadObject(this.textureLoader,'earthSpec'),
      specular: new THREE.Color('#909090'),
      shininess: 5,
      transparent: true
    });
   return new THREE.Mesh(geometry, material);
  }
}