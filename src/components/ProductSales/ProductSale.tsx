'use client';

import Image from "next/image";

export default function ProductSale(){
    return(
        <>
            <div className=" justify-between items-center text-center w-24 h-24 bg-primary shadow-gray-500 shadow-md">
                <Image
                    priority
                    className=" "
                    src="/images/bg1.png"
                    height={80}
                    width={100}
                    alt=""
                />
                <p className=" text-white">Product</p>
            </div>
        </>
    )
}