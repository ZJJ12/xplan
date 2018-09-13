import * as THREE from 'three';
import { loadObject } from '../../source/loader';
export default class Cloud{
  constructor(){
    this.creatCloud();
  }
  private textureLoader = new THREE.TextureLoader();
  public creatCloud = () => {
    const geometry = new THREE.SphereBufferGeometry(5.3, 40, 40);
    const material = new THREE.MeshPhongMaterial({
      map: loadObject(this.textureLoader, 'earthCloud'),
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending
    });
  return new THREE.Mesh(geometry, material);
  }
}