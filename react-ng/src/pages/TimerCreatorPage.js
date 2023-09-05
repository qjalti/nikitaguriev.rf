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

export const TimerCreator = () => {
  return (
    <Grow
      in
    >
      <Box sx={{flexGrow: 1}}>
        <Paper>
          <Container>
            <Grid
              container
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              sx={{p: 2}}
            >
              <Grid item>
                <Typography gutterBottom>
                  Создать счетчик
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
