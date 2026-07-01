export function LogoMonogram({ className, style, ariaHidden }) {
  return (
    <svg
      viewBox="0 0 48 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={ariaHidden ? undefined : 'Leah JHA'}
      aria-hidden={ariaHidden ? true : undefined}
      className={className}
      style={style}
    >
      {/* L — plus grand, trait plus épais */}
      <line x1="8"  y1="6"  x2="8"  y2="52" stroke="#C9A0A8" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="8"  y1="52" x2="42" y2="52" stroke="#C9A0A8" strokeWidth="2.4" strokeLinecap="round" />

      {/* J — plus fin, positionné à l'intérieur, courbe qui vient enlacer le coin du L */}
      <line x1="32" y1="6"  x2="32" y2="38" stroke="#C9A0A8" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M 32,38 C 32,51 17,54 11,46"
        stroke="#C9A0A8"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
