import React from "react"
import { Composition } from "remotion"
import { ClaudeDemo } from "./compositions/ClaudeDemo"
import { ClaudeCodeDemo } from "./compositions/ClaudeCodeDemo"
import { ManusDemo } from "./compositions/ManusDemo"

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ClaudeDemo"
        component={ClaudeDemo}
        durationInFrames={495}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ClaudeCodeDemo"
        component={ClaudeCodeDemo}
        durationInFrames={870}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ManusDemo"
        component={ManusDemo}
        durationInFrames={780}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  )
}
