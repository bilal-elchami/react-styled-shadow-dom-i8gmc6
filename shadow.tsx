import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StyleSheetManager } from 'styled-components';
//import retargetEvents from 'react-shadow-dom-retarget-events';

const useForceUpdate = () => {
  const [state, setState] = React.useState(false);
  return () => setState(!state);
}

export const StyledShadow: React.FC<{ host: Element }> = ({ host, children }) => {
  const [shadow, setShadow] = React.useState<any | null>(null);
  const forceUpdate = useForceUpdate();

  React.useEffect(() => {
    const _shadow = host.attachShadow({ mode: 'open' }) as any;

    // Making the shadow appear like document 
    // so react events work as normal
    // https://github.com/facebook/react/issues/9242#issuecomment-534096832
    // https://github.com/facebook/react/issues/9242#issuecomment-543117675
    Object.defineProperty(host, 'ownerDocument', { value: _shadow });
    _shadow.createElement = document.createElement;
    _shadow.createElementNS = document.createElementNS;
    _shadow.createTextNode = document.createTextNode;

    setShadow(_shadow)
    forceUpdate();
  }, [])

  /*React.useEffect(() => {
    shadow && retargetEvents(shadow)
  }, [shadow]);*/

  return (
    shadow ? ReactDOM.createPortal(
      // Output styled-components generated styles in the shadow root
      <StyleSheetManager target={shadow as HTMLElement}>
        <React.Fragment>
          {children}
        </React.Fragment>
      </StyleSheetManager>,
      shadow as Element) : null
  )
}
