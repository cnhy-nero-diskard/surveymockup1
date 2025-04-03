import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 90vw;
  height: 70vh;
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

  ${({ status }) =>
    status === 'AT LEAST ONE ENTRY, HAS COMPLETED' &&
    `
    background-color: green !important;
    color: white;
  `}
`;

const TableCell = styled.td`
  padding: 1rem;
  border: 1px solid #ddd;
  text-align: left;
  min-width: 100px;
  max-height: 150px;

  ${({ feedback }) =>
    feedback === 'Yes' &&
    `
    background-color: rgb(212, 113, 0);
  `}

  ${({ tpms }) =>
    tpms === 'Yes' &&
    `
    background-color: rgb(212, 113, 0);
  `}
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

const DetailsContainer = styled.div`
  padding: 1.5rem;
  border-radius: 12px;
  background: linear-gradient(145deg, rgb(128, 195, 221), rgb(0, 156, 204));
  margin: 1rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const GroupedDetails = styled.div`
  margin-bottom: 1.5rem;
`;

const GroupTitle = styled.h5`
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

const ResponseItem = styled.div`
  padding: 0.75rem;
  background: rgba(187, 223, 240, 0.47);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const ResponseText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #34495e;
  line-height: 1.5;
`;

const Timestamp = styled.small`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #7f8c8d;
`;

const AnonymousUsersHandler = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState(null);
  const [surveyQuestions, setSurveyQuestions] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('alphabetical'); // New state for sorting

  useEffect(() => {
    const fetchAnonymousUsersAndSurveyResponses = async () => {
      try {
        const usersResponse = await axios.get(`${process.env.REACT_APP_API_HOST}/api/admin/anonymous-users`, { withCredentials: true });
        const anonymousUsers = usersResponse.data;

        const surveyResponsesResponse = await axios.get(`${process.env.REACT_APP_API_HOST}/api/admin/survey-responses`, { withCredentials: true });
        const allSurveyResponses = surveyResponsesResponse.data;

        const surveyQuestionsResponse = await axios.get(`${process.env.REACT_APP_API_HOST}/api/admin/survey-questions`, { withCredentials: true });
        setSurveyQuestions(surveyQuestionsResponse.data);

        const userSurveyStatus = anonymousUsers.map(user => {
          const userResponses = allSurveyResponses.filter(response => response.anonymous_user_id === user.anonymous_user_id);
          let surveyStatus = {
            ...user,
            surveyEntries: userResponses,
            surveyStatus: 'HAS NO SURVEY',
            completionStatus: 'INCOMPLETE',
            feedback: false,
            tpms: false,
          };

          if (userResponses.length > 0) {
            surveyStatus.surveyStatus = 'AT LEAST ONE ENTRY';
            const tpentResponse = userResponses.find(resp => resp.surveyquestion_ref === 'TPENT');
            const finishResponse = userResponses.find(resp => resp.surveyquestion_ref === 'FINISH');

            if (tpentResponse) {
              surveyStatus.feedback = true;
            }
            if (finishResponse) {
              surveyStatus.completionStatus = 'HAS COMPLETED';
            }
            surveyStatus.tpms = true;
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
      // await axios.delete(`${process.env.REACT_APP_API_HOST}/api/admin/all-anonymous-users`, { withCredentials: true });
      // setUsers([]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleDetails = (userId) => {
    setDetailsVisible(detailsVisible === userId ? null : userId);
  };

  // Function to group responses by title
  const groupResponsesByTitle = (responses) => {
    return responses.reduce((acc, response) => {
      const matchingQuestion = surveyQuestions.find(
        question => question.surveyresponses_ref === response.surveyquestion_ref
      );
      const title = matchingQuestion ? matchingQuestion.title : 'Uncategorized';

      if (!acc[title]) {
        acc[title] = [];
      }
      acc[title].push(response);
      return acc;
    }, {});
  };

  // Sorting function
const sortUsers = (criteria) => {
  let sortedUsers = [...users];

  sortedUsers.sort((a, b) => {
    // Priority 1: Sort by 'Present Data'
    const aHasData = ["AT LEAST ONE ENTRY", "HAS COMPLETED"].includes(a.surveyStatus) ||
                     a.feedback === true || a.tpms === true;
    const bHasData = ["AT LEAST ONE ENTRY", "HAS COMPLETED"].includes(b.surveyStatus) ||
                     b.feedback === true || b.tpms === true;

    if (aHasData && !bHasData) return -1; // a comes first
    if (!aHasData && bHasData) return 1;  // b comes first

    // Priority 2: Sort by the selected criteria (alphabetical or created_at)
    if (criteria === 'alphabetical') {
      return a.nickname.localeCompare(b.nickname);
    } else if (criteria === 'created_at') {
      return new Date(a.created_at) - new Date(b.created_at);
    }

    return 0; // Default case
  });

  setUsers(sortedUsers);
};

  // Handle sort criteria change
  const handleSortChange = (e) => {
    const criteria = e.target.value;
    setSortCriteria(criteria);
    sortUsers(criteria);
  };

  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;

  return (
    <Container>
      <Title>Anonymous Users and Survey Status</Title>
      {/* <PurgeButton onClick={handlePurge}>PURGE</PurgeButton> */}
<div>
  <label>Sort by: </label>
  <select value={sortCriteria} onChange={handleSortChange}>
    <option value="alphabetical">Alphabetical</option>
    <option value="created_at">Created At</option>
    <option value="present_data">Present Data</option> {/* New sort option */}
  </select>
</div>

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
              <th>SEE DETAILS</th>
            </tr>
          </TableHeader>
          <tbody>
            {users.map(user => (
              <React.Fragment key={user.anonymous_user_id}>
                <TableRow status={`${user.surveyStatus}, ${user.completionStatus}`}>
                  <TableCell>{user.anonymous_user_id}</TableCell>
                  <TableCell>{user.nickname}</TableCell>
                  <TableCell>{user.surveyStatus}</TableCell>
                  <TableCell>{user.completionStatus}</TableCell>
                  <TableCell feedback={user.feedback ? 'Yes' : 'No'}>{user.feedback ? 'Yes' : 'No'}</TableCell>
                  <TableCell tpms={user.tpms ? 'Yes' : 'No'}>{user.tpms ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <button onClick={() => toggleDetails(user.anonymous_user_id)}>
                      SEE DETAILS
                    </button>
                  </TableCell>
                </TableRow>
                {detailsVisible === user.anonymous_user_id && (
                  <TableRow>
                    <TableCell colSpan="7">
                      <DetailsContainer>
                        <h4>Survey Responses for {user.nickname}</h4>
                        {Object.entries(groupResponsesByTitle(user.surveyEntries)).map(([title, responses]) => (
                          <GroupedDetails key={title}>
                            <GroupTitle>{title}</GroupTitle>
                            {responses.map((response, index) => {
                              const matchingQuestion = surveyQuestions.find(
                                question => question.surveyresponses_ref === response.surveyquestion_ref
                              );

                              return (
                                <ResponseItem key={index}>
                                  <ResponseText>
                                    <strong>Question Content:</strong> {matchingQuestion ? matchingQuestion.content : 'N/A'} <br />
                                    <strong>Response:</strong> {response.response_value}
                                  </ResponseText>
                                  <Timestamp>
                                    {new Date(response.created_at).toLocaleString()}
                                  </Timestamp>
                                </ResponseItem>
                              );
                            })}
                          </GroupedDetails>
                        ))}
                      </DetailsContainer>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AnonymousUsersHandler;
