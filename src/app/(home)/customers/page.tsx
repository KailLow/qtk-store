'use client'

import SearchInput from "@/components/SearchInput";
import Sibebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Button } from "flowbite-react";
import { HiPlus } from 'react-icons/hi';
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import CustomerFormModal from "@/components/CustomerForm/CustomerFormModal";
import { title } from "process";
import axios from 'axios';
import DataTable from "@/components/Table/Table";
import API from "@/constants/apiEndpoint";
import Customer, { createCustomer } from "@/types/entity/Customer";
import viewCustomerList from "@/api/Customers/viewAllCustomers";
import { data } from "autoprefixer";
import UpdateCustomerFormModal from "@/components/CustomerForm/UpdateModal";
//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerId, setCustomerId] = useState('');
  //const tokenStr = localStorage.getItem("token") || "";
  let tmp;

  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const handleButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseForm = () => {
    setOpenModal(false);
    console.log("aa" + customers);
    fectchData();
  };

  const handleCloseUpdateForm = () => {
    setOpenUpdateModal(false);
  }

  const onDelete = async (id: string) => {
    const tokenStr = localStorage.getItem("token") || "";
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `${API.authentication.customers}/${id}`,
      headers: {
        Authorization: "Bearer " + tokenStr,
      }
    };

    const res = await axios.request(config);
    console.log("delete" + res);

    fectchData();
    return;
  }

  const fectchData = async () => {
    const tokenStr = localStorage.getItem("token") || "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: API.authentication.customers,
      headers: {
        Authorization: "Bearer " + tokenStr,
      },
    };

    const res = await axios.request(config);

    const staffs = res.data.results as Customer[];
    const newCustomers = staffs.map((data) =>
      createCustomer(
        data.name,
        data.phone,
        data.email,
        data.gender,
        data.address,
        data.birthDate,
        data.active,
        data.id
      )
    );

    setCustomers(newCustomers);
    return staffs;
  };

  useEffect(() => {
    fectchData();
  }, [])
  return (
    <main className="min-h-screen max-w-screen pt-2 px-4">
      <div className=" flex-col w-full">
        <Topbar title="Customers" />
        <div className=" flex w-full my-2 justify-between">
          <SearchInput />

          <Button onClick={handleButtonClick} className=" bg-primary rounded shadow-xl">
            <HiPlus className="mr-2 h-5 w-5" />
            Add Customer
          </Button>
        </div>

        <CustomerFormModal openModal={openModal} onCloseModal={handleCloseForm} />
        <UpdateCustomerFormModal openModal={openUpdateModal} onCloseModal={handleCloseUpdateForm} customerId={customerId} />
        <DataTable
          data={customers || []}
          isLoading={false}
          onDelete={(customers) => {
            const confirmation = window.confirm("Bạn có chắc chắn muốn xóa khách hàng " + customers.name + " này?");

            if (confirmation) {
              onDelete(customers.id);
            }
          }}
          onEdit={(customers) => {
            setCustomerId(customers.id)
            setOpenUpdateModal(true)
          }}
          pick={{
            name: { title: "Name" },
            phone: { title: "Phone" },
            email: {
              title: "Email",
              className: " font-normal text-secondary-500",
            },
            birthDate: {
              title: "Other",
            },
          }}
        />
      </div>
    </main>
  )
}