export default function Navbar() {
	return (
		<nav className="flex justify-between items-center">
			<div id="logo">
				<span className="font-bold text-xl text-black">Singh.</span>
			</div>
			<div className="text-black flex items-center justify-between text-sm">
				<p className="mx-4">Designer and Full Stack Developer</p>
				<p className="bg-black rounded-xl h-1 w-1 " />
				<p className="mx-4">Competitive Programmer</p>
				<p className="bg-black rounded-xl h-1 w-1 " />
				<p className="mx-4">Club Head | Community Lead</p>
				<p className="bg-black rounded-xl h-1 w-1 " />
				<p className="mx-4">Wanna be Gamer</p>
			</div>
			<div className="px-4 py-2 rounded-lg bg-black text-white">Let's Connect</div>
		</nav>
	);
}
