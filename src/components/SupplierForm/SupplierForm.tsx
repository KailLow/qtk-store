"use client";

import { Button, Checkbox, Label, TextInput, Datepicker, Select } from 'flowbite-react';
import AddressSelect from '../AddressSelect/AddressSelect';
import { useState } from 'react';
import API from '@/constants/apiEndpoint';

export default function SupplierForm({onCloseModal} : any){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [tax, setTax] = useState('');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');

    const tokenStr = localStorage.getItem("token") || "";
  const onCreateCustomer = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    console.log("token" + tokenStr);

    var raw = JSON.stringify({
      "name": name,
      "email": email,
      "phone": phone,
      "taxIdentificationNumber": tax,
      "address": {
        "province": province,
        "district": district,
        "ward": ward
      }
    });
    console.log(raw);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    const res = await fetch(`${API.authentication.supplier}`, requestOptions);

      if((await res).status == 201)
        console.log("successfull");
    else {
        console.log(res.status)
    }
      onCloseModal();
    return;
  }

    return (
        <div
        className={'w-full h-[450px] bg-background-normal rounded-2xl p-8'}>
            <div className=' items-center px-3'>
                <Label className=' mb-2 block' htmlFor='name1' value='Supplier Name' />
                <TextInput id='name' type='text' placeholder='Name Supplier' onChange={(e : any) => setName(e.target.value)} required />
            </div>
            <div className=' items-center px-3'>
                <Label className=' mb-2 block' htmlFor='tax1' value='Supplier Tax Identification Number' />
                <TextInput pattern="[0-9]*" id='tax' type='text' placeholder='Supplier Tax Identification Number' onChange={(e : any) => setTax(e.target.value)} required />
            </div>
        <div className=' flex'>
            <div className=' w-1/2 justify-between items-center mb-2 px-3'>
                
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="Supplier email" />
                </div>
                <TextInput id="email" type='email' placeholder='supplier@supplier.com' onChange={(e:any) => setEmail(e.target.value)} required />
            </div>
            <div className=' w-1/2 justify-between items-center mb-2'>
                <div className="mb-2 block">
                    <Label htmlFor="phone1" value="Supplier Phone" />
                </div>
                <TextInput id="phone" type='phone' placeholder='+84 385882079' onChange={(e:any) => setPhone(e.target.value)} required />
            </div>
        </div>
        <div className="mb-2 block px-3">
            <Label htmlFor="address1" value="Address" />
        </div>
        <AddressSelect setProvince={setProvince} setDistrict={setDistrict} setWard={setWard} />
        <div className=' flex justify-end w-full mt-7'>
            <Button className=' mx-3' onClick={onCreateCustomer}>Save</Button>
            <Button className=' mx-3' color='red' onClick={onCloseModal}>Cancel</Button>
        </div>
    </div>
    )
}