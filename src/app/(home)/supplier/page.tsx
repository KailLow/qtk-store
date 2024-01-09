'use client'

import SearchInput from "@/components/SearchInput";
import Topbar from "@/components/Topbar";
import { Button } from "flowbite-react";
import { HiPlus } from 'react-icons/hi';
import React, { useEffect, useState } from "react";
import SupplierFormModal from "@/components/SupplierForm/SupplierFormModal";
import axios from 'axios';
import DataTable from "@/components/Table/Table";
import { useRouter } from 'next/navigation';
import API from "@/constants/apiEndpoint";
import Customer, { createCustomer } from "@/types/entity/Customer";
import Supplier, { createSupplier } from "@/types/entity/Supplier";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import PaginationCustom from "@/components/Pagination/Pagination";
//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Supplier() {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    //const tokenStr = localStorage.getItem("token") || "";
    let tmp;
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [number, setNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        fectchData();
    }

    const handleButtonClick = () => {
        setOpenModal(true);
    };

    const handleCloseForm = () => {
        setOpenModal(false);
        console.log("aa" + suppliers);
        fectchData();
    };

    const onDelete = async (id: string) => {
        const tokenStr = localStorage.getItem("token") || "";
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${API.authentication.supplier}/${id}`,
            headers: {
                Authorization: "Bearer " + tokenStr,
            }
        };

        const res = await axios.request(config);
        console.log("delete" + res);

        fectchData;
        return;
    }

    const fectchData = async () => {
        const tokenStr = localStorage.getItem("token") || "";
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${API.authentication.supplier}?limit=10&page=${currentPage}&sortBy=name`,
            headers: {
                Authorization: "Bearer " + tokenStr,
            },
        };

        try {
            const res = await axios.request(config);

            if (res.status == 401)
                console.log("aaaaaa");
            const supplier = res.data.results as Supplier[];
            setNumber(res.data.totalPages);
            const newSuppliers = supplier.map((data) =>
                createSupplier(
                    data.name,
                    data.phone,
                    data.email,
                    data.address,
                    data.taxIdentificationNumber,
                    data.id
                )
            );

            setSuppliers(newSuppliers);
            return supplier;
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        fectchData();
    }, [])
    return (
        <main className="min-h-screen max-w-screen pt-2 px-4">
            <div className=" flex-col w-full">
                <Topbar title="Supplier" />
                <div className=" flex w-full my-2 justify-between">
                    <SearchInput />

                    <Button onClick={handleButtonClick} className=" bg-primary rounded shadow-xl">
                        <HiPlus className="mr-2 h-5 w-5" />
                        Add Supplier
                    </Button>
                </div>

                <SupplierFormModal openModal={openModal} onCloseModal={handleCloseForm} />
                <DataTable
                    data={suppliers || []}
                    isLoading={false}
                    onDelete={(supplier) => {
                        const confirmation = window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?");

                        if (confirmation) {
                            onDelete(supplier.id);
                        }
                    }}
                    onEdit={(supplier) => {
                        setOpenModal(true);
                    }}
                    pick={{
                        name: { title: "Name" },
                        phone: { title: "Phone" },
                        email: {
                            title: "Email",
                            className: " font-normal text-secondary-500",
                        },
                        taxIdentificationNumber: {
                            title: "Tax Identification Number",
                        },
                    }}
                />
                <PaginationCustom number={number} currentPage={currentPage} onPageChange={onPageChange} />
            </div>
        </main>
    )
}