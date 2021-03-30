import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useTrackVisibility } from '../src';
import styled from 'styled-components';

const Root = styled.div`
  min-width: 300px;
`;

const Scroller = styled.div`
  width: 100%;
  /* height: 600px; */
  overflow: auto;
  background-color: #fafafa;
`;

const Message = styled.div`
  position: fixed;
  font-weight: 500;
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
  margin-top: 700px;
`;

const App = () => {
  const [rootMargin, setRootMargin] = React.useState<string>('600px');
  const [ref, { isVisible }] = useTrackVisibility({ rootMargin });

  return (
    <Root>
      <button
        onClick={() =>
          setRootMargin(current => (current ? undefined : '600px'))
        }
      >
        {rootMargin ? 'YES' : 'NO'}
      </button>
      <Scroller>
        <Message>
          {isVisible
            ? '(づ｡◕‿‿◕｡)づ You have found it!'
            : "¯\\_(ツ)_/¯ I don't know where the green ball is. Use scroll to find it."}
        </Message>
        <Content>
          <Ball ref={ref} />
        </Content>
      </Scroller>
    </Root>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
