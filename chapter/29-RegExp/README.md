# RegExp

> 정규표현식: 문자열을 대상으로 패턴 매칭을 제공한느 형식 언어다.

```jsx
const tel = '010-1234-567팔';

const regExp = /^\d{3}-\d{4}-\d{4}$/;

regExp.test(tel); // -> false
```

- 정규표현식을 사용하면 반복문과 표현식 없이 패턴 정의와 테스트로 간단하게 체크 가능
- 주석이나 공백을 허용하지 않고 여러가지 기호를 혼합해서 사용해서 가독성이 별로 안좋음

<br />

# 정규 표현식의 생성

> 정규 표현식 객체를 생성하기 위해서는 정규 표현식 리터럴과 RegExp 생성자 함수를 사용 가능

```jsx
// 정규 표현식 리터럴
const regexp = /is/i;
// 생성자 함수
const regexp1 = new RegExp(/is/i);
```

- 정규 표현식 리터럴은 패턴과 플래그로 이루어진다.
  - /regexp/i
  - / -> 시작, 종료 기호, regexp -> 패턴, i -> 플래그 (대소문자 구분 x)

<br />
<br />

# RegExp 메서드

- RegExp.prototype.exec: 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 배열로 반환

```jsx
const target = 'Is this all there is?';
const regExp = /is/;

regExp.exec(target);
// -> ["is", index: 5, input: '~~~~~~~", group: undefined]
// 모든 패턴을 나타내는 /g 플래그가 나와도 첫번째 결과만 반환한다.
```

<br />

- RegExp.prototype.test: 인수로 전달받은 문자열에 대해 정규 표현식의 패턴을 검색하여 매칭 결과를 불리언으로 반환

```jsx
const target = 'Is this all there is?';
const regExp = /is/;

regExp.test(target); // -> true
```

<br />

- RegExp.prototype.match: String 표준 빌트인 객체가 제공. 대상 문자열과 전달받은 정규 표현식과의 매칭 결과를 배열로 반환

```jsx
const target = 'Is this all there is?';
const regExp = /is/;

target.match(regExp);
// exec와 같은데 이것은 g 플래그가 붙으면 모든 매칭 결과를 반환한다.
```

<br />
<br />

# 플래그

> 플래그는 6개가 있지만, 일단 3개 살펴보자

- i (ignore case): 대소문자 구별하지 않고 패턴 검색 (한번만)
- g (global): 대상 문자열 내에 패턴과 일치하는 모든 문자열 전역 검색
- m (multi line): 문자열의 행이 바뀌더라도 패턴 검색을 계속함

```jsx
const target = 'Is this all there is?';

target.match(/is/); // -> 대소문자 구별, 하나만 반환 ['is', index: 5]
tartget.match(/is/i); // -> 대소문자 구별 x, 하나만 반환 ['is', index:5. ~~~~~]]
target.match(/is/g); // -> 대소문자 구별, 전역 검색 ['is', 'is']
target.match(/is/gi); // -> 대소문자 구별 x, 전역 검색 ['Is', 'is', 'is];
```

<br />
<br />

# 패턴

1. 문자열 검사 -> 위에서 했던 것들이 다 문자열 검색
2. 임의의 문자열 검색

```jsx
const target = 'Is this all there is?';
const regExp = /.../g; // 문자의 내용과 상관없이 (공백문자도 포함) 3자리 문자열과 매치 한다.

target.match(regExp);
```

 <br />

3. 반복 검색

```jsx
const target = 'A AA B BB Aa Bb AAA';
const regExp = /A{1,2}/g; // A가 최소 한번, 최대 두번 나오는 문자를 대소문자 구별, 전역 검색
const regExp1 = /A{2}/g; // A가 두번 나오는 문자를 대소문자 구별, 전역 검색
const regExp2 = /A{2,}/g; // A가 최소 두번 이상 나오는 문자열 대소문자 구별, 전역 검색
const regExp3 = /A+/g; // A라는 패턴이 최소 한번 이상 반복되는 문자열 의미한다.

target.match(regExp);
target.match(regExp1);
target.match(regExp2);
target.match(regExp3);

const target2 = 'color colour';
const regExpT = /colou?r/g; // colo 다음에 u가 최소 한번(0번 포함) 나오는 문자열 전역 검색

target2.match(regExpT);
```

 <br />

4. OR 검색

```jsx
const target = 'A AA B BB Aa Bb AAA';
const regExp = /A|B/g;

target.match(regExp); // -> ['A'"A" "A" "B", ...] 난리가 난다. A 또는 B이기 떄문이다.

// 분해되지 않은 단어 레벨 검색
const regExp1 = /A+|B+/g; // match 결과 -> ["A", "AA", "B", "BB" ...];
// or 표현 하지 않고 하는 방법
const regExp2 = /[AB]+/g; // match 결과 -> ["A", "AA", "B", "BB" ...];
// 범위 지정하는 방법
const regExp3 = /[A-Z]+/g; // A~Z까지 한번이상 반복되는 것 찾기
const regExp4 = /[A-Za-z]+/g; // 대소문자 구별 없이 한번 이상 반복
const regExp5 = /[0-9,]+/g; // 0~9 또는 ','가 한번이상 반복
// 범위 지정하는 방법 2 -> 대문자는 모든 소문자의 반대를 가리킴
const regExp6 = /[\d,]+/g; // 0~9 또는 ','가 한번 이상 반복
const regExp7 = /[\D,]+/g; // 0~9가 아닌 문자거나 ','가 한번 이상 반복
const regExp8 = /[\w,]+/g; // 알파벳, 숫자, 언더스코어 , ',' 가 한 번 이상 반복
const regExp8 = /[\W,]+/g; // 알파벳, 숫자, 언더스코어 , ',' 가 한 번 이상 반복
```

<br />

5. NOT 검색

```jsx
const target = 'AA BB 12 Aa Bb';
const regExp = /[^0-9]+/g; // 0~9가 아닌 것으로 한 번이상 반복되는 것을 전역 검색
target.match(regExp);
```

<br />

6. 시작 위치로 검색

```jsx
const target = 'https://poiemaweb.com';
const regExp = /^https/; // [] 밖의 ^은 ^뒤의 문자열로 시작하는가를 검색한다.
target.match(regExp);
```

<br />

7. 마지막 위치로 검색

```jsx
const target = 'https://poiemaweb.com';
const regExp = /com$/; // $가 붙으면 문자열의 마지막을 의미한다.
target.match(regExp);
```

<br />
<br />

# 자주 사용하는 정규 표현식

- 특정 단어로 시작하는지(끝나는지) 검사 -> /^문자열/ or /문자열$/
- 숫자로만 이루어진 문자열인지 검사 -> /^\d+$/
- 하나 이상의 공백으로 시작하는지 검사 -> /^[\s]+/ (\s는 여러가지 공백문자 의미 -> 스페이스, 탭 등)
- 아이디로 사용 가능한지 검사 -> /^[A-Za-z0-9]{4,10}$/
- 메일 주소 형식이 맞는지 검사 -> 완죠니 길어보려잉 구글링 합시다잉
- 핸드폰 형식 맞는지 검사 -> /^\d{3}-\d{4}-\d{4}$/
- 특수문자 포함 여부 -> /[^a-za-z0-9]/gi
