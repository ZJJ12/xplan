import * as THREE from 'three';
import {loadObject} from '../../source/loader';
export default class Loaction {
  private textureLoader = new THREE.TextureLoader();
   public createLocationSprite = (location:any) => {
    let spriteMaterial = new THREE.SpriteMaterial({
      map: loadObject(this.textureLoader,location.imageName),
      color: 0xffffff,
      fog: true
    })
    let sprite = new THREE.Sprite(spriteMaterial)
    sprite.position.set(location.position[0], location.position[1], location.position[2])
    sprite.scale.set(1.4, 1.4, 1.4)
   return sprite;
  }
}