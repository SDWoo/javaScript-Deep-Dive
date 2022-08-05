# 스프레드 문법

> (...) 하나로 뭉쳐 있는 여러개의 값들을 펼쳐서 개별적인 목록으로 만든다.

- for...of 문으로 순회할 수 있는 이터러블에 한정된다.
- 스프레드 문법의 결과는 값이 아니므로 변수에 할당할 수 없다.
- 쉼표로 구분한 값의 목록을 사용하는 문맥에서만 사용
  - 함수 호출문의 인수 목록
  - 배열 리터럴의 요소 목록
  - 객체 리터럴의 프로퍼티 목록

```jsx
console.log(...[1, 2, 3]); // 1 2 3
console.log(...'Hello'); // H e l l o
console.log(...{ a: 2, b: 3 }); //Found non-callable @@iterator
```

<br>

# 함수 호출문의 인수 목록에서 사용하는 경우

```jsx
// 1. 배열의 요소들을 펼쳐서 최대값을 구하는 경우
const arr = [1, 2, 3];
const max = Math.max(arr); // -> NaN
const max1 = Math.max.apply(null, arr); // -> 3
const max2 = Math.max(...arr); // -> 3 (더 간단하고 좋음)
```

```
💡 Rest 파라미터와 헷갈리지 말 것
=> Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받기 위해 매개변수 이름 앞에 ... 붙임
=> 스프레드 문법은 여러 개의 값이 하나로 뭉쳐있는 이터러블을 펼치는 것이므로 반대의 개념
```

<br>
<br>

# 배열 리터럴 내부에서 사용하는 경우

1. concat

```jsx
// 간단하게 두개의 배열을 하나의 배열로 대체할 수 있다.
var arr = [1, 2].concat([3, 4]);
const arr2 = [...[1, 2], ...[3, 4]];
console.log(arr, arr2); // -> [1,2,3,4]  [1,2,3,4]
```

2. splice

```jsx
// splice의 세번째 인수로 배열을 전달할 경우
var arr1 = [1, 4];
var arr2 = [2, 3];
arr1.splice(1, 0, arr2); // -> [1,[2,3],4];
arr1.splice(1, 0, ...arr2); // -> [1,2,3,4];
```

3. 배열 복사

```jsx
// 배열을 얕은 복사할 경우
var origin = [1, 2];
var copy = origin.slice();
var copy2 = [...origin];
console.log(copy, copy2); // [1,2] [1,2]
```

4. 이터러블을 배열로 반환

> 이터러블을 배열로 반환하려면 apply 또는 call 메서드를 사용하여 slice 메서드를 호출해야 한다.

- 단, 이터러블이 아닌 유사배열 객체는 스프레드 문법의 대상이 될 수 없다.
- 그래서 Array.from 메서드를 사용

```jsx
function sum() {
  var args = Array.prototype.slice.call(arguments);

  return args.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}
console.log(sum(1, 2, 3));

// 스프레드 문법 버전
function sum() {
  return [...arguments].reduce((pre, cur) => pre + cur, 0);
}
// Rest 파라미터 버전
const sum = (...args) => args.reduce((pre, cur) => pre + cur, 0);
```

5. 객체 내부에서 사용하는 경우

> 스프레드 프로퍼티를 사용하면 일반 객체를 대상으로도 스프레드 문법 사용 허용

```jsx
// 스프레드 프로퍼티를 활용한 얕은 복사
const obj = { x: 1, y: 2 };
const copy = { ...obj };
console.log(copy); // {x:1, y:2} -> 얕은 복사라 같지는 않음

const merged = { x: 1, y: 2, ...{ a: 3, b: 4 } };
console.log(merged); //{x: 1, y: 2, a: 3, b: 4}

// 이전에는 Object.assign을 사용
```
