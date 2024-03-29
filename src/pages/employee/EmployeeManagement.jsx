import React, { useState, useRef } from 'react';
import {Space, Table, Avatar, Input, Button, Flex} from 'antd';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import "../../style/EmployeeManagement.css";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import { useTranslation} from 'react-i18next';
import { useGetEmployee } from '../../hooks/useEmployee';
import Pagination from '../../common/pagination/pagination';
import Search from 'antd/es/input/Search';




const ShowEmployees = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const navigate= useNavigate()
    const { t, i18n } = useTranslation();

    const [searchNameText, setSearchNameText] = useState("");

    // const { data: listEmployee } = useGetAllEmployee();

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const [table, setTable] = useState({
        page: 1,
        take: 5,
      });

      const paginateOptions = {
        searchByName: searchNameText,
        page: table.page,
        take: table.take,
      };
    
    const { data: listEmployee, isLoading, isError } = useGetEmployee(paginateOptions);
    
    const handleSearchInput = (value) => {
        setSearchName((prevFilters) => ({
          ...prevFilters,
          name: value,
        }));
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
                        {t("main.Search")}
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        {t("main.Reset")}
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
                        {t("main.Filter")}
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        {t("main.Close")}
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
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };
    const setCodeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'code',
        });
    };


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
    const [showAllLangFrames, setShowAllLangFrames] = useState(false);
    const [showAllTechs, setShowAllTechs] = useState(false);
  
    const handleLangFrameHover = () => {
      setShowAllLangFrames(true);
    };
  
    const handleTechHover = () => {
      setShowAllTechs(true);
    };
    const renderLangFrames = (langFrames) => {
        const visibleLangFrames = showAllLangFrames ? langFrames : langFrames?.slice(0, 2);
      
        return (
          <>
          <Flex wrap='wrap' gap={3} >
            {visibleLangFrames?.map((langFrame, index) => (
              <React.Fragment key={index}>
                <Flex  vertical wrap='wrap' align='center'>
                <span style={{ color: '#1d39c4', background: '#f0f5ff', border: '1px solid #adc6ff', padding: '5px', borderRadius:'3px'}}>
                  {langFrame.name} 
                </span>
                <p style={{color:'gray'}}>{langFrame.exp} year</p>
                </Flex>
                {(index + 1) % 2 === 0 && <br style={{ lineHeight: '30px' }} />}
              </React.Fragment>
            ))}
            </Flex>
            {!showAllLangFrames && langFrames?.length > 2 && (
               <span
               style={{
               display: 'flex', 
               justifyContent: 'center', 
               alignItems: 'center',
               width: '20px',
               height: '20px',
               color: '#1d39c4',
               cursor: 'pointer',
               border: '1px solid #1d39c4',
               borderRadius: '50%',
               }}
               onMouseOver={handleLangFrameHover}
           >
               +
           </span>
            )}
          </>
        );
      };
      
      const renderTechs = (techs) => {
        const visibleTechs = showAllTechs ? techs : techs?.slice(0, 2);
        return (
            <>
            <Flex wrap='wrap' gap={3} >
              {visibleTechs?.map((tech, index) => (
                <React.Fragment key={index}>
                  <Flex  vertical wrap='wrap' align='center'>
                  <span style={{ color: '#1d39c4', background: '#f0f5ff', border: '1px solid #adc6ff', padding: '5px', borderRadius:'3px'}}>
                    {tech.name} 
                  </span>
                  <p style={{color:'gray'}}>{tech.exp} year</p>
                  </Flex>
                  {(index + 1) % 2 === 0 && <br style={{ lineHeight: '30px' }} />}
                </React.Fragment>
              ))}
              </Flex>
              {!showAllTechs && techs?.length > 2 && (
                <span
                    style={{
                    display: 'inline-flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    width: '18px',
                    height: '18px',
                    color: '#1d39c4',
                    cursor: 'pointer',
                    border: '1px solid #1d39c4',
                    borderRadius: '50%',
                    }}
                    onMouseOver={handleTechHover}
                >
                    +
                </span>
                )}
            </>
          );
        };
      
    const columns = [
        {
            title: t('main.Avatar'),
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => <Avatar src={avatar} className="custom-avatar" />,
            className: 'custom-avatar-column', 
          },
          {
            title: t('main.Name'),
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
            ellipsis: true,
            className: 'custom-name-column',
            render: (text) => <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{text}</span>,
          },
        {
            title: t('main.LangFrame'),
            dataIndex: 'langFrame',
            key: 'langFrame',
            render: renderLangFrames,
            className: 'custom-lF-column'
          },
          {
            title: t('main.Technology'),
            dataIndex: 'tech',
            key: 'tech',
            render: renderTechs,
            className: 'custom-tech-column'
          },      
          {
            title: t('main.Project'),
            dataIndex: 'employee_project',
            key: 'employee_project',
            className: 'custom-project-column',
            render: (text, record) => {
              const projects = record.employee_project?.map((item) => item.project?.name) || [];
          
              return (
                <>
                  {projects.map((project, index) => (
                    <React.Fragment key={project}>
                      <span>{project}</span>
                      {index < projects.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </>
              );
            },
          },
          
        {
            title: t('main.Position'),
            dataIndex: 'position',
            key: 'position',
            filters: [
                {
                    text: 'Back-end',
                    value: 'be',
                },
                {
                    text: 'Front-end',
                    value: 'fe',
                },
                {
                    text: 'Full-stack',
                    value: 'fullstack',
                },
                {
                    text: 'UX-UI',
                    value: 'ux-ui',
                },
                {
                    text: 'BA',
                    value: 'ba',
                },
                {
                    text: 'DevOps',
                    value: 'devops',
                },
            ],
            filteredValue: filteredInfo.position || null,
            onFilter: (value, record) => record.position.includes(value),
            render: (position) => (
                <span>{getPositionTitle(position)}</span>
            ),
          },
        {
            title: t('main.Manager'),
            dataIndex: 'manager',
            key: 'manager',
            render: (manager) => (
              <span>{manager ? manager.name : 'N/A'}</span>
            ),
          },         
        {
            title: t('main.Status'),
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: t('main.Active'),
                    value: 'active',
                },
                {
                    text: t('main.Inactive'),
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
    ];
    const getPositionTitle = (position) => {
        const positionMap = {
            be: 'Back-end',
            fe: 'Front-end',
            fullstack: 'Full-stack',
            devops: 'DevOps',
            ba: 'Business Analysis',
            qa: 'Quality Assurance'
        };
    
        return positionMap[position] || 'N/A';
      };

    
    const employeesWithStatus = listEmployee?.data.map(employee => ({
        key: employee.id,
        avatar: employee.avatar,
        name: employee.name,
        langFrame: employee.langFrame,
        tech: employee.tech,
        position: employee.position,
        status: employee.status,
        employee_project: employee.employee_project,
        manager: employee.manager || null
    }));
    return (
        <>
             <Input
              placeholder={t("main.Search name")}
              value={searchNameText}
              style={{
                width: 304,
              }}
              onChange={(e) => {
                setSearchNameText(e.target.value);
              }}
            />
            <Link to={`/addEmployee/`} className="text-edit">
               
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    style={{ float: 'right', margin: '10px' }}
                    onClick={() => navigate("listEmployee/addEmployee")}
                >
                    {t("main.Add Employee")}
                </Button>
            </Link>
            <Table
                className="custom-table"
                columns={columns}
                dataSource={employeesWithStatus}
                onChange={handleChange}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            navigate(`/employee/${record.key}`);
                        },
                    };
                }}
                pagination={false}
            
            />
             <div className="pagination" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Pagination items={listEmployee} table={table} setTable={setTable} />
          </div>
        </>
    );
};
export default ShowEmployees;