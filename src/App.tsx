
import { Header } from "./components/Header";

import { AppRoutes } from "./routes";

import './styles/global.css';

export const App = ( )=> {
  return (
    <div className="App">
      <>
        <Header />
        <AppRoutes />
      </>
    </div>
  );
}
