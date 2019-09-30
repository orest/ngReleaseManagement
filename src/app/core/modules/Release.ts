import { ReleasePlatform } from './ReleasePlatform';
import { Client } from './Client';

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
  workItems: any[];
  statusCode: string;  // New, InProgress, Completed
  releasePlatforms: ReleasePlatform[];
  client: Client;
  iOsRelease: boolean;
  androidRelease: boolean;
  iosPlatfrom: ReleasePlatform;
  androidPlatfrom: ReleasePlatform;
  constructor() {

  }

}
