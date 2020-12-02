import React from 'react';
import styles from './PointsPage.module.css';
import Reader from '../CSVReader/CSVReader';

const pointsPage = (props) => {
    let pointsDiv = null;
    if (props.customers !== null) {
        pointsDiv = (
            <div className={styles.PointsDiv}>
                <h2>Customer Point Totals</h2>
                {props.customers.map((cust) =>
                    <div key={cust.name} className={styles.CustomerTotal}>
                        <span style={{ "fontWeight": "bold" }}>{cust.name}:</span> {cust.points} points
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={styles.PointsPage}>
            <h1>Customer Loyalty Points Program</h1>
            <p className={styles.Instructions}>You may use dummy data or upload a CSV file of your own. We've provided an example <a href="https://lindsayjohnston.github.io/star-wars-csv-download/" target="_blank" rel="noreferrer">CSV File</a> if you'd like to try the upload function! </p>
            <div className={styles.ButtonDiv}>
                <button onClick={props.dummyData}>Use Dummy Data</button>
            </div>
            <h2>--OR--</h2>
            <Reader dataLoaded={(data) => props.dataLoaded(data)} />
            {pointsDiv}
        </div>
    )
}

export default pointsPage;