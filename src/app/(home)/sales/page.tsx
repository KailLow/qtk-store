'use client'

import SearchInput from "@/components/SearchInput";
import Topbar from "@/components/Topbar";
import { Button } from "flowbite-react";
import { HiPlus } from 'react-icons/hi';
import React, { useState } from "react";
import ProductSale from "@/components/ProductSales/ProductSale";
import InvoiceForm from "@/components/Invoice/Invoice";
//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Customer() {

    const [openModal, setOpenModal] = useState(false);

    const handleButtonClick = () => {
        setOpenModal(true);
      };
    
      const handleCloseForm = () => {
        setOpenModal(false);
      };
    return (
        <main className="min-h-screen max-w-screen">
            <div className=" flex-col w-full">
                <Topbar title="Sales" />
                <div className=" flex w-full my-2 justify-between">
                    <SearchInput />
                    
                    
                </div>
                <div className=" flex w-full">
                    <div className=" w-3/4">
                        <ProductSale/>
                    </div>
                    <div className=" w-1/4">
                        <InvoiceForm/>
                    </div>
                </div>
            </div>
        </main>
    )
}