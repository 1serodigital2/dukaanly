import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("health_check");

    if (error) {
      return NextResponse.json(
        {
          connected: false,
          error: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      connected: true,
      message: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
