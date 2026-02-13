import { INodeType, INodeTypeDescription, NodeConnectionTypes } from 'n8n-workflow';

export class GsaPerDiem implements INodeType {
	usableAsTool = true;

	description: INodeTypeDescription = {
		displayName: 'GSA Per Diem',
		name: 'gsaPerDiem',
		icon: 'file:gsaperdiem.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description:
			'Look up GSA per diem reimbursement rates for federal travel lodging and meals',
		defaults: { name: 'GSA Per Diem' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'gsaPerDiemApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.gsa.gov/travel/perdiem',
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			// ──────────────────────────────────────────────
			// Resource Selector
			// ──────────────────────────────────────────────
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Per Diem Rate',
						value: 'perDiemRate',
					},
					{
						name: 'CONUS Data',
						value: 'conusData',
					},
				],
				default: 'perDiemRate',
			},

			// ──────────────────────────────────────────────
			// Per Diem Rate — Operations
			// ──────────────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['perDiemRate'],
					},
				},
				options: [
					{
						name: 'Get by City/State/Year',
						value: 'getByCityStateYear',
						action: 'Get per diem rates by city state and year',
						description:
							'Retrieve per diem rates for a specific city, state, and fiscal year',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/rates/city/{{$parameter.city}}/state/{{$parameter.state}}/year/{{$parameter.year}}',
							},
							output: {
								postReceive: [
									{
										type: 'rootProperty',
										properties: { property: 'rates' },
									},
								],
							},
						},
					},
					{
						name: 'Get by State/Year',
						value: 'getByStateYear',
						action: 'Get per diem rates by state and year',
						description:
							'Retrieve per diem rates for all counties and cities within a state for a fiscal year',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/rates/state/{{$parameter.state}}/year/{{$parameter.year}}',
							},
							output: {
								postReceive: [
									{
										type: 'rootProperty',
										properties: { property: 'rates' },
									},
								],
							},
						},
					},
					{
						name: 'Get by ZIP/Year',
						value: 'getByZipYear',
						action: 'Get per diem rates by ZIP code and year',
						description:
							'Retrieve per diem rates based on ZIP code and fiscal year',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/rates/zip/{{$parameter.zip}}/year/{{$parameter.year}}',
							},
							output: {
								postReceive: [
									{
										type: 'rootProperty',
										properties: { property: 'rates' },
									},
								],
							},
						},
					},
				],
				default: 'getByCityStateYear',
			},

			// ──────────────────────────────────────────────
			// CONUS Data — Operations
			// ──────────────────────────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['conusData'],
					},
				},
				options: [
					{
						name: 'Get Lodging Rates',
						value: 'getLodgingRates',
						action: 'Get CONUS lodging rates by year',
						description:
							'Retrieve lodging rate information for all locations in the Continental US for a fiscal year',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/rates/conus/lodging/{{$parameter.year}}',
							},
						},
					},
					{
						name: 'Get ZIP Code Mappings',
						value: 'getZipMappings',
						action: 'Get ZIP code to destination ID mappings',
						description:
							'Retrieve the mapping of ZIP codes to Destination IDs and state locations for a fiscal year',
						routing: {
							request: {
								method: 'GET',
								url: '=/v2/rates/conus/zipcodes/{{$parameter.year}}',
							},
						},
					},
				],
				default: 'getLodgingRates',
			},

			// ──────────────────────────────────────────────
			// Parameters — Per Diem Rate
			// ──────────────────────────────────────────────
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g. Washington',
				description: 'The city to look up per diem rates for',
				displayOptions: {
					show: {
						resource: ['perDiemRate'],
						operation: ['getByCityStateYear'],
					},
				},
			},
			{
				displayName: 'State Abbreviation',
				name: 'state',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g. DC',
				description: 'The two-letter state abbreviation',
				displayOptions: {
					show: {
						resource: ['perDiemRate'],
						operation: ['getByCityStateYear', 'getByStateYear'],
					},
				},
			},
			{
				displayName: 'ZIP Code',
				name: 'zip',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g. 20001',
				description: 'The ZIP code to look up per diem rates for',
				displayOptions: {
					show: {
						resource: ['perDiemRate'],
						operation: ['getByZipYear'],
					},
				},
			},
			{
				displayName: 'Fiscal Year',
				name: 'year',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g. 2025',
				description:
					'The federal fiscal year (October 1 – September 30). For example, FY2025 runs from Oct 1, 2024 to Sep 30, 2025.',
				displayOptions: {
					show: {
						resource: ['perDiemRate'],
					},
				},
			},

			// ──────────────────────────────────────────────
			// Parameters — CONUS Data
			// ──────────────────────────────────────────────
			{
				displayName: 'Fiscal Year',
				name: 'year',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'e.g. 2025',
				description:
					'The federal fiscal year (October 1 – September 30). For example, FY2025 runs from Oct 1, 2024 to Sep 30, 2025.',
				displayOptions: {
					show: {
						resource: ['conusData'],
					},
				},
			},
		],
		usableAsTool: true,
	};
}
