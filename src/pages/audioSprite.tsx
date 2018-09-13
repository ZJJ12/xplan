import * as React from 'react';
import '../assets/styles/sprite.scss'
const MediaSprite = require('media-sprite');
interface Props {
  handleSpriteEnd: any,
  getAudio: any
}
import { MEDIA_URLS, LOCATIONS } from '../assets/ts/constant';
export default class Audio extends React.Component<Props, any>{

  private CLS = 'audio_sprite';
  private getSpriteInfo() {
    let spriteInfo = {}
    LOCATIONS.forEach(location => {
      spriteInfo[location.name] = location.soundSprite
    })
    return spriteInfo
  }
  private createAudioSprite = () => {
    let audioSprite = new MediaSprite({
      media: MEDIA_URLS.audioSprite,
      mediaType: 'audio',
      sprites: this.getSpriteInfo(),
      onReady: function () { },
      onSpriteEnd: this.props.handleSpriteEnd
    })
    this.props.getAudio(audioSprite)
    window.onload = () => {
      audioSprite.media.play()
    }
    // audioSprite.media.pause()
  }
  public componentDidMount() {
    this.createAudioSprite();
  }
  public render() {
    return (
      <div className={`${this.CLS}`}>
      </div>
    );
  }
}
