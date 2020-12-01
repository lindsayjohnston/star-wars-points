import './App.module.css';
import styles from './App.module.css';
import { BrowserRouter, NavLink, Route } from 'react-router-dom';
import meteorSVG from './assets/meteor-solid.svg';
import PointsPage from './PointsPage/PointsPage';

function App() {
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
            path="/sales" exact render={() => (<h1>SALES PAGE</h1>)}></Route>
          <Route
            path="/" exact component={PointsPage}></Route>

        </div>

      </div>
    </BrowserRouter>

  );
}

export default App;
