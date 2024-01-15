'use client';

import Image from "next/image";
import bg1 from "@/styles/images/bg1.png"

export default function ProductSale({name, price, image, onClick} : any){
    return(
        <>
            <div onClick={onClick} className=" justify-between items-center text-center m-2 w-28 h-32 bg-primary shadow-gray-500 shadow-md">
                <Image
                    priority
                    className=" "
                    src={image}
                    height={80}
                    width={120}
                    alt="Product"
                />
                <p className=" text-white text-sm">{name}</p>
                <p className=" text-white text-sm">{price}</p>
            </div>
        </>
    )
}