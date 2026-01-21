import React from "react"
import { Composition } from "remotion"
import { ClaudeDemo } from "./compositions/ClaudeDemo"
import { ClaudeCodeDemo } from "./compositions/ClaudeCodeDemo"
import { ChatGPTDemo } from "./compositions/ChatGPTDemo"
import { ManusDemo } from "./compositions/ManusDemo"
import { CopilotDemo } from "./compositions/CopilotDemo"
import { ZapierDemo } from "./compositions/ZapierDemo"
import { PerplexityDemo } from "./compositions/PerplexityDemo"

// 7 seconds at 30fps = 210 frames
const DEMO_CONFIG = {
  fps: 30,
  durationInFrames: 210,
  width: 1280,
  height: 720,
}

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ClaudeDemo"
        component={ClaudeDemo}
        {...DEMO_CONFIG}
      />
      <Composition
        id="ClaudeCodeDemo"
        component={ClaudeCodeDemo}
        {...DEMO_CONFIG}
      />
      <Composition
        id="ChatGPTDemo"
        component={ChatGPTDemo}
        {...DEMO_CONFIG}
      />
      <Composition
        id="ManusDemo"
        component={ManusDemo}
        {...DEMO_CONFIG}
      />
      <Composition
        id="CopilotDemo"
        component={CopilotDemo}
        {...DEMO_CONFIG}
      />
      <Composition
        id="ZapierDemo"
        component={ZapierDemo}
        {...DEMO_CONFIG}
      />
      <Composition
        id="PerplexityDemo"
        component={PerplexityDemo}
        {...DEMO_CONFIG}
      />
    </>
  )
}
