import React from "react";
import ModalWrapper from "../common/ModalWrapper";

const UserDetailsModal = ({ user, isOpen, onClose }) => {
    if (!isOpen || !user) return null;

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} title="User Details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </ModalWrapper>
    );
};

export default UserDetailsModal;
