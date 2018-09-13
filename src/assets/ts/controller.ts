import * as TWEEN from '@tweenjs/tween.js'
import { LOCATIONS } from './constant';
class BaseState {
  protected controller: any;
  constructor(controller: any) {
    this.controller = controller
  }
  forward() { }
  backward() { }
}
class EnteringState extends BaseState {
  constructor(controller: any) {
    super(controller)
    new TWEEN.Tween({ x: 3, y: 0, z: -288, ry: 0 })
      .to({ x: 0, y: 0, z: -28, ry: Math.PI * -2 }, 1000)
      .onUpdate((tmp) => {
        controller.earth.setCamera(tmp.x, tmp.y, tmp.z)
        controller.earth.earth.rotation.y = tmp.ry;
      })
      .onComplete(function () {
        controller.changeState('idle')
      })
      .easing(TWEEN.Easing.Cubic.Out)
      .start()
  }
  public forward() {
    TWEEN.update()
  }
}
//地球自转过程
class IdleState extends BaseState {
  constructor(controller: any) {
    super(controller)
    if (!(controller.state instanceof EnteringState)) {
      controller.playSprite('audio')
    }
    controller.earth.controller.enabled = true
  }

  forward() {
    this.controller.changeState('rotating')
  }
}
//地球转动到指定坐标
class RotatingState extends BaseState {
  private tween: any;
  constructor(controller: any) {
    super(controller)
    this.tween = null
    controller.pauseSprite('audio')
    controller.earth.controller.enabled = false
  }
  //继续hold则进行旋转
  public forward() {
    let earth = this.controller.earth
    let target = this.controller.target
    const position = earth.cameraPosition();
    const end = {
      x: target.cameraFarPosition[0],
      y: target.cameraFarPosition[1],
      z: target.cameraFarPosition[2]
    }
    if (this.tween) {
      TWEEN.update()
    } else {
      this.tween = new TWEEN.Tween(position)
        .to(end, 1000)
        .onUpdate(() => {
          earth.setCamera(position.x, position.y, position.z)
        }).onComplete(() => {
          this.controller.changeState('zooming')
          this.tween = null
        }).start()
    }
  }

  backward() {
    if (this.tween) {
      TWEEN.update()
    } else {
      this.controller.state = new IdleState(this.controller)
    }
  }
}
//地球距离被拉近拉远(cameraNearPosition => cameraFarPosition)
class ZoomingState extends BaseState {
  private direction: string;
  private tween: any
  constructor(controller: any) {
    super(controller)
    this.direction = ''
    this.tween = null
    controller.hideCloud()
    controller.showEarth()
  }

  setDirection(direction: any) {
    let earth = this.controller.earth
    let target = this.controller.target
    const from = earth.cameraPosition();

    let to: any
    if (this.direction !== direction) {
      if (direction === 'forward') {
        to = {
          x: target.cameraNearPosition[0],
          y: target.cameraNearPosition[1],
          z: target.cameraNearPosition[2]
        }
      } else {
        to = {
          x: target.cameraFarPosition[0],
          y: target.cameraFarPosition[1],
          z: target.cameraFarPosition[2]
        }
      }

      this.direction = direction
      this.tween && this.tween.stop()

      this.tween = new TWEEN.Tween(from).to(to, 1000).onUpdate(() => {
        earth.setCamera(from.x, from.y, from.z)
      }).onComplete(() => {
        this.handleTweenComplete()
      }).start()
    }
  }
//go on
  handleTweenComplete() {
    if (this.direction === 'forward') {
      this.controller.changeState('diving')
    } else {
      this.controller.changeState('idle')
    }
    this.tween = null
  }

  forward() {
    this.setDirection('forward')
    if (this.tween) {
      TWEEN.update()
    }
  }

  backward() {
    this.setDirection('backward')
    if (this.tween) {
      TWEEN.update()
    }
  }
}

//穿越云层的过程
class DivingState extends BaseState {
  private count: number;
  constructor(controller: any) {
    super(controller)
    this.count = 0
    controller.showCloud()
    controller.hideEarth()
    controller.hideVideo()
  }

  throttle(fn: Function) {
    if (this.count % 3 === 0) {
      fn && fn()
      this.count = 0
    }
    this.count++
  }

  forward() {
    let cloud = this.controller.cloud
    if (cloud.currentFrameIndex === cloud.images.length - 1) {
      this.controller.changeState('presenting')
    } else {
      this.throttle((_: any) => cloud.next())
    }
  }

  backward() {
    let cloud = this.controller.cloud
    if (cloud.currentFrameIndex === 0) {
      this.controller.changeState('zooming')
    } else {
      this.throttle((_: any) => cloud.prev())
    }
  }
}
//云层过后的视频展示
class PresentingState extends BaseState {
  constructor(controller: any) {
    super(controller)
    controller.hideCloud()
    controller.showVideo()
  }

  backward() {
    this.controller.changeState('diving')
  }
}
// class MoveState extends BaseState{
//   constructor(controller:any){
//     super(controller)
//   }
// }
export default class Controller {
  private earth: any;
  private cloud: any;
  private state: any;
  private target: any;
  private audio: any;
  private video: any;
  private moveList = [] as any[];

  private touchDown: any;
  private targetList = [] as any[];
  constructor(options: any) {
    this.earth = options.earth;
    this.cloud = options.cloud;
    this.audio = options.audio;
    this.video = options.video;

    this.state = null;
    this.targetList = [];
    this.target = null
    this.touchDown = false
    this.init()

  }
  init() {
    setTimeout(_ => {
      this.state = new EnteringState(this)
    }, 800)

    this.shuffleTargetList();
    this.getNearPosition();
    // console.log(this.moveList);
    this.loop();
  }
  //get targetList
  shuffleTargetList() {
    LOCATIONS.map((location) => this.targetList.push(location.name))
  }
  //loop animation
  loop() {
    requestAnimationFrame(this.loop.bind(this))
    this.animate()
  }
  //when move earth with hand
  /**
   * pending complete
   * get this.earth.cameraPosition() and move
   */
  private getNearPosition = () => {
    LOCATIONS.map((location) => {
      this.moveList.push(location.name, location.cameraFarPosition)
    })
  }
  private nearTarget = (camearPosition: any) => {
    this.moveList.map((movement, index) => {
      if (index % 2 !== 0) {
        movement.map((differ: any, index: number) => {
          // console.log('camearPosition: ', camearPosition);
          // console.log('differ: ', differ);
          if (camearPosition > differ + 5 || camearPosition > differ - 5) {
            // console.log('index: ', index);
          }
        })
      }
    })
  }
  animate() {
    if (!this.state) {
      return
    }
    if (this.state instanceof EnteringState) {
      this.state.forward()
    }

    this.nearTarget(this.earth.cameraPosition())
    if (this.touchDown && this.target) {
      this.state.forward()
    } else {
      this.state.backward()
    }
  }
  playSprite(type: any) {
    if (!this.target) {
      return
    }
    if (type === 'video') {
      this.video.repeat(this.target.name)
    } else if (type === 'audio') {
      this.audio.play(this.target.name)
    }
  }
  pauseSprite(type: any) {
    if (type === 'video') {
      this.video.pause()
    } else if (type === 'audio') {
      this.audio.pause()
    }
  }


  //hold
  start() {
    this.touchDown = true
  }
  // release
  end() {
    this.touchDown = false
  }
  //get next location.name  from 0
  public nextTarget() {
    let nextTargetIndex = (this.targetList.indexOf(this.target ? this.target.name : null) + 1) % this.targetList.length
    this.setTarget(this.targetList[nextTargetIndex])
  }
  //play target's audio&video
  private setTarget(locationName: any) {
    this.target = LOCATIONS.filter(location => location.name === locationName)[0]
    this.playSprite('audio')
    this.video.set(locationName)
  }
  showEarth() {
    this.earth.options.container.style.display = 'block'
  }

  hideEarth() {
    this.earth.options.container.style.display = 'none'
  }

  showCloud() {
    this.cloud.el.style.display = 'block'
  }
  hideCloud() {
    this.cloud.el.style.display = 'none'
  }
  showVideo() {
    this.playSprite('video')
    this.video.media.style.display = 'block'
  }

  hideVideo() {
    this.pauseSprite('video')
    this.video.media.style.display = 'none'
  }
  changeState(stateName: any) {
    switch (stateName) {
      case 'idle':
        this.state = new IdleState(this)
        break
      case 'rotating':
        this.state = new RotatingState(this)
        break
      case 'zooming':
        this.state = new ZoomingState(this)
        break
      case 'diving':
        this.state = new DivingState(this)
        break
      case 'presenting':
        this.state = new PresentingState(this)
        break
      default:
        this.state = new BaseState(this)
    }
  }
}