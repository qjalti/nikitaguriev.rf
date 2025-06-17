/**
 * Блок подключения модулей/импортов
 */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
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
} from '@mui/material';
// import CheckIcon from '@mui/icons-material/Check';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import {green, common} from '@mui/material/colors';
import axios from 'axios';
import {io} from 'socket.io-client';
import parse from 'html-react-parser';
import {Dialog} from '../components/ui-kit/Dialog.js';
// import moment from 'moment';
import {
  DirectionsCar,
  PhoneInTalkOutlined,
  WhatsApp,
} from '@mui/icons-material';

const SOCKET = io('https://qjalti.ru');

// const ACTUALITY_DATE = '11.03.2024';

export const SeatBook = () => {
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const [detailsDialog, setDetailsDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [elements, setElements] = useState([]);
  const [elementId, setElementId] = useState();
  // const [elementStatus, setElementStatus] = useState();
  // const [detailsDialogData, setDDData] = useState();

  const selectData = async () => {
    try {
      setLoading(true);
      // const RESPONSE = await axios.post('https://qjalti.ru/api/wishlist/select');
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
    setElementId('');
    setConfirmationDialog(false);
  };

  const detailsDialogClose = () => {
    setDetailsDialog(false);
  };

  /* const detailsHandler = () => {
    setDetailsDialog(true);
  };*/

  /* const checkBoxHandler = async (evt) => {
    setElementId(evt.target.id);
    setElementStatus(evt.target.checked);
    setConfirmationDialog(true);
  };*/

  const updateData = async () => {
    setConfirmationDialog(false);
    await axios.post(
        'https://qjalti.ru/api/wishlist/update',
        {
          elementId,
        // elementStatus,
        },
    );
  };

  /* const showDetails = (data) => {
    detailsHandler();
    const SELECTED_ELEMENT = elements.find((item) => item.id === data.id);
    setDDData(SELECTED_ELEMENT);
  };*/

  const ConfirmationDialog = () => {
    return (
      <Dialog
        open={confirmationDialog}
        onClose={confirmationDialogClose}
        dialogTitle={'Подтверждение'}
        dialogContentText={'Вы действительно хотите вычеркнуть этот пункт?'}
        agreeButtonText={'Да'}
        disagreeButtonText={'Отмена'}
        agreeButtonHandler={updateData}
        disagreeButtonHandler={confirmationDialogClose}
      />
    );
  };

  const DetailsDialog = ({data}) => {
    const DialogContentText = () => (
      <Grid container>
        <Grid item>
          <Grid container>
            <Grid item>
              <Typography variant={'h6'}>
                {parse(data.title)}
              </Typography>
            </Grid>
          </Grid>
          {
            data.links && (() => {
              const LINKS = JSON.parse(data.links);
              return (
                <>
                  <Divider textAlign={'left'}>Ссылки:</Divider>
                  {LINKS.map((el) => (
                    <Grid item key={el.id}>
                      <Link
                        href={el.link}
                        target={'_blank'}
                      >
                        {el.title}
                      </Link> <sup>[{el.id}]</sup>
                    </Grid>
                  ))}
                </>
              );
            })()
          }

          {
            data.hints && (
              <Grid container>
                <Grid item>
                  <Divider textAlign={'left'}>Комментарий:</Divider>
                  <Typography>
                    {parse(data.hints)}
                  </Typography>
                </Grid>
              </Grid>
            )
          }

          {
            !data.hints && !data.links && (
              <Typography>Подробностей нет</Typography>
            )
          }
        </Grid>
      </Grid>
    );

    if (data) {
      return (
        <Dialog
          open={detailsDialog}
          onClose={detailsDialogClose}
          dialogTitle={'Подробности'}
          dialogContentText={<DialogContentText/>}
          agreeButtonText={'ОК'}
          disagreeButtonText={'Закрыть'}
          agreeButtonHandler={detailsDialogClose}
          disagreeButtonHandler={detailsDialogClose}
        />
      );
    }
  };

  DetailsDialog.propTypes = {
    data: PropTypes.object,
  };

  SOCKET.on('elementChanged', () => {
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
      seats: {
        driver: false,
        front: true,
        left_back: true,
        left_center: true,
        left_right: true,
      },
    },
    {
      id: 2,
      name: 'Виталий Светашов',
      number: '79265786314',
      car: {
        color: 'Серебристая',
        number: 'Т 244 АР 790',
        model: 'Mazda CX-7',
      },
      seats: {
        driver: false,
        front: true,
        left_back: true,
        left_center: true,
        left_right: true,
      },
    },
    {
      id: 3,
      name: 'Александра Воронина',
      number: '79091666647',
      car: {
        color: 'Чёрная',
        number: 'О 000 ОО 000',
        model: 'Nissan X-Trail',
      },
      seats: {
        driver: false,
        front: true,
        left_back: true,
        left_center: true,
        left_right: true,
      },
    },
  ];

  return (
    <>
      <ConfirmationDialog/>
      {/* <DetailsDialog data={detailsDialogData}/>*/}
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
                sx={{py: 2}}
              >
                <Grid item xs={12}>
                  <Grid
                    container
                    direction={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    spacing={2}
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
                            color={
                              driver.seats.driver ?
                                'success' :
                                'error'
                            }
                            fullWidth
                          >
                            Водитель
                          </Button>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                        >
                          <Button
                            color={
                              driver.seats.front ?
                                'success' :
                                'error'
                            }
                            fullWidth
                          >
                            Спереди
                          </Button>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{my: 2}}
                      >
                        <Grid
                          item
                          xs={4}
                        >
                          <Button
                            fullWidth
                            color={
                              driver.seats.left_back ?
                                'success' :
                                'error'
                            }
                          >
                            Сзади слева
                          </Button>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                        >
                          <Button
                            fullWidth
                            color={
                              driver.seats.left_center ?
                                'success' :
                                'error'
                            }
                          >
                            Сзади центр
                          </Button>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                        >
                          <Button
                            fullWidth
                            color={
                              driver.seats.left_right ?
                                'success' :
                                'error'
                            }
                          >
                            Сзади справа
                          </Button>
                        </Grid>
                      </Grid>
                      {driver.id !== 3 &&
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
