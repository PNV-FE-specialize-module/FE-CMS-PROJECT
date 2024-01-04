import React, { useState, useEffect } from 'react';
import { Table, Spin, Alert, Space, Tag } from 'antd';
import axios from 'axios';
import {
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { checkProjectStatus, getStatusColor } from '../../../components/enum/enum';

const ListProject = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/project');
        console.log('API Response:', response.data);
        setData(response.data.data);
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Manager Project',
      dataIndex: 'managerProject',
      key: 'managerProject',
      render: (managerProject) => managerProject.name,
    },
    {
      title: 'Technology',
      key: 'technology',
      dataIndex: 'technology',
      render: (text, record) => (
        <>
          {record.technology.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        const color = getStatusColor(record.status);
        return <Tag color={color}>{checkProjectStatus(record.status)}</Tag>;
      },
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => new Date(text).toLocaleDateString('en-US'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => new Date(text).toLocaleDateString('en-US'),

    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined />
          <DeleteOutlined />
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading} tip="Loading...">
      {error && <Alert message={error} type="error" />}
      {Array.isArray(data) && data.length > 0 ? (
        <Table columns={columns} dataSource={data} rowKey={(record) => record.id} />
      ) : (
        <p>No data to display</p>
      )}
    </Spin>
  );
};

export default ListProject;
