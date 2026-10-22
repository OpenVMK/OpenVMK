// vmk_pirates_game.cct / CFloatingTextFactory / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_iFloatSpeed", 3);
  setMeProp(_me, "m_iFloatFade", 4);
  setMeProp(_me, "m_ar_rSprFloats", new LingoList([]));
  setMeProp(_me, "m_rWriter", undefined);
  var tPlain = callNamed("getStructVariable", "struct.font.plain");
  var tMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", tPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", tPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 250, 250, 250), symbol("bgColor"), callNamed("rgb", 0, 51, 102), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", "PiratesFloatWriter", tMetrics)
  setMeProp(_me, "m_rWriter", callNamed("getWriter", "PiratesFloatWriter"));
  return 1;
}

