import React, { ReactNode, useState } from "react";
import { Modal, Button } from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";

export function useNotifyModal() {
    const [isOpenModal, setOpenModal] = useState(false);

    return {
        isOpenModal,
        setOpenModal,
    };
}

export default function NotifyModal({
    openModal = false,
    closeModal = () => {},
    icon = (
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
    ),
    message = (
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
        </h3>
    ),
    agree = (
        <Button
            color="failure"
            onClick={() => {
                closeModal();
                onResponse(true);
            }}
        >
            Yes, I&apos;m sure
        </Button>
    ),
    cancel = (
        <Button
            color="gray"
            onClick={() => {
                closeModal();
                onResponse(false);
            }}
        >
            No, cancel
        </Button>
    ),
    onResponse = () => {},
}: PropTypes) {
    return (
        <>
            <Modal
                show={openModal}
                size="md"
                onClose={() => closeModal()}
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        {icon}
                        {message}
                        <div className="flex justify-center gap-4">
                            {agree}
                            {cancel}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

type PropTypes = {
    openModal?: boolean;
    closeModal?: () => any;
    icon?: ReactNode;
    message?: ReactNode;
    agree?: ReactNode;
    cancel?: ReactNode;
    onResponse?: (v: boolean) => any;
};