/**
 * Блок подключения модулей
 */
/**
 * React
 */
import React, {useContext, useEffect} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {Context} from '../context';

/**
 * MUI
 */
import {
  Box,
  Container,
  Grid,
  Link, Paper, Grow, IconButton, ButtonBase, Typography,
} from '@mui/material';

/**
 * Material icons
 */
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
// import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
// import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import CalendarMonthOutlinedIcon from
  '@mui/icons-material/CalendarMonthOutlined';
/* import LocalGasStationOutlinedIcon from
  '@mui/icons-material/LocalGasStationOutlined';*/

export const Index = () => {
  const {openSpeedDial} = useContext(Context);

  const location = useLocation();
  useEffect(() => {
    if (location.search.includes('openSpeedDial=true')) {
      openSpeedDial();
    }
  }, [location]);

  const LINKS = [
    {
      link_title: 'Контакты',
      action: openSpeedDial,
      icon: <ContactsOutlinedIcon fontSize={'large'}/>,
    },
    {
      link_title: 'Резюме (HH)',
      link_href: 'https://hh.ru/resume/c4715b44ff0bfe67390039ed1f63394f725256',
      icon: <PictureAsPdfOutlinedIcon fontSize={'large'}/>,
    },
    /* {
      link_title: 'Калькулятор',
      to: '/calc',
      icon: <CalculateOutlinedIcon fontSize={'large'}/>,
    },*/
    {
      link_title: 'ГуриевОлег.рф',
      link_href: 'https://xn--b1abbgbpxxo3a.xn--p1ai/',
      icon: <OpenInNewOutlinedIcon fontSize={'large'}/>,
    }, /*
    {
      link_title: 'ГПБЖ «Хвостики»',
      link_href: 'https://khvostiki.ru/',
      icon: <OpenInNewOutlinedIcon fontSize={'large'}/>,
    },*/
    {
      link_title: 'LinkedIn',
      link_href: 'https://www.linkedin.com/in/nikitaguriev/',
      icon: <OpenInNewOutlinedIcon fontSize={'large'}/>,
    },
    {
      link_title: 'Звуки из игр (SFG)',
      to: '/sfg',
      icon: <VolumeUpOutlinedIcon fontSize={'large'}/>,
    }, /*
    {
      link_title: 'Создать счетчик',
      to: '/timer_creator',
      icon: <TimerOutlinedIcon fontSize={'large'}/>,
    },*/
    {
      link_title: 'Советник фильмов',
      to: '/choose_film',
      icon: <TheatersOutlinedIcon fontSize={'large'}/>,
    },
    {
      link_title: 'Звездные системы',
      to: '/star_systems',
      icon: <AutoAwesomeOutlinedIcon fontSize={'large'}/>,
    },
    {
      link_title: 'Дата в стиле TES',
      to: '/TES',
      icon: <CalendarMonthOutlinedIcon fontSize={'large'}/>,
    }, /*
    {
      link_title: 'Калькулятор бензина',
      to: '/gas_calculator',
      icon: <LocalGasStationOutlinedIcon fontSize={'large'}/>,
    },*/
  ];

  let linksCounter = 0;

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
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              sx={{p: 2}}
            >

              {LINKS.map((el) => {
                linksCounter++;
                return (
                  <Grid item xs={6} sm={4} key={linksCounter}>
                    <Box sx={{textAlign: 'center'}}>
                      <ButtonBase
                        sx={{py: 1, px: 2, borderRadius: 2}}
                        focusRipple
                      >
                        {el.to &&
                        <Link
                          component={RouterLink}
                          to={el.to}
                          underline="none"
                        >
                          <Grid
                            container
                            justifyContent={'center'}
                            alignItems={'center'}
                          >
                            <Grid item>
                              <IconButton
                                disableRipple
                                aria-label={'Contacts'}
                                color={'primary'}
                              >
                                {el.icon}
                              </IconButton>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            justifyContent={'center'}
                            alignItems={'center'}
                          >
                            <Grid item>
                              <Typography variant={'button'}>
                                {el.link_title}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Link>
                        }
                        {el.link_href &&
                        <Link
                          href={el.link_href}
                          underline={'none'}
                          target={'_blank'}
                        >
                          <Grid
                            container
                            justifyContent={'center'}
                            alignItems={'center'}
                          >
                            <Grid item>
                              <IconButton
                                disableRipple
                                aria-label={'Contacts'}
                                color={'primary'}
                                size={'large'}
                              >
                                {el.icon}
                              </IconButton>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            justifyContent={'center'}
                            alignItems={'center'}
                          >
                            <Grid item>
                              <Typography variant={'button'}>
                                {el.link_title}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Link>
                        }
                        {el.action &&
                        <Link
                          component={RouterLink}
                          to={'/'}
                          underline="none"
                          onClick={el.action}
                        >
                          <Grid
                            container
                            justifyContent={'center'}
                            alignItems={'center'}
                          >
                            <Grid item>
                              <IconButton
                                disableRipple
                                aria-label={'Contacts'}
                                color={'primary'}
                                size={'large'}
                              >
                                {el.icon}
                              </IconButton>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            justifyContent={'center'}
                            alignItems={'center'}
                          >
                            <Grid item>
                              <Typography variant={'button'}>
                                {el.link_title}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Link>
                        }
                      </ButtonBase>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Paper>
      </Box>
    </Grow>
  );
};
