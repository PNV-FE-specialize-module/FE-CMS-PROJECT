import React, { useState, useEffect, useRef } from 'react';
import {Space, Table, Avatar, Input, Button, Modal} from 'antd';
import {DeleteOutlined, EyeOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import "../../style/EmployeeManagement.css";
import {Link} from "react-router-dom";
import {useDeleteEmployee} from "../../hooks/useEmployee.jsx";
import Swal from "sweetalert2";
import {useNavigate} from "react-router";


const ShowEmployees = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const { mutate: deleteEmployee } = useDeleteEmployee();

    const handleDeleteConfirm = (record) => {
        Swal.fire({
            title: 'Confirmation',
            text: 'Are you sure you want to delete this employee?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEmployee(record.key)
                    .then(() => {
                        Swal.fire({
                            title: 'Success',
                            text: 'Employee deleted successfully.',
                            icon: 'success',
                            timer: 2000,
                            showConfirmButton: false
                        });
                        // Fetch the updated employee list
                        axios.get('http://localhost:3000/employee')
                            .then(response => {
                                setEmployees(response.data.data);
                            })
                            .catch(error => {
                                console.error('Error fetching employee data:', error);
                            });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: 'Error',
                            text: 'Failed to delete employee.',
                            icon: 'error',
                            timer: 2000,
                            showConfirmButton: false
                        });
                    });
            }
        });
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const setCodeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'code',
        });
    };
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/employee')
            .then(response => {
                // console.log('Employee data:', response.data);
                setEmployees(response.data.data);
                console.log(8289, response.data.data);
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
            });
    }, []);
    // console.log(employees,'ssss')

    const alphanumericSorter = (a, b) => {
        const codeA = a.code.toString();
        const codeB = b.code.toString();
        return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' });
    };
    const StatusCell = ({ value }) => (
        <span className={`status-wrapper ${value.toLowerCase()}`}>
            {value}
        </span>
    );
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => <Avatar src={avatar} />,
            width: 80, 
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
            width: 150, 
        }, 
        {
            title: 'LangFrame',
            dataIndex: 'langFrame',
            key: 'langFrame',
            render: (record) => {
              return (
                <>
                  {record?.map((langFrame) => (
                    <span key={langFrame.name} style={{ color: '#1d39c4', background: '#f0f5ff', border: '1px solid #adc6ff', marginRight: '8px' }}>
                      {langFrame.name} ({langFrame.exp})
                    </span>
                  ))}
                </>
              );
            },
          },             
        {
            title: 'Technical',
            dataIndex: 'tech',
            key: 'tech',
            render: (record) => {
              return (
                <>
                  {record?.map((tech) => (
                    <span key={tech.name} style={{ color: '#1d39c4', background: '#f0f5ff', border: '1px solid #adc6ff', marginRight: '8px' }}>
                      {tech.name} ({tech.exp})
                    </span>
                  ))}
                </>
              );
            },
          },
            {
            title: 'Project',
            dataIndex: 'employee_project',
            key: 'employee_project',
            render: (text, record) => {
                return (
                  <>
                    {record.employee_project?.map((item) => (
                      <span key={item}>
                        {item.project.name}
                      </span>
                    ))}
                  </>
                );
              },
              
        },                    
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'Active',
                    value: 'cctive',
                },
                {
                    text: 'Inactive',
                    value: 'inactive',
                },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value),
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
                    <Link to={`/employee/${record.key}`} className="text-edit">
                        <EyeOutlined />
                    </Link>
                    <Button type="danger" onClick={() => handleDeleteConfirm(record)}>
                        <DeleteOutlined />
                    </Button>

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
        langFrame: employee.langFrame,
        tech: employee.tech,
        manager: employee.isManager ? 'True' : 'False',
        position: employee.position,
        status: employee.status,
        employee_project: employee.employee_project
    }));
    return (
        <>

            <Link to={`/addEmployee/`} className="text-edit">
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ float: 'right', margin: '10px' }}
                >
                    Add Employee
                </Button>
            </Link>
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
                onChange={handleChange}
            />
        </>
    );
};
export default ShowEmployees;