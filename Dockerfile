# Node.js LTS 버전을 기반 이미지로 설정
FROM node:20-slim

# Heroku CLI 설치를 위한 필수 패키지 추가
RUN apt-get update && apt-get install -y curl bash \
    && curl https://cli-assets.heroku.com/install.sh | bash \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 yarn.lock 복사
COPY package.json yarn.lock ./

# 의존성 설치
# RUN rm -rf node_modules 
RUN yarn install --frozen-lockfile

# 소스 파일 복사
COPY . .

# 환경 변수 설정
ENV HOST=0.0.0.0
ENV PORT=3000

# 포트 노출
EXPOSE 3000

# 기본 실행 명령 설정
CMD ["npm", "run", "start"]
