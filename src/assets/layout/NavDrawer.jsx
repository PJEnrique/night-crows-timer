import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../firebase'; // Assuming you have initialized firestore in firebase.js
import { styled } from '@mui/material/styles'; // Import styled function

const StyledAppBar = styled(AppBar)(({ theme, isScrolled }) => ({
  backgroundColor: isScrolled ? '#282a36' : '#393c4d',
  transition: 'background-color 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const StyledTypography = styled(Typography)({
  flexGrow: 1,
  textDecoration: 'none',
  color: 'inherit',
});

const StyledButton = styled(Button)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#5f6273',
  },
});

const NavBar = ({ onClose }) => {
  const [expirationDate, setExpirationDate] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { signOut, currentUser } = useAuth(); // Access the signOut function and currentUser from AuthContext

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchExpirationDate = async () => {
      if (currentUser) {
        try {
          const userDoc = await firestore.collection('users').doc(currentUser.uid).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            setExpirationDate(userData.expirationDate.toDate().toLocaleString()); // Convert Firestore timestamp to local string
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchExpirationDate();
  }, [currentUser]);

  const handleSignOut = async () => {
    try {
      await signOut();
      // Optionally redirect after sign out
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <StyledAppBar position="fixed" isScrolled={isScrolled}>
      <Toolbar>
        <StyledTypography variant="h6" component={Link} to="/" style={{ flexGrow: 1 }}>
          NIGHTCROWS TINDAHAN
        </StyledTypography>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StyledButton component={Link} to="/user/rookServer" style={{ marginRight: '10px' }}>
            RookServer
          </StyledButton>
          <StyledButton component={Link} to="/user/bishopServer" style={{ marginRight: '10px' }}>
            BishopServer
          </StyledButton>
          <StyledButton component={Link} to="/user/knightServer" style={{ marginRight: '10px' }}>
            KnightServer
          </StyledButton>
          <StyledButton onClick={handleSignOut}>
            Sign Out
          </StyledButton>
          {expirationDate && (
            <Typography variant="body2" style={{ color: 'inherit', marginLeft: '10px' }}>
              Expires on: {expirationDate}
            </Typography>
          )}
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;
