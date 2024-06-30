import React from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const location = useLocation();
  const hideFooterOnPaths = ['/', '/register']; // Paths where footer should be hidden

  // Check if current path is in hideFooterOnPaths
  const shouldHideFooter = hideFooterOnPaths.includes(location.pathname);

  // Render null if shouldHideFooter is true
  if (shouldHideFooter) {
    return null;
  }

  return (
    <footer style={{ backgroundColor: '#282a36', color: '#fff', textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>
      <div style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, justifyContent: 'flex-start' }}>
          <a
            href="https://discord.gg/bFpXZAc7hn"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#fff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          >
            <FontAwesomeIcon icon={faDiscord} style={{ marginRight: '5px' }} />
            Discord
          </a>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <p style={{ margin: '0', fontSize: '14px' }}>ⓒ Jay Developer || All Rights Reserved</p>
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
    </footer>
  );
};


export default Footer;
