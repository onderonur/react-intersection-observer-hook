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

const Ball = styled.div<{ color: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
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
  const [
    firstBallRef,
    { isVisible: isFirstBallVisible, rootRef: firstBallRootRef },
  ] = useTrackVisibility();

  const [
    secondBallRef1,
    { isVisible: isSecondBallVisible1, rootRef: secondBallRootRef1 },
  ] = useTrackVisibility();

  const [
    secondBallRef2,
    { isVisible: isSecondBallVisible2, rootRef: secondBallRootRef2 },
  ] = useTrackVisibility({
    threshold: 0.5,
  });

  const secondBallRef = React.useCallback(
    (node: HTMLDivElement) => {
      secondBallRef1(node);
      secondBallRef2(node);
    },
    [secondBallRef1, secondBallRef2],
  );

  const content = (
    <>
      <Content>
        <Ball ref={firstBallRef} color="#1db954" />
      </Content>
      <Content>
        <Ball ref={secondBallRef} color="#f20404" />
      </Content>
    </>
  );

  const rootCallback = React.useCallback(
    (node) => {
      firstBallRootRef(node);
      secondBallRootRef1(node);
      secondBallRootRef2(node);
    },
    [firstBallRootRef, secondBallRootRef1, secondBallRootRef2],
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
        <Message label="Green ball" isVisible={isFirstBallVisible} />
        <Message label="Red ball" isVisible={isSecondBallVisible1} />
        <Message
          label="More than half of red ball"
          isVisible={isSecondBallVisible2}
        />
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
