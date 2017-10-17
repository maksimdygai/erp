export default data => history.pushState(null, null, `#${JSON.stringify(data)}`);
