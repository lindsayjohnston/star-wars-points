import React from 'react';
import styles from './HowItWorksPage.module.css';


const howItWorksPage = () => {

    return (
        <div className={styles.PointsPage}>
            <h1>StarPoints Customer Loyalty Program</h1>
            <p>Thank you for being a loyal customer! We are happy to reward EVERY PURCHASE with StarPoints that you can redeem for stellar trips to anywhere in the universe!</p>
            <h2>How StarPoints are Calulated</h2>
            <p className={styles.Instructions}>
                <li>
                    Customers receive 2 StarPoints for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction.
                </li>
                <li className={styles.Indented}>
                    (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points)
                </li>
                


</p>

        </div>
    )
}

export default howItWorksPage;