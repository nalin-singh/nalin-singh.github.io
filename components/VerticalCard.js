import Image from "next/image";

export default function VerticalCard({
	text,
	subtext,
	image,
	companyLogo,
	companyName,
}) {
	return (
		<div className="bg-gray-200 rounded-[1rem] border-4 border-black shadow min-h-[8rem] p-5">
			{/* <Image src={companyLogo} alt={companyName} /> */}
			<p>{text}</p>
			<p>{subtext}</p>
		</div>
	);
}
