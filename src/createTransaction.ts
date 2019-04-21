import Transaction, { TransactionConfig } from './Transaction';

export function createTransaction(config: TransactionConfig) {
  return new Transaction(config);
}
