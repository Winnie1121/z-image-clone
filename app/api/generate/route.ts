import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, aspectRatio } = await request.json();

    // 验证输入
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    if (prompt.length > 1000) {
      return NextResponse.json(
        { error: "Prompt is too long (max 1000 characters)" },
        { status: 400 }
      );
    }

    // 根据比例设置参数
    const aspectRatioMap: Record<string, string> = {
      "1:1": "1:1",
      "16:9": "16:9",
      "4:3": "4:3",
    };

    const aspect = aspectRatioMap[aspectRatio] || "1:1";

    // 调用 OpenRouter Chat Completions API（正确的图片生成方式）
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXTAUTH_URL || "http://localhost:3000",
        "X-Title": "Z-Image Clone",
      },
      body: JSON.stringify({
        model: "black-forest-labs/flux.2-pro", // ✅ 正确的模型 ID
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        modalities: ["image"], // 关键：指定生成图片
        image_size: "1K", // 支持：1K, 2K, 4K
        aspect_ratio: aspect, // 比例：1:1, 16:9, 4:3
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[OpenRouter API Error]", response.status, errorData);
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();

    // 从 chat completions 响应中提取图片 URL
    // OpenRouter 返回格式：choices[0].message.images[0].image_url.url
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error("[OpenRouter Response]", JSON.stringify(data, null, 2));
      throw new Error("No image URL in response");
    }

    // TODO: 如果用户已登录，保存到数据库
    // 目前先直接返回图片 URL
    // 后续集成 NextAuth 后，可以获取 session 并保存记录

    return NextResponse.json({
      imageUrl: imageUrl,
      prompt,
      aspectRatio,
    });
  } catch (error: any) {
    console.error("[API Generate Error]", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
