import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getEventByIdAPIMethod } from "../../../api/client";

// TODO: change to dynamic routing (rewrites and proxy settings need to be done)
export default function Index(props) {
    const [data, setDate] = useState();
    const router = useRouter();

    useEffect(() => {
        getEventByIdAPIMethod(router.query.query).then((res) => {
            setDate(res);
        });
    }, []);

    return (
        <div className="min-h-screen bg-bg1">
            <div className="max-w-[1000px] mx-auto p-[30px]">
                <div className="font-bold text-26 mb-[60px]">Event details</div>
                <div>
                    {data?.title}
                </div>
            </div>
        </div>
    );
}
