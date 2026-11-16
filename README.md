# Personal Portfolio Website

My responsive personal portfolio site. Server-rendered Node.js app built with Express and EJS, with a working contact form that emails messages to my inbox, deployed on Render.

**Live site:** `https://assignment2-fin5.onrender.com/`

## This web app has the following features:
 
- Four pages: **Home**, **About Me**, **Projects**, and **Contact Me**
- Shared layout, navigation bar, and footer using EJS layouts and partials
- Active-page highlighting in the navigation bar
- Responsive design with Bootstrap 5 and a custom teal theme built on CSS variables
- About page with an embedded intro video
- Contact form with server-side validation that sends email through Nodemailer
- Friendly success and error messages (the visitor's input is kept if sending fails)
- Custom 404 and 500 error page that hides technical details in production


## Tech Stack
 
| Area | Technology |
| --- | --- |
| Runtime | Node.js 18+ |
| Web framework | Express 4 |
| Templating | EJS with `express-ejs-layouts` |
| Styling | Bootstrap 5, Font Awesome 7, custom CSS |
| Email | Nodemailer (Gmail SMTP) |
| Configuration | dotenv |
| Logging | morgan |
| Hosting | Render |
 
## Project Structure
 
```
folio/
├── server.js               # Starts the HTTP server (port, startup error handling)
├── app.js                  # Express app: middleware, view engine, static files, routes, error handler
├── controllers/
│   └── index.js            # All routes, including the contact form POST handler
├── views/
│   ├── layout.ejs          # Base HTML shell wrapped around every page
│   ├── index.ejs           # Home page
│   ├── about.ejs           # About page with video
│   ├── projects.ejs        # Projects page
│   ├── contact.ejs         # Contact page and form
│   ├── error.ejs           # Error page
│   └── partials/
│       ├── header.ejs      # Navigation bar
│       └── footer.ejs      # Footer with social links
├── public/
│   ├── Assets/
│   │   ├── images/         # Profile photo
│   │   └── videos/         # Intro video
│   └── Content/app.css     # Custom styles
├── package.json
├── .env                    # Local secrets (never committed)
└── .gitignore
```
## Getting Started
 
### Prerequisites
 
- [Node.js](https://nodejs.org/) 18 or newer
- A Gmail account with 2-Step Verification enabled (required for the contact form)
### Installation
 
```bash
git clone <your-repo-url>
cd portfolio
npm install
```
 

### Run locally
 
```bash
npm start
```
 
Then open <http://localhost:4000>.
 
## Routes
 
| Method | Path | Description |
| --- | --- | --- |
| GET | `/` or `/home` | Home page |
| GET | `/about` | About page |
| GET | `/projects` | Projects page |
| GET | `/contact` | Contact page and form |
| POST | `/contact` | Validates the form and sends the email |
 
## How the Contact Form Works
 
1. The visitor submits their name, email, and message.
2. The server trims each value and limits its length (100, 200, and 5000 characters).
3. If any field is empty, the page re-renders with a 400 status and an error message.
4. Otherwise Nodemailer sends the email through Gmail. The visitor's address is set as `replyTo`, so replying goes straight to them. Line breaks are stripped from the subject to prevent header injection.
5. On success the visitor is redirected to `/contact?sent=1`, which shows a confirmation. This also prevents a duplicate send if the page is refreshed.
6. On failure the real error is logged on the server, and the visitor sees a friendly message with their input preserved.
## Static Files
 
`app.js` serves two kinds of static content:
 
- The `public/` folder, available at the site root (for example `/Content/app.css`).
- Only the specific packages the browser needs from `node_modules`: Bootstrap at `/bootstrap` and Font Awesome at `/@fortawesome`. The rest of `node_modules` is **not** exposed.
The layout loads Bootstrap's CSS before `app.css`, so custom styles can override Bootstrap, and loads a single script, `bootstrap.bundle.min.js`, which already includes Popper.
 
## Deployment on Render
 
1. Push the project to GitHub (without `.env`).
2. In Render, create a new **Web Service** and connect the repository.
3. Use these settings:
   | Setting | Value |
   | --- | --- |
   | Runtime | Node |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
4. In the **Environment** tab, add `MAIL_USER`, `MAIL_PASS`, and `MAIL_TO`. Optionally add `NODE_ENV=production` and `NODE_VERSION=22`. Do not set `PORT`; Render provides it.
5. Deploy. Each push to the connected branch triggers a new deploy.
### Troubleshooting
 
| Symptom | Likely cause and fix |
| --- | --- |
|||
| `Cannot find module '...'` | The package isn't in `package.json` dependencies. Run `npm install <name>`, then commit `package.json` and `package-lock.json` |
| Page loads but looks unstyled (no navbar or layout) | The Bootstrap CSS link is missing from `layout.ejs`, or `/bootstrap` isn't mounted in `app.js` |
| Contact form says the message couldn't be sent | `MAIL_USER`, `MAIL_PASS`, or `MAIL_TO` is missing or wrong in Render's Environment tab, or the app password was revoked |
| Images or CSS missing only on Render | File names are case-sensitive on Linux. Match the exact casing of `Assets`, `Content`, and file names |
 
## Customising
 
- **Colours:** edit the CSS variables at the top of `public/Content/app.css`.
- **Projects:** add or edit an `<article class="project-card">` in `views/projects.ejs`.
- **Navigation:** edit `views/partials/header.ejs`.
- **Intro video:** replace `public/Assets/videos/intro.mp4`.
## Maintenance
 
- Run `npm audit` periodically and keep dependencies up to date.
- Rotate the Gmail app password if it is ever shared or exposed.


## Reused code and AI Usage
 
Code for the webpages (/views/index.ejs, about.ejs, etc.) were reused from assignment one with the addition on EJS tags. AI was used in for assistance with the
css file and overall troubleshooting.

## Author
 
**Oghenetano Osokpor**
[GitHub](https://github.com/Trevor458) · [LinkedIn](https://www.linkedin.com/in/oghenetano-osokpor-23969b1b4/)
 






