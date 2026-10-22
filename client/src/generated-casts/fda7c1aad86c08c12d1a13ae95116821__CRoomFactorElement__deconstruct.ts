// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorElement / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bteleport")) {
  callNamed("removeObject", meProp(_me, "m_sDelegate"))
  setMeProp(_me, "m_sDelegate", undefined);
  }

  var t_rObj = callMethod("getObject", _this);
  if (lingoBinary("eq", callMethod("GetCount", t_rObj), 0)) {
  callMethod("RemFromStack", _this)
  }

  for (var t_sKey of meProp(_me, "m_ar_sKey").toArray()) {
  var t_rBlock = callMethod("GetChild", t_rObj, t_sKey);
  if (callNamed("objectp", t_rBlock)) {
  callMethod("Remove", t_rObj, callMethod("GetKey", t_rBlock))
  continue;
  }

  var t_rContext = callMethod("GetContext", t_rObj);
  t_rBlock = callMethod("GetObjByKey", callMethod("GetContext", t_rObj), t_sKey);
  if (callNamed("objectp", t_rBlock)) {
  callMethod("Remove", callMethod("GetOwner", t_rBlock), t_sKey)
  continue;
  }

  }

  setMeProp(_me, "m_rTile", undefined);
  setMeProp(_me, "m_iStack", 0);
  setMeProp(_me, "m_ar_sKey", new LingoList([]));
  return 1;
}

