import Image from "next/image"

export interface TransactionCardData {
  image: string;
  title: string;
  subtitle: string;
  amount: string;
  currency: string;
  value: string;
  color: string;
}

export const TransactionCard = ({ card }: { card: TransactionCardData }) => (
  <div className="flex-shrink-0 w-[24rem] flex justify-between bg-[#222222]/70 rounded-xl p-3">
    <div className="flex gap-2 text-gray-100 text-xs items-center">
      <Image src={card.image} alt="logo" height={40} width={50} />
      <div className="flex flex-col gap-2">
        <div>{card.title}</div>
        <div className="text-neutral-400">{card.subtitle}</div>
      </div>
    </div>
    <div className="flex flex-col items-end justify-center min-w-[90px]">
      <div className="flex items-center gap-1">
        <span className={`text-base font-semibold ${card.color} tracking-tight`}>{card.amount}</span>
        <span className="text-xs text-gray-300 font-medium ml-1">{card.currency}</span>
      </div>
      <div className="text-xs text-gray-400 mt-1 bg-[#232323] rounded px-2 py-0.5">{card.value}</div>
    </div>
  </div>
) 
