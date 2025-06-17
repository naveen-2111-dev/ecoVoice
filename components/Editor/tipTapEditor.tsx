"use client"

import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const TiptapEditor = dynamic(() => import("./setup"), {
    ssr: false,
});

export default function WritePage() {
    const route = useRouter();
    return (
        <div className="max-w-3xl mx-auto mt-10">
            <div className="flex justify-between items-center">
                <ArrowLeft onClick={() => route.back()} className="cursor-pointer"/>
                <h1 className="text-2xl font-bold mb-4">Raise a Voice</h1>
            </div>
            <TiptapEditor />
        </div>
    );
}
