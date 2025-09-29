import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, TextField, Button, Table, TableHead,
  TableRow, TableCell, TableBody, Paper
} from '@mui/material';

export default function PayrollPage() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    employeeId: '',
    baseSalary: '',
    bonus: '',
    deductions: ''
  });

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    try {
      const res = await axios.get('http://localhost:3004/api/payroll');
      setRecords(res.data);
    } catch (err) {
      console.error('Error fetching payroll:', err);
    }
  };

  const addPayroll = async () => {
    try {
      await axios.post('http://localhost:3004/api/payroll', {
        employeeId: form.employeeId,
        baseSalary: Number(form.baseSalary),
        bonus: Number(form.bonus),
        deductions: Number(form.deductions),
      });
      setForm({ employeeId: '', baseSalary: '', bonus: '', deductions: '' });
      fetchPayroll();
    } catch (err) {
      console.error('Error adding payroll:', err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#6a1b9a' }}>
        Payroll
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Add Payroll Record</Typography>
        <TextField 
          label="Employee ID" 
          value={form.employeeId} 
          onChange={e => setForm({ ...form, employeeId: e.target.value })} 
          sx={{ mr: 2, mb: 2 }} 
        />
        <TextField 
          label="Base Salary" 
          type="number"
          value={form.baseSalary} 
          onChange={e => setForm({ ...form, baseSalary: e.target.value })} 
          sx={{ mr: 2, mb: 2 }} 
        />
        <TextField 
          label="Bonus" 
          type="number"
          value={form.bonus} 
          onChange={e => setForm({ ...form, bonus: e.target.value })} 
          sx={{ mr: 2, mb: 2 }} 
        />
        <TextField 
          label="Deductions" 
          type="number"
          value={form.deductions} 
          onChange={e => setForm({ ...form, deductions: e.target.value })} 
          sx={{ mr: 2, mb: 2 }} 
        />
        <Button variant="contained" color="secondary" onClick={addPayroll}>
          Add
        </Button>
      </Paper>

      <Table component={Paper}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#ce93d8' }}>
            <TableCell>Employee ID</TableCell>
            <TableCell>Base Salary</TableCell>
            <TableCell>Bonus</TableCell>
            <TableCell>Deductions</TableCell>
            <TableCell>Pay Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map(record => (
            <TableRow key={record._id}>
              <TableCell>{record.employeeId}</TableCell>
              <TableCell>${record.baseSalary}</TableCell>
              <TableCell>${record.bonus}</TableCell>
              <TableCell>${record.deductions}</TableCell>
              <TableCell>{new Date(record.payDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
