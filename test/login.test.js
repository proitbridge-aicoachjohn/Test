import { readFileSync } from "fs";
import { resolve } from "path";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const htmlPath = resolve("website");
const html = readFileSync(htmlPath, "utf8");

assert(/<section id="login-page"[\s\S]*?<form id="login-form"/.test(html),
  "Login page markup is missing the expected form structure.");

assert(html.includes("Demo credentials: <strong>demo</strong> / <strong>codex123</strong>"),
  "Demo credential hint should be present for quick verification.");

assert(/<div id="app-shell" class="app-shell hidden"/.test(html),
  "App shell should start hidden until authentication succeeds.");

assert(html.includes("const VALID_CREDENTIALS = { username: \"demo\", password: \"codex123\" };"),
  "Credential guard definition missing from script.");

assert(html.includes("id=\"menu-toggle\""),
  "Primary navigation menu toggle should be present for mobile layouts.");

assert(html.includes("<li><a href=\"#overview\">Overview</a></li>"),
  "Navigation should expose an Overview anchor link.");

assert(html.includes("<li><a href=\"#features\">Features</a></li>"),
  "Navigation should expose a Features anchor link.");

assert(html.includes("<li><a href=\"#support\">Support</a></li>"),
  "Navigation should expose a Support anchor link.");

assert(html.includes("sendBtn.disabled = true;"),
  "Chat send button should be disabled prior to login.");

assert(html.includes("loginForm.addEventListener(\"submit\""),
  "Login form handler missing submit listener.");

console.log("All login checks passed.");
