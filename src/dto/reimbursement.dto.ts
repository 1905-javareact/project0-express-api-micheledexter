export class ReimbursementDTO {
    id: number;
    author_id: number;
    amount: number;
    date_submitted: Date;
    date_resolved: Date;
    description: string;
    resolver_id: number;
    status_id: number;
    type_id: number;
}