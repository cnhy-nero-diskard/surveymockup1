import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSessionDashboard = () => {
    const [sessionData, setSessionData] = useState([]);

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/admin/session-data`, {
                    withCredentials: true, // Include cookies in the request
                });
                setSessionData(response.data);
            } catch (error) {
                console.error('GYATT Error fetching session data:', error);
                if (error.response && error.response.status === 401) {
                    // Redirect to login if unauthorized
                    
                }
            }
        };

        fetchSessionData();
        const interval = setInterval(fetchSessionData, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Admin Session Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Last Login</th>
                        <th>Last Logout</th>
                        <th>Session Duration</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sessionData.map((admin, index) => (
                        <tr key={index}>
                            <td>{admin.username}</td>
                            <td>{new Date(admin.last_login).toLocaleString()}</td>
                            <td>{admin.last_logout ? new Date(admin.last_logout).toLocaleString() : 'N/A'}</td>
                            <td>{admin.session_duration ? `${admin.session_duration} seconds` : 'N/A'}</td>
                            <td>{admin.is_logged_in ? 'Logged In' : 'Logged Out'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminSessionDashboard;