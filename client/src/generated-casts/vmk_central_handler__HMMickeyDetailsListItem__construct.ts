// vmk_central_handler.cct / HMMickeyDetailsListItem / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bNeedUpdate", 1);
  setMeProp(_me, "m_Img", undefined);
  setMeProp(_me, "m_sWriterID", lingoBinary("join", "HMDetailsListWriter", callNamed("getUniqueID")));
  setMeProp(_me, "m_iMargin", 0);
  setMeProp(_me, "m_bState", 0);
  setMeProp(_me, "m_bSpecial", 0);
  setMeProp(_me, "m_iType", 2);
  setMeProp(_me, "m_sLand", undefined);
  setMeProp(_me, "m_iWidth", 0);
  setMeProp(_me, "m_iHeight", 0);
  callMethod("ResolveImage", _me)
  var tPlain = callNamed("getStructVariable", "struct.font.plain");
  var tMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", tPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", tPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", "#EEEEEE"), symbol("bgColor"), callNamed("rgb", "#FFFFFF"), symbol("fixedLineSpace"), 12]);
  callNamed("createWriter", meProp(_me, "m_sWriterID"), tMetrics)
}

