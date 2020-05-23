import moment from 'moment/moment';

export const avatarBackground = () => "hsl(" + 360 * Math.random() + ',' +
    (10 + 70 * Math.random()) + '%,' +
    (55 + 10 * Math.random()) + '%)';

export const dateFormat = (date) => {

    const substruct = moment().dayOfYear() - moment(date).dayOfYear();

    if (moment().diff(date, 'months') > 12) {
        return 'DD MMM YYYY HH:mm';
    }
    if (moment().diff(date, 'days') > 6) {
        return 'DD MMM HH:mm';
    }
    if (substruct > 1) {
        return 'ddd HH:mm';
    }
    if (substruct > 0) {
        return '[Yestarday at] HH:mm';
    }

    return 'HH:mm'
}