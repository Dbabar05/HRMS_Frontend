import React from 'react'
import './employee.css';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


export default function Employee() {

 // Employee Data for Cards
 const stats = [
  { title: "Total Employee", count: 1000, icon: <PeopleAltIcon /> },
  { title: "Active", count: 1000, icon: <PersonIcon /> },
  { title: "Inactive", count: 10, icon: <PersonOffIcon /> },
  { title: "New Joiners", count: 33, icon: <PersonAddIcon /> },
];
const employees = [
  {
    id: "EMP - 123456",
    name: "Anthony Lewis",
    role: "Manager",
    email: "anthony@example.com",
    phone: "+911234567890",
    designation: "Development",
    status: "Active",
    profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  // Duplicate entries for display (mock data)
  {
    id: "EMP - 123456",
    name: "Anthony Lewis",
    role: "Manager",
    email: "anthony@example.com",
    phone: "+911234567890",
    designation: "Development",
    status: "Active",
    profileImg: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];


  return (
    <>

          <div className="titleE">
             <h1>Employee</h1>
          </div>
          <div className="breadcrumb-wrapper">
              <ul className="breadcrumb">
                <li>
                  <Link to="/" className="breadcrumb-link">
                  <HomeIcon className="home-icon" />
                        </Link>
                </li>
                <li className="breadcrumb-separator">/</li>
                <li>
                  <Link to="/employee" className="breadcrumb-link">Employee</Link>
                </li>
                <li className="breadcrumb-separator">/</li>
                <li className="breadcrumb-current">Employee List</li>
              </ul>
          
            {/* Right Section: Buttons */}
            
              <button className="export-btn">
                <FileDownloadIcon className="icon" />
                Export <ExpandMoreIcon/>
              </button>
              <button className="add-employee-btn">
                <AddIcon className="icon" />
                Add Employee
              </button>
        </div>
        <div className="infoE">
              <ul className="employee-stats">
                  {stats.map((item, index) => (
                <li key={index} className="stat-card">
                  <div className="icon">{item.icon}</div>
                  <div>
                  <h4>{item.title}</h4>
                  <p>{item.count}</p>
                </div>
                </li>
                    ))}
              </ul>
        </div>
      

      <div className="employee-table-container">
        {/* Filters & Sorting */}
        <div className="filters">
            <input type="date" className="filter-input" />
            <select className="filter-dropdown">
              <option>Designation</option>
            </select>
            <select className="filter-dropdown">
              <option>Select Status</option>
            </select>
            <select className="filter-dropdown">
              <option>Sort by: Last 7 Days</option>
            </select>
        </div>
  
        {/* Employee List */}
        <ul className="employee-table">
          <li className="table-header">
              <span><input type="checkbox" /></span>
              <span>Emp ID</span>
              <span>Name</span>
              <span>Email ID</span>
              <span>Phone</span>
              <span>Designation</span>
              <span>Status</span>
              <span>Actions</span>
          </li>
  
          {employees.map((emp, index) => (
            <li key={index} className="table-row">
                <span><input type="checkbox" /></span>
                <span>{emp.id}</span>
                <span className="employee-info">
                  <img src={emp.profileImg} alt="Profile" className="profile-img" />
                    <div>
                      <strong>{emp.name}</strong>
                      <p>{emp.role}</p>
                    </div>
                </span>
                <span>{emp.email}</span>
                <span>{emp.phone}</span>
                <span>{emp.designation}</span>
                <span className={`status ${emp.status.toLowerCase()}`}>{emp.status}</span>
                <span className="actions">
                  <EditIcon className="edit-icon" />
                  <DeleteIcon className="delete-icon" />
                </span>
            </li>
          ))}
        </ul>
  
        {/* Pagination */}
        <div className="pagination">
          <button className="page-btn">&lt;</button>
          <span className="active-page">1</span>
          <button className="page-btn">&gt;</button>
        </div>
      </div>
  


      </>
)
}


