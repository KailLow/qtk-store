import { ReactNode, useContext } from "react";
import NotifyModal from "../NotifyModal/NotifyModal";
import { ModalStateContext } from "@/contexts/ModalContext";

export function useClaimModal() {
    const {
        modalState: { claim },
        setModalState,
    } = useContext(ModalStateContext);

    return {
        isClaimModalOpen: claim.isOpen,
        claimModalMessage: claim.message,
        onClaimResponse: claim.onResponse,
        openClaimModal: (
            message: ReactNode,
            onResponse: (confirm: boolean) => any,
        ) => setModalState({ claim: { isOpen: true, message, onResponse } }),
        closeClaimModal: () => setModalState({ claim: { isOpen: false } }),
    };
}

export default function ClaimModal({}: PropTypes) {
    const {
        claimModalMessage,
        isClaimModalOpen,
        closeClaimModal,
        onClaimResponse,
    } = useClaimModal();

    return (
        <NotifyModal
            openModal={isClaimModalOpen}
            closeModal={closeClaimModal}
            onResponse={onClaimResponse}
            icon={null}
            message={
                <>
                    <h2 className=" mb-6 text-2xl font-semibold text-secondary-950">
                        Confirm
                    </h2>
                    <p className=" mb-6 text-sm font-medium text-secondary-950">
                        {claimModalMessage}
                    </p>
                </>
            }
        />
    );
}

type PropTypes = {};