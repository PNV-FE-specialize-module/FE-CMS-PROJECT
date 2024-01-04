import React, { useState, useEffect } from 'react';
import { Space, Table, Avatar,Pagination } from 'antd';
import axios from 'axios';
import "../../style/EmployeeManagement.css"
import {Link} from "react-router-dom";

const ShowEmployees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/employee')
            .then(response => {
                setEmployees(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => <Avatar src={avatar} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Position',
            dataIndex: 'position',
            key: 'position',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <span className={`status-wrapper status-${status.toLowerCase()}`}>
          {status}
        </span>
            ),
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/employee/${record.key}`} className='text-edit'>
                        Edit
                    </Link>
                    <a className='text-del'>Delete</a>
                </Space>
            ),
        },

    ];
    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const employeesWithStatus = employees.map(employee => ({
        key: employee.id,
        avatar: employee.avatar,
        name: employee.name,
        code: employee.code,
        email: employee.email,
        phone: employee.phone,
        position: employee.position,
        status: employee.status,
    }));
    return (
        <Table
            className="custom-table"
            columns={columns}
            dataSource={employeesWithStatus}
            pagination={{
                showSizeChanger: true,
                pageSizeOptions: ['1', '2', '5', '10'],
                defaultPageSize: 10,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
        />
    );
};

export default ShowEmployees;

