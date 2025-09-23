# Personal Finance Tracker

This project is a full‑stack web application for tracking personal expenses. It consists of a React front‑end, a Node/Express back‑end, and a SQLite database. The goal is to provide a simple and useful tool for recording daily spending, categorising expenses, visualising where your money goes, and exporting data for further analysis.

## Features

* **Add, edit and delete expenses** – Record a description, amount, category and date for each expense. Edit or remove entries as your data changes.
* **Categorise spending** – Classify expenses using predefined categories such as Food, Rent, Transport, Utilities, Entertainment or Others.
* **Visualise spending** – A pie chart summarises your spending by category, helping you see where your money is going. Charts are rendered on the client using `react‑chartjs‑2`.
* **Export data to CSV** – Download all recorded expenses as a comma‑separated values file. This makes it easy to import your data into a spreadsheet or other analysis tool.
* **REST API** – The back‑end exposes a simple JSON API for all CRUD operations. This makes the project easy to extend or integrate with other services.

## Project structure

```
personal-finance-tracker/
├── backend/          # Node/Express API and SQLite database
│   ├── package.json  # Back‑end dependencies and scripts
│   └── server.js     # Express server with API routes
├── frontend/         # React client application
│   ├── public/
│   │   └── index.html  # HTML entry point
│   ├── src/
│   │   ├── components/  # React components
│   │   │   ├── ChartComponent.js
│   │   │   ├── ExpenseForm.js
│   │   │   └── ExpenseList.js
│   │   ├── App.css      # Basic styling
│   │   ├── App.js       # Main application component
│   │   └── index.js     # React entry point
│   └── package.json     # Front‑end dependencies and scripts
├── .gitignore        # Ignore node_modules, build artefacts and database
└── README.md         # Project overview and instructions (this file)
```

## Getting started

These instructions assume you have [Node.js](https://nodejs.org/) installed. The back‑end and front‑end are separate packages; each must be installed and run individually.

### 1. Clone the repository

Clone the project to your local machine. Navigate into the project root before running the following commands.

```
git clone <repository_url>
cd personal-finance-tracker
```

### 2. Set up and start the back‑end

The back‑end provides a REST API and persists data to a SQLite database file. To install dependencies and start the server:

```
cd backend
npm install
npm start
```

The API will be available at `http://localhost:5000/`. On first run, the server creates `expenses.db` in the `backend` directory and initializes the `expenses` table.

Available API routes:

| Method | Endpoint               | Description                                           |
|-------:|------------------------|-------------------------------------------------------|
| GET    | `/api/expenses`        | Retrieve all expenses                                 |
| POST   | `/api/expenses`        | Create a new expense                                  |
| PUT    | `/api/expenses/:id`    | Update an existing expense                            |
| DELETE | `/api/expenses/:id`    | Delete an expense                                     |
| GET    | `/api/expenses/csv`    | Download all expenses as a CSV file                  |

### 3. Set up and start the front‑end

The front‑end is a React application that communicates with the back‑end API. To install dependencies and start the development server:

```
cd frontend
npm install
npm start
```

The React app will open in your default browser at `http://localhost:3000/`. You can now add, edit and delete expenses, view the spending chart, and export data as CSV. The client assumes the API is running on `localhost:5000`; if you change the back‑end port, update the base URL in the API calls within `src/App.js`.

## Customising categories

Default categories are defined in `frontend/src/components/ExpenseForm.js`. To customise them, open the file and modify the `categories` array. New categories will automatically appear in the drop‑down list and in the pie chart.

## Notes

* **Database file** – The SQLite database (`expenses.db`) is stored in the `backend` directory. It is ignored by Git via `.gitignore`. Deleting this file resets all saved expenses.
* **Cross‑origin requests** – The back‑end uses the `cors` package to allow the front‑end to make requests from a different origin during development. If deploying to production behind a single origin, adjust the CORS settings accordingly.
* **Export encoding** – The CSV export endpoint returns data encoded as UTF‑8 with a header row. Most spreadsheet applications can open this file directly.

## License

This project is provided for educational purposes. Feel free to modify and use it as a starting point for your own personal finance tracker.
