export interface GenerateImageParams {
  prompt: string;
  aspectRatio: string;
}

export interface GenerateImageResponse {
  imageUrl: string;
  error?: string;
}

export async function generateImage(
  params: GenerateImageParams
): Promise<GenerateImageResponse> {
  const { prompt, aspectRatio } = params;

  try {
    // 根据比例设置图片尺寸
    const sizeMap: Record<string, string> = {
      '1:1': '1024x1024',
      '16:9': '1792x1024',
      '4:3': '1536x1152',
    };

    const size = sizeMap[aspectRatio] || '1024x1024';

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXTAUTH_URL || 'http://localhost:3000',
        'X-Title': 'Z-Image Clone',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/dall-e-3',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        // DALL-E 3 特定参数
        max_tokens: 1000,
        temperature: 1,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate image');
    }

    const data = await response.json();

    // OpenRouter 返回的图片 URL 在 content 中
    const imageUrl = data.choices?.[0]?.message?.content;

    if (!imageUrl) {
      throw new Error('No image URL in response');
    }

    return { imageUrl };
  } catch (error: any) {
    console.error('[OpenRouter Error]', error);
    return {
      imageUrl: '',
      error: error.message || 'Failed to generate image',
    };
  }
}
