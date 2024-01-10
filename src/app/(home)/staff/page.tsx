'use client'

import SearchInput from "@/components/SearchInput";
import Sibebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Button, Dropdown, Select } from "flowbite-react";
import { HiFilter, HiOutlineFilter, HiPlus } from 'react-icons/hi';
import React, { useEffect, useState } from "react";
import UserFormModal from "@/components/UserForm/UserFormModal";
import UpdateUserFormModal from "@/components/UserForm/UpdateModal"
import { title } from "process";
import AddressSelect from "@/components/AddressSelect/AddressSelect";
import DataTable from "@/components/Table/Table";
import User, { createUser } from "@/types/entity/User";
import API from "@/constants/apiEndpoint";
import axios from "axios";

export default function Staff() {
  const [user, setUser] = useState<User[]>([]);
  const [userId, setUserId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [number, setNumber] = useState(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sort, setSort] = useState('name');

  const onPageChange = (page: number) => {
    setCurrentPage(page);
    console.log(page);
    fetchData();
  }

  const handleButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseForm = () => {
    setOpenModal(false);
    setOpenUpdateModal(false);
    fetchData();
  };

  const onDelete = async (id: string) => {
    const tokenStr = localStorage.getItem("token") || "";
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${API.authentication.users}/${id}`,
        headers: {
            Authorization: "Bearer " + tokenStr,
        }
    };

    const res = await axios.request(config);
    console.log("delete" + res);

    fetchData();
    return;
}

  const fetchData = async () => {
    const tokenStr = localStorage.getItem("token") || "";
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${API.authentication.users}?limit=10&page=${currentPage}&sortBy=${sort}`,
      headers: {
        Authorization: "Bearer " + tokenStr,
      },
    };

    try {
      const res = await axios.request(config);
      console.log(res);

      if (res.status == 401)
        console.log("aaaaaa");
      const users = res.data.results as User[];
      setNumber(res.data.totalPages);
      const newUser = users.map((data) =>
        createUser(
          data.name,
          data.role,
          data.email,
          data.active,
          data.id
        )
      );

      setUser(newUser);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])
  return (
    <main className="min-h-screen max-w-screen pt-2 px-4">
      <div className=" flex-col w-full">
        <Topbar title="Staff" />
        <div className=" flex w-full my-2 justify-between">
          <SearchInput />
          <Select icon={HiFilter} onChange={(e) => {
            setSort((e.target.value).toLowerCase());
            fetchData();
          }}
            required
          >
            <option>Name</option>
            <option>Email</option>
            <option>Role</option>
            <option>Active</option>
          </Select>
          <Button onClick={handleButtonClick} className=" bg-primary rounded shadow-xl">
            <HiPlus className="mr-2 h-5 w-5" />
            Add Staff
          </Button>
        </div>
        <UpdateUserFormModal openModal={openUpdateModal} onCloseModal={handleCloseForm} userID={userId} />
        <UserFormModal openModal={openModal} onCloseModal={handleCloseForm} />
        <DataTable
          data={user || []}
          isLoading={false}
          onDelete={(user) => {
            const confirmation = window.confirm("Are you sure to delete this user?");

            if (confirmation) {
                onDelete(user.id);
            }
          }}
          onEdit={(user) => {
            setUserId(user.id);
            setOpenUpdateModal(true);
          }}
          pick={{
            name: { title: "Name" },
            email: {
              title: "Email",
              className: " font-normal text-secondary-500",
            },
            role: {
              title: "Role",
            },
            active: {
              title: "Active",
            },
          }}
        />
      </div>
    </main>
  )
}