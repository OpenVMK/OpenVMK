// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorPointer / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("neq", theProperty("mouseLoc"), meProp(_me, "m_ptLastScrPos"))) {
  var t_bValid = 0;
  setMeProp(_me, "m_sLastTile", "");
  setMeProp(_me, "m_ptLastScrPos", theProperty("mouseLoc"));
  var t_iX = meProp(_me, "m_ptLastScrPos").locH;
  var t_iY = meProp(_me, "m_ptLastScrPos").locV;
  var t_rContext = callMethod("GetContext", callMethod("getObject", _this));
  if (callNamed("voidp", meProp(_me, "m_rIterator"))) {
  setMeProp(_me, "m_rIterator", callMethod("GetIterator", t_rContext, "floor"));
  }

  if (callMethod("FirstToken", meProp(_me, "m_rIterator"))) {
  while (1) {
  var t_rFloor = callMethod("getToken", meProp(_me, "m_rIterator"));
  if (callNamed("voidp", t_rFloor)) {
  setMeProp(_me, "m_sLastTile", "");
  break;
  }

  var t_rTile = callMethod("GetTileByScrLoc", callMethod("GetVisual", t_rFloor), t_iX, t_iY);
  if (callNamed("objectp", t_rTile)) {
  t_bValid = 1;
  var t_veLoc = callMethod("GetScrPos", t_rTile);
  setMeProp(_me, "m_sLastTile", callMethod("GetKey", t_rTile));
  if (lingoBinary("neq", meProp(_me, "m_veLastScrPos"), t_veLoc)) {
  setMeProp(_me, "m_veLastScrPos", t_veLoc);
  callMethod("SetAbsPos", callMethod("getObject", _this), t_veLoc)
  callMethod("SetParam", callMethod("getObject", _this), "POINTED", callMethod("GetParam", t_rTile, "CLASS"))
  }

  var t_rIterateBlock = t_rTile;
  while (lingoBinary("gt", callMethod("GetCount", t_rIterateBlock), 0)) {
  t_rIterateBlock = t_rIterateBlock[1];
  if (lingoBinary("eq", callMethod("GetParam", t_rIterateBlock, "ACT"), 1)) {
  callMethod("SetParam", callMethod("getObject", _this), "POINTED", "teleport")
  break;
  }

  if (lingoBinary("eq", callMethod("GetParam", t_rIterateBlock, "ACT"), 2)) {
  callMethod("SetParam", callMethod("getObject", _this), "POINTED", "hide")
  break;
  }

  if (lingoBinary("eq", callMethod("GetParam", t_rIterateBlock, "SIT"), 1)) {
  callMethod("SetParam", callMethod("getObject", _this), "POINTED", "sit")
  break;
  }

  }

  break;
  }

  if ((lingoTruthy(callMethod("NextToken", meProp(_me, "m_rIterator"))) ? 0 : 1)) {
  break;
  }

  }

  }

  if ((lingoTruthy(t_bValid) ? 0 : 1)) {
  callMethod("SetParam", callMethod("getObject", _this), "POINTED", "hide")
  }

  }

}

