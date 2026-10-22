// item_2355.cct / CCheckersLobbyInterface / _ShowAvatarFigure

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ShowAvatarFigure(_me: LingoMe, _this: LingoValue, a_sAvatar: LingoValue, a_iAvatar: LingoValue, a_rElement: LingoValue) {
  var t_iQueue = meProp(_me, "m_ar_rAvatarQueue").count;
  var t_iIndex = 0;
  if (lingoBinary("gt", t_iQueue, 0)) {
  for (var i = t_iQueue; i >= 1; --i) {
  if (lingoBinary("eq", meProp(_me, "m_ar_rAvatarQueue")[i].element, a_rElement)) {
  if (lingoBinary("eq", meProp(_me, "m_ar_rAvatarQueue")[i].name, a_sAvatar)) {
  t_iIndex = i;
  break;
  continue;
  }

  callMethod("deleteAt", meProp(_me, "m_ar_rAvatarQueue"), i)
  }

  }

  }

  if (lingoBinary("eq", t_iIndex, 0)) {
  callMethod("add", meProp(_me, "m_ar_rAvatarQueue"), new LingoPropList([symbol("name"), a_sAvatar, symbol("number"), a_iAvatar, symbol("element"), a_rElement, symbol("view"), meProp(_me, "m_kCurView")]))
  }

  callMethod("send", callNamed("getConnection", "VMK"), "GetPlayerDetails", new LingoPropList([symbol("integer"), meProp(_me, "m_iGameCode"), symbol("integer"), a_iAvatar]))
}

