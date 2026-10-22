// 239fb1d2675fc448140198b03238814c.cct / CCustomBgThumbnailGrid / DefineGraphics

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DefineGraphics(_me: LingoMe, _this: LingoValue, a_sSlotBg: LingoValue, a_ar_borders: LingoValue) {
  if (callNamed("voidp", a_ar_borders)) {
  var t_ar_borders = new LingoPropList([symbol("border"), lingoBinary("join", a_sSlotBg, ".border"), symbol("hiliter"), lingoBinary("join", a_sSlotBg, ".hiliter"), symbol("secondary"), lingoBinary("join", a_sSlotBg, ".secondary")]);
  } else {
  t_ar_borders = a_ar_borders;
  }

  meProp(_me, "m_ar_graphics")[symbol("bg")] = callNamed("getMember", a_sSlotBg).image;
  for (var i = 1; i <= callNamed("count", t_ar_borders); ++i) {
  var t_kBorder = callMethod("getPropAt", t_ar_borders, i);
  var t_sMem = t_ar_borders[i];
  var t_iMemNum = callNamed("getmemnum", t_sMem);
  if (lingoBinary("gt", t_iMemNum, 0)) {
  meProp(_me, "m_ar_graphics")[t_kBorder] = callNamed("member", t_iMemNum).image;
  continue;
  }

  callNamed("put", lingoBinary("joinPad", "Could not find border", t_sMem))
  }

}

