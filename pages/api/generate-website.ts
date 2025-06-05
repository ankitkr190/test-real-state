import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

type Data = { message: string } | Buffer | string;

// Constants for reusable configurations
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
const ACCEPT_LANGUAGE = "en-US,en;q=0.9";
const FONT_URL = "https://www.richy.co.th/css/Prompt-Bold.ttf";
const TARGET_URL = "https://www.richy.co.th/en/home_page";

// Helper function to handle proxy requests
async function handleProxyRequest(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const targetUrl = `https://www.richy.co.th${req.query.path || ""}`;
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": USER_AGENT,
        "Accept-Language": ACCEPT_LANGUAGE,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Content-Type",
      response.headers.get("Content-Type") || "text/html"
    );
    res.send(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ message: "Failed to proxy request" });
  }
}

// Helper function to handle font requests
async function handleFontRequest(res: NextApiResponse<Data>) {
  try {
    const response = await fetch(FONT_URL);
    const fontBuffer = await response.arrayBuffer();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "font/ttf");
    res.send(Buffer.from(fontBuffer));
  } catch (error) {
    console.error("Error fetching font:", error);
    res.status(500).json({ message: "Failed to fetch font" });
  }
}

// Helper function to generate harrods.html
async function generateHarrodsHtml(res: NextApiResponse<Data>) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setRequestInterception(true);

    page.on("request", (req) => {
      req.continue({
        headers: {
          ...req.headers(),
          "User-Agent": USER_AGENT,
          "Accept-Language": ACCEPT_LANGUAGE,
        },
      });
    });

    await page.goto(TARGET_URL, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    const htmlContent = await page.content();
    await browser.close();

    const filePath = path.join(process.cwd(), "public", "harrods.html");
    fs.writeFileSync(filePath, htmlContent, "utf8");

    res.status(200).json({ message: "harrods.html generated successfully" });
  } catch (error) {
    console.error("Error generating harrods.html:", error);
    res.status(500).json({ message: "Failed to generate harrods.html" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET" && req.query.proxy) {
    await handleProxyRequest(req, res);
    return;
  }

  if (req.method === "GET" && req.query.font) {
    await handleFontRequest(res);
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests allowed" });
    return;
  }

  await generateHarrodsHtml(res);
}
