import React, { useState, useEffect } from 'react';
import { Anggolt, Kiaron, Grish, Inferno, Anggolt430, Kiaron430, Grish430, Inferno430 } from '../js/rookside.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import '../css/pages.css';

function RookServer() {
  const [selectedBoss, setSelectedBoss] = useState('');
  const [spawnTime, setSpawnTime] = useState('');
  const [webhookURLs, setWebhookURLs] = useState({
    Anggolt: localStorage.getItem('webhookURL_Anggolt') || '',
    Kiaron: localStorage.getItem('webhookURL_Kiaron') || '',
    Grish: localStorage.getItem('webhookURL_Grish') || '',
    Inferno: localStorage.getItem('webhookURL_Inferno') || '',
    Anggolt430: localStorage.getItem('webhookURL_Anggolt430') || '',
    Kiaron430: localStorage.getItem('webhookURL_Kiaron430') || '',
    Grish430: localStorage.getItem('webhookURL_Grish430') || '',
    Inferno430: localStorage.getItem('webhookURL_Inferno430') || ''
  });

  useEffect(() => {
    // Load webhook URLs from localStorage when the component mounts
    setWebhookURLs({
      Anggolt: localStorage.getItem('webhookURL_Anggolt') || '',
      Kiaron: localStorage.getItem('webhookURL_Kiaron') || '',
      Grish: localStorage.getItem('webhookURL_Grish') || '',
      Inferno: localStorage.getItem('webhookURL_Inferno') || '',
      Anggolt430: localStorage.getItem('webhookURL_Anggolt430') || '',
      Kiaron430: localStorage.getItem('webhookURL_Kiaron430') || '',
      Grish430: localStorage.getItem('webhookURL_Grish430') || '',
      Inferno430: localStorage.getItem('webhookURL_Inferno430') || ''
    });
  }, []);

  const handleSelectChange = (event) => {
    setSelectedBoss(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSpawnTime(event.target.value);
  };

  const handleWebhookURLChange = (boss, url) => {
    setWebhookURLs(prevURLs => {
      const updatedURLs = { ...prevURLs, [boss]: url };
      // Save the updated URL in localStorage
      localStorage.setItem(`webhookURL_${boss}`, url);
      return updatedURLs;
    });
  };

  const calculateNextSpawn = (deadTime, interval) => {
    const deadDate = new Date(deadTime);
    const nextSpawn = new Date(deadDate);
    nextSpawn.setHours(deadDate.getHours() + interval.hours);
    nextSpawn.setMinutes(deadDate.getMinutes() + interval.minutes);

    // Convert to Philippine Time
    const nextSpawnInPHT = new Date(nextSpawn.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));

    // Format date to string
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      timeZone: 'Asia/Manila', 
      timeZoneName: 'short' 
    };
    const formattedDate = nextSpawnInPHT.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const handleSubmit = () => {
    let interval;
    let webhookURL = '';

    if (Anggolt.includes(selectedBoss)) {
      interval = { hours: 4, minutes: 0 };
      webhookURL = webhookURLs.Anggolt;
    } else if (Kiaron.includes(selectedBoss)) {
      interval = { hours: 4, minutes: 0 };
      webhookURL = webhookURLs.Kiaron;
    } else if (Grish.includes(selectedBoss)) {
      interval = { hours: 4, minutes: 0 };
      webhookURL = webhookURLs.Grish;
    } else if (Inferno.includes(selectedBoss)) {
      interval = { hours: 4, minutes: 0 };
      webhookURL = webhookURLs.Inferno;
    } else if (Anggolt430.includes(selectedBoss)) {
      interval = { hours: 4, minutes: 30 };
      webhookURL = webhookURLs.Anggolt430;
    } else if (Kiaron430.includes(selectedBoss)) {
      interval = { hours: 5, minutes: 30 };
      webhookURL = webhookURLs.Kiaron430;
    } else if (Grish430.includes(selectedBoss)) {
      interval = { hours: 6, minutes: 30 };
      webhookURL = webhookURLs.Grish430;
    } else if (Inferno430.includes(selectedBoss)) {
      interval = { hours: 7, minutes: 30 };
      webhookURL = webhookURLs.Inferno430;
    } else {
      // Handle case where no boss is selected or webhook URL is not specified
      console.error('Invalid boss selection or webhook URL not specified.');
      return;
    }

    const nextSpawnTime = calculateNextSpawn(spawnTime, interval);
    notifyDiscord(webhookURL, nextSpawnTime);
  
    // Reset selection and time after notifying
    setSelectedBoss('');
    setSpawnTime('');
  };

  const notifyDiscord = (webhookURL, nextSpawnTime) => {
    // Post notification to Discord
    axios.post(webhookURL, {
      content: `The next spawn time for ${selectedBoss} is at ${nextSpawnTime} Philippine Time`
    }).then(response => {
      console.log('Notification sent successfully', response);
    }).catch(error => {
      console.error('Error sending notification', error);
    });
  };

  return (
    <div className="container">
      <h1>Boss Timer Rook</h1>
      <TableContainer component={Paper} className="table-container">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Boss Category</TableCell>
              <TableCell>Boss</TableCell>
              <TableCell>Dead Time</TableCell>
              <TableCell>Webhook URL</TableCell>
              <TableCell>Next Spawn Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>unity Anggolt</TableCell>
              <TableCell>
                <Select value={selectedBoss} onChange={handleSelectChange} className="select">
                  <MenuItem disabled value=""><em>Select Anggolt</em></MenuItem>
                  {Anggolt.map(boss => (
                    <MenuItem key={boss} value={boss}>{boss}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField type="datetime-local" value={spawnTime} onChange={handleTimeChange} className="text-field" />
              </TableCell>
              <TableCell>
                <TextField
                  value={webhookURLs.Anggolt}
                  onChange={(e) => handleWebhookURLChange('Anggolt', e.target.value)}
                  className="text-field"
                />
              </TableCell>
              <TableCell className="button">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Calculate and Notify
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>unity Kiaron</TableCell>
              <TableCell>
                <Select value={selectedBoss} onChange={handleSelectChange} className="select">
                  <MenuItem disabled value=""><em>Select Kiaron</em></MenuItem>
                  {Kiaron.map(boss => (
                    <MenuItem key={boss} value={boss}>{boss}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField type="datetime-local" value={spawnTime} onChange={handleTimeChange} className="text-field" />
              </TableCell>
              <TableCell>
                <TextField
                  value={webhookURLs.Kiaron}
                  onChange={(e) => handleWebhookURLChange('Kiaron', e.target.value)}
                  className="text-field"
                />
              </TableCell>
              <TableCell className="button">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Calculate and Notify
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>unity Grish</TableCell>
              <TableCell>
                <Select value={selectedBoss} onChange={handleSelectChange} className="select">
                  <MenuItem disabled value=""><em>Select Grish</em></MenuItem>
                  {Grish.map(boss => (
                    <MenuItem key={boss} value={boss}>{boss}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField type="datetime-local" value={spawnTime} onChange={handleTimeChange} className="text-field" />
              </TableCell>
              <TableCell>
                <TextField
                  value={webhookURLs.Grish}
                  onChange={(e) => handleWebhookURLChange('Grish', e.target.value)}
                  className="text-field"
                />
              </TableCell>
              <TableCell className="button">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Calculate and Notify
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>unity Inferno</TableCell>
              <TableCell>
                <Select value={selectedBoss} onChange={handleSelectChange} className="select">
                  <MenuItem disabled value=""><em>Select Inferno</em></MenuItem>
                  {Inferno.map(boss => (
                    <MenuItem key={boss} value={boss}>{boss}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField type="datetime-local" value={spawnTime} onChange={handleTimeChange} className="text-field" />
              </TableCell>
              <TableCell>
                <TextField
                  value={webhookURLs.Inferno}
                  onChange={(e) => handleWebhookURLChange('Inferno', e.target.value)}
                  className="text-field"
                />
              </TableCell>
              <TableCell className="button">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Calculate and Notify
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>enemy side Anggolt</TableCell>
              <TableCell>
                <Select value={selectedBoss} onChange={handleSelectChange} className="select">
                  <MenuItem disabled value=""><em>Select Anggolt 4:30</em></MenuItem>
                  {Anggolt430.map(boss => (
                    <MenuItem key={boss} value={boss}>{boss}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField type="datetime-local" value={spawnTime} onChange={handleTimeChange} className="text-field" />
              </TableCell>
              <TableCell>
                <TextField
                  value={webhookURLs.Anggolt430}
                  onChange={(e) => handleWebhookURLChange('Anggolt430', e.target.value)}
                  className="text-field"
                />
              </TableCell>
              <TableCell className="button">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Calculate and Notify
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>enemy side Kiaron</TableCell>
              <TableCell>
                <Select value={selectedBoss} onChange={handleSelectChange} className="select">
                  <MenuItem disabled value=""><em>Select Kiaron 4:30</em></MenuItem>
                  {Kiaron430.map(boss => (
                    <MenuItem key={boss} value={boss}>{boss}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField type="datetime-local" value={spawnTime} onChange={handleTimeChange} className="text-field" />
              </TableCell>
              <TableCell>
                <TextField
                  value={webhookURLs.Kiaron430}
                  onChange={(e) => handleWebhookURLChange('Kiaron430', e.target.value)}
                  className="text-field"
                />
              </TableCell>
              <TableCell className="button">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Calculate and Notify
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>enemy side Grish</TableCell>
              <TableCell>
                <Select value={selectedBoss} onChange={handleSelectChange} className="select">
                  <MenuItem disabled value=""><em>Select Grish 4:30</em></MenuItem>
                  {Grish430.map(boss => (
                    <MenuItem key={boss} value={boss}>{boss}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField type="datetime-local" value={spawnTime} onChange={handleTimeChange} className="text-field" />
              </TableCell>
              <TableCell>
                <TextField
                  value={webhookURLs.Grish430}
                  onChange={(e) => handleWebhookURLChange('Grish430', e.target.value)}
                  className="text-field"
                />
              </TableCell>
              <TableCell className="button">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Calculate and Notify
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>enemy side Inferno</TableCell>
              <TableCell>
                <Select value={selectedBoss} onChange={handleSelectChange} className="select">
                  <MenuItem disabled value=""><em>Select Inferno 4:30</em></MenuItem>
                  {Inferno430.map(boss => (
                    <MenuItem key={boss} value={boss}>{boss}</MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField type="datetime-local" value={spawnTime} onChange={handleTimeChange} className="text-field" />
              </TableCell>
              <TableCell>
                <TextField
                  value={webhookURLs.Inferno430}
                  onChange={(e) => handleWebhookURLChange('Inferno430', e.target.value)}
                  className="text-field"
                />
              </TableCell>
              <TableCell className="button">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Calculate and Notify
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RookServer;
