# go-shortlinks

Fetches shortlinks from Payload CMS and generates a Netlify _redirects file for go.spross.dev.

## Setup

1. Clone the repository and navigate to the project directory.
2. Create a `.env` file with the following content:

```bash
PAYLOAD_API_URL="https://preview.spross.app/api/shortlinks"
PAYLOAD_API_TOKEN="<your_api_secret_here>"
```

3\. Install dependencies:

```bash
bun install
```

## Usage

Run the build script to generate the Netlify `_redirects` file:

```bash
bun run build
```

This will fetch all shortlinks from your Payload CMS and write them to a `_redirects` file in the project root, suitable for deployment to Netlify.

## Notes

- The collection name in Payload CMS should be `shortlinks`.
- Each shortlink should have at least a `slug` and a `destination` field.
- The API secret is loaded from the `PAYLOAD_API_TOKEN` environment variable for security
