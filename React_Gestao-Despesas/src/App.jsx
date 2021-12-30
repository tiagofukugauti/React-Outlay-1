import ReactManagementPage from './pages/ReactManagementPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { getToday } from './helpers/funcoesAuxiliares';

export default function App() {
  const mes = getToday().substring(0, 7);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/despesas/:mes"
          element={<ReactManagementPage />}
        ></Route>
        <Route path="*" element={<Navigate to={'/despesas/' + mes} />} />
      </Routes>
    </Router>
  );
}
