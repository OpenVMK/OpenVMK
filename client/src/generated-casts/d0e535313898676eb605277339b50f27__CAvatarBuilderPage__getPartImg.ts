// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / getPartImg

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

  if (lingoBinary("eq", meProp(_me, "m_sMiniGameName"), "vmks")) {
  var t_iDir = 4;
  } else {
  t_iDir = 3;
  }

  for (var tPart of tPartList.toArray()) {
  callNamed("call", symbol("copyPicture"), new LingoList([meProp(_me, "m_ar_BodyPartObjects")[tPart]]), t_Img, t_iDir, "std")
  }

}

