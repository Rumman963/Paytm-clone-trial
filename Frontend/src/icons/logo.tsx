export function Logo(){

    return <div>
        <svg
  width="150"
  height="100"
  viewBox="0 0 420 120"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient
      id="payoGradient"
      x1="0"
      y1="0"
      x2="1"
      y2="1"
    >
      <stop offset="0%" stop-color="#3B82f7"/>
      <stop offset="100%" stop-color="#7C3AED"/>
    </linearGradient>
  </defs>


  <text
    x="18"
    y="88"
    font-family="Inter, Arial, sans-serif"
    font-size="88"
    font-weight="700"
    letter-spacing="-6"
    fill="#111B3D"
  >Pay
  
  </text>

    <circle
  cx="210"
  cy="62"
  r="34"
  fill="none"
  stroke="url(#payoGradient)"
  stroke-width="20"
/>

</svg>
    </div>
}