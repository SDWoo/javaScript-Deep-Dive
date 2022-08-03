(function printNow() {
  const today = new Date();

  const dayNames = [
    '(일요일)',
    '(월요일)',
    '(화요일)',
    '(수요일)',
    '(목요일)',
    '(금요일)',
    '(토요일)',
  ];

  const day = dayNames[today.getDay()];

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let milliSeconds = today.getMilliseconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours %= 12;
  hours = hours || 12; // hours가 0이면 12로 바꿈;

  minutes = String(minutes).padStart(2, '0');
  seconds = String(seconds).padStart(2, '0');

  const now = `${year}년 ${month}월 ${date}일 ${day} ${hours}:${minutes}:${seconds} ${ampm}`;
  console.log(now);

  setTimeout(printNow, 1000);
})();
