import {Locator, expect} from '@playwright/test';
import { basePage } from '../base/basePage';

export class dashboardPage extends basePage {

    async dashboardWelcomeMessage() {
        await expect(this.page).toHaveURL('https://qaplayground.com/bank/dashboard');
    }


    async verifyTotalBalance() {

        await expect(this.page.getByText("Here's your financial overview.")).toBeVisible();
        // Read displayed total
            const totalText = await this.page.getByTestId('stat-card-net-worth-value').textContent();
            const displayedTotal = Number(totalText!.replace(/[$,]/g, ''));


        await this.page.getByTestId('view-all-transactions-btn').click();

            // Read account balances
        const checking = Number(
            await this.page
                .locator('tr[data-account-type="checking"]')
                .getByTestId('account-row-balance')
                .getAttribute('data-balance')
                );

            const savings = Number(
            await this.page
                .locator('tr[data-account-type="savings"]')
                .getByTestId('account-row-balance')
                .getAttribute('data-balance')
            );
        
            console.log('Checking:', checking);
            console.log('Savings:', savings);
            console.log('Displayed Total:', displayedTotal);


            // Calculate expected total
            const expectedTotal = checking + savings;
            expect(displayedTotal).toBe(expectedTotal);


    }


    async verifyRecentTransactions() {
            await expect(
            this.page.getByTestId('recent-transactions-section')
        ).toBeVisible();

        // Get all transaction rows
        const transactions = this.page.getByTestId('recent-txn-row');

        // Verify there are at most 5 transactions
        const count = await transactions.count();
        expect(count).toBeLessThanOrEqual(5);

        // Read the ISO dates from the <time> elements
        const dateCells = this.page.getByTestId('recent-txn-date');

        const dates: number[] = [];

        for (let i = 0; i < count; i++) {
            const isoDate = await dateCells
                .nth(i)
                .locator('time')
                .getAttribute('datetime');

            dates.push(new Date(isoDate!).getTime());
        }

        // Verify newest to oldest
        const sortedDates = [...dates].sort((a, b) => b - a);

        expect(dates).toEqual(sortedDates);

    }

     async quickTransferLinks() {
        
        await this.page.getByTestId('quick-action-transfer').click();
        await expect(this.page).toHaveURL('https://qaplayground.com/bank/transfer');
    }

    async payBill() {
        
        await this.page.getByTestId('quick-action-bill-pay').click();
        await expect(this.page).toHaveURL('https://qaplayground.com/bank/bill-pay');
    }


}