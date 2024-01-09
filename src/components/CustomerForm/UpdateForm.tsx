"use client";

import { Button, Checkbox, Label, TextInput, Datepicker, Select } from 'flowbite-react';
import AddressUpdate from '../AddressSelect/AddressUpdate';
import { useEffect, useState } from 'react';
import API from '@/constants/apiEndpoint';
import axios from 'axios';
import { Address } from '@/types/entity/Customer';

export default function UpdateCustomerForm({ onCloseModal, customerId }: any) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const [phone, setPhone] = useState('');
    const [birth, setBirth] = useState('');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');

    const tokenStr = localStorage.getItem("token") || "";

    const fectchData = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${API.authentication.customers}/${customerId}`,
            headers: {
                'Authorization': 'Bearer ' + tokenStr
            }
        };

        const res = await axios.request(config);
        console.log(res);
        console.log(res.data.address)

        setName(res.data.name);
        setBirth(res.data.birthDate);
        setGender(res.data.gender);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setProvince(res.data.address.province);
        setDistrict(res.data.address.district);
        setWard(res.data.address.ward);
        const newAddress  : Address = res.data.address as Address;
        let address = newAddress;
        console.log(address.province)
    }
    const onUpdateCustomer = async () => {
        let data = JSON.stringify({
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
        console.log(data);

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${API.authentication.customers}/${customerId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + tokenStr
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
        onCloseModal();
        location.reload();
        return;
    }

    useEffect(() => {
        fectchData();
    }, [])

    return (
        <div className={'w-full h-[450px] bg-background-normal rounded-2xl p-8'}>
            <div className=' items-center px-3'>
                <Label className=' mb-2 block' htmlFor='name1' value='Customer Name' />
                <TextInput id='name' value={name} type='text' placeholder="customer name" onChange={(e: any) => setName(e.target.value)} required />
            </div>
            <div className=' flex'>
                <div className=' w-1/2 justify-between items-center mb-2 px-3'>
                    <div className="mb-2 block">
                        <Label htmlFor="gender1" value="Gender" />
                    </div>
                    <Select id='gender1' value={gender} onChange={(e: any) => setGender(e.target.value)} required>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Null</option>
                    </Select>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Customer email" />
                    </div>
                    <TextInput id="email" type='email' value={email} placeholder='customer@gmail.com' onChange={(e: any) => setEmail(e.target.value)} required />
                </div>
                <div className=' w-1/2 justify-between items-center mb-2'>
                    <div className="mb-2 block">
                        <Label htmlFor="birth1" value="Customer Birth" />
                    </div>
                    <Datepicker value={birth} onClick={(e: any) => setBirth(e.target.value)} />
                    <div className="mb-2 block">
                        <Label htmlFor="phone1" value="Customer Phone" />
                    </div>
                    <TextInput id="phone" type='phone' value={phone} placeholder='+84 385882079' onChange={(e: any) => setPhone(e.target.value)} required />
                </div>
            </div>
            <div className="mb-2 block px-3">
                <Label htmlFor="address1" value="Address" />
            </div>
            <AddressUpdate 
                setProvince={setProvince} 
                setDistrict={setDistrict} 
                setWard={setWard}
            />
            <div className=' flex justify-end w-full mt-7'>
                <Button className=' mx-3' onClick={onUpdateCustomer}>Update</Button>
                <Button className=' mx-3' color='red' onClick={onCloseModal}>Cancel</Button>
            </div>
        </div>
    )
}