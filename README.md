# Market Tracker — Frontend & Backend

This repo contains a Django backend and a React (Vite) frontend to upload market listing XLSX/CSV files and visualize aggregated metrics.

## Quick start (local)

### Backend
1. Create a virtualenv and activate it.
2. `cd backend`
3. `pip install -r requirements.txt`
4. `python manage.py migrate`
5. `python manage.py runserver` (default: http://localhost:8000)

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev` (default: http://localhost:3000)

Vite is configured to proxy `/api` to `http://localhost:8000`, so API calls will reach Django automatically.

## Notes
- The frontend expects the backend API routes:
  - `POST /api/upload/` — accepts `file` form-data (.csv | .xlsx)
  - `GET /api/data/` — returns aggregated rows. Accepts `market`, `start`, `end` query params.
  - `GET /api/brand/:brandName/` — returns time series for the brand.
- Tailwind is included via PostCSS. You may need to run Tailwind init/build steps if customizing beyond this starter setup.

## Deployment
Use Docker + docker-compose or containerize both services. Ensure static/media are persisted for the backend.
# Market-tracker-dashboard-
