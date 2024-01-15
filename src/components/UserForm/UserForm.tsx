"use client";

import { Button, Checkbox, Label, TextInput, Datepicker, Select } from 'flowbite-react';
import AddressSelect from '../AddressSelect/AddressSelect';
import { useState } from 'react';
import API from '@/constants/apiEndpoint';
import axios from 'axios';

export default function UserForm({ onCloseModal }: any) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [active, setActive] = useState(true);

  const tokenStr = localStorage.getItem("token") || "";
  const onCreateCategory = async () => {
    let data = JSON.stringify({
      "name": name,
      "email": email,
      "password": password,
      "role": role.toLowerCase(),
    });
    console.log(data);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${API.authentication.users}`,
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
  }

  return (
    <div
      className={'w-full h-fit bg-background-normal rounded-2xl p-4'}>
      <div className=' items-center px-3'>
        <Label className=' mb-2 block' htmlFor='name1' value='User Name' />
        <TextInput id='name' type='text' placeholder='User Name' onChange={(e: any) => setName(e.target.value)} required />
      </div>
      <div className=' items-center px-3'>
        <Label className=' mb-2 block' htmlFor='name1' value='User Email' />
        <TextInput id='email' type='text' placeholder='User Email' onChange={(e: any) => setEmail(e.target.value)} required />
      </div>
      <div className=' items-center px-3'>
        <Label className=' mb-2 block' htmlFor='name1' value='User Password' />
        <TextInput id='password' type='password' placeholder='User Password' onChange={(e: any) => setPassword(e.target.value)} required />
      </div>
      {/* <div className=' items-center px-3'>
        <Label className=' mb-2 block' htmlFor='name1' value='Role' />
        <Select id='role' onChange={(e: any) => setRole(e.target.value)} required>
          <option>User</option>
          <option>Admin</option>
          <option>Staff</option>
        </Select>
      </div> */}
      <div className=' flex justify-end w-full mt-7'>
        <Button className=' mx-3' onClick={onCreateCategory}>Create</Button>
        <Button className=' mx-3' color='red' onClick={onCloseModal}>Cancel</Button>
      </div>
    </div>
  )
}