# 브라우저의 렌더링 과정

> 웹 어플리케이션의 클라이언트 사이드 자바스크립트는 브라우저에서 HTML,CSS와 함께 실행된다.

- 파싱

  - 파싱(구분 분석)은 프로그래밍 언어의 문법에 맞게 작성된 텍스트 문서를 읽어 들여 실행하기 위해 쓴다.
  - 텍스트 문서의 문자열을 토큰으로 분해하고, 토큰의 문법적 의미와 구조를 반영하여 트리구조의 자료구조인 파스트리를 만든다.
  - 일반적으로 파싱이 완료된 이후에는 파스 트리를 기반으로 중간 언어인 바이트코드를 생성하고 실행한다.

- 렌더링
  - 렌더링은 HTML, CSS, 자바스크립트로 작성된 문서를 파싱하여 브라우에 시각적으로 출력하는 것을 말한다.

```
🫵 렌더링 과정
1. 브라우저는 HTML, CSS, 자바스크립트, 이미지, 폰트 파일 등 렌더링에 필요한 리소스를 요청하고 서버로부터 응답을 받는다.
2. 브라우저의 렌더링 엔진은 서버로부터 응답된 HTML과 CSS를 파싱하여 DOM과 CSSOM을 생성하고 이들을 결합하여 `렌더 트리`를 생성한다.
3. 브라우저의 자바스크립트 엔진은 서버로부터 응답된 자바스크립트를 파싱하여 AST를 생성하고 바이트코드로 변환하여 실행한다.
    (이때 자바스크립트는 DOM API를 통해 DOM이나 CSSOM을 변경할 수 있다. 변경된 DOMrhk CSSOM은 다시 렌더 트리로 결합된다.)
4. 렌더 트리를 기반으로 HTML 요소의 레이아웃을 계산하고 브라우저 화면에 HTML요소를 페인팅한다.
```

<br />
<br />

# 요청과 응답

> 렌더링에 필요한 리소스는 모두 서버에 존재하므로 필요한 리소스를 서버에 요청하고 서버가 응답한 리소스를 파싱하여 렌더링한다.

- 서버에 요청을 전송하기 위해 브라우저는 주소창을 제공한다.
  - 브라우저의 주소창에 URL을 입력하고 엔터키를 누르면 URL의 호스트 이름이 DNS을 통해 IP주소로 변환된다.
  - 그 후 해당 IP주소를 갖는 서버에게 요청을 전송한다.
  - 브라우저의 주소창에 /,스키마와 호스트만으로 이루어진 요청이 오면 암묵적으로 index.html을 응답하도록 설정되어 있다.

```
💡 Network 패널
=> 요청과 응답은 개발자 도구의 NetWork 패널에서 확인할 수 있다.
=> 살펴보면 index.hmtl뿐만 아니라 css, img, 폰트 등이 응답되어 있다.
=> 렌더링 엔진이 HTML을 파싱하는 도중에 link,img,script등의 태그를 만나면 파싱을 중단하고 해당 리소스파일을 서버로 요청하기 때문이다.
```

<br />
<br />

# HTTP 1.1 과 HTTP 2.0

> HTTP: 웹에서 브라우저와 서버가 통신하기 위한 프로토콜(규약)이다.

- HTTP/1.1

  - 기본적으로 커넥션 당 하나의 요청과 응답만 처리한다.
  - 따라서 HTML 문서 내에 포함된 여러 개의 리소스 요청이 개별적으로 전송되고 응답 또한 개별적으로 전송된다.
  - 리소스의 동시 전송이 불가능한 구조이므로 요청할 리소스의 개수에 비례하여 응답 시간도 증가하는 단점이 있다.

- HTTP/2.2
  - 커넥션당 여러개의 요청과 응답(다중 요청/응답)이 가능하다.
  - 따라서 여러 리소스 동시 전송이 가능하므로 HTTP/1.1보다 페이지 로드 속도가 50% 정도 빠르다고 알려져 있다.

<br />
<br />

# HTML 파싱과 DOM 생성

> 브라우저의 렌더링 엔진은 응답받은 HTML문서를 파싱하여 브라우저가 이해 가능한 자료구조인 DOM을 생성한다.

```
💡 DOM 생성과정
1. 서버에 존재하던 HTML 파일이 브라우저의 요청에 의해 응답된다. 이 때 서버는 브라우저가 요청한 HTML파일을 읽어 들여 메모리에 저장한 다음
 메모리에 저장된 바이트르 인터넷에 경유하여 응답한다.
2. 브라우저는 서버가 응답한 HTML문서를 바이트 형태로 응답받는다. 그리고 응답된 바이트 형태의 HTML 문서는 meta 태그의 charset 어트리뷰트에 의해
지정된 인코딩 방식을 기준으로 문자열로 변환된다. (인코딩 방식은 응답 헤더에 담겨 응답됨) 브라우저는 이를 확인하고 문자열로 변환한다.
3. 문자열로 변환된 HTML 문서를 읽어들여 문법적 의미를 갖는 코드의 최소 단위인 토큰으로 분해한다.
4. 각 토큰들을 객체로 변환하여 노드들을 생성한다. 토큰의 내용에 따라 문서 노드, 요소 노드, 어트리뷰트 노드, 텍스트 노드가 생성된다.
노드는 이후 DOM을 구성하는 기본 요소가 된다.
5. HTML 문서는 HTML 요소들의 집합으로 이루어지며 HTML 요소는 중첩 관계를 갖는다. 이 중첩관계에 의해 부자관계가 생성되고,
 이 부자관계를 반영하여 모든 노드들을 트리 구조로 구성한다. 이 노드들로 구성된 트리 자료구조를 DOM 이라고 부른다.
```

<br />
<br />

# CSS 파싱과 CSSOM 생성

> 렌더링 엔진이 DOM을 생성해 나가다가 css를 로드하는 link태그나 style태그를 만나면 DOM 생성을 일시 중단한다.

- 서버로부터 css 파일이 응답되면 렌더링 엔진은 HTML과 동일한 해석과정(바이트 -> 문자열 -> 토큰 -> 노드 -> CSSOM)으로 파싱하여 CSSOM생성

<br />

# 렌더 트리 생성

> 렌더링 엔진은 서버로부터 응답된 HTML과 CSS를 파싱하여 DOM과 CSSOM을 생성하고 렌더링을 위해 `렌더 트리`로 결합된다.

- 렌더 트리는 브라우저 화면에 렌더링되는 노드만으로 구성된다. (display: none 같은거 안들어감)
- 완성된 렌더 트리는 HTML 요소의 `레이아웃`을 계산하는데 사용되며 브라우저 화면에 픽셀을 렌더링하는 `페인팅 처리`에 입력된다.
- 레이아웃 계산과 페인팅이 재차 실행되는 경우
  - 자바스크립트에 의한 노드 추가 또는 삭제
  - 브라우저 창의 리사이징에 의한 뷰포트 크기 변경
  - HTML요소의 레이아웃에 변경을 발생시키는 스타일 변경

* 리렌더링은 비용이 많이드므로 빈번하게 발생하지 않도록 주의하자.

<br />
<br />

# 자바스크립트 파싱과 실행

> 자바스크립트 파싱과 실행은 브라우저의 렌더링 엔진이 아닌 자바스크립트 엔진이 처리한다.

- 자바스크립트 소스 코드 - (토크나이저) -> 토큰
  - 단순한 문자열인 자바스크립트 코드를 어휘 분석하여 문법적 의미를 갖는 최소 단위인 토큰으로 분해한다.
- 토큰 - (파서) -> AST(Abstract Syntax Tree)
  - 토큰들의 집합을 구문분석하여 AST를 생성한다.
- AST - (바이트 코드 생성기) -> 바이트 코드
  - 파싱의 결과물로서 생성된 AST는 인터프리터가 실행할 수 있는 중간 코드인 바이트코드로 변환됨
- 바이트 코드 -> 인터프리터 -> (실행)

```
💡 리플로우와 리페인트
=> 자바스크립트 코드에 DOM이나 CSSOM을 변경하는 DOM API가 사용된 경우 DOM이나 CSSOM이 변경된다.
=> 리플로우: 레이아웃 계산을 다시 하는 것
=> 리페인트: 재결합된 렌더 트리를 기반으로 다시 페인트를 하는 것
```

<br />
<br />

# 자바스크립트 파싱에 의한 HTML파싱 중단

> script 태그의 위치에 의해 블로킹이 발생할 수 있다.

- script태그를 body 태그의 가장 아래에 위치시키는 이유
  - DOM이 완성되지 않은 상태에서 자바스크립트가 DOM을 조작하면 에러가 발생할 수 있다.
  - 자바크스립트 로딩/파싱/실행으로 인해 HTML 요소들의 렌더링에 지장받는 일이 발생하지 않아 페이지 로딩 시간이 단축된다.

```
💪 script태그의 async와 defer 어트리뷰트
- 둘다 HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 진행된다. (자바스크립트의 실행 시점에 차이가 있다.)
1. async 어트리뷰트
=> 자바스크립트의 파싱과 실행은 자바스크립트 파일의 로드가 완료된 직후 진행되며, 이떄 HTML 파싱이 중단된다.
=> 따라서 순서 보장이 필요한 script 태그에는 async 어트리뷰트 적지 말자.

2. defer 어트리뷰트
=> 자바스크립트의 파싱과 실행은 HTML 파싱이 완료된 직후인 DOM 생성이 완료된 직후에 진행된다.
=> DOM 생성이 완료된 이후 실행되어야 할 자바스크립트에 유용하다.
```
