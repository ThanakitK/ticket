import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import {Create} from './Component/Create'
import {Table} from './Component/Table'

function App() {
  return (
    <Router>
        <Routes>
          <Route expect path = '/' element={<Create/>}/>
          <Route path = '/show' element={<Table/>}/>
        </Routes>
      </Router>
  );
}

export default App;
