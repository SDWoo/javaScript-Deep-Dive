# String

> 표준 빌트인 객체이면 원시타입인 문자열을 다룰 때 유용한 프로퍼티와 메서드를 제공한다. (생성자 함수이기도 함)

<br />

# String 생성자 함수

> String 생성자 함수의 인수로 전달(or not) new 연산자와 함께 호출하면,
> [[StringData]] 내부 슬롯에 해당 인수로 전달받은 문자열을 할당한 String 래퍼 객체 생성

- 아무것도 안 전달하면 빈 문자열 할당
- 문자열이 아닌 값을 전달하면 문자열로 강제 형변환
- 유사배열 객체이자 이터러블이므로 length 프로퍼티 갖음

<br />

# String 메서드

> 원본 String 래퍼 객체를 직접 변경하는 메서드는 존재하지 않음(원시값이기 때문) -> 언제나 새로운 문자열 반환

```jsx
// 1. String.prototype.indexOf() -> 문자열에서 해당 문자를 검색해 첫번째 인덱스 전달 / 없으면 -1
const str = 'Hello World';

str.indexOf('l'); // -> 2
str.indexOf('l', 3); // -> 3
// 문자열이 포함되어 있는지를 확인할 때에는 includes를 사용하면 가독성이 더 좋다.

// 2. String.prototype.search() -> 정규 표현식을 전달해 일치하는 문자열의 인덱스 전달 / 없으면 -1
str.search(/o/); // -> 4

// 3. String.prototype.includes() -> 문자열에서 해당 문자열이 포함되어 있는지 불리언 값으로 전달
str.includes('Hello'); // -> true
str.includes('l', 3); // -> true

// 4. String.prototype.starts(ends)With() -> 인수로 전달받은 문자열로 시작(끝)하는지 불리언 값으로 전달
str.startsWith('He'); // -> true
str.endsWith('ld'); // -> true

// 5. String.prototype.charAt() -> 인수로 전달 받은 인덱스에 위치한 문자를 검색하여 반환
str.charAt(0); // -> 'H';
str.charAt(11); // -> ''; 인덱스를 벗어나면 빈 문자열반환

// 6. String.prototype.substring()
// -> 대상 문자열의 첫번째 인수로 전달받은 인덱스로 부터 두번째 인수로 전달받은 인덱스 바로 이전까지 부분 문자열 반환
str.substring(1, 4); // -> 'ell' (1번 인덱스 부터 3번 인덱스 까지)
str.substring(1); // -> 'ello World' (두번째 인자 생략 시 마지막 인덱스까지)
str.substring(4, 1); // -> 'ell' (첫번째 인수가 두번째 인수보다 큰 경우 교체)
str.substring(-2); // -> 'Hello world' (음수이거나 NaN인 경우 0으로 교체 해서 다 가져옴)
str.substring(1, 100); // -> 'ello world' (length 보다 긴 경우 마지막 인자를 length로 교체)
str.substring(0, str.indexOf(' ')); // -> 'Hello' (indexOf의 인자 기준으로 앞에 있는 문자열 취득)

// 7. String.prototype.slice()
// -> substring 이랑 비슷한데, 음수 처리 방식만 좀 다름
str.slice(-5); // -> 'Wolrd' (음수이면 뒤에서부터 처리);

// 8. String.prototype.Upper(Lower)Case() -> 대문자, 소문자로 변환
// 9. String.prototype.trim() -> 앞뒤에 공백인 문자열 제거
// str.trimStart() 와 str.trimEnd(); 가 나와 앞, 뒤를 구분할 수 있다.
// 10. String.prototype.repeat(); -> 문자열을 인수만큼 반복한다. 소수일경우 반내림, 음수일 경우 에러
// 11. String.prototype.replace() -> 첫번째로 입력받은 문자열 또는 정규식을 검색하여 두번째 문자열로 치환한 문자열 반환
str.replace('world', 'Lee'); // -> 'Hello Lee'
// 첫번째 인자 정규표현식 사용 예
const str = 'Hello Hello';
str.replace(/hello/gi, 'Lee'); // -> 'Lee Lee'

// 💡 카멜 케이스 스네이크 케이스로 바꾸기
function camelToSnake(camelCase) {
  return camelCase.replace(/.[A-Z]/g, (match) => {
    console.log(match); // -> 'oW'
    return match[0] + '_' + match[1].toLowerCase();
  });
}

const camelCase = 'helloWorld';
camelToSnake(camelCase); // -> 'hello_world'
// 💡 스네이크 케이스 카멜 케이스로 바꾸기
function snakeToCamel(snakeCase) {
  return snakeCase.replace(/_[a-z]/g, (match) => {
    console.log(match); // '_w'
    return match[1].toUpperCase();
  });
}

const snakeCase = 'hello_world';
snakeToCamel(snakeCase); // -> 'helloWolrd'

// 12. String.prototype.split()
// -> 첫번째 인수로 전달한 문자열 또는 정규 표현식을 검색해서 문자열을 구분한 후 배열로 반환
const str = 'How are you doing';
str.split(' '); // -> ['How', 'are', 'you', 'doing']
str.split(); // -> ["How are you doing"] (아무것도 안 전달 하면 그대로 나옴)
str.split(' ', 3); // -> ['How', 'are', 'you'] (두 번째 인자로 배열의 길이 지정)

// 💡 뒤집은 문자열 만들기
function reversedString(str) {
  return str.split('').reverse().join('');
}
reversedString('Hello world');
```
