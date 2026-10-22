// registration.cct / CRegPage1 / updatePartPreview

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updatePartPreview(_me: LingoMe, _this: LingoValue, tPart: LingoValue, a_mp_ChangingPartList: LingoValue) {
  var tElemID = lingoBinary("join", lingoBinary("join", "part.", tPart), ".preview");
  var tWndObj = meProp(_me, "m_rWindow");
  var tElem = callMethod("getElement", tWndObj, tElemID);
  if (lingoBinary("and", !lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_BodyPartObjects"))), lingoBinary("neq", tElem, 0))) {
  var tTempPartImg = callNamed("image", 200, 200, 32);
  var t_ImgAlpha = callNamed("image", 200, 200, 8, symbol("grayscale"));
  var t_mp_ChangingParts = new LingoList([]);
  for (var i = 1; i <= a_mp_ChangingPartList.count; ++i) {
  callMethod("add", t_mp_ChangingParts, callMethod("getPropAt", a_mp_ChangingPartList, i))
  callMethod("setPartModel", _this, callMethod("getPropAt", a_mp_ChangingPartList, i), a_mp_ChangingPartList[i])
  }

  callMethod("getPartImg", _this, t_mp_ChangingParts, tTempPartImg)
  callMethod("getPartAlpha", _this, t_mp_ChangingParts, t_ImgAlpha)
  callMethod("setAlpha", tTempPartImg, t_ImgAlpha)
  tTempPartImg = callMethod("trimWhiteSpace", tTempPartImg);
  callMethod("feedImage", tElem, tTempPartImg)
  }

}

