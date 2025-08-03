import React, { useState } from 'react';
import Modal from '../common/Modal'; 

const VerifyEmailModal = ({ isOpen, closeModal, email }) => {
    const [enteredEmail, setEnteredEmail] = useState(email || '');

    const handleVerify = () => {
        
        console.log('Verifying email:', enteredEmail);
        closeModal();
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal} title="Verify Your Email">
            <div className="p-4 space-y-4">
                <label className="block text-sm font-medium text-gray-700">Enter your email</label>
                <input
                    type="email"
                    value={enteredEmail}
                    onChange={(e) => setEnteredEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <button
                    onClick={handleVerify}
                    className="btn btn-primary w-full mt-2"
                >
                    Send Verification Link
                </button>
            </div>
        </Modal>
    );
};

export default VerifyEmailModal;
