'use client'

import SearchInput from "@/components/SearchInput";
import Topbar from "@/components/Topbar";
import { Button } from "flowbite-react";
import { HiPlus } from 'react-icons/hi';
import React, { useEffect, useState } from "react";
import CategoryFormModal from "@/components/CategoryForm/CategoryFormModal";
import axios from 'axios';
import DataTable from "@/components/Table/Table";
import { useRouter } from 'next/navigation';
import API from "@/constants/apiEndpoint";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import Category, { createCategory } from "@/types/entity/Category";
import PaginationCustom from '@/components/Pagination/Pagination'
import { error } from "console";
import UpdateCategoryFormModal from "@/components/CategoryForm/UpdateModal";
//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Category() {
    const [category, setCategory] = useState<Category[]>([]);
    //const tokenStr = localStorage.getItem("token") || "";
    let tmp;
    const [number, setNumber] = useState(1);
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUdateModal] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        console.log(page);
        fetchData();
    }

    const handleButtonClick = () => {
        setOpenModal(true);
    };

    const handleCloseForm = () => {
        setOpenModal(false);
        setOpenUdateModal(false);
        fetchData();
    };

    const onDelete = async (id: string) => {
        const tokenStr = localStorage.getItem("token") || "";
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${API.authentication.category}/${id}`,
            headers: {
                Authorization: "Bearer " + tokenStr,
            }
        };

        const res = await axios.request(config);
        console.log("delete" + res);

        fetchData();
        return;
    }

    const fetchData = async () => {
        const tokenStr = localStorage.getItem("token") || "";
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${API.authentication.category}?limit=10&page=${currentPage}&sortBy=name`,
            headers: {
                Authorization: "Bearer " + tokenStr,
            },
        };

        try {
            const res = await axios.request(config);
            console.log(res);

            if (res.status == 401)
                console.log("aaaaaa");
            const category = res.data.results as Category[];
            setNumber(res.data.totalPages);
            const newCategory = category.map((data) =>
                createCategory(
                    data.name,
                    data.id,
                    data.productIds
                )
            );

            setCategory(newCategory);
            return category;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <main className="min-h-screen max-w-screen pt-2 px-4">
            <div className=" flex-col w-full">
                <Topbar title="Category" />
                <div className=" flex w-full my-2 justify-between">
                    <SearchInput />

                    <Button onClick={handleButtonClick} className=" bg-primary rounded shadow-xl">
                        <HiPlus className="mr-2 h-5 w-5" />
                        Add Category
                    </Button>
                </div>

                <CategoryFormModal openModal={openModal} onCloseModal={handleCloseForm} />
                <UpdateCategoryFormModal openModal={openUpdateModal} onCloseModal={handleCloseForm} categoryName={categoryName} categoryID={categoryId} />
                <DataTable
                    data={category || []}
                    isLoading={false}
                    onDelete={(category) => {
                        const confirmation = window.confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?");

                        if (confirmation) {
                            onDelete(category.id);
                        }
                    }}
                    onEdit={(category) => {
                        setCategoryName(category.name);
                        setCategoryId(category.id);
                        setOpenUdateModal(true);
                    }}
                    pick={{
                        name: { title: "Name" },

                    }}
                />
                <PaginationCustom number={number} currentPage={currentPage} onPageChange={onPageChange} />
            </div>
        </main>
    )
}