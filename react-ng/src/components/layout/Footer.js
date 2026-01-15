import React, { useContext } from "react";
import { Context } from "../../context";

import {
  Box,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Backdrop,
} from "@mui/material";

import {
  Instagram,
  Telegram,
  WhatsApp,
  AlternateEmailOutlined,
  PhoneInTalkOutlined,
  YouTube,
  GitHub,
} from "@mui/icons-material";

const actions = [
  {
    icon: <PhoneInTalkOutlined />,
    name: "Phone",
    id: "phone",
    link: "tel:+79883857654",
  },
  {
    icon: <Telegram />,
    name: "Telegram",
    id: "telegram",
    link: "https://t.me/qjalti",
  },
  {
    icon: <WhatsApp />,
    name: "WhatsApp",
    id: "whatsapp",
    link: "https://wa.me/79883857654",
  },
  {
    icon: <AlternateEmailOutlined />,
    name: "EMail",
    id: "email",
    link: "mailto:stig.guriev@gmail.com",
  },
  {
    icon: <YouTube />,
    name: "YouTube",
    id: "youtube",
    link: "https://www.youtube.com/@qjalti",
  },
  {
    icon: <Instagram />,
    name: "Instagram",
    id: "instagram",
    link: "https://instagram.com/qjalti",
  },
  {
    icon: <GitHub />,
    name: "GitHub",
    id: "github",
    link: "https://github.com/qjalti",
  },
];

/**
 * Footer
 * @return {JSX.Element}
 */
export const Footer = () => {
  const { openSpeedDial, closeSpeedDial, speedDialState } = useContext(Context);

  const handleToggleSpeedDial = () => {
    if (speedDialState) {
      closeSpeedDial();
    } else {
      openSpeedDial();
    }
  };

  return (
    <div>
      <Backdrop open={speedDialState} />
      <SpeedDial
        ariaLabel={"Контакты"}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
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
              window.open(action.link, "_blank");
              closeSpeedDial();
            }}
          />
        ))}
      </SpeedDial>

      <Box sx={{ pb: 10 }} />

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
