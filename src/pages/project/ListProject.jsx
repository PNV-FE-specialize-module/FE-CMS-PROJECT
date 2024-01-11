import { useParams } from 'react-router-dom';

import { Table, Spin, Alert, Space, Tag, Button, Col, Select, Progress, Typography, Avatar, Tooltip } from 'antd';
import {  PlusOutlined } from "@ant-design/icons";
import React, { useState } from 'react';
import { useGetData, useProjectStatusUpdate } from '../../hooks/useProject';
import { useGetProject } from '../../hooks/useProject';
import AddProject from './components/AddProject';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Search from 'antd/es/input/Search';
import { Content } from 'antd/es/layout/layout';
import "../../style/Project.css"




const ListProject = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [status, setStatus] = useState("");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate()

  const [searchName, setSearchName] = useState('');

  const paginateOptions = {
    search: searchName.name,
    status: status,
  };



  const showModal = () => {
    setIsModalVisible(true);
  };

  const { data: projects, isLoading, isError, error } = useGetProject(paginateOptions);

  const projectStatusUpdateMutation = useProjectStatusUpdate();

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      console.log(newStatus); 
      await projectStatusUpdateMutation.mutateAsync({
        projectId,
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };
  const Circleprogress = ({ project }) => {
    if (project.status === 'pending') {
      return (
        <Progress
          type="circle"
          percent={0}
          width={50}
          format={() => `0%`}
        />
      );
    }

    if (project.status === 'done') {
      return (
        <Progress
          type="circle"
          percent={100}
          width={50}
          format={() => '100%'}
        />
      );
    }
    if (project.status === 'on_progress') {
      const startDate = new Date(project.startDate).getTime();
      const endDate = new Date(project.endDate).getTime();
      const currentTime = new Date().getTime();

      const totalDuration = endDate - startDate;
      const elapsedTime = currentTime - startDate;
      const process = Math.min((elapsedTime / totalDuration) * 100);
      return (
        <Progress
          type="circle"
          percent={process}
          width={50}
          format={() => `${process.toFixed(2)}%`}
        />
      );
    }
    return (
      <Progress
        type="circle"
        percent={project.process || 0}
        width={50}
        format={() => `${project.process}%`}
      />
    );
  };
  const columns = [
    {
      title: t('main.Name'),
      dataIndex: 'name',
      key: 'name',
      render: (text,record) => <Link to={`/project/${record.id}`}><span style={{ fontWeight: 'bold',fontSize:'16px',color: 'black' }}>{text}</span></Link>,
    },    
    {
      title: t('main.Manager Project'),
      dataIndex: 'managerProject',
      key: 'managerProject',
      render: (managerProject,record) => (
        <Link to={`/project/${record.id}`}style={{ color: 'black' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={managerProject.avatar}
            alt={managerProject.name}
            style={{ width: '36px', height: '36px', marginRight: '8px', borderRadius: '50%' }}
          />
          {managerProject.name}
        </div>
        </Link>
      ),
    },
    {
      title: t('main.Technology'),
      key: 'technology',
      dataIndex: 'technology',
      render: (text, record) => (
        <Link to={`/project/${record.id}`}>
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
        </Link>
      ),
    },
    {
      title: t('main.Members'),
      key: 'members',
      dataIndex: 'employee_project',
      render: (employeeProject, record) => (
        <Link to={`/project/${record.id}`}>
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
        </Link>
      ),
    },
    {
      title: t('main.Process'),
      dataIndex: 'process',
      key: 'process',
      render: (text, project,record) => (
        <Link to={`/project/${record.id}`}style={{ color: 'black' }}>
        <Col span={4}>
          <div
            className="circle-progress"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Circleprogress project={project} />
          </div>
        </Col>
        </Link>
      ),
      with: 100,
    },
    {
      title: t('main.Status'),
      dataIndex: 'status',
      key: 'status',
      render: (text, project) => (
        <Col span={3}>
          <Space wrap>
            <Select
              defaultValue={project.status}
              style={{
                width: 100,
              }}
              onChange={(newStatus) => {
                handleStatusChange(project.id, newStatus);
              }}
            >
              <Option value="pending">{t('main.Pending')}</Option>
              <Option value="on_progress">{t('main.On Progress')}</Option>
              <Option value="done">{t('main.Done')}</Option>
              <Option value="closed" disabled>
              {t('main.Closed')}
              </Option>
            </Select>
          </Space>
        </Col>
      ),
    },
    {
      title: t('main.Start Date'),
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text,record) => <Link to={`/project/${record.id}`}style={{ color: 'black' }}> {new Date(text).toLocaleDateString('en-US')}</Link> 
    },
    {
      title: t('main.End Date'),
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text,record) => <Link to={`/project/${record.id}`}style={{ color: 'black' }}> {new Date(text).toLocaleDateString('en-US')}</Link> 
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
           {t("main.All Status")}
          </Button>
          <Button
            type="secondary"
            onClick={() => setStatus("pending")}
            className={status === 'pending' ? 'button-selected' : ''}
          >
            {t("main.Pending")}
          </Button>
          <Button
            type="secondary"
            onClick={() => setStatus("on_progress")}
            className={status === 'on_progress' ? 'button-selected' : ''}
          >
            {t("main.On Progress")}
          </Button>
          <Button
            type="secondary"
            className={status === 'done' ? 'button-selected' : ''}
            onClick={() => setStatus("done")}>
            {t("main.Done")}
          </Button>
        </div>
      
        <Search
          placeholder={t("main.Search Project")}
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

      <div>
      <Spin spinning={isLoading} tip={t('main.Loading...')}>
        {isError && <Alert message={error.message} type="error" />}
        {projects && projects.data ? (
            Array.isArray(projects.data)  ? (
                <>
                  
                    <AddProject isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} data={projects.data}/>
                  <Table columns={columns}
                  dataSource={projects.data}
                  rowKey={(record) => record.id} />
                </>
            ) : (
                <p>{t('main.No data to display')}</p>
            )
        ) : (
          <p>{t('main.Loading...')}</p>
        )}
      </Spin>
    </div>
    </Content>
  );
};
export default ListProject;