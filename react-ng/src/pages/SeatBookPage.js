/**
 * Блок подключения модулей/импортов
 */
import React, {useState, useEffect} from 'react';
import Lottie from 'react-lottie';
import {
  Box,
  Container,
  Grid,
  Typography,
  Alert,
  Paper,
  Grow,
  Backdrop,
  CircularProgress,
  Divider,
  IconButton,
  Link,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  TextField,
  Snackbar,
} from '@mui/material';
// import {green, common} from '@mui/material/colors';
import axios from 'axios';
import {io} from 'socket.io-client';
// import moment from 'moment';
import {
  DirectionsCarOutlined,
  PhoneInTalkOutlined,
  WhatsApp,
  Telegram,
} from '@mui/icons-material';
import {Helmet} from 'react-helmet-async';
import animationData from './car_driving_landscape_qj.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const SOCKET = io('https://qjalti.ru');

const BASE_OBJECT = {
  front: {status: false, name: null},
  driver: {status: true, name: 'Гуриев Никита'},
  left_back: {status: false, name: null},
  center_back: {status: false, name: null},
  right_back: {status: false, name: null},
};

const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return false;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const setCookie = (name, value, days = 1) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export const SeatBook = () => {
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [bookClearDialog, setBookClearDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seatsData, setSeatsData] = useState(BASE_OBJECT);
  const [selectedSeat, setSelectedSeat] = useState(false);
  const [bookData, setBookData] = useState({});
  const [sbStatus, setSbStatus] = useState(false);
  const [sbMessage, setSbMessage] = useState('Возникла непредвиденная ошибка');
  const [sbType, setSbType] = useState('error');
  const [hasBooking, setHasBooking] = useState(false);
  const [bookCookie, setBookCookie] = useState(null);

  const selectData = async () => {
    try {
      setLoading(true);
      const RESPONSE = await axios.post('https://qjalti.ru/api/seat_book/select');
      if (RESPONSE.data.data.length) {
        setSeatsData(RESPONSE.data.data[0].data);
      } else {
        setSeatsData(BASE_OBJECT);
      }
      setLoading(false);
    } catch (err) {
      console.log('Error! ', err.message);
      console.log('Error! ', err);
    }
  };

  const checkCookie = () => {
    const BOOK_COOKIE = getCookie('bookedSeat');
    setHasBooking(false);
    if (typeof BOOK_COOKIE === 'string' && BOOK_COOKIE.length > 0) {
      setBookCookie(BOOK_COOKIE);
      setHasBooking(true);
    }
  };

  useEffect(() => {
    selectData().then(() => false);
    checkCookie();
  }, []);

  const confirmationDialogClose = () => {
    setConfirmationDialog(false);
    setSelectedSeat(false);
  };

  const updateData = async (newBookData) => {
    setConfirmationDialog(false);
    console.log(newBookData);
    await axios.post(
        'https://qjalti.ru/api/seat_book/update',
        newBookData,
    );
    setSelectedSeat(false);
    checkCookie();
    await selectData();
  };

  const showSnackBar = (message, type) => {
    setSbMessage(message);
    setSbType(type);
    setSbStatus(true);
  };

  const clearBook = async () => {
    setBookClearDialog(false);
    const NEW_BOOK_DATA = {
      data: {
        ...seatsData,
        [bookData.seatName]: {
          name: null,
          status: false,
        },
      },
      credentials: {
        passengerName: null,
        selectedSeat: bookCookie,
      },
    };
    await deleteCookie('bookedSeat');
    await updateData(NEW_BOOK_DATA);
    showSnackBar('Бронь успешно снята', 'success');
  };

  const BookClearDialog = () => {
    return (
      <Dialog
        open={bookClearDialog}
        onClose={() => {
          setBookClearDialog(false);
        }}
      >
        <DialogTitle>
          {'Отмена брони'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы действительно хотите отменить бронь?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color={'error'}
            onClick={() => {
              setBookClearDialog(false);
            }}
          >
            Отмена
          </Button>
          <Button
            onClick={clearBook}
            color={'success'}
            autoFocus
          >
            Снять бронь
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const ConfirmationDialog = () => {
    return (
      <Dialog
        open={confirmationDialog}
        onClose={confirmationDialogClose}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const passengerName = formJson.passengerName;

            if (typeof selectedSeat === 'string' && selectedSeat.length > 0) {
              setCookie('bookedSeat', selectedSeat, 1);
            }

            const NEW_BOOK_DATA = {
              data: {
                ...seatsData,
                [bookData.seatName]: {
                  name: passengerName.trim(),
                  status: true,
                },
              },
              credentials: {
                passengerName,
                selectedSeat,
              },
            };
            await updateData(NEW_BOOK_DATA);
            showSnackBar('Место успешно забронированно', 'success');
            confirmationDialogClose();
          },
        }}
        agreeButtonHandler={updateData}
        disagreeButtonHandler={confirmationDialogClose}
        agreeButtonText={'Забронировать'}
        disagreeButtonText={'Отмена'}
        dialogTitle={'Бронирование'}
      >
        <DialogTitle>Бронирование</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите Вашу фамилию и имя:
          </DialogContentText>
          <TextField
            autoFocus
            required
            id={'name'}
            name={'passengerName'}
            label={'Фамилия и имя'}
            type={'text'}
            fullWidth
            variant={'standard'}
            sx={{mt: 2}}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={confirmationDialogClose}
            color={'error'}
          >
            Отмена
          </Button>
          <Button
            type={'submit'}
            color={'success'}
          >
            Забронировать
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  SOCKET.on('seatBooked', () => {
    selectData().then(() => false);
    checkCookie();
  });

  const DRIVERS = [
    {
      id: 1,
      name: 'Гуриев Никита',
      number: '79883857654',
      tg: 'qjalti',
      car: {
        color: 'Белая',
        number: 'О 746 ХН 123',
        model: 'KIA RIO',
      },
    },
    // {
    //   id: 2,
    //   name: 'Виталий Светашов',
    //   number: '79265786314',
    //   car: {
    //     color: 'Серебристая',
    //     number: 'Т 244 АР 790',
    //     model: 'Mazda CX-7',
    //   },
    //   seats: {
    //     driver: false,
    //     front: true,
    //     left_back: true,
    //     center_back: true,
    //     right_back: true,
    //   },
    // },
    // {
    //   id: 3,
    //   name: 'Александра Воронина',
    //   number: '79091666647',
    //   car: {
    //     color: 'Чёрная',
    //     number: 'О 000 ОО 000',
    //     model: 'Nissan X-Trail',
    //   },
    //   seats: {
    //     driver: false,
    //     front: true,
    //     left_back: true,
    //     center_back: true,
    //     right_back: true,
    //   },
    // },
  ];

  const bookSeat = (driverId, seatName) => {
    if (hasBooking && bookCookie !== seatName) {
      showSnackBar(
          'Нельзя забронировать больше одного места',
          'error',
      );
      return false;
    }

    if (!hasBooking && seatsData[seatName].status) {
      showSnackBar(
          'Место уже забронированно. Выберите другое место',
          'error',
      );
      return false;
    }

    const BOOK_DATA = {
      driverId,
      seatName,
    };

    setSelectedSeat(seatName);
    setBookData(BOOK_DATA);

    if (!hasBooking) {
      setConfirmationDialog(true);
    }

    if (hasBooking && bookCookie === seatName) {
      setBookClearDialog(true);
    }
  };

  const sbClose = () => {
    setSbStatus(false);
  };

  return (
    <>
      <Helmet>
        {/* Базовая информация */}
        <title>Бронирование мест в машине — легко и быстро</title>
        <meta name="title"
          content="Бронирование мест в машине — легко и быстро"/>
        <meta name="description"
          content="Выбирай машину, смотри доступные места и бронируй онлайн. Удобно, быстро и прозрачно — поездки без лишних вопросов!"/>

        {/* Open Graph для соцсетей */}
        <meta property="og:type" content="website"/>
        <meta property="og:title"
          content="Бронирование мест в машине — легко и быстро"/>
        <meta property="og:description"
          content="Выбирай машину, смотри доступные места и бронируй онлайн. Удобно, быстро и прозрачно — поездки без лишних вопросов!"/>
        <meta property="og:url" content="https://qjalti.ru/seat_book"/>
        <meta property="og:image"
          content="https://qjalti.ru/car-booking-preview.webp"/>
        <meta property="og:locale" content="ru_RU"/>
        <meta property="og:site_name" content="qjalti.ru"/>

        {/* Twitter-карточка */}
        <meta name="twitter:card" content="summary_large_image"/>
        <meta name="twitter:title"
          content="Бронирование мест в машине — легко и быстро"/>
        <meta name="twitter:description"
          content="Выбирай машину, смотри доступные места и бронируй онлайн. Удобно, быстро и прозрачно — поездки без лишних вопросов!"/>
        <meta name="twitter:image"
          content="https://qjalti.ru/car-booking-preview.webp"/>

        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Бронирование мест в машине — легко и быстро",
            "url": "https://qjalti.ru/seat_book",
            "description": "Выбирай машину, смотри доступные места и бронируй онлайн. Удобно, быстро и прозрачно — поездки без лишних вопросов!",
            "publisher": {
                "@type": "Person",
                "name": "Никита Гуриев"
            }
        }`}
        </script>
      </Helmet>

      <Snackbar
        onClose={sbClose}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        open={sbStatus}
        autoHideDuration={6000}
      >
        <Alert
          variant={'standard'}
          severity={sbType}
        >
          {sbMessage}
        </Alert>
      </Snackbar>
      <BookClearDialog/>
      <ConfirmationDialog/>
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color={'inherit'}/>
      </Backdrop>
      <Grow
        in
      >
        <Box>
          <Paper>
            <Container>
              <Grid
                container
                direction={'row'}
              >
                <Grid item xs={12}>
                  <Grid
                    container
                    direction={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Grid item>
                      <Lottie
                        options={defaultOptions}
                        width={216}
                        speed={2}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    spacing={1}
                    sx={{py: 2}}
                  >
                    <Grid item>
                      <DirectionsCarOutlined
                        sx={{width: '2rem', height: '2rem'}}/>
                    </Grid>
                    <Grid
                      item
                    >
                      <Typography
                        variant={'h4'}
                      >
                        Seat Book
                      </Typography>
                    </Grid>
                  </Grid>
                  {DRIVERS.map((driver) => (
                    <Box
                      sx={{my: 1}}
                      key={driver.id}
                    >
                      <Typography
                        variant={'h6'}
                      >
                        Машина №{driver.id}
                      </Typography>
                      <Typography>
                        Водитель: {driver.name}
                      </Typography>
                      <Typography>
                        {driver.car.color}, {driver.car.model}, {driver.car.number}
                      </Typography>
                      <Grid
                        container
                        spacing={1}
                      >
                        <Grid
                          item
                        >
                          <Link
                            href={`tel:+${driver.number}`}
                            target={'_blank'}
                          >
                            <IconButton
                              color={'primary'}
                              size={'small'}
                            >
                              <PhoneInTalkOutlined/>
                            </IconButton>
                          </Link>
                        </Grid>
                        <Grid
                          item
                        >
                          <Link
                            href={`https://wa.me/${driver.number}`}
                            target={'_blank'}
                          >
                            <IconButton
                              color={'success'}
                              size={'small'}
                            >
                              <WhatsApp/>
                            </IconButton>
                          </Link>
                        </Grid>
                        <Grid
                          item
                        >
                          <Link
                            href={`https://t.me/${driver.tg}`}
                            target={'_blank'}
                          >
                            <IconButton
                              color={'info'}
                              size={'small'}
                            >
                              <Telegram/>
                            </IconButton>
                          </Link>
                        </Grid>
                      </Grid>
                      <Grid
                        sx={{mt: 1}}
                        spacing={1}
                        container
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <Grid
                          item
                          xs={6}
                        >
                          <Paper
                            sx={{p: 1}}
                            variant={'outlined'}
                          >
                            <Button
                              fullWidth
                              variant={'outlined'}
                              color={'error'}
                              sx={{
                                py: 1,
                                overflowWrap: 'break-word',
                              }}
                              size={'small'}
                              onClick={() => {
                                showSnackBar('Место водителя бронировать нельзя', 'error');
                              }}
                            >
                              Водитель
                            </Button>
                            {seatsData.driver.name &&
                            <Alert
                              severity={'info'}
                              sx={{mt: 1}}
                              icon={false}
                            >
                              {seatsData.driver.name}
                            </Alert>
                            }
                          </Paper>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                        >
                          <Paper
                            sx={{p: 1}}
                            variant={'outlined'}
                          >
                            <Button
                              variant={'outlined'}
                              color={
                                seatsData.front.status ?
                                  'error' :
                                  'success'
                              }
                              fullWidth
                              onClick={() => {
                                bookSeat(driver.id, 'front');
                              }}
                              sx={{
                                py: 1,
                                overflowWrap: 'break-word',
                              }}
                              size={'small'}
                            >
                              Спереди
                            </Button>
                            {seatsData.front.name &&
                            <Alert
                              severity={'info'}
                              sx={{mt: 1}}
                              icon={false}
                            >
                              {seatsData.front.name}
                            </Alert>
                            }
                          </Paper>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={1}
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{mt: 1, mb: 4}}
                      >
                        <Grid
                          item
                          xs={4}
                        >
                          <Paper
                            sx={{p: 1}}
                            variant={'outlined'}
                          >
                            <Button
                              variant={'outlined'}
                              fullWidth
                              color={
                                seatsData.left_back.status ?
                                  'error' :
                                  'success'
                              }
                              onClick={() => {
                                bookSeat(driver.id, 'left_back');
                              }}
                              sx={{
                                py: 1,
                                overflowWrap: 'break-word',
                              }}
                              size={'small'}
                            >
                              Сзади слева
                            </Button>
                            {seatsData.left_back.name &&
                            <Alert
                              severity={'info'}
                              sx={{mt: 1}}
                              icon={false}
                            >
                              {seatsData.left_back.name}
                            </Alert>
                            }
                          </Paper>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                        >
                          <Paper
                            sx={{p: 1}}
                            variant={'outlined'}
                          >
                            <Button
                              variant={'outlined'}
                              fullWidth
                              color={
                                seatsData.center_back.status ?
                                  'error' :
                                  'success'
                              }
                              onClick={() => {
                                bookSeat(driver.id, 'center_back');
                              }}
                              sx={{
                                py: 1,
                                overflowWrap: 'break-word',
                              }}
                              size={'small'}
                            >
                              Сзади центр
                            </Button>
                            {seatsData.center_back.name &&
                            <Alert
                              severity={'info'}
                              sx={{mt: 1}}
                              icon={false}
                            >
                              {seatsData.center_back.name}
                            </Alert>
                            }
                          </Paper>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                        >
                          <Paper
                            sx={{p: 1}}
                            variant={'outlined'}
                          >
                            <Button
                              fullWidth
                              variant={'outlined'}
                              color={
                                seatsData.right_back.status ?
                                  'error' :
                                  'success'
                              }
                              onClick={() => {
                                bookSeat(driver.id, 'right_back');
                              }}
                              sx={{
                                py: 1,
                                overflowWrap: 'break-word',
                              }}
                              size={'small'}
                            >
                              Сзади справа
                            </Button>
                            {seatsData.right_back.name &&
                            <Alert
                              severity={'info'}
                              sx={{mt: 1}}
                              icon={false}
                            >
                              {seatsData.right_back.name}
                            </Alert>
                            }
                          </Paper>
                        </Grid>
                      </Grid>
                      {driver.id !== DRIVERS.length &&
                      <Divider/>
                      }
                    </Box>
                  ))}
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </Box>
      </Grow>
    </>
  );
};
