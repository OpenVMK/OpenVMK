// vmk_hm_minigame.cct / CCollisionEngine / visualize2Dmap

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function visualize2Dmap(_me: LingoMe) {
  var cst = callNamed("castLib", 1);
  var tmbr = callNamed("new", symbol("bitmap"), cst);
  setThePropOf(tmbr, "regPoint", callNamed("point", 0, 0));
  setThePropOf(tmbr, "name", "tiles");
  var t_iTileSize = 16;
  var t_rImg = callNamed("image", 1000, 1000, 32);
  callMethod("fill", t_rImg, t_rImg.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", 220, 220, 250)]))
  setThePropOf(t_rImg, "useAlpha", 1);
  var t_rTileImg = callNamed("image", t_iTileSize, t_iTileSize, 32);
  callMethod("fill", t_rTileImg, t_rTileImg.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", 255, 0, 0)]))
  var t_pOffset = callNamed("point", 300, 300);
  for (var t_vPos of meProp(_me, "m_ar_tiles2D").toArray()) {
  var p1 = lingoBinary("add", callNamed("point", t_vPos.x, t_vPos.y), t_pOffset);
  var p2 = lingoBinary("add", lingoBinary("add", p1, callNamed("point", t_iTileSize, t_iTileSize)), t_pOffset);
  var r1 = lingoBinary("add", callNamed("rect", p1, p1), t_rTileImg.rect);
  callMethod("copyPixels", t_rImg, t_rTileImg, r1, t_rTileImg.rect, new LingoPropList([symbol("blendLevel"), 32]))
  }

  for (var t_vPos of meProp(_me, "m_ar_tiles2D").toArray()) {
  var x1 = lingoBinary("add", callNamed("point", t_vPos.x, t_vPos.y), t_pOffset);
  var x2 = lingoBinary("add", x1, callNamed("point", 1, 1));
  callMethod("fill", t_rImg, x1, x2, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("color"), callNamed("rgb", 0, 0, 0)]))
  }

  for (var t_linkDir of meProp(_me, "m_ar_links").toArray()) {
  for (var t_ar_Link of t_linkDir.toArray()) {
  x1 = lingoBinary("add", callNamed("point", t_ar_Link[1].x, t_ar_Link[1].y), t_pOffset);
  x2 = lingoBinary("add", callNamed("point", t_ar_Link[2].x, t_ar_Link[2].y), t_pOffset);
  callMethod("draw", t_rImg, x1, x2, new LingoPropList([symbol("shapeType"), symbol("line"), symbol("lineSize"), 1, symbol("color"), callNamed("rgb", 0, 0, 0)]))
  }

  }

  setThePropOf(tmbr, "image", t_rImg);
  setThePropOf(tmbr, "regPoint", callNamed("point", 0, 0));
}

