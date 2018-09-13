
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three';
import { Options } from '../ts/types/type';

export default class Base {
  protected renderer: WebGLRenderer;
  protected scene: Scene;
  protected camera: PerspectiveCamera;
  protected animate: any;
  private onUpdateHandlers = [] as any[];
  private uid = 0;
  constructor(private options: Options) {
    const { options: { container, camera: { fov, near, far } } } = this;
    this.renderer = new WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    this.camera = new PerspectiveCamera(fov, container.offsetWidth / container.offsetHeight, near, far);
    this.scene = new Scene();
    this.initScene();
  }
  /**
   *
   * @description 整体初始化视图
   * @private
   * @memberof Base
   */
  private initScene = () => {
    const { resize, scene } = this;
    this.animate = this.animation();
    this.rendereration();
    this.renderFunction();
    scene.add(this.camera);
    window.addEventListener('resize', resize, false);
  }
  /**
   * @description 更新渲染视图
   * @private
   * @memberof Base
   */
  private renderFunction = () => {
    const { scene } = this;
    const render = () => {
      this.renderer.render(scene, this.camera);
      for (const func of this.onUpdateHandlers) {
        if (typeof func === 'function') {
          func();
        }
      }
      requestAnimationFrame(render);
    };
    render();
  }
  /**
   * @description 将渲染器加入dom
   *
   * @private
   * @memberof Base
   */
  private rendereration = () => {
    const { renderer, options: { container } } = this;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
  }
  /**
   *
   * @description 更新或移除对象
   * @private
   * @memberof Base
   */
  private animation = () => {
    let { uid } = this;
    const { onUpdateHandlers } = this;
    return {
      update(eventHandler: () => void) {
        onUpdateHandlers.push(eventHandler);
        uid++;
        return uid;
      },
      remove(uuid: number) {
        onUpdateHandlers[uuid] = null;
      },
    };
  }
  /**
   *@description 窗口或框架被重新调整大小时resize
   *
   * @private
   * @memberof Base
   */
  private resize = () => {
    const { options: { container } } = this;
    this.camera.aspect = container.offsetWidth / container.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
  }
}

