import API from "@/constants/apiEndpoint";
import Supplier, { createSupplier } from "@/types/entity/Supplier";
import axios from "axios";
import { useState } from "react";

export default async function GetAllSupplier(){
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const tokenStr = localStorage.getItem("token") || "";
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${API.authentication.supplier}&sortBy=name`,
            headers: {
                Authorization: "Bearer " + tokenStr,
            },
        };

        try {
            const res = await axios.request(config);

            if (res.status == 401)
                console.log("aaaaaa");
            const supplier = res.data.results;
            const newSuppliers = supplier.map((data: { name: string; phone: string; email: string; address: { province: string; district: string; ward: string; }; taxIdentificationNumber: string; id: string; }) =>
                createSupplier(
                    data.name,
                    data.phone,
                    data.email,
                    data.address.province,
                    data.address.district,
                    data.address.ward,
                    data.taxIdentificationNumber,
                    data.id
                )
            );

            setSuppliers(newSuppliers);
            return suppliers;
        } catch (error) {
            console.log(error)
        }
}