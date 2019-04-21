// Copyright

export type TaskData = Map<string, {result?:any; error?: any;}>;

interface TransactionTask<TaskReturnType = any> {
  name: string;
  action: (data?: TaskData)=>TaskReturnType;
  rollback: (data?: TaskData)=>void;
}

export interface TransactionConfig {
  tasks: TransactionTask[];
}

export default class Transaction {
  private tasks: Map<string, TransactionTask>;
  private config: TransactionConfig;
  private executedTasks: string[]; // stack
  private taskData: TaskData;

  constructor(config: TransactionConfig) {
    this.config = config;
    this.tasks = new Map();
    for (let i = 0; i < this.config.tasks.length; i++) {
      const configTasks = config.tasks;
      const taskName = configTasks[i]['name'];
      if(this.tasks.has(taskName)) {
        throw new Error(`Task "${taskName}" must be unique!`);
      }
      this.tasks.set(taskName, configTasks[i]);
    }
    this.executedTasks = [];
    this.taskData = new Map();
  }

  public async executeAll({noRollback}:{noRollback: boolean;} = {noRollback: false}) {
    this.taskData.clear();
    this.executedTasks = [];
    for (let i = 0; i < this.config.tasks.length; i++) {
      const taskName = this.config.tasks[i]['name'];
      try {
        console.log(`Executing task "${taskName}"`);
        const task = this.tasks.get(taskName);
        if (task) {
          const result = await task.action(this.taskData);
          this.executedTasks.push(taskName);
          this.taskData.set(taskName, {result});
          if(i >= this.config.tasks.length - 1) {
            console.log(`All tasks has executed successfully`)
          }
        }
      } catch (error) {
        console.log(`Task "${taskName}" failed.`);
        this.taskData.set(taskName, {error});
        if (noRollback) {
          break;
        } else {
          // Rolling back
          const lastTaskName = this.executedTasks.pop();
          if (lastTaskName !== undefined) {
            const lastTask = this.tasks.get(lastTaskName);
            // lastTask && lastTask.rollback(this.taskData);
            if (lastTask) {
              console.log(`Rolling back for task "${lastTaskName}"...`);
              lastTask.rollback(this.taskData);
            }
          } else {
            console.log(`All tasks have rolled back`);
          }
        }
      }
    }
  }

  public execute(taskName: string) {
    const task = this.tasks.get(taskName);
    if (!task) {
      throw new Error(`No such task "${taskName}"`);
    }
    task.action(this.taskData);
  }

  public rollbackAll() {
    if (this.executedTasks.length < 1) {
      throw new Error(`No executed tasks. No need to rollback`)
    }
    let currentTaskName = this.executedTasks.pop();
    while(currentTaskName) {
      const currentRolledBackTask = this.tasks.get(currentTaskName);
      currentRolledBackTask && currentRolledBackTask.rollback(this.taskData);
    }
  }

  public rollback(taskName: string) {
    const task = this.tasks.get(taskName);
    if (!task) {
      throw new Error(`No such task "${taskName}"`)
    }
    task.rollback(this.taskData);
  }
}
