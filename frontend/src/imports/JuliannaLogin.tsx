import imgImage4 from "figma:asset/87002dc9ebad91441154d9d2357d238cb6055e1c.png";

export default function JuliannaLogin() {
  return (
    <div className="bg-[#eaeaea] relative size-full" data-name="julianna - login">
      <div className="absolute bg-white border border-[rgba(0,0,0,0.17)] border-solid h-[296px] left-[39px] rounded-[14px] top-[138px] w-[315px]" />
      <p className="absolute font-['Baskervville:SemiBold',sans-serif] font-semibold leading-[normal] left-[60px] text-[10px] text-black top-[211px] whitespace-nowrap">Username or Email</p>
      <p className="absolute font-['Baskervville:Bold',sans-serif] font-bold leading-[normal] left-[60px] text-[#1e1e1e] text-[20px] top-[170px] whitespace-nowrap">Looping in again?</p>
      <div className="absolute bg-white border-[0.5px] border-[rgba(0,0,0,0.31)] border-solid h-[29px] left-[60px] rounded-[4px] top-[227px] w-[269px]" />
      <p className="absolute font-['Baskervville:SemiBold',sans-serif] font-semibold leading-[normal] left-[60px] text-[10px] text-black top-[271px] whitespace-nowrap">Password</p>
      <div className="absolute bg-white border-[0.5px] border-[rgba(0,0,0,0.31)] border-solid h-[29px] left-[60px] rounded-[4px] top-[287px] w-[269px]" />
      <div className="absolute left-[108px] size-[11px] top-[272px]" data-name="image 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage4} />
      </div>
      <div className="absolute bg-[#1292c8] h-[27px] left-[60px] rounded-[13.5px] top-[331px] w-[80px]" />
      <p className="absolute font-['Baskervville:Bold',sans-serif] font-bold leading-[normal] left-[85px] text-[10px] text-white top-[338px] whitespace-nowrap">Log in</p>
      <p className="absolute font-['Baskervville:Bold',sans-serif] font-bold leading-[0] left-[62px] text-[10px] text-black top-[373px] whitespace-nowrap">
        <span className="leading-[normal]">{`Out of the loop? `}</span>
        <span className="leading-[normal] text-[#1292c8]">Create an account</span>
      </p>
      <div className="absolute h-0 left-[138px] top-[386px] w-[83px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 83 1">
            <line id="Line 3" stroke="var(--stroke-0, #1292C8)" x2="83" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}