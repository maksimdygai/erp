import fetch from 'isomorphic-fetch';
import {browserHistory} from 'react-router';

export default payload => dispatch =>
    fetch('/api/contract_exclusive/add', {
        body       : JSON.stringify(payload),
        credentials: 'include',
        method     : 'POST'
    })

    .then(() => browserHistory.push('/contracts_exclusive'))
    .catch(error => console.log(error));
