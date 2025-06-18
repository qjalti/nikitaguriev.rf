/**
 * Блок подключения модулей/импортов
 */
import React, {useState, useEffect} from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  // Alert,
  Paper,
  Grow,
  // AlertTitle,
  // List,
  // ListItem,
  // ListItemButton,
  // ListItemText,
  // ListItemIcon,
  // Checkbox,
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
} from '@mui/material';
// import CheckIcon from '@mui/icons-material/Check';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import {green, common} from '@mui/material/colors';
import axios from 'axios';
import {io} from 'socket.io-client';
// import parse from 'html-react-parser';
// import moment from 'moment';
import {
  DirectionsCar,
  PhoneInTalkOutlined,
  WhatsApp,
} from '@mui/icons-material';

const SOCKET = io('https://qjalti.ru');

const BASE_OBJECT = {
  front: {status: false, name: null},
  driver: {status: true, name: 'Никита'},
  left_back: {status: false, name: null},
  center_back: {status: false, name: null},
  right_back: {status: false, name: null},
};

export const SeatBook = () => {
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [seatsData, setSeatsData] = useState(BASE_OBJECT);
  const [bookData, setBookData] = useState({});
  // const [elements, setElements] = useState([]);
  // const [elementId, setElementId] = useState();
  // const [elementStatus, setElementStatus] = useState();
  // const [detailsDialogData, setDDData] = useState();

  const selectData = async () => {
    try {
      setLoading(true);
      const RESPONSE = await axios.post('https://qjalti.ru/api/seat_book/select');
      if (RESPONSE.data.data.length) {
        setSeatsData(RESPONSE.data.data[0].data);
      } else {
        setSeatsData(BASE_OBJECT);
      }
      // console.log(DATA);
      // setElements(RESPONSE.data.data);
      setLoading(false);
    } catch (err) {
      console.log('Error! ', err.message);
      console.log('Error! ', err);
    }
  };

  useEffect(() => {
    selectData().then(() => false);
  }, []);

  const confirmationDialogClose = () => {
    setConfirmationDialog(false);
  };

  /* const checkBoxHandler = async (evt) => {
              setElementId(evt.target.id);
              setElementStatus(evt.target.checked);
              setConfirmationDialog(true);
            };*/

  const updateData = async (newBookData) => {
    setConfirmationDialog(false);
    await axios.post(
        'https://qjalti.ru/api/seat_book/update',
        {
          newBookData,
        },
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
            const NEW_BOOK_DATA = {
              ...seatsData,
              [bookData.seatName]: {
                name: passengerName,
                status: true,
              },
            };
            await updateData(NEW_BOOK_DATA);
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
              Введите Ваше имя:
          </DialogContentText>
          <TextField
            autoFocus
            required
            id={'name'}
            name={'passengerName'}
            label={'Имя'}
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
  });

  const DRIVERS = [
    {
      id: 1,
      name: 'Никита Гуриев',
      number: '79883857654',
      car: {
        color: 'Белая',
        number: 'О 746 ХН 123',
        model: 'Kia Rio',
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
    const BOOK_DATA = {
      driverId,
      seatName,
    };

    setBookData(BOOK_DATA);
    setConfirmationDialog(true);
  };

  return (
    <>
      <ConfirmationDialog/>
      <Backdrop
        sx={{
          // color: common.white,
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
                    spacing={2}
                    sx={{py: 4}}
                  >
                    <Grid item>
                      <DirectionsCar sx={{width: '2rem', height: '2rem'}}/>
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
                      sx={{my: 2}}
                      key={driver.id}
                    >
                      <Typography
                        variant={'h6'}
                      >
                          Машина №{driver.id}
                      </Typography>
                      <Typography>
                          Водитель: {driver.name}
                        <Link href={`tel:+${driver.number}`}>
                          <IconButton
                            sx={{mx: 0.5}}
                            color={'primary'}
                            size={'small'}
                          >
                            <PhoneInTalkOutlined/>
                          </IconButton>
                        </Link>
                        <Link
                          href={`https://wa.me/${driver.number}`}
                        >
                          <IconButton
                            color={'success'}
                            size={'small'}
                          >
                            <WhatsApp/>
                          </IconButton>
                        </Link>
                      </Typography>
                      <Typography>
                        {driver.car.color}, {driver.car.model}, {driver.car.number}
                      </Typography>
                      <Grid
                        sx={{mt: 1}}
                        spacing={2}
                        container
                        justifyContent={'center'}
                        alignItems={'center'}
                      >
                        <Grid
                          item
                          xs={6}
                        >
                          <Button
                            fullWidth
                            variant={'outlined'}
                            disabled
                            sx={{py: 2}}
                          >
                              Водитель
                            {seatsData.driver.name &&
                              <span>({seatsData.driver.name})</span>
                            }
                          </Button>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                        >
                          <Button
                            color={
                                seatsData.front.status ?
                                  'error' :
                                  'success'
                            }
                            fullWidth
                            variant={'outlined'}
                            onClick={() => {
                              bookSeat(driver.id, 'front');
                            }}
                            sx={{py: 2}}
                            disabled={seatsData.front.status}
                          >
                              Спереди
                            {seatsData.front.name &&
                              <span>({seatsData.front.name})</span>
                            }
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={2}
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{mt: 1, mb: 4}}
                      >
                        <Grid
                          item
                          xs={4}
                        >
                          <Button
                            fullWidth
                            variant={'outlined'}
                            color={
                                seatsData.left_back.status ?
                                  'error' :
                                  'success'
                            }
                            onClick={() => {
                              bookSeat(driver.id, 'left_back');
                            }}
                            sx={{py: 2}}
                            disabled={seatsData.left_back.status}
                          >
                              Сзади слева
                            {seatsData.left_back.name &&
                              <span>({seatsData.left_back.name})</span>
                            }
                          </Button>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                        >
                          <Button
                            fullWidth
                            variant={'outlined'}
                            color={
                                seatsData.center_back.status ?
                                  'error' :
                                  'success'
                            }
                            onClick={() => {
                              bookSeat(driver.id, 'center_back');
                            }}
                            sx={{py: 2}}
                            disabled={seatsData.center_back.status}
                          >
                              Сзади центр
                            {seatsData.center_back.name &&
                              <span>({seatsData.center_back.name})</span>
                            }
                          </Button>
                        </Grid>
                        <Grid
                          item
                          xs={4}
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
                            sx={{py: 2}}
                            disabled={seatsData.right_back.status}
                          >
                              Сзади справа
                            {seatsData.right_back.name &&
                              <span>({seatsData.right_back.name})</span>
                            }
                          </Button>
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
}
;
