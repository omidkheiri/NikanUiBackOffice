import "./App.css";
import { Fragment, useState } from "react";
import Header from "./Layouts/InnerPage/Header";
import MainContent from "./Layouts/InnerPage/MainContent";
import Footer from "./Layouts/InnerPage/Footer";
import SupplierList from "./Components/Suppliers/SupplierList";
import { Redirect, Route, Switch } from "react-router-dom";
import SupplierDetail from "./Components/Suppliers/SupplierDetail/SupplierDetail";
import AccountList from "./Components/Accounts/List";
import AccountPanel from "./Components/Accounts/Panel/AccountPanel";
import CreateAccount from "./Components/Accounts/Create/CreateAccount";
import SingleLayout from "./Layouts/SinglePage/SingleLayout";
import BasicContext from "./Store/enviroment-context";

function App() {
  const [isLogedIn] = useState(true);

  return (
    <BasicContext.Provider
      value={{
        baseAddress:
          "http://localhost:5062/GW/Account/V1/company/d8b0747d-03ca-4720-a287-acc27c7067cb",
      }}
    >
      {!isLogedIn && <SingleLayout></SingleLayout>}
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
              <Route path="/Account/:AccountId">
                <AccountPanel />
              </Route>
              <Route path="/NewAccount">
                <CreateAccount />
              </Route>
            </Switch>
            <Footer />
          </MainContent>
        </Fragment>
      )}
    </BasicContext.Provider>
  );
}

export default App;
