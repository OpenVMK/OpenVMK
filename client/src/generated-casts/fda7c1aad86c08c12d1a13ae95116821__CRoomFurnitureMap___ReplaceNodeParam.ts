// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurnitureMap / _ReplaceNodeParam

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ReplaceNodeParam(_me: LingoMe, _this: LingoValue, a_sVar: LingoValue, a_sVal: LingoValue, a_rNode: LingoValue) {
  for (var i = 1; i <= a_rNode.param.count; ++i) {
  if (lingoBinary("eq", a_rNode.param[i], a_sVar)) {
  callMethod("setaProp", a_rNode.param, callMethod("getPropAt", a_rNode.param, i), a_sVal)
  }

  }

  for (var t_rChild of a_rNode.child.toArray()) {
  callMethod("_ReplaceNodeParam", _this, a_sVar, a_sVal, t_rChild)
  }

}

