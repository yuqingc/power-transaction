interface TransactionConfigBase {
  maxRetryTime?: number; // default to 1
}

interface TransactionTask<TaskReturnType> extends TransactionConfigBase{
  key: string;
  task: ()=>TaskReturnType;
  rollback: (data: TaskReturnType)=>void;
}

export interface TransactionConfig extends TransactionConfigBase {
  tasks: TransactionTask<any>[];
}

export class Transaction {
  constructor(config: TransactionConfig) {
    
  }
}