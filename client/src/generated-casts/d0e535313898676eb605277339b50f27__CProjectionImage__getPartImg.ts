// d0e535313898676eb605277339b50f27.cct / CProjectionImage / getPartImg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getPartImg(_me: LingoMe, _this: LingoValue, tPartList: LingoValue, t_Img: LingoValue) {
  if (lingoBinary("neq", callNamed("ilk", tPartList), symbol("list"))) {
  tPartList = new LingoList([tPartList]);
  }

  for (var tPart of tPartList.toArray()) {
  callNamed("call", symbol("copyPicture"), new LingoList([meProp(_me, "m_ar_BodyPartObjects")[tPart]]), t_Img, 4, "std")
  }

}

