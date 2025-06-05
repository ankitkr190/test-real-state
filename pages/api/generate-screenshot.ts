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

  try {
    const browser = await puppeteer.launch({
      headless: true, // or false if you want to see the browser
      // executablePath: "/snap/bin/chromium", // for VM
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Intercept and modify requests for realism
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    );

    await page.setExtraHTTPHeaders({
      "Accept-Language": "en-US,en;q=0.9",
    });

    // Load the page
    await page.goto("https://www.harrods.com/en-gb", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    // Take screenshot
    const screenshotPath = path.join(process.cwd(), "public", "harrods.webp");
    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    await browser.close();

    return res.status(200).json({ message: "Screenshot saved as harrods.png" });
  } catch (error) {
    console.error("Error capturing Harrods screenshot:", error);
    return res.status(500).json({ message: "Failed to capture screenshot" });
  }
}
