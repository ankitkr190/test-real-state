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

    // Mimic real user by setting headers
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

    // Increase timeout and try different waitUntil strategy
    await page.goto("https://www.richy.co.th/en/home_page", {
      waitUntil: "domcontentloaded", // or try 'load'
      timeout: 60000, // Increase timeout to 60 seconds
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
    console.error(error);
    return res.status(500).json({ message: "Failed to generate harrods.html" });
  }
}
