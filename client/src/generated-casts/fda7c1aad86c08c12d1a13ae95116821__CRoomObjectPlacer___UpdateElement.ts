// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomObjectPlacer / _UpdateElement

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _UpdateElement(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bRunning")) {
  if (lingoBinary("neq", theProperty("mouseLoc"), meProp(_me, "m_ptLastScrPos"))) {
  setMeProp(_me, "m_bValid", 0);
  setMeProp(_me, "m_ptLastScrPos", theProperty("mouseLoc"));
  var t_iX = meProp(_me, "m_ptLastScrPos").locH;
  var t_iY = meProp(_me, "m_ptLastScrPos").locV;
  if (callMethod("FirstToken", meProp(_me, "m_rIterator"))) {
  while (1) {
  var t_rFloor = callMethod("getToken", meProp(_me, "m_rIterator"));
  if (callNamed("voidp", t_rFloor)) {
  break;
  }

  var t_rTile = callMethod("GetTileByScrLoc", callMethod("GetVisual", t_rFloor), t_iX, t_iY);
  if (callNamed("objectp", t_rTile)) {
  var t_veLoc = callMethod("GetScrPos", t_rTile);
  setMeProp(_me, "m_bValid", 1);
  var t_iStack = 0;
  if (lingoBinary("neq", meProp(_me, "m_veLastScrPos"), t_veLoc)) {
  callMethod("RemFromStack", callMethod("GetFactor", meProp(_me, "m_rMovable")))
  var t_rCopy = t_rTile;
  while (1) {
  if (lingoBinary("gt", callMethod("GetCount", t_rCopy), 0)) {
  t_rCopy = t_rCopy[1];
  t_iStack = lingoBinary("add", t_iStack, 1);
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
  if (callMethod("SetToTileStack", callMethod("GetFactor", meProp(_me, "m_rMovable")), t_rTile, t_iStack)) {
  setMeProp(_me, "m_veLastScrPos", t_veLoc);
  setMeProp(_me, "m_sLastOwner", callMethod("GetKey", t_rTile));
  }

  }

  }

  break;
  }

  if ((lingoTruthy(callMethod("NextToken", meProp(_me, "m_rIterator"))) ? 0 : 1)) {
  break;
  }

  }

  }

  }

  } else {
  callNamed("removeUpdate", callMethod("getID", _this))
  }

}

