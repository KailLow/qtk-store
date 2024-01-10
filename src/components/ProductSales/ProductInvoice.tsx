"use client";

import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi";

export default function ProductInvoice({data, }:any){
    const [qty, setQty] = useState(1);
    const [value, setValue] = useState(data.price);

    const setPlus = () => {
        setQty(qty + 1);
      };
      
      const setMinus = () => {
        if (qty > 0) {
          setQty(qty - 1);
        }
      };

    // const setPlus = () => {
    //     setQty(qty + 1);
    //     console.log(qty);
    //     setValue(data.price * (qty + 1));
    // }

    // const setMinus = () => {
    //     setQty((qty > 0) ? (qty - 1) : 0);
    //     const newValue = (data.price * (qty - 1)) > 0 ? data.price * (qty - 1) : 0;
    //     setValue(newValue);
    // }

    return(
        <>
            <div className=" flex justify-between items-center ml-1 mb-2">
                <div>
                    <p>{data.name}</p>
                    <div className=" flex mt-1">
                        <Button color="failure" className=" w-7 h-7 rounded-none" onClick={setMinus}><HiMinus  className="h-4 w-4" /></Button>
                            <input className=" w-16 h-7" type="number" value={qty} />
                        <Button className=" w-7 h-7 rounded-none" onClick={setPlus}><HiPlus className=" h-4 w-4"/></Button>
                    </div>
                </div>
                <p>{value * qty}</p>
            </div>
        </>
    )
}