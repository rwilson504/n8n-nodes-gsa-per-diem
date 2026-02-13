import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class GsaPerDiemApi implements ICredentialType {
	name = 'gsaPerDiemApi';
	displayName = 'GSA Per Diem API';
	documentationUrl = 'https://open.gsa.gov/api/perdiem/';
	icon = { light: 'file:../nodes/GsaPerDiem/gsaperdiem.svg', dark: 'file:../nodes/GsaPerDiem/gsaperdiem.svg' } as const;
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description:
				'Your GSA API key. Register for a free key at https://open.gsa.gov/api/perdiem/',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-API-KEY': '={{$credentials.apiKey}}',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.gsa.gov/travel/perdiem',
			url: '/v2/rates/conus/zipcodes/2024',
		},
	};
}
