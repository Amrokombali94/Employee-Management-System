import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Typography, TextField, Button, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({
    message: '',
    type: 'info',
    recipient: ''
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://localhost:3005/api/notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const addNotification = async () => {
    try {
      await axios.post('http://localhost:3005/api/notifications', form);
      setForm({ message: '', type: 'info', recipient: '' });
      fetchNotifications();
    } catch (err) {
      console.error('Error adding notification:', err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#ff6f00' }}>
        Notifications
      </Typography>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6">Add Notification</Typography>
        <TextField 
          label="Message" 
          value={form.message} 
          onChange={e => setForm({ ...form, message: e.target.value })} 
          sx={{ mr: 2, mb: 2 }} 
        />
        <FormControl sx={{ mr: 2, mb: 2, minWidth: 150 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={form.type}
            label="Type"
            onChange={e => setForm({ ...form, type: e.target.value })}
          >
            <MenuItem value="info">Info</MenuItem>
            <MenuItem value="warning">Warning</MenuItem>
            <MenuItem value="error">Error</MenuItem>
          </Select>
        </FormControl>
        <TextField 
          label="Recipient" 
          value={form.recipient} 
          onChange={e => setForm({ ...form, recipient: e.target.value })} 
          sx={{ mr: 2, mb: 2 }} 
        />
        <Button variant="contained" color="warning" onClick={addNotification}>
          Add
        </Button>
      </Paper>

      <Table component={Paper}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#ffe082' }}>
            <TableCell>Message</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Recipient</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notifications.map(note => (
            <TableRow key={note._id}>
              <TableCell>{note.message}</TableCell>
              <TableCell>{note.type}</TableCell>
              <TableCell>{note.recipient}</TableCell>
              <TableCell>{new Date(note.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
