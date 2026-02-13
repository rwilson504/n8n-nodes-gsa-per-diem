# n8n-nodes-gsa-per-diem

An [n8n](https://n8n.io/) community node for the [GSA Per Diem Rates API](https://open.gsa.gov/api/perdiem/). Look up federal per diem reimbursement rates for lodging and meals by city, state, or ZIP code.

Per diem rates are the allowed reimbursement rates for hotel stays and meals for federal travelers. Rates are set for each of the federal government's fiscal years (October 1st to September 30th). GSA sets the rates for the Continental United States (CONUS). Many businesses and other organizations adopt these rates as well.

## Prerequisites

- An [n8n](https://n8n.io/) instance (self-hosted or cloud)
- A free GSA API key — [register here](https://open.gsa.gov/api/perdiem/)

## Installation

### Community Nodes (Recommended)

1. Go to **Settings → Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-gsa-per-diem`
4. Agree to the risks and click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-gsa-per-diem
```

Restart n8n after installation.

## Credentials

1. Create a new credential of type **GSA Per Diem API**
2. Enter your GSA API key (obtained from https://open.gsa.gov/api/perdiem/)
3. Click **Save** — the credential will be tested automatically

## Supported Operations

### Per Diem Rate

| Operation | Description |
|-----------|-------------|
| **Get by City/State/Year** | Retrieve per diem rates for a specific city, state, and fiscal year |
| **Get by State/Year** | Retrieve per diem rates for all counties and cities within a state for a fiscal year |
| **Get by ZIP/Year** | Retrieve per diem rates based on ZIP code and fiscal year |

### CONUS Data

| Operation | Description |
|-----------|-------------|
| **Get Lodging Rates** | Retrieve lodging rate information for all locations in the Continental US for a fiscal year |
| **Get ZIP Code Mappings** | Retrieve the mapping of ZIP codes to Destination IDs and state locations for a fiscal year |

## Example Usage

1. Add the **GSA Per Diem** node to your workflow
2. Select your GSA Per Diem API credentials
3. Choose a resource (Per Diem Rate or CONUS Data)
4. Choose an operation and fill in the required parameters
5. Execute the node to retrieve rate data

### Look up rates for a specific city

- **Resource:** Per Diem Rate
- **Operation:** Get by City/State/Year
- **City:** `San Francisco`
- **State:** `CA`
- **Year:** `2025`

## Development

```bash
# Clone the repository
git clone https://github.com/rwilson504/n8n-nodes-gsa-per-diem.git
cd n8n-nodes-gsa-per-diem

# Install dependencies
npm install

# Build
npm run build

# Link for local testing
npm link
cd ~/.n8n
npm link n8n-nodes-gsa-per-diem
n8n start
```

## License

[MIT](LICENSE)

## Author

Richard Wilson — [richardawilson.com](https://www.richardawilson.com/)