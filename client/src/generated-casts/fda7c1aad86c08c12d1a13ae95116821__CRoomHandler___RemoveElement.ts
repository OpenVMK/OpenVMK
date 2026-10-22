// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _RemoveElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RemoveElement(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  if ((lingoTruthy(callMethod("_RemoveIndexed", callMethod("_AccessRoom", callMethod("getComponent", _this)), t_iRef, "element")) ? 0 : 1)) {
  if ((lingoTruthy(callMethod("_RemoveIndexed", callMethod("_AccessRoom", callMethod("getComponent", _this)), t_iRef, "poster")) ? 0 : 1)) {
  var t_rCollectable = callMethod("_AccessIndexed", callMethod("_AccessRoom", callMethod("getComponent", _this)), t_iRef, "collectable");
  if (callNamed("voidp", t_rCollectable)) {
  callNamed("error", _this, lingoBinary("joinPad", "Item not found:", t_iRef), symbol("_RemoveElement"))
  } else {
  var tItemState = callMethod("GetParam", callMethod("getObject", t_rCollectable), "STATE");
  if (lingoBinary("eq", callNamed("value", tItemState), 0)) {
  callMethod("DisAppear", callMethod("GetVisual", t_rCollectable))
  setMeProp(_me, "m_iIDMaker", lingoBinary("add", meProp(_me, "m_iIDMaker"), 1));
  callNamed("createTimeout", lingoBinary("join", "SkeletorDeletor", meProp(_me, "m_iIDMaker")), 250, symbol("__RemoveCollectable"), callMethod("getID", _this), t_iRef, 1)
  callMethod("PlaySound", callMethod("GetFactor", t_rCollectable), symbol("DisAppear"))
  } else {
  if (lingoBinary("neq", callNamed("value", tItemState), 0)) {
  callMethod("_RemoveIndexed", callMethod("_AccessRoom", callMethod("getComponent", _this)), t_iRef, "collectable")
  }

  }

  }

  }

  }

}

