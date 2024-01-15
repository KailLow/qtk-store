'use client'

import SearchInput from "@/components/SearchInput";
import FORMATTER from "@/utils/formatter";
import Topbar from "@/components/Topbar";
import { Button } from "flowbite-react";
import { HiPlus } from 'react-icons/hi';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import API from "@/constants/apiEndpoint";
import Category, { createCategory } from "@/types/entity/Category";
import UpdateCategoryFormModal from "@/components/CategoryForm/UpdateModal";
import Inventory, { createInventory } from "@/types/entity/Inventory";
import Product, { Quantity, createProduct } from "@/types/entity/Product";
import { usePathname, useRouter } from "next/navigation";
import Supplier from "@/types/entity/Supplier";
import { data } from "autoprefixer";
import InventoryTable from "@/components/Table/InventoryTable";
//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Inventories() {
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [sell, setSell] = useState<Product[]>([])
    //const tokenStr = localStorage.getItem("token") || "";
    let tmp;
    const router = useRouter();
    const currentPath = usePathname();
    const [number, setNumber] = useState(1);

    const changeStatus = async (id: string) => {
        const tokenStr = localStorage.getItem("token") || "";
        let data = JSON.stringify({
            "status": "completed"
          });
          
          let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${API.authentication.inventory}/import-products/${id}/status`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + tokenStr,
            },
            data : data
          };

        try {
            const res = await axios.request(config);
            console.log(res);

        } catch (error) {
            console.log(error);
        }
    }

    const fectchData = async () => {
        const tokenStr = localStorage.getItem("token") || "";
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${API.authentication.inventory}/import-products`,
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
            const newArr = products.map((data : any) => (
                createInventory(data.createdBy.name, data.id, data.status, data.products, data.products[0].receivedDate, data.totalImportPrice)
            ))

            setInventory(newArr);
            console.log(newArr)
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
                <Topbar title="Inventory" />
                <div className=" flex w-full my-2 justify-between">
                    <SearchInput />

                    <Button onClick={() => router.push(`${currentPath}/create_import_bill`)} className=" bg-primary rounded shadow-xl">
                        <HiPlus className="mr-2 h-5 w-5" />
                        Import Product
                    </Button>
                </div>

                <div className=" h-full flex-row-reverse">
                <InventoryTable
                    data={inventory || []}
                    isLoading={false}
                    onEdit={(inventor) => changeStatus(inventor.id)}
                    pick={{
                        name: { title: "Staff" },
                        expiryDate: { title: "Expriry Date" },
                        totalImportPrice: {
                            title: "Total Import Price",
                            mapper: FORMATTER.toCurrency,
                        },
                        status: {
                            title: "Status",
                            className: " font-normal text-secondary-500",
                        },
                    }}
                />
                </div>
                
            </div>
        </main>
    )
}