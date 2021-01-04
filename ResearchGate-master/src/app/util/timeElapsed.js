export function timeElapsed(createdAt) {
  const since = new Date(createdAt);
  const elapsed = parseInt((new Date() - since) / 1000);

  const days = Math.floor(elapsed / 86400);
  const years = Math.floor(days / 365);

  const hours = Math.floor((elapsed / 3600) % 24);
  const minutes = Math.floor((elapsed / 60) % 60);
  const seconds = Math.floor(elapsed % 60);

  if (days > 1) {
    let monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let day = since.getDate();
    let monthIndex = since.getMonth();
    let year = since.getFullYear();
    let hour = since.getHours();
    let minute = since.getMinutes();
    minute < 9 ? (minute = '0' + minute) : (minute = '' + minute);
    hour < 9 ? (hour = '0' + hour) : (hour = '' + hour);
    // Aug 2 2019 at 12:12
    return (
      day +
      ' ' +
      monthNames[monthIndex] +
      ' ' +
      year +
      ' at ' +
      hour +
      ':' +
      minute
    );
  } else {
    let ret = '';
    if (years > 0) ret = years + ' years';
    else if (days > 0) ret = days + ' day';
    else if (hours > 0) ret = hours + ' hours';
    else if (minutes > 0) ret = minutes + ' minutes';
    else ret = seconds + ' seconds';

    return ret + ' ago';
  }
}
