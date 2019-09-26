export class Feature {
    featureId: number;
    displayName: string;
    description: string;
    typeCode: string; //// Core/Custom
    statusCode: string  // New, InProgress, Completed 
    startDate?: Date
    endDate?: Date
    isCompleted: boolean
}