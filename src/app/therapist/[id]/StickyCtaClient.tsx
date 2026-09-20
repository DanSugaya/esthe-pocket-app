'use client';

type StickyCtaClientProps = {
  tel: string;
};

export default function StickyCtaClient({ tel }: StickyCtaClientProps) {
  return (
    <div className="fixed bottom-[64px] left-0 right-0 h-[56px] bg-white border-t border-[#E0E0E0] flex items-center px-4 z-20">
      <button 
        type="button" 
        className="w-[44px] h-[44px] flex items-center justify-center text-[#F5A623] text-xl"
        aria-label="お気に入り"
      >
        ★
      </button>
      <a
        href={`tel:${tel}`}
        className="flex-1 h-[48px] bg-[#1B2F8F] text-white font-bold text-[14px] rounded-[8px] flex items-center justify-center ml-2"
      >
        電話で予約する
      </a>
    </div>
  );
}