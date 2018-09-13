import * as React from 'react';
import '../assets/styles/action.scss';
interface Props {
  showBtn: Boolean
}
interface States {
}
export default class Cover extends React.Component<Props, States>{
  constructor(props: any) {
    super(props);
  }
  private CLS = 'earth_cover';
  public componentDidMount() {
  }
  public render() {
    return (
      <div className={`${this.CLS}`} style={this.props.showBtn ? { display: 'none' } : { display: 'block' }}>
        <div className={`${this.CLS}_cover`} />
        <div className={`${this.CLS}_coord`} style={{ display: 'none' }}></div>
        <div className={`${this.CLS}_tips`} >
          <div className={`${this.CLS}_hand`}></div>
        </div>
      </div>
    );
  }
}