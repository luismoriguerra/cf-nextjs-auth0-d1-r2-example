import { getRequestContext } from "@cloudflare/next-on-pages";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const fileName = request.nextUrl.searchParams.get("filename") as string;

  try {
    const object = await getRequestContext().env.R2.get(fileName);

    if (object === null) {
      return new Response("Object Not Found", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);

    return new Response(object.body, {
      headers,
    });
  } catch (err) {
    console.log(err);
    return Response.json({ status: "error" });
  }
}

export async function PUT(request: NextRequest) {
  const fileName = request.nextUrl.searchParams.get("filename") as string;

  const formData = await request.formData();
  const file = formData.get("file");
  try {
    const res = await getRequestContext().env.R2.put(fileName, file);
    console.log(res);
    return Response.json({
      status: "success",
      response: res,
      url: `/api/images?filename=${fileName}`,
    });
  } catch (err) {
    console.log(err);
    return Response.json({ status: "error" });
  }
}