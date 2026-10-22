// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorPoster / _Rotate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Rotate(_me: LingoMe, _this: LingoValue, a_iDir: LingoValue) {
  var t_rObj = callMethod("getObject", _this);
  callMethod("SetParam", t_rObj, "DIR", callNamed("string", a_iDir))
  var t_rStruct = callMethod("GetParam", t_rObj, "STRUCT");
  for (var t_rDir of t_rStruct.child.toArray()) {
  if (lingoBinary("eq", callNamed("integer", t_rDir.param["NUM"]), a_iDir)) {
  var t_rBlocks = t_rDir.child;
  break;
  }

  }

  var t_rBlock = t_rBlocks[1];
  callMethod("SetParam", t_rObj, "XD", t_rBlock.param["XD"])
  callMethod("SetParam", t_rObj, "YD", t_rBlock.param["YD"])
  callMethod("SetParam", t_rObj, "ZD", t_rBlock.param["ZD"])
  callMethod("SetParam", t_rObj, "SPRITES", t_rBlock.child)
  callMethod("SetSprites", callMethod("GetVisual", t_rObj))
}

