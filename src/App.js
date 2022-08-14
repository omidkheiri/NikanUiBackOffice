import "./App.css";
import { Fragment, useState } from "react";
import Header from "./Layouts/InnerPage/Header";
import MainContent from "./Layouts/InnerPage/MainContent";
import Footer from "./Layouts/InnerPage/Footer";
import SupplierList from "./Components/Suppliers/SupplierList";
import { Redirect, Route, Switch } from "react-router-dom";
import SupplierDetail from "./Components/Suppliers/SupplierDetail/SupplierDetail";
import AccountList from "./Components/Accounts/AccountList";
import AccountPanel from "./Components/Accounts/Panel/AccountPanel";
import CreateAccount from "./Components/Accounts/Create/CreateAccount";
import SingleLayout from "./Layouts/SinglePage/SingleLayout";
import BasicContext from "./Store/enviroment-context";
import "devextreme/dist/css/dx.light.css";
import FlightList from "./Components/FlightNumber/FlightList";
import AirlineNameList from "./Components/FlightNumber/AirlineNameList";
function App() {
  const [isLogedIn] = useState(true);

  return (
    <BasicContext.Provider
      value={{
        baseAddress:
          "http://localhost:30007/GW/Account/V1/company/6daf220b-f859-4b80-93e0-a2350d2aa90c",
        serviceLocationAddress: `http://localhost:30007/GW/ServiceLocation/V1/company/6daf220b-f859-4b80-93e0-a2350d2aa90c`,
        flightAddress: `http://localhost:30007/GW/FlightNumbers/V1/company/6daf220b-f859-4b80-93e0-a2350d2aa90c`,
        serviceLineAddress: `http://localhost:30007/GW/ServiceLine/V1/company/6daf220b-f859-4b80-93e0-a2350d2aa90c`,
      }}
    >
      {!isLogedIn && <SingleLayout></SingleLayout>}
      {isLogedIn && (
        <Fragment>
          <Header />
          <MainContent>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/Accounts" />
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
              <Route path="/Flights" exacts>
                <FlightList />
              </Route>
              <Route path="/Flight/AirlineNames">
                <AirlineNameList />
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
