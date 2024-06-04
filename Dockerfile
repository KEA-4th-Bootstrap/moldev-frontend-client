# 가져올 이미지를 정의
FROM node:20.12.0-alpine

# 경로 설정하기
WORKDIR /app

# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY package.json .

# node js 컨테이너 메모리 제한 해제
ENV GENERATE_SOURCEMAP=false

Run node --max-old-space-size=8000
# config registry 설정
RUN npm config set registry http://registry.npmjs.org/
# 명령어 실행 (의존성 설치)
RUN npm install
# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
COPY . .

# 3000번 포트 노출
EXPOSE 3000

# npm start 스크립트 실행
CMD ["npm", "run", "start"]

# # prod environment
# FROM nginx:stable-alpine

# # 이전 빌드 단계에서 빌드한 결과물을 /usr/share/nginx/html 으로 복사한다.
# COPY ./public /usr/share/nginx/html

# # 기본 nginx 설정 파일을 삭제한다. (custom 설정과 충돌 방지)
# RUN rm /etc/nginx/conf.d/default.conf

# # custom 설정파일을 컨테이너 내부로 복사한다.
# COPY nginx/nginx.conf /etc/nginx/conf.d

# # 컨테이너의 80번 포트를 열어준다.
# EXPOSE 80

# # nginx 서버를 실행하고 백그라운드로 동작하도록 한다.
# CMD ["nginx", "-g", "daemon off;"]
