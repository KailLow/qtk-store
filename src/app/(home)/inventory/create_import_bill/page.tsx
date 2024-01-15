'use client'

import SearchInput from "@/components/SearchInput";
import Topbar from "@/components/Topbar";
import { Button, Label, Select, TextInput, Datepicker } from "flowbite-react";
import { HiPlus } from 'react-icons/hi';
import React, { useEffect, useState } from "react";
import ImportProductModal from "@/components/InventoryForm/ImportProductModal";
import CategoryFormModal from "@/components/ProductForm/ProductFormModal";
import axios from 'axios';
import API from "@/constants/apiEndpoint";
import Category, { createCategory } from "@/types/entity/Category";
import Inventory, { createInventory } from "@/types/entity/Inventory";
import Product, { Quantity, createProduct } from "@/types/entity/Product";
import Supplier, { createSupplier } from "@/types/entity/Supplier";
import { usePathname, useRouter } from "next/navigation";
//import CustomerForm from "@/components/CustomerForm/CustomerForm";

export default function Create_import_bill() {
    const [product, setProduct] = useState<Product[]>([]);
    const [supplier, setSuppliers] = useState<Supplier[]>([]);
    const [supplierName, setSupplierName] = useState('');
    const [supplierTax, setSupplierTax] = useState('');
    const [supplierId, setSupplierId] = useState('');
    const [number, setNumber] = useState(1);;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sort, setSort] = useState('name');
    const [openModal, setOpenModal] = useState(false);

    
    const now = new Date();
    const year = now.getFullYear(); 
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const [item, setItem] = React.useState([{ id: "", quantity: "", importPrice: "", expiryDate: formattedDate, total: 0 }]);
    const [billTotal, setBillTotal] = React.useState(0);
    
    const router = useRouter();

    const handleButtonClick = () => {
        setOpenModal(true);
    };

    const handleCloseForm = () => {
        setOpenModal(false);
        fectchData();
    };

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

    function addItem() {
        //Creating new object 
        const newItem = { id: "", quantity: "", importPrice: "", total: 0 }
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

    const importProduct = async () => {
        console.log(item);
        const tokenStr = localStorage.getItem("token") || "";

        const tmp = item.map((value, index) => (
            {id: value.id, quantity: value.quantity, importPrice: value.importPrice, expiryDate: formattedDate}
        ));
        console.log(tmp)

        let data = JSON.stringify({
            'products': tmp
          });

        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${API.authentication.inventory}/import-products`,
            headers: {
                    'Content-Type': 'application/json', 
                    'Authorization': "Bearer " + tokenStr,
            },
            data : data
        };

        try {
            const res = await axios.request(config);

            console.log(res);
            router.back();
        } catch (error) {
            console.log(error)
        }
    }

    // const handleInputChange = (index: number, value: string) => {
    //     const newInputs: Promise<number[]> = [...inputs];
    //     newInputs[index] = value;
    //     setInputs(newInputs);
    // };

    // const handleQtyInputChange = (index: number, value: number) => {
    //     const newInputs: Promise<number[]> = [...inputs];
    //     newInputs[index] = parseInt(value);
    //     setQty(newInputs);
    // };

    // const handlePriceInputChange = (index: number, value: number) => {
    //     const newInputs = [...inputs];
    //     newInputs[index] = parseInt(value);
    //     setPrice(newInputs);
    // };

    const fetchSupplier = async () => {
        const tokenStr = localStorage.getItem("token") || "";
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${API.authentication.supplier}?name=${supplierName}`,
            headers: {
                Authorization: "Bearer " + tokenStr,
            },
        };

        try {
            const res = await axios.request(config);

            console.log(res);
            if (res.status == 401)
                console.log("aaaaaa");
            const supplier = res.data.results;
            const newSuppliers = supplier.map((data: { name: string; phone: string; email: string; address: { province: string; district: string; ward: string; }; taxIdentificationNumber: string; id: string; }) =>
                createSupplier(
                    data.name,
                    data.phone,
                    data.email,
                    data.address.province,
                    data.address.district,
                    data.address.ward,
                    data.taxIdentificationNumber,
                    data.id
                )
            );
            setSupplierTax(newSuppliers[0].taxIdentificationNumber);
            return supplier;
        } catch (error) {
            console.log(error)
        }
    }

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
            console.log(newProduct);
        } catch (error) {
            console.log(error);
        }

        config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${API.authentication.supplier}?sortBy=name`,
            headers: {
                Authorization: "Bearer " + tokenStr,
            },
        };

        try {
            const res = await axios.request(config);

            if (res.status == 401)
                console.log("aaaaaa");
            const supplier = res.data.results;
            const newSuppliers = supplier.map((data: { name: string; phone: string; email: string; address: { province: string; district: string; ward: string; }; taxIdentificationNumber: string; id: string; }) =>
                createSupplier(
                    data.name,
                    data.phone,
                    data.email,
                    data.address.province,
                    data.address.district,
                    data.address.ward,
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
        <main className="min-h-screen max-w-screen pt-2 px-4">
            <div className=" flex-col w-full">
                <Topbar title="Inventory" />
                <div className=" flex w-full my-2 justify-between">
                    <SearchInput />

                    <Button className=" m-2" onClick={() => setOpenModal(true)}>Add new Product</Button>
                </div>

                <div className=" flex">
                    <div className=" w-1/4 h-full flex-row-reverse">
                        <Label className=" text-xl font-semibold text-primary">Import Bill</Label>
                        <Label className=' mb-2 block' htmlFor='name1' value='Supplier Name' />
                        <Select id='category' onChange={(e: any) => { setSupplierName(e.target.value); fetchSupplier(); }} placeholder="select" required>
                            <option></option>
                            {supplier.map((value: any, index: number) => (
                                <option value={value.name} className="bg-primary rounded m-2" key={index}>{value.name}</option>
                            ))}
                        </Select>
                        <Label className=' mb-2 block' htmlFor='name1' value='Tax Number' />
                        <TextInput className=" bg-slate-500 rounded-lg" id='name' disabled value={supplierTax} />

                        <Label className=' mb-2 block' htmlFor='name1' value='Expiry Date' />
                        <TextInput className=" bg-slate-500 rounded-lg" id='name' disabled value={formattedDate} />



                    </div>
                    {/* <ScrollView >
                        <Button className=" m-2" onClick={handleAddInput}>Import Product</Button>
                        {inputs.map((input, index) => (
                            <>
                                <div className=" flex">
                                    <div >
                                        <Label value="Product" />
                                        <Select className=" m-1" id='category' required>
                                            {(supplierId === '') ? (<option></option>) : (<></>)}
                                            {product.map((value: any, index: number) => (
                                                <option onChange={(e: any) => setSupplierId(e.target.value)} value={value.id} className="bg-primary rounded m-2" key={index}>{value.name}</option>
                                            ))}
                                        </Select>
                                        <Label value="Quantity" />
                                        <TextInput
                                            type="number"
                                            className=" m-1"
                                            key={index}
                                            onChange={(e: any) => handleQtyInputChange(index, e)}
                                        />
                                    </div>
                                    <div>
                                        <Label value="Price Import" />
                                        <TextInput
                                            className=" m-1"
                                            key={index}
                                            type="number"
                                            onChange={(e: any) => handlePriceInputChange(index, e)}
                                        />
                                    </div>
                                </div>
                            </>
                        ))}
                    </ScrollView> */}
                    <div className=" w-3/4">
                        <form >
                            <div className=" w-full mx-3">
                                <Button className=" py-1 px-5 bg-primary" size="sm" type='button' onClick={addItem}>Add+</Button>
                                {item.map((input, index) => (
                                    <div className=" w-full my-2 justify-between flex items-center" key={index}>
                                        {/* <input name="iname" placeholder='item name' value={input.iname} onChange={event => handleChange(index, event)}></input> */}
                                        <Select name="id" onChange={event => handleChange(index, event)} className=" w-1/3" id='category' required>
                                            {(supplierId === '') ? (<option></option>) : (<></>)}
                                            {product.map((value: any, index: number) => (
                                                <option value={value.id} className="bg-primary rounded m-2" key={index}>{value.name}</option>
                                            ))}
                                        </Select>
                                        <TextInput className=" rounded-xl border-gray-400 w-1/6" name="quantity" type="number" pattern="[0-9]*" step="1" min="0" max="999" placeholder='quantity' value={input.quantity} onChange={event => handleChange(index, event)}></TextInput>
                                        <TextInput className=" rounded-xl border-gray-400 w-1/5" name="importPrice" type="number" pattern="[0-9]*" step="1" min=".00" max="99999.99" placeholder='amount' value={input.amount} onChange={event => handleChange(index, event)}></TextInput>
                                        <Label className=" w-1/6 text-right mr-2" name="total" placeholder='total' value={input.total} />
                                        <Button className=" h-fit mr-2" size="xs" color="red" key={index} onClick={() => removeEntry(index)}>Remove</Button>
                                    </div>
                                ))}

                                <h3 className=" text-lg font-semibold">Total amount: <span className=" text-red-600">{billTotal ? billTotal : 0}đ</span></h3>
                                <Button className=" bg-primary" onClick={importProduct} type='button'>Import</Button>

                            </div>
                        </form>
                    </div>
                </div>
                <CategoryFormModal openModal={openModal} onCloseModal={handleCloseForm} />
            </div>
        </main>
    )
}