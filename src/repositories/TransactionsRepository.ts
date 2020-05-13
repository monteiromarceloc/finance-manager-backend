import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income = this.transactions.reduce((a, b) => a + (b.type === 'income' ? b.value : 0), 0)
    let outcome = this.transactions.reduce((a, b) => a + (b.type === 'outcome' ? b.value : 0), 0)
    return {
      income,
      outcome,
      total: income - outcome
    };
  }

  public create(newTransactionDTO: Transaction): Transaction {
    this.transactions.push(newTransactionDTO);
    return newTransactionDTO;
  }
}

export default TransactionsRepository;
