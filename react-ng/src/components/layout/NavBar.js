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
import favicon from './programmer.png';
import {Link as RouterLink} from 'react-router-dom';

/**
 * NavBar
 * @return {JSX.Element}
 * @constructor
 */
export const NavBar = () => {
  return (
    <Box>
      <AppBar position={'static'}>
        <Container>
          <Toolbar>
            <Avatar
              variant={'square'}
              src={favicon}
              alt={'Логотип сайта'}
              sx={{mr: 2}}
            />
            <Link
              component={RouterLink}
              to={'/'}
            >
              <Typography
                variant={'h6'}
                sx={{color: grey[50], textDecoration: 'none'}}
              >
                НикитаГуриев.рф
              </Typography>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
