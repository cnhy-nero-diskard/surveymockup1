import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 90vw;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(145deg, rgb(193, 215, 255), rgb(205, 255, 113));
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 600;
`;

const TableContainer = styled.div`
  max-height: 500px;
  overflow-y: auto;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #3498db;
  color: white;
  position: sticky;
  top: 0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(4, 108, 177, 0.86);
  }
  &:nth-child(odd) {
    background-color: rgba(5, 124, 160, 0.59);
  }

  &:hover {
    background-color: #0099ff;
    color: white;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border: 1px solid #ddd;
  text-align: left;
  min-width: 100px;
  max-height: 150px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: #3498db;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: red;
`;

const PurgeButton = styled.button`
  display: block;
  margin: 1rem auto;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #e74c3c;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

const AnonymousUsersHandler = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnonymousUsersAndSurveyResponses = async () => {
      try {
        // Fetch all anonymous users
        const usersResponse = await axios.get(`${process.env.REACT_APP_API_HOST}/api/admin/anonymous-users`, { withCredentials: true });
        const anonymousUsers = usersResponse.data;

        // Fetch all survey responses
        const surveyResponsesResponse = await axios.get(`${process.env.REACT_APP_API_HOST}/api/admin/survey-responses`, { withCredentials: true });
        const allSurveyResponses = surveyResponsesResponse.data;
        console.log(`ALL RESPONSES --> ${JSON.stringify(allSurveyResponses)}`);
        // Prepare to cross-check with survey responses
        const userSurveyStatus = anonymousUsers.map(user => {
          console.log(`CHECKING FOR ANONYMOUS USER --> ${JSON.stringify(user)}`);
            // Filter survey responses for the current anonymous user
            const userResponses = allSurveyResponses.filter(response => response.anonymous_user_id === user.anonymous_user_id);

          // Prepare the user object with additional fields
          let surveyStatus = {
            ...user,
            surveyEntries: userResponses,
            surveyStatus: 'NO SURVEY', // Default status
            completionStatus: 'INCOMPLETE', // Default completion status
            feedback: false,
            tpms: false,
          };

          if (userResponses.length > 0) {
            surveyStatus.surveyStatus = 'HAS COMPLETED';
            const tpentResponse = userResponses.find(resp => resp.surveyquestion_ref === 'TPENT');
            const finishResponse = userResponses.find(resp => resp.surveyquestion_ref === 'FINISH');

            if (tpentResponse) {
              surveyStatus.feedback = true; // Mark feedback if TPENT entry exists
            }
            if (finishResponse) {
              surveyStatus.completionStatus = 'HAS COMPLETED'; // Mark as completed if FINISH entry exists
            }
            surveyStatus.tpms = true; // Mark TPMS by default if any entries exist
          }

          return surveyStatus;
        });

        setUsers(userSurveyStatus);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnonymousUsersAndSurveyResponses();
  }, []);

  const handlePurge = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_HOST}/api/admin/all-anonymous-users`, { withCredentials: true });
      setUsers([]); // Clear the users state
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

  return (
    <Container>
      <Title>Anonymous Users and Survey Status</Title>
      <PurgeButton onClick={handlePurge}>PURGE</PurgeButton>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <th>Anonymous User ID</th>
              <th>Nickname</th>
              <th>Survey Status</th>
              <th>Completion Status</th>
              <th>Feedback</th>
              <th>TPMS</th>
            </tr>
          </TableHeader>
          <tbody>
            {users.map(user => (
              <TableRow key={user.anonymous_user_id}>
                <TableCell>{user.anonymous_user_id}</TableCell>
                <TableCell>{user.nickname}</TableCell>
                <TableCell>{user.surveyStatus}</TableCell>
                <TableCell>{user.completionStatus}</TableCell>
                <TableCell>{user.feedback ? 'Yes' : 'No'}</TableCell>
                <TableCell>{user.tpms ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AnonymousUsersHandler;
