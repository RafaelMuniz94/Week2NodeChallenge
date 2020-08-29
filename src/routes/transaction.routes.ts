import { Router } from "express";

import TransactionsRepository from "../repositories/TransactionsRepository";
import CreateTransactionService from "../services/CreateTransactionService";

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get("/", (request, response) => {
  try {
    let transactions = transactionsRepository.all()
    let balance = transactionsRepository.getBalance();
    return response.json({transactions,balance});
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.get("/balance", (request, response) => {
  try {
    let balance = transactionsRepository.getBalance();
    return response.json(balance);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post("/", (request, response) => {
  try {
    let { title, value, type } = request.body;

    let create = new CreateTransactionService(transactionsRepository);

    let transaction = create.execute({ title, value, type });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
