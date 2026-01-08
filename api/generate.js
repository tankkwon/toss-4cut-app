import Replicate from 'replicate';

// 악세사리 프롬프트 4종
const ACCESSORY_PROMPTS = [
  {
    id: 'sunglasses',
    name: '선글라스',
    prompt: 'a person wearing stylish black sunglasses, portrait photo, high quality, professional lighting'
  },
  {
    id: 'beret',
    name: '베레모',
    prompt: 'a person wearing a red beret hat, portrait photo, high quality, professional lighting'
  },
  {
    id: 'crown',
    name: '왕관',
    prompt: 'a person wearing elegant golden crown, portrait photo, high quality, professional lighting'
  },
  {
    id: 'cat_ears',
    name: '고양이 귀',
    prompt: 'a person wearing cute cat ear headband, portrait photo, high quality, professional lighting'
  }
];

export default async function handler(req, res) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: '이미지 URL이 필요합니다' });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const results = [];

    // 4개 프롬프트로 이미지 생성 (병렬 처리)
    const promises = ACCESSORY_PROMPTS.map(async (item) => {
      try {
        const output = await replicate.run('bytedance/flux-pulid', {
          input: {
            prompt: item.prompt,
            main_face_image: imageUrl,
            num_outputs: 1,
            guidance_scale: 4,
            num_inference_steps: 20,
            id_weight: 1.0,
            start_step: 4,
            true_cfg: 1.0,
            width: 768,
            height: 1024,
          }
        });

        return {
          id: item.id,
          name: item.name,
          imageUrl: Array.isArray(output) ? output[0] : output,
          success: true
        };
      } catch (error) {
        return {
          id: item.id,
          name: item.name,
          error: error.message,
          success: false
        };
      }
    });

    const generatedImages = await Promise.all(promises);

    return res.status(200).json({
      success: true,
      images: generatedImages,
      totalGenerated: generatedImages.filter(img => img.success).length
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: '이미지 생성 중 오류가 발생했습니다',
      details: error.message 
    });
  }
}
