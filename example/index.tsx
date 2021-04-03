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

const ToggleButton = styled.button`
  margin-bottom: 6px;
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
enum Mode {
  DOCUMENT_PARENT,
  SCROLLABLE_PARENT,
}

function App() {
  const [mode, setMode] = React.useState(Mode.DOCUMENT_PARENT);
  const [ref, { isVisible, rootRef }] = useTrackVisibility();

  const innerContent = (
    <Content>
      <Ball ref={ref} />
    </Content>
  );

  return (
    <Root>
      <Top>
        <ToggleButton
          type="button"
          onClick={() =>
            setMode((current) =>
              current === Mode.DOCUMENT_PARENT
                ? Mode.SCROLLABLE_PARENT
                : Mode.DOCUMENT_PARENT,
            )
          }
        >
          {mode === Mode.DOCUMENT_PARENT ? 'Document' : 'Scrollable Parent'}
        </ToggleButton>
        <Message isVisible={isVisible} />
      </Top>
      {mode === Mode.DOCUMENT_PARENT ? (
        innerContent
      ) : (
        <Scroller ref={rootRef}>{innerContent}</Scroller>
      )}
    </Root>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
