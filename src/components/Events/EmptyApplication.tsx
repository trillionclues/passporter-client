import Image from "next/image";

interface EmptyApplicationProps {
  text?: string;
}
const EmptyApplication: React.FC<EmptyApplicationProps> = ({ text }) => {
  return (
    <>
      <div className="flex flex-col gap-6 items-center p-12 w-full max-h-[226px] rounded-full bg-[#E6EAEF] max-w-[226px] ">
        <div>
          <Image
            className="grayscale w-16"
            src="/images/empty.png"
            alt="Empty"
            height={70}
            width={64}
          />
        </div>
        <p className="text-xs text-center text-[#0d7836] font-medium">{text}</p>
      </div>
    </>
  );
};

export default EmptyApplication;
