// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / HandleGiftButton

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleGiftButton(_me: LingoMe, _this: LingoValue) {
  var t_rItem = callMethod("GetSelected", _this);
  var t_iCode = t_rItem.code;
  if (lingoBinary("eq", meProp(_me, "m_sSelectedTab"), "furnishings")) {
  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_ar_GiftItems"), t_iCode), 0)) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "vmk.viewgift.button"), symbol("visible"), 1)
  }

  }

}

