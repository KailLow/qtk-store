'use client'

import SearchInput from "@/components/SearchInput";
import Topbar from "@/components/Topbar";
import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
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
import Customer, { Gender, createCustomer } from "@/types/entity/Customer";
import Image from "next/image";

//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Sales() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [customerId, setCustomerId] = useState('');

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


    const [item, setItem] = React.useState([]);
    const [billTotal, setBillTotal] = React.useState(0);


    function handleChange(index: any, event: any) {
        //Storing currect item value in a array object 
        let data = [...item]
        //Getting the changed input box name and their corresponding value
        data[index][event.target.name] = event.target.value
        //Calculating the total value accordingly 
        data[index]['total'] = (data[index]['quantity'] * data[index]['importPrice']).toFixed(2)
        //Setting the new value accordingly
        setItem(data)
    }
    function removeEntry(index: number) {
        //Storing old items value in a variable
        let data = [...item]
        //Removing the array object with index value form the stored variable
        data.splice(index, 1)
        //Storing it into the state
        setItem(data)
    }

    function addItem(id: string, name: string, qty: number, price: number) {
        //Creating new object 
        const newItem = { id: id || "", name: name || "", quantity: qty || "", importPrice: price || "", total: (qty * price) || 0 }
        setItem((oldValue) => {
            const newArray = []
            //Trying to get old value and push it to new empty array
            for (let i = 0; i < oldValue.length; i++) {
                newArray.push(oldValue[i])
            }
            //After pushing all old array, adding newly created empty object
            newArray.push(newItem)
            return newArray
        })
    }


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

    const createBill = async () => {
        console.log(item);
        const tokenStr = localStorage.getItem("token") || "";

        const tmp = item.map((value, index) => (
            {productId: value.id, quantity: value.quantity}
        ));
        console.log(tmp)

        let data = JSON.stringify({
            'customerId' : customerId,
            'items': tmp
          });

        console.log(data);

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${API.authentication.invoices}/`,
            headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': "Bearer " + tokenStr,
            },
            data : data
        };

        try {
            const res = await axios.request(config);

            console.log(res);
            setIsSell(false);
            setItem([]);
        } catch (error) {
            console.log(error)
        }
    }

    const fectchCustomerData = async () => {
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

        const staffs = res.data.results;
        const newCustomers = staffs.map((data: { name: string; phone: string; email: string; gender: Gender; address: { province: string; district: string; ward: string; }; birthDate: string; active: boolean; id: string; }) =>
            createCustomer(
                data.name,
                data.phone,
                data.email,
                data.gender,
                data.address.province,
                data.address.district,
                data.address.ward,
                data.birthDate,
                data.active,
                data.id
            )
        );

        setCustomers(newCustomers);
        //setCustomerId(customers[0].id);
        return staffs;
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
        fectchCustomerData();
        setBillTotal(() => {
            let data = [...item];
            //Initializing temporary variable
            let temp = 0;
            //Parsing through each item to calculate bill total based on each item total amount
            for (let i = 0; i < data.length; i++) {
                temp = parseFloat(data[i].total) + temp;
            }
            return temp.toFixed(2)
        })
    }, [item])
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
                            // <ProductSale key={index} name={value.name} price={value.price} image={value.images} onClick={() => { setSell([...sell, value]); addItem(value.id, value.name, 1, value.price) }} />
                            <>
                                <div onClick={() => { console.log(value.images); addItem(value.id, value.name, 1, value.price) }} className=" justify-between items-center text-center m-2 w-28 h-min-32 h-fit bg-primary shadow-gray-500 shadow-md">
                                    <Image
                                        priority
                                        className=" "
                                        src={value.images[0]}
                                        height={80}
                                        width={120}
                                        alt="Product"
                                    />
                                    <p className=" text-white text-sm">{value.name}</p>
                                    <div className=" flex justify-around"> 
                                        <p className=" text-white text-sm">{value.price}</p>
                                        <p className=" text-white text-sm">{value.quantityInStock}</p>
                                    </div>
                                </div>
                            </>
                        ) : (<></>))}
                    </div>
                    <div className=" w-1/2">
                        <div className=" border-l-2 border-red-700 pl-1">
                            <div className=" w-full">
                                <form >
                                    <div className=" w-full mx-3">
                                        {/* <Button className=" py-1 px-5 bg-primary" size="sm" type='button' onClick={addItem}>Add+</Button> */}
                                        {item.map((input, index) => (
                                            <div className=" w-full my-2 justify-between flex items-center" key={index}>
                                                <p className=" text-slate-600 mr-1">{index + 1}</p>
                                                <input className=" w-1/3" name="iname" placeholder='item name' value={input.name} onChange={event => handleChange(index, event)}></input>
                                                <TextInput className=" rounded-xl border-gray-400 w-1/3" name="quantity" type="number" pattern="[0-9]*" step="1" min="0" max="999" placeholder='quantity' value={input.quantity} onChange={event => handleChange(index, event)}></TextInput>
                                                <TextInput disabled className=" rounded-xl border-gray-400" name="importPrice" type="number" pattern="[0-9]*" step="1" min=".00" max="99999.99" placeholder='amount' value={input.importPrice} onChange={event => handleChange(index, event)}></TextInput>
                                                <Label className=" w-1/6 text-right mr-2" name="total" placeholder='total' value={input.total} />
                                                <Button className=" h-fit mr-2" size="xs" color="red" key={index} onClick={() => removeEntry(index)}>Remove</Button>
                                            </div>
                                        ))}

                                        <h3 className=" text-lg font-semibold">Total amount: <span className=" text-red-600">{billTotal ? billTotal : 0}đ</span></h3>

                                        {/* <Button className=" bg-primary" type='button'>Import</Button> */}

                                    </div>
                                </form>
                            </div>

                            <Button onClick={() => setIsSell(true)}>Pay</Button>
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
                                                <div className=" flex justify-between">
                                                    <p>Customer: </p>
                                                    <Select onChange={(e: any) => setCustomerId(e.target.value)}>
                                                        {customers.map((value: any, index: any) => (
                                                            <option key={index} value={value.id}>{value.name}</option>
                                                        ))}
                                                    </Select>
                                                </div>
                                                <p>Invoice: </p>
                                                <p>Staff: superAdmin</p>
                                                <p>PRODUCTS: </p>
                                            </div>
                                            <div>
                                                {
                                                    item.map((product, index) => (
                                                        <>
                                                            <div className=" flex justify-between items-center ml-1 mb-2">
                                                                <div className=" w-1/6"><p>{index + 1}</p></div>
                                                                <div className=" w-4/6">
                                                                    <p>{product.name}</p>
                                                                    <div className=" flex mt-1">
                                                                        <p>{product.quantity}</p>
                                                                    </div>
                                                                </div>
                                                                <p>{product.importPrice * product.quantity}</p>
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
                                                        <p>{billTotal}</p>
                                                        <TextInput value={received} onChange={(e: any) => setReceived(e.target.value)} />
                                                        <p>{received < total ? 0 : (received - total)}</p>
                                                    </div></>
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={() => createBill()}>Pay</Button>
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