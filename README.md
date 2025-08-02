# URL Shortener

Simple URL shortener app.

## Run

```
npm run install-all
npm start
```

Open http://localhost:3000

## Features

- Create short URLs
- View statistics
- Custom shortcodes

## Screenshots

### Main Interface
![Main Interface](screenshots/main-interface.png)
*Clean, modern UI with URL shortening form*

### URL Creation Success
![URL Creation Success](screenshots/url-creation-success.png)
*Successfully created shortened URL with expiration details*

### Redirect Test
![Redirect Test](screenshots/redirect-test.png)
*Shortened URL redirects to original destination*

## API Endpoints

- `POST /shorturls` - Create short URL
- `GET /shorturls/:shortcode` - Get statistics  
- `GET /:shortcode` - Redirect to original URL
- `GET /health` - Health check
- `GET /terms` - Terms and conditions 