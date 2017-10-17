import { combineReducers } from 'redux';
import tasks from './tasks/reducers';
import system_notes from './system_notes/reducers';
import userNotes from './user_notes/reducers';

export default combineReducers({
    tasks,
    system_notes,
    userNotes
});
