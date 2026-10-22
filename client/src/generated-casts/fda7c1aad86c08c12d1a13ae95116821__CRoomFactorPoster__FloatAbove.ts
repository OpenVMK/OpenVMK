// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorPoster / FloatAbove

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FloatAbove(_me: LingoMe, _this: LingoValue, a_rWall: LingoValue, a_ptPos: LingoValue) {
  if (lingoBinary("neq", callMethod("GetParam", a_rWall, "CLASS"), "wall")) {
  return callNamed("error", _this, "Wall expected!!!", symbol("FloatAbove"));
  }

  var t_rObj = callMethod("getObject", _this);
  if (lingoBinary("neq", callMethod("GetOwner", t_rObj), a_rWall)) {
  callMethod("RemChild", callMethod("GetOwner", t_rObj), callMethod("GetKey", t_rObj))
  callMethod("SetChild", a_rWall, callMethod("GetKey", t_rObj), t_rObj)
  callMethod("SetOwner", t_rObj, a_rWall)
  }

  if (lingoBinary("gt", callNamed("integer", callMethod("GetParam", a_rWall, "XD")), callNamed("integer", callMethod("GetParam", a_rWall, "YD")))) {
  var t_iDir = 5;
  callMethod("SetParam", t_rObj, "DIR", "5")
  } else {
  t_iDir = 3;
  callMethod("SetParam", t_rObj, "DIR", "3")
  }

  var t_rStruct = callMethod("GetParam", t_rObj, "STRUCT");
  for (var t_rDir of t_rStruct.child.toArray()) {
  if (lingoBinary("eq", callNamed("string", t_rDir.param["NUM"]), t_iDir)) {
  var t_rBlocks = t_rDir.child;
  break;
  }

  }

  var t_rBlock = t_rBlocks[1];
  var t_iXD = callNamed("integer", t_rBlock.param["XD"]);
  var t_iYD = callNamed("integer", t_rBlock.param["YD"]);
  var t_iZD = callNamed("integer", t_rBlock.param["ZD"]);
  callMethod("SetParam", t_rObj, "XD", t_iXD)
  callMethod("SetParam", t_rObj, "YD", t_iYD)
  if (lingoBinary("eq", t_iDir, 5)) {
  var t_veOff = callNamed("vector", lingoBinary("div", t_iXD, 2), 0, lingoBinary("div", t_iZD, 2));
  } else {
  t_veOff = callNamed("vector", 0, lingoBinary("div", t_iYD, 2), lingoBinary("div", t_iZD, 2));
  }

  callMethod("SetRelPos", t_rObj, lingoBinary("sub", callMethod("ScrToRel", callMethod("GetVisual", a_rWall), a_ptPos), t_veOff))
  callMethod("SetParam", t_rObj, "SPRITES", t_rBlock.child)
  callMethod("SetSprites", callMethod("GetVisual", t_rObj))
  callMethod("SetBlend", callMethod("GetVisual", t_rObj), 100)
  if (theProperty("controlDown")) {
  var x = callMethod("GetAbsPos", t_rObj);
  var y = callMethod("GetRelPos", t_rObj);
  callNamed("put", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", callMethod("GetKey", a_rWall), "\r"), "abs:"), x), "\r"), "rel:"), y), "\r"), "off:"), callMethod("ScrToRel", callMethod("GetVisual", a_rWall), a_ptPos)))
  }

}

