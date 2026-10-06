/* TKSTOCK 서비스 워커 — 앱 껍데기만 캐시한다.
   · index.html은 네트워크 우선: 새 버전을 올리면 다음 실행에 바로 반영, 오프라인이면 캐시로.
   · 아이콘·manifest는 캐시 우선.
   · 같은 출처(github.io)만 다룬다. Apps Script(실데이터)·TradingView 요청은 건드리지 않는다
     → 시트 데이터가 폰에 캐시로 남지 않는다.
   파일을 바꿔 올릴 때 CACHE 이름의 숫자를 올리면 옛 캐시가 지워진다. */
const CACHE = "tkstock-beta-v48";
const SHELL = ["./", "./index.html", "./manifest.json",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;          // 외부(시트·차트)는 그대로 통과
  if (req.mode === "navigate" || url.pathname.endsWith("/index.html")) {
    e.respondWith(fetch(req).then(r => {
      const copy = r.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); return r;
    }).catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
