/**
 * Блок подключения модулей/импортов
 */
import React from 'react';
import {
  createTheme,
  Box,
  ThemeProvider,
  Container,
  Grid,
  Typography,
  Alert,
  Paper, Grow,
} from '@mui/material';

/**
 * Блок кастомизации MUI
 */
const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565C0',
    },
  },
});

export const VKurse = () => {
  return (
    <Grow
      in
    >
      <Box sx={{flexGrow: 1}}>
        <Paper
          sx={{pb: 2}}
        >
          <Container>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography gutterBottom>
                    ВКурсе
                </Typography>
                <Alert severity="warning">
                    Страница находится в разработке. Повторите попытку позже
                </Alert>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Box>
    </Grow>
  );
};
