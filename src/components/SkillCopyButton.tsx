'use client'

interface SkillCopyButtonProps {
  command: string
}

export function SkillCopyButton({ command }: SkillCopyButtonProps) {
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(command)
      }}
      className="self-start px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition"
    >
      Copy Command
    </button>
  )
}
