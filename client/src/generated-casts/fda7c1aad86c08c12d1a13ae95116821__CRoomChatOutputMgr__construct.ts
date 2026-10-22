// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomChatOutputMgr / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iNumBubbles", 6);
  setMeProp(_me, "m_ar_rBubbles", new LingoList([]));
  setMeProp(_me, "m_iNextFreeBbl", 1);
  setMeProp(_me, "m_kBubbleState", symbol("wait"));
  setMeProp(_me, "m_iBubbleScroll", 0);
  setMeProp(_me, "m_iScrollDelay", lingoBinary("mul", theProperty("frameTempo"), 6));
  setMeProp(_me, "m_iScrollTimer", 0);
  setMeProp(_me, "m_ar_rChatQueue", new LingoList([]));
  setMeProp(_me, "m_mp_sWnd_sName", new LingoPropList([]));
  if ((lingoTruthy(callNamed("memberExists", "speech_bubble.window")) ? 0 : 1)) {
  return callNamed("error", _this, lingoBinary("join", lingoBinary("join", lingoBinary("joinPad", "Missing resource:", "\""), "speech_bubble.window"), "\""), symbol("construct"));
  }

  for (var i = 1; i <= meProp(_me, "m_iNumBubbles"); ++i) {
  var t_sWnd = lingoBinary("joinPad", "RoomBubbleWnd", i);
  if (callNamed("createWindow", t_sWnd)) {
  var t_rWnd = callNamed("getWindow", t_sWnd);
  callMethod("registerClient", t_rWnd, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWnd, symbol("_EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  if (callMethod("merge", t_rWnd, "speech_bubble.window")) {
  callNamed("deactivateWindow", t_sWnd)
  callMethod("hide", t_rWnd)
  callMethod("append", meProp(_me, "m_ar_rBubbles"), t_rWnd)
  }

  }

  }

  setMeProp(_me, "m_iBubbleHeight", lingoBinary("add", callMethod("getProperty", meProp(_me, "m_ar_rBubbles")[1], symbol("height")), 1));
  if (lingoBinary("mod", meProp(_me, "m_iBubbleHeight"), 2)) {
  setMeProp(_me, "m_iBubbleHeight", lingoBinary("add", meProp(_me, "m_iBubbleHeight"), 1));
  }

  setMeProp(_me, "m_iNumBubbles", meProp(_me, "m_ar_rBubbles").count);
  var t_iY = -float(meProp(_me, "m_iBubbleHeight"));
  for (var t_rWnd of meProp(_me, "m_ar_rBubbles").toArray()) {
  callMethod("moveTo", t_rWnd, 0, t_iY)
  t_iY = lingoBinary("add", t_iY, meProp(_me, "m_iBubbleHeight"));
  }

  if (callNamed("createWriter", "SpeechBblWriSay", callNamed("getStructVariable", "struct.font.chat.plain"))) {
  setMeProp(_me, "m_rWriterSay", callNamed("getWriter", "SpeechBblWriSay"));
  }

  if (callNamed("createWriter", "SpeechBblWriShout", callNamed("getStructVariable", "struct.font.chat.bold"))) {
  setMeProp(_me, "m_rWriterShout", callNamed("getWriter", "SpeechBblWriShout"));
  }

  if (callNamed("createWriter", "SpeechBblWriwhisper", callNamed("getStructVariable", "struct.font.italic"))) {
  setMeProp(_me, "m_rWriterWhisper", callNamed("getWriter", "SpeechBblWriwhisper"));
  }

  callNamed("registerMessage", symbol("chat"), callMethod("getID", _this), symbol("_QueueChat"))
  callNamed("registerMessage", "room_leave", callMethod("getID", _this), symbol("_HideBubbles"))
  callNamed("receiveUpdate", callMethod("getID", _this))
  return 1;
}

