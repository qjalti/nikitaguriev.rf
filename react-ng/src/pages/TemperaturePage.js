/**
 * Блок подключения модулей/импортов
 */
import React, {useState, useEffect} from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Grow,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import {common} from '@mui/material/colors';
import axios from 'axios';
import {io} from 'socket.io-client';
import moment from 'moment';
import 'moment/locale/ru';
// import {LineChart} from '@mui/x-charts/LineChart';
moment.locale('ru');

const SOCKET = io('https://qjalti.ru');

export const Temperature = () => {
  const [loading, setLoading] = useState(false);
  const [elements, setElements] = useState([]);

  const selectArduinoData = async () => {
    try {
      setLoading(true);
      const RESPONSE = await axios.post('https://qjalti.ru/api/arduino/select');
      console.dir(RESPONSE);
      const TEMPERATURE_DATE = moment(RESPONSE.data.data[0].timestamp);
      console.log(TEMPERATURE_DATE);
      setElements(
          {
            temperature: RESPONSE.data.data[0].temperature,
            date: TEMPERATURE_DATE.fromNow(),
          },
      );
      const TEMPERATURES = [];
      const TIMESTAMPS = [];
      RESPONSE.data.data.map((el) => {
        TEMPERATURES.push(el.temperature);
        TIMESTAMPS.push(el.id);
      });
      // setXElements(TEMPERATURES);
      // setYElements(TIMESTAMPS);
      setLoading(false);
    } catch (err) {
      console.log('Error! ', err.message);
      console.log('Error! ', err);
    }
  };

  useEffect(() => {
    selectArduinoData().then(() => false);
  }, []);

  SOCKET.on('arduinoEvent', () => {
    selectArduinoData().then(() => false);
  });

  return (
    <>
      <Backdrop
        sx={{
          color: common.white,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color={'inherit'}/>
      </Backdrop>
      <Grow
        in
      >
        <Box sx={{flexGrow: 1}}>
          <Paper>
            <Container>
              <Grid
                container
                direction={'row'}
                sx={{py: 2}}
              >
                <Grid item>
                  <Grid
                    container
                    direction={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Grid item>
                      <Typography variant={'h4'} align={'center'}>
                        {elements.temperature}&deg;C
                      </Typography>
                      <Typography variant={'caption'} align={'center'}>
                          ({elements.date})
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                direction={'row'}
                sx={{py: 2}}
              >
                <Grid item>
                  {/* <LineChart
                    xAxis={[{data: yElements}]}
                    series={[
                      {
                        data: xElements
                      },
                    ]}
                    width={500}
                    height={300}
                  />*/}
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Box>
      </Grow>
    </>
  );
};
