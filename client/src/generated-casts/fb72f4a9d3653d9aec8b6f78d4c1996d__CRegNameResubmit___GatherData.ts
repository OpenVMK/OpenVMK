// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegNameResubmit / _GatherData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _GatherData(_me: LingoMe, _this: LingoValue) {
  var t_txt = undefined;
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("neq", meProp(_me, "m_sActiveName"), "")) {
  t_txt = meProp(_me, "m_sActiveName");
  } else {
  var t_iMaxlength = 18;
  var t_iMinlength = 4;
  var tElem = callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.input");
  t_txt = callMethod("getText", tElem);
  if (lingoBinary("neq", tElem, 0)) {
  if (lingoBinary("gte", tElem.pMember.text.char.count, t_iMaxlength)) {
  setThePropOf(tElem.pMember, "text", tElem.pMember.char.range(1, t_iMaxlength));
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckNameLength", 1, 1);
  callMethod("show", t)
  var t_sMsg = callNamed("getText", "reg.name.toolong");
  callMethod("setText", t, t_sMsg, "Error", "OK")
  return 1;
  } else {
  if (lingoBinary("lt", tElem.pMember.text.char.count, t_iMinlength)) {
  t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckNameLength", 1, 1);
  callMethod("show", t)
  t_sMsg = callNamed("getText", "reg.name.tooshort");
  callMethod("setText", t, t_sMsg, "Error", "OK")
  return 1;
  }

  }

  }

  }

  var t_mp_dataToServer = new LingoPropList([]);
  callMethod("addProp", t_mp_dataToServer, symbol("string"), t_txt)
  callMethod("set", callNamed("getObject", symbol("session")), "name", t_txt)
  callMethod("send", callNamed("getConnection", "VMK"), "SendNewName", t_mp_dataToServer)
  if (lingoBinary("eq", meProp(_me, "m_sResubmitReason"), "resubmit")) {
  callMethod("send", callNamed("getConnection", "VMK"), "GetName")
  }

  } else {
  t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckName", 1, 1);
  callMethod("show", t)
  t_sMsg = callNamed("getText", "reg.name.wrong");
  callMethod("setText", t, t_sMsg, "Error", "OK")
  return 0;
  }

}

