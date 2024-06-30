import React, { useState, useEffect } from 'react';
import { Anggolt, Kiaron, Grish, Inferno, Anggolt430, Kiaron430, Grish430, Inferno430 } from '../js/knightside.js';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import '../css/pages.css';

function KnightServer() {
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
      localStorage.setItem(`webhookURL_${boss}`, url);
      return updatedURLs;
    });
  };

  const calculateNextSpawn = (deadTime, interval) => {
    const deadDate = new Date(deadTime);
    const nextSpawn = new Date(deadDate);
    nextSpawn.setHours(deadDate.getHours() + interval.hours);
    nextSpawn.setMinutes(deadDate.getMinutes() + interval.minutes);

    const nextSpawnInPHT = new Date(nextSpawn.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
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
      interval = { hours: 5, minutes: 0 };
      webhookURL = webhookURLs.Kiaron;
    } else if (Grish.includes(selectedBoss)) {
      interval = { hours: 6, minutes: 0 };
      webhookURL = webhookURLs.Grish;
    } else if (Inferno.includes(selectedBoss)) {
      interval = { hours: 7, minutes: 0 };
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
      console.error('Invalid boss selection or webhook URL not specified.');
      return;
    }

    const nextSpawnTime = calculateNextSpawn(spawnTime, interval);
    notifyDiscord(webhookURL, nextSpawnTime);
    setSelectedBoss('');
    setSpawnTime('');
  };

  const notifyDiscord = (webhookURL, nextSpawnTime) => {
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
      <h1>Battlefront Knight Server Boss Timer</h1>
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
            {[
              { label: 'Knight Anggolt', bosses: Anggolt, webhook: 'Anggolt' },
              { label: 'Knight Kiaron', bosses: Kiaron, webhook: 'Kiaron' },
              { label: 'Knight Grish', bosses: Grish, webhook: 'Grish' },
              { label: 'Knight Inferno', bosses: Inferno, webhook: 'Inferno' },
              { label: 'Enemy Side Anggolt', bosses: Anggolt430, webhook: 'Anggolt430' },
              { label: 'Enemy Side Kiaron', bosses: Kiaron430, webhook: 'Kiaron430' },
              { label: 'Enemy Side Grish', bosses: Grish430, webhook: 'Grish430' },
              { label: 'Enemy Side Inferno', bosses: Inferno430, webhook: 'Inferno430' }
            ].map((group, index) => (
              <TableRow key={index}>
                <TableCell>{group.label}</TableCell>
                <TableCell>
                  <Select value={selectedBoss} onChange={handleSelectChange} className="select">
                    <MenuItem disabled value=""><em>Select {group.label.split(' ')[1]}</em></MenuItem>
                    {group.bosses.map(boss => (
                      <MenuItem key={boss} value={boss}>{boss}</MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField type="datetime-local" value={spawnTime} onChange={handleTimeChange} className="text-field" />
                </TableCell>
                <TableCell>
                  <TextField
                    value={webhookURLs[group.webhook]}
                    onChange={(e) => handleWebhookURLChange(group.webhook, e.target.value)}
                    className="text-field"
                  />
                </TableCell>
                <TableCell className="button">
                  <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Calculate and Notify
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default KnightServer;
