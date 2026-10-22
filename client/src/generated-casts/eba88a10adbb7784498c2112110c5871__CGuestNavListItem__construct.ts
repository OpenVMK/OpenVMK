// eba88a10adbb7784498c2112110c5871.cct / CGuestNavListItem / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_Img", undefined);
  setMeProp(_me, "m_sWriterID", lingoBinary("join", "GuestNav", callNamed("getUniqueID")));
  setMeProp(_me, "m_iMargin", 0);
  setMeProp(_me, "m_bState", 0);
  setMeProp(_me, "m_bSpecial", 0);
  setMeProp(_me, "m_iType", 2);
  setMeProp(_me, "m_sLand", undefined);
  callMethod("ResolveImage", _me)
  var tPlain = callNamed("getStructVariable", "struct.font.plain");
  var tBold = callNamed("getStructVariable", "struct.font.bold");
  var tLink = callNamed("getStructVariable", "struct.font.link");
  var tMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", tPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", tPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 250, 250, 250), symbol("bgColor"), callNamed("rgb", "#001F55"), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", meProp(_me, "m_sWriterID"), tMetrics)
}

