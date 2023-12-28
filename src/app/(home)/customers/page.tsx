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
import DataTable from "@/components/Table/Table";
//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Customer() {

    const [openModal, setOpenModal] = useState(false);

    const handleButtonClick = () => {
        setOpenModal(true);
      };
    
      const handleCloseForm = () => {
        setOpenModal(false);
      };

      const data = [
        {
          "id": "12345",
          "name": "John Doe",
          "phone": "0123456789",
          "email": "johndoe@example.com",
          "address": "123 Main Street, City",
          "other": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          "id": "67890",
          "name": "Jane Smith",
          "phone": "9876543210",
          "email": "janesmith@example.com",
          "address": "456 Elm Street, Town",
          "other": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
        },
        {
          "id": "54321",
          "name": "Alex Johnson",
          "phone": "5555555555",
          "email": "alexjohnson@example.com",
          "address": "789 Oak Street, Village",
          "other": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        }
      ]
    return (
        <main className="min-h-screen max-w-screen">
            <div className=" flex-col w-full">
                <Topbar title="Customers" />
                <div className=" flex w-full my-2 justify-between">
                    <SearchInput />
                    
                    <Button onClick={handleButtonClick} className=" bg-primary rounded shadow-xl">
                        <HiPlus className="mr-2 h-5 w-5"/>
                        Add Customer
                    </Button>
                </div>
                
                <CustomerFormModal openModal={openModal} onCloseModal={handleCloseForm}/>
                <DataTable
                data={data || []}
                isLoading={false}
                
                pick={{
                    name: { title: "Name" },
                    phone: { title: "Phone" },
                    email: {
                        title: "Email",
                        className: " font-normal text-secondary-500",
                    },
                    address: {
                        title: "Address",
                    },
                    other: {
                        title: "Other",
                    },
                }}
                />
            </div>
        </main>
    )
}