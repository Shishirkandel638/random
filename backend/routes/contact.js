const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Submit contact form
router.post('/submit', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  
  try {
    // Read existing contacts
    let contacts = [];
    const contactsPath = path.join(__dirname, '../contact.json');
    
    if (fs.existsSync(contactsPath)) {
      contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
    }
    
    // Create new contact entry
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    // Add to contacts array
    contacts.push(newContact);
    
    // Save to file
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message! I will get back to you soon.' 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

module.exports = router;