import React, { Component } from 'react';
import styles from './PointsPage.module.css';
import Reader from '../CSVReader/CSVReader';

// import csvDownload from '../assets/Star_wars_data.csv';


class PointsPage extends Component {


    render() {
        let pointsDiv = null;
        if (this.props.customers !== null) {
            pointsDiv = (
                <div className={styles.PointsDiv}>
                    <h2>Customer Point Totals</h2>
                    {this.props.customers.map((cust) =>     
                        <div key={cust.name} className={styles.CustomerTotal}>
                            <span style={{"fontWeight": "bold"}}>{cust.name}:</span> {cust.points} points
                        </div>)}
                </div>);
        };


        return (
            <div className={styles.PointsPage}>
                <h1>Customer Loyalty Points Program</h1>
                <p className={styles.Instructions}>You may use dummy data or upload a CSV file of your own. We've provided an example <a href="Star_wars_data.csv" download>CSV File</a> if you'd like to try the upload function! </p>
                <div className={styles.ButtonDiv}>
                    <button onClick={this.props.dummyData}>Use Dummy Data</button>
                </div>

                <h2>--OR--</h2>
                <Reader dataLoaded={(data) => this.props.dataLoaded(data)} />
                {pointsDiv}


            </div>

        )
    }
}



export default PointsPage;