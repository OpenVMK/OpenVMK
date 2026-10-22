// 2230483a2e5366aa24e52c1b02d9674c.cct / CGuestNavListItem / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setThePropOf(_me, "m_Img", undefined);
  setThePropOf(_me, "m_sWriterID", lingoBinary("join", "GuestNav", callNamed("getUniqueID")));
  setThePropOf(_me, "m_iMargin", 0);
  setThePropOf(_me, "m_bState", 0);
  setThePropOf(_me, "m_bSpecial", 0);
  setThePropOf(_me, "m_iType", 2);
  setThePropOf(_me, "m_sLand", undefined);
  callNamed("ResolveImage", _me)
  var tPlain = callNamed("getStructVariable", "struct.font.plain");
  var tBold = callNamed("getStructVariable", "struct.font.bold");
  var tLink = callNamed("getStructVariable", "struct.font.link");
  var tMetrics = callNamed("propList", symbol("font"), callMethod("getaProp", tPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", tPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 250, 250, 250), symbol("bgColor"), callNamed("rgb", "#001F55"), symbol("fixedLineSpace"), 15);
  callNamed("createWriter", _me.m_sWriterID, tMetrics)
}

