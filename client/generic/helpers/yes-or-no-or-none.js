export default value => {
  switch (value) {
    case 1:
      return 'Да';
      break;
    case 2:
      return 'Нет';
      break;
    default:
      return '—';
  }
}
