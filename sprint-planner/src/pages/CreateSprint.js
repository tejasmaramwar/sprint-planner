import React, { useState, useRef, useEffect } from "react";
import "../styles/createSprint.css";
import { DataGrid } from "@mui/x-data-grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const CreateSprint = () => {
  // const [membersCount, setMembersCount] = useState(0);
  const navigate = useNavigate();
  const [rowsCount, setRowsCount] = useState([]);
  const [sprintData, setSprintData] = useState({
    projectName: "",
    sprintNo: 0,
    sprintDurationWeeks: 0,
    membersCount: 0,
  });

  const handleSprintData = (event) => {
    const { name, value } = event.target;

    const copySprintData = {...sprintData};
    copySprintData[name] = value;
    setSprintData(copySprintData);
  };

  const handleConfigureSprint = () => {
    navigate("/sprint");
  };

  const columns = [
    { field: "id", headerName: "Id", width: 90 },
    {
      field: "developer",
      headerName: "Developer",
      width: 300,
      editable: true,
      sortable: false,
    },
    {
      field: "velocity",
      headerName: "Velocity",
      type: "number",
      width: 110,
      editable: true,
      sortable: false,
    },
    {
      field: "holidays",
      headerName: "Holidays",
      editable: true,
      sortable: false,
      type: "number",
      width: 90,
    },
    {
      field: "leaves",
      headerName: "Leaves",
      editable: true,
      sortable: false,
      type: "number",
      width: 90,
    },
  ];

  //   const rows = [
  //     { id: 1, developer: "Snow", velocity: 9, holidays: 2, leaves: 1 },
  //     { id: 2, developer: "Lannister", velocity: 9, holidays: 2, leaves: 1 },
  //     { id: 3, developer: "Lannister", velocity: 9, holidays: 2, leaves: 1 },
  //     { id: 4, developer: "Stark", velocity: 9, holidays: 2, leaves: 1 },
  //     { id: 5, developer: "Targaryen", velocity: 9, holidays: 2, leaves: 1 },
  //   ];

  useEffect(() => {
    const newRows = Array.from({ length: sprintData.membersCount }, (_, index) => ({
      id: index + 1,
      developer: "",
      velocity: "",
      holidays: "",
      leaves: "",
    }));

    setRowsCount(newRows);
  }, [sprintData.membersCount]);

  return (
    <div className="createSprintContainer">
      <div className="left-section">
        <div className="first">
          <h1>Create a project</h1>
          <label
            htmlFor="projectName"
            id="projectTitle"
          >
            Let's start with a name for your project
          </label>
          <TextField
            id="standard-basic projectName"
            // label="Enter your project name"
            variant="standard"
            name="projectName"
            size="medium"
            placeholder="Enter your project name"
            onChange={handleSprintData}
            sx={{
              input: {
                fontSize: "36px",
                fontWeight: "500",
                height: "36px",
                padding: "12px 14px",
              },
            }}
          />
          <a
            href="#second"
            style={{ scrollBehavior: "smooth" }}
          >
            <button>Continue</button>
          </a>
        </div>
        <div
          className="second"
          id="second"
        >
          <h1 className="sprintDetailsTitle">Sprint Details</h1>

          <div className="sprintDdl">
            <label htmlFor="sprintNo">Sprint</label>
            <span style={{ height: "7px" }}></span>
            <Select
              id="sprintDdl"
              sx={{ minWidth: "120px" }}
              name="sprintNo"
              onChange={handleSprintData}
            >
              <MenuItem value={1}>Sprint 1</MenuItem>
              <MenuItem value={2}>Sprint 2</MenuItem>
              <MenuItem value={3}>Sprint 3</MenuItem>
              <MenuItem value={4}>Sprint 4</MenuItem>
            </Select>
          </div>
          <div className="sprintDdl">
            <label htmlFor="sprintDurationWeeks">Sprint Duration</label>
            <span style={{ height: "7px" }}></span>
            <Select
              id="sprintDdl"
              sx={{ minWidth: "120px" }}
              name="sprintDurationWeeks"
              onChange={handleSprintData}
            >
              <MenuItem value={1}>1 Week</MenuItem>
              <MenuItem value={2}>2 Weeks</MenuItem>
              <MenuItem value={3}>3 Weeks</MenuItem>
              <MenuItem value={4}>4 Weeks</MenuItem>
            </Select>
          </div>
          <div className="sprintDdl">
            <label htmlFor="membersCount">No of members participating in sprint</label>
            <span style={{ height: "7px" }}></span>
            <Select
              id="membersCount"
              sx={{ minWidth: "120px" }}
              onChange={handleSprintData}
              name="membersCount"
            >
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
            </Select>
          </div>
          <a
            href="#third"
            style={{ scrollBehavior: "smooth" }}
          >
            <button>Continue</button>
          </a>
        </div>
        <div
          className="third"
          id="third"
        >
          <h1 className="moreDetailsTitle">Some more details...</h1>

          <div className="developersTable">
            <DataGrid
              rows={rowsCount}
              columns={columns}
              disableRowSelectionOnClick
              pageSize={sprintData.membersCount}
              rowsPerPageOptions={[sprintData.membersCount]}
            />
          </div>
          <button onClick={handleConfigureSprint}>Submit</button>
        </div>
      </div>

      <div className="right-section flex-center">
        <img
          src="/images/create.png"
          alt="project"
        />
      </div>
    </div>
  );
};

export default CreateSprint;
