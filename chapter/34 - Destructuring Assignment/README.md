# 디스트럭처링 할당 (구조 분해 할당)

> 구조화된 배열과 같은 이터러블 또는 객체를 비구조화 하여 1개 이상의 변수에 할당 하는것

<br>

# 배열 디스트럭처링 할당

> 배열 디스트럭처링 할당의 대상은 이터러블이여야 하며, 할당 기준은 배열의 인덱스이다.

- 하지만 변수와 요소 개수가 반드시 일치할 필요는 없다.

```jsx
const arr2 = [1, 2, 3];

const [one, two, three] = arr;
console.log(one, two, three);
```

- 이터러블에서 필요한 요소만 추출하여 변수에 할당하고 싶을 때 유용하게 사용

```jsx
// URL 파싱 -> {protocol, host, path} 프로퍼티를 갖는 객체 생성 후 반환
function parseURL(url = '') {
  const parsedURL = url.match(/^(\w+):\/\/([^/]+)\/(.*)$/);
  console.log(parsedURL);
  // ['https://google.com/ko/javascript', 'https', 'google.com', 'ko/javascript', index: 0, input: 'https://google.com/ko/javascript', groups: undefined]
  if (!parsedURL) return {};

  const [, protocol, host, path] = parsedURL;
  return { protocol, host, path };
}

const parsedURL = parseURL('https://google.com/ko/javascript');
console.log(parsedURL); // {protocol: 'https', host: 'google.com', path: 'ko/javascript'}
```

- Rest요소를 배열 디스트럭처링 할당을 위한 변수에 사용 가능

```jsx
const [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [2,3]
```

<br>
<br>

# 객체 디스트럭처링 할당

> 객체의 각 프로퍼티를 객체로부터 디스트럭처링하여 변수에 할당하기 위해서는 프로퍼티 키를 사용해야함

```jsx
const user = { firstName: 'DongWoo', lastName: 'Shin' };

const { firstName, lastName } = user;
console.log(firstName, lastName);
```

- 객체의 프로퍼티 키와 다른 변수 이름으로 프로퍼티 값을 할당받으려면 다음과 같이 변수를 선언해야함

```jsx
const user = { firstName: 'DongWoo', lastName: 'Shin' };
const { firstName: fn, lastName: ln } = user;
console.log(ln, fn);
```

- `객체의 프로퍼티 키로 필요한 프로퍼티 값만 추출하여 변수에 할당하고 싶을 때 유용하게 사용`

  - 객체를 인수로 전달받는 `함수의 매개변수에도 사용할 수 있다.`
  - 좀 더 간단하고 가독성 좋게 표현 가능

  ```jsx
  function printFruit({ id, name }) {
    console.log(`상품코드 : ${id}, 상품명 : ${name}`);
  }
  printFruit({ id: 1, name: '사과' }); // 상품코드 : 1, 상품명 : 사과
  ```

- 중첩 객체의 경우 사용법

```jsx
const user = { name: Lee, address: { ZipCode: '03068', city: 'Seoul' } };
const {
  address: { city },
} = user;
console.log(city);
```

- 객체 디스트럭처링 할당을 위한 변수에 `Rest 요소를 사용 가능`

  ```jsx
  // 객체 디스트럭처링 Rest 요소 적용
  const { x, ...rest } = { x: 1, y: 2, z: 3 };
  console.log(x, rest); // 1 { y: 2, z: 3 }
  ```
