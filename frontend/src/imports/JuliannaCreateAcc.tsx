import imgImage6 from "figma:asset/503b1c2f88ef89c5a935274bede0e7fb89b68d51.png";

function Filled() {
  return <div className="-translate-y-1/2 absolute bg-[#1292c8] h-[4px] left-0 right-[13.3%] rounded-[100px] top-1/2" data-name="Filled" />;
}

function Track() {
  return (
    <div className="-translate-y-1/2 absolute bg-[rgba(120,120,128,0.16)] h-[4px] left-[16px] right-[16px] top-1/2" data-name="Track">
      <Filled />
    </div>
  );
}

export default function JuliannaCreateAcc() {
  return (
    <div className="bg-[#eaeaea] relative size-full" data-name="julianna - create acc">
      <div className="absolute bg-white border border-[rgba(0,0,0,0.17)] border-solid h-[416px] left-[39px] rounded-[14px] top-[138px] w-[315px]" />
      <p className="absolute font-['Baskervville:Bold',sans-serif] font-bold leading-[normal] left-[57px] text-[#1e1e1e] text-[20px] top-[168px] w-[279px]">Connect with friends!</p>
      <p className="absolute font-['Baskervville:Bold',sans-serif] font-bold leading-[normal] left-[84px] text-[10px] text-white top-[338px] whitespace-nowrap">Create</p>
      <div className="absolute bg-[#1292c8] h-[27px] left-[64px] rounded-[13.5px] top-[479px] w-[80px]" />
      <p className="absolute font-['Baskervville:Bold',sans-serif] font-bold leading-[normal] left-[93px] text-[10px] text-white top-[486px] whitespace-nowrap">Done!</p>
      <div className="absolute bg-white h-[24px] left-[49px] top-[518px] w-[295px]" data-name="Progress Bar">
        <Track />
      </div>
      <div className="absolute left-[49px] size-[279px] top-[122px]" data-name="image 6">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage6} />
      </div>
    </div>
  );
}