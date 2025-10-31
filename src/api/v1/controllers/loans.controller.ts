import { Request, Response } from 'express';
import { z } from 'zod';
import { LoanStore } from '../models/loan.model.js';
import { NotFoundError } from '../errors/NotFoundError.js';


const CreateLoanDto = z.object({
applicantName: z.string().min(2),
amount: z.number().positive(),
purpose: z.string().min(3)
});


export const LoansController = {
list(_req: Request, res: Response) {
res.json({ success: true, data: LoanStore.list() });
},


get(req: Request, res: Response) {
const loan = LoanStore.get(req.params.id);
if (!loan) throw new NotFoundError('Loan not found');
res.json({ success: true, data: loan });
},


create(req: Request, res: Response) {
const parsed = CreateLoanDto.safeParse(req.body);
if (!parsed.success) return res.status(400).json({ success: false, error: { code: 'BAD_REQUEST', message: parsed.error.message }});
const loan = LoanStore.create(parsed.data);
res.status(201).json({ success: true, data: loan });
},


review(req: Request, res: Response) {
const loan = LoanStore.update(req.params.id, { status: 'UNDER_REVIEW' });
if (!loan) throw new NotFoundError('Loan not found');
res.json({ success: true, data: loan });
},


approve(req: Request, res: Response) {
const loan = LoanStore.update(req.params.id, { status: 'APPROVED' });
if (!loan) throw new NotFoundError('Loan not found');
res.json({ success: true, data: loan });
},


reject(req: Request, res: Response) {
const loan = LoanStore.update(req.params.id, { status: 'REJECTED' });
if (!loan) throw new NotFoundError('Loan not found');
res.json({ success: true, data: loan });
}
};