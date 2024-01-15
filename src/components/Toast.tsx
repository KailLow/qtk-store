
'use client';

import { Toast } from 'flowbite-react';
import { HiCheck, HiX } from 'react-icons/hi';

export default function CustomToast({status, title}:any) {
  return (
    <div className="flex flex-col gap-4 rounded-full border-2 absolute m-3 shadow-md">
      <Toast className=' bg-background-50'>
        {status ? (
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 hover:bg-green-800 hover:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>          
        ) : (
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 hover:bg-red-800 hover:text-red-200">
            <HiX className="h-5 w-5" />
          </div>)
          }
        <div className="ml-3 text-sm font-normal text-white mx-2">{title}</div>
        <Toast.Toggle />
      </Toast>
    </div>
  );
}
