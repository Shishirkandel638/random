const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '..')));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Serve main files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../admin.html'));
});

// API endpoint to get site content
app.get('/api/content', (req, res) => {
  try {
    const content = JSON.parse(fs.readFileSync(path.join(__dirname, 'content.json'), 'utf8'));
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load content' });
  }
});

// Handle favicon requests
app.get('/favicon.ico', (req, res) => {
  const faviconPath = path.join(__dirname, '../favicon.ico');
  if (fs.existsSync(faviconPath)) {
    res.sendFile(faviconPath);
  } else {
    // Default favicon
    res.status(404).send('Favicon not found');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Frontend: http://localhost:${PORT}`);
  console.log(`Admin: http://localhost:${PORT}/admin`);
});