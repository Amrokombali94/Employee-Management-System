import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Navbar({ setPage }) {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Distributed Employee System
        </Typography>
        <Button color="inherit" onClick={() => setPage('employees')}>Employees</Button>
        <Button color="inherit" onClick={() => setPage('departments')}>Departments</Button>
        <Button color="inherit" onClick={() => setPage('attendance')}>Attendance</Button>
        <Button color="inherit" onClick={() => setPage('payroll')}>Payroll</Button>
        <Button color="inherit" onClick={() => setPage('notifications')}>Notifications</Button>
      </Toolbar>
    </AppBar>
  );
}
