/**
 * Блок подключения модулей/импортов
 */
import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Alert,
  Paper, Grow,
} from '@mui/material';

export const GasCalc = () => {
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
                  Калькулятор бензина
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
