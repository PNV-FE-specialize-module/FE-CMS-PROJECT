import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Space, Tag, Button, Input, Layout, Typography } from 'antd';
import {
  EyeOutlined,
  DeleteOutlined, PlusOutlined
} from "@ant-design/icons";
import { useParams } from 'react-router-dom';
import { checkProjectStatus, getStatusColor } from '../../components/enum/enum';
import { useGetProject } from '../../hooks/useProject';
import { Link } from 'react-router-dom';
import AddProject from './components/AddProject';
import { useTranslation } from 'react-i18next';
import Search from 'antd/es/input/Search';
import { values } from 'lodash';
import "../../style/Project.css"
import { Content } from 'antd/es/layout/layout';


const ListProject = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { t, i18n } = useTranslation();


  const [searchName, setSearchName] = useState('');
  const [status, setStatus] = useState("");

  const paginateOptions = {
    search: searchName.name,
    status: status,
  };

  const { data: projects, isLoading, isError, error } = useGetProject(paginateOptions);


  const showModal = () => {
    setIsModalVisible(true);
  };


  const columns = [
    {
      title: t('main.Name'),
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: t('main.Description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('main.Manager Project'),
      dataIndex: 'managerProject',
      key: 'managerProject',
      render: (managerProject) => managerProject.name,
    },
    {
      title: t('main.Technology'),
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
      title: t('main.Status'),
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        const color = getStatusColor(record.status);
        return <Tag color={color}>{checkProjectStatus(record.status)}</Tag>;
      },
    },
    {
      title: t('main.Start Date'),
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => new Date(text).toLocaleDateString('en-US'),
    },
    {
      title: t('main.End Date'),
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => new Date(text).toLocaleDateString('en-US'),

    },
    {
      title: t('main.Action'),
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

  const handleSearch = (value) => {
    setSearchName((prevFilters) => ({
      ...prevFilters,
      name: value,
    }));
  };




  return (
    <Content>
      <Space direction="horizontal" className="status-button">
        <div className="status">
          <Button
            type="secondary"
            onClick={() => setStatus("")}
            className={status === '' ? 'button-selected' : ''}>
            All Status
          </Button>
          <Button
            type="secondary"
            onClick={() => setStatus("pending")}
            className={status === 'pending' ? 'button-selected' : ''}
          >
            Pending
          </Button>
          <Button
            type="secondary"
            onClick={() => setStatus("on_progress")}
            className={status === 'on_progress' ? 'button-selected' : ''}
          >
            On Progress
          </Button>
          <Button
            type="secondary"
            className={status === 'done' ? 'button-selected' : ''}
            onClick={() => setStatus("done")}>
            Done
          </Button>
        </div>
        <Search
          placeholder="Search Project"
          allowClear
          style={{
            maxWidth: 300,
            height: 30,
          }}
          onSearch={handleSearch}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ float: 'right', margin: '10px' }}
          onClick={showModal}
        >
          {t('main.Add Project')}
        </Button>
      </Space>

      <Spin spinning={isLoading} tip={t('main.Loading...')}>

        {isError && <Alert message={error.message} type="error" />}

        {projects && projects.data ? (
          Array.isArray(projects.data) && projects.data.length > 0 ? (
            <>
              <AddProject isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} data={projects.data} />
              <Table columns={columns}
                dataSource={projects.data}
                rowKey={(record) => record.id} />
            </>
          ) : (
            <div className="no-data-message">
              <Typography.Title level={5}>
                {t('main.No data to display')}
              </Typography.Title>
            </div>
          )
        ) : (
          <div className="loading-message">
            <Typography.Title level={5}>
              {t('main.Loading...')}
            </Typography.Title>
          </div>
        )}
      </Spin>
    </Content>
  );
};

export default ListProject;
