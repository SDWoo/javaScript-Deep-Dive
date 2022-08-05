# Set

> Set 객체는 중복되지 않는 유일한 값들의 집합이다.

- 배열과 유사하지만 차이가 있다.
- 중복 포함 : 배열 O, Set X
- 요소 순서의 의미: 배열 O, Set X
- 인덱스로 요소 접근: 배열 O, Set X

<br />

# Set객체 생성

> Set 생성자 함수는 이터러블을 인수로 전달받아 Set객체를 생성한다.

- 이때, 이터러블의 중복된 값은 Set 객체에 요소로 저장되지 않음

```jsx
// 기본적인 사용법
const set1 = new Set([1, 2, 2, 3]);
console.log(set1); // {1,2,3};

// 중복 요소 제거
const uniq = (array) => array.filter((v, i, self) => self.indexOf(v) === i);
// indexOf(v) == i 이면 그 값밖에 없는 것이므로 됨
const uniq1 = (array) => [...new Set(array)];
console.log(uniq([2, 1, 2, 3, 4, 5, 3, 4]));
console.log(uniq1([2, 1, 2, 3, 4, 5, 3, 4]));
```

<br />

# 요소 개수 확인

> Set 객체의 요소 개수를 확인할 떄에는 Set.prototype.size 프로퍼티 사용

- size 프로퍼티는 setter 함수 없이 getter 함수만 존재하는 접근자 프로퍼티다.
- 따라서 size 프로퍼티에 숫자를 할당하여 Set 객체의 요소 개수에 접근할 수 없다.

```jsx
const { size } = new Set([1, 2, 3, 4, 3]);
console.log(size);
```

<br />

# 요소 추가

> Set 객체에 요소를 추가할 때는 Set.prototype.add 메서드를 사용한다. (새로운 요소 반영된 Set객체 반환)

- 같은 요소를 추가하려하면 중복 추가를 허용하지 않는다. (예외: NaN은 두개가 달라도 하나만 저장 가능)

```jsx
const set = new Set();
console.log(set); // Set(0) {}
set.add(1).add(2); // 연속 add도 가능
console.log(set); // Set(1) {1}
```

<br />

# 요소 존재 여부 확인

> Set 객체에 특정 요소가 존재하는지 확인하려면 Set.prototype.has 메서드를 사용한다. (불리언 값 반환)

```jsx
const set = new Set([1, 2, 3]);
console.log(set.has(1)); // true
```

<br />

# 요소 삭제

> Set 객체에 특정 요소를 삭제하려면 Set.prototype.delete 메서드를 사용한다. (불리언 값 반환)

```jsx
// 인덱스 값이 아닌 요소 값을 전달해야 함
const set = new Set([1, 2, 3]);
set.delete(2); // -> Set(2) {1,3}
set.delete(0); // 없는 값 삭제하면 무시.
set.delete(1).delete(3); // 타입에러, delete는 불리언 값 반환해서 연속 불가
```

<br />

# 요소 일괄 삭제

> Set 객체의 모든 요소를 일괄 삭제하려면 Set.prototype.clear 메서드를 사용한다. (undefined 반환)

```jsx
const set = new Set([1, 2, 3]);
set.clear();

console.log(set); // Set(0) {}
```

<br />

# 요소 순회

> Set 객체의 요소를 순회하려면 Set.prototype.forEach or 이터러블 이므로 for...of 문으로 순회할 수 있다.

```jsx
// forEach 방식
const set = new [1, 2, 3]();
// 첫번째 인수: 현재 순회중인 요소 값, 두번째 인수: 현재 순회중인 요소 값, 세번째인수: 현재 순회중인 Set 객체
set.forEach((v, v2, set) => console.log(v, v2, set));

// for...of 방식
const set = new Set([1, 2, 3]);

console.log(Symbol.iterator in set); // true
for (const value of set) {
  console.log(value); // 1 2 3
}

// 스프레드 문법도 가능
console.log([...set]); // [1,2,3]
// 배열 스트럭처링의 대상도 맞음
const [a, ...rest] = set;
console.log(a, rest); // 1 [2,3]
```

<br />

# 집합 연산

> 집합 연산을 수행하는 프로토타입 메서드를 구현해보자

- 교집합

```jsx
Set.prototype.intersection = function (set) {
  const result = new Set();

  for (const value of set) {
    if (this.has(value)) result.add(value); // 여기서 this는 이 함수를 사용하는 Set
  }

  return result;
};
// 또다른 방법
Set.prototype.intersection1 = function (set) {
  return new Set([...this].filter((v) => set.has(v)));
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 3]);

console.log(setA.intersection(setB));
```

- 합집합

```jsx
Set.prototype.union = function (set) {
  const result = new Set(this);

  for (const value of set) {
    result.add(value);
  }

  return result;
};

// 또 다른 방식
Set.prototype.union1 = function (set) {
  return new Set([...this, ...set]);
};
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([5, 3]);
console.log(setA.union(setB));
console.log(setA.union1(setB));
```

- 차집합

```jsx
Set.prototype.difference = function (set) {
  const result = new Set(this);

  for (const value of set) {
    result.delete(value);
  }
  return result;
};

// 또 다른 방법
Set.prototype.difference1 = function (set) {
  return new Set([...this].filter((v) => !set.has(v)));
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);
console.log(setA.difference(setB));
console.log(setB.difference1(setA));
```

- 부분 집합과 상위 집함

```jsx
Set.prototype.isSuperset = function (set) {
  for (const value of set) {
    if (!this.has(value)) return false;
  }
  return true;
};

// 또 다른 방법
Set.prototype.isSuperset1 = function (set) {
  const superArr = [...this];
  return [...set].every((v) => superArr.includes(v));
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

console.log(setA.isSuperset(setB));
console.log(setB.isSuperset1(setA));
```

<br />
<br />

# Map

> Map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다.

- Map 객체는 객체와 유사하지만 차이가 있다.
  - 키로 사용할수 있는 값: 객체(문자열 또는 심벌 값), Map 객체(객체를 포함한 모든 값)
  - 이터러블: 객체(x), Map 객체(o)
  - 요소 개수 확인: 객체(Object.key(obj).length), Map 객체(map.size)

<br />

# Map 객체의 생성

> Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성한다.

- 이 때 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 한다.

```jsx
const map = new Map();
const map1 = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
```

<br />

# 요소 개수 확인

> Map 객체의 요소 개수를 확인할 때는 Map.prototype.size 프로퍼티 사용

- getter만 있고 setter는 없어 size를 할당하려하면 무시됨

```jsx
const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
console.log(map.size);
```

<br />

# 요소 추가

> Map 객체 요소 개수를 추가할때에는 Map.prototype.set 메서드를 사용

- set 메서드도 새로운 요소가 추가된 Map객체를 반환하기 때문에 연속 호출 가능
- 중복된 키 값을 갖는 것은 덮어씌워짐 (에러는 안남)
- 키 값에 저장되는 것의 형태가 정해져 있지 않아서 다 들어감 (객체도 들어감)

```jsx
const map = new Map();

map.set('key1', 'v1').set('key2', 'v2');
console.log(map);
```

<br />

# 요소 취득

> Map 객체의 특정 요소를 취득하려면 Map.prototype.get 메서드를 사용한다.

```jsx
const map = new Map();
const lee = { name: 'Lee' };
const shin = { name: 'shin' };

map.set(lee, 'developer').set(shin, 'designer');

console.log(map.get(lee)); // developer
console.log(map.get('key')); // undefined
```

<br />

# 요소 존재 여부 확인

> Map 객체의 특정 요소 존재 여부 확인할 때에는 Map.prototype.has 메서드를 사용한다.

```jsx
const map = new Map();
const lee = { name: 'Lee' };
const shin = { name: 'shin' };

map.set(lee, 'developer').set(shin, 'designer');
console.log(map.has(lee)); // true
```

<br />

# 요소 삭제

> Map 객체의 요소를 삭제하려면 Map.prototype.delete 메서드를 사용한다.

- 불리언 값을 반환하므로 연속 호출 불가하다.

```jsx
const map = new Map();
const lee = { name: 'Lee' };
const shin = { name: 'shin' };

map.set(lee, 'developer').set(shin, 'designer');
map.delete(shin);
console.log(map);
```

<br />

# 요소 일괄 삭제

> Map 객체의 요소를 일괄 삭제하려면 Map.prototype.clear 메서드를 사용한다.

```jsx
const map = new Map();
const lee = { name: 'Lee' };
const shin = { name: 'shin' };

map.set(lee, 'developer').set(shin, 'designer');
map.clear();
console.log(map);
```

<br />

# 요소 순회

> Map 객체의 요소를 순회하려면 Map.prototype.forEach 메서드를 사용 or for...of 사용

```jsx
// 1. forEach 방식
// 첫번째 인수: 현재 순회 중인 요소 값
// 두번째 인수: 현재 순회 중인 요소 키
// 세번째 인수: 현재 순회 중인 Map 객체 자체

const map = new Map();
const lee = { name: 'Lee' };
const shin = { name: 'shin' };

map.set(lee, 'developer').set(shin, 'designer');
map.forEach((v, k, map) => console.log(v, k, map));

// 2. for...of 방식
const map = new Map();
const lee = { name: 'Lee' };
const shin = { name: 'shin' };

map.set(lee, 'developer').set(shin, 'designer');

for (const entry of map) {
  console.log(entry); // map의 내용 수루룩 나옴
}
```

- `이터레이터인 객체를 반환하는 메서드이기도 하다.`
  | Map 메서드 | 설명 |
  | --------------------- | ----------------------------------------------------------------------------------------- |
  | Map.prototype.keys | Map 객체에서 요소키를 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환 |
  | Map.prototype.values | Map 객체에서 요소값을 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환 |
  | Map.prototype.entries | Map 객체에서 요소키와 요소값을 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환 |

```jsx
const obj1 = { name: 'W' };
const obj2 = { name: 'YM' };
const map = new Map([
  [obj1, 'developer'],
  [obj2, 'Front Dev'],
]);
for (const key of map.keys()) {
  console.log(key);
}
// { name: 'W' }
// { name: 'YM' }
for (const value of map.values()) {
  console.log(value);
}
// developer
// Front Dev
for (const entry of map.entries()) {
  console.log(entry);
}
// [ { name: 'W' }, 'developer' ]
// [ { name: 'YM' }, 'Front Dev' ]
```
