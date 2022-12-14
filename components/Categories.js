import { useRouter } from "next/router";

export default function Categories() {
	const router = useRouter();
	const handleClick = () => {
		router.push("/events?query=");
	};
	return (
		<div className="grid grid-cols-4 gap-y-[30px] mx-auto text-black" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", maxWidth: "100vw" }}>
			<div className="w-[300px] h-[200px] rounded-[10px] shadow-2xl mx-auto cursor-pointer hover:scale-[1.05] duration-200" style={{ minWidth: "300px" }}>
				<div className="relative w-full h-[200px]" onClick={handleClick}>
					<div className="absolute bottom-0 w-full h-[50px] rounded-b-[10px] bg-white/90">
						<div className="text-center mx-auto font-semibold text-20 mt-[8px]">Environment</div>
					</div>
					<img className="w-full h-full object-cover rounded-[10px]" src="/asset/img (1).png" />
				</div>
			</div>

			<div className="w-[300px] h-[200px] rounded-[10px] shadow-2xl mx-auto cursor-pointer hover:scale-[1.05] duration-200" style={{ minWidth: "300px" }}>
				<div className="relative w-full h-[200px]" onClick={handleClick}>
					<div className="absolute bottom-0 w-full h-[50px] rounded-b-[10px] bg-white/90">
						<div className="text-center mx-auto font-semibold text-20 mt-[8px]">Animal Care</div>
					</div>
					<img className="w-full h-full object-cover rounded-[10px]" src="/asset/img (5).png" />
				</div>
			</div>

			<div className="w-[300px] h-[200px] rounded-[10px] shadow-2xl mx-auto cursor-pointer hover:scale-[1.05] duration-200" style={{ minWidth: "300px" }}>
				<div className="relative w-full h-[200px]" onClick={handleClick}>
					<div className="absolute bottom-0 w-full h-[50px] rounded-b-[10px] bg-white/90">
						<div className="text-center mx-auto font-semibold text-20 mt-[8px]">Sports</div>
					</div>
					<img className="w-full h-full object-cover rounded-[10px]" src="/asset/img(18).png" />
				</div>
			</div>

			<div className="w-[300px] h-[200px] rounded-[10px] shadow-2xl mx-auto cursor-pointer hover:scale-[1.05] duration-200" style={{ minWidth: "300px" }}>
				<div className="relative w-full h-[200px]" onClick={handleClick}>
					<div className="absolute bottom-0 w-full h-[50px] rounded-b-[10px] bg-white/90">
						<div className="text-center mx-auto font-semibold text-20 mt-[8px]">Healthcare</div>
					</div>
					<img className="w-full h-full object-cover rounded-[10px]" src="/asset/img (16).png" />
				</div>
			</div>

			<div className="w-[300px] h-[200px] rounded-[10px] shadow-2xl mx-auto cursor-pointer hover:scale-[1.05] duration-200" style={{ minWidth: "300px" }}>
				<div className="relative w-full h-[200px]" onClick={handleClick}>
					<div className="absolute bottom-0 w-full h-[50px] rounded-b-[10px] bg-white/90">
						<div className="text-center mx-auto font-semibold text-20 mt-[8px]">Education</div>
					</div>
					<img className="w-full h-full object-cover rounded-[10px]" src="/asset/img (17).png" />
				</div>
			</div>
		</div>
	);
}
