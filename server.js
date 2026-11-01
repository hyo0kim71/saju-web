// 로컬 개발용 정적 파일 서버 (배포용 아님)
// 실행: node server.js [port]
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.argv[2] || 8123);
const root = __dirname;
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";
    const filePath = path.join(root, urlPath);

    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("Not Found");
        return;
      }
      res.writeHead(200, { "Content-Type": mime[path.extname(filePath)] || "application/octet-stream" });
      res.end(data);
    });
  })
  .listen(port, () => {
    console.log(`Serving ${root} at http://localhost:${port}`);
  });
