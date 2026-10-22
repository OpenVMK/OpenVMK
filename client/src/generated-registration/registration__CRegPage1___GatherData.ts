// registration.cct / CRegPage1 / _GatherData

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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
  if (lingoBinary("gt", tElem.pMember.text.char.count, t_iMaxlength)) {
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
  if (lingoBinary("eq", meProp(_me, "m_sSex"), "M")) {
  var t_iSex = 0;
  } else {
  t_iSex = 1;
  }

  callMethod("addProp", t_mp_dataToServer, symbol("int"), t_iSex)
  for (var i = 1; i <= meProp(_me, "m_ar_PropsToServer").count; ++i) {
  var t_sColor = meProp(_me, "m_ar_PropsToServer")[i]["Color"];
  if (lingoBinary("eq", t_sColor, -float(1))) {
  var t_iLocinColorList = -float(1);
  } else {
  for (var f = 1; f <= meProp(_me, "m_ar_FigureColorList").count; ++f) {
  if (lingoBinary("eq", meProp(_me, "m_ar_FigureColorList")[f], t_sColor)) {
  t_iLocinColorList = callMethod("getPropAt", meProp(_me, "m_ar_FigureColorList"), f);
  }

  }

  }

  callMethod("addProp", t_mp_dataToServer, symbol("int"), callNamed("value", meProp(_me, "m_ar_PropsToServer")[i]["SetID"]))
  if (lingoBinary("eq", meProp(_me, "m_ar_PropsToServer")[i]["SetID"], -float(1))) {
  callMethod("addProp", t_mp_dataToServer, symbol("int"), -float(1))
  continue;
  }

  callMethod("addProp", t_mp_dataToServer, symbol("int"), callNamed("value", t_iLocinColorList))
  }

  var t_iSelectedRoom = meProp(_me, "m_ar_RoomList")[meProp(_me, "m_iSelectedRoom")];
  callMethod("addProp", t_mp_dataToServer, symbol("int"), meProp(_me, "m_iSelectedRoomId"))
  callMethod("send", callNamed("getConnection", "VMK"), "CreateAvatar", t_mp_dataToServer)
  } else {
  t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckName", 1, 1);
  callMethod("show", t)
  t_sMsg = callNamed("getText", "reg.name.wrong");
  callMethod("setText", t, t_sMsg, "Error", "OK")
  return 0;
  }

}

