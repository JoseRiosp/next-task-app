'use client'
import { Link} from "@mui/material";
import Image from "next/image";

export default function AboutPage() {
        //'TODO: Center this stupid shit before I lost my patience istg
    return (
            <div className="flex justify-center">
            <div className="p-5 max-w-sm mx-auto bg-sky-400 rounded-xl shadow-lg justify-center gap-x-4">
                <div className="text-xl font-medium text-white">
                TaskApp is an independent Dev project</div>
                <p className="text-slate-500">Design and brought to you by:</p>
                <Link className="text-white" href='https://github.com/JoseRiosp' >
                    JoseRiosP</Link>
                <div className="shrink-0">
                <Image width={50} height={40} alt='JoseRiosP-logo' quality={50} src='/joseIcon.PNG' ></Image>
                </div>
            </div>
            </div> );
}