import Image from "next/image";

export default function VerticalCard({
	text,
	subtext,
	image,
	companyLogo,
	companyName,
}) {
	return (
		<div className="flex">
			<div className="bg-gray-200 rounded-[1rem] border-4 border-black shadow min-h-[8rem] p-5">
				{/* <Image src={companyLogo} alt={companyName} /> */}
				<p className="capitalize font-semibold">{companyName}</p>
				<h2 className="font-bold text-4xl">{text}</h2>
				<p className="text-lg mt-2">{subtext}</p>
			</div>
			{/*Image Component to be built*/}
		</div>
	);
}
