import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ value, type, title }: Transaction): Transaction {
    if (!value || !type || !title) throw new Error('Missing transaction information.')
    if (type !== 'income' && type !== 'outcome') throw new Error('Traansaction type not allowed.')

    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > total) throw new Error('Insufficient funds.')

    const newTransactionDTO = new Transaction({ title, value, type })
    const transaction = this.transactionsRepository.create(newTransactionDTO);
    return transaction;
  }
}

export default CreateTransactionService;
