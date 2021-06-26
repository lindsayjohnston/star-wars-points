import React from 'react';
import styles from './HowItWorksPage.module.css';
import Reader from '../CSVReader/CSVReader';

const howItWorksPage = (props) => {
    let pointsDiv = null;
    if (1 === 1) {
        pointsDiv = (
            <div className={styles.PointsDiv}>
                <h2>Customer Point Totals</h2>
                
                    <div className={styles.CustomerTotal}>
                        <span style={{ "fontWeight": "bold" }}>name: </span> points
                    </div>
                )s
            </div>
        );
    }

    return (
        <div className={styles.PointsPage}>
            <h1>Customer Loyalty Points Program</h1>
            <p className={styles.Instructions}>You may use dummy data or upload a CSV file of your own.  </p>
           
            <h2>--OR--</h2>
            <Reader dataLoaded={(data) => props.dataLoaded(data)} />
            {pointsDiv}
        </div>
    )
 }
    
 export default howItWorksPage;