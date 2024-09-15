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
  Button
} from '@mui/material';
import {common} from '@mui/material/colors';
import axios from 'axios';
import {io} from 'socket.io-client';
import moment from 'moment';
// import {LineChart} from '@mui/x-charts/LineChart';

const SOCKET = io('https://xn--80aecimacmz9ato.xn--p1ai');

export const Temperature = () => {
  const [loading, setLoading] = useState(false);
  const [elements, setElements] = useState([]);
  const [xElements, setXElements] = useState([]);
  const [yElements, setYElements] = useState([]);

  const selectArduinoData = async () => {
    try {
      setLoading(true);
      const RESPONSE = await axios.post('https://xn--80aecimacmz9ato.xn--p1ai/api/arduino/select');
      setElements(RESPONSE.data.data[0].temperature);
      const TEMPERATURES = [];
      const TIMESTAMPS = [];
      RESPONSE.data.data.map((el) => {
        TEMPERATURES.push(el.temperature);
        TIMESTAMPS.push(el.id);
      });
      setXElements(TEMPERATURES);
      setYElements(TIMESTAMPS);
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
                        {elements}&deg;C
                      </Typography>
                      {/*<Button
                        onClick={() => {
                          axios.post('https://188.32.39.119:8090/led/on').then(r => false)
                        }}
                      >
                        Turn LED ON
                      </Button>
                      <Button
                        onClick={() => {
                          axios.post('https://188.32.39.119:8090/led/off').then(r => false)
                        }}
                      >
                        Turn LED OFF
                      </Button>*/}
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
                  {/*<LineChart
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
