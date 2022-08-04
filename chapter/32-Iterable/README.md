# 이터러블

## 이터레이션 프로토콜

> 순회 가능한 데이터 컬렉션(자료구조)를 만들기 위해 ECMAScript 사양에 정의하여 미리 약속한 규칙

- 이터레이션 프로토콜은 이터러블 프로토콜과 이터레이터 프로토콜로 나뉜다.
- 이터러블 프로토콜
  - Symbol.iterator를 프로퍼티 키로 사용한 메서드를 구현하거나 프로토타입 체인을 통해 상속받은 Symbol.iterator메서드를 호출하면,
    이터레이터 프로토콜을 준수한 이터레이터를 반환하는 규약
  - 이터러블 프로토콜을 준수한 객체를 `이터러블`이라고 한다.
  - `for ... of문`으로 순회할 수 있으며 `스프레드 문법`과 `배열 디스트럭처링` 할당 가능
- 이터레이터 프로토콜
  - 이터러블의 Syombol.iterator 메서드를 호출하면 이터레이터 프로토콜을 준수한 `이터레이터`를 반환한다.
  - 이터레이터는 next 메서드를 소유하며 next 메서드로 이터러블을 순회하며 value와 done 프로퍼티를 갖는 `이터레이터 리절트 객체` 반환
  - 이러한 규약을 `이터레이터 프로토콜`이라고 하며 이것을 준수한 객체를 `이터레이터`라고 한다.
  - 이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 함

<br />

## 이터러블

- `for ... of문`으로 순회할 수 있으며 `스프레드 문법`과 `배열 디스트럭처링` 할당 가능
- 일반 객체는 이터러블 프로토콜은 준수한 이터러블이 아니다. (스프레드 프로퍼티는 사용 가능)

```jsx
// 이터러블 확인 방법
const isIterable = (v) =>
  v !== null && typeof v[Symbol.iterator] === 'function';

// 배열, 문자열, Map, Set true
isIterable([]); // true
isIterable(''); // true
isIterabel({}); // false ->
```

<br />

## 이터레이터

- 이터레이터의 next 메서드가 반환하는 이터레이터 리절트 객체의 value 프로퍼티는 현재 순회중인 이터러블의 값을 나타낸다.
- done프로퍼티는 이터러블의 순회 완료 여부를 나타낸다.

```jsx
const array = [1, 2];

const iterator = array[Symbol.iterator]();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

```
자바스크립트는 이터레이션 프로토콜을 준수한 객체인 빌트인 이터러블을 제공한다.
 => Array, String, Map, Set, TypeArray, arguments, DOM컬렉션
```

<br />
<br />

# for ... of 문

- 내부적으로 이터레이터의 next 메서드를 호출하여 이터러블을 순회한다.
- 순회하며 next 메서드가 반환한 이터레이터 리절트 객체의 value 값을 변수에 할당한다.
- 이터레이터 리절트 객체의 done값이 false면 순회 계속, true면 순회 중단.

```jsx
for (const item of [1, 2, 3]) {
  console.log(item);
}
```

<br />

# 이터러블과 유사 배열 객체

> 유사배열 객체는 이터러블이 아닐 경우 for ... of 순회가 불가하다.

- 유사배열 객체: length 프로퍼티를 갖는 객체이며 숫자 형태 key 로 접근 가능해 배열처럼 보이는 것
- arguments, NodeList, HTMLCollection과 같이 유사배열 객체이며 이터러블인 것들도 있다.
- 배열처럼 사용하고 싶으면 Array.from 메서드로 배열로 바꾸면 끝임

<br />

# 이터레이션 프로토콜의 필요성

- 다양한 데이터 공급자가 하나의 순회 방식을 갖도록 규정하고,
- 데이터 소비자가 효율적으로 다양한 데이터 공급자를 사용할 수 있도록 하여야 함
- 이터레이션 프로토콜이 데이터 소비자와 데이터 공급자를 연결하는 인터페이스의 역할을 함

<br />

# 사용자 정의 이터러블

> 이터레이션 프로토콜을 준수하지 않는 일반 객체도 이터레이션 프로토콜을 준수하도록 구현하면 사용자 정의 이터러블이 된다.

```jsx
// 피보나치 예시
// 1. 사용자 정의 이터러블 구현
const fibonacci = {
  [Symbol.iterator]() {
    let [pre, cur] = [0, 1];
    const max = 10;

    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { value: cur, done: cur >= max };
      },
    };
  },
};

for (const num of fibonacci) {
  console.log(num); // 1 2 3 5 8
}

// 2. 이터러블을 생성하는 함수 구현
const fibonacci = function (max) {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur >= max };
        },
      };
    },
  };
};

// 3. 이터러블이면서 이터레이터인 객체를 생성하는 함수
const fibonacci = function (max) {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    nexr() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur, done: cur >= max };
    },
  };
};

// 4. 무한 이터러블과 지연 평가
// 무한 이터러블로 무한 수열을 간단히 구현가능 (done 프로퍼티 생략)
const fibonacci = function () {
  let [pre, cur] = [0, 1];

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur };
    },
  };
};

for (const num of fibonacci()) {
  if (num > 10000) break;
  console.log(num);
}

const [f1, f2, f3] = fibonacci();
console.log(f1, f2, f3);
// for of 문은 next 메서드가 호출되기 전까지 데이터를 생성하지 않음
// 그래서 데이터가 필요할때 까지 데이터의 생성을 지연하다가 데이터 필요한 순간에 생성
// --> 불필요한 메모리 소비 X, 데이터를 필요한 순간에 생성해 빠른 실행 속도 기대
```
