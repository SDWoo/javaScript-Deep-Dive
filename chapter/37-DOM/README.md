# DOM

1. DOM: HMTL 문서의 계층적 구조와 정보를 표현하여 이를 제어할 수 있는 API이다. 즉, 프로퍼티와 메서드를 제공하는 트리 자료구조이다.

- HTML 요소가 렌더링 엔진에 의해 DOM을 구성하는 요소 노드 객체로 변환 (어트리뷰트는 어트리뷰트 노드, 텍스트 콘텐츠는 텍스트 노드)
- HTML 요소의 중첩관계에 의해 계층적인 부자 관계가 성립. -> 이 관계를 토대로 HTML 요소를 객체화한 모든 노드 객체들을 트리 자료구조로 구성

* 트리 자료구조: 노드간의 계층적 구조를 표현하는 비선형 자료구조 (루트 노드 -> 리프 노드) - 이 노드 객체들로 이루어진 트리 자료구조를 DOM이라고 한다.

2. 노드 객체의 구조(12개가 있는데 중요한건 4가지)- 문서 노드(document node): DOM트리의 최상위 루트 노드, document 객체를 가리킨다. 모든 DOM트리의 노드에 접근하기 위한 진입점

- 요소 노드(element node): HTML 요소를 가리키는 노드. 부자 관계를 가지며 그 부자관계로 정보를 구조화
- 어트리뷰트 노드: HTML요소의 어트리뷰트를 가리키는 노드. 요소 노드와만 연결되어 있으나 형제 관계가 아니라서 요소 노드를 통해 접근해야 한다.
- 텍스트 노드: HMTL 요소의 텍스트를 가리키는 노드. 요소 노드의 자식 노드이며 리프노드, 즉 DOM 트리의 최종단

* DOM을 구성하는 노드 객체는 자신의 구조와 정보를 제어할 수 있는 DOM API 사용 가능. (노드 객체는 브라우저 환경에서 추가적으로 제공하는 호스트 객체임)

- 모든 노드객체는 상속구조를 갖는다
  Ex) input 요소를 파싱하여 객체화한 input 요소 노드는 HTMLInputElement -> HTMLElement -> Element -> Node - > EventTarget -> Object로 프로토타입 에 바인딩
  - ( => 이렇게 되어 각 부모 인터페이스의 기능들을 다 사용할 수 있다. 고유한 기능일수록 프로토타입의 하위에 체인을 구축.
    => 결론: DOM은 HTML 문서의 계층적 구조와 정보를 표현한느 것은 물론 노드 타입에 따라 필요한 기능을 프로퍼티와 메소드의 집합인 DOM API로 제공한다. 이것으로 동적으로 구조나 내용 조작

3. 요소 노드 취득 (동적으로 HMTL의 구조나 내용 또는 스타일 등을 조작하기 위함 => 문서노드에서 document를 통해 호출)

   - id를 이용한 취득(getElementById - 중복될 경우 첫번째 요소만 반환, 없을 경우 null 반환, 암묵적으로 전역 프로퍼티 생성)
   - 태그를 이용한 취득(getElementByTagName - 중복된 요소 모두 HTMLCollections 객체에 담아 반환, 없으면 빈 객체 )
   - class를 이용한 취득(getElementByClassName - 태그와 비슷하게 중복된 요소 모두 HTMLCollections 객체에 담아 반환, 없으면 빈 객체)
   - css요소를 이용한 취득(querySelector(All) - css 선택자로 요소를 선택한다. 원래는 첫번째 없으면 null 이지만 All 붙으면 NodeList 객체에 담아 반환)

   * querySelector 방식이 다소 느리나. 구체적인 조건, 일관된 방법으로 요소 노드 취득 한다는 장점. 그래서 특정 id가 있는 경우가 아니면 querySelector 사용
   * 요소 노드 취득 확인: Element.prototype.matches로 확인 true, false로 리턴.
   * HTMLCollections와 NodeList의 차이점: collections는 live객체, nodelist는 none-liv 객체(상황에 따라 live) => 따라서 Collections 객체를 순회할 떄에는 역방향이나 아무것도 없을때가지 while문 (주의!) or 배열로 바꿔사용 => nodeList는 non-live라 괜찮지만, childNodes 프로퍼티 사용할 떄에는 live로 작동. => 결론 요소 취득 후 스프레드 문법이나 Array.from 메소드로 배열로 바꿔서 고차함수를 쓰든 하자.

4. 노트 탐색 (Node, Element 인터페이스)=> 노드를 취득한 이유 취득한 노드를 기점으로 DOM트리의 노드를 옮겨 다니며 부모, 형제, 자매 노드 등을 탐색 하는 것.

- 공백 텍스트 노드: HTML 요소 사이의 스페이스, 탭, 줄바꿈 등의 공백도 텍스트 노드를 생성하는 것. 걍 냅두셈
- 자식 노드 탐색
  => Node.prototype: 공백 텍스트 노드 포함한 NodeList 객체 반환(childNodes, firstChild, lastChild)
  => Element.prototype: 공백 텍스트 노드 포함 안한 HTMLCollections 객체 반환 (children, firstElementChild, lastElementChild)
- 자식 노드 존재 확인: Node.prototype.hasChildNodes -> 여거도 역시 공백 텍스트 노드 포함

* 요소 노드의 텍스트 노드 확인: firstChild 프로퍼티로 접근 가능\* 부모 노드 탐색: Node.prototype.parentNode
* 형제 노드 탐색: Node.prototype.previous(next)Silbing , Element.prototype.previous(next)ElementSibling
* 노드 정보 취득: Node.prototype.nodeType(Name);

<br/> 
<br/>

1. 요소 노드의 텍스트 조작

- nodeValue(텍스트 노드만 참조 및 할당 가능, 그 외에는 null 반환)
  => 텍스트를 변경할 텍스트 노드의 부모 요소 노드를 취득 한 이후 firstChild 프로퍼티로 탐색 후, nodeValue 프로퍼티로 값 변경
- textContent(요소 노드의 콘텐츠 영역 사이의 모든 텍스트를 모두 반환)
  => nodeValue로 텍스트 요소를 취득하는 코드가 복잡하니, 특정한 텍스트를 취득하는 것이 아니면 textContent가 더 간단.
  => 취득이 아닌 텍스트 요소 할당의 경우에는 모든 자식 노드가 제거되고 해당 문자열이 텍스트로 추가된다. HTML마크업 파싱 안됨

2. DOM 조작

- innerHTML : 요소 노드의 콘텐츠 영역 내에 포함된 HTML 마크업을 문자열로 변환한다.  
  => 크로스 사이팅 스크립팅 공격에 취약. HTML에 그대로 반영 되어버리기 때문, script 태그 작동 안하지만 에러 이벤트 강제 발생에는 쩔수=> DOMPurify.sanitize()로 HTML 새니티제이션을 하면 잠재적 위험성 제거 가능

* 해당 요소 노드의 HMTL 뒤에 추가하려면 += 또는 insertadjacenHTML 메서드 사용(네가지 위치 있음)

3. 노드 생성과 추가
   => 요소 노드(createElement)
   => 텍스트 노드 생성(createTextNode(), 특정 요소 노드의 자식 노드로 텍스트 노드 추가($li.appendChild()), 
=> 특정 요소 노드를 다른 특정 요소 노드의 마지막 자식 노드로 추가($fruits.appendChild($li))

4. 복수의 노드 생성과 추가
   => 복수의 요소 노드를 컨테이너 요소에 자식 노드로 추가하고, 컨테이너 요소를 넣고 싶은 요소에 자식으로 추가한다면 DOM은 한 번만 변경된다.
   => DocumentFragment 를 쓰면 쓸데없는 불필요한 컨테이너 요소가 DOM에 추가되는 부작용 해결

5. 노드 삽입
   => Node.prototype.appendChild (마지막 요소로 추가)
   => insertBefore(Node, childNode) => Node의 마지막 요소 앞에 childNode 삽입, Child가 자식요소 아니면 DOMexception, null 넣으면 마지막 자식 노드로 추가

6. 노드 이동: 이미 존재하는 노드를 appendChild 나 insertBefore 메서드를 활용
7. 노드 복사: Node.prototype.cloneNode([deep: true | false]): true 는 깊은 복사(모든 자손 노드가 포함된 사본 생성), false는 얕은 복사(텍스트 노드 없는 사본 생성)
8. 노드 교체: Node.prototype.replaceChild(newChild, oldChild): oldChild를 newChild 요소로 교체
9. 노드 삭제: Node.prototype.removeChild(child): 해당 child 요소 DOM에서 삭제

<br />
<br />

# 어트리뷰트

1. 어트리뷰트 노드와 attributes 프로퍼티: 요소 노드의 모든 어트리뷰트 노드의 참조가 담긴 NameNodeMap 객체를 반환한다.

- HTML 어트리뷰트 조작: attributes 프로퍼티는 getter만 존재해서 읽기 전용 접근자 프로퍼티
  => Element.prototype.get(set)Attribute 메서드 사용하면 attributes 프로퍼티를 통하지 않고 요소 노드에서 메서드를 통해 직접 변경 가능
  => Element.prototype.hasAttribute(), Element.prototype.removeAttribute()
- HTML 어트리뷰트 vs DOM 프로퍼티
  => DOM 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티. So, 참조와 변경이 가능하다.
  => HTML 어트리뷰트의 역할을 HTML 요소의 초기 상태를 지정하는 것이다. 즉, HTML 어트리뷰트 같은 HTML 요소의 초기 상태를 의미하여 이는 변하지 않는다.
  => 첫 렌더링이 끝난 시점에서 어트리뷰트 노드의 어트리뷰 값과 요소 노드의 value 프로퍼티에 할당된 값은 HTML 어트리뷰트와 동일하다.
  => 그 이후, 사용자가 input 요소에 무엇인가를 입력하기 시작하면 상황이 달라진다. (input의 value, checkbox 등에 대한 상태변화는 DOM프로퍼티에서 관리하나, id는 둘다 동일하게 작동해서 똑같은 값 갖음)
  => 1대1로 대응하는 경우가 대부분이지만, 아닌경우도 많다 ex) HTML 어트리뷰트인 checked는 문자열인데, DOM 프로퍼티는 boolean 값이다.

- data어트리뷰트와 dataset 프로퍼티: data어트리뷰트에 케밥 케이스로 저장되어 있는 값에 접근하려면 data.카멜케이스로 바꿔서 접근해야한다. (DOMStringMap 객체에 담아 반환)

> HTMLElement.prototype.style: 인라인 스타일 (CSS StyleDeclaration타입의 객체 반환, CSS는 원래 케밥 케이스 => 카멜 케이스) #클래스조작
> -className: className 프로퍼티는 문자열을 반환하므로 공백을 구분된 여러 개의 클래스를 반환하는 경우 다루기가 불편하다.
> -classList: class 어트리뷰트의 정보를 담은 DOMTokenList 객체를 반환.

    - add: 클래스 추가
    - remove: 일치하는 클래스 삭제, 없으면 무시
    - item: 인덱스에 해당하는 클래스 반환
    - contains: true, false로 포함여부 반환
    - replace: oldClassName, newClassName => 문자열 바꾸기
    - toggle: 있으면 삭제, 없으면 추가

# 요소에 적용되어 있는 CSS 스타일 참조

- getComputeStyle: 요소에 적용되어 있는 모든 CSS 스타일을 참조 해야 할 경우 사용 => :after, :before 와 같은 의사 요소를 지정하는 문자열 전달.
