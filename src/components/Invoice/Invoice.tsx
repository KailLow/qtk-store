"use client";

import { useCallback, useState } from "react";
import ProductInvoice from "../ProductSales/ProductInvoice";


const data = [
    {
      "product_id": 1,
      "product_name": "Product A",
      "category_id": 1,
      "supplier_id": 1,
      "price": 19.99,
      "cost": 10.0,
      "stock_quantity": 100,
      "reorder_level": 20
    },
    {
      "product_id": 2,
      "product_name": "Product B",
      "category_id": 2,
      "supplier_id": 2,
      "price": 29.99,
      "cost": 15.0,
      "stock_quantity": 50,
      "reorder_level": 10
    },
    {
      "product_id": 3,
      "product_name": "Product C",
      "category_id": 1,
      "supplier_id": 2,
      "price": 9.99,
      "cost": 5.0,
      "stock_quantity": 200,
      "reorder_level": 30
    }
  ]


export default function InvoiceForm(){
    
  const [total, setTotal] = useState(0);

  const updateTotal = useCallback(
    (price: number, qty: number) => {
      setTotal((prevTotal) => prevTotal + price * qty);
    },
    []
  );

    return (
        <div className=" border-l-2 border-red-700 pl-1">
            <div className=" justify-center text-center text-2xl font-semibold text-primary">
                <h1>INVOICE</h1>
                <hr />
            </div>
            <div>
                <p>Customer: </p>
                <p>Invoice: </p>
                <p>Date: </p>
                <p>Staff: </p>
            </div>
            <div>
                {
                    data.map((product, index)=>(
                        <ProductInvoice key={index} data={product} updateTotal={updateTotal} />
                    ))
                }
            </div>
            <div className=" flex justify-between">
                <div>
                    <p>Total</p>
                    <p>Total amount</p>
                    <p>Received</p>
                    <p>Excess</p>
                </div>
                <div>
                    <p>{}</p>
                    <p>0</p>
                    <p>0</p>
                    <p>0</p>
                </div>
            </div>
        </div>

    )
}