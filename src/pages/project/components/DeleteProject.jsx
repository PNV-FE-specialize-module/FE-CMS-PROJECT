// ConfirmDeleteModal.jsx
import React from 'react';
import { Modal, Button } from 'antd';

const ConfirmDeleteModal = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal
            title="Confirm Delete"
            visible={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            okText="Delete"
            cancelText="Cancel"
        >
            <p>Are you sure you want to delete this project?</p>
        </Modal>
    );
};

export default ConfirmDeleteModal;
