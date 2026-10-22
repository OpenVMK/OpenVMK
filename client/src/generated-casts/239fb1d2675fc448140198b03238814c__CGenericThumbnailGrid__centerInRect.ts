// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / centerInRect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function centerInRect(_me: LingoMe, _this: LingoValue, a_rcSrc: LingoValue, a_rcTarget: LingoValue) {
  var t_iXdiff = lingoBinary("div", lingoBinary("sub", a_rcTarget.width, a_rcSrc.width), 2);
  var t_iYdiff = lingoBinary("div", lingoBinary("sub", a_rcTarget.height, a_rcSrc.height), 2);
  if (lingoBinary("and", lingoBinary("gte", t_iXdiff, 0), lingoBinary("gt", t_iYdiff, 0))) {
  return lingoBinary("add", a_rcTarget, new LingoList([t_iXdiff, t_iYdiff, t_iXdiff, t_iYdiff]));
  } else {
  return a_rcTarget;
  }

}

