import * as React from 'react';
import styled from 'styled-components';

const MessageContent = styled.div`
  font-size: 500;
  margin: 4px 0;
`;

const MessageLabel = styled.span`
  font-weight: 600;
  margin-right: 8px;
`;

interface MessageProps {
  label: string;
  isVisible: boolean;
}

function Message({ label, isVisible }: MessageProps) {
  return (
    <MessageContent>
      <MessageLabel>{label}:</MessageLabel>
      {isVisible
        ? '(づ｡◕‿‿◕｡)づ You have found it!'
        : `¯\\_(ツ)_/¯ I don't know where it is. Use scroll to find it.`}
    </MessageContent>
  );
}

export default Message;
