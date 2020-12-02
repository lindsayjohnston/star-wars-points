import React, {Component} from 'react';
import './App.module.css';
import styles from './App.module.css';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import meteorSVG from './assets/meteor-solid.svg';
import PointsPage from './PointsPage/PointsPage';
// import { render } from '@testing-library/react';
import testData from './assets/dummydata.json';

class App extends Component {
  state = {
    data: null,
    table: null,
    customers: null
}

dataHandler = (data) => {
    if(data !== null){
      this.setState({ data: data, table: null });
    } else{
      this.setState({data: testData, table: null})
    }
    
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
    return (customers);
}

componentDidUpdate() {
    console.log("in component did update");
    if (this.state.table === null) {
        this.setState({ table: this.generateTable(), customers: this.generateCustomerList() });
    }

}

calculateCustomerPoints(name, customers) {
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

render(){
  
  return (
    <BrowserRouter>
      <div className={styles.App}>

        <header className={styles.Header}>
          <div className={styles.TitleDiv}>
            <img className={styles.Logo} alt="comet" src={meteorSVG}></img>
            <h1 className={styles.Title}>StarPoints</h1>
          </div>
          <nav >
            <NavLink to="/" exact activeClassName={styles.Selected} className={styles.NavLink}>Points</NavLink>
            <NavLink to="/users" exact activeClassName={styles.Selected} className={styles.NavLink}>Users</NavLink>
            <NavLink to="/sales" exact activeClassName={styles.Selected} className={styles.NavLink}>Sales</NavLink>
          </nav>
        </header>

        <div className={styles.PageArea}>
          <Route
            path="/users" exact render={() => (<h1>USERS PAGE</h1>)}></Route>
          <Route
            path="/sales" exact render={() => this.state.table}></Route>
          <Route
            path="/" 
            exact 
            render={(props)=>(
              <PointsPage 
                table={this.state.table}
                customers={this.state.customers}
                dummyData={()=>this.dataHandler(null)}
                dataLoaded={(data)=>this.dataHandler(data)} />
            )}
           ></Route>

        </div>

      </div>
    </BrowserRouter>

  );
}
}

export default App;
