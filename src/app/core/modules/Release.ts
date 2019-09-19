export class Release {
  releaseId: number;
  applicationVersion: string;
  clientId: number;
  qaStartDate: Date;
  qatEndDate: Date;
  uatStartDate: Date;
  uatEndDate: Date;
  clientApproverName: string;
  notes: string;
  releasePlatforms: any[];
  features: any[];

  constructor() {

  }

}
