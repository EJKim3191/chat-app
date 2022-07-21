# Nextron Chat-App 
## Usage
파이어베이스 키를 요구 합니다.
폴더 최상단에 `.env`파일을 생성 한 후, 다음과 같이 정의해주세요
``` 
NEXT_PUBLIC_APP_KEY = ...
NEXT_PUBLIC_AUTH_DOMAIN = ...
NEXT_PUBLIC_PROJECT_ID = ...
NEXT_PUBLIC_STORAGE_BUCKET = ...
NEXT_PUBLIC_MESSAGING_SENDER_ID = ...
NEXT_PUBLIC_APP_ID = ...
```
### Install Dependencies

```
npm install
```

### Use it

```
# development mode
$ npm run dev

# production build
$ npm run build
```

## Resources
<https://github.com/saltyshiomix/nextron>
<br/>
<https://ant.design>

## Contents

### 유저목록
현재 접속중인 유저의 목록을 출력합니다.
접속중인 유저와 채팅을 시작할 수 있습니다.
### 채팅
1대1 채팅방입니다.
채팅 기록을 저장하며, 진행한 유저와의 대화를 이어갈 수 있습니다.

### 그룹채팅
그룹 채팅방입니다.
서버에서 지정한 그룹채팅방에 접속하여 다량의 유저와 채팅을 진행 할 수 있습니다.

### 세팅
개발 중입니다.