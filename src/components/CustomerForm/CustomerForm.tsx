"use client";

import { Button, Checkbox, Label, TextInput, Datepicker, Select } from 'flowbite-react';
import AddressSelect from '../AddressSelect/AddressSelect';
import { useState } from 'react';
import API from '@/constants/apiEndpoint';

export default function CustomerForm({onCloseModal} : any){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [phone, setPhone] = useState('');
    const [birth, setBirth] = useState('');
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
      "gender": gender,
      "phone": phone,
      "birthDate": birth,
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

    const res = await fetch(`${API.authentication.customers}`, requestOptions);

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
                <Label className=' mb-2 block' htmlFor='name1' value='Customer Name' />
                <TextInput id='name' type='text' placeholder='Name Customer' onChange={(e : any) => setName(e.target.value)} required />
            </div>
        <div className=' flex'>
            <div className=' w-1/2 justify-between items-center mb-2 px-3'>
                <div className="mb-2 block">
                    <Label htmlFor="gender1" value="Gender" />
                </div>
                <Select id='gender1' onChange={(e:any) => setGender(e.target.value)} required>
                    <option>Male</option>  
                    <option>Female</option>
                    <option>Null</option>
                </Select>
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="Customer email" />
                </div>
                <TextInput id="email" type='email' placeholder='customer@gmail.com' onChange={(e:any) => setEmail(e.target.value)} required />
            </div>
            <div className=' w-1/2 justify-between items-center mb-2'>
                <div className="mb-2 block">
                    <Label htmlFor="birth1" value="Customer Birth" />
                </div>
                <Datepicker onClick={(e:any) => setBirth(e.target.value)} />
                <div className="mb-2 block">
                    <Label htmlFor="phone1" value="Customer Phone" />
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