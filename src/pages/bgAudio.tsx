import * as React from 'react';
import '../assets/styles/sprite.scss'

import { MEDIA_URLS } from '../assets/ts/constant';
export default class BgAudio extends React.Component<any, any>{

  public componentDidMount() {
    const bgAudio = document.querySelector('.bgAudio') as HTMLAudioElement;
    bgAudio.autoplay = true;
    // bgAudio.play()
    // bgAudio.pause()
    // setTimeout(_ => bgAudio.play(), 0)
  }
  public render() {
    return (
      <audio className="bgAudio" src={MEDIA_URLS.backgroundAudio} style={{ display: 'none' }} loop></audio>
    );
  }
}
