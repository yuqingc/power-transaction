
function sum(a: number, b: number):number {
  return a + b;
}

it('should add',() => {
  expect(sum(1, 2)).toBe(3)
})


import { createTransaction, TransactionConfig } from '../src'


const config: TransactionConfig = {
  tasks: [
    {
      name: 'step1',
      action: (data: any) => {
        console.log('executing step1', data);
        return 'step1 return';
      },
      rollback: (data: any) => {
        console.log('rolling back step1');
      }
    },
    {
      name: 'step2',
      action: (data: any) => {
        console.log('executing step2', data);
        return 'step2 return';
      },
      rollback: (data: any) => {
        console.log('rolling back step2');
      }
    },
    {
      name: 'step3',
      action: (data: any) => {
        console.log('executing step3', data);
        return 'step3 return';
      },
      rollback: (data: any) => {
        console.log('rolling back step3');
      }
    },
    {
      name: 'step4',
      action: (data: any) => {
        console.log('executing step4', data);
        return 'step1 return';
      },
      rollback: (data: any) => {
        console.log('rolling back step4');
      }
    }
  ],
}

// const t = new Transaction(config);

it('should has a transaction', () => {
  const t = createTransaction(config)
  t.executeAll()
})