// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / updatePartPreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updatePartPreview(_me: LingoMe, _this: LingoValue, tPart: LingoValue, a_mp_ChangingPartList: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var tElemID = lingoBinary("join", lingoBinary("join", "part.", tPart), ".preview");
  var tElem = callMethod("getElement", meProp(_me, "m_rWindow"), tElemID);
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_BodyPartObjects"))) ? 0 : 1), lingoBinary("neq", tElem, 0))) {
  var tTempPartImg = callNamed("image", 200, 200, 32);
  var t_mp_ChangingParts = new LingoList([]);
  for (var i = 1; i <= a_mp_ChangingPartList.count; ++i) {
  callMethod("add", t_mp_ChangingParts, callMethod("getPropAt", a_mp_ChangingPartList, i))
  callMethod("setPartModel", _this, callMethod("getPropAt", a_mp_ChangingPartList, i), a_mp_ChangingPartList[i])
  }

  callMethod("getPartImg", _this, t_mp_ChangingParts, tTempPartImg)
  tTempPartImg = callMethod("trimWhiteSpace", tTempPartImg);
  callMethod("feedImage", tElem, tTempPartImg)
  }

  }

}

