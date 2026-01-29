interface LogoProps {
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ showText = true, size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: "w-7 h-7", text: "text-lg" },
    md: { icon: "w-8 h-8", text: "text-xl" },
    lg: { icon: "w-10 h-10", text: "text-2xl" },
  }

  return (
    <div className="flex items-center gap-2.5">
      {/* The SVG Icon: Three blue books with constellation patterns */}
      <svg
        viewBox="0 0 100 100"
        className={`${sizes[size].icon} overflow-visible`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Book 1 - Vertical (Darkest Blue) */}
        <rect x="25" y="20" width="12" height="60" rx="2" fill="#0071E3" />
        <rect x="25" y="20" width="4" height="60" rx="0" fill="#0062CC" />
        {/* Constellation on Book 1 */}
        <circle cx="33" cy="35" r="1.2" fill="#93c5fd" />
        <circle cx="30" cy="45" r="1.2" fill="#93c5fd" />
        <circle cx="34" cy="55" r="1.2" fill="#93c5fd" />
        <circle cx="31" cy="65" r="1" fill="#93c5fd" />
        <line x1="33" y1="35" x2="30" y2="45" stroke="#93c5fd" strokeWidth="0.6" opacity="0.8" />
        <line x1="30" y1="45" x2="34" y2="55" stroke="#93c5fd" strokeWidth="0.6" opacity="0.8" />
        <line x1="34" y1="55" x2="31" y2="65" stroke="#93c5fd" strokeWidth="0.6" opacity="0.8" />

        {/* Book 2 - Leaning 15 deg (Medium Blue) */}
        <g transform="rotate(-15, 45, 80)">
          <rect x="45" y="25" width="12" height="55" rx="2" fill="#147CE5" />
          <rect x="45" y="25" width="4" height="55" rx="0" fill="#0071E3" />
          {/* Constellation on Book 2 */}
          <circle cx="53" cy="38" r="1.2" fill="#bfdbfe" />
          <circle cx="50" cy="48" r="1.2" fill="#bfdbfe" />
          <circle cx="54" cy="58" r="1.2" fill="#bfdbfe" />
          <circle cx="51" cy="68" r="1" fill="#bfdbfe" />
          <line x1="53" y1="38" x2="50" y2="48" stroke="#bfdbfe" strokeWidth="0.6" opacity="0.8" />
          <line x1="50" y1="48" x2="54" y2="58" stroke="#bfdbfe" strokeWidth="0.6" opacity="0.8" />
          <line x1="54" y1="58" x2="51" y2="68" stroke="#bfdbfe" strokeWidth="0.6" opacity="0.8" />
        </g>

        {/* Book 3 - Leaning 30 deg (Lightest Blue) */}
        <g transform="rotate(-30, 65, 80)">
          <rect x="65" y="30" width="12" height="50" rx="2" fill="#3F96E8" />
          <rect x="65" y="30" width="4" height="50" rx="0" fill="#147CE5" />
          {/* Constellation on Book 3 */}
          <circle cx="73" cy="42" r="1.2" fill="#dbeafe" />
          <circle cx="70" cy="52" r="1.2" fill="#dbeafe" />
          <circle cx="74" cy="62" r="1" fill="#dbeafe" />
          <line x1="73" y1="42" x2="70" y2="52" stroke="#dbeafe" strokeWidth="0.6" opacity="0.8" />
          <line x1="70" y1="52" x2="74" y2="62" stroke="#dbeafe" strokeWidth="0.6" opacity="0.8" />
        </g>

        {/* Ground/Shelf Line */}
        <line x1="20" y1="80" x2="90" y2="80" stroke="#E8E8ED" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* The Branding Text */}
      {showText && (
        <span className={`${sizes[size].text} font-semibold tracking-tight text-foreground`}>
          Practical<span className="text-accent">Library</span>
        </span>
      )}
    </div>
  )
}
