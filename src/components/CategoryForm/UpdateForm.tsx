"use client";

import { Button, Checkbox, Label, TextInput, Datepicker, Select } from 'flowbite-react';
import AddressSelect from '../AddressSelect/AddressSelect';
import { useEffect, useState } from 'react';
import API from '@/constants/apiEndpoint';
import axios from 'axios';

export default function UpdateCategoryForm({ onCloseModal, categoryID, categoryName }: any) {

    const [name, setName] = useState(categoryName);

    const tokenStr = localStorage.getItem("token") || "";

    const onUpdateCategory = async () => {
        let data = JSON.stringify({
            "name": name,
        });

        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${API.authentication.category}/${categoryID}`,
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

    return (
        <div
          className={'w-full h-fit bg-background-normal rounded-2xl p-4'}>
          <div className=' items-center px-3'>
            <Label className=' mb-2 block' htmlFor='name1' value='Category Name' />
            <TextInput id='name' value={name} type='text' placeholder='Category Name' onChange={(e: any) => setName(e.target.value)} required />
          </div>
          <div className=' flex justify-end w-full mt-7'>
            <Button className=' mx-3' onClick={onUpdateCategory}>Update</Button>
            <Button className=' mx-3' color='red' onClick={onCloseModal}>Cancel</Button>
          </div>
        </div>
      )
}