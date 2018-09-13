import { Group, AmbientLight, DirectionalLight } from 'three';
export default class Lights {
  constructor() {
    const lightGrpup = new Group();
    let light = new DirectionalLight(0xffffff, 1)
    let ambientLight = new AmbientLight(0x393939, 1);
    lightGrpup.add(ambientLight)
    lightGrpup.add(light)
    return {
      light,
      ambientLight
    };
  }
}