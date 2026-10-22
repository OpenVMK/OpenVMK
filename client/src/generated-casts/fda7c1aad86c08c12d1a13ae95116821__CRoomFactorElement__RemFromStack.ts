// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorElement / RemFromStack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemFromStack(_me: LingoMe, _this: LingoValue) {
  var t_rContext = callMethod("GetContext", callMethod("getObject", _this));
  for (var t_sKey of meProp(_me, "m_ar_sKey").toArray()) {
  var t_rBlock = callMethod("GetObjByKey", t_rContext, t_sKey);
  if (callNamed("objectp", t_rBlock)) {
  if (lingoBinary("gt", callMethod("GetCount", t_rBlock), 0)) {
  var t_rAbove = t_rBlock[1];
  var t_rBelow = callMethod("GetOwner", t_rBlock);
  callMethod("RemChild", t_rBlock, callMethod("GetKey", t_rAbove))
  callMethod("SetOwner", t_rAbove, t_rBelow)
  callMethod("SetChild", t_rBelow, callMethod("GetKey", t_rAbove), t_rAbove)
  }

  callMethod("RemChild", callMethod("GetOwner", t_rBlock), callMethod("GetKey", t_rBlock))
  callMethod("SetChild", callMethod("getObject", _this), callMethod("GetKey", t_rBlock), t_rBlock)
  callMethod("SetOwner", t_rBlock, callMethod("getObject", _this))
  }

  }

}

