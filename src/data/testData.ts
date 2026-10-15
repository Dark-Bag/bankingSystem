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
            min: 55000,
            max: 100000,
            dec: 2,
        }),

    },

     userDetails: {
        fullName: faker.person.fullName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode(),
    },

    bankDetails: {
        bankName: faker.company.name(),

        // 9-digit routing number
        validRoutingNumber: faker.string.numeric(9),

        // Invalid routing number: 1–8 digits
        invalidRoutingNumber: faker.string.numeric({
            length: { min: 1, max: 8 }
        }),

        // Bank account number: 8–17 digits
        accountNumber: faker.string.numeric({
            length: { min: 8, max: 17 }
        }),
    },
};