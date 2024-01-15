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
import Invoices, { createInvoice } from "@/types/entity/Invoices";
//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Invoices() {
    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [invoices, setInvoices] = useState<Invoices[]>([])
    //const tokenStr = localStorage.getItem("token") || "";
    let tmp;
    const router = useRouter();
    const currentPath = usePathname();
    const [number, setNumber] = useState(1);

    const changeStatus = async (id: string, status: string) => {
        const tokenStr = localStorage.getItem("token") || "";
        let data = JSON.stringify({
            "status": status,
          });
          
          let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${API.authentication.invoices}/${id}/update-status`,
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
            url: `${API.authentication.invoices}/`,
            headers: {
                    'Authorization': "Bearer " + tokenStr,
            },
        };

        try {
            const res = await axios.request(config);
            const invoice = res.data.results;
            const newArr = invoice.map((data : any) => 
                createInvoice(data.id, data.status, data.items, data.customer, data.dateIssued, data.totalAmount)
            )

            console.log(newArr);
            setInvoices(newArr)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fectchData();
    }, [])
    return (
        <main className="min-h-screen max-w-screen pt-2 px-4">
            <div className=" flex-col w-full">
                <Topbar title="Invoices" />
                <div className=" flex w-full my-2 justify-between">
                    <SearchInput />
                </div>

                <div className=" h-full flex-row-reverse">
                <InventoryTable
                    data={invoices || []}
                    isLoading={false}
                    onEdit={(invoice) => changeStatus(invoice.id, "paid")}
                    onDelete={(invoice) => changeStatus(invoice.id, "cancelled")}
                    pick={{
                        invoicesId: {
                            title: "Invoice ID"
                        },
                        dateIssued: { title: "Date" },
                        totalAmount: {
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