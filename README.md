# Shishir Kandel - Full-Stack Portfolio Website

A complete portfolio website with content management system, featuring both a public-facing site and an admin panel for easy content updates.

## 🌟 Features

### Public Website
- **Responsive Design** - Works perfectly on all devices
- **Dynamic Content** - All content loaded from JSON API
- **Dark/Light Mode** - Theme toggle with persistence
- **Contact Form** - Form submissions stored in backend
- **Smooth Animations** - Professional transitions and effects
- **SEO Optimized** - Proper meta tags and semantic structure

### Admin Panel
- **Secure Login** - Password-protected admin access
- **Content Editor** - Edit all site content through forms
- **File Manager** - Upload and manage images/assets
- **Message Center** - View and manage contact form submissions
- **Theme Control** - Change site theme from admin panel
- **Real-time Stats** - Dashboard with file and message counts

## 📁 Project Structure

```
shishir-kandel/
├── index.html              # Public portfolio website
├── admin.html              # Admin panel (password protected)
├── style.css               # Frontend styles with theme support
├── script.js               # Frontend JavaScript and API calls
├── favicon.ico             # Site favicon
├── package.json            # Project dependencies
├── uploads/                # Directory for uploaded files
└── backend/
    ├── server.js           # Express.js server
    ├── content.json        # Site content data
    ├── contact.json        # Contact form submissions
    ├── middleware/
    │   └── auth.js         # Authentication middleware
    ├── routes/
    │   ├── admin.js        # Admin API routes
    │   └── contact.js      # Contact form routes
    └── utils/
        └── fileUpload.js   # File upload handling
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd shishir-kandel
npm install
```

### 2. Start the Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 3. Access the Website
- **Public Site**: http://localhost:5000
- **Admin Panel**: http://localhost:5000/admin
- **Default Admin Password**: `admin123`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
PORT=5000
JWT_SECRET=your-jwt-secret-key
ADMIN_PASSWORD=your-admin-password
```

### Default Settings
- **Admin Password**: `admin123` (change in production)
- **JWT Secret**: `your-secret-key-here` (change in production)
- **File Upload Limit**: 5MB per file
- **Allowed File Types**: Images only (jpg, png, gif, etc.)

## 📝 Content Management

### Admin Panel Access
1. Navigate to `/admin`
2. Enter admin password
3. Use the dashboard to manage content

### Content Editor
- **Site Settings**: Update title, logo, theme
- **Hero Section**: Main landing page content
- **About Section**: Personal information and stats
- **Contact Info**: Email, phone, location details

### File Manager
- Upload images by drag-and-drop or click
- View all uploaded files with sizes
- Delete unused files
- Files accessible at `/uploads/filename`

### Message Center
- View all contact form submissions
- Delete messages when processed
- Real-time message count in dashboard

## 🌐 Deployment

### Frontend (Netlify)
1. Build the frontend files:
   ```bash
   # Copy these files to Netlify:
   - index.html
   - style.css
   - script.js
   - favicon.ico
   ```

2. Update API_BASE in `script.js`:
   ```javascript
   const API_BASE = 'https://your-backend-url.com';
   ```

### Backend (Render/Railway/Replit)
1. Deploy the entire project to your hosting service
2. Set environment variables:
   - `PORT` (usually set automatically)
   - `JWT_SECRET` (generate a secure random string)
   - `ADMIN_PASSWORD` (set a strong password)

3. Ensure the backend serves static files and handles CORS

### Domain Setup
- Point your domain to the frontend (Netlify)
- Update the backend URL in frontend code
- Test both public site and admin panel

## 🔒 Security

### Admin Access
- Strong password required (change default password)
- JWT token authentication
- Session expires after 24 hours
- All admin routes protected

### File Upload Security
- Image files only
- 5MB file size limit
- Unique filename generation
- Secure file storage

### Data Protection
- Form validation on both client and server
- XSS protection through proper encoding
- CORS enabled for frontend domain

## 🎨 Customization

### Styling
Update CSS variables in `style.css`:
```css
:root {
    --primary-color: #9333ea;    /* Purple */
    --secondary-color: #ec4899;  /* Pink */
    --background-color: #ffffff; /* White */
    /* Add more custom colors */
}
```

### Content Structure
Modify `backend/content.json` structure for additional sections:
```json
{
  "sections": {
    "newSection": {
      "title": "New Section",
      "content": "Section content"
    }
  }
}
```

### Adding Features
1. Update content structure in `content.json`
2. Add form fields in `admin.html`
3. Update rendering logic in `script.js`
4. Add corresponding admin routes if needed

## 📱 Mobile Optimization

- Responsive grid layouts
- Touch-friendly navigation
- Optimized form inputs
- Fast loading on mobile networks
- Progressive enhancement

## 🔍 SEO Features

- Semantic HTML structure
- Meta tags for social sharing
- Descriptive page titles
- Proper heading hierarchy
- Image alt attributes
- Fast loading times

## 🐛 Troubleshooting

### Common Issues

**Admin panel not loading**
- Check if backend server is running
- Verify admin password
- Check browser console for errors

**File upload fails**
- Check file size (max 5MB)
- Ensure file is an image
- Verify uploads directory permissions

**Contact form not working**
- Check backend server status
- Verify API endpoints are accessible
- Check form validation

**Theme not saving**
- Clear browser localStorage
- Check admin authentication
- Verify content.json write permissions

### Debug Mode
Enable debug logging by adding to server.js:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

## 📦 Dependencies

### Backend
- **express**: Web server framework
- **cors**: Cross-origin resource sharing
- **multer**: File upload handling
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing (if needed)

### Frontend
- **Vanilla JavaScript**: No framework dependencies
- **Font Awesome**: Icons
- **Google Fonts**: Typography
- **Modern CSS**: Grid, Flexbox, CSS Variables

## 🤝 Support

For help with customization or deployment:
- Email: shishirxkandel@gmail.com
- LinkedIn: [Shishir Kandel](https://www.linkedin.com/in/shishirkandel/)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Shishir Kandel**