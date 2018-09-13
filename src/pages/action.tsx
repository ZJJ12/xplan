import * as React from 'react';
import '../assets/styles/action.scss';
interface States {
}
interface Props{
  showBtn: Boolean
  handhold: any;
  handrelease: any;
}
export default class BtnAction extends React.Component<Props, States>{
  constructor(props: any) {
    super(props);
  }
  private CLS = 'action_container';
  public componentDidMount() {
  }
  public render() {
    return (
      <div className={`${this.CLS}`} style={this.props.showBtn ? { display: 'block' } : { display: 'none' }}>
        < div className={`${this.CLS}_longPressText is-active`} />
        < div className={`${this.CLS}_longPress is-active`} onTouchStart={this.props.handhold} onTouchEnd={this.props.handrelease} />
      </div>
    );
  }
}
