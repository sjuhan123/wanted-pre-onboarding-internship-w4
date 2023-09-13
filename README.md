# wanted-pre-onboarding-internship-w4

원티드 프리온보딩 인턴십 4주차 과제

👉👉 [배포사이트 방문하기](https://time-series-chart-assign.vercel.app/)

## 과제 소개

- 주어진 데이터로 시계열 차트 만들기
- 시계열 차트 호버 기능 구현
- 시계열 차트 필터링 기능 구현

## 기술 스택

- 빌드: Vite
- 뷰: React with TypeScript
- 스타일링: Styled-Components
- 차트: D3.js
- 테스트: Jest, React Testing Library
- 배포: Vercel

## 과제 진행 순서

<img width="698" alt="스크린샷 2023-09-13 오후 5 30 00" src="https://user-images.githubusercontent.com/81420856/267588326-a170063c-4638-4a55-9ea9-83a8cf0f3222.png">

### 환경 구성

**왜 CRA가 아닌 Vite?**

차트가 렌더링 되는데 있어서 빌드 속도가 중요하다고 생각했다. CRA는 Webpack을 사용하기 때문에 빌드 속도가 느리다. Vite는 기본적으로 ESBuild를 사용하여 빌드를 하기 때문에, 빌드 속도가 빠르다.

**왜 D3.js?**

React 프로젝트에서 차트를 만들 때 많이 사용되는 Recharts와 chart.js 등 수많은 유명 라이브러리들이 있지만, 이 중 상당수 라이브러리의 기반이 되는 D3.js를 활용해보면서 차트 라이브러리의 기본적인 구조를 이해해보고 싶었다.
짧은 과제 기간(3 ~ 4일) 동안 런닝 커브가 있는 D3.js를 선택하는 것은 위험부담이 있지만, D3.js를 활용해보고 싶었고, 또한 D3.js를 활용하면서 React와의 연동을 어떻게 할 수 있을지 궁금했다.

**왜 MSW?**

실제 백엔드 API가 구현되기 전에 프론트엔드 개발을 진행해야 하는 상황을 가정하며, 목 데이터를 사용하여 "뷰 컴포넌트 설계 및 구현 -> 테스트 -> 리팩토링/Bug Fix" 주기를 경험해보고자 했다.

이번 프로젝트에서 새로 사용하는 기술스택이 많아서, 환경 구성 시점 부터 여러 에러들을 만났다. 특히, jest + d3.js + styled-components 조합에서 많은 시간을 소비했다. 그래서 최대한 각 기술 스택별 깃허브 issue에서 관련 이슈를 찾아서 해결했다.

> 참고자료
>
> 1. Cannot find module 'jest-dom/extend-expect'  
>    https://github.com/testing-library/react-testing-library/issues/138
> 2. Unexpected token 'export' when Jest test imports d3  
>    https://stackoverflow.com/questions/64874503/unexpected-token-export-when-jest-test-imports-d3
> 3. Jest + D3.js + Typescript  
>    https://hung.dev/posts/jest-vite

### 컴포넌트 설계

<img width="953" alt="스크린샷 2023-09-13 오후 6 39 22" src="https://user-images.githubusercontent.com/81420856/267608491-29b340fd-e4fd-4266-9084-905a11278bfc.png">

### 테스트 시나리오 작성

- 테스트는 구현이 아닌 결과를 검증하도록 한다.
- 읽기 좋은 테스트를 작성한다.

1. ~~메인 페이지~~

   1. 헤더를 보여준다.
   2. "전체" 버튼이 선택되어 있는 필터링 바를 보여준다.
   3. "전체" 차트를 보여준다.

1. 필터차트

   1. 필터링 바
      1. 필터 버튼을 보여준다.
      2. 선택된 필터 버튼은 하이라이트 처리된다.
   2. 시계열 차트
      1. 왼쪽 가로축의 헤더는 "Area"다.
      2. 오른쪽 가로축의 헤더는 "Bar"다.
   3. ~~상호 작용~~
      1. 강남구 필터링 버튼을 입력하면, 강남구 데이터 구역이 하이라이트 처리된다.
      2. 데이터 구역을 호버하면 데이터 툴팁을 보여준다.
      3. 호버한 데이터 구역을 클릭하면 해당 데이터구역이 하이라이트 처리된다.
      4. 호버한 데이터 구역을 클릭하면 해당 구역의 필터링 버튼이 하이라이트 처리된다.

> 결과적으로 메인페이지와, 상호작용 테스트는 구현하지 못했다. 이유는 아래와 같다.
>
> 1. 메인 페이지
>    메인 컴포넌트에서는 하위 컴포넌트를 불러와서 렌더링 하게 된다.  
>    컴포넌트의 의존성이 크다는 것인데, 이는 테스트를 작성하기 어렵게 만든다.
>    특히, D3.js를 사용한 차트 컴포넌트도 렌더링이 되는데, Jest와 D3.js 그리고 styled-components를 함께 사용하면서 테스트를 작성하는 것이 어려웠다.
> 2. 상호작용
>    FilterChart 컴포넌트가 사용자의 인터렉션에 따라서 동적으로 렌더링 되는 것을 테스트 하려고 했다.
>    하지만, Jest + styled-components + D3.js 에 대한 숙련도가 부족하여 테스트를 작성하지 못했다.

### 컴포넌트 구현

- msw로 목 데이터를 사용하여 개발을 진행했다.
- 컴포넌트 설계 -> 테스트 코드 작성 -> 컴포넌트 구현 -> 태스트 진행 -> 컴포넌트 리팩토링 -> 테스트 코드 리팩토링(테스트의 한계를 만났을 때.) -> 테스트 ... 의 주기로 개발을 진행했다.
- 각 컴포넌트 props의 네이밍은 명확하게 하기 위해 노력했다.
- 컴포넌트의 의존성을 최대한 줄이기 위해 노력했다.

### 컴포넌트 리팩토링

- d3.js를 이용해서 TimeSeriesChart 컴포넌트를 구현했는데, 현재 코드 분리가 전혀 되어 있지 않다. 과제 기간 종료 이후 d3.js 학습을 통해 리팩토링 방향성을 정하고 리팩토링을 진행할 예정이다.

## 학습 & 참고자료

1. d3.js 자료

- Elements are duplicated instead of moved in D3 with React  
  https://stackoverflow.com/questions/71527112/elements-are-duplicated-instead-of-moved-in-d3-with-react
- Area Chart  
  https://observablehq.com/@d3/area-chart/2?intent=fork
- Bar Chart  
  https://observablehq.com/@d3/bar-chart/2?intent=fork
- Bar Chart Hover  
  https://observablehq.com/@artidataio/bar-chart-hover-tooltip-date-scale
- Stackable Multi-chart(line, area, bar)  
  https://observablehq.com/@3sam3/chart-update-testing
- The top 8 React chart libraries  
  https://blog.logrocket.com/top-8-react-chart-libraries/

2. test 자료 / jest 오류 / msw

- MSW를 활용하는 Front-End 통합테스트  
  https://fe-developers.kakaoent.com/2022/220825-msw-integration-testing/?ref=codenary
- 테스트 코드를 왜 그리고 어떻게 작성해야 할까?  
  https://tech.inflab.com/20230404-test-code/
- Testing a component while using ThemeProvider  
  https://github.com/styled-components/styled-components/issues/1319
- mswjs/example  
  https://github.com/mswjs/examples/tree/master/examples/rest-react
- setup Jest with vite  
  https://hung.dev/posts/jest-vite

3. Json server 배포

- Create RESTful API with JSON Server and deploy it to Vercel  
  https://ivo-culic.medium.com/create-restful-api-with-json-server-and-deploy-it-to-vercel-d56061c1157a
