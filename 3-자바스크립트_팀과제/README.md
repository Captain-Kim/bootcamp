### 목표

<aside>
🚩 [자바스크립트 팀 과제]

- Javascript 과정을 마무리하며, 팀원들과 함께 JS 문법의 핵심을 적용해 볼 수 있는 영화 검색 사이트를 제작합니다.
- 기존에 개인 과제에서 TMDB를 이용하여 수행하신 과제의 **심화 버전**으로 진행합니다..


### 과제 개요

1. 개인과제에서 작성한 [내배캠 인기영화 콜렉션]을 발전시키는 팀 프로젝트
2. 팀원들의 프로젝트 N개 중 1개를 대표로 선택, 팀 프로젝트로 발전

### 요구사항
- (1) 필수요구사항
    - **[1] TMDB 또는 영화진흥위원회 오픈 API 이용(택 1 또는 중복 사용)**
        
        <aside>
        💡 **[영화진흥위원회 오픈 API란?]**
        영화진흥위원회 ‘**영화관입장권통합전산망’**에서 제공하는 오픈 API입니다. ‘박스오피스’, ‘영화정보’, 영화사정보’, ‘영화인정보’등 다양한 서비스를 제공하며, 문서가 국문으로 구성되어 있어 편합니다. 자세한 내용은 아래 링크를 참고해주세요.
        
        [영화진흥위원회 오픈API](https://www.kobis.or.kr/kobisopenapi/homepg/main/main.do)
        
        - TMDB, 영화진흥위원회 오픈 API 모두 사용 가능합니다.
        - 둘 중 한가지만 사용하여도 무방합니다.
        - 기존에 TMDB를 이용해 작성한 과제에 어떻게 적용해야 하나요?
            - 안1) 기존 과제의 UI 및 API를 그대로 사용합니다(영화진흥위원회 오픈 API 미사용)
            - 안2) 기존 과제의 UI는 유지하되, API만 변경할 수 있습니다.
            - 안3) 기존 과제의 UI를 사용하려는 API 환경에 맞게 새롭게 구성합니다.
        </aside>
        
    - **[2] 영화정보 상세 페이지 구현**
        - 기존 영화정보 카드 리스트에서 특정 item을 선택할 시, 상세 페이지로 이동하도록 구현합니다.
        - 상세 페이지에서 메인 페이지(홈)로 이동하는 UI도 함께 구성합니다.
    - **[3] 상세 페이지 영화 리뷰 작성 기능 구현**
        - 상세페이지에서 특정 영화에 대해 의견을 작성할 수 있는 UI를 구현합니다.
        - **작성자, 리뷰, 확인비밀번호**를 입력하도록 구현합니다.
        - 작성한 정보는 브라우저의 localStorage에 적재하도록 합니다.
            
            <aside>
            💡 **[localStorage를 사용하는 방법]**
            
            localStorage를 이용하면 웹 브라우저에서 로컬 데이터를 저장하고, 불러와 사용할 수 있습니다.
            
            **(1) 데이터 저장하기(setItem)**
            
            ```jsx
            localStorage.setItem('key', 'value');
            ```
            
            위와 같이 setItem 메소드를 사용하면 key와 value를 로컬 스토리지에 저장할 수 있습니다. 만약 이미 저장된 key 값이 있다면, 이전에 저장된 value 값을 대체합니다.
            
            ```jsx
            localStorage.setItem('username', 'Alice');
            ```
            
            위와 같이 실행하면, 'username'이라는 key에 'Alice'라는 value를 저장하게 됩니다.
            
            **(2) 데이터 불러오기(getItem)**
            
            ```jsx
            localStorage.getItem('key');
            ```
            
            위와 같이 getItem 메소드를 사용하면 key를 통해 저장된 value 값을 불러올 수 있습니다.
            
            ```jsx
            localStorage.getItem('username');
            ```
            
            위와 같이 실행하면, 'username'이라는 key에 해당하는 'Alice'라는 value를 읽어올 수 있습니다.
            
            **(3) 데이터 삭제하기(removeItem)**
            
            ```jsx
            localStorage.removeItem('key');
            ```
            
            위와 같이 removeItem 메소드를 사용하면 key 값에 해당하는 데이터를 삭제할 수 있습니다.
            
            ```jsx
            localStorage.removeItem('username');
            ```
            
            위와 같이 실행하면, 'username'이라는 key에 해당하는 'Alice'라는 value를 삭제할 수 있습니다.
            
            </aside>
            
            <aside>
            💡 **[Chrome 브라우저에서 localStorage에 저장된 정보를 확인하는 방법]**
            
            1. Chrome 개발자 도구 열기: 이를 위해 우선 브라우저에서 F12 키를 눌러 개발자 도구를 엽니다.
            2. Elements 탭에서 Storage 선택: 개발자 도구에서 Elements 탭을 선택하고, 하위에 있는 Storage 항목을 클릭합니다.
            3. Local Storage 선택: 이어서 Storage 항목 아래에 있는 Local Storage 항목을 선택합니다.
            4. localStorage에 저장된 정보 확인: 선택한 Local Storage 항목에서, 왼쪽에 저장된 정보의 키(key) 목록이 표시됩니다. 이 중 확인하려는 정보의 키를 클릭하면, 오른쪽에 해당 정보의 값(value)이 표시됩니다. 값이 JSON 형태로 저장된 경우, 개발자 도구에서 자동으로 이를 파싱(parsing)하여 보여줍니다.
            </aside>
            
    - **[4] github PR(=Pull Request) 사용한 협업**
    - **[5] UX를 고려한 validation check**
        - 영화 검색 시
        - 댓글 작성 시
        - 추가 기능 구현 시 반드시 삽입
    - **[6] 하기 기재된 Javascript 문법 요소를 이용하여 구현**
        - 문법 리스트(아래 사항 중 5개 이상)
            - const와 let만을 이용한 변수 선언
                
                ```jsx
                const a = 'test 01';
                let b = 'test 02';
                
                var c = 'no way!'; //쓰지 말 것
                ```
                
            - 형 변환 : 하기 예시 중 2개 이상 사용
                - number → string
                - string → number
                - boolean → string
            - 연산자 : 하기 예시 중 3개 이상 사용
                - 논리곱(&&) 연산자
                - 논리합(||) 연산자
                - 논리부정(!) 연산자
                - 삼항연산자(? :)
                - 타입연산자(typeof)
            - 화살표 함수 : 하기 예시 중 2개 이상 사용
                - 일반 화살표 함수
                    
                    ```jsx
                    let add = (x, y) => {
                      return x + y;
                    }
                    
                    console.log(add(2, 3));   // 5
                    ```
                    
                - 한 줄로 된 화살표 함수
                    
                    ```jsx
                    let add = (x, y) => x + y;
                    
                    console.log(add(2, 3));   // 5
                    ```
                    
                - 매개변수가 하나인 화살표 함수
                    
                    ```jsx
                    let square = x => x * x;
                    
                    console.log(square(3));   // 9
                    ```
                    
            - 조건문 : 하기 예시 전부 구현
                - if문(3개 중 1개 이상 필수)
                    - if
                    - if-else
                    - if-else if-else
                - switch문
                - 삼항연산자
                - 조건문 중첩(2개 중 1개 이상 필수)
                    - 2중 if
                    - if 내부 switch
            - 반복문 : 하기 예시 전부 구현
                - for문(3개 중 2개 이상 구현)
                    - 일반 for문
                    - for … in문
                    - for … of문
                - while문(2개 중 1개 이상 구현)
                    - 일반 while문
                    - do ~ while 문
                - 반복 제어 명령문(2개 중 1개 이상 구현)
                    - break문
                    - continue문
            - 객체
                - 객체 병합
                
                ```jsx
                let person1 = {
                  name: "홍길동",
                  age: 30
                };
                
                let person2 = {
                  gender: "남자"
                };
                
                let mergedPerson = {...person1, ...person2};
                
                console.log(mergedPerson);   // { name: "홍길동", age: 30, gender: "남자" }
                ```
                
            - 배열(1) : 하기 예시 중 2개 이상 사용
                - push
                - pop
                - shift
                - unshift
                - splice
                - slice
            - 배열(2) : 하기 예시 중 3개 이상 사용
                - forEach
                - map
                - filter
                - reduce
                - find
            - 자료구조 : 하기 예시 중 1개 이상 사용
                - Map 생성 및 사용하기
                    
                    <aside>
                    💡 **[Map의 주요 메서드 및 프로퍼티]**
                    
                    - `new Map()` – 새로운 `Map`을 만듭니다.
                    - `map.set(key, value)` – `key`를 이용해 `value`를 저장합니다.
                    - `map.get(key)` – `key`에 해당하는 값을 반환합니다. `key`가 존재하지 않으면 `undefined`를 반환합니다.
                    - `map.has(key)` – `key`가 존재하면 `true`, 존재하지 않으면 `false`를 반환합니다.
                    - `map.delete(key)` – `key`에 해당하는 값을 삭제합니다.
                    - `map.clear()` – 맵 안의 모든 요소를 제거합니다.
                    - `map.size` – 요소의 개수를 반환합니다.
                    </aside>
                    
                - Set 생성 및 사용하기(반복 포함)
                    
                    <aside>
                    💡 **[Set의 주요 메서드 및 프로퍼티]**
                    
                    - `new Set()` : 새로운 Set을 생성합니다.
                    - `set.add(value)` : Set에 새로운 값을 추가합니다.
                    - `set.has(value)` : Set에 특정 값이 존재하는지 여부를 반환합니다.
                    - `set.delete(value)` : Set에서 특정 값을 삭제합니다.
                    - `set.clear()` : Set 안의 모든 요소를 제거합니다.
                    - `set.size` : Set 안의 요소 개수를 반환합니다.
                    </aside>
                    
                - 
            - null, undefined : 하기 예시 필수 구현
                - null과 undefined를 활용한 ‘없는 값'에 대한 처리
                    
                    ```jsx
                    if(testValue === null) {
                    	// do something
                    }
                    
                    if(testValue === undefined) {
                    	// do something
                    }
                    ```
                    
            - callback 함수 : 하기 예시 필수구현
                - setTimeout, setInterval을 활용한 callback 함수 처리하기
            - DOM 제어하기 : 하기 api 목록 중, 4개 이상 사용하기
                
                <aside>
                💡 1.  문서 객체 생성과 선택
                
                - `document.createElement(tagName)` : 새로운 HTML 요소를 생성합니다.
                - `document.getElementById(id)` : id 속성을 기준으로 요소를 선택합니다.
                - `document.getElementsByTagName(name)` : 태그 이름을 기준으로 요소를 선택합니다.
                - `document.getElementsByClassName(name)` : 클래스 이름을 기준으로 요소를 선택합니다.
                - `document.querySelector(selector)` : CSS 선택자를 이용하여 요소를 선택합니다.
                - `document.querySelectorAll(selector)` : CSS 선택자를 이용하여 모든 요소를 선택합니다.
                1. 문서 객체 조작
                - `element.innerHTML` : 해당 요소 내부의 HTML 코드를 변경합니다.
                - `element.textContent` : 해당 요소 내부의 텍스트를 변경합니다.
                - `element.setAttribute(attr, value)` : 해당 요소의 속성 값을 변경합니다.
                - `element.getAttribute(attr)` : 해당 요소의 속성 값을 가져옵니다.
                - `element.style.property` : 해당 요소의 스타일 값을 변경합니다.
                - `element.appendChild(child)` : 해당 요소의 하위 요소로 child를 추가합니다.
                - `element.removeChild(child)` : 해당 요소의 하위 요소 중 child를 삭제합니다.
                - `element.classList.add(class)` : 해당 요소의 클래스에 새로운 클래스를 추가합니다.
                - `element.classList.remove(class)` : 해당 요소의 클래스 중에서 특정 클래스를 제거합니다.
                - `element.classList.toggle(class)` : 해당 요소의 클래스 중에서 특정 클래스를 추가 또는 제거합니다.
                1. 이벤트 처리
                - `element.addEventListener(type, listener)` : 해당 요소에서 이벤트가 발생했을 때 호출할 함수를 등록합니다.
                - `element.removeEventListener(type, listener)` : 해당 요소에서 등록된 함수를 제거합니다.
                - `event.preventDefault()` : 이벤트가 발생했을 때 기본 동작을 취소합니다.
                - `event.stopPropagation()` : 이벤트의 버블링을 방지하기 위해 이벤트 전파를 중지합니다.
                1. 기타
                - `window.location.href` : 현재 페이지의 URL을 가져옵니다.
                - `window.alert(message)` : 경고 메시지를 출력합니다.
                - `window.confirm(message)` : 확인 메시지를 출력하고 사용자의 답변에 따라 Boolean 값을 반환합니다.
                </aside>
                
            - module
                - import
                - export
- (2) 선택요구사항
    - CSS
        - flex 사용하기
        - grid 사용하기
        - 반응형 UI 구성하기
    - 상세페이지 리뷰 수정 및 삭제 기능 구현
    - 메인 페이지
        - 조건에 맞는 카드 리스트 정렬 기능(이름순, 별점순 등 자유롭게)
    - 위에서 설명하지 않은 기타 외부 API
    - 원하는 추가기능 무엇이라도 okay!
        - 여러분의 챌린지는 언제나 환영합니다. 필수 요구사항이 완료되었다면, 자유롭게 추가기능을 넣어주세요.
        - 단, 우선순위는 필수요구사항임을 명심해주세요!

    
</aside>
