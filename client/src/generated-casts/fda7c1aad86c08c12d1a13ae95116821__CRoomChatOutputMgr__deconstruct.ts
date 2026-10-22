// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomChatOutputMgr / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe, _this: LingoValue) {
  for (var i = 1; i <= meProp(_me, "m_iNumBubbles"); ++i) {
  var t_sWnd = lingoBinary("joinPad", "RoomBubbleWnd", i);
  if (callNamed("windowExists", t_sWnd)) {
  callNamed("removeWindow", t_sWnd)
  }

  }

  setMeProp(_me, "m_ar_rBubbles", new LingoList([]));
  setMeProp(_me, "m_ar_rChatQueue", new LingoList([]));
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rWriterSay"))) ? 0 : 1)) {
  callNamed("removeWriter", callMethod("getID", meProp(_me, "m_rWriterSay")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rWriterShout"))) ? 0 : 1)) {
  callNamed("removeWriter", callMethod("getID", meProp(_me, "m_rWriterShout")))
  }

  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rWriterWhisper"))) ? 0 : 1)) {
  callNamed("removeWriter", callMethod("getID", meProp(_me, "m_rWriterWhisper")))
  }

  setMeProp(_me, "m_rWriterSay", undefined);
  setMeProp(_me, "m_rWriterShout", undefined);
  setMeProp(_me, "m_rWriterWhisper", undefined);
  callNamed("unregisterMessage", symbol("chat"), callMethod("getID", _this))
  callNamed("unregisterMessage", "room_leave", callMethod("getID", _this))
  callNamed("unregisterMessage", "room_ready", callMethod("getID", _this))
  callNamed("removeUpdate", callMethod("getID", _this))
  return 1;
}

