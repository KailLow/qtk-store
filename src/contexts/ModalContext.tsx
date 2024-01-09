"use client";

import ClaimModal from "@/components/ClaimModal/ClaimModal";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { ReactNode, createContext, useState } from "react";

export function ModalProvider({ children }: ReactNodeChildren) {
    const [modalState, setModalState] = useState<IModalState>(
        defaultModalStateValue,
    );

    return (
        <ModalStateContext.Provider
            value={{
                modalState,
                setModalState: (d) => {
                    setModalState((prev) => ({ ...prev, ...d }));
                },
            }}
        >
            {children}
            <ClaimModal />
        </ModalStateContext.Provider>
    );
}

export const defaultModalStateValue = {
    addProduct: { isOpen: false },
    addStaff: { isOpen: false },
    updateStaff: { isOpen: false },
    updateProduct: { isOpen: false },
    addCategory: { isOpen: false },
    updateCategory: { isOpen: false },
    claim: { isOpen: false },
};

export const ModalStateContext = createContext<IModalStateContext>({
    modalState: defaultModalStateValue,
    setModalState: () => {},
});

export type IModalStateContext = {
    modalState: IModalState;
    setModalState: (d: {
        [modal in keyof Partial<IModalState>]: IModalState[modal];
    }) => any;
};

export type IModalState = {
    addProduct: IModalStateItem;
    addStaff: IModalStateItem;
    updateStaff: IModalStateItem & { staffId?: string };
    updateProduct: IModalStateItem & { productId?: string };
    addCategory: IModalStateItem;
    updateCategory: IModalStateItem & { categoryId?: string };
    claim: IModalStateItem & {
        message?: ReactNode;
        onResponse?: (confirm: boolean) => any;
    };
};

export type IModalStateItem = {
    isOpen: boolean;
    refetch?: () => any;
};