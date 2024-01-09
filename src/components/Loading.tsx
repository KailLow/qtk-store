import { Spinner } from "flowbite-react";

export default function Loading() {
    return (
        <div className=" w-fit mx-auto flex gap-5 bg-background-normal p-8 rounded-2xl">
            <Spinner size="md" />
            <p className=" text-secondary-900 font-semibold">Loading...</p>
        </div>
    );
}