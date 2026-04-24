import imgImage5 from "figma:asset/a29a3ddc5579ed784f475a91316b9a76a33ef5db.png";

function Filled() {
  return <div className="-translate-y-1/2 absolute bg-[#1292c8] h-[4px] left-0 right-1/2 rounded-[100px] top-1/2" data-name="Filled" />;
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
      <p className="absolute font-['Baskervville:SemiBold',sans-serif] font-semibold leading-[normal] left-[55px] text-[10px] text-black top-[227px] whitespace-nowrap">On a weekly basis</p>
      <p className="absolute font-['Baskervville:Bold',sans-serif] font-bold leading-[normal] left-[57px] text-[#1e1e1e] text-[20px] top-[168px] w-[279px]">On a scale from 1-5, how much effort would you like to put in?</p>
      <p className="absolute font-['Baskervville:Bold',sans-serif] font-bold leading-[normal] left-[84px] text-[10px] text-white top-[338px] whitespace-nowrap">Create</p>
      <div className="absolute bg-[#1292c8] h-[27px] left-[64px] rounded-[13.5px] top-[479px] w-[80px]" />
      <p className="absolute font-['Baskervville:Bold',sans-serif] font-bold leading-[normal] left-[93px] text-[10px] text-white top-[486px] whitespace-nowrap">Next</p>
      <div className="absolute bg-white h-[24px] left-[49px] top-[518px] w-[295px]" data-name="Progress Bar">
        <Track />
      </div>
      <div className="absolute h-[154px] left-[94px] top-[566px] w-[206px]" data-name="image 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage5} />
      </div>
    </div>
  );
}