import React, { useState, useEffect, useRef } from 'react';
import { Space, Table, Avatar, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import "./style.css";

const ShowEmployees = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
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
        console.log('Employee data:', response.data);
        setEmployees(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  }, []);

  const alphanumericSorter = (a, b) => {
    const codeA = a.code.toString();
    const codeB = b.code.toString();
    return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' });
  };

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
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: alphanumericSorter,
      sortOrder: sortedInfo.columnKey === 'code' ? sortedInfo.order : null,
      ellipsis: true,
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
      filters: [
        {
          text: 'Front-end',
          value: 'fe',
        },
        {
          text: 'Full-stack',
          value: 'fullstack',
        },
        {
          text: 'Back-end',
          value: 'be',
        },
        {
          text: 'BA',
          value: 'ba',
        },
        {
          text: 'QA',
          value: 'qa',
        },
        {
          text: 'Devops',
          value: 'devops',
        },
        {
          text: 'UX-UI',
          value: 'ux-ui',
        },
      ],
      filteredValue: filteredInfo.position || null,
      onFilter: (value, record) => record.position.includes(value),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'Active',
          value: 'active',
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
          <a className='text-edit'>Edit</a>
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
    <> 
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
