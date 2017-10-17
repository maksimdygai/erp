import request from './request.js';
import receive from './receive.js';
import reject from './reject.js';

export default payload => dispatch => {
    dispatch(request(true));

    return fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address/', {
        body: JSON.stringify({ 
            "query"     : payload,
            "from_bound": { "value": "city" },
            "to_bound"  : { "value": "city" },
            
            "locations": [{
                "region_fias_id": "f10763dc-63e3-48db-83e1-9c566fe3092b"
            }]
        }),

        headers: {
            'Content-Type' : 'application/json',
            'Accept'       : 'application/json',
            'Authorization': 'Token 24abf337916791033e77afc0169abbba4baa5a59'
        },

        method: 'POST'
    })

    .then(response => {
        if(response.ok)
            return response.json();

        response.json().then(error => dispatch(reject(error)));
    })

    .then(json => {
        dispatch(request(false));

        if(json) {
            dispatch(receive(json));
            dispatch(reject(null));
        }
    })

    .catch(error => {
        dispatch(request(false));
        dispatch(reject(error));
    });
};
