// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObject / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  var t_sClass = lingoBinary("join", "room.class.factor.", callMethod("GetParam", _this, "CLASS"));
  if (callNamed("variableExists", t_sClass)) {
  var t_ar_sClass = callNamed("GetClsVariable", t_sClass);
  var t_sItemType = callMethod("GetParam", _this, "TYPE");
  var t_sObjectCode = lingoBinary("join", "CRoomObjectType", t_sItemType);
  if (callNamed("memberExists", lingoBinary("join", lingoBinary("join", "item.", t_sItemType), ".ani.xml"))) {
  callMethod("append", t_ar_sClass, "CRoomItemStateAnimator")
  }

  if (callNamed("variableExists", t_sObjectCode)) {
  var t_ar_sExtend = callNamed("GetClsVariable", t_sObjectCode);
  for (var t_sCls of t_ar_sExtend.toArray()) {
  callMethod("append", t_ar_sClass, t_sCls)
  }

  }

  setMeProp(_me, "m_rFactor", callNamed("createObject", symbol("temp"), t_ar_sClass));
  } else {
  setMeProp(_me, "m_rFactor", callNamed("createObject", symbol("temp"), callNamed("GetClsVariable", "room.class.factor")));
  }

  t_sClass = lingoBinary("join", "room.class.visual.", callMethod("GetParam", _this, "CLASS"));
  if (callNamed("variableExists", t_sClass)) {
  setMeProp(_me, "m_rVisual", callNamed("createObject", symbol("temp"), callNamed("GetClsVariable", t_sClass)));
  } else {
  setMeProp(_me, "m_rVisual", callNamed("createObject", symbol("temp"), callNamed("GetClsVariable", "room.class.visual")));
  }

  callMethod("SetObject", meProp(_me, "m_rFactor"), _this)
  callMethod("SetObject", meProp(_me, "m_rVisual"), _this)
  setMeProp(_me, "m_bRunning", 1);
  return 1;
}

