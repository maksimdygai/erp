import { combineReducers } from 'redux';
import {reducer as notifications} from 'react-notification-system-redux';
import accounts from './accounts/reducers';
import active_deal from './active_deal/reducers';
import auth from './auth/reducers';
import categories from './categories/reducers';
import clients from './clients/reducers';
import contracts from './contracts';
import dashboard from './dashboard/reducers';
import deals from './deals/reducers';
import departments_dicts from './departments_dicts/reducers';
import departments from './departments/reducers';
import filter from './filter/reducers';
import login_page from './login_page/reducers';
import main_page from './main_page/reducers';
import offices from './offices/reducers';
import notes from './notes';
import permissions from './permissions/reducers';
import positions from './positions/reducers';
import property from './property';
import roles from './roles/reducers';
import units from './units/reducers';
import user from './user/reducers';
import user_info from './user_info/reducers';
import users from './users/reducers';

const
	appReducers = combineReducers({
		accounts,
		active_deal,
		auth,
		categories,
		clients,
		contracts,
		dashboard,
		deals,
		departments_dicts,
		departments,
		filter,
		login_page,
		main_page,
		notifications,
		offices,
		notes,
		permissions,
		positions,
		property,
		roles,
		units,
		user,
		user_info,
		users
	}),

	rootReducer = (state, action) => {
		if(action.type === 'USER_LOGOUT')
			state = undefined;

		return appReducers(state, action);
	};

export default rootReducer;
