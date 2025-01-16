import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const data = [
  { name: 'Positive', value: 400 },
  { name: 'Negative', value: 300 },
];

const MainDashboard = () => {
  return (
    <div>
      <h1>December 8, 2025 - Wednesday 10:07 PM</h1>
      <h2>Managing</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Annual Report</TableCell>
              <TableCell>Revoke Result</TableCell>
              <TableCell>Verdance Result</TableCell>
              <TableCell>Annual Institute</TableCell>
              <TableCell>Financing Institute</TableCell>
              <TableCell>Equipment Institute</TableCell>
              <TableCell>Financing Institute</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map through your data here */}
          </TableBody>
        </Table>
      </TableContainer>
      <button>Log Out</button>
    </div>
  );
};

export default MainDashboard;