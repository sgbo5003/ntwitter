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

<br />

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

<br />

## #1.2 Router Setup

> 폴더 생성

- src 폴더 안에
  - components 폴더 생성
  - routes 폴더 생성

> router 사용

- `npm i react-router-dom`

<br />

## #2.0 Using Firebase Auth

> auth 사용

1. `export const authService = firebase.auth();`
2. `import { authService } from '../fbase';`
3. `const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);`

<br />

## #2.1 Login Form part One

> firebase Authentication github과 연동

<br />

## #2.2 Recap

> 요약

<br />

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

<br />

## #2.4 Log In

> 로그인 처리

<br />

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

<br />

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

<br />

## #3.0 Form and Database Setup

> Home화면에 form 만들고 firebase database 시작할 준비

<br />

## #3.1 Nweeting

> firebase

- firebase
  - 사용하기 쉬운 대신에 자유도가 낮다.

> 트윗 올리기

- Firestore database에 트윗이 저장되게 된다.
- 코드

  ```jsx
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      nweet,
      createdAt: Date.now(),
    });
    setNweet("");
  };
  ```

<br />

## #3.2 Getting the Nweets

> 트윗을 어떻게 가져올지

- 코드

  ```jsx
  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  ```

> 트윗을 생성하고 읽을 수 있게 되었다.

<br />

## #3.3 Realtime Nweets

> 실시간으로 트윗 남기고 지우기

- 코드

  ```jsx
  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  ```

<br />

## #3.4 Delete and Update part One

> Delete 기능 추가

- 사용자를 식별해 나만 지울 수 있도록 기능 추가

  - 코드

    ```jsx
    const onDeleteClick = async () => {
      const ok = window.confirm("Are you sure you want to delete this nweet?");
      if (ok) {
        await dbService.doc(`nweets/${nweetObj.id}`).delete();
      }
    };
    ```

<br />

## #3.5 Delete and Update part Two

> 수정 기능 추가

- 코드

  ```jsx
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(nweetObj, newNweet);
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  ```

<br />

## #3.6 Recap

> 요약

- onSnapshot
  - onSnapshot은 기본적으로 데이터베이스에 무슨일이 있을 때, 알림을 받는다.

<br />

## #4.0 Preview Images part One

> 파일 읽어오기

- 코드

  ```jsx
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(finishedEvent);
    };
    reader.readAsDataURL(theFile);
  };
  ```

<br />

## #4.1 Preview Images part Two

> 사진 띄우기 & 사진 지우기

- 코드

  ```jsx
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
  ```

<br />

## #4.2 Uploading

> uuid 설치

- npm install uuid
- uuid : 기본적으로 어떤 특별한 식별자를 랜덤으로 생성해준다.
