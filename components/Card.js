import { WindowDots } from "./Dots";

export default function Card({ text, subtext, image }) {
	return (
		<div className="shadow text-black min-h-[20rem] border-4 border-black rounded-[1rem] p-5">
			<WindowDots />
			<div className="bg-gray-300 w-full min-h-[8rem] rounded-xl my-4"></div>
			<div>
				<p>{text}</p>
				<p>{subtext}</p>
			</div>
		</div>
	);
}
