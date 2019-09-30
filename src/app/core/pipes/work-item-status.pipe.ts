import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'workItemStatus'
})
export class WorkItemStatusPipe implements PipeTransform {

    transform(value: any): any {
        let response = ""
        let template = ``
        switch (value) {
            case "new":
                response = '<span class="text-secondary "> <i class="fas fa-hourglass-start "></i> New</span>'
                break;
            case "pending":
                response = '<span class="text-warning "> <i class="fas fa-comment-dots "></i> Pending</span>'
                break;

            case "completed":
                response = '<span class="text-success"> <i class="fas fa-check "></i> Completed</span>'
                break;
            case "canceled":
                response = '<span class="text-danger"> <i class="fas fa-times "></i> Canceled</span>'
                break;
            case "inprogress":
                response = '<span class="text-primary"> <i class="fas fa-wrench"></i> In Progress</span>'
                break;

            default:
                response = value;
                break;
        }
        return response;
    }

}
