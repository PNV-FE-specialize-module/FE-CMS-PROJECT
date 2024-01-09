import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Space, Tag, Button, Col, Typography, Avatar, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { checkProjectStatus, getStatusColor } from '../../components/enum/enum';
import { useGetProject } from '../../hooks/useProject';
import { Link } from 'react-router-dom';
import AddProject from './components/AddProject';
import { useTranslation } from 'react-i18next';

const ListProject = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: projects, isLoading, isError, error } = useGetProject();
  const { t, i18n } = useTranslation();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: t('main.Name'),
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span style={{ fontWeight: 'bold',fontSize:'16px' }}>{text}</span>,
    },    
    {
      title: 'Manager Project',
      dataIndex: 'managerProject',
      key: 'managerProject',
      render: (managerProject) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={managerProject.avatar}
            alt={managerProject.name}
            style={{ width: '36px', height: '36px', marginRight: '8px', borderRadius: '50%' }}
          />
          {managerProject.name}
        </div>
      ),
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
      title: 'Members',
      key: 'members',
      dataIndex: 'employee_project',
      render: (employeeProject) => (
        <Col span={4}>
          <div className="project-employee-avatar">
            <Avatar.Group maxCount={2} size={40}>
              {employeeProject.map((member, index) => (
                <Tooltip title={member.employee?.name} key={member.id}>
                  <Avatar
                    src={member.employee?.avatar}
                    style={{
                      backgroundColor: "#87D068",
                    }}
                  />
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
        </Col>
      ),
    },
    {
      title: ('Proccess'),
      dataIndex: 'proccess',
      key: 'proccess',
      render: (text) => <span style={{ fontWeight: 'bold',fontSize:'16px' }}>{text}</span>,
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
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/project/${record.id}`}>
            <EyeOutlined />
          </Link>
          <DeleteOutlined />
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={isLoading} tip="Loading...">
      {isError && <Alert message={error.message} type="error" />}
      {projects && projects.data ? (
        Array.isArray(projects.data) && projects.data.length > 0 ? (
          <>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ float: 'right', margin: '10px' }}
              onClick={showModal}
            >
              Add Project
            </Button>
            <AddProject isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} data={projects.data} />
            <Table columns={columns}
              dataSource={projects.data}
              rowKey={(record) => record.id} />
          </>
        ) : (
          <p>No data to display</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </Spin>
  );
};

export default ListProject;
