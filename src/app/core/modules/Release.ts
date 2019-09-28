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
	features: any[];
	statusCode: string  // New, InProgress, Completed 
	releasePlatforms: ReleasePlatform[]

	iOsRelease: boolean;
	androidRelease: boolean;
	iosPlatfrom:ReleasePlatform;
	androidPlatfrom:ReleasePlatform
	constructor() {

	}

}
