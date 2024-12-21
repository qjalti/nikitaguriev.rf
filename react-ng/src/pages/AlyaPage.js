/**
 * Блок подключения модулей/импортов
 */
import React from 'react';
import {
  Box,
  Container,
  Grid, Typography, Alert, AlertTitle, Paper, Grow,
} from '@mui/material';
import moment from 'moment';
import 'moment/locale/ru';

/**
 * Блок настройки MOMENT
 */
moment.locale('ru');
const CURRENT_DATE = moment();

/**
 * Восстановление общения
 */
const FIRST_MESSAGE = [2020, 0, 12, 0, 0];
const FIRST_MESSAGE_DATE = moment(FIRST_MESSAGE);
const YEARS_FMSG = CURRENT_DATE.diff(FIRST_MESSAGE_DATE, 'years');
FIRST_MESSAGE_DATE.add(YEARS_FMSG, 'years');
const MONTHS_FMSG = CURRENT_DATE.diff(FIRST_MESSAGE_DATE, 'months');
FIRST_MESSAGE_DATE.add(MONTHS_FMSG, 'months');
const DAYS_FMSG = CURRENT_DATE.diff(FIRST_MESSAGE_DATE, 'days');
FIRST_MESSAGE_DATE.add(DAYS_FMSG, 'days');
const HOURS_FMSG = CURRENT_DATE.diff(FIRST_MESSAGE_DATE, 'hours');
FIRST_MESSAGE_DATE.add(HOURS_FMSG, 'hours');

/**
 * Первое сообщение
 */
const VERY_FIRST_MSG = [2015, 1, 15, 0, 0];
const VERY_FIRST_MSG_DATE = moment(VERY_FIRST_MSG);
const YEARS_VFMSG = CURRENT_DATE.diff(VERY_FIRST_MSG_DATE, 'years');
VERY_FIRST_MSG_DATE.add(YEARS_VFMSG, 'years');
const MONTHS_VFMSG = CURRENT_DATE.diff(VERY_FIRST_MSG_DATE, 'months');
VERY_FIRST_MSG_DATE.add(MONTHS_VFMSG, 'months');
const DAYS_VFMSG = CURRENT_DATE.diff(VERY_FIRST_MSG_DATE, 'days');
VERY_FIRST_MSG_DATE.add(DAYS_VFMSG, 'days');
const HOURS_VFMSG = CURRENT_DATE.diff(VERY_FIRST_MSG_DATE, 'hours');
VERY_FIRST_MSG_DATE.add(HOURS_VFMSG, 'hours');

/**
 * Приезжает в Краснодар (июнь 2022)
 */
const REACH_KRR = [2022, 5, 19, 0, 0];
const REACH_KRR_DATE = moment(REACH_KRR);
const YEARS_RKRR = CURRENT_DATE.diff(REACH_KRR_DATE, 'years');
REACH_KRR_DATE.add(YEARS_RKRR, 'years');
const MONTHS_RKRR = CURRENT_DATE.diff(REACH_KRR_DATE, 'months');
REACH_KRR_DATE.add(MONTHS_RKRR, 'months');
const DAYS_RKRR = CURRENT_DATE.diff(REACH_KRR_DATE, 'days');
REACH_KRR_DATE.add(DAYS_RKRR, 'days');
const HOURS_RKRR = CURRENT_DATE.diff(REACH_KRR_DATE, 'hours');
REACH_KRR_DATE.add(HOURS_RKRR, 'hours');

export const Alya = () => {
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
              <Grid item xs={12} md={6}>
                <Box>
                  <Alert severity="info">
                    <AlertTitle>Восстановление общения</AlertTitle>
                    <Grid
                      container
                      spacing={2}
                      sx={{textAlign: 'center'}}
                    >
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            ГОД
                        </Typography>
                        <Typography
                          variant="h6"
                        >
                          {YEARS_FMSG}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            МЕС
                        </Typography>
                        <Typography
                          variant="h6"
                        >
                          {MONTHS_FMSG}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            ДНИ
                        </Typography>
                        <Typography
                          variant="h6"
                        >
                          {DAYS_FMSG}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            ЧАС
                        </Typography>
                        <Typography
                          variant="h6"
                        >
                          {HOURS_FMSG}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      sx={{textAlign: 'center'}}
                    >
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            (С {moment(FIRST_MESSAGE)
                              .format('Do MMMM YYYY, HH:mm:ss')})
                        </Typography>
                      </Grid>
                    </Grid>
                  </Alert>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Alert severity="info">
                    <AlertTitle>Первое сообщение</AlertTitle>
                    <Grid
                      container
                      spacing={2}
                      sx={{textAlign: 'center'}}
                    >
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            ГОД
                        </Typography>
                        <Typography
                          variant="h6"
                        >
                          {YEARS_VFMSG}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            МЕС
                        </Typography>
                        <Typography
                          variant="h6"
                        >
                          {MONTHS_VFMSG}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            ДНИ
                        </Typography>
                        <Typography
                          variant="h6"
                        >
                          {DAYS_VFMSG}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            ЧАС
                        </Typography>
                        <Typography
                          variant="h6"
                        >
                          {HOURS_VFMSG}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      sx={{textAlign: 'center'}}
                    >
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            (С {moment(VERY_FIRST_MSG)
                              .format('Do MMMM YYYY, HH:mm:ss')})
                        </Typography>
                      </Grid>
                    </Grid>
                  </Alert>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Alert severity="info">
                    <AlertTitle>Приезжает в Краснодар</AlertTitle>
                    <Grid
                      container
                      spacing={2}
                      sx={{textAlign: 'center'}}
                    >
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            ГОД
                        </Typography>
                        <Typography
                          variant="h6"
                        >
                          {YEARS_RKRR}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            МЕС
                        </Typography>
                        <Typography
                          variant="h6"
                        >
                          {MONTHS_RKRR}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            ДНИ
                        </Typography>
                        <Typography
                          variant="h6"
                        >
                          {DAYS_RKRR}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            ЧАС
                        </Typography>
                        <Typography
                          variant="h6"
                        >
                          {HOURS_RKRR}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      spacing={2}
                      sx={{textAlign: 'center'}}
                    >
                      <Grid item>
                        <Typography
                          variant="caption"
                        >
                            (С {moment(REACH_KRR)
                              .format('Do MMMM YYYY, HH:mm:ss')})
                        </Typography>
                      </Grid>
                    </Grid>
                  </Alert>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </Box>
    </Grow>
  );
};
