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
import AccountNewForm from "./Components/Accounts/Create/AccountNewForm";
import SingleLayout from "./Layouts/SinglePage/SingleLayout";
import BasicContext from "./Store/enviroment-context";
import "devextreme/dist/css/dx.light.css";
import FlightList from "./Components/FlightNumber/FlightList";
import AirlineNameList from "./Components/FlightNumber/AirlineNameList";
import ContactList from "./Components/Contacts/ContactList";
import ContactFormNew from "./Components/Contacts/ContactFormNew.js";
import ContactPanel from "./Components/Contacts/ContactPanel";
import ReserveForm from "./Components/Reserves/ReserveForm/ReserveForm";
import ReserveList from "./Components/Reserves/ReserveList";
function App() {
  const [isLogedIn] = useState(true);

  return (
    <BasicContext.Provider
      value={{
        reportAddress:
          "http://gaitway.ribbonid.com/GW/Report/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320",
        baseAddress:
          "http://gaitway.ribbonid.com/GW/Account/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320",
        serviceLocationAddress: `http://gaitway.ribbonid.com/GW/ServiceLocation/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
        flightAddress: `http://gaitway.ribbonid.com/GW/FlightNumbers/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
        serviceLineAddress: `http://gaitway.ribbonid.com/GW/ServiceLine/V1/company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320`,
        ReserveAddress:
          "http://localhost:30007/GW/Reserve/V1/Company/5eb7d5c9-a5c0-4045-8d2f-ae37b14cb320",
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
                <AccountNewForm />
              </Route>
              <Route path="/Contacts" exacts>
                <ContactList />
              </Route>
              <Route path="/Contact/:AccountId/:ContactId">
                <ContactPanel />
              </Route>
              <Route path="/NewContact">
                <ContactFormNew />
              </Route>

              <Route path="/Reserves">
                <ReserveList />
              </Route>
              <Route path="/Reserve/:LocationId/:ReserveId">
                <ReserveForm />
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
