import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Container from './container';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div>
    <Container />
  </div>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
