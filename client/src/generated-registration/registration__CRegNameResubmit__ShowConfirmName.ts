// registration.cct / CRegNameResubmit / ShowConfirmName

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowConfirmName(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("neq", meProp(_me, "m_sActiveName"), "")) {
  var t_sTxt = meProp(_me, "m_sActiveName");
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "ConfirmAvatarName", 2, 1);
  callMethod("show", t)
  var t_sHd = callNamed("getText", "reg.confirm.name.hd");
  t_sTxt = callNamed("replaceChunks", callNamed("getText", "reg.confirm.generated.name"), "%avatarName%", meProp(_me, "m_sActiveName"));
  callMethod("setText", t, t_sTxt, t_sHd, callNamed("getText", "reg.name.cancel"), callNamed("getText", "reg.name.ok"))
  return;
  }

  var t_iMaxlength = 18;
  var t_iMinlength = 4;
  var tElem = callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.input");
  if (lingoBinary("neq", tElem, 0)) {
  var t_txt = callMethod("getText", tElem);
  if (lingoBinary("gte", tElem.pMember.text.char.count, t_iMaxlength)) {
  setThePropOf(tElem.pMember, "text", tElem.pMember.char.range(1, t_iMaxlength));
  t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckNameLength", 1, 1);
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
  } else {
  t = callNamed("createDialogWindow", callMethod("getID", _this), "ConfirmAvatarName", 2, 1);
  callMethod("show", t)
  t_sHd = callNamed("getText", "reg.confirm.name.hd");
  t_sTxt = callNamed("getText", "reg.confirm.name");
  callMethod("setText", t, t_sTxt, t_sHd, callNamed("getText", "reg.name.cancel"), callNamed("getText", "reg.name.ok"))
  }

  }

  }

  }

}

