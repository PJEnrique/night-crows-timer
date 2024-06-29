import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SwipeableDrawer, List, ListItemButton, ListItemText, IconButton, Typography, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../context/AuthContext';
import { firestore } from '../firebase'; // Assuming you have initialized firestore in firebase.js


const NavDrawer = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  const [expirationDate, setExpirationDate] = useState('');
  const { signOut, currentUser } = useAuth(); // Access the signOut function and currentUser from AuthContext

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

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
    if (onClose && !open) {
      onClose();
    }
  };

  const handleOpenDrawer = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Optionally redirect after sign out
    } catch (error) {
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpenDrawer} color="inherit" aria-label="open drawer">
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div style={{ width: 250, padding: '20px' }}>
          <List>
            <ListItemButton component={Link} to="/user/rookServer" onClick={handleCloseDrawer}>
              <ListItemText primary="RookServer" />
            </ListItemButton>
            <ListItemButton component={Link} to="/user/bishopServer" onClick={handleCloseDrawer}>
              <ListItemText primary="BishopServer" />
            </ListItemButton>
            <ListItemButton component={Link} to="/user/knightServer" onClick={handleCloseDrawer}>
              <ListItemText primary="KnightServer" />
            </ListItemButton>
          </List>
          <Divider />
          <List>
            <ListItemButton onClick={handleSignOut}>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </List>
          {expirationDate && (
            <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
              Expires on: {expirationDate}
            </Typography>
          )}
        </div>
      </SwipeableDrawer>
    </>
  );
};

export default NavDrawer;
