/**
 * Блок подключения модулей/импортов
 */
import React, {useState} from 'react';
import {
  createTheme,
  Box,
  ThemeProvider,
  Container,
  Grid,
  Typography,
  Paper, Grow, TextField,
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

export const FullScreen = () => {
  /**
   * Блок определения хуков
   */
  const [userText, setUserText] = useState('Lorem ipsum');

  return (
    <Grow
      in
    >
      <Box sx={{flexGrow: 1}}>
        <ThemeProvider theme={darkTheme}>
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
                  <Typography variant={'h1'} gutterBottom>
                    {userText}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <TextField
                    fullWidth
                    label="Текст для вывода"
                    variant="filled"
                    value={userText}
                    onChange={(evt) => {
                      setUserText(evt.target.value);
                    }}
                  />
                </Grid>
              </Grid>
              (в разработке)
            </Container>
          </Paper>
        </ThemeProvider>
      </Box>
    </Grow>
  );
};
