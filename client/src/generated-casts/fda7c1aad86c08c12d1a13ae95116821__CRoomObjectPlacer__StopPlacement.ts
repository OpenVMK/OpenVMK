// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObjectPlacer / StopPlacement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopPlacement(_me: LingoMe, _this: LingoValue, a_Abort: LingoValue) {
  var t_sClass = callMethod("GetParam", meProp(_me, "m_rMovable"), "CLASS");
  if (meProp(_me, "m_bValid")) {
  callNamed("removeObject", "RoomObjPlacerEventAgent")
  callNamed("removeUpdate", callMethod("getID", _this))
  var t_rOwner = callMethod("GetObjByKey", meProp(_me, "m_rContext"), meProp(_me, "m_sLastOwner"));
  if ((lingoTruthy(a_Abort) ? 0 : 1)) {
  if (callNamed("objectp", t_rOwner)) {
  var t_iOwner = callNamed("integer", callMethod("GetParam", t_rOwner, "REF"));
  t_sClass = callMethod("GetParam", meProp(_me, "m_rMovable"), "CLASS");
  switch (meProp(_me, "m_kMode")) {
case symbol("move"):
  callNamed("executeMessage", lingoBinary("join", lingoBinary("join", "move_", t_sClass), "_end"), t_iOwner, callMethod("GetRelPos", meProp(_me, "m_rMovable")))
  break;
case symbol("Place"):
  var t_vePos = callMethod("GetRelPos", meProp(_me, "m_rMovable"));
  callMethod("Remove", callMethod("GetContext", meProp(_me, "m_rContext")), callMethod("GetKey", meProp(_me, "m_rMovable")))
  callNamed("executeMessage", lingoBinary("join", lingoBinary("join", "place_", t_sClass), "_end"), t_iOwner, t_vePos)
  break;
  }

  } else {
  callNamed("executeMessage", lingoBinary("join", lingoBinary("join", "place_", callMethod("GetParam", meProp(_me, "m_rMovable"), "CLASS")), "_failed"))
  }

  } else {
  callMethod("RemFromStack", callMethod("GetFactor", meProp(_me, "m_rMovable")))
  var t_rCopy = meProp(_me, "m_rOriginalPlace");
  while (1) {
  if (lingoBinary("gt", callMethod("GetCount", t_rCopy), 0)) {
  t_rCopy = t_rCopy[1];
  var t_iStack = lingoBinary("add", t_iStack, 1);
  continue;
  }

  break;
  }

  if (lingoBinary("eq", callMethod("GetParam", t_rCopy, "CLASS"), "tile")) {
  var t_bStackable = 1;
  } else {
  t_bStackable = callNamed("integer", callMethod("GetParam", t_rCopy, "STK"));
  }

  if (t_bStackable) {
  callMethod("SetToTileStack", callMethod("GetFactor", meProp(_me, "m_rMovable")), meProp(_me, "m_rOriginalPlace"), t_iStack)
  }

  }

  setMeProp(_me, "m_bValid", undefined);
  setMeProp(_me, "m_rMovable", undefined);
  setMeProp(_me, "m_bRunning", 0);
  setMeProp(_me, "m_sLastOwner", "");
  setMeProp(_me, "m_ptLastScrPos", callNamed("point", 0, 0));
  } else {
  if (lingoBinary("eq", t_sClass, "poster")) {
  callNamed("removeObject", "RoomObjPlacerEventAgent")
  callNamed("removeUpdate", callMethod("getID", _this))
  switch (meProp(_me, "m_kMode")) {
case symbol("move"):
  callNamed("executeMessage", lingoBinary("join", lingoBinary("join", "move_", t_sClass), "_end"), meProp(_me, "m_rOriginalPlace").owner, meProp(_me, "m_rOriginalPlace").pos)
  break;
case symbol("Place"):
  callMethod("Remove", callMethod("GetContext", meProp(_me, "m_rContext")), callMethod("GetKey", meProp(_me, "m_rMovable")))
  callNamed("executeMessage", lingoBinary("join", lingoBinary("join", "place_", t_sClass), "_failed"))
  break;
  }

  setMeProp(_me, "m_bValid", undefined);
  setMeProp(_me, "m_rMovable", undefined);
  setMeProp(_me, "m_bRunning", 0);
  setMeProp(_me, "m_sLastOwner", "");
  setMeProp(_me, "m_ptLastScrPos", callNamed("point", 0, 0));
  }

  }

}

