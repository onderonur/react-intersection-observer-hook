import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useTrackVisibility } from '../src';
import Message from './components/Message';

const Root = styled.div`
  min-width: 300px;
`;

const Top = styled.div`
  position: fixed;
  top: 6px;
`;

const Label = styled.label`
  display: block;
  user-select: none;
  font-weight: bold;
  > * {
    margin-left: 8px;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin: 8px 8px 4px 0;
`;

const Scroller = styled.div`
  width: 100%;
  height: 600px;
  overflow: auto;
  background-color: #fafafa;
`;

const Content = styled.div`
  height: 3000px;
`;

const Ball = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #1db954;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50%;
`;

// eslint-disable-next-line no-shadow
enum ParentType {
  DOCUMENT,
  SCROLLABLE_CONTAINER,
}

function App() {
  const [isContentVisible, setIsContentVisible] = React.useState(true);
  const [mode, setMode] = React.useState(ParentType.DOCUMENT);
  const [ref, { isVisible, rootRef }] = useTrackVisibility();
  const [
    ref2,
    { isVisible: isVisible2, rootRef: rootRef2 },
  ] = useTrackVisibility();

  const content = (
    <>
      <Content>
        <Ball ref={ref} />
      </Content>
      <Content>
        <Ball ref={ref2} />
      </Content>
    </>
  );

  const rootCallback = React.useCallback(
    (node) => {
      rootRef(node);
      rootRef2(node);
    },
    [rootRef, rootRef2],
  );

  return (
    <Root>
      <Top>
        <Label htmlFor="parentType">
          Parent Type
          <select
            id="parentType"
            value={mode}
            onChange={(e) => {
              setMode(parseInt(e.target.value));
            }}
          >
            <option value={ParentType.DOCUMENT}>Document</option>
            <option value={ParentType.SCROLLABLE_CONTAINER}>
              Scrollable Container
            </option>
          </select>
        </Label>
        <Label>
          <Checkbox
            checked={isContentVisible}
            onChange={(e) => setIsContentVisible(e.target.checked)}
          />
          Show Content
        </Label>
        <Message label="First ball" isVisible={isVisible} />
        <Message label="Second ball" isVisible={isVisible2} />
      </Top>
      {isContentVisible && (
        <div>
          {mode === ParentType.DOCUMENT ? (
            content
          ) : (
            <Scroller ref={rootCallback}>{content}</Scroller>
          )}
        </div>
      )}
    </Root>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
