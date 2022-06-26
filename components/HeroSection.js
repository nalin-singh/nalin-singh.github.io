import Image from "next/image";
import HeroImage from "../images/hero-image.svg";

export default function Hero() {
	return (
		<section className="container text-black text-center min-h-[100vh] flex flex-col items-center justify-around">
			<div className="flex flex-col items-center w-full ">
				<p className="text-8xl font-bold">
					<span className="px-4 py-2 rounded-[2rem] border-4 border-black shadow">
						Crafting
					</span>{" "}
					Clean Tech
				</p>
				<p className="mt-12 max-w-[60%] text-semibold text-lg">
					I&apos;m Nalin Singh, a self-taught Designer & Developer based out of
					Bangalore, India. I work with startups and enterprises to build
					frontend and marketing solutions, interested in understanding
					businesses and code.
				</p>
				<Image src={HeroImage} alt="Motivated Kid" />
			</div>
		</section>
	);
}
