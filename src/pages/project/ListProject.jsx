import React, { useState, useEffect } from 'react';
import { Table, Spin, Alert, Space, Tag, Button } from 'antd';
import {
  EyeOutlined,
  DeleteOutlined, PlusOutlined
} from "@ant-design/icons";
import { checkProjectStatus, getStatusColor } from '../../components/enum/enum';
import { useGetProject } from '../../hooks/useProject';
import { Link } from 'react-router-dom';
import { useDeleteProject } from "../../hooks/useProject.jsx";
import { useQueryClient } from 'react-query';


const ListProject = () => {

  // const { data: projects, isLoading, isError, error, setProjects } = useGetProject();
  const { data: projects, isLoading, isError, error, refetch } = useGetProject();

  const { mutate: deleteProject } = useDeleteProject();


  const handleDeleteConfirm = (record) => {
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this project?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject(record.key)
          .then(() => {
            Swal.fire({
              title: 'Success',
              text: 'Employee deleted successfully.',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            });
            // Fetch the updated employee list
            axios.get('http://localhost:3000/project')
              .then(response => {
                setProjects(response.data.data);
              })
              .catch(error => {
                console.error('Error fetching project data:', error);
              });
          })
          .catch(() => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete project.',
              icon: 'error',
              timer: 2000,
              showConfirmButton: false
            });
          });
      }
    });
  };


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
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Link to={`/project/${record.id}`}>
    //         <EyeOutlined />
    //       </Link>
    //       <DeleteOutlined />
    //     </Space>
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/project/${record.id}`} className="text-edit">
            <EyeOutlined />
          </Link>
          <Button type="danger" onClick={() => handleDeleteConfirm(record)}>
            <DeleteOutlined />
          </Button>
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
            <Link to={`/addProject/`} className="text-edit">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ float: 'right', margin: '10px' }}

              >
                Add Project
              </Button>
            </Link>
            <Table columns={columns} dataSource={projects.data} rowKey={(record) => record.id} />
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
