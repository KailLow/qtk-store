"use client";

import { Button, Checkbox, Label, TextInput, Datepicker, Select } from 'flowbite-react';
import AddressSelect from '../AddressSelect/AddressSelect';

export default function CustomerForm(){
    return (
        <div
        className={'w-full h-[450px] bg-background-normal rounded-2xl p-8'}>
            <div className=' items-center px-3'>
                <Label className=' mb-2 block' htmlFor='name1' value='Customer Name' />
                <TextInput id='name' type='text' placeholder='Name Customer' required />
            </div>
        <div className=' flex'>
            <div className=' w-1/2 justify-between items-center mb-2 px-3'>
                <div className="mb-2 block">
                    <Label htmlFor="gender1" value="Gender" />
                </div>
                <Select id='gender1' required>
                    <option>Male</option>  
                    <option>Female</option>
                    <option>Null</option>
                </Select>
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="Customer email" />
                </div>
                <TextInput id="email" type='email' placeholder='customer@gmail.com' required />
            </div>
            <div className=' w-1/2 justify-between items-center mb-2'>
                <div className="mb-2 block">
                    <Label htmlFor="birth1" value="Customer Birth" />
                </div>
                <Datepicker />
                <div className="mb-2 block">
                    <Label htmlFor="phone1" value="Customer Phone" />
                </div>
                <TextInput id="phone" type='email' placeholder='+84 385882079' required />
            </div>
        </div>
        <AddressSelect/>
    </div>
    )
}