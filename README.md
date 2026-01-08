# AI 4컷 사진관 - 토스 미니앱

사진 한 장을 업로드하면 AI가 4가지 악세사리를 씌운 4컷 사진을 만들어주는 서비스

## 기능
- 📸 사진 업로드
- 🤖 AI 이미지 생성 (FLUX PuLID)
- 🎭 4가지 악세사리 스타일 (선글라스, 베레모, 왕관, 고양이 귀)
- 💾 생성된 사진 저장

## 기술 스택
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Vercel Serverless Functions (Node.js)
- **AI**: Replicate API (FLUX PuLID 모델)

## 설치 및 배포

### 1. 저장소 클론
```bash
git clone https://github.com/YOUR_USERNAME/toss-4cut-app.git
cd toss-4cut-app
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
Vercel 대시보드에서 환경 변수 추가:
- `REPLICATE_API_TOKEN`: Replicate API 키

### 4. Vercel 배포
```bash
npm i -g vercel
vercel
```

## 환경 변수
| 변수명 | 설명 |
|--------|------|
| REPLICATE_API_TOKEN | Replicate API 인증 토큰 |

## API 엔드포인트

### POST /api/generate
4컷 이미지 생성

**Request:**
```json
{
  "imageUrl": "https://example.com/face.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "images": [
    {
      "id": "sunglasses",
      "name": "선글라스",
      "imageUrl": "https://...",
      "success": true
    },
    ...
  ],
  "totalGenerated": 4
}
```

## 비용
- FLUX PuLID: 약 $0.02/이미지
- 4컷 생성: 약 $0.08 (~100원)

## 라이선스
MIT
