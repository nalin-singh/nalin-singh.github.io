import { WindowDots } from "./Dots";

export default function Card({ text, subtext, image }) {
	return (
		<div className="shadow text-black min-w-[5rem] max-w-[30rem] border-4 border-black rounded-[1rem] p-5">
			<WindowDots />
			<div className="bg-gray-300 w-full min-h-[8rem] rounded-xl my-4"></div>
			<div>
				<h2 className="font-bold text-4xl">{text}</h2>
				<p className="text-lg mt-2">{subtext}</p>
			</div>
		</div>
	);
}
