'use client';

import { CustomFlowbiteTheme, Pagination } from 'flowbite-react';
import { useState } from 'react';

export default function PaginationCustom({
    currentPage,
    onPageChange,
    number
} : any) {

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination theme={customPagination} currentPage={currentPage} totalPages={number} onPageChange={onPageChange} />
    </div>
  );
}

const customPagination : CustomFlowbiteTheme['pagination'] = {
    "base": "",
    "layout": {
      "table": {
        "base": "text-sm text-black dark:text-gray-400",
        "span": "font-semibold text-gray-900 dark:text-white"
      }
    },
    "pages": {
      "base": "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      "showIcon": "inline-flex",
      "previous": {
        "base": "ml-0 rounded-l-lg border border-black bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-primary enabled:hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        "icon": "h-5 w-5"
      },
      "next": {
        "base": "rounded-r-lg border border-black bg-white py-2 px-3 leading-tight text-gray-500 enabled:hover:bg-primary enabled:hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        "icon": "h-5 w-5"
      },
      "selector": {
        "base": "w-12 border border-black bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-primary enabled:hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        "active": "bg-primary text-white hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
        "disabled": "opacity-50 cursor-normal"
      }
    }
  }
