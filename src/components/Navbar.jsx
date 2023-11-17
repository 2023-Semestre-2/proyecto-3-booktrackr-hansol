
import { AppBar, Toolbar, Typography, InputBase, Box, useMediaQuery, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import './Navbar.css';

const Navbar = () => {
  const user = localStorage.getItem('user');
  const username = user ? JSON.parse(user).username + "dsadasadasdasdasdasdasd" : 'Usuario';

  if (username === 'Usuario') {
    window.location.href = '/login';
  }

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {!isMobile && (
          <Typography variant="h6" className="navbar-title">
            BookTrackr
          </Typography>
        )}
        <Box className="navbar-search">
          <InputBase
            placeholder="Buscar…"
            inputProps={{ 'aria-label': 'search' }}
            className="search-input"
          />
          <SearchIcon className="search-icon" />
        </Box>
        <Box className="navbar-user">
          <Typography variant="body1" noWrap>
            {username}
          </Typography>
          <AccountCircle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
