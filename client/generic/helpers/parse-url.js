export default (url) => {
  const
    pos = url.indexOf('?');

  if (pos == -1) {
    return {};
  }

  const
    query = url.substr(pos+1);
  let
    args = {};

  _.map(query.split('&'), arg => {
    arg = arg.split('+').join(' ');

    const
      eq = arg.indexOf('='),
      key = eq>-1 ? arg.substr(0, eq) : arg,
      val = eq>-1 ? decodeURIComponent(arg.substr(eq+1)) : '',
      from = key.indexOf('[');

    if (from == -1) {
      args[decodeURIComponent(key)] = val;
    }
    else {
      const
        to = key.indexOf(']', from),
        index = decodeURIComponent(key.substring(from+1, to)),
        key = decodeURIComponent(key.substring(0,from));

      if (!args[key])
        args[key] = [];

      if (!index)
        args[key].push(val);
      else
        args[key][index] = val;
    }
  });

  return args;
}
