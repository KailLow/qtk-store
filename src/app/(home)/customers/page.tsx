'use client'

import SearchInput from "@/components/SearchInput";
import Sibebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Button } from "flowbite-react";
import { HiPlus } from 'react-icons/hi';
import React, { useState } from "react";
import CustomerFormModal from "@/components/CustomerForm/CustomerFormModal";
import { title } from "process";
import AddressSelect from "@/components/AddressSelect/AddressSelect";
//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Customer() {

    const [openModal, setOpenModal] = useState(false);

    const handleButtonClick = () => {
        setOpenModal(true);
      };
    
      const handleCloseForm = () => {
        setOpenModal(false);
      };

      const columns = ['ID', 'Name', 'Age'];
    return (
        <main className="min-h-screen max-w-screen">
            <div className=" flex-col w-full">
                <Topbar />
                <div className=" flex w-full m-1 justify-between mx-3">
                    <SearchInput />
                    
                    <Button onClick={handleButtonClick} className=" bg-primary rounded shadow-xl">
                        <HiPlus className="mr-2 h-5 w-5"/>
                        Add Customer
                    </Button>
                </div>
                
                <CustomerFormModal openModal={openModal} onCloseModal={handleCloseForm}/>
                
            </div>
        </main>
    )
}