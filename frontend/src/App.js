import React, { useState } from 'react';
import Navbar from './components/Navbar';
import EmployeePage from './components/EmployeePage';
import DepartmentPage from './components/DepartmentPage';
import AttendancePage from './components/AttendancePage';
import PayrollPage from './components/PayrollPage';
import NotificationPage from './components/NotificationPage';

function App() {
  const [page, setPage] = useState('employees');

  return (
    <div>
      <Navbar setPage={setPage} />
      {page === 'employees' && <EmployeePage />}
      {page === 'departments' && <DepartmentPage />}
      {page === 'attendance' && <AttendancePage />}
      {page === 'payroll' && <PayrollPage />}
      {page === 'notifications' && <NotificationPage />}
    </div>
  );
}

export default App;
