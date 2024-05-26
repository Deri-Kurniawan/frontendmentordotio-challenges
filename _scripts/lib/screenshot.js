const puppeteer = require("puppeteer");
const fs = require("fs");
const { consola } = require("consola");
const path = require("path");

/**
 * @name captureScreenshot
 * @description Capture a screenshot of the given URL with the specified width and height and save it to the destination folder
 * @param {Object} options
 * @param {String} options.name - The name of the screenshot
 * @param {String} options.url - The URL of the page to capture
 * @param {String} options.dest - The destination folder to save the screenshot
 * @param {Number} options.width - The width of the viewport
 * @param {Number} options.height - The height of the viewport
 * @param {String} options.ext - The extension of the screenshot
 * @returns {Promise<void>}
 */
const captureScreenshot = async ({
  name,
  url,
  dest,
  width,
  height,
  ext = "jpg",
}) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width, height });

  try {
    const response = await page.goto(url, { waitUntil: "networkidle0" });

    if (!response.ok()) {
      throw new Error(`❌ ${url} is not accessible!`);
    }

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const fileName = `${name}_${width}x${height}.${ext}`;
    const filePath = path.join(dest, fileName);

    await page.screenshot({ path: filePath });
    consola.success(`📸 ${filePath}`);
  } catch (err) {
    consola.error(`📸 [${name}] Error taking screenshot at ${width}x${height}`);
  } finally {
    await browser.close();
  }
};

module.exports = { captureScreenshot };
