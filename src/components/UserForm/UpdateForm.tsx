"use client";

import { Button, Checkbox, Label, TextInput, Datepicker, Select } from 'flowbite-react';
import AddressSelect from '../AddressSelect/AddressSelect';
import { useEffect, useState } from 'react';
import API from '@/constants/apiEndpoint';
import axios from 'axios';
import User, { createUser } from '@/types/entity/User';

export default function UpdateUserForm({ onCloseModal, userID }: any) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<User>();

  const tokenStr = localStorage.getItem("token") || "";

  const onUpdateCategory = async () => {
    let data = JSON.stringify({
      "name": name,
      "email": email
    });

    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${API.authentication.users}/${userID}`,
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
    return;
  }
  const fetchData = async () => {
    const tokenStr = localStorage.getItem("token") || "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API.authentication.users}${userID}`,
      headers: {
        Authorization: "Bearer " + tokenStr,
      },
    };

    try {
      const res = await axios.request(config);
      console.log(res);

      if (res.status == 401)
        console.log("aaaaaa");
      const users = res.data as User;
        // const newUser = users.map((data) =>
        //   createUser(
        //     data.name,
        //     data.role,
        //     data.email,
        //     data.active,
        //     data.id
        //   )
        // );

      setUser(users);
      console.log(users)
      setName(users.name);
      setEmail(users.email);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div
      className={'w-full h-fit bg-background-normal rounded-2xl p-4'}>
      <div className=' items-center px-3'>
        <Label className=' mb-2 block' htmlFor='name1' value='User Name' />
        <TextInput id='name' value={name} type='text' placeholder='User Name' onChange={(e: any) => setName(e.target.value)} required />
      </div>
      <div className=' items-center px-3'>
        <Label className=' mb-2 block' htmlFor='name1' value='User Email' />
        <TextInput id='email' value={email} type='text' placeholder='User Email' onChange={(e: any) => setEmail(e.target.value)} required />
      </div>
      {/* <div className=' items-center px-3'>
        <Label className=' mb-2 block' htmlFor='name1' value='User Email' />
        <TextInput id='password' type='text' placeholder='User Password' onChange={(e: any) => setPassword(e.target.value)} required />
      </div> */}
      <div className=' flex justify-end w-full mt-7'>
        <Button className=' mx-3' onClick={onUpdateCategory}>Update</Button>
        <Button className=' mx-3' color='red' onClick={onCloseModal}>Cancel</Button>
      </div>
    </div>
  )
}