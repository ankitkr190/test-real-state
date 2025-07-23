import type { NextApiRequest, NextApiResponse } from "next";
import https from "https";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = "https://www.richy.co.th/en/home_page";

  https
    .get(url, (harrodsRes) => {
      res.writeHead(harrodsRes.statusCode || 200, harrodsRes.headers);
      harrodsRes.pipe(res);
    })
    .on("error", (err) => {
      console.error("Proxy error:", err);
      res.status(500).send("Failed to load Harrods page");
    });
}
