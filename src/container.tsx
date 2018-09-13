import * as React from 'react';
import Show from './pages/show';
import Loading from './pages/loading';
import BgAudio from './pages/bgAudio'
import './assets/styles/reset.scss';
import { IMAGE_CLOUD_URLS } from './assets/ts/constant';
const Loader = require('resource-loader');

export default class Container extends React.Component<any, any>{
  state = {
    loading: true
  }
  private initLoader = () => {
    let loader = new Loader()
    Object.keys(IMAGE_CLOUD_URLS).forEach(name => {
      loader.add(name, IMAGE_CLOUD_URLS[name])
    })
    loader.onComplete.add(() => {
      setTimeout(() => {
        this.setState({ loading: false })
      }, 1000)
    })
    loader.load()
    return loader;
  }
  private getCloudImages = (resources: any) => {
    return new Array(13).fill('').map((item, index) => {
      return resources[`cloud${index}`].data
    })
  }
  public componentDidMount() {
  }
  public render() {
    return (
      <div>
        {this.state.loading ? <Loading loader={this.initLoader()} /> : ''}
        {!this.state.loading ? <Show images={this.getCloudImages(this.initLoader().resources)} /> : ''}
        <BgAudio />
      </div>
    );
  }
}
