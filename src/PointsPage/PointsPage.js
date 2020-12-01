import React, { Component } from 'react';
import styles from './PointsPage.module.css';
import Reader from '../CSVReader/CSVReader';

class PointsPage extends Component {
    state = {
        data: null,
        table: null,
        customers: null
    }

    dataHandler = (data) => {
        console.log(data);
        this.setState({ data: data, table: null });
    }

    generateTable = () => {

        const tempData = this.state.data;
        const newRows = tempData.map((row, i) => {
            const cells = row.data.map((cell, k) => {
                if (k < 4) {
                    return (<td key={k}>{cell}</td>);
                } else {
                    return (null);
                }
            });

            return (<tr key={i} >{cells}</tr>);
        }

        );
        return (<table><tbody>{newRows}</tbody></table>);

    }


    generateCustomerList = () => {
        const tempData = this.state.data;
        const customers = [];
        let counter = 0;

        for (let i = 1; i < tempData.length; i++) {
            // debugger
            counter++;
            //GET NAMES AND TRANSACTIONS

            if (tempData[i].data[0] !== "") {
                customers.push({ "name": tempData[i].data[0] });
                if (customers.length === 2) {
                    customers[customers.length - 2].maxTransactions = counter - 1;
                    counter = 0;
                } else if (customers.length > 2) {
                    customers[customers.length - 2].maxTransactions = counter;
                    counter = 0;
                }
            }

            //GET LAST CUSTOMER'S MAX TRANSACTIONS
            if (i === tempData.length - 1) {
                customers[customers.length - 1].maxTransactions = counter + 1;
            }
        }

        //RUN POINT COUNTER
        for(let i=0; i< customers.length; i++){
            customers[i].points= this.calculateCustomerPoints(customers[i].name, customers);
        }
        // customers.forEach((customer,i) => {
        //     customer.points= this.calculateCustomerPoints(customer.name, customers);
        // });

       
        return (customers);
    }

    componentDidUpdate() {
        console.log("in component did update");
        //GENERATE TABLE OF DATA
        if (this.state.table === null) {
            this.setState({ table: this.generateTable(), customers: this.generateCustomerList() });
        }

    }

    calculateCustomerPoints(name, customers) {
        alert(`calculating ${name}'s points`);
        const tempData = this.state.data;
        let customer = null;
        let points=0;
        //FIND CUSTOMER DATA TO RETREIVE MAX# OF PURCHASES
        for (let i = 0; i < customers.length; i++) {
            if (customers[i].name === name) {
                customer = customers[i];
                break;
            }
        }

        //GO THROUGH DATA TO FIND CUSTOMER'S PURCHASES LIST
        let customerRow=null;
        for (let i = 1; i < tempData.length; i++) {
                if(tempData[i].data[0]=== name){
                    customerRow=i;
                    break;
                }
            
        }

        //STARTING AT CUSTOMERROW, GO THROUGH MAX PURCHASES TO TALLY POINTS
        

        for(let i= customerRow; i< customerRow +customer.maxTransactions; i++){
            
            for(let k=0; k< tempData[i].data.length; k++){
                
                //TOSS OUT BLANK VALUES
                const cellValue= parseInt(tempData[i].data[k]);
                if(!isNaN(cellValue)  && cellValue > 50){
                    //RUN VALUE THROUGH POINT EVALUATOR
                    if(cellValue > 50 && cellValue <101){
                        points += cellValue -50;
                    } if(cellValue > 100){
                        points += 50;
                        points += (cellValue -100) *2;
                    }
                }
            }
        }

        return(points);
    }


    render() {
        let pointsDiv = null;
        if (this.state.customers !== null) {
            pointsDiv = (
                <div className={styles.PointsDiv}>
                    {this.state.customers.map((cust) => <div key={cust.name}>{cust.name} : {cust.points}</div>)}
                </div>);
        };


        return (
            <div className={styles.PointsPage}>
                <h1>Customer Loyalty Points Program</h1>
                <Reader dataLoaded={this.dataHandler} />
                {pointsDiv}
                {this.state.table}

            </div>

        )
    }
}



export default PointsPage;