import React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import Login from 'routes/login/containers/LoginPage';
import Main from 'routes/main/containers/Main';
import Dashboard from 'routes/main/components/Dashboard';
import Profile from 'routes/main/containers/Profile';
import Settings from 'routes/main/containers/Settings';
import ApartmentsToRent from 'routes/main/containers/Property/ApartmentsToRent';
import ApartmentToRent from 'routes/main/containers/Property/ApartmentsToRent/Details';
import ApartmentToRentEdit from 'routes/main/containers/Property/ApartmentsToRent/Edit';
import ApartmentsToSell from 'routes/main/containers/Property/ApartmentsToSell';
import ApartmentToSell from 'routes/main/containers/Property/ApartmentsToSell/Details';
import ApartmentToSellEdit from 'routes/main/containers/Property/ApartmentsToSell/Edit';
import Categories from 'routes/main/containers/Categories';
import CategoryEdit from 'routes/main/containers/Categories/Edit';
import Clients from 'routes/main/containers/Clients';
import Client from 'routes/main/containers/Clients/Details';
import ClientEdit from 'routes/main/containers/Clients/Edit';
import CommercialProperty from 'routes/main/containers/Property/Commercial';
import CommercialPropertyDetails from 'routes/main/containers/Property/Commercial/Details';
import CommercialPropertyEdit from 'routes/main/containers/Property/Commercial/Edit';
import Deals from 'routes/main/containers/Deals';
import Deal from 'routes/main/containers/Deals/Details';
import DealEdit from 'routes/main/containers/Deals/Edit';
import Departments from 'routes/main/containers/Departments';
import DepartmentEdit from 'routes/main/containers/Departments/Edit';
import DepartmentsDicts from 'routes/main/containers/DepartmentsDicts';
import DepartmentsDictsEdit from 'routes/main/containers/DepartmentsDicts/Edit';
import Houses from 'routes/main/containers/Property/Houses';
import House from 'routes/main/containers/Property/Houses/Details';
import HouseEdit from 'routes/main/containers/Property/Houses/Edit';
import Lots from 'routes/main/containers/Property/Lots';
import Lot from 'routes/main/containers/Property/Lots/Details';
import LotEdit from 'routes/main/containers/Property/Lots/Edit';
import Offices from 'routes/main/containers/OfficesPage';
import OfficeEdit from 'routes/main/containers/OfficesPage/Edit';
import Positions from 'routes/main/containers/Positions';
import PositionEdit from 'routes/main/containers/Positions/Edit';
import Roles from 'routes/main/containers/Roles';
import RoleEdit from 'routes/main/containers/Roles/Edit';
import Permissions from 'routes/main/containers/Permissions';
import PermissionEdit from 'routes/main/containers/Permissions/Edit';
import Tasks from 'routes/main/containers/Tasks';
import Units from 'routes/main/containers/Units';
import UnitEdit from 'routes/main/containers/Units/Edit';
import Users from 'routes/main/containers/Users';
import User from 'routes/main/containers/User';
import UserEdit from 'routes/main/containers/User/Edit';
import NotFound from 'common/NotFound';

export default class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Main}>
                    <IndexRedirect to="dashboard" />
                    <Route path="dashboard" component={Dashboard} />
                    <Route path="apartments_rent" component={ApartmentsToRent} />
                    <Route path="apartments_rent/:id" component={ApartmentToRent} />
                    <Route path="apartments_rent/:id/edit" component={ApartmentToRentEdit} />
                    <Route path="apartments_sell" component={ApartmentsToSell} />
                    <Route path="apartments_sell/:id" component={ApartmentToSell} />
                    <Route path="apartments_sell/:id/edit" component={ApartmentToSellEdit} />
                    <Route path="clients" component={Clients} />
                    <Route path="clients/:id" component={Client} />
                    <Route path="clients/:id/edit" component={ClientEdit} />
                    <Route path="commercial_property" component={CommercialProperty} />
                    <Route path="commercial_property/:id" component={CommercialPropertyDetails} />
                    <Route path="commercial_property/:id/edit" component={CommercialPropertyEdit} />
                    <Route path="deals" component={Deals} />
                    <Route path="deals/:id" component={Deal} />
                    <Route path="deals/:id/edit" component={DealEdit} />
                    <Route path="houses" component={Houses} />
                    <Route path="houses/:id" component={House} />
                    <Route path="houses/:id/edit" component={HouseEdit} />
                    <Route path="lots" component={Lots} />
                    <Route path="lots/:id" component={Lot} />
                    <Route path="lots/:id/edit" component={LotEdit} />
                    <Route path="profile" component={Profile} />
                    <Route path="settings" component={Settings} />
                    <Route path="users" component={Users} />
                    <Route path="users/:id" component={User} />
                    <Route path="users/:id/edit" component={UserEdit} />
                    <Route path="roles" component={Roles} />
                    <Route path="roles/:id/edit" component={RoleEdit} />
                    <Route path="permissions" component={Permissions} />
                    <Route path="permissions/:id/edit" component={PermissionEdit} />
                    <Route path="tasks" component={Tasks} />
                    <Route path="units" component={Units} />
                    <Route path="units/:id/edit" component={UnitEdit} />
                    <Route path="offices" component={Offices} />
                    <Route path="offices/:id/edit" component={OfficeEdit} />
                    <Route path="departments" component={Departments} />
                    <Route path="departments/:id/edit" component={DepartmentEdit} />
                    <Route path="departments_dicts" component={DepartmentsDicts} />
                    <Route path="departments_dicts/:id/edit" component={DepartmentsDictsEdit} />
                    <Route path="positions" component={Positions} />
                    <Route path="positions/:id/edit" component={PositionEdit} />
                    <Route path="categories" component={Categories} />
                    <Route path="categories/:id/edit" component={CategoryEdit} />
                </Route>

                <Route path="login" component={Login} />
                <Route path="*" component={NotFound} />
            </Router>
        );
    }
}
