import * as React from 'react';
const ImageSprite = require('image-sprite');
import { PAGE_WIDTH, PAGE_HEIGHT } from '../assets/ts/constant';
import '../assets/styles/sprite.scss'
interface Props {
  images:any
  getCloudSprite:any
}

export default class CloudSprite extends React.Component<Props, any>{
  
  private CLS = 'cloud_container'
  public $options: any;
  createImageSprite() {
    const container = document.querySelector(`.${this.CLS}_sprite`);
    let images = this.props.images;

     const imageSprite = new ImageSprite(container, {
      interval: 80,
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      images: images
    })
    this.props.getCloudSprite(imageSprite)
  }

  public componentDidMount() {
    this.createImageSprite()
  }
  public render() {
    return (
      <div className={`${this.CLS}`}>
        <div className={`${this.CLS}_sprite`}></div>
      </div>
    );
  }
}
