import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // TODO: 集成 NextAuth 后，从 session 获取 user_id
    // 现在先返回空数组
    // const session = await auth();
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // const { data, error } = await supabase
    //   .from("generations")
    //   .select("*")
    //   .eq("user_id", session.user.id)
    //   .order("created_at", { ascending: false });

    // if (error) throw error;

    return NextResponse.json({
      generations: [],
      // generations: data || [],
    });
  } catch (error: any) {
    console.error("[API History Error]", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
