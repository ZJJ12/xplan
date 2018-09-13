import * as React from 'react';
import '../assets/styles/earth.scss';
import EarthLoader from '../assets/ts';
interface Props {
  getEarth: any;
}
export default class Earth extends React.Component<Props, any> {
  private CLS = 'earth_container';
  public $options: any
  public componentDidMount() {
    const container = document.querySelector(`.${this.CLS}`)
    const options = {
      container,
      camera: {
        fov: 40,
        near: 0.1,
        far: 1000,
      },
    };
    const earth = new EarthLoader(options);
    this.props.getEarth(earth)
  }

  public render() {
    return (
      <div className={this.CLS}></div>
    );
  }
}
