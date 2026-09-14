import { existsSync, readFileSync, writeFileSync } from "node:fs";
import https from "node:https";

const APP_ID = 4797000;
const NEWS_HREF = `https://store.steampowered.com/news/app/${APP_ID}`;
const NEWS_URL = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${APP_ID}&count=15&maxlength=1`;
const out = process.argv[2] || "public/steam-status.json";

function versionFrom(title = "") {
  const match = title.match(/\d+(?:\.\d+)+/);
  return match ? match[0] : "";
}

function readExisting() {
  if (!existsSync(out)) return null;
  try {
    return JSON.parse(readFileSync(out, "utf8"));
  } catch {
    return null;
  }
}

function writeStatus(status) {
  writeFileSync(out, `${JSON.stringify(status, null, 2)}\n`);
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "user-agent": "mike-morra-portfolio" } }, (res) => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`Steam news ${res.statusCode}`));
          res.resume();
          return;
        }
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });
}

const existing = readExisting();

try {
  const data = await getJson(NEWS_URL);
  const items = data.appnews?.newsitems ?? [];
  const item =
    items.find((entry) => entry.tags?.includes("patchnotes")) ?? items[0];
  if (!item?.date) throw new Error("No Steam news items");

  const status = {
    appid: APP_ID,
    updatedAt: item.date,
    title: item.title ?? "",
    version: versionFrom(item.title),
    href: NEWS_HREF,
  };

  writeStatus(status);
  console.log(`Steam status: ${status.title} (${status.updatedAt})`);
} catch (error) {
  if (existing?.updatedAt) {
    console.warn(`Steam status fetch failed, keeping existing file. ${error.message}`);
    process.exit(0);
  }
  console.error(error);
  process.exit(1);
}
