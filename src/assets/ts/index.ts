import * as THREE from 'three';
import Base from '../source/base';
import Cloud from './earth/cloud';
import Earth from './earth/earth';
import Lights from './earth/light';
import Location from './earth/location';
import { LOCATIONS } from './constant';
// tslint:disable-next-line
const OrbitControls = require('three-orbit-controls')(THREE);

export default class EarthLoader extends Base {
  constructor(options: any) {
    super(options);
    this.init();
  }
  //云层转动速度
  private cloudSpeed = -0.0003

  private earthGroup = new THREE.Group();

  public controller = new OrbitControls(this.camera);


  private earth = new Earth().creatSphere();
  private cloud = new Cloud().creatCloud();
  private lights = new Lights();

  //将云层地球等添加至一个group
  private creatEarth = () => {
    LOCATIONS.forEach((location: any) => {
      let sprite = new Location().createLocationSprite(location)
      this.earthGroup.add(sprite);
    })
    Object.keys(this.lights).map((light) => {
      this.earthGroup.add(this.lights[light])
    })
    this.earthGroup.add(this.earth)
    this.earthGroup.add(this.cloud)
  }
  //设置controler
  private setControls = () => {
    let { controller } = this;
    controller.rotateSpeed = 0.3
    controller.autoRotate = false
    controller.enableZoom = false
    controller.enablePan = false
    controller.enabled = true
  }

  public setCamera() {
    if (arguments.length === 3) {
      this.camera.position.set(arguments[0], arguments[1], arguments[2])
    } else {
      this.camera.position.set(arguments[0].x, arguments[0].y, arguments[0].z)
    }
  }

  public cameraPosition() {
    return {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
    }
  }
  
  private init = () => {
    const {
      scene,
      camera,
      controller,
      animate,
      creatEarth,
      earthGroup,
      setControls,
    } = this;
    setControls();
    creatEarth();
    camera.position.set(3.55, 0, -328)
    scene.add(earthGroup);
    animate.update(() => {
      controller.update();
      this.cloud.rotation.y += this.cloudSpeed
    });
  }
}