# Symbol

> 변경 불가능한 원시타입이자, 다른 값과 중복되지 않는 유일무이한 값이다.

<br />

# Symbol 값의 생성

> Symbol 값은 Symbol 함수를 호출해 생성해야 함.

- 다른 값과 중복되지 않는 유일한 값
- new 연산자를 쓰지 않고 생성함 (객체가 아닌 원시 값이기 때문)
- 심벌 값에 대한 설명이 같더라도 유일무이한 값이기 때문에 결국 다름
- 문자열이나 숫자 타입으로 암묵적 형 변환이 안된다.
- 불리언 타입으로는 암묵적으로 형 변환 가능

```jsx
// 1. Symbol.for 메서드
// -> 전역 심벌 레지스트리에 해당 값이 있으면 그거 반환, 없으면 새로운 심벌 생성
const s1 = Symbol.for('mySymbol'); // 새로 생성
const s2 = Symbol.for('mySymbol'); // 있으니 전역 심벌 레지스트리에서 반환

console.log(s1 === s2); // true;
// 2. Symbol.keyFor 메서드
// -> 전역 심벌 레지스트리의 키를 추출할 수 있다.
Symbol.keyFor(s1); // -> 'mySymbol'
```

<br />
<br />

# 심벌과 상수

> 특별한 의미가 없고 상수 이름 자체에 의미가 있는 경우 심벌과 Object.freeze 사용

```jsx
const Direction = Object.freeze({
  UP: Symbol('up'),
  DOWN: Symbol('down'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
});

const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
  console.log('You are going up');
}
```

<br />
<br />

# 심벌과 프로퍼티

- 심벌과 프로퍼티 키
  - 심벌 값은 유일무이한 값으로 프로퍼티 키를 만들면 다른 프로퍼티 키와 절대 충돌하지 않는다.
  - 대괄호로 선언하고 대괄호로 접근해야 한다.
- 심벌과 프로퍼티 은닉
  - 심벌 값을 사용하여 생성한 프로퍼티는 for..in 문이나 Object.keys, Object.getOwnPropertyNames 메서드로 찾을 수 없음
  - Object.getOwnPropertySymbols 메서드로 찾을 수 있음

```jsx
const obj = {
  [Symbol.for('mySymbol')]: 1, // 심벌 값으로 프로퍼티 키 만듬
};
obj[Symbol.for('mySymbol')]; // -> 1
for (const key in obj) {
  console.log(key); // 출력내용 없음
}

console.log(Object.keys(obj)); // []
console.log(Object.getOwnPropertyNames(obj)); // []
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(mySymbol)]
```

<br />
<br />

# 심벌과 표준 빌트인 객체 확장

- 일반적으로 표준 빌트인 객체에 사용자 정의 메서드 추가하여 확장하는 것은 권장하지 않음
- 하지만 중복될 가능이 없는 심벌 값으로 프로퍼티 키를 생성하여 표준 빌트인 객체를 확장하면 가능

```jsx
// Array 표준 빌트인 객체에 메서드를 추가하여 확장하는 것 => 권장 X
Array.prototype.sum = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
}[(1, 2, 3)].sum(); // 6

// 심벌 값으로 프로퍼티 키를 갖는 메서드로 확장하는 경우 => 호환성 측면에서 O
Array.prototype[Symbol.for('sum')] = function () {
  return this.reduce((acc, cur) => acc + cur, 0);
}[
  // 단, 호출 시에 어색한 상황이 연출
  (1, 2, 3)
][Symbol.for('sum')](); // 6
```

<br />
<br />

# Well-known Symbol

> 자바스크립트가 기본 제공하는 빌트인 심벌 값을 ECMAScript 사양에서는 `Well-known Symbol` 이라 부른다.

- 이는, 자바스크립트 엔진 내부 알고리즘에 사용된다.
- for - of 문으로 순회 가능한 이터러블은 Well-known Symbol 인 `Symbol.iterator를 키로 갖는 메서드를 가진다.`
  - `Symbol.iterator 메서드를 호출` → `이터레이터를 반환 ( 이터레이션 프로토콜 )`
- 만약, 일반 객체를 이터러블처럼 동작하도록 구현하고 싶다면 이터레이션 프로토콜을 따르면 된다.
  - 즉, Symbol.iterator 를 키로 갖는 메서드를 객체에 추가하고 이터레이터를 반환하도록 구현하면, 그 객체를 이터러블이 된다.

```jsx
const iterable = {
  // Symbol.itertor 메서드를 구현하여 이터러블 프로토콜을 준수
  [Symbol.iterator]() {
    let cur = 1;
    const max = 5;

    // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환해야 한다.
    return {
      next() {
        return { value: cur++, done: cur > max + 1 };
      },
    };
  },
};

for (const num of iterable) {
  console.log(num); // 1 2 3 4 5
}
```
