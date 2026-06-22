# Vector Tax Lien Marketplace

A lightweight React prototype for listing Vector tax lien certificates, assignments, and property-backed tax lien opportunities.

The site is intentionally static for fast review and simple Azure deployment. React and icons load from CDN, so no npm install is required.

## What Is Included

- Marketplace-style landing page
- Searchable and filterable asset inventory
- Tax lien / certificate property cards
- Asset detail modal
- Investor inquiry form prototype
- Azure Static Web Apps configuration

## Project Structure

- `index.html`: HTML entry point and metadata
- `src/main.js`: React application
- `src/styles.css`: responsive marketplace styling
- `public/data/listings.json`: public listing data shown on the website
- `public/images/properties/<parcel-number>/`: listing photos grouped by parcel number
- `public/vector-real-estate-hero.jpg`: local hero image
- `staticwebapp.config.json`: Azure Static Web Apps routing and headers
- `server.js`: local static file server

## Run Locally

```powershell
node server.js
```

Then open:

```text
http://localhost:4173
```

If the Windows node alias fails, use the bundled Codex Node runtime:

```powershell
& "C:\Users\yaoze\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" server.js
```

## Edit Listings

The website reads its listings from `public/data/listings.json`. Update that file when a listing is added, changed, sold, or removed, then push the change to GitHub. Azure deploys it automatically.

Keep the original underwriting workbook private. Do not commit it to this public repository because it may contain bid amounts, payment and repair costs, profit calculations, attorney details, title diligence notes, or other internal information.

Only publish diligence-approved fields such as address, parcel number, county, property type, tax face amount, assessment, certificate timeline, photos, and a request-for-terms call to action.

Suggested real fields to collect before publishing:

- Asset ID
- County and state
- Certificate or lien type
- Parcel number
- Tax face amount
- Lien expiration
- Assessed value
- Year built and building/land size
- Public-facing exterior notes
- Packet availability

## Deploy To Azure Static Web Apps

Recommended first deployment path:

1. Push this folder to a GitHub repository.
2. In Azure Portal, create a Static Web App.
3. Choose the GitHub repository and branch.
4. Use these build settings:

```text
App location: /
Api location: <blank>
Output location: /
Build command: <blank>
```

This works because the site is already static and does not need a build step.

## Next Useful Additions

- Replace sample data with real certificate inventory
- Add company email or CRM submission
- Add password-protected investor access
- Add downloadable due diligence packets
- Add bilingual English/Chinese copy
- Add Azure Functions for form handling

## Markdown

### Home Page

<img src="images/homepage.png" width="800">

### Inventory Page

<img src="images/inventorypage.png" width="800">

### Inventory Detail Page

<img src="images/inventorydetailpage.png" width="800">

### Contact Page

<img src="images/contactpage.png" width="800">
