export default (arr, value, pred) => {
  if (pred === undefined){
    pred = (x => x.id == value);
  }
  
  let
    found = _.find(arr, pred);

  return found ? (found.value || found.name) : '—';
}
