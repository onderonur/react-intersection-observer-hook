import * as React from 'react';
import styled from 'styled-components';

const MessageContent = styled.div`
  font-size: 500;
`;

interface MessageProps {
  isVisible: boolean;
}

function Message({ isVisible }: MessageProps) {
  return (
    <MessageContent>
      {isVisible
        ? '(づ｡◕‿‿◕｡)づ You have found it!'
        : "¯\\_(ツ)_/¯ I don't know where the green ball is. Use scroll to find it."}
    </MessageContent>
  );
}

export default Message;
