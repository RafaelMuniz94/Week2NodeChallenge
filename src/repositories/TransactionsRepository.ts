import Transaction from "../models/Transaction";

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


    if (this.transactions.length === 0) return { income:0, outcome:0, total: 0 };

     let {income,outcome} = this.transactions.reduce(
       (accumulator, transaction) => {
         switch (transaction.type) {
           case "income":
             accumulator.income += transaction.value;
             break;
           case "outcome":
             accumulator.outcome += transaction.value;
             break;
         }
         return accumulator;
       },
       {
         income: 0,
         outcome: 0,
         total: 0,
       }
     );



    return {income,outcome,total:income-outcome}
  }

  public create({ title, value, type }: Omit<Transaction, "id">): Transaction {
    let transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
