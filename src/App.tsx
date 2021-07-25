import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Favorites from './components/favorites/Favorits';
import Main from './components/main/Main';
import Alert from './components/common/alert/Alert';
import Header from './components/header/Header';
import BeerPopup from './components/popups/beerPopup/BeerPopup';

function App() {

  const { error, current }  = useSelector((state: any) => state);

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/favorite" component={Favorites} />
          <Route exact path="*" component={Main} />
        </Switch>
        {current && <BeerPopup {...current} key={current.id} />}
        <Alert error={error} />
      </Router>
    </div>
  );
}

export default App;
