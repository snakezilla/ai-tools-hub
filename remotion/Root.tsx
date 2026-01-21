import React from 'react';
import { Composition } from 'remotion';
import { ClaudeCodeDemo } from './ClaudeCodeDemo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ClaudeCodeDemo"
        component={ClaudeCodeDemo}
        durationInFrames={510}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
