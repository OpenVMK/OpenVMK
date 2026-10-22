// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObjectPlacer / _UpdatePoster

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _UpdatePoster(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bRunning")) {
  if (lingoBinary("neq", theProperty("mouseLoc"), meProp(_me, "m_ptLastScrPos"))) {
  setMeProp(_me, "m_bValid", 0);
  setMeProp(_me, "m_ptLastScrPos", theProperty("mouseLoc"));
  if (callMethod("FirstToken", meProp(_me, "m_rIterator"))) {
  while (1) {
  var t_rWall = callMethod("getToken", meProp(_me, "m_rIterator"));
  if (callNamed("voidp", t_rWall)) {
  break;
  }

  if (callMethod("PointInside", callMethod("GetVisual", t_rWall), meProp(_me, "m_ptLastScrPos"))) {
  callMethod("FloatAbove", callMethod("GetFactor", meProp(_me, "m_rMovable")), t_rWall, meProp(_me, "m_ptLastScrPos"))
  setMeProp(_me, "m_bValid", callMethod("PlaneInside", callMethod("GetVisual", t_rWall), meProp(_me, "m_rMovable")));
  if (meProp(_me, "m_bValid")) {
  setMeProp(_me, "m_sLastOwner", callMethod("GetKey", t_rWall));
  }

  break;
  }

  if ((lingoTruthy(callMethod("NextToken", meProp(_me, "m_rIterator"))) ? 0 : 1)) {
  break;
  }

  }

  if ((lingoTruthy(meProp(_me, "m_bValid")) ? 0 : 1)) {
  if (callNamed("objectp", t_rWall)) {
  callMethod("FloatAround", callMethod("GetFactor", meProp(_me, "m_rMovable")), meProp(_me, "m_ptLastScrPos"))
  }

  }

  }

  }

  } else {
  callNamed("removeUpdate", callMethod("getID", _this))
  }

}

