import { Html5QrcodeScanner } from 'html5-qrcode';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StyledShadow } from './shadow';

const ChildComponent = ({ title, description }) => {
  let lastResult,
    countResults = 0;

  try {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      'qr-reader',
      { fps: 10, qrbox: 250 },
      false
    );
    html5QrcodeScanner.render((decodedText, decodedResult) => {
      if (decodedText !== lastResult) {
        ++countResults;
        lastResult = decodedText;
        // Handle on success condition with the decoded message.
        console.log(`Scan result ${decodedText}`, decodedResult);
      }
    }, console.log);
  } catch (err) {
    console.log(err);
  }
  return (
    <div>
      <h2>{title}!</h2>
      <p>{description}</p>
      <div id="qr-reader"></div>
    </div>
  );
};

const App = () => {
  return (
    <ChildComponent
      title="HTML5 QR Code scanner"
      description="Testing HTML5 QR Code Scanner with Shadow Dom"
    />
  );
};

const root = document.createElement('my-element');
document.querySelector('main').appendChild(root);

const withShadow = true;

ReactDOM.render(
  withShadow ? (
    <StyledShadow host={root}>
      <App />
    </StyledShadow>
  ) : (
    <App />
  ),
  root
);
