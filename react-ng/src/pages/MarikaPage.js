/**
 * Блок подключения модулей/импортов
 */
import React from "react";
import {
  createTheme,
  Box,
  // ThemeProvider,
  Container,
  Grid,
  Typography,
  Alert,
  AlertTitle,
  Paper,
  Grow,
} from "@mui/material";
import moment from "moment";
import "moment/locale/ru";

/**
 * Блок кастомизации MUI
 */
/* const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565C0',
    },
  },
});*/

/**
 * Блок настройки MOMENT
 */
moment.locale("ru");
const CURRENT_DATE = moment();

/**
 * Начало общения в Instagram
 */
const FIRST_MESSAGE = [2021, 7, 26, 20, 40];
const FIRST_MESSAGE_DATE = moment(FIRST_MESSAGE);
const YEARS_FMSG = CURRENT_DATE.diff(FIRST_MESSAGE_DATE, "years");
FIRST_MESSAGE_DATE.add(YEARS_FMSG, "years");
const MONTHS_FMSG = CURRENT_DATE.diff(FIRST_MESSAGE_DATE, "months");
FIRST_MESSAGE_DATE.add(MONTHS_FMSG, "months");
const DAYS_FMSG = CURRENT_DATE.diff(FIRST_MESSAGE_DATE, "days");
FIRST_MESSAGE_DATE.add(DAYS_FMSG, "days");
const HOURS_FMSG = CURRENT_DATE.diff(FIRST_MESSAGE_DATE, "hours");
FIRST_MESSAGE_DATE.add(HOURS_FMSG, "hours");

/**
 * Первая встреча
 */
const FIRST_MEET = [2022, 1, 15, 19, 0];
const FIRST_MEET_DATE = moment(FIRST_MEET);
const YEARS_FMEET = CURRENT_DATE.diff(FIRST_MEET_DATE, "years");
FIRST_MEET_DATE.add(YEARS_FMEET, "years");
const MONTHS_FMEET = CURRENT_DATE.diff(FIRST_MEET_DATE, "months");
FIRST_MEET_DATE.add(MONTHS_FMEET, "months");
const DAYS_FMEET = CURRENT_DATE.diff(FIRST_MEET_DATE, "days");
FIRST_MEET_DATE.add(DAYS_FMEET, "days");
const HOURS_FMEET = CURRENT_DATE.diff(FIRST_MEET_DATE, "hours");
FIRST_MEET_DATE.add(HOURS_FMEET, "hours");

/**
 * Расстались
 */
const BROKE_UP_DATE = [2022, 3, 19, 19, 25];
const BROKE_UP_MOMENT = moment(BROKE_UP_DATE);
const YEARS_BUP = CURRENT_DATE.diff(BROKE_UP_MOMENT, "years");
BROKE_UP_MOMENT.add(YEARS_BUP, "years");
const MONTHS_BUP = CURRENT_DATE.diff(BROKE_UP_MOMENT, "months");
BROKE_UP_MOMENT.add(MONTHS_BUP, "months");
const DAYS_BUP = CURRENT_DATE.diff(BROKE_UP_MOMENT, "days");
BROKE_UP_MOMENT.add(DAYS_BUP, "days");
const HOURS_BUP = CURRENT_DATE.diff(BROKE_UP_MOMENT, "hours");
BROKE_UP_MOMENT.add(HOURS_BUP, "hours");

const TIMERS = [
  {
    id: 0,
    title: "Начало общения в Instagram",
    years: YEARS_FMSG,
    months: MONTHS_FMSG,
    days: DAYS_FMSG,
    hours: HOURS_FMSG,
    date: FIRST_MESSAGE,
  },
  {
    id: 1,
    title: "Первая встреча",
    years: YEARS_FMEET,
    months: MONTHS_FMEET,
    days: DAYS_FMEET,
    hours: HOURS_FMEET,
    date: FIRST_MEET,
  },
  {
    id: 2,
    title: "Расстались",
    years: YEARS_BUP,
    months: MONTHS_BUP,
    days: DAYS_BUP,
    hours: HOURS_BUP,
    date: BROKE_UP_DATE,
  },
];

export const Marika = () => {
  return (
    <Grow in>
      <Box sx={{ flexGrow: 1 }}>
        <Paper sx={{ pb: 2 }}>
          <Container>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {TIMERS.map((el) => (
                <Grid item xs={12} md={6} key={el.id}>
                  <Box>
                    <Alert severity="info">
                      <AlertTitle>{el.title}</AlertTitle>
                      <Grid container spacing={2} sx={{ textAlign: "center" }}>
                        <Grid item>
                          <Typography variant="body2">ГОД</Typography>
                          <Typography variant="h6">{el.years}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2">МЕС</Typography>
                          <Typography variant="h6">{el.months}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2">ДНИ</Typography>
                          <Typography variant="h6">{el.days}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2">ЧАС</Typography>
                          <Typography variant="h6">{el.hours}</Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ textAlign: "center" }}>
                        <Grid item>
                          <Typography variant="caption">
                            (С{" "}
                            {moment(el.date).format("Do MMMM YYYY, kk:mm:ss")})
                          </Typography>
                        </Grid>
                      </Grid>
                    </Alert>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Paper>
      </Box>
    </Grow>
  );
};
