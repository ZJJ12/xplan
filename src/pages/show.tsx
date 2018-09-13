import * as React from 'react';
import '../assets/styles/earth.scss';
import Earth from './earth';
import Cover from './Cover';
import CloudSprite from './cloudSprite';
import Controller from '../assets/ts/controller';
import Audio from './audioSprite';
import Video from './videoSprite';
import BtnAction from './action';
interface Props {
  images: any;
}
interface states {
  showBtn: Boolean;
}

export default class Show extends React.Component<Props, states> {
  private CLS = 'show_container';
  private earth: any;
  private cloudSprite: any;
  private controller: any;
  private video: any;
  private audio: any;
  state = {
    showBtn: false
  }
  private getEarth = (earth: any) => {
    this.earth = earth;
  }
  private getCloudSprite = (cloudSprite: any) => {
    this.cloudSprite = cloudSprite;
  }
  private getVideo = (video: any) => {
    this.video = video;
  }
  private getAudio = (audio: any) => {
    this.audio = audio;
  }
  // which Need to be controlled
  private creatController = () => {
    const {
      earth,
      cloudSprite,
      video,
      audio,
    } = this;
    const controller = new Controller(
      {
        earth,
        cloud: cloudSprite,
        video,
        audio,
      }
    );
    this.controller = controller;
    setTimeout(() => controller.nextTarget(), 1000)
  }
  public componentDidMount() {
    this.creatController();
    document.documentElement.addEventListener('touchmove', () => {
      this.setState({
        showBtn: true
      })
    }, false)
  }

  private handhold = () => {
    this.controller.start();
  }
  private handrelease = () => {
    this.controller.end();
  }
  private handleAudioSpriteEnd = () => {
    this.controller.nextTarget();
  }
  public render() {
    return (
      <div className={this.CLS}>
        <div className="page_container">
          <div className="page_show">
            <Cover showBtn={this.state.showBtn} />
            <Earth getEarth={this.getEarth} />
            <CloudSprite getCloudSprite={this.getCloudSprite} images={this.props.images} />
            <Video getVideo={this.getVideo} />
            <Audio handleSpriteEnd={this.handleAudioSpriteEnd} getAudio={this.getAudio} />
            <BtnAction showBtn={this.state.showBtn} handhold={this.handhold} handrelease={this.handrelease} />
          </div>
        </div>
      </div>
    );
  }
}

