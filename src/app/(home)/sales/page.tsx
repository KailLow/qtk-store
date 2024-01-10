'use client'

import SearchInput from "@/components/SearchInput";
import Topbar from "@/components/Topbar";
import { Button, Modal, TextInput } from "flowbite-react";
import { HiMinus, HiPlus } from 'react-icons/hi';
import React, { useEffect, useState } from "react";
import ProductSale from "@/components/ProductSales/ProductSale";
import InvoiceForm from "@/components/Invoice/Invoice";
import Product, { Quantity, createProduct } from "@/types/entity/Product";
import axios from "axios";
import API from "@/constants/apiEndpoint";
import Category from "@/types/entity/Category";
import Supplier from "@/types/entity/Supplier";
import ProductInvoice from "@/components/ProductSales/ProductInvoice";
//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Sales() {

    const [product, setProduct] = useState<Product[]>([]);
    const [sell, setSell] = useState<Product[]>([])
    //const tokenStr = localStorage.getItem("token") || "";
    let tmp;
    const [number, setNumber] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUdateModal] = useState(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sort, setSort] = useState('name');

    const [qty, setQty] = useState(1);
    const [value, setValue] = useState(0);
    const [isSell, setIsSell] = useState(false);
    const [total, setTotal] = useState(0);
    const [received, setReceived] = useState(0);

    const setPlus = (price : number) => {
        setQty(qty + 1);
        setTotal(total + price)
    };

    const setMinus = (price : number) => {
        if (qty > 0) {
            setQty(qty - 1);
            setTotal(total - price);
        }
    };


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


    const fectchData = async () => {
        const tokenStr = localStorage.getItem("token") || "";
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${API.authentication.product}?limit=30&page=${currentPage}&sortBy=${sort}`,
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
            const newProduct = products.map((data: { name: string, id: string, description: string, unit: string, images: string, price: number, categories: Category, supplier: Supplier, quantity: Quantity }) =>
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
        <main className="min-h-screen max-w-screen  pt-2 px-4">
            <div className=" flex-col w-full">
                <Topbar title="Sales" />
                <div className=" flex w-full my-2 justify-between">
                    <SearchInput />


                </div>
                <div className=" flex w-full">
                    <div className=" flex flex-wrap w-3/4">
                        {product.map((value, index) => value.quantityInStock > 0 ? (
                            <ProductSale key={index} name={value.name} price={value.price} image={value.images} onClick={() => { setSell([...sell, value]); setTotal(total + value.price) }} />
                        ) : (<></>))}
                    </div>
                    <div className=" w-1/4">
                        <div className=" border-l-2 border-red-700 pl-1">
                            <div className=" justify-center text-center text-2xl font-semibold text-primary">
                                <h1>INVOICE</h1>
                                <hr />
                            </div>
                            <div>
                                <p>Customer: </p>
                                <p>Invoice: </p>
                                <p>Date: </p>
                                <p>Staff: </p>
                            </div>
                            <div>
                                {
                                    sell.map((product, index) => (
                                        <>
                                            <div className=" flex justify-between items-center ml-1 mb-2">
                                                <div>
                                                    <p>{product.name}</p>
                                                    <div className=" flex mt-1">
                                                        <Button color="failure" className=" w-7 h-7 rounded-none" onClick={()=>setMinus(product.price)}><HiMinus className="h-4 w-4" /></Button>
                                                        <input className=" w-16 h-7" type="number" value={qty} />
                                                        <Button className=" w-7 h-7 rounded-none" onClick={()=>setPlus(product.price)}><HiPlus className=" h-4 w-4" /></Button>
                                                    </div>
                                                </div>
                                                <p>{product.price * qty}</p>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                            <div className=" flex justify-between">
                                    <><div>
                                        <p>Total: </p>
                                        <p className=" my-2">Received</p>
                                        <p>Excess</p>
                                    </div>
                                    <div>
                                            <p>{total}</p>
                                            <TextInput value={received} onChange={(e : any) => setReceived(e.target.value)} type="number" />
                                            <p>{received < total ? 0 : (received - total)}</p>
                                        </div></>
                            </div>

                            <Button onClick={() => setIsSell(true)}>Thanh toan</Button>
                            <Modal show={isSell} onClose={() => setIsSell(false)}>
                                <Modal.Header>
                                <div className=" justify-center text-center text-2xl font-semibold text-primary">
                                <h1>INVOICE</h1>
                                <hr />
                            </div>
                                </Modal.Header>
                                <Modal.Body>
                                <div className=" w-full">
                        <div className=" border-l-2 border-red-700 pl-1">
                            
                            <div>
                                <p>Customer: </p>
                                <p>Invoice: </p>
                                <p>Date: </p>
                                <p>Staff: </p>
                            </div>
                            <div>
                                {
                                    sell.map((product, index) => (
                                        <>
                                            <div className=" flex justify-between items-center ml-1 mb-2">
                                                <div>
                                                    <p>{product.name}</p>
                                                    <div className=" flex mt-1">
                                                        <p>{qty}</p>
                                                    </div>
                                                </div>
                                                <p>{product.price * qty}</p>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                            <div className=" flex justify-between">
                                    <><div>
                                        <p>Total: </p>
                                        <p className=" my-2">Received</p>
                                        <p>Excess</p>
                                    </div>
                                    <div>
                                            <p>{total}</p>
                                            <p>{received}</p>
                                            <p>{received < total ? 0 : (received - total)}</p>
                                        </div></>
                            </div>
                            </div>
                            </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button>Thanh toan</Button>
                                    <Button onClick={() => setIsSell(false)}>Cancel</Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}