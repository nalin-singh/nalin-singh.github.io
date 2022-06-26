import Image from "next/image";

export default function IconGrid({ icons }) {
	let it = 0;
	return (
		<div className="rounded-2xl bg-slate-50 my-8 p-8">
			<div className="grid grid-cols-12 items-center align-middle">
				{icons.map(
					(icon) => (
						(it = it + 1),
						(
							<div>
								<Image key={it} src={icon} alt="" />
							</div>
						)
					)
				)}
			</div>
		</div>
	);
}
