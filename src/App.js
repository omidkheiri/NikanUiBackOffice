import "./App.css";
import { Fragment, useState } from "react";
import Header from "./Layouts/InnerPage/Header";
import MainContent from "./Layouts/InnerPage/MainContent";
import Footer from "./Layouts/InnerPage/Footer";
import SupplierList from "./Components/Suppliers/SupplierList";
import { Redirect, Route, Switch } from "react-router-dom";
import SupplierDetail from "./Components/Suppliers/SupplierDetail/SupplierDetail";
import AccountList from "./Components/Accounts/List";
import AccountDetail from "./Components/Accounts/Panel/AccountPanel";
import CreateAccount from "./Components/Accounts/Create/CreateAccount";

function App() {
  const [isLogedIn] = useState(true);

  return (
    <Fragment>
      {isLogedIn && (
        <Fragment>
          <Header />
          <MainContent>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/Suppliers" />
              </Route>
              <Route path="/Suppliers" exact>
                <SupplierList />
              </Route>
              <Route path="/Suppliers/:SupplierId">
                <SupplierDetail />
              </Route>
              <Route path="/Accounts" exacts>
                <AccountList />
              </Route>
              <Route path="/Accounts/:AccountId">
                <AccountDetail />
              </Route>
              <Route path="/NewAccount">
                <CreateAccount />
              </Route>
            </Switch>
            <Footer />
          </MainContent>
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
