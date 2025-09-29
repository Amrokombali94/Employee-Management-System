import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    Container, Typography, TextField, Button, Table, TableHead, 
    TableRow, TableCell, TableBody, Paper, MenuItem, Select, InputLabel, FormControl
} from "@mui/material";

export default function AttendancePage() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ employeeId: '', status: 'present' });

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get('http://localhost:3002/api/attendance');
      setRecords(res.data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    }
  };

  const addAttendance = async () => {
    try {
      await axios.post('http://localhost:3002/api/attendance', form);
      setForm({ employeeId: '', status: 'present' });
      fetchAttendance();
    } catch (err) {
      console.error('Error adding attendance:', err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#d32f2f' }}>
        Attendance
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Add Attendance</Typography>
        <TextField 
          label="Employee ID" 
          value={form.employeeId} 
          onChange={e => setForm({ ...form, employeeId: e.target.value })} 
          sx={{ mr: 2, mb: 2 }}
        />
        <FormControl sx={{ mr: 2, mb: 2, minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={form.status}
            label="Status"
            onChange={e => setForm({ ...form, status: e.target.value })}
          >
            <MenuItem value="present">Present</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="error" onClick={addAttendance}>
          Add
        </Button>
      </Paper>

      <Table component={Paper}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#ef9a9a' }}>
            <TableCell>Employee ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map(record => (
            <TableRow key={record._id}>
              <TableCell>{record.employeeId}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>{new Date(record.date).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}



