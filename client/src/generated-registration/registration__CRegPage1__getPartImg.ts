// registration.cct / CRegPage1 / getPartImg

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getPartImg(_me: LingoMe, _this: LingoValue, tPartList: LingoValue, tImg: LingoValue) {
  if (lingoBinary("neq", callNamed("ilk", tPartList), symbol("list"))) {
  tPartList = new LingoList([tPartList]);
  }

  for (var tPart of tPartList.toArray()) {
  callNamed("call", symbol("copyPicture"), new LingoList([meProp(_me, "m_ar_BodyPartObjects")[tPart]]), tImg, 3, "std")
  }

}

