"use client";

import { Button, Checkbox, Label, TextInput, Datepicker, Select } from 'flowbite-react';
import AddressSelect from '../AddressSelect/AddressSelect';
import { useEffect, useState } from 'react';
import API from '@/constants/apiEndpoint';
import axios from 'axios';
import Product, { Quantity, createProduct } from '@/types/entity/Product';

export default function ImportProduct({onCloseModal} : any){

    const [name, setName] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [birth, setBirth] = useState('');

    const tokenStr = localStorage.getItem("token") || "";
  const onCreateCategory = async () => {
    let data = JSON.stringify({
      "products": [
        {
          "id": name,
          "quantity": 2,
          "importPrice": 100000,
          "expiryDate": "2024-01-10"
        }
      ]
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API.authentication.inventory}/import-products`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer '+tokenStr
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const fectchProduct = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${API.authentication.product}?sortBy=name`,
      headers: {
        'Authorization': 'Bearer ' + tokenStr
      }
    };

    try {
      const res = await axios.request(config);
      console.log(res);

      if (res.status == 401)
        console.log("aaaaaa");
      const products = res.data.results as Product[];
      console.log(products);
      const newProduct = products.map((data) =>
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

      setProducts(newProduct);
      
      return products;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fectchProduct();
}, [])

  return (
    <div
      className={'w-full h-fit bg-background-normal rounded-2xl p-4'}>
      <div className="mb-2 block">
            <Label htmlFor="gender1" value="Category" />
          </div>
          <Select id='category' onChange={(e: any) => setName(e.target.value)} required>
            <option></option>
            {products.map((data, index) => (
              <option key={index} value={data.id}>{data.name}</option>
            ))}
          </Select>
      <div className=' items-center px-3'>
        <Label className=' mb-2 block' htmlFor='name1' value='Product quantity' />
        <TextInput id='name' type='number' placeholder='Category Name' onChange={(e: any) => setQuantity(e.target.value)} required />
      </div>
      <div className=' items-center px-3'>
        <Label className=' mb-2 block' htmlFor='name1' value='Product import price' />
        <TextInput id='name' type='number' placeholder='Category Name' onChange={(e: any) => setPrice(e.target.value)} required />
      </div>
      <div className=' flex justify-end w-full mt-7'>
        <Button className=' mx-3' onClick={onCreateCategory}>Create</Button>
        <Button className=' mx-3' color='red' onClick={onCloseModal}>Cancel</Button>
      </div>
    </div>
  )
}