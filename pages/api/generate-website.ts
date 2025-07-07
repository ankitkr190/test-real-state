/**
 * Description:
 * This is a POST API to generate a website clone
 * It will generate a HTML file in the public folder
 * It will use puppeteer to generate the HTML file
 * It will use the pageUrl to generate the HTML file
 * It will use the pageName to generate the HTML file
 * It will use the pageUrl to generate the HTML file
 */

import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

type Data = { message: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { pageUrl } = req.body;

  // Validate pageUrl
  if (!pageUrl || typeof pageUrl !== "string") {
    return res.status(400).json({ message: "Invalid or missing pageUrl" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true, // or false if you want to see the browser
      // executablePath: "/snap/bin/chromium", // for VM
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on("request", (req) => {
      req.continue({
        headers: {
          ...req.headers(),
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });
    });

    await page.goto(pageUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    const htmlContent = await page.content();
    await browser.close();

    const filePath = path.join(process.cwd(), "public", "harrods.html");
    fs.writeFileSync(filePath, htmlContent, "utf8");

    return res
      .status(200)
      .json({ message: "harrods.html generated successfully" });
  } catch (error) {
    console.error("Error generating harrods.html:", error);
    return res.status(500).json({ message: "Failed to generate harrods.html" });
  }
}
