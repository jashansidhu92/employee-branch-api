export type LoanStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';


export interface Loan {
id: string;
applicantName: string;
amount: number;
purpose: string;
status: LoanStatus;
createdAt: string;
updatedAt: string;
}