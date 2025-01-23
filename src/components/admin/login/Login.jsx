import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import {
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';

// Styled components
const LoginContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ isDesktop }) =>
    isDesktop
      ? 'linear-gradient(to right,rgb(142, 149, 255) 50%,rgb(185, 204, 255) 50%)'
      : '#f5f5f5'};
`;

const StyledPaper = styled(Paper)`
  padding: 2rem;
  width: 100%;
  border-radius: 20px;
  max-width: 400px;
  background: #ffffff;
`;

const StyledForm = styled.form`
  margin-bottom: 1.5rem;
  
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1.5rem;

`;

const StyledButton = styled(Button)`
  padding: 0.75rem;
  border-radius: 20px;


`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(https://placehold.co/600x400/000000/FFF);
  background-size: cover;
  background-position: center;
  border-radius: 8px;
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // Check if screen is desktop size

  // Formik setup with Yup validation
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_HOST}/api/auth/login`,
          values,
          { withCredentials: true }
        );
        console.log(response.status);

        login(); // Update authentication state
        navigate('/admin'); // Redirect to admin dashboard
      } catch (err) {
        console.error('Error logging in:', err);
        setErrors({ submit: 'Invalid username or password' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <LoginContainer isDesktop={isDesktop}>
      <Grid container sx={{ maxWidth: '1200px', margin: 'auto' }}>
        {/* Login Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <StyledPaper elevation={3}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Login
            </Typography>
            {formik.errors.submit && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {formik.errors.submit}
              </Alert>
            )}
            <StyledForm onSubmit={formik.handleSubmit}>
              <StyledTextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <StyledTextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <StyledButton
                fullWidth
                variant="contained"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Login
              </StyledButton>
            </StyledForm>
          </StyledPaper>
        </Grid>

        {/* Placeholder Image (Desktop Only) */}
        {isDesktop && (
          <Grid
            item
            md={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
            }}
          >
            <ImageContainer />
          </Grid>
        )}
      </Grid>
    </LoginContainer>
  );
};

export default Login;