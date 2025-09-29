import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, TextField, Button, Table, TableHead,
  TableRow, TableCell, TableBody, Paper
} from '@mui/material';

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('http://localhost:3003/api/departments');
      setDepartments(res.data);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  };

  const addDepartment = async () => {
    try {
      await axios.post('http://localhost:3003/api/departments', form);
      setForm({ name: '', description: '' });
      fetchDepartments();
    } catch (err) {
      console.error('Error adding department:', err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32' }}>
        Departments
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Add Department</Typography>
        <TextField 
          label="Name" 
          value={form.name} 
          onChange={e => setForm({ ...form, name: e.target.value })} 
          sx={{ mr: 2 }} 
        />
        <TextField 
          label="Description" 
          value={form.description} 
          onChange={e => setForm({ ...form, description: e.target.value })} 
          sx={{ mr: 2 }} 
        />
        <Button variant="contained" color="success" onClick={addDepartment}>
          Add
        </Button>
      </Paper>

      <Table component={Paper}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#a5d6a7' }}>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map(dep => (
            <TableRow key={dep._id}>
              <TableCell>{dep.name}</TableCell>
              <TableCell>{dep.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
