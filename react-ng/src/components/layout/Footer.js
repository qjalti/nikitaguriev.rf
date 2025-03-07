import React, {useContext} from 'react';
import {Context} from '../../context';

import {
  Box,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Backdrop,
  Typography,
  Link,
  Paper,
} from '@mui/material';

import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AlternateEmailOutlinedIcon
  from '@mui/icons-material/AlternateEmailOutlined';
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';

const actions = [
  {
    icon: <PhoneInTalkOutlinedIcon/>,
    name: 'Phone',
    id: 'phone',
    link: 'tel:+79883857654',
  },
  {
    icon: <TelegramIcon/>,
    name: 'Telegram',
    id: 'telegram',
    link: 'https://t.me/qjalti',
  },
  {
    icon: <WhatsAppIcon/>,
    name: 'WhatsApp',
    id: 'whatsapp',
    link: 'https://wa.me/79883857654',
  },
  {
    icon: <AlternateEmailOutlinedIcon/>,
    name: 'EMail',
    id: 'email',
    link: 'mailto:stig.guriev@gmail.com',
  },
  {
    icon: <InstagramIcon/>,
    name: 'Instagram',
    id: 'instagram',
    link: 'https://instagram.com/qjalti',
  },
  {
    icon: <YouTubeIcon/>,
    name: 'YouTube',
    id: 'youtube',
    link: 'https://www.youtube.com/@qjalti',
  },
];

/**
 * Footer
 * @return {JSX.Element}
 */
export const Footer = () => {
  const {openSpeedDial, closeSpeedDial, speedDialState} = useContext(Context);

  const handleToggleSpeedDial = () => {
    if (speedDialState) {
      closeSpeedDial();
    } else {
      openSpeedDial();
    }
  };

  return (
    <div>
      <Backdrop open={speedDialState}/>
      <SpeedDial
        ariaLabel={'Контакты'}
        sx={{position: 'fixed', bottom: 16 * 6, right: 16}}
        icon={<SpeedDialIcon/>}
        onClose={closeSpeedDial}
        open={speedDialState}
        onClick={handleToggleSpeedDial}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              window.open(action.link, '_blank');
              closeSpeedDial();
            }}
          />
        ))}
      </SpeedDial>

      <Box
        component={'footer'}
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          position: 'fixed',
          bottom: 0,
          minWidth: '100vw',
        }}
      >
        <Paper
          sx={{
            p: 4,
          }}
        >
          <Typography
            variant={'body2'}
            color={'text.secondary'}
            align={'center'}
          >
            <Link
              href={'https://www.flaticon.com/free-icons/programmer'}
              title={'programmer icons'}
            >
              Programmer icons created by Freepik - Flaticon
            </Link>
          </Typography>
        </Paper>
      </Box>

      <Box sx={{pb: 10}}/>

      {/* <Paper
        sx={{position: 'fixed', bottom: 0, left: 0, right: 0}}
        elevation={3}
      >
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction
            label="Главная"
            icon={<HomeOutlinedIcon/>}
            component={RouterLink}
            to="/"
          />
        </BottomNavigation>
      </Paper>*/}
    </div>
  );
};
