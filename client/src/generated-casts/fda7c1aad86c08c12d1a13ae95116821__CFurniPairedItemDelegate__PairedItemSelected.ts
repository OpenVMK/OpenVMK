// fda7c1aad86c08c12d1a13ae95116821.cct / CFurniPairedItemDelegate / PairedItemSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PairedItemSelected(_me: LingoMe, _this: LingoValue, a_iOtherID: LingoValue) {
  if (meProp(_me, "m_rClientItem").valid) {
  var t_ar_vParams = callMethod("GetParam", callMethod("getObject", meProp(_me, "m_rClientItem")), "PARAMS");
  if (callNamed("ilk", t_ar_vParams, symbol("list"))) {
  if (lingoBinary("eq", a_iOtherID, t_ar_vParams[3])) {
  callMethod("SetCustomHighlighters", callMethod("GetVisual", callMethod("getObject", meProp(_me, "m_rClientItem"))), 1, symbol("teleportpair"))
  setMeProp(_me, "m_bSelected", 1);
  }

  }

  } else {
  callNamed("removeObject", callMethod("getID", _this))
  }

}

