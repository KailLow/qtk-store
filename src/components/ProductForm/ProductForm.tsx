"use client";

import { Button, Checkbox, Label, TextInput, Datepicker, Select, Textarea } from 'flowbite-react';
import AddressSelect from '../AddressSelect/AddressSelect';
import { useEffect, useState } from 'react';
import API from '@/constants/apiEndpoint';
import ImageInput from '../ImageInput/ImageInput';
import axios from 'axios';
import Category, { createCategory } from '@/types/entity/Category';
import Supplier, { createSupplier } from '@/types/entity/Supplier';

export default function ProductForm({ onCloseModal }: any) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState('VND');
  const [category, setCategory] = useState('');
  const [supplier, setSupplier] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const tokenStr = localStorage.getItem("token") || "";

  const fectchCategory = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API.authentication.category}?sortBy=name`,
      headers: {
        'Authorization': 'Bearer ' + tokenStr
      }
    };

    try {
      const res = await axios.request(config);
      console.log(res);

      if (res.status == 401)
        console.log("aaaaaa");
      const products = res.data.results as Category[];
      console.log(products);
      const newArr = products.map((data) =>
                createCategory(
                    data.name,
                    data.id,
                    data.productIds
                )
            );

      setCategories(newArr);
      
      console.log(newArr + category);
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  const fectchSupplier = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API.authentication.supplier}?sortBy=name`,
      headers: {
        'Authorization': 'Bearer ' + tokenStr
      }
    };

    try {
      const res = await axios.request(config);
      console.log(res);

      if (res.status == 401)
        console.log("aaaaaa");
      const supplierList = res.data.results as Supplier[];
      console.log(supplierList);
      const newArr = supplierList.map((data) =>
                createSupplier(
                    data.name,
                    data.phone,
                    data.email,
                    data.address,
                    data.taxIdentificationNumber,
                    data.id
                )
            );

      setSuppliers(newArr);
      
      console.log(newArr + supplier);
      return supplierList;
    } catch (error) {
      console.log(error);
    }
  }

  const onCreateProduct = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    console.log("token" + tokenStr);

    var raw = JSON.stringify({
      "name": name,
      "price": price,
      "description": description,
      "supplierId": supplier,
      "categoryIds": [category]
    });
    console.log(raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    const res = await fetch(`${API.authentication.product}`, requestOptions);

    if ((await res).status == 201)
      console.log("successfull");
    else {
      console.log(res.status)
    }
    onCloseModal();
    return;
  }

  useEffect(() => {
    fectchCategory();
    fectchSupplier();
}, [])

  return (
    <div
      className={'w-full h-fit bg-background-normal rounded-2xl p-4'}>
      <div className=' items-center px-3'>
        <Label className=' mb-2 block' htmlFor='name1' value='Product Name' />
        <TextInput id='name' type='text' placeholder='Product Name' onChange={(e: any) => setName(e.target.value)} required />
      </div>
      <div className=' items-center px-3'>
        <Label className=' mb-2 block' htmlFor='name1' value='Product Description' />
        <Textarea id='description' placeholder='Product Description' onChange={(e: any) => setDescription(e.target.value)} required />
      </div>
      <div className=' flex'>
        <div className=' w-1/2 justify-between items-center mb-2 px-3'>
          <div className="mb-2 block">
            <Label htmlFor="gender1" value="Category" />
          </div>
          <Select id='category' onChange={(e: any) => setCategory(e.target.value)} required>
            <option></option>
            {categories.map((data, index) => (
              <option key={index} value={data.id}>{data.name}</option>
            ))}
          </Select>
          <div className="mb-2 block">
            <Label htmlFor="gender1" value="Supplier" />
          </div>
          <Select id='gender1' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSupplier(e.target.value)} required>
            <option></option>
            {suppliers.map((data, index) => (
              <option key={index} value={data.id}>{data.name}</option>
            ))}
          </Select>
        </div>
        <div className=' w-1/2 justify-between items-center mb-2'>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput id="price" type='price' placeholder='10.00' onChange={(e: any) => setPrice(e.target.value)} required />
          <div className="mb-2 block">
            <Label htmlFor="unit" value="Unit" />
          </div>
          <TextInput id="unit" type='text' value={unit} onChange={(e: any) => setUnit(e.target.value)} required />
        </div>
      </div>
      {/* <ImageInput /> */}
      <div className=' flex justify-end w-full mt-7'>
        <Button className=' mx-3' onClick={onCreateProduct}>Create</Button>
        <Button className=' mx-3' color='red' onClick={onCloseModal}>Cancel</Button>
      </div>
    </div>
  )
}