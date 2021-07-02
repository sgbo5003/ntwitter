# 노마드 코더 트위터 클론코딩

## #1 React + Firebase Setup

> git setting

1. git에 repository 생성
2. git remote add origin [https://github.com/sgbo5003/ntwitter.git](https://github.com/sgbo5003/ntwitter.git)
3. git add .
4. git commit -m "Initiailization"
5. git push origin master

> react & firebase setting

- react setting
  - `npx create-react-app 프로젝트명`
  - 불필요한 파일들 삭제
    - ex) index.css, App.css 등등
- firebase setting
  - firebase 홈페이지에서 프로젝트 생성
  - `npm install —save firebase`
  - react에 firebase.js 파일 생성
    - firebase.js

## #1.1 Securing the keys

> 환경변수 설정

- react는 환경변수를 써야 한다면 REACT_APP으로 시작해야 하고 그 뒤로 이름을 붙여주어야 한다.
  - ex) REACT*APP*'SOMETING'
- 사용
  - process.env.REACT_APP_API_KEY
- 사용하는 이유
  - .env 파일을 만들어 키나 URL등을 환경변수로 만들어 놓는 이유는 github에 올리는것을 방지하기 위해서 이다.
  - 하지만 어쩔 수 없이 사용자들에게는 보이게 된다.
- .env 파일 위치
  - 항상 최상단에 위치해 있어야 한다.

## #1.2 Router Setup

> 폴더 생성

- src 폴더 안에
  - components 폴더 생성
  - routes 폴더 생성

> router 사용

- `npm i react-router-dom`

## #2.0 Using Firebase Auth

> auth 사용

1. `export const authService = firebase.auth();`
2. `import { authService } from '../fbase';`
3. `const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);`

## #2.1 Login Form part One

> firebase Authentication github과 연동

## #2.2 Recap

> 요약

## #2.3 Creating Account

- firebase와 연동하여 함수를 써서 로그인 하기

  - 코드

    ```jsx
    if (newAccount) {
      data = await authService.createUserWithEmailAndPassword(email, password);
    } else {
      data = await authService.signInWithEmailAndPassword(email, password);
    }
    ```

## #2.4 Log In

> 로그인 처리

## #2.5 Social Login

> firebase를 통한 소셜로그인 연동

- 깃헙 소셜로그인
- 구글 소셜로그인
- 코드

  ```jsx
  let provider;
  if (name === "google") {
    provider = new firebaseInstance.auth.GoogleAuthProvider();
  } else if (name === "github") {
    provider = new firebaseInstance.auth.GithubAuthProvider();
  }
  const data = await authService.signInWithPopup(provider);
  ```

## #2.6 Log Out

> useHistory를 이용한 로그아웃 기능 구현

- goBack()과 비슷한 기능
- 코드

  ```jsx
  import { useHistory } from "react-router-dom";

  let history = useHistory();

  function HomeButton() {

  function handleClick() {

  history.push("/home");

  }

  return (

  <button type="button" onClick={handleClick}>;

  Go home

  </button>;

  );

  }
  ```

## #3.0 Form and Database Setup

> Home화면에 form 만들고 firebase database 시작할 준비
