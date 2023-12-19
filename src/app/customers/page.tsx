'use client'

import SearchInput from "@/components/SearchInput";
import Sibebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Button } from "flowbite-react";
import { HiPlus } from 'react-icons/hi';
import React, { useState } from "react";
//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Customer() {

    const [isFormVisible, setFormVisible] = useState(false);

    const handleButtonClick = () => {
        setFormVisible(true);
      };
    
      const handleCloseForm = () => {
        setFormVisible(false);
      };

    return (
        <main className="flex min-h-screen max-w-screen">
            <Sibebar />
            <div className=" flex-col w-full">
                <Topbar />
                <div className=" flex w-full justify-around m-1">
                    <SearchInput />
                    
                    <Button onClick={handleButtonClick} className=" bg-primary rounded shadow-xl">
                        <HiPlus className="mr-2 h-5 w-5"/>
                        Add Customer
                    </Button>
                </div>
            </div>
        </main>
    )
}