/* VMK Housekeeping — single-page staff portal. Talks to /hk/api/* (server/src/hk.ts). */
"use strict";

/* ================================================================= basics */

const CSRF = document.querySelector('meta[name="hk-csrf"]')?.content ?? "";
const main = document.getElementById("main");
const state = { me: null, openCalls: 0, sounds: false, lastCallId: 0 };

/** h("a", {href, onclick}, "text", child…) — text is always set as text, never HTML. */
function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v === undefined || v === null || v === false) continue;
    if (k === "class") el.className = v;
    else if (k === "style") el.style.cssText = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (k === "value") el.value = v;
    else if (v === true) el.setAttribute(k, "");
    else el.setAttribute(k, String(v));
  }
  for (const c of children.flat(Infinity)) {
    if (c === undefined || c === null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

const ICONS = {
  gauge: "M8 2a7 7 0 0 0-7 7c0 1.6.5 3 1.4 4.2h11.2A7 7 0 0 0 8 2zm0 2a.75.75 0 1 1 0 1.5A.75.75 0 0 1 8 4zM4.2 5.6a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm7.6 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM10.6 6l.9.6-2.6 3.3a1.2 1.2 0 1 1-1-.7z",
  users: "M5.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm5.5 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM0 13.5C0 11 2.5 9.5 5.5 9.5S11 11 11 13.5V14H0zm11.6.5H16v-.6c0-2-1.8-3.3-4.3-3.3-.5 0-1 .1-1.4.2 1 .8 1.3 2 1.3 3.7z",
  user: "M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-6 6c0-3 2.7-4.7 6-4.7s6 1.7 6 4.7v.5H2z",
  logout: "M6 2h6a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6v-2h5V4H6zM5 5l1.4 1.4L5.8 7H10v2H5.8l.6.6L5 11 2 8z",
  fire: "M8 1s4 3 4 7a4 4 0 0 1-8 0c0-1.6.8-2.8 1.6-3.6C5.6 6 6.5 7 7.4 7 6.6 4.8 8 1 8 1z",
  gift: "M2 6h12v3H2zm1 3h10v6H3zM7 6h2v9H7zM8 6S6.5 2 4.5 3 6 6 8 6zm0 0s1.5-4 3.5-3S10 6 8 6z",
  envelope: "M1 3h14v10H1zm1.4 1.5L8 8.6l5.6-4.1V4.4L8 7.4 2.4 4.4z",
  bell: "M8 1.5a4.5 4.5 0 0 0-4.5 4.5v3L2 11v1h12v-1l-1.5-2V6A4.5 4.5 0 0 0 8 1.5zM6.3 13h3.4a1.7 1.7 0 0 1-3.4 0z",
  chat: "M2 2h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6l-3 3v-3H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z",
  clone: "M4 1v9h3L4 14h3l3-4H7V1zM10 2h2v5h2l-3 4-3-4h2z",
  home: "M8 1.5L1 7.5h2V14h3.5v-4h3v4H13V7.5h2z",
  search: "M6.5 1a5.5 5.5 0 0 1 4.4 8.8l3.9 3.9-1.1 1.1-3.9-3.9A5.5 5.5 0 1 1 6.5 1zm0 1.8a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4z",
  box: "M8 1l6.5 3v8L8 15l-6.5-3V4zm0 1.6L3.7 4.6 8 6.6l4.3-2zM2.8 5.7v5.5L7.4 13.4V7.8zm10.4 0L8.6 7.8v5.6l4.6-2.2z",
  shield: "M8 1l6 2.5V8c0 3.3-2.5 6-6 7-3.5-1-6-3.7-6-7V3.5z",
  list: "M1 2h2v2H1zm4 0h10v2H5zM1 7h2v2H1zm4 0h10v2H5zm-4 5h2v2H1zm4 0h10v2H5z",
  warn: "M8 1l7.5 13h-15zm-.9 5v4h1.8V6zm0 5v1.8h1.8V11z",
  tag: "M1 1h6.5L15 8.5 8.5 15 1 7.5zm3 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
  pencil: "M11.3 1.3l3.4 3.4-9.2 9.2H2.1v-3.4zm-1.4 3.4L3.6 11v1.4H5l6.3-6.3z",
  cart: "M1 2h2.3l.6 2H15l-1.8 6H5.3l-.4 1.3h9.1V13H3l1.2-3.6L2.2 3.6H1zm4 12.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm6 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0z",
  briefcase: "M6 1h4a1 1 0 0 1 1 1v2h3.5a.5.5 0 0 1 .5.5V13a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4.5a.5.5 0 0 1 .5-.5H5V2a1 1 0 0 1 1-1zm0 1.5V4h4V2.5zM1 7.5h14V9H1z",
  receipt: "M3 1h10v14l-2-1.3L9 15l-1-1-1 1-2-1.3L3 15zm2 3v1.5h6V4zm0 3v1.5h6V7zm0 3v1.5h4V10z",
  crown: "M1 5l3.5 3L8 3l3.5 5L15 5l-1.5 8h-11zm1.5 9h11v1.5h-11z",
  megaphone: "M13 2v12l-4-3H6l1 4H4.5l-1-4H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h7z",
  dollar: "M7 1h2v1.6c1.5.2 2.8 1 3 2.6h-2c-.2-.6-.9-1-2-1-1.3 0-2 .5-2 1.2 0 .8.9 1 2.4 1.4 2 .5 3.6 1.1 3.6 3 0 1.5-1.2 2.5-3 2.7V14H7v-1.6c-1.8-.2-3.1-1.2-3.2-2.9h2c.2.8 1 1.2 2.2 1.2 1.3 0 2-.5 2-1.2 0-.9-.9-1.1-2.5-1.5C5.6 7.6 4.2 7 4.2 5.2c0-1.4 1.1-2.4 2.8-2.6z",
  door: "M3 1h9a1 1 0 0 1 1 1v13H3zm6 6.3a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6z",
  key: "M10.5 1a4.5 4.5 0 1 1-1.8 8.6L7.3 11H5.5v1.8H3.7v1.8H1v-2.7l5.4-5.4A4.5 4.5 0 0 1 10.5 1zm1 2.3a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z",
};
function icon(name) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("class", "icon");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", ICONS[name] ?? ICONS.list);
  svg.append(path);
  return svg;
}

async function api(path, body) {
  const opts = body === undefined
    ? { credentials: "same-origin" }
    : { method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json", "X-HK-CSRF": CSRF }, body: JSON.stringify(body) };
  const res = await fetch(`/hk/api/${path}`, opts);
  if (res.status === 401) {
    location.href = "/hk";
    throw new Error("Signed out.");
  }
  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Server error (${res.status}).`);
  }
  if (!data.ok) throw new Error(data.error ?? `Request failed (${res.status}).`);
  return data;
}

function toast(message, error = false) {
  const t = h("div", { class: `toast${error ? " err" : ""}`, role: "status" }, message);
  document.getElementById("toasts").append(t);
  setTimeout(() => t.remove(), error ? 7000 : 4000);
}

/** Run an action; report its result or error. Returns the response, or null. */
async function act(path, body, button) {
  if (button) button.disabled = true;
  try {
    const r = await api(path, body);
    if (r.message) toast(r.message);
    return r;
  } catch (err) {
    toast(err.message, true);
    return null;
  } finally {
    if (button) button.disabled = false;
  }
}

const pad = (n) => String(n).padStart(2, "0");
function fmtTime(ms, seconds = false) {
  if (!ms) return "—";
  const d = new Date(ms);
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${String(d.getFullYear()).slice(2)} ${pad(d.getHours())}:${pad(d.getMinutes())}${seconds ? `:${pad(d.getSeconds())}` : ""}`;
}
function fmtIso(ms) {
  const d = new Date(ms);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
function fmtDuration(ms) {
  if (ms < 60e3) return `${Math.round(ms / 1e3)}s`;
  if (ms < 3600e3) return `${Math.round(ms / 60e3)}m`;
  if (ms < 86400e3) return `${(ms / 3600e3).toFixed(1)}h`;
  return `${(ms / 86400e3).toFixed(1)}d`;
}
const num = (n) => Number(n).toLocaleString();
const CATEGORY = { 1: "Furniture", 2: "Clothing", 3: "Posters", 4: "Pins" };
const ENTRY = ["Everyone", "Friends", "Ticket holders", "Friends + tickets", "Owner only"];
const CFH_CATEGORY = { 1: "Harassment", 2: "Inappropriate language", 3: "Scamming", 4: "Technical", 5: "Other" };
const PERMISSIONS = ["alert", "kick", "ban", "mute", "roomalert", "roomkick", "roomban", "roommute", "forcenamechange", "searchAnyRoom"];

function userLink(id, names) {
  if (!id) return h("span", { class: "muted" }, "—");
  const n = names?.[id];
  return h("a", { href: `#/user/${id}` }, icon("user"), " ", n ? n.name : `#${id}`);
}
function roomLink(line) {
  const label = line.roomName || line.room || "?";
  const id = line.roomCode;
  const isGuest = String(line.room).startsWith("guest:");
  return h(
    "a",
    { href: isGuest ? `#/room/${String(line.room).slice(6)}` : `#/chatlogs?room=${encodeURIComponent(line.room)}` },
    icon(isGuest ? "home" : "door"),
    ` ${isGuest ? "Guest Room" : label} (${id ?? "?"})`,
  );
}

function table(headers, rows, emptyText = "Nothing to show.") {
  if (rows.length === 0) return h("div", { class: "empty" }, emptyText);
  return h(
    "div",
    { class: "table-wrap" },
    h("table", {}, h("thead", {}, h("tr", {}, headers.map((x) => h("th", {}, x)))), h("tbody", {}, rows)),
  );
}

function pageHeader(title, ...right) {
  return h("div", { class: "page-header" }, h("h1", {}, title), h("div", { class: "flex" }, right));
}

/** The orange "Actions ⊕" menu. items: [label, fn, {disabled, danger}] | "-" */
function actionsMenu(items, label = "Actions") {
  const menu = h("div", { class: "dropdown-menu hidden", role: "menu" });
  for (const item of items) {
    if (item === "-") {
      menu.append(h("div", { class: "divider" }));
      continue;
    }
    const [text, fn, opts = {}] = item;
    menu.append(
      h("button", { type: "button", role: "menuitem", disabled: opts.disabled, onclick: () => { menu.classList.add("hidden"); fn(); } }, text),
    );
  }
  const button = h("button", { class: "btn btn-warning", type: "button", "aria-haspopup": "true" }, `${label} `, "⊕");
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    document.querySelectorAll(".dropdown-menu").forEach((m) => m !== menu && m.classList.add("hidden"));
    menu.classList.toggle("hidden");
  });
  return h("div", { class: "dropdown" }, button, menu);
}
document.addEventListener("click", () => document.querySelectorAll(".dropdown-menu").forEach((m) => m.classList.add("hidden")));

/** A modal form. fields: [{name,label,type,value,options,placeholder}]. Resolves values or null. */
function modal(title, { text, fields = [], confirm = "OK", danger = false } = {}) {
  return new Promise((resolve) => {
    const inputs = {};
    const body = h("div", { class: "body" }, text ? h("p", {}, text) : null);
    for (const f of fields) {
      let input;
      if (f.type === "textarea") input = h("textarea", { placeholder: f.placeholder ?? "", maxlength: f.max ?? "" }, f.value ?? "");
      else if (f.type === "select") {
        input = h("select", {}, f.options.map(([v, l]) => h("option", { value: v, selected: String(v) === String(f.value ?? "") }, l)));
      } else input = h("input", { type: f.type ?? "text", value: f.value ?? "", placeholder: f.placeholder ?? "", autocomplete: "off" });
      input.style.width = "100%";
      inputs[f.name] = input;
      body.append(h("div", { class: "mb" }, h("label", {}, f.label), input));
    }
    const close = (value) => {
      back.remove();
      document.removeEventListener("keydown", onKey);
      resolve(value);
    };
    const ok = h("button", { class: `btn ${danger ? "btn-danger" : "btn-primary"}`, type: "submit" }, confirm);
    const form = h(
      "form",
      { class: "modal", role: "dialog", "aria-modal": "true", onsubmit: (e) => {
        e.preventDefault();
        const values = {};
        for (const [k, el] of Object.entries(inputs)) values[k] = el.value;
        close(values);
      } },
      h("header", {}, title),
      body,
      h("footer", {}, h("button", { class: "btn btn-default", type: "button", onclick: () => close(null) }, "Cancel"), ok),
    );
    const back = h("div", { class: "modal-back", onclick: (e) => e.target === back && close(null) }, form);
    const onKey = (e) => e.key === "Escape" && close(null);
    document.addEventListener("keydown", onKey);
    document.body.append(back);
    (Object.values(inputs)[0] ?? ok).focus();
  });
}

/* ============================================================ item icons */

const iconCache = new Map();
const imageCache = new Map();

function loadImage(url) {
  if (!imageCache.has(url)) {
    imageCache.set(url, new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    }));
  }
  return imageCache.get(url);
}

/** One layer as a canvas: ink-41 tinted (clothing) and white keyed (ink 8/36 without alpha). */
function prepareLayer(img, layer) {
  const c = document.createElement("canvas");
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const g = c.getContext("2d", { willReadFrequently: true });
  g.drawImage(img, 0, 0);
  if (layer.ink === 8 || layer.ink === 36) {
    const data = g.getImageData(0, 0, c.width, c.height);
    const px = data.data;
    let opaque = true;
    for (let i = 3; i < px.length; i += 4) if (px[i] < 255) { opaque = false; break; }
    if (opaque) {
      for (let i = 0; i < px.length; i += 4) if (px[i] > 250 && px[i + 1] > 250 && px[i + 2] > 250) px[i + 3] = 0;
      g.putImageData(data, 0, 0);
    }
  }
  if (layer.tint) {
    // Ink 41 (darken) on pale greyscale art is a multiply by the colour.
    g.globalCompositeOperation = "multiply";
    g.fillStyle = layer.tint;
    g.fillRect(0, 0, c.width, c.height);
    g.globalCompositeOperation = "destination-in";
    g.drawImage(img, 0, 0);
  }
  return c;
}

/** Resolves to a data URL of the composed item picture, or null. */
function itemPicture(code, category) {
  const key = `${code}:${category ?? ""}`;
  if (!iconCache.has(key)) {
    iconCache.set(key, api(`icon/${code}${category ? `?cat=${category}` : ""}`)
      .then(({ icon: spec }) => composeLayers(spec.layers))
      .catch(() => null));
  }
  return iconCache.get(key);
}

/** Layers (server hk-icons.ts `IconLayer`) composed on one anchor -> data URL, or null. */
async function composeLayers(layers) {
  if (!layers?.length) return null;
  const parts = [];
  for (const layer of layers) {
    const img = await loadImage(layer.url);
    if (!img || !img.naturalWidth) continue;
    const reg = layer.flip ? img.naturalWidth - layer.regX : layer.regX;
    parts.push({ canvas: prepareLayer(img, layer), left: layer.x - reg, top: layer.y - layer.regY, flip: layer.flip });
  }
  if (!parts.length) return null;
  const minX = Math.min(...parts.map((p) => p.left));
  const minY = Math.min(...parts.map((p) => p.top));
  const maxX = Math.max(...parts.map((p) => p.left + p.canvas.width));
  const maxY = Math.max(...parts.map((p) => p.top + p.canvas.height));
  const out = document.createElement("canvas");
  out.width = Math.max(1, maxX - minX);
  out.height = Math.max(1, maxY - minY);
  const g = out.getContext("2d");
  for (const p of parts) {
    const x = p.left - minX;
    const y = p.top - minY;
    if (p.flip) {
      g.save();
      g.translate(x + p.canvas.width, y);
      g.scale(-1, 1);
      g.drawImage(p.canvas, 0, 0);
      g.restore();
    } else g.drawImage(p.canvas, x, y);
  }
  return out.toDataURL();
}

/** An <img> that fills in when the picture is ready; a "?" if there is none. */
function itemImg(code, category, small = false) {
  const img = h("img", { class: `item-icon${small ? " small" : ""}`, alt: "", title: `#${code}`, style: "object-fit:contain;padding:3px" });
  itemPicture(code, category).then((url) => {
    if (url) img.src = url;
    else img.replaceWith(h("div", { class: `item-icon${small ? " small" : ""}`, style: "display:grid;place-items:center;color:#8aa", title: `#${code} (no picture)` }, "?"));
  });
  return img;
}

function itemTile(item, extra) {
  return h(
    "div",
    { class: "item-tile", title: `${item.name} (code ${item.typeCode ?? item.code})` },
    itemImg(item.typeCode ?? item.code, item.category),
    h("div", { class: "name" }, item.name),
    extra,
  );
}

/* ================================================================ layout */

function buildSidebar() {
  const admin = state.me?.admin;
  const link = (href, ico, label, extra) => h("a", { href, "data-route": href }, icon(ico), label, extra);
  const nav = document.getElementById("sidebar");
  nav.replaceChildren(
    h("div", { class: "head" }, "Server"),
    link("#/", "gauge", "Overview"),
    link("#/online", "users", "Online Users"),
    link("/hk/logout", "logout", "Log Out"),
    h("div", { class: "head" }, "Tools"),
    link("#/bulk/ban", "fire", "Bulk Ban"),
    admin ? link("#/bulk/give", "gift", "Bulk Give") : null,
    link("#/bulk/message", "envelope", "Bulk Message"),
    link("#/cfh", "bell", "Call for Help Browser", h("span", { class: "count hidden", id: "cfh-count" })),
    link("#/chatlogs", "chat", "Chatlogs"),
    link("#/clones", "clone", "Clone Check"),
    link("#/rooms", "home", "Search for Rooms"),
    link("#/users", "user", "Search for Users"),
    h("div", { class: "head" }, "Content"),
    link("#/items", "box", "Item Browser"),
    link("#/public-rooms", "door", "Public Rooms"),
    h("div", { class: "head" }, "Staff"),
    link("#/staff", "shield", "Staff List"),
    admin ? link("#/audit", "list", "Staff Log") : null,
  );
  updateCfhBadge();
}

function markActive() {
  const hash = location.hash || "#/";
  document.querySelectorAll(".sidebar a[data-route]").forEach((a) => {
    const r = a.getAttribute("data-route");
    a.classList.toggle("active", r === "#/" ? hash === "#/" || hash === "#" : hash.startsWith(r));
  });
}

function updateCfhBadge() {
  const badge = document.getElementById("cfh-count");
  if (!badge) return;
  badge.textContent = String(state.openCalls);
  badge.classList.toggle("hidden", !state.openCalls);
}

/* ================================================================ router */

const routes = [
  [/^\/?$/, pageOverview],
  [/^\/online$/, pageOnline],
  [/^\/users$/, pageUsers],
  [/^\/user\/(\d+)(?:\/(\w+))?$/, pageUser],
  [/^\/chatlogs$/, pageChatlogs],
  [/^\/cfh$/, pageCfh],
  [/^\/rooms$/, pageRooms],
  [/^\/room\/(\d+)$/, pageRoom],
  [/^\/public-rooms$/, pagePublicRooms],
  [/^\/clones$/, pageClones],
  [/^\/bulk\/(ban|give|message)$/, pageBulk],
  [/^\/items$/, pageItems],
  [/^\/staff$/, pageStaff],
  [/^\/audit$/, pageAudit],
];

let renderToken = 0;
async function route() {
  const raw = (location.hash || "#/").slice(1);
  const [path, query = ""] = raw.split("?");
  const params = new URLSearchParams(query);
  document.body.classList.remove("menu-open");
  markActive();
  const token = ++renderToken;
  for (const [re, page] of routes) {
    const m = re.exec(path);
    if (!m) continue;
    main.replaceChildren(h("p", { class: "loading" }, "Loading…"));
    try {
      const view = await page(params, ...m.slice(1));
      if (token === renderToken && view) main.replaceChildren(view);
    } catch (err) {
      if (token === renderToken) main.replaceChildren(h("div", { class: "alert alert-danger mt" }, err.message));
    }
    window.scrollTo(0, 0);
    return;
  }
  main.replaceChildren(h("div", { class: "alert alert-warning mt" }, "No such page."));
}

const go = (hash) => {
  if (location.hash === hash) route();
  else location.hash = hash;
};

/* ================================================================= pages */

async function pageOverview() {
  const s = await api("stats");
  const counter = h("span", { class: "counter" }, "240");
  const alertText = h("textarea", { maxlength: 240, oninput: () => (counter.textContent = String(240 - alertText.value.length)) });
  const send = h("button", { class: "btn btn-info", type: "button" }, icon("megaphone"), "Game Alert");
  send.addEventListener("click", async () => {
    const text = alertText.value.trim();
    if (!text) return toast("Write the alert first.", true);
    const sure = await modal("Alert every player?", { text: `"${text}" will pop up for all ${s.online} online players.`, confirm: "Send alert" });
    if (!sure) return;
    const r = await act("alert-all", { text }, send);
    if (r) {
      toast(`Alert shown to ${r.delivered} player${r.delivered === 1 ? "" : "s"}.`);
      alertText.value = "";
      counter.textContent = "240";
    }
  });
  const card = (n, t, href) => h("div", { class: "card" }, h("a", { href }, h("div", { class: "n" }, num(n)), h("div", { class: "t" }, t)));
  return h(
    "div",
    {},
    pageHeader(
      "Server Status",
      actionsMenu([
        ["Online users", () => go("#/online")],
        ["Call for Help Browser", () => go("#/cfh")],
        ["Recent chat", () => go("#/chatlogs")],
        ["Public rooms", () => go("#/public-rooms")],
      ]),
    ),
    h("div", {}, `You are logged in as: ${state.me.name}`),
    s.gameUp
      ? h("div", {}, `The server is currently online with ${num(s.online)}/${num(s.capacity)} players.`)
      : h("div", { class: "alert alert-danger mt" }, "The game server is not reachable — live actions (alerts, kicks, moves) will fail until it is back."),
    h(
      "div",
      { class: "cards" },
      card(s.online, "Players online", "#/online"),
      card(s.openCalls, "Open calls for help", "#/cfh"),
      card(s.activeBans, "Active bans", "#/users"),
      card(s.chatToday, "Chat lines today", "#/chatlogs"),
      card(s.users, "Accounts", "#/users"),
      card(s.rooms, "Guest rooms", "#/rooms"),
    ),
    h("h2", { class: "section-title" }, "Alert Game"),
    alertText,
    h("div", { class: "flex", style: "justify-content:space-between;margin-top:6px" }, counter, send),
  );
}

async function pageOnline() {
  const r = await api("online");
  const rows = r.users
    .sort((a, b) => (a.roomTitle ?? "").localeCompare(b.roomTitle ?? "") || a.name.localeCompare(b.name))
    .map((u) =>
      h(
        "tr",
        {},
        h("td", {}, userLink(u.userId, { [u.userId]: { name: u.name } })),
        h("td", {}, u.username),
        h("td", {}, u.roomTitle
          ? h("a", { href: u.guestRoom ? `#/room/${u.roomId}` : `#/chatlogs?room=${encodeURIComponent(u.room)}` }, icon(u.guestRoom ? "home" : "door"), ` ${u.roomTitle} (${u.roomId})`)
          : h("span", { class: "muted" }, "Navigator")),
        h("td", {}, h("a", { href: `#/clones?q=${encodeURIComponent(u.ip)}` }, u.ip)),
        h("td", {}, h("a", { href: `#/chatlogs?user=${u.userId}` }, icon("chat"), " Chat")),
      ),
    );
  return h(
    "div",
    {},
    pageHeader(`Online Users (${r.users.length})`, h("button", { class: "btn btn-default", onclick: () => route() }, "Refresh")),
    r.gameUp ? null : h("div", { class: "alert alert-danger" }, "The game server is not reachable."),
    table(["Name", "Username", "Room", "IP Address", ""], rows, "Nobody is online."),
  );
}

async function pageUsers(params) {
  const q = params.get("q") ?? "";
  const input = h("input", { type: "search", value: q, placeholder: "Name, username, id or IP address", style: "width:min(420px,100%)" });
  const form = h(
    "form",
    { class: "flex mb", onsubmit: (e) => { e.preventDefault(); go(`#/users?q=${encodeURIComponent(input.value.trim())}`); } },
    input,
    h("button", { class: "btn btn-primary", type: "submit" }, icon("search"), "Search"),
  );
  const view = h("div", {}, pageHeader("Search for Users"), form);
  if (!q) {
    input.focus();
    view.append(h("p", { class: "muted" }, "Search by character name, login name, user id or IP address."));
    return view;
  }
  const r = await api(`users/search?q=${encodeURIComponent(q)}`);
  if (r.users.length === 1 && (String(r.users[0].id) === q || r.users[0].name.toLowerCase() === q.toLowerCase() || r.users[0].username.toLowerCase() === q.toLowerCase())) {
    go(`#/user/${r.users[0].id}`);
    return null;
  }
  view.append(
    table(
      ["ID", "Name", "Username", "Credits", "Created", "Last Seen", "Status"],
      r.users.map((u) =>
        h(
          "tr",
          { class: u.banned ? "bad" : u.online ? "ok" : "" },
          h("td", {}, u.id),
          h("td", {}, h("a", { href: `#/user/${u.id}` }, icon("user"), " ", u.name || "(no character)")),
          h("td", {}, u.username),
          h("td", { class: "right" }, num(u.credits)),
          h("td", { class: "nowrap" }, fmtTime(u.createdAt)),
          h("td", { class: "nowrap" }, fmtTime(u.lastSeen)),
          h("td", {}, u.banned ? h("span", { class: "label label-danger" }, "Banned") : null, " ",
            u.online ? h("span", { class: "label label-success" }, "Online") : null, " ",
            u.staff ? h("span", { class: "label label-primary" }, "Staff") : null),
        ),
      ),
      `No users match "${q}".`,
    ),
  );
  return view;
}

/* ---------------------------------------------------------- user profile */

const USER_TABS = [
  ["ban", "warn", "Ban"],
  ["cfh", "bell", "Call for Help History"],
  ["give", "gift", "Give"],
  ["inventory", "tag", "Inventory"],
  ["notes", "pencil", "Notes"],
  ["profile", "gauge", "Profile"],
  ["purchases", "cart", "Purchases"],
  ["sessions", "list", "Sessions"],
  ["trades", "briefcase", "Trades"],
  ["chat", "chat", "Chatlogs"],
  ["rooms", "home", "Rooms"],
  ["friends", "users", "Friends"],
  ["clones", "clone", "Clones"],
];

async function pageUser(_params, idText, tab = "profile") {
  const id = Number(idText);
  const { user: u } = await api(`users/${id}`);
  const name = u.name || u.username;
  const admin = state.me.admin;
  const can = (p) => admin || state.me.permissions.includes(p);
  const reload = () => route();

  const doAction = async (action, extra = {}, button) => {
    const r = await act(`users/${id}/action`, { action, ...extra }, button);
    if (r) reload();
    return r;
  };
  const sanctionDialog = async (kind, title) => {
    const v = await modal(title, {
      text: `Applies to ${name}.`,
      fields: [
        { name: "duration", label: "Duration", type: "select", value: "perm", options: [["1h", "1 hour"], ["1d", "1 day"], ["3d", "3 days"], ["7d", "7 days"], ["30d", "30 days"], ["90d", "90 days"], ["perm", "Permanent"]] },
        { name: "reason", label: "Reason", type: "textarea", placeholder: "Shown to the player where the game can show it, and kept on record." },
      ],
      confirm: title,
      danger: true,
    });
    if (v) doAction(kind, v);
  };
  const textDialog = async (action, title, label) => {
    const v = await modal(title, { fields: [{ name: "text", label, type: "textarea" }], confirm: "Send" });
    if (v && v.text.trim()) doAction(action, { text: v.text.trim() });
  };
  const sendToRoom = async () => {
    const r = await api("public-rooms");
    const v = await modal(`Send ${name} to a room`, {
      fields: [
        { name: "roomId", label: "Public room", type: "select", options: [["", "— choose —"], ...r.rooms.map((x) => [x.code, `${x.name} (${x.code})${x.users ? ` · ${x.users} here` : ""}`])] },
        { name: "guest", label: "…or guest room id", type: "number", placeholder: "e.g. 100004" },
      ],
      confirm: "Send",
    });
    if (v && (v.guest || v.roomId)) doAction("send", { roomId: Number(v.guest || v.roomId) });
  };

  const menu = actionsMenu([
    ["Alert", () => textDialog("alert", `Alert ${name}`, "Alert text (pops up in game)"), { disabled: !can("alert") }],
    ["Message (staff mail)", () => textDialog("message", `Message ${name}`, "Message (goes to their inbox)"), { disabled: !can("alert") }],
    "-",
    ["Bring to my room", () => doAction("bring"), { disabled: !can("roomkick") || !u.online }],
    ["Go to their room", () => doAction("goto"), { disabled: !u.online?.roomId }],
    ["Send to room…", sendToRoom, { disabled: !can("roomkick") || !u.online }],
    ["Kick (disconnect)", async () => {
      const v = await modal(`Kick ${name}?`, { fields: [{ name: "text", label: "Message before disconnecting (optional)", type: "textarea" }], confirm: "Kick", danger: true });
      if (v) doAction("kick", { text: v.text });
    }, { disabled: !can("kick") || !u.online }],
    "-",
    u.active.ban ? ["Unban", () => doAction("unban"), { disabled: !can("ban") }] : ["Ban", () => sanctionDialog("ban", "Ban"), { disabled: !can("ban") }],
    u.active.trade ? ["Untrade ban", () => doAction("untradeban"), { disabled: !can("ban") }] : ["Trade ban", () => sanctionDialog("tradeban", "Trade ban"), { disabled: !can("ban") }],
    u.active.mute ? ["Unmute", () => doAction("unmute"), { disabled: !can("mute") }] : ["Mute", () => sanctionDialog("mute", "Mute"), { disabled: !can("mute") }],
    u.active.cfh ? ["Lift Call for Help ban", () => doAction("uncfhban"), { disabled: !can("ban") }] : ["Call for Help ban", () => sanctionDialog("cfhban", "Call for Help ban"), { disabled: !can("ban") }],
    "-",
    ["Clear Inventory", async () => {
      if (await modal("Clear inventory?", { text: `Every item ${name} holds is removed. A snapshot is kept so Restore Inventory can undo it.`, confirm: "Clear inventory", danger: true })) doAction("clear_inventory");
    }, { disabled: !admin }],
    ["Restore Inventory", async () => {
      if (await modal("Restore inventory?", { text: "Re-adds the items from the most recent un-restored snapshot.", confirm: "Restore" })) doAction("restore_inventory");
    }, { disabled: !admin }],
    ["Clear Friends List", async () => {
      if (await modal("Clear friends list?", { text: `All of ${name}'s friendships and pending requests are removed.`, confirm: "Clear friends", danger: true })) doAction("clear_friends");
    }, { disabled: !admin }],
    ["Clear Signature", () => doAction("signature"), { disabled: !can("forcenamechange") }],
    "-",
    ["View Chatlogs", () => go(`#/user/${id}/chat`)],
    ["View Guest Rooms", () => go(`#/user/${id}/rooms`)],
    ["Clone Check", () => go(`#/user/${id}/clones`)],
  ]);

  const gender = u.sex === 1 ? h("span", { class: "gender f", title: "Female" }, "♀") : u.sex === 0 ? h("span", { class: "gender m", title: "Male" }, "♂") : null;
  const header = h(
    "div",
    { class: "page-header" },
    h("h1", {}, gender, "User Profile: ", h("a", { href: `#/user/${id}` }, name), ` (${u.id}, ${u.username})`),
    h("div", { class: "flex" },
      u.active.ban ? h("span", { class: "label label-danger" }, "BANNED") : null,
      u.active.mute ? h("span", { class: "label label-warning" }, "MUTED") : null,
      u.active.trade ? h("span", { class: "label label-warning" }, "TRADE BANNED") : null,
      menu),
  );
  const tabs = h(
    "div",
    { class: "nav-tabs", role: "tablist" },
    USER_TABS.filter(([key]) => key !== "give" || admin).map(([key, ico, label]) =>
      h("a", { href: `#/user/${id}/${key}`, class: tab === key ? "active" : "", role: "tab" }, icon(ico), label),
    ),
  );
  const body = h("div", {}, h("p", { class: "loading" }, "Loading…"));
  const view = h("div", {}, header, tabs, body);

  const render = USER_TABS_RENDER[tab] ?? USER_TABS_RENDER.profile;
  render({ id, u, name, admin, can, doAction, reload })
    .then((content) => body.replaceChildren(content))
    .catch((err) => body.replaceChildren(h("div", { class: "alert alert-danger" }, err.message)));
  return view;
}

const USER_TABS_RENDER = {
  async profile({ id, u, name, admin, can, doAction }) {
    const avatar = h("img", { class: "avatar", alt: `${name}'s avatar` });
    composeLayers(u.avatar).then((url) => (url ? (avatar.src = url) : avatar.remove()));
    const info = h(
      "div",
      { class: "info" },
      avatar,
      h("div", { class: "status" }, u.online ? "Online" : "Offline",
        u.online?.roomTitle ? h("span", { class: "small muted" }, ` — in `, h("a", { href: u.online.guestRoom ? `#/room/${u.online.roomId}` : `#/chatlogs?room=${encodeURIComponent(u.online.room)}` }, u.online.roomTitle)) : null),
      h("p", {}, `Signature: ${u.signature || "—"}`),
      h("p", {}, "IP Address: ", u.lastIp ? h("a", { href: `#/clones?q=${encodeURIComponent(u.lastIp)}` }, u.lastIp) : "—"),
      h("p", {}, `Created: ${fmtTime(u.createdAt)}`),
      h("p", {}, `Last Access: ${fmtTime(u.lastSeen ?? u.lastLogin)}`),
      h("p", {}, `Credits: ${num(u.credits)}`),
      h("p", {}, `Items: ${num(u.itemCount)}`),
      h("p", {}, `Camera: ${u.camera ? `yes, ${u.film} film` : "no"}`),
      u.staff ? h("p", {}, "Permissions: ", u.permissions.join(", ")) : null,
      h("p", {}, `This user has ${u.banCount} total ban${u.banCount === 1 ? "" : "s"}, ${u.activeBanCount} of which ${u.activeBanCount === 1 ? "is" : "are"} still active.`),
      u.wearing.length ? h("div", {}, h("p", {}, "Wearing:"), h("div", { class: "offer-list" }, u.wearing.map((set) => itemImg(set, 2, true)))) : null,
    );

    const field = (label, value, onSave, opts = {}) => {
      const input = h("input", { type: opts.type ?? "text", value: value ?? "", placeholder: opts.placeholder ?? "", autocomplete: "off", disabled: opts.disabled });
      const save = h("button", { class: "btn btn-success", type: "submit", title: `Save ${label}`, disabled: opts.disabled }, icon("pencil"));
      return h("form", { class: "input-group", onsubmit: (e) => { e.preventDefault(); onSave(input.value, save); } }, h("span", { class: "addon" }, label), input, save);
    };
    const text = h("textarea", { placeholder: `Write to ${name}…`, maxlength: 1000 });
    const right = h(
      "div",
      {},
      field("Username", u.username, (v, b) => doAction("username", { name: v.trim() }, b), { disabled: !admin }),
      field("Character", u.name ?? "", (v, b) => doAction("rename", { name: v.trim() }, b), { disabled: !can("forcenamechange") }),
      field("Password", "", (v, b) => doAction("password", { password: v }, b), { type: "password", placeholder: "New password", disabled: !admin }),
      field("Credits", String(u.credits), (v, b) => doAction("credits", { mode: "set", amount: Number(v) }, b), { type: "number", disabled: !admin }),
      text,
      h("div", { class: "flex mt", style: "justify-content:flex-end" },
        h("button", { class: "btn btn-info", type: "button", disabled: !can("alert"), onclick: (e) => text.value.trim() && doAction("alert", { text: text.value.trim() }, e.currentTarget) }, icon("megaphone"), "Alert"),
        h("button", { class: "btn btn-info", type: "button", disabled: !can("alert"), onclick: (e) => text.value.trim() && doAction("message", { text: text.value.trim() }, e.currentTarget) }, icon("envelope"), "Message"),
      ),
      admin && id !== state.me.id ? permissionsEditor(u, doAction) : null,
    );
    return h("div", { class: "profile" }, info, right);
  },

  async ban({ id, u, name, can, doAction }) {
    const r = await api(`users/${id}/bans`);
    const kind = h("select", {}, [["ban", "Ban"], ["tradeban", "Trade ban"], ["mute", "Mute"], ["cfhban", "Call for Help ban"]].map(([v, l]) => h("option", { value: v }, l)));
    const dur = h("select", {}, [["1h", "1 hour"], ["1d", "1 day"], ["3d", "3 days"], ["7d", "7 days"], ["30d", "30 days"], ["90d", "90 days"], ["perm", "Permanent"]].map(([v, l]) => h("option", { value: v, selected: v === "perm" }, l)));
    const reason = h("input", { type: "text", placeholder: "Reason", style: "min-width:260px" });
    const apply = h("button", { class: "btn btn-danger", type: "submit", disabled: !can("ban") && !can("mute") }, "Apply");
    const form = h("form", { class: "form-row", onsubmit: async (e) => {
      e.preventDefault();
      const label = kind.selectedOptions[0].textContent;
      if (await modal(`${label} ${name}?`, { text: `${dur.selectedOptions[0].textContent}. ${reason.value || "No reason given."}`, confirm: label, danger: true })) {
        doAction(kind.value, { duration: dur.value, reason: reason.value }, apply);
      }
    } },
      h("div", {}, h("label", {}, "Type"), kind),
      h("div", {}, h("label", {}, "Duration"), dur),
      h("div", { class: "grow" }, h("label", {}, "Reason"), reason),
      apply,
    );
    const KIND = { ban: "Ban", trade: "Trade ban", mute: "Mute", cfh: "Call for Help ban" };
    const LIFT = { ban: "unban", trade: "untradeban", mute: "unmute", cfh: "uncfhban" };
    const now = Date.now();
    const rows = r.bans.map((b) => {
      const live = b.liftedAt === null && (b.expiresAt === null || b.expiresAt > now);
      return h(
        "tr",
        { class: live ? "bad" : "" },
        h("td", {}, b.id),
        h("td", {}, KIND[b.kind] ?? b.kind),
        h("td", {}, b.reason || h("span", { class: "muted" }, "—")),
        h("td", {}, userLink(b.staffId, r.names)),
        h("td", { class: "nowrap" }, fmtTime(b.createdAt)),
        h("td", { class: "nowrap" }, b.expiresAt ? fmtTime(b.expiresAt) : "Never"),
        h("td", {}, live
          ? h("button", { class: "btn btn-sm btn-default", onclick: (e) => doAction(LIFT[b.kind], {}, e.currentTarget) }, "Lift")
          : b.liftedAt ? h("span", { class: "muted small" }, `Lifted ${fmtTime(b.liftedAt)} by `, userLink(b.liftedBy, r.names)) : h("span", { class: "muted small" }, "Expired")),
      );
    });
    return h("div", {}, form, table(["#", "Type", "Reason", "By", "Issued", "Expires", "Status"], rows, `${name} has never been sanctioned.`));
  },

  async cfh({ id }) {
    const r = await api(`users/${id}/cfh`);
    return cfhTable(r.calls, r.names, () => route());
  },

  async give({ id, name, doAction }) {
    const amount = h("input", { type: "number", value: "100", style: "width:140px" });
    const mode = h("select", {}, h("option", { value: "add" }, "Add (negative takes)"), h("option", { value: "set" }, "Set balance to"));
    const creditReason = h("input", { type: "text", placeholder: "Reason (shown in Purchases)", style: "min-width:240px" });
    const creditBtn = h("button", { class: "btn btn-success", type: "submit" }, icon("dollar"), "Give Credits");
    const credits = h(
      "form",
      { class: "form-row", onsubmit: (e) => { e.preventDefault(); doAction("credits", { mode: mode.value, amount: Number(amount.value), reason: creditReason.value }, creditBtn); } },
      h("div", {}, h("label", {}, "Credits"), amount),
      h("div", {}, h("label", {}, "Mode"), mode),
      h("div", { class: "grow" }, h("label", {}, "Reason"), creditReason),
      creditBtn,
    );
    const picker = itemPicker();
    const count = h("input", { type: "number", value: "1", min: 1, max: 100, style: "width:90px" });
    const cat = h("select", {}, h("option", { value: "" }, "Auto"), Object.entries(CATEGORY).map(([v, l]) => h("option", { value: v }, l)));
    const giveBtn = h("button", { class: "btn btn-success", type: "button" }, icon("gift"), "Give Item");
    giveBtn.addEventListener("click", () => {
      const sel = picker.selected();
      if (!sel) return toast("Pick an item first.", true);
      doAction("give", { code: sel.code, count: Number(count.value), category: cat.value ? Number(cat.value) : sel.category }, giveBtn);
    });
    return h(
      "div",
      {},
      h("h3", { class: "section-title" }, `Give credits to ${name}`),
      credits,
      h("h3", { class: "section-title" }, `Give an item to ${name}`),
      picker.el,
      h("div", { class: "form-row mt" },
        h("div", {}, h("label", {}, "Count"), count),
        h("div", {}, h("label", {}, "Category"), cat),
        giveBtn),
    );
  },

  async inventory({ id, admin, doAction }) {
    const r = await api(`users/${id}/inventory`);
    const wrap = h("div", {});
    const groups = new Map();
    for (const item of r.items) {
      const key = item.ticketRoom ? 0 : item.category;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(item);
    }
    if (r.items.length === 0) wrap.append(h("div", { class: "empty" }, "Their inventory is empty."));
    for (const [key, items] of [...groups].sort((a, b) => a[0] - b[0])) {
      wrap.append(h("h3", { class: "section-title" }, `${key === 0 ? "Room Tickets" : CATEGORY[key] ?? `Category ${key}`} (${items.length})`));
      wrap.append(
        h("div", { class: "item-grid" }, items.map((item) =>
          itemTile(item, [
            h("div", { class: "meta" }, `#${item.id} · ${item.typeCode}`),
            item.worn ? h("span", { class: "badge label label-success" }, "Worn") : null,
            item.level ? h("div", { class: "meta" }, "★".repeat(item.level)) : null,
            item.ticketRoom ? h("div", { class: "meta" }, `Room ${item.ticketRoom}${item.expiresAt ? ` · ${fmtTime(item.expiresAt)}` : ""}`) : null,
            admin ? h("button", { class: "x", title: "Remove this item", onclick: async (e) => {
              const b = e.currentTarget;
              if (await modal("Remove item?", { text: `${item.name} (#${item.id}) is deleted from their inventory.`, confirm: "Remove", danger: true })) doAction("remove_item", { itemId: item.id }, b);
            } }, "✕") : null,
          ]),
        )),
      );
    }
    wrap.append(h("h3", { class: "section-title" }, `Placed in rooms (${r.placed.length})`));
    wrap.append(table(
      ["", "Item", "Room", "Placed"],
      r.placed.map((p) => h("tr", {},
        h("td", { style: "width:52px" }, itemImg(p.typeCode, 1, true)),
        h("td", {}, `${p.name} `, h("span", { class: "muted small" }, `(${p.typeCode}, ref ${p.ref})`)),
        h("td", {}, p.room.startsWith("guest:") ? h("a", { href: `#/room/${p.room.slice(6)}` }, p.roomName) : p.roomName),
        h("td", { class: "nowrap" }, fmtTime(p.placedAt)))),
      "Nothing placed.",
    ));
    if (r.snapshots.length) {
      wrap.append(h("h3", { class: "section-title" }, "Inventory snapshots"));
      wrap.append(table(
        ["#", "Items", "Credits then", "Cleared by", "When", ""],
        r.snapshots.map((s) => h("tr", {},
          h("td", {}, s.id), h("td", {}, s.count), h("td", {}, num(s.credits)),
          h("td", {}, userLink(s.staffId, r.names)), h("td", { class: "nowrap" }, fmtTime(s.createdAt)),
          h("td", {}, s.restoredAt ? h("span", { class: "muted small" }, `Restored ${fmtTime(s.restoredAt)}`)
            : admin ? h("button", { class: "btn btn-sm btn-default", onclick: (e) => doAction("restore_inventory", { snapshotId: s.id }, e.currentTarget) }, "Restore") : null))),
      ));
    }
    return wrap;
  },

  async notes({ id }) {
    const r = await api(`users/${id}/notes`);
    const text = h("textarea", { placeholder: "Add a note other staff will see on this profile…" });
    const add = h("button", { class: "btn btn-primary", type: "submit" }, "Add Note");
    const list = (notes, names) =>
      notes.length
        ? notes.map((n) => h("div", { class: "panel" },
            h("div", { class: "panel-heading" }, h("span", {}, userLink(n.staffId, names)), h("span", { class: "muted small" }, fmtTime(n.at))),
            h("div", { class: "panel-body", style: "white-space:pre-wrap" }, n.note)))
        : [h("div", { class: "empty" }, "No notes yet.")];
    const holder = h("div", { class: "mt" }, list(r.notes, r.names));
    return h("div", {},
      h("form", { onsubmit: async (e) => {
        e.preventDefault();
        if (!text.value.trim()) return;
        const res = await act(`users/${id}/notes`, { note: text.value }, add);
        if (res) {
          text.value = "";
          holder.replaceChildren(...list(res.notes, res.names));
        }
      } }, text, h("div", { class: "flex mt", style: "justify-content:flex-end" }, add)),
      holder);
  },

  async purchases({ id }) {
    const r = await api(`users/${id}/purchases`);
    return table(
      ["#", "Message", "Item Name", "Balance", "Amount", "By", "Time"],
      r.purchases.map((p) => h("tr", {},
        h("td", { style: `color:${p.delta < 0 ? "var(--danger)" : "var(--success)"}` }, icon(p.delta < 0 ? "cart" : "dollar")),
        h("td", {}, p.reason),
        h("td", {}, p.itemCode ? h("span", { class: "flex", style: "gap:6px" }, itemImg(p.itemCode, undefined, true), p.itemName) : ""),
        h("td", { class: "right" }, num(p.balance)),
        h("td", { class: "right", style: `color:${p.delta < 0 ? "var(--danger)" : "var(--success)"}` }, p.delta > 0 ? `+${num(p.delta)}` : num(p.delta)),
        h("td", {}, p.staffId ? userLink(p.staffId, r.names) : ""),
        h("td", { class: "nowrap" }, fmtIso(p.at)))),
      "No credit movements recorded yet.",
    );
  },

  async sessions({ id }) {
    const r = await api(`users/${id}/sessions`);
    return table(
      ["Source", "IP Address", "Machine", "Started", "Length", "Browser"],
      r.sessions.map((s) => h("tr", {},
        h("td", {}, h("span", { class: `label ${s.source === "game" ? "label-success" : s.source === "hk" ? "label-primary" : "label-default"}` }, s.source)),
        h("td", {}, s.ip ? h("a", { href: `#/clones?q=${encodeURIComponent(s.ip)}` }, s.ip) : "—"),
        h("td", { class: "mono" }, s.machineId ? h("a", { href: `#/clones?q=${encodeURIComponent(s.machineId)}` }, s.machineId) : "—"),
        h("td", { class: "nowrap" }, fmtTime(s.at, true)),
        h("td", {}, s.endedAt ? fmtDuration(s.endedAt - s.at) : s.source === "game" ? h("span", { class: "muted" }, "open") : "—"),
        h("td", { class: "small muted", style: "max-width:320px" }, s.userAgent))),
      "No sessions recorded yet.",
    );
  },

  async trades({ id }) {
    const r = await api(`users/${id}/trades`);
    if (!r.trades.length) return h("div", { class: "empty" }, "No trades recorded yet.");
    const side = (userId, ip, items) => h("div", { class: "grow", style: "flex-basis:280px" },
      h("p", {}, userLink(userId, r.names)),
      h("p", {}, "IP Address: ", ip ? h("a", { href: `#/clones?q=${encodeURIComponent(ip)}` }, ip) : "—"),
      h("p", {}, "Offers:"),
      items.length ? h("div", { class: "offer-list" }, items.map((i) => h("span", { title: `${i.name} (#${i.id})` }, itemImg(i.typeCode, i.category)))) : h("span", { class: "muted" }, "Nothing"));
    return h("div", {}, r.trades.map((t) => h("div", { class: "panel" },
      h("div", { class: "panel-heading" }, `Trade between ${r.names[t.a]?.name ?? t.a} and ${r.names[t.b]?.name ?? t.b} (${fmtIso(t.at)})`),
      h("div", { class: "panel-body flex", style: "align-items:flex-start" }, side(t.a, t.ipA, t.itemsA), side(t.b, t.ipB, t.itemsB)))));
  },

  async chat({ id }) {
    return chatlogView(new URLSearchParams({ user: String(id) }), false);
  },

  async rooms({ id }) {
    const r = await api(`users/${id}/rooms`);
    return roomsTable(r.rooms, {});
  },

  async friends({ id }) {
    const r = await api(`users/${id}/friends`);
    return table(["Name", "Last online"], r.friends.map((f) => h("tr", {}, h("td", {}, userLink(f.id, { [f.id]: f })), h("td", {}, fmtTime(f.lastSeenAt)))), "No friends.");
  },

  async clones({ id }) {
    return clonesTable(await api(`users/${id}/clones`));
  },
};

function permissionsEditor(u, doAction) {
  const boxes = PERMISSIONS.map((p) => h("label", { style: "font-weight:400;margin-right:12px" }, h("input", { type: "checkbox", value: p, checked: u.permissions.includes(p) }), ` ${p}`));
  const save = h("button", { class: "btn btn-default", type: "submit" }, icon("shield"), "Save Permissions");
  return h("form", { class: "panel mt", onsubmit: async (e) => {
    e.preventDefault();
    const permissions = boxes.map((b) => b.querySelector("input")).filter((i) => i.checked).map((i) => i.value);
    if (await modal("Change permissions?", { text: permissions.length ? `New permissions: ${permissions.join(", ")}.` : "This removes all staff access.", confirm: "Save" })) {
      doAction("permissions", { permissions }, save);
    }
  } },
    h("div", { class: "panel-heading" }, "Staff permissions (applied at their next login)"),
    h("div", { class: "panel-body" }, h("div", {}, boxes), h("div", { class: "mt" }, save)));
}

/** Searchable item grid; selected() returns {code, name, category} or null. */
function itemPicker() {
  let selected = null;
  const grid = h("div", { class: "item-grid mt" });
  const input = h("input", { type: "search", placeholder: "Item name or code", style: "width:min(360px,100%)" });
  const run = async () => {
    const q = input.value.trim();
    if (!q) return;
    grid.replaceChildren(h("span", { class: "loading" }, "Searching…"));
    try {
      const r = await api(`items/search?q=${encodeURIComponent(q)}`);
      if (!r.items.length) return grid.replaceChildren(h("div", { class: "empty" }, "No items match."));
      grid.replaceChildren(...r.items.map((item) => {
        const tile = itemTile(item, h("div", { class: "meta" }, `${item.code} · ${CATEGORY[item.category] ?? ""}`));
        tile.classList.add("pick");
        tile.addEventListener("click", () => {
          grid.querySelectorAll(".selected").forEach((t) => t.classList.remove("selected"));
          tile.classList.add("selected");
          selected = item;
        });
        return tile;
      }));
    } catch (err) {
      grid.replaceChildren(h("div", { class: "alert alert-danger" }, err.message));
    }
  };
  const el = h("div", {},
    h("form", { class: "flex", onsubmit: (e) => { e.preventDefault(); run(); } }, input, h("button", { class: "btn btn-primary", type: "submit" }, icon("search"), "Find")),
    grid);
  return { el, selected: () => selected };
}

/* ------------------------------------------------------------- chatlogs */

async function pageChatlogs(params) {
  return chatlogView(params, true);
}

async function chatlogView(params, withHeader) {
  const field = (name, placeholder, width = 180) => h("input", { type: "text", name, value: params.get(name) ?? "", placeholder, style: `width:${width}px` });
  const user = field("user", "User name or id");
  const room = field("room", "Room or code");
  const q = field("q", "Text contains", 200);
  const kind = h("select", { name: "kind" }, [["all", "All lines"], ["chat", "Chat"], ["trade", "Trade chat"], ["command", "Staff commands"], ["system", "Room moves"]].map(([v, l]) => h("option", { value: v, selected: (params.get("kind") ?? "all") === v }, l)));
  const filters = h("form", { class: "form-row", onsubmit: (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    for (const el of [user, room, q, kind]) if (el.value && el.value !== "all") p.set(el.name, el.value.trim());
    go(`#/chatlogs?${p}`);
  } },
    withHeader ? h("div", {}, h("label", {}, "User"), user) : null,
    h("div", {}, h("label", {}, "Room"), room),
    h("div", {}, h("label", {}, "Text"), q),
    h("div", {}, h("label", {}, "Show"), kind),
    h("button", { class: "btn btn-primary", type: "submit" }, icon("search"), "Filter"));
  if (!withHeader) filters.addEventListener("submit", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    const p = new URLSearchParams(params);
    for (const el of [room, q, kind]) if (el.value && el.value !== "all") p.set(el.name, el.value.trim()); else p.delete(el.name);
    load(p, true);
  }, true);

  const tbody = h("tbody", {});
  const more = h("button", { class: "btn btn-success", type: "button" }, "Older");
  const holder = h("div", {});
  let oldest = 0;
  let current = new URLSearchParams(params);

  const row = (line, names) =>
    h("tr", {},
      h("td", { class: "nowrap" }, userLink(line.userId, names)),
      h("td", { class: line.kind === "system" ? "system" : line.kind === "command" ? "command" : "" },
        line.kind === "trade" ? h("span", { class: "label label-info", title: "Trade window chat" }, "Trade") : null,
        line.kind === "trade" ? " " : null,
        line.message,
        line.kind === "trade" && line.targetId ? h("span", { class: "muted small" }, " → ", userLink(line.targetId, names)) : null),
      h("td", { class: "nowrap" }, roomLink(line)),
      h("td", { class: "nowrap" }, h("a", { title: "Everything said in this room around this time", href: `#/chatlogs?room=${encodeURIComponent(line.room)}&kind=all&to=${line.at + 5 * 60e3}` }, fmtTime(line.at, true))));

  async function load(p, reset) {
    if (reset) {
      tbody.replaceChildren();
      oldest = 0;
      current = p;
    }
    const query = new URLSearchParams(current);
    if (oldest) query.set("before", String(oldest));
    more.disabled = true;
    try {
      const r = await api(`chatlogs?${query}`);
      for (const line of r.lines) tbody.append(row(line, r.names));
      if (r.lines.length) oldest = r.lines[r.lines.length - 1].id;
      more.classList.toggle("hidden", r.lines.length < 100);
      if (!tbody.children.length) holder.replaceChildren(h("div", { class: "empty" }, "No chat matches."));
      else if (!holder.querySelector("table")) {
        holder.replaceChildren(h("div", { class: "table-wrap" }, h("table", {}, h("thead", {}, h("tr", {}, ["Username", "Chat", "Room/Player", "Time"].map((x) => h("th", {}, x)))), tbody)));
      }
    } catch (err) {
      holder.replaceChildren(h("div", { class: "alert alert-danger" }, err.message));
    } finally {
      more.disabled = false;
    }
  }
  more.addEventListener("click", () => load(current, false));
  await load(current, true);
  return h("div", {}, withHeader ? pageHeader("Chatlog Results") : null, filters, holder, h("div", { class: "pager" }, h("span"), more));
}

/* -------------------------------------------------------- call for help */

function cfhTable(calls, names, refresh) {
  const callAction = async (call, action, button) => {
    let resolution;
    if (action === "close") {
      const v = await modal(`Close call #${call.id}`, { fields: [{ name: "resolution", label: "Resolution (optional)", type: "textarea" }], confirm: "Close call" });
      if (!v) return;
      resolution = v.resolution;
    }
    const r = await act(`cfh/${call.id}`, { action, resolution }, button);
    if (r) {
      refresh();
      pollCalls();
    }
  };
  return table(
    ["ID", "Reporter", "Message", "Reported", "Type", "Room", "Time", "Pick Up"],
    calls.map((c) => h(
      "tr",
      { class: c.closedAt ? "" : c.pickedBy ? "warn" : "ok" },
      h("td", {}, c.id),
      h("td", { class: "nowrap" }, userLink(c.reporterId, names)),
      h("td", { style: "min-width:240px" }, c.message || h("span", { class: "muted" }, "(no text)"),
        c.resolution ? h("div", { class: "small muted" }, `Resolution: ${c.resolution}`) : null),
      h("td", { class: "nowrap" }, c.reportedId ? userLink(c.reportedId, names) : c.reported || "N/A"),
      h("td", {}, CFH_CATEGORY[c.category] ?? c.category),
      h("td", { class: "nowrap" }, c.room ? h("a", { href: `#/chatlogs?room=${encodeURIComponent(c.room)}&kind=all&to=${c.at + 2 * 60e3}` }, c.roomName || c.room) : "—"),
      h("td", { class: "nowrap" }, fmtTime(c.at)),
      h("td", { class: "nowrap" },
        c.closedAt
          ? h("span", { class: "small muted" }, "Closed by ", userLink(c.closedBy, names), " ", h("button", { class: "btn-link small", onclick: (e) => callAction(c, "reopen", e.currentTarget) }, "reopen"))
          : c.pickedBy
            ? h("span", {}, userLink(c.pickedBy, names), " ",
                h("button", { class: "btn btn-sm btn-success", onclick: (e) => callAction(c, "close", e.currentTarget) }, "Close"), " ",
                h("button", { class: "btn btn-sm btn-default", title: "Release", onclick: (e) => callAction(c, "release", e.currentTarget) }, "✕"))
            : h("button", { class: "btn btn-sm btn-primary", onclick: (e) => callAction(c, "pickup", e.currentTarget) }, "Pick up")),
    )),
    "No calls for help.",
  );
}

async function pageCfh(params) {
  const status = params.get("status") ?? "open";
  const before = params.get("before");
  const r = await api(`cfh?status=${status}${before ? `&before=${before}` : ""}`);
  const soundBtn = h("button", { class: `btn ${state.sounds ? "btn-success" : "btn-danger"}`, type: "button" }, icon("bell"), state.sounds ? "Sounds On" : "Toggle Sounds");
  soundBtn.addEventListener("click", () => {
    state.sounds = !state.sounds;
    try { localStorage.setItem("hk-sounds", state.sounds ? "1" : "0"); } catch {}
    if (state.sounds) beep();
    soundBtn.className = `btn ${state.sounds ? "btn-success" : "btn-danger"}`;
    soundBtn.lastChild.textContent = state.sounds ? "Sounds On" : "Toggle Sounds";
  });
  const tabs = h("div", { class: "nav-tabs" }, [["open", "Open"], ["closed", "Closed"], ["all", "All"]].map(([k, l]) => h("a", { href: `#/cfh?status=${k}`, class: status === k ? "active" : "" }, l)));
  const last = r.calls[r.calls.length - 1];
  return h("div", {},
    pageHeader("Call for Help Browser", soundBtn),
    tabs,
    cfhTable(r.calls, r.names, () => route()),
    h("div", { class: "pager" },
      before ? h("a", { class: "btn btn-success", href: `#/cfh?status=${status}` }, "Newest") : h("span"),
      r.calls.length === 50 && last ? h("a", { class: "btn btn-success", href: `#/cfh?status=${status}&before=${last.id}` }, "Next") : h("span")));
}

let audioCtx = null;
function beep() {
  try {
    audioCtx ??= new AudioContext();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.15, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    o.connect(g).connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + 0.4);
  } catch {}
}

/** Poll the open-call count; chime on a NEW call when sounds are on. */
async function pollCalls() {
  try {
    const r = await api("cfh?status=open");
    state.openCalls = r.calls.length;
    const newest = r.calls[0]?.id ?? 0;
    if (state.lastCallId && newest > state.lastCallId) {
      if (state.sounds) beep();
      toast(`New call for help from ${r.names[r.calls[0].reporterId]?.name ?? "a player"}.`);
      if ((location.hash || "").startsWith("#/cfh")) route();
    }
    state.lastCallId = Math.max(state.lastCallId, newest);
    updateCfhBadge();
  } catch {}
}

/* ---------------------------------------------------------------- rooms */

function roomsTable(rooms, names) {
  return table(
    ["ID", "Name", "Owner", "Style", "Who can enter", "Items", "Users", ""],
    rooms.map((r) => h("tr", {},
      h("td", {}, r.id),
      h("td", {}, h("a", { href: `#/room/${r.id}` }, icon("home"), " ", r.name)),
      h("td", {}, userLink(r.ownerId, names)),
      h("td", {}, r.style),
      h("td", {}, ENTRY[r.entryState] ?? r.entryState),
      h("td", { class: "right" }, r.items ?? ""),
      h("td", { class: "right" }, r.users ?? ""),
      h("td", {}, r.featured ? h("span", { class: "label label-warning" }, "Featured") : null))),
    "No rooms.",
  );
}

async function pageRooms(params) {
  const q = params.get("q") ?? "";
  const input = h("input", { type: "search", value: q, placeholder: "Room name, owner, or id", style: "width:min(420px,100%)" });
  const r = await api(`rooms/search?q=${encodeURIComponent(q)}`);
  return h("div", {},
    pageHeader("Search for Rooms"),
    h("form", { class: "flex mb", onsubmit: (e) => { e.preventDefault(); go(`#/rooms?q=${encodeURIComponent(input.value.trim())}`); } },
      input, h("button", { class: "btn btn-primary", type: "submit" }, icon("search"), "Search")),
    q ? null : h("p", { class: "muted" }, "Newest guest rooms:"),
    roomsTable(r.rooms, r.names));
}

async function pageRoom(_params, idText) {
  const id = Number(idText);
  const r = await api(`rooms/${id}`);
  const room = r.room;
  const can = (p) => state.me.admin || state.me.permissions.includes(p);
  const roomAction = async (body, button) => {
    const res = await act(`rooms/${id}/action`, body, button);
    if (res) route();
  };
  const menu = actionsMenu([
    [room.featured ? "Unfeature" : "Feature in Popular", () => roomAction({ action: "feature", on: !room.featured }), { disabled: !state.me.admin }],
    ["Change who can enter…", async () => {
      const v = await modal("Who can enter", { fields: [{ name: "state", label: "Entry", type: "select", value: room.entryState, options: ENTRY.map((l, i) => [i, l]) }], confirm: "Save" });
      if (v) roomAction({ action: "entry", state: Number(v.state) });
    }, { disabled: !can("roomkick") }],
    ["Rename / redescribe…", async () => {
      const v = await modal("Rename room", { fields: [{ name: "name", label: "Name", value: room.name }, { name: "description", label: "Description", type: "textarea", value: room.description }], confirm: "Save" });
      if (v) roomAction({ action: "rename", name: v.name, description: v.description });
    }, { disabled: !can("forcenamechange") }],
    "-",
    ["View room chatlogs", () => go(`#/chatlogs?room=${encodeURIComponent(`guest:${id}`)}&kind=all`)],
    ["View owner", () => go(`#/user/${room.ownerId}`)],
  ]);
  return h("div", {},
    pageHeader(`Guest Room: ${room.name} (${room.id})`, menu),
    h("p", {}, "Owner: ", userLink(room.ownerId, r.names)),
    h("p", {}, `Description: ${room.description || "—"}`),
    h("p", {}, `Style: ${room.style} · Who can enter: ${ENTRY[room.entryState] ?? room.entryState}${room.featured ? " · Featured" : ""}`),
    h("h3", { class: "section-title" }, `In the room now (${r.users.length})`),
    table(["Name", "IP"], r.users.map((u) => h("tr", {}, h("td", {}, userLink(u.userId, { [u.userId]: { name: u.name } })), h("td", {}, u.ip))), "Nobody is in this room."),
    h("h3", { class: "section-title" }, `Furniture (${r.items.length})`),
    h("div", { class: "item-grid" }, r.items.map((i) => itemTile(i, [h("div", { class: "meta" }, `ref ${i.ref}`), i.ownerId && i.ownerId !== room.ownerId ? h("div", { class: "meta" }, "owner ", userLink(i.ownerId, r.names)) : null]))),
  );
}

async function pagePublicRooms() {
  const r = await api("public-rooms");
  return h("div", {},
    pageHeader("Public Rooms"),
    r.gameUp ? null : h("div", { class: "alert alert-danger" }, "The game server is not reachable."),
    table(["Code", "Name", "Cast", "Users", ""],
      r.rooms.map((x) => h("tr", { class: x.users ? "ok" : "" },
        h("td", {}, x.code), h("td", {}, x.name), h("td", { class: "mono small" }, x.cast), h("td", { class: "right" }, x.users),
        h("td", {}, h("a", { href: `#/chatlogs?room=${encodeURIComponent(x.cast)}&kind=all` }, icon("chat"), " Chat")))),
      "No rooms."));
}

/* --------------------------------------------------------- clone check */

function clonesTable(r) {
  return table(
    ["User", "Shared", "Logins", "Last"],
    r.matches.map((m) => h("tr", {},
      h("td", {}, userLink(m.userId, r.names)),
      h("td", {}, m.via.map((v, i) => [i ? ", " : "", h("a", { href: `#/clones?q=${encodeURIComponent(v.replace(/^machine /, ""))}` }, v)])),
      h("td", { class: "right" }, m.count),
      h("td", { class: "nowrap" }, fmtTime(m.last)))),
    "No other accounts share an address or machine with this one.",
  );
}

async function pageClones(params) {
  const q = params.get("q") ?? "";
  const input = h("input", { type: "search", value: q, placeholder: "User name, id, IP address or machine id", style: "width:min(420px,100%)" });
  const view = h("div", {},
    pageHeader("Clone Check"),
    h("form", { class: "flex mb", onsubmit: (e) => { e.preventDefault(); go(`#/clones?q=${encodeURIComponent(input.value.trim())}`); } },
      input, h("button", { class: "btn btn-primary", type: "submit" }, icon("search"), "Check")));
  if (!q) {
    view.append(h("p", { class: "muted" }, "Finds accounts that logged in from the same IP address or machine."));
    return view;
  }
  const r = await api(`clones?q=${encodeURIComponent(q)}`);
  if (r.target) view.append(h("p", {}, "Accounts sharing an address or machine with ", userLink(r.target, r.names), ":"));
  else view.append(h("p", {}, `Accounts that used ${q}:`));
  view.append(clonesTable(r));
  return view;
}

/* ---------------------------------------------------------------- bulk */

async function pageBulk(_params, kind) {
  const names = h("textarea", { placeholder: "One name (or user id) per line", style: "min-height:160px" });
  const results = h("div", { class: "mt" });
  const go = h("button", { class: `btn ${kind === "ban" ? "btn-danger" : "btn-primary"}`, type: "submit" });
  const fields = h("div", {});
  let collect = () => ({});
  if (kind === "ban") {
    go.textContent = "Ban All";
    const type = h("select", {}, [["ban", "Ban"], ["tradeban", "Trade ban"], ["mute", "Mute"]].map(([v, l]) => h("option", { value: v }, l)));
    const dur = h("select", {}, [["1d", "1 day"], ["7d", "7 days"], ["30d", "30 days"], ["perm", "Permanent"]].map(([v, l]) => h("option", { value: v, selected: v === "perm" }, l)));
    const reason = h("input", { type: "text", placeholder: "Reason", style: "min-width:260px" });
    fields.append(h("div", { class: "form-row" }, h("div", {}, h("label", {}, "Type"), type), h("div", {}, h("label", {}, "Duration"), dur), h("div", { class: "grow" }, h("label", {}, "Reason"), reason)));
    collect = () => ({ path: type.value, duration: dur.value, reason: reason.value });
  } else if (kind === "give") {
    go.textContent = "Give to All";
    const credits = h("input", { type: "number", value: "0", style: "width:140px" });
    const reason = h("input", { type: "text", placeholder: "Reason", style: "min-width:240px" });
    const picker = itemPicker();
    fields.append(h("div", { class: "form-row" }, h("div", {}, h("label", {}, "Credits (0 for none)"), credits), h("div", { class: "grow" }, h("label", {}, "Reason"), reason)),
      h("label", {}, "Item (optional)"), picker.el);
    collect = () => {
      const item = picker.selected();
      return { credits: Number(credits.value), item, reason: reason.value };
    };
  } else {
    go.textContent = "Send to All";
    const mode = h("select", {}, h("option", { value: "message" }, "Staff mail (inbox, works offline)"), h("option", { value: "alert" }, "Alert (online players only)"));
    const text = h("textarea", { placeholder: "Message text" });
    fields.append(h("div", { class: "form-row" }, h("div", {}, h("label", {}, "Send as"), mode)), text);
    collect = () => ({ path: mode.value, text: text.value });
  }
  const form = h("form", { onsubmit: async (e) => {
    e.preventDefault();
    const list = names.value.split(/\n|,/).map((n) => n.trim()).filter(Boolean);
    if (!list.length) return toast("Enter at least one name.", true);
    const v = collect();
    const calls = [];
    if (kind === "give") {
      if (v.credits) calls.push(["credits", { mode: "add", amount: v.credits, reason: v.reason }]);
      if (v.item) calls.push(["give", { code: v.item.code, category: v.item.category, count: 1, reason: v.reason }]);
      if (!calls.length) return toast("Choose credits or an item.", true);
    } else calls.push([v.path, v]);
    if (!(await modal(`${go.textContent}?`, { text: `${list.length} account${list.length === 1 ? "" : "s"}.`, confirm: go.textContent, danger: kind === "ban" }))) return;
    results.replaceChildren();
    for (const [path, body] of calls) {
      const r = await act(`bulk/${path}`, { names: list, ...body }, go);
      if (!r) continue;
      results.append(h("div", { class: "panel" }, h("div", { class: "panel-heading" }, `Results (${path})`),
        h("div", { class: "panel-body" }, r.results.map((line) => h("div", {}, line)),
          r.missing.length ? h("div", { class: "alert alert-warning mt" }, `Not found: ${r.missing.join(", ")}`) : null)));
    }
  } }, h("label", {}, "Players"), names, fields, h("div", { class: "flex mt" }, go));
  const titles = { ban: "Bulk Ban", give: "Bulk Give", message: "Bulk Message" };
  return h("div", {}, pageHeader(titles[kind]), form, results);
}

/* ---------------------------------------------------------- item browser */

async function pageItems() {
  const picker = itemPicker();
  return h("div", {}, pageHeader("Item Browser"), h("p", { class: "muted" }, "Look up any item by name or type code. Pictures are drawn from the game's own casts."), picker.el);
}

/* ---------------------------------------------------------------- staff */

async function pageStaff() {
  const r = await api("staff");
  return h("div", {},
    pageHeader("Staff List"),
    table(["Name", "Username", "Permissions", "Last online"],
      r.staff.map((s) => h("tr", {},
        h("td", {}, userLink(s.id, { [s.id]: s })),
        h("td", {}, s.username),
        h("td", {}, s.permissions.length === PERMISSIONS.length ? h("span", { class: "label label-primary" }, "Admin (all)") : s.permissions.join(", ")),
        h("td", { class: "nowrap" }, fmtTime(s.lastSeen)))),
      "No staff."),
    h("p", { class: "muted small" }, "Grant access from a profile (admins), or with node tools/set-admin.mjs <user>."));
}

async function pageAudit(params) {
  const before = params.get("before");
  const r = await api(`audit${before ? `?before=${before}` : ""}`);
  const last = r.entries[r.entries.length - 1];
  return h("div", {},
    pageHeader("Staff Log"),
    table(["When", "Staff", "Action", "Target", "Detail", "IP"],
      r.entries.map((e) => h("tr", {},
        h("td", { class: "nowrap" }, fmtTime(e.at, true)),
        h("td", { class: "nowrap" }, userLink(e.staffId, r.names)),
        h("td", {}, h("span", { class: "label label-default" }, e.action)),
        h("td", { class: "nowrap" }, e.targetId ? userLink(e.targetId, r.names) : ""),
        h("td", { style: "max-width:420px;overflow-wrap:anywhere" }, e.detail),
        h("td", {}, e.ip))),
      "Nothing logged yet."),
    h("div", { class: "pager" }, h("span"), r.entries.length === 100 && last ? h("a", { class: "btn btn-success", href: `#/audit?before=${last.id}` }, "Older") : h("span")));
}

/* ================================================================== boot */

async function boot() {
  try {
    state.sounds = localStorage.getItem("hk-sounds") === "1";
  } catch {}
  document.getElementById("menu-toggle").addEventListener("click", (e) => {
    e.stopPropagation();
    document.body.classList.toggle("menu-open");
  });
  document.getElementById("top-search").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = e.target.q.value.trim();
    if (q) go(`#/users?q=${encodeURIComponent(q)}`);
    e.target.q.value = "";
  });
  try {
    state.me = (await api("me")).me;
  } catch (err) {
    main.replaceChildren(h("div", { class: "alert alert-danger mt" }, err.message));
    return;
  }
  buildSidebar();
  window.addEventListener("hashchange", route);
  await route();
  pollCalls();
  setInterval(pollCalls, 20000);
}

boot();
