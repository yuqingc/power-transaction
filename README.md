# Power Transaction

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/power-transaction.svg?style=flat)](https://www.npmjs.com/package/power-transaction)
[![github issues](https://img.shields.io/github/issues/yuqingc/power-transaction.svg?style=flat)](https://github.com/yuqingc/power-transaction/issues)

**DO NOT USE IT AT PRESENT!**

Power Transaction is a tool for handling transactions. Still under development. *NOT* stable.

## Get Started

### Installation

```
$ yarn add power-transaction
```
or with NPM

```
$ npm i --save power-transaction
```

### Code

```ts
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

const t = createTransaction(config)
t.executeAll();
```

## Development

```
$ yarn build
$ yarn test
```
