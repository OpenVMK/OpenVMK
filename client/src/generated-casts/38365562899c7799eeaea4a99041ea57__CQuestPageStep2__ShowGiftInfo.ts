// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / ShowGiftInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowGiftInfo(_me: LingoMe, _this: LingoValue) {
  var t_rItem = callMethod("GetSelected", _this);
  var t_iCode = -float(1);
  if (callNamed("listp", t_rItem)) {
  var t_iCode1 = t_rItem.code;
  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_ar_GiftItems"), t_iCode1), 0)) {
  t_iCode = t_iCode1;
  } else {
  t_rItem = callMethod("GetSelected", _this);
  var t_iCode2 = t_rItem.code;
  if (lingoBinary("gt", callMethod("findPos", meProp(_me, "m_ar_GiftItems"), t_iCode2), 0)) {
  t_iCode = t_iCode2;
  }

  }

  if (lingoBinary("gt", t_iCode, -float(1))) {
  var t_Obj = callNamed("createObject", symbol("temp"), "CRoomItemGift");
  if (callNamed("objectp", t_Obj)) {
  callMethod("OpenFromInventory", t_Obj, t_rItem.ref)
  }

  }

  }

}

