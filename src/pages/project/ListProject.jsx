import React, { useEffect, useState } from 'react';
import {Table, Spin, Alert, Space, Tag, Button} from 'antd';
import {
  EyeOutlined,
  DeleteOutlined, PlusOutlined
} from "@ant-design/icons";
import { checkProjectStatus, getStatusColor } from '../../components/enum/enum';
import { useGetProject } from '../../hooks/useProject';
import { Link } from 'react-router-dom';
import AddProject from './components/AddProject';
import { useTranslation} from 'react-i18next';

const ListProject = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: projects, isLoading, isError, error } = useGetProject();
  const { t, i18n } = useTranslation();

  // const [listProject, setListProject]=useState()
  const showModal = () => {
    setIsModalVisible(true);
  };
  
  // useEffect(()=>{
  //   projects && setListProject(projects.data)
  // },[])

  const columns = [
    {
      title: t('main.Name'),
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
                    <AddProject isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} data={projects.data}/>
                  <Table columns={columns} 
                  // dataSource={listProject} 
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
