// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomChatOutputMgr / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvt: LingoValue, a_sElm: LingoValue, a_vPrm: LingoValue, a_sWnd: LingoValue) {
  var t_sName = callMethod("getaProp", meProp(_me, "m_mp_sWnd_sName"), a_sWnd);
  var t_rIterator = callMethod("GetIterator", callMethod("_AccessRoom", callNamed("getThread", symbol("room")).component), "avatar");
  while (1) {
  var t_rAvatar = callMethod("getToken", t_rIterator);
  if (callNamed("voidp", t_rAvatar)) {
  break;
  }

  if (lingoBinary("eq", callMethod("GetParam", t_rAvatar, "NAME"), t_sName)) {
  break;
  }

  if ((lingoTruthy(callMethod("NextToken", t_rIterator)) ? 0 : 1)) {
  break;
  }

  }

  callMethod("clear", t_rIterator)
  t_rIterator = undefined;
}

