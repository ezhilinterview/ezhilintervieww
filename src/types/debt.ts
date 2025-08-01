export interface Debt {
  id: string;
  personName: string;
  dueDate: string;
  additionalDetail: string;
  type: '1' | '2'; // 1 = Lending (you lent money), 2 = Borrowing (you borrowed money)
  totalAmount: number;
  remainingAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DebtRecord {
  id: string;
  debtId: string;
  date: string;
  amount: number;
  description: string;
  accountId: string;
  type: '1' | '2'; // 1 = Paid, 2 = Received
  account?: {
    id: string;
    name: string;
    type: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateDebtData {
  personName: string;
  dueDate: string;
  additionalDetail: string;
  type: '1' | '2';
  record: {
    date: string;
    amount: number;
    description: string;
    accountId: string;
    type: '1' | '2';
  };
}

export interface UpdateDebtData {
  personName?: string;
  dueDate?: string;
  additionalDetail?: string;
  type?: '1' | '2';
  request?: {
    date: string;
    amount: number;
    description: string;
    accountId: string;
    type: '1' | '2';
  };
}

export interface CreateDebtRecordData {
  date: string;
  amount: number;
  description: string;
  accountId: string;
  type: '1' | '2';
}

export interface UpdateDebtRecordData {
  date?: string;
  amount?: number;
  description?: string;
  accountId?: string;
  type?: '1' | '2';
}

export interface PaginatedDebts {
  content: Debt[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface PaginatedDebtRecords {
  content: DebtRecord[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface DebtSummary {
  totalPayable: number;
  totalReceivable: number;
}

export interface DebtRecordSummary {
  totalPaid: number;
  totalReceived: number;
}

export const DEBT_TYPES = {
  '1': 'Lending',
  '2': 'Borrowing'
} as const;

export const DEBT_RECORD_TYPES = {
  '1': 'Paid',
  '2': 'Received'
} as const;

export type DebtType = keyof typeof DEBT_TYPES;
export type DebtRecordType = keyof typeof DEBT_RECORD_TYPES;