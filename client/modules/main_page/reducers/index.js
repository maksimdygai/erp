import { combineReducers } from 'redux';
import data from './data.js';
import isCollapsed from './toggle_collapsable.js';
import isDropdownOpen from './toggle_dropdown.js';
import isModalOpen from './show_modal.js';
import isSidebarOpen from './toggle_sidebar.js';
import sidebar from './sidebar.js';

const main_page = combineReducers({
    data,
    isCollapsed,
    isDropdownOpen,
    isModalOpen,
    isSidebarOpen,
    sidebar
});

export default main_page;
