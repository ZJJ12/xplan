import * as React from 'react';
const MediaSprite = require('media-sprite');
interface Props {
  getVideo: any,
}
import { MEDIA_URLS, LOCATIONS } from '../assets/ts/constant';
export default class Video extends React.Component<Props, any>{
  private CLS = 'video_sprite';
  private getSpriteInfo() {
    let spriteInfo = {}
    LOCATIONS.forEach(location => {
      spriteInfo[location.name] = location.videoSprite
    })
    return spriteInfo
  }
  private createVideoSprite = () => {
    const container = document.querySelector('.video') as any;
    let videoSprite = new MediaSprite({
      media: container,
      mediaType: 'video',
      sprites: this.getSpriteInfo()
    })
    this.props.getVideo(videoSprite)
    window.onload = () => {
      videoSprite.media.play()
    }
    // videoSprite.media.pause()
  }
  public componentDidMount() {
    this.createVideoSprite()
  }
  public render() {
    return (
      <div className={`${this.CLS}`}>
        <video src={MEDIA_URLS.videoSprite} className="video" playsInline muted></video>
      </div>
    );
  }
}
