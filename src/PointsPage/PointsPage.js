import React, { Component } from 'react';
import styles from './PointsPage.module.css';
import Reader from '../CSVReader/CSVReader';
import dummyData from '../assets/Star_wars_data.csv';


class PointsPage extends Component {
   

    render() {
        let pointsDiv = null;
        if (this.props.customers !== null) {
            pointsDiv = (
                <div className={styles.PointsDiv}>
                    {this.props.customers.map((cust) => <div key={cust.name}>{cust.name} : {cust.points}</div>)}
                </div>);
        };


        return (
            <div className={styles.PointsPage}>
                <h1>Customer Loyalty Points Program</h1>
                <p className={styles.Instructions}>You may use dummy data or upload a CSV file of your own. We've provided an example <a href={dummyData} download>CSV FILE</a> if you'd like to try the upload function! </p>
                <button onClick={this.props.dummyData}>Use Dummy Data</button>
                <h2>--OR--</h2>
                <Reader dataLoaded={(data)=>this.props.dataLoaded(data)} />
                {pointsDiv}
                {this.props.table}

            </div>

        )
    }
}



export default PointsPage;