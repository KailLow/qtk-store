"use client";

import { Button, Checkbox, Label, TextInput, Datepicker, Select } from 'flowbite-react';
import AddressSelect from '../AddressSelect/AddressSelect';
import { useState } from 'react';
import API from '@/constants/apiEndpoint';

export default function CategoryForm({onCloseModal} : any){

    const [name, setName] = useState('');

    const tokenStr = localStorage.getItem("token") || "";
  const onCreateCategory = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    console.log("token" + tokenStr);

    var raw = JSON.stringify({
      "name": name,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    const res = await fetch(`${API.authentication.category}`, requestOptions);

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
      className={'w-full h-fit bg-background-normal rounded-2xl p-4'}>
      <div className=' items-center px-3'>
        <Label className=' mb-2 block' htmlFor='name1' value='Category Name' />
        <TextInput id='name' type='text' placeholder='Category Name' onChange={(e: any) => setName(e.target.value)} required />
      </div>
      <div className=' flex justify-end w-full mt-7'>
        <Button className=' mx-3' onClick={onCreateCategory}>Create</Button>
        <Button className=' mx-3' color='red' onClick={onCloseModal}>Cancel</Button>
      </div>
    </div>
  )
}