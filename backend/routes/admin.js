const express = require('express');
const fs = require('fs');
const path = require('path');
const { authenticateAdmin, generateToken, ADMIN_PASSWORD } = require('../middleware/auth');
const upload = require('../utils/fileUpload');

const router = express.Router();

// Admin login
router.post('/login', (req, res) => {
  const { password } = req.body;
  
  if (password === ADMIN_PASSWORD) {
    const token = generateToken({ admin: true });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Get content (protected)
router.get('/get-content', authenticateAdmin, (req, res) => {
  try {
    const content = JSON.parse(fs.readFileSync(path.join(__dirname, '../content.json'), 'utf8'));
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load content' });
  }
});

// Update content (protected)
router.post('/update-content', authenticateAdmin, (req, res) => {
  try {
    const newContent = req.body;
    fs.writeFileSync(path.join(__dirname, '../content.json'), JSON.stringify(newContent, null, 2));
    res.json({ success: true, message: 'Content updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// Upload image (protected)
router.post('/upload', authenticateAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ 
    success: true, 
    message: 'File uploaded successfully',
    filename: req.file.filename,
    url: fileUrl
  });
});

// Delete image (protected)
router.delete('/delete-image', authenticateAdmin, (req, res) => {
  const { filename } = req.body;
  
  if (!filename) {
    return res.status(400).json({ error: 'Filename is required' });
  }
  
  const filePath = path.join(__dirname, '../../uploads', filename);
  
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ success: true, message: 'File deleted successfully' });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

// Get contact messages (protected)
router.get('/contacts', authenticateAdmin, (req, res) => {
  try {
    const contacts = JSON.parse(fs.readFileSync(path.join(__dirname, '../contact.json'), 'utf8'));
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load contacts' });
  }
});

// Delete contact message (protected)
router.delete('/contact/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  
  try {
    const contacts = JSON.parse(fs.readFileSync(path.join(__dirname, '../contact.json'), 'utf8'));
    const filteredContacts = contacts.filter(contact => contact.id !== id);
    
    fs.writeFileSync(path.join(__dirname, '../contact.json'), JSON.stringify(filteredContacts, null, 2));
    res.json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Get uploaded files list (protected)
router.get('/files', authenticateAdmin, (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../../uploads');
    const files = fs.readdirSync(uploadsDir).map(filename => ({
      filename,
      url: `/uploads/${filename}`,
      size: fs.statSync(path.join(uploadsDir, filename)).size
    }));
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load files' });
  }
});

module.exports = router;