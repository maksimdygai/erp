/**
 * Форматирование числа из вида 0000000(.|,)000 в вид 0 000 000(.|,)000
 * @param {string | number} number - исходное число
 * @param {boolean} withFrac - возвращать с дробной частью
 * @return {string} отформатированное число
 */
export default function formatNumber(number, withFrac = true) {
    const numString = number.toString().replace(/ /g, '');
    let arr;
    if (/\./.test(numString)) {
        arr = numString.split('.');
    }
    if (/,/.test(numString)) {
        arr = numString.split(',');
    }
    const int = typeof arr !== 'undefined' ? arr[0] : numString;
    const frac = typeof arr !== 'undefined' && arr.length > 1 !== 'undefined' ? arr[1] : '00';
    const integerPart = int.split('').reverse().join('').replace(/(\d{3})/g, '$1 ');
    const integerPartResult = integerPart.split('').reverse().join('');
    return withFrac ? `${integerPartResult},${frac}` : integerPartResult;
}
