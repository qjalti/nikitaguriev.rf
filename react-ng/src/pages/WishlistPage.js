/**
 * Блок подключения модулей/импортов
 */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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
  // IconButton,
  Link,
} from "@mui/material";
// import CheckIcon from '@mui/icons-material/Check';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import {green, common} from '@mui/material/colors';
import axios from "axios";
import { io } from "socket.io-client";
import parse from "html-react-parser";
import { Dialog } from "../components/ui-kit/Dialog.js";
// import moment from 'moment';

const SOCKET = io("https://qjalti.ru");

// const ACTUALITY_DATE = '11.03.2024';

export const Wishlist = () => {
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
      console.log("Error! ", err.message);
      console.log("Error! ", err);
    }
  };

  useEffect(() => {
    selectData().then(() => false);
  }, []);

  const confirmationDialogClose = () => {
    setElementId("");
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
    await axios.post("https://qjalti.ru/api/wishlist/update", {
      elementId,
      // elementStatus,
    });
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
        dialogTitle={"Подтверждение"}
        dialogContentText={"Вы действительно хотите вычеркнуть этот пункт?"}
        agreeButtonText={"Да"}
        disagreeButtonText={"Отмена"}
        agreeButtonHandler={updateData}
        disagreeButtonHandler={confirmationDialogClose}
      />
    );
  };

  const DetailsDialog = ({ data }) => {
    const DialogContentText = () => (
      <Grid container>
        <Grid item>
          <Grid container>
            <Grid item>
              <Typography variant={"h6"}>{parse(data.title)}</Typography>
            </Grid>
          </Grid>
          {data.links &&
            (() => {
              const LINKS = JSON.parse(data.links);
              return (
                <>
                  <Divider textAlign={"left"}>Ссылки:</Divider>
                  {LINKS.map((el) => (
                    <Grid item key={el.id}>
                      <Link href={el.link} target={"_blank"}>
                        {el.title}
                      </Link>{" "}
                      <sup>[{el.id}]</sup>
                    </Grid>
                  ))}
                </>
              );
            })()}

          {data.hints && (
            <Grid container>
              <Grid item>
                <Divider textAlign={"left"}>Комментарий:</Divider>
                <Typography>{parse(data.hints)}</Typography>
              </Grid>
            </Grid>
          )}

          {!data.hints && !data.links && (
            <Typography>Подробностей нет</Typography>
          )}
        </Grid>
      </Grid>
    );

    if (data) {
      return (
        <Dialog
          open={detailsDialog}
          onClose={detailsDialogClose}
          dialogTitle={"Подробности"}
          dialogContentText={<DialogContentText />}
          agreeButtonText={"ОК"}
          disagreeButtonText={"Закрыть"}
          agreeButtonHandler={detailsDialogClose}
          disagreeButtonHandler={detailsDialogClose}
        />
      );
    }
  };

  DetailsDialog.propTypes = {
    data: PropTypes.object,
  };

  SOCKET.on("elementChanged", () => {
    selectData().then(() => false);
  });

  return (
    <>
      <ConfirmationDialog />
      {/* <DetailsDialog data={detailsDialogData}/>*/}
      <Backdrop
        sx={{
          // color: common.white,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color={"inherit"} />
      </Backdrop>
      <Grow in>
        <Box sx={{ flexGrow: 1 }}>
          <Paper>
            <Container>
              <Grid container direction={"row"} sx={{ py: 2 }}>
                <Grid item>
                  <Grid container direction={"row"}>
                    <Grid item>
                      <Typography variant={"h4"}>
                        Список желаний переехал:
                      </Typography>
                      <Link
                        href={"https://bit.ly/3P4nIu2"}
                        target={"_blank"}
                        variant={"h4"}
                      >
                        Список желаний
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {/* <Grid
                container
                direction={'row'}
                sx={{py: 2}}
              >
                <Grid item>
                  <Grid
                    container
                    direction={'row'}
                  >
                    <Grid item>
                      <Typography variant={'h6'}>
                        Список желаний
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction={'row'}
                    sx={{pt: 2}}
                  >
                    <Grid item sx={{width: '100%'}}>
                      <Alert severity={'success'}>
                        <Typography>
                          Актуально на {ACTUALITY_DATE}
                        </Typography>
                      </Alert>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction={'row'}
                    sx={{pt: 2}}
                  >
                    <Grid item sx={{width: '100%'}}>
                      <Alert severity={'warning'}>
                        <AlertTitle>
                          Внимание!
                        </AlertTitle>
                        <Typography>
                          Пожалуйста, если Вы уже решили, что выбрать
                          отметьте это в списке, чтобы не возникало ситуаций,
                          что купили одно и то же
                        </Typography>
                      </Alert>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction={'row'}
                    sx={{pt: 2}}
                  >
                    <Grid item sx={{width: '100%'}}>
                      <Alert severity={'info'}>
                        <AlertTitle>
                          Для чего нужен список желаний?
                        </AlertTitle>
                        <Typography>
                          Сюда я добавляю, то, что хочу в будущем купить себе,
                          либо в чем я заинтересован. Если Вы не знаете что мне
                          подарить (напр. на день рождения), то можете выбрать
                          что-то из этого списка
                        </Typography>
                      </Alert>
                    </Grid>
                    <Grid item>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>*/}
              {/* <Grid
                container
                direction={'row'}
                sx={{py: 2}}
              >
                <Grid item>
                  <Grid
                    container
                    direction={'row'}
                  >
                    <Grid item>
                      <Typography variant={'h6'}>
                        Интересы
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    direction={'row'}
                    sx={{pt: 2}}
                  >
                    <Grid item sx={{width: '100%'}}>
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton disableRipple>
                            <ListItemIcon>
                              <CheckIcon color={'success'}/>
                            </ListItemIcon>
                            <ListItemText sx={{color: green[800]}}>
                              Космическая тематика, астрономия
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton disableRipple>
                            <ListItemIcon>
                              <CheckIcon color={'success'}/>
                            </ListItemIcon>
                            <ListItemText sx={{color: green[800]}}>
                              Светящиеся предметы
                              (напр. <strong>адресная</strong> светодиодная
                              лента)
                            </ListItemText>
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>*/}
              {/* <Divider/>*/}
              {/* <Grid
                container
                direction={'row'}
                sx={{py: 2}}
              >
                <Grid item>
                  <Grid
                    container
                    direction={'row'}
                    justifyContent={'start'}
                    alignItems={'center'}
                    sx={{pt: 2}}
                  >
                    {
                      elements &&
                      elements.map((el) => {
                        const UPDATE_DATE = moment(el.last_update).fromNow();
                        return (
                          <React.Fragment key={el.id}>
                            <Grid item xs={12}>
                              <List>
                                <ListItem
                                  disablePadding
                                  secondaryAction={
                                    <IconButton
                                      edge={'end'}
                                      aria-label={'Details'}
                                      color={'warning'}
                                      onClick={() => {
                                        showDetails(el);
                                      }}
                                    >
                                      <InfoOutlinedIcon/>
                                    </IconButton>
                                  }
                                >
                                  <ListItemButton disableRipple>
                                    <ListItemIcon>
                                      <Checkbox
                                        onClick={checkBoxHandler}
                                        checked={el.checked}
                                        id={`element_${el.id}`}
                                      />
                                    </ListItemIcon>
                                    <ListItemText
                                      sx={{
                                        textDecoration:
                                          el.checked ?
                                            'line-through' :
                                            'none',
                                      }}
                                    >
                                      {parse(el.title)} <sup>
                                      (изм. {UPDATE_DATE})
                                    </sup>
                                    </ListItemText>
                                  </ListItemButton>
                                </ListItem>
                              </List>
                            </Grid>
                            <Divider/>
                          </React.Fragment>
                        );
                      })
                    }
                  </Grid>
                </Grid>
              </Grid>*/}
            </Container>
          </Paper>
        </Box>
      </Grow>
    </>
  );
};
