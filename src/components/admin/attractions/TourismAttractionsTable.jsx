// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, Fab } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import AddAttractionDialog from './AddAttractionDialog';
import EditAttractionDialog from './EditAttractionDialog';
// import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import AddIcon from '@mui/icons-material/Add';
// Styled Components
const GradientContainer = styled(Container)`
  background: linear-gradient(135deg, rgb(57, 93, 146), #c3cfe2);
  padding: 2rem;
  width: 100vw; // Set to full viewport width
  min-width: 100vw; // Ensure it doesn't shrink below viewport width
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow-x: auto; // Ensure the container can scroll horizontally if needed
  margin: 0; // Remove any default margin
`;

const StyledTableContainer = styled(TableContainer)`
  border-radius: 15px;
  overflow: hidden;
  margin-top: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 100%; // Ensure the table container takes full width
  min-width: 100%; // Ensure it doesn't shrink below container width
`;

const StyledTableHead = styled(TableHead)`
  background: linear-gradient(135deg, #6a11cb, #2575fc);
`;

const StyledTableCell = styled(TableCell)`
  color: white !important;
  font-weight: bold !important;
  white-space: nowrap; // Prevent text wrapping in header cells
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #e3f2fd;
  }
`;

const DeleteButton = styled(Button)`
  background: linear-gradient(135deg, #ff416c, #ff4b2b) !important;
  color: white !important;
  border-radius: 25px !important;
  padding: 5px 15px !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
`;

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 50vw;
  z-index: 1000;
  
  .MuiFab-root {
    width: 80px; // Increase the width
    height: 80px; // Increase the height
    font-size: 2rem; // Increase the icon size
  }
`;


const TourismAttractionsTable = () => {
    const [attractions, setAttractions] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [currentAttraction, setCurrentAttraction] = useState(null);
    const [newAttraction, setNewAttraction] = useState({
        TA_Name: '',
        Type_Code: '',
        Region: '',
        Prov_HUC: '',
        City_Mun: '',
        Report_Year: '',
        Brgy: '',
        Latitude: '',
        Longitude: '',
        TA_Category: '',
        NTDP_Category: '',
        Devt_Lvl: '',
        Mgt: '',
        Online_Connectivity: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/admin/fetch`);
                setAttractions(response.data);
            } catch (error) {
                console.error('Failed to fetch attractions:', error);
            }
        };
        fetchAttractions();
    }, []);

    const handleAddAttraction = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/admin/add`, newAttraction);
            setAttractions([...attractions, response.data]);
            setOpenAdd(false);
            setSnackbarMessage('Attraction added successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Failed to add attraction:', error);
            setSnackbarMessage('Failed to add attraction');
            setSnackbarOpen(true);
        }
    };

    const handleDeleteAttraction = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/admin/delete/${id}`);
            setAttractions(attractions.filter(attraction => attraction.id !== id));
            setSnackbarMessage('Attraction deleted successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Failed to delete attraction:', error);
            setSnackbarMessage('Failed to delete attraction');
            setSnackbarOpen(true);
        }
    };

    const handleEditAttraction = (attraction) => {
        setCurrentAttraction({
            TA_Name: attraction.ta_name,
            Type_Code: attraction.type_code,
            Region: attraction.region,
            Prov_HUC: attraction.prov_huc,
            City_Mun: attraction.city_mun,
            Report_Year: attraction.report_year,
            Brgy: attraction.brgy,
            Latitude: attraction.latitude,
            Longitude: attraction.longitude,
            TA_Category: attraction.ta_category,
            NTDP_Category: attraction.ntdp_category,
            Devt_Lvl: attraction.devt_lvl,
            Mgt: attraction.mgt,
            Online_Connectivity: attraction.online_connectivity,
            id: attraction.id, // Ensure the id is included
        });
        setOpenEdit(true);
    };
    const handleUpdateAttraction = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/admin/update/${currentAttraction.id}`,
                currentAttraction
            );
            setAttractions(attractions.map(attraction =>
                attraction.id === currentAttraction.id ? response.data : attraction
            ));
            setOpenEdit(false);
            setSnackbarMessage('Attraction updated successfully');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Failed to update attraction:', error);
            setSnackbarMessage('Failed to update attraction');
            setSnackbarOpen(true);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (openEdit) {
            setCurrentAttraction({ ...currentAttraction, [name]: value });
        } else {
            setNewAttraction({ ...newAttraction, [name]: value });
        }
    };

    const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });

    return (
        <GradientContainer>
            <Typography variant="h3" gutterBottom>
                Tourism Attractions
            </Typography>
            <StyledTableContainer component={Paper}>
                <Table>
                    <StyledTableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Type Code</StyledTableCell>
                            <StyledTableCell>Region</StyledTableCell>
                            <StyledTableCell>Province/HUC</StyledTableCell>
                            <StyledTableCell>City/Municipality</StyledTableCell>
                            <StyledTableCell>Report Year</StyledTableCell>
                            <StyledTableCell>Barangay</StyledTableCell>
                            <StyledTableCell>Latitude</StyledTableCell>
                            <StyledTableCell>Longitude</StyledTableCell>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>NTDP Category</StyledTableCell>
                            <StyledTableCell>Development Level</StyledTableCell>
                            <StyledTableCell>Management</StyledTableCell>
                            <StyledTableCell>Online Connectivity</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </StyledTableHead>
                    <TableBody>
                        {attractions.map((attraction) => (
                            <StyledTableRow key={attraction.id}>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.ta_name}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.type_code}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.region}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.prov_huc}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.city_mun}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.report_year}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.brgy}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.latitude}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.longitude}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.ta_category}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.ntdp_category}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.devt_lvl}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.mgt}</TableCell>
                                <TableCell style={{ whiteSpace: 'normal' }}>{attraction.online_connectivity}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEditAttraction(attraction)}
                                        style={{ marginRight: '8px', borderRadius: '20px', marginBottom: '5px', paddingTop: '5px' }}
                                    >
                                        Edit
                                    </Button>
                                    <DeleteButton variant="contained" onClick={() => handleDeleteAttraction(attraction.id)}>
                                        Delete
                                    </DeleteButton>
                                </TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>
            <FloatingButtonContainer>
                <Fab color="primary" aria-label="add" onClick={() => setOpenAdd(true)}>
                    <AddIcon />
                </Fab>
            </FloatingButtonContainer>
            <AddAttractionDialog
                open={openAdd}
                onClose={() => setOpenAdd(false)}
                newAttraction={newAttraction}
                handleInputChange={handleInputChange}
                handleAddAttraction={handleAddAttraction}
            />
            <EditAttractionDialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                attraction={currentAttraction}
                handleInputChange={handleInputChange}
                handleUpdateAttraction={handleUpdateAttraction}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </GradientContainer>
    );
};

export default TourismAttractionsTable;