job-portal/
├── public/
│   └── images/             # Static assets (company logos, icons, etc.)
├── src/
│   ├── assets/             # Custom images, SVGs, logos
│   ├── components/         # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── JobCard.jsx         # Card component for each job
│   │   ├── FilterBar.jsx       # Filter and search bar
│   │   ├── JobList.jsx         # Maps through job data and renders JobCard
│   │   └── Layout.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx            # Main job listings
│   │   ├── JobDetail.jsx       # Individual job view
│   │   ├── JobSeekerAuth.jsx   # Login/Register for job seekers
│   │   └── EmployerRegistration.jsx # For employers
│   ├── data/
│   │   └── jobs.json        # Static data file (can be replaced with API)
│   ├── App.jsx              # App routes and layout
│   ├── App.css              # Global styles (mostly Tailwind config)
│   └── index.js             # React root render
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS setup for Tailwind
├── package.json
└── README.md
