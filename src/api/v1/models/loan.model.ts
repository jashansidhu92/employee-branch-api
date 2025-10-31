import { Loan } from '../types/loan.js';


const loans = new Map<string, Loan>();


export const LoanStore = {
create(payload: Omit<Loan, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Loan {
const id = Math.random().toString(36).slice(2, 10);
const now = new Date().toISOString();
const loan: Loan = { id, status: 'PENDING', createdAt: now, updatedAt: now, ...payload };
loans.set(id, loan);
return loan;
},
list(): Loan[] { return Array.from(loans.values()); },
get(id: string): Loan | undefined { return loans.get(id); },
update(id: string, patch: Partial<Loan>): Loan | undefined {
const cur = loans.get(id);
if (!cur) return undefined;
const updated = { ...cur, ...patch, updatedAt: new Date().toISOString() };
loans.set(id, updated);
return updated;
}
};