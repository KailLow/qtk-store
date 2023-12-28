'use client';

import { Toast } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';



export function Error({err, type} : any){
    let icon;

  switch (type) {
    case 'success':
      icon = <HiCheck className="h-5 w-5" />;
      break;
    case 'error':
      icon = <HiX className="h-5 w-5" />;
      break;
    case 'warning':
      icon = <HiExclamation className="h-5 w-5" />;
      break;
    default:
      icon = null;
      break;
  }
    return(
        <>
            <div className="flex flex-col gap-4">
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                        {icon}
                    </div>
                    <div className="ml-3 text-sm font-normal">I{err}</div>
                    <Toast.Toggle />
                </Toast>
            </div>
        </>
    )
}