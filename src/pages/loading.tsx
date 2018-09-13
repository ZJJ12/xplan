import * as React from 'react';
import '../assets/styles/loading.scss';
interface Props {
  loader: any
}
export default class Loading extends React.Component<Props, any> {
  private CLS = 'loading_container';
  state = {
    progress: 0,
  }
  private getProgress = (loader: any) => {
    loader.onProgress.add(() => {
      this.setState({
        progress: Math.round(loader.progress)
      })
    })
  }
  private isShowLoader = (loader: any) => {

  }
  public componentDidMount() {
    const { loader } = this.props;

    this.getProgress(loader);
    this.isShowLoader(loader);
  }
  public render() {

    return (
      <div className={`${this.CLS}`} >
        <div className="page_show">
          <div className={`${this.CLS}_text`}></div>
          <div className={`${this.CLS}_orbits`}></div>
          <div className={`${this.CLS}_progres`}>{`${this.state.progress}%`}</div>
          <div className={`${this.CLS}_tips`}>打开声音体验更佳</div>
        </div>
      </div>
    );
  }
}
