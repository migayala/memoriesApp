import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

// const pages = ['Create a new card',];
const settings = ['Dashboard', 'Logout'];
const customTheme = createTheme({
    palette: {
        secondary: {
            main: '#560319',
            contrastText: 'white'
        }
    }
});
const Header = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {setAnchorElUser(event.currentTarget)};
    const handleCloseUserMenu = () => {setAnchorElUser(null)};
    const navigate = useNavigate();
    const handleMenuClick = (e) => {
        if (e.target.innerText === 'Dashboard') {
            navigate('/')
        }
        else {
            axios
                .post('http://localhost:8000/api/users/logout', {}, {withCredentials: true})
                .then(() => {navigate('/login')})
                .catch(err => {console.log(err)});
        }
    };
    return (
        <div>
            <ThemeProvider theme={customTheme}>
                <AppBar position='static' color={'secondary'}>
                    <Container maxWidth='xl'>
                        <Toolbar disableGutters>
                        <FilterVintageIcon fontSize = 'large' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant='h6'
                            noWrap
                            component='a'
                            href='/'
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'Helvetica',
                                fontWeight: 700,
                                fontSize: 'calc(5px + 3vmin)',
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >Travel Memories
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Typography
                                variant='h6'
                                noWrap
                                component='a'
                                href='/'
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'Helvetica',
                                    fontWeight: 200,
                                    fontSize: 'calc(6px + 1vmin)',
                                    // letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >Brought to you by Amee, Miguel, Chris and Leo. With good spirit support from Josh, Zack, Caden and Peter!
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open settings'>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                            </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign='center' onClick={handleMenuClick}>
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                            </Menu>
                        </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
        </div>
    )
};

export default Header;