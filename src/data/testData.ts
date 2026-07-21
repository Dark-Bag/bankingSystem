import { faker } from '@faker-js/faker';

export const validUsers = {
    admin: {
        username: 'standard_user',
        password: 'bank_sauce'
    },

    viewer: {
        username: 'viewer',
        password: 'viewer123'
    },

    overdraft: {
        username: 'overdraft_user',
        password: 'bank_sauce'
    },

    frozen: {
        username: 'frozen_user',
        password: 'bank_sauce'
    }

    

};

export const invalidUsers = {
    admin: {
        username: 'wrongadmin',
        password: 'wrongpassword'
    },

    viewer: {
        username: 'wrongviewer',
        password: 'wrongpassword'
    }

};

export const randomData = {
    validTransfer: {
        amount: faker.finance.amount({
            min: 100,
            max: 500,
            dec: 2,
        }),
    },
    insufficientFunds: {
        amount: faker.finance.amount({
            min: 5000,
            max: 10000,
            dec: 2,
        }),
    },
};