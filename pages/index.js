import Link from "next/link";
import { useEffect, useState } from "react";
import MainBanner from "../components/carousel/MainBanner";
import Categories from "../components/Categories";

export default function Home(props) {
	return (
		<div className="">
			<MainBanner />
			<div className="max-w-[1400px] mx-auto">
				<div className="py-[60px]">
					<div className="flex flex-row px-[30px]">
						<div className="font-bold text-30 my-auto mb-[10px] mr-auto">Categories</div>
						<Link href="/events">
							<a className="my-auto">
								<div className="text-16 ml-auto underline">see all</div>
							</a>
						</Link>
					</div>
					<Categories />
				</div>
			</div>
		</div>
	);
}
