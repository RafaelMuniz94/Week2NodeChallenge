import TransactionsRepository from "../repositories/TransactionsRepository";
import Transaction from "../models/Transaction";

interface CreateDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateDTO): Transaction {

    let isOutcomeTransactionValid = !(type == 'outcome' && value > this.transactionsRepository.getBalance().total)

    if(value === 0)
    throw Error('Transaction must have a value')

    if(!isOutcomeTransactionValid)
    throw Error('Outcome transaction greater than Balance total')

    let transaction = this.transactionsRepository.create({ title, value, type });

    return transaction
  }
}

export default CreateTransactionService;
