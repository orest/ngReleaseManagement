export class Feature {
  featureId: number;
  displayName: string;
  description: string;
  statusCode: string;  // New, InProgress, Completed
  startDate?: Date;
  endDate?: Date;
  isApiCompleted: boolean;
  isUiCompleted: boolean;
}
