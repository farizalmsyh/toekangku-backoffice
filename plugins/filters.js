import Vue from 'vue'
import moment from 'moment';
Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).locale('id').format('dddd, DD MMMM YYYY')
    }
});
Vue.filter('shortFormatDate', function(value) {
    if (value) {
        return moment(String(value)).locale('id').format('DD MMM YYYY')
    }
});
Vue.filter('separatorDot', function(number) {
    if (typeof number !== 'number') {
        number = parseInt(number);
    }
    const numberString = number.toFixed(0).toString();
    const parts = numberString.split(',');
    const integerPart = parts[0];
    let formattedInteger = '';
    let count = 0;
    for (let i = integerPart.length - 1; i >= 0; i--) {
        formattedInteger = integerPart[i] + formattedInteger;
        count++;
        if (count % 3 === 0 && i > 0) {
            formattedInteger = '.' + formattedInteger;
        }
    }
    if (parts.length === 2) {
        return formattedInteger + '.' + parts[1];
    }
    return formattedInteger;
});
Vue.filter('roundTwoComma', function(value) {
    if (value) {
        return Number(value) * 100;
    }
    return value
});
Vue.filter('roundedNumber', function(value) {
    if (value) {
        let floatValue = parseFloat(value);
        let roundedValue = floatValue.toFixed(2);
        return roundedValue;
    }
    return value
});