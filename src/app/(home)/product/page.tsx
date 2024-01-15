'use client'

import SearchInput from "@/components/SearchInput";
import Topbar from "@/components/Topbar";
import { Button, Select } from "flowbite-react";
import { HiPlus, HiFilter } from 'react-icons/hi';
import React, { useEffect, useState } from "react";
import ProductFormModal from "@/components/ProductForm/ProductFormModal";
import axios from 'axios';
import DataTable from "@/components/Table/Table";
import { useRouter } from 'next/navigation';
import API from "@/constants/apiEndpoint";
import { useClaimModal } from "@/components/ClaimModal/ClaimModal";
import Product, { Quantity, createProduct } from "@/types/entity/Product";
import PaginationCustom from '@/components/Pagination/Pagination'
import { error } from "console";
import UpdateCategoryFormModal from "@/components/CategoryForm/UpdateModal";
import Category from "@/types/entity/Category";
import Supplier from "@/types/entity/Supplier";
import FORMATTER from "@/utils/formatter";
//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Product() {
    const [product, setProduct] = useState<Product[]>([]);
    //const tokenStr = localStorage.getItem("token") || "";
    let tmp;
    const [number, setNumber] = useState(1);
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUdateModal] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [sort, setSort] = useState('name');

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        console.log(page);
        fectchData();
    }

    const handleButtonClick = () => {
        setOpenModal(true);
    };

    const handleCloseForm = () => {
        setOpenModal(false);
        setOpenUdateModal(false);
        fectchData();
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

        fectchData();
        return;
    }

    const fectchData = async () => {
        const tokenStr = localStorage.getItem("token") || "";
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${API.authentication.product}?limit=10&page=${currentPage}&sortBy=${sort}`,
            headers: {
                Authorization: "Bearer " + tokenStr,
            },
        };

        try {
            const res = await axios.request(config);
            console.log(res);

            if (res.status == 401)
                console.log("aaaaaa");
            const products = res.data.results;
            setNumber(res.data.totalPages);
            console.log(products);
            const newProduct = products.map((data : { name: string, id: string, description: string, unit: string, images: string, price: number, categories: Category, supplier: Supplier, quantity: Quantity}) =>
            createProduct(
                data.name,
                data.id,
                data.description,
                data.unit,
                data.images,
                data.price,
                data.categories,
                data.supplier,
                data.quantity
                )
            );

            setProduct(newProduct);
            console.log(newProduct)
            return products;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fectchData();
    }, [])
    return (
        <main className="min-h-screen max-w-screen pt-2 px-4">
            <div className=" flex-col w-full">
                <Topbar title="Product" />
                <div className=" flex w-full my-2 justify-between">
                    <SearchInput />
                    <Select icon={HiFilter} onChange={(e) => {
                        setSort((e.target.value).toLowerCase());
                        fectchData();
                        }} 
                        required
                    >
                        <option>Name</option>
                        <option>Price</option>
                        <option>Supplier</option>
                        <option>Category</option>
                    </Select>
                    <Button onClick={handleButtonClick} className=" bg-primary rounded shadow-xl">
                        <HiPlus className="mr-2 h-5 w-5" />
                        Add Product
                    </Button>
                </div>

                <ProductFormModal openModal={openModal} onCloseModal={handleCloseForm} />
                <DataTable
                    data={product || []}
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
                        price: { 
                            title: "Price",
                            className: " font-normal text-secondary-500",
                            mapper: FORMATTER.toCurrency,
    
                        },
                        unit: {
                            title: "Unit",
                            className: " font-normal text-secondary-500"
                        },
                        description: { title: "Description"},
                        supplier: {title: "Supplier"},
                        category: {title: "Category"}
                    }}
                />
                <PaginationCustom number={number} currentPage={currentPage} onPageChange={onPageChange} />
            </div>
        </main>
    )
}