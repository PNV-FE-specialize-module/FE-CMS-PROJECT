import {
  CheckCircleOutlined,
  FallOutlined,
  ProjectOutlined,
  RiseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Select, Space, Spin, Typography } from "antd";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./Dashboard.css";
import {useGetEmployeeTotal} from "../../../hooks/useEmployee.jsx";
import {useGetProjectTotal} from "../../../hooks/useProject.jsx";
const { Option } = Select;

export const Dashboard = () => {
  // const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState("year");
  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
  };

  const { data: employeeTotal } = useGetEmployeeTotal({
    period: selectedPeriod,
  });
  const { data: projectTotal } = useGetProjectTotal({
    period: selectedPeriod,
  });

  const { data: employeeCountJoin } = useGetEmployeeTotal({
    period: "count_join",
  });

  const { data: projectCountJoin } = useGetProjectTotal({
    period: "count_join",
  });

  const formattedEmployeeData = employeeCountJoin
      ? Object.values(employeeCountJoin)
      : [];
  const formattedProjectData = projectCountJoin
      ? Object.values(projectCountJoin)
      : [];

  const dates = Object.keys(projectCountJoin || {});
  console.log(employeeTotal,'s')
  console.log(projectTotal,'q')


  const areaChartState = {
    series: [
      {
        name: "PROJECT",
        data: formattedProjectData,
      },
      {
        name: "EMPLOYEE",
        data: formattedEmployeeData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: dates,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      title: {
        text: "CHART",
        align: "center",
      },
    },
  };

  const circleChartState = {
    series: [
      (projectTotal && projectTotal.donePercentage)
          ? projectTotal.donePercentage
          : 0,
      (projectTotal && projectTotal.onProgressPercentage)
          ? projectTotal.onProgressPercentage
          : 0,
      (projectTotal && projectTotal.pendingPercentage)
          ? projectTotal.pendingPercentage
          : 0,
    ],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "TOTAL",
              formatter: function () {
                return projectTotal ? projectTotal.total : 0;
              },
            },
          },
        },
      },
      labels: ["DONE", "ON PROGRESS", "PENDING"],
      title: {
        text: "Current project",
        align: "center",
      },
    },
  };


  // const isPositiveProjectPercentageChange =
  //     projectTotal?.percentageProjectChange > 0;
  // const isPositiveEmployeePercentageChange =
  //     employeeTotal?.percentageChange > 0;
  // const isPositiveProjectDonePercentageChange =
  //     projectTotal?.percentageDoneChange > 0;

  // const breadcrumbItems = [{ key: "dashboard" }];

  return (
      <>
        {projectTotal ? (
            <div style={{ marginLeft: 20 }}>
              {/*<Breadcrumb items={breadcrumbItems} />*/}
              <Row justify="end">
                <Select
                    defaultValue={selectedPeriod}
                    onChange={handlePeriodChange}
                    style={{ width: 120, marginRight: 10, marginBottom: 10 }}
                >
                  <Option value="year">{"YEAR"}</Option>
                  <Option value="month">{"MONTH"}</Option>
                </Select>
              </Row>

              <Row gutter={10} style={{ marginBottom: 20 }}>
                <Col span={8} className="chart-items">
                  <Space direction="horizontal">
                    <Card
                        style={{
                          width: 370,
                          background: "#add8e6",
                          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                        }}
                    >
                      <div className="chart-card">
                        <ProjectOutlined
                            style={{
                              color: "#37a171",
                              fontSize: 30,
                              background: "#dbf6e5",
                              padding: 20,
                              borderRadius: 50,
                            }}
                        />
                        <div className="card-infor">
                          <h1>{projectTotal?.total}</h1>
                          <strong style={{ color: "#383838" }}>
                            {"PROJECT"}
                          </strong>
                        </div>
                      </div>
                    </Card>
                  </Space>
                </Col>

                <Col span={8} className="chart-items">
                  <Space direction="horizontal">
                    <Card
                        style={{
                          width: 370,
                          background: "#EB984E",
                          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                        }}
                    >
                      <div className="chart-card">
                        <UserOutlined
                            style={{
                              color: "#37a171",
                              fontSize: 30,
                              background: "#dbf6e5",
                              padding: 20,
                              borderRadius: 50,
                            }}
                        />
                        <div className="card-infor">
                          <h1>{employeeTotal?.total}</h1>
                          <strong style={{ color: "#383838" }}>
                            {"EMPLOYEE"}
                          </strong>
                        </div>

                      </div>
                    </Card>
                  </Space>
                </Col>

                <Col span={8} className="chart-items">
                  <Space direction="horizontal">
                    <Card
                        style={{
                          width: 370,
                          background: "#E6B0AA",
                          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                        }}
                    >
                      <div className="chart-card">
                        <CheckCircleOutlined
                            style={{
                              color: "#37a171",
                              fontSize: 30,
                              background: "#dbf6e5",
                              padding: 20,
                              borderRadius: 50,
                            }}
                        />
                        <div className="card-infor">
                          <h1>{projectTotal?.currentDoneCount}</h1>
                          <strong style={{ color: "#383838" }}>
                            DONE PROJECT
                          </strong>
                        </div>
                        {/*<Space*/}
                        {/*    direction="horizontal"*/}
                        {/*    style={{*/}
                        {/*      background: "rgba(255, 255, 255, 0.3)",*/}
                        {/*      borderRadius: 15,*/}
                        {/*      padding: 5,*/}
                        {/*      marginBottom: 20,*/}
                        {/*      border: "1px solid white",*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*  {isPositiveProjectDonePercentageChange ? (*/}
                        {/*      <RiseOutlined style={{ color: "green" }} />*/}
                        {/*  ) : (*/}
                        {/*      <FallOutlined style={{ color: "red" }} />*/}
                        {/*  )}*/}
                        {/*  <h5>{projectTotal?.percentageDoneChange}%</h5>*/}
                        {/*</Space>*/}
                      </div>
                    </Card>
                  </Space>
                </Col>
              </Row>

              <Row gutter={10}>
                <Col span={8}>
                  <div id="circleChart">
                    <ReactApexChart
                        options={circleChartState.options}
                        series={circleChartState.series}
                        type="radialBar"
                        height={350}
                    />
                  </div>
                </Col>

                {/*<Col span={16}>*/}
                {/*  <div id="chart">*/}
                {/*    <ReactApexChart*/}
                {/*        options={areaChartState.options}*/}
                {/*        series={areaChartState.series}*/}
                {/*        type="area"*/}
                {/*        height={370}*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*</Col>*/}
              </Row>
            </div>
        ) : (
            <Spin
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
            />
        )}
      </>
  );
};

// export default Dashboard;
