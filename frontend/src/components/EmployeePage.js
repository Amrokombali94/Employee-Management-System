import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container, Typography, TextField, Button, Table, TableHead,
    TableRow, TableCell, TableBody, Paper
} from '@mui/material';

export default function EmployeePage() {
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({ name: '', role: '', email: '', department: '' });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const res = await axios.get('http://localhost:3001/api/employees');
        setEmployees(res.data);
    };

    const addEmployee = async () => {
        await axios.post('http://localhost:3001/api/employees', form);
        setForm({ name: '', role: '', email: '', department: '' });
        fetchEmployees();
    };

    const deleteEmployee = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/employees/${id}`);
            fetchEmployees(); // refresh list
        } catch (err) {
            console.error('Error deleting employee:', err);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
                Employees
            </Typography>

            <Paper sx={{ p: 2, mb: 3 }}>
                <Typography variant="h6">Add Employee</Typography>
                <TextField label="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} sx={{ mr: 2 }} />
                <TextField label="Role" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} sx={{ mr: 2 }} />
                <TextField label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} sx={{ mr: 2 }} />
                <TextField label="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} sx={{ mr: 2 }} />
                <Button variant="contained" color="primary" onClick={addEmployee}>Add</Button>
            </Paper>

            <Table component={Paper}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#90caf9' }}>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Department</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map(emp => (
                        <TableRow key={emp._id}>
                            <TableCell>{emp.name}</TableCell>
                            <TableCell>{emp.role}</TableCell>
                            <TableCell>{emp.email}</TableCell>
                            <TableCell>{emp.department}</TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => deleteEmployee(emp._id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
