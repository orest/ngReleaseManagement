import { ReleasePlatform } from './ReleasePlatform';

export class Release {
	releaseId: number;
	applicationVersion: string;
	clientId: number;
	qaStartDate: Date;
	qaEndDate: Date;
	uatStartDate: Date;
	uatEndDate: Date;
	clientApproverName: string;
	notes: string;
	iOsRelease: boolean;
	androidRelease: boolean;
	features: any[];
	statusCode: string  // New, InProgress, Completed 
	releasePlatforms: ReleasePlatform[]
	constructor() {

	}

}
