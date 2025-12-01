import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Avatar,
  Link,
} from '@mui/material';
import {grey} from '@mui/material/colors';
import favicon from './programmer.webp';
import {Link as RouterLink} from 'react-router-dom';

/**
 * NavBar
 * @return {JSX.Element}
 * @constructor
 */
export const NavBar = () => {
  /**
   * Проверка на то, что сейчас декабрь
   */
  const isDecember = new Date().getMonth() === 11;
  return (
    <Box>
      <AppBar position={'static'}>
        <Container>
          <Toolbar sx={isDecember ? {pt: 8, pb: 2} : {}}>
            <Avatar
              variant={'square'}
              src={favicon}
              alt={'Логотип сайта'}
              sx={{mr: 2}}
            />
            <Link
              component={RouterLink}
              to={'/'}
              sx={{color: grey[50], textDecoration: 'none'}}
            >
              <Typography
                variant={'h6'}
              >
                qjalti
              </Typography>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
