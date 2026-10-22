// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / SetUpMySlogan

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetUpMySlogan(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_sSlogan = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "set.myslogan"));
  callMethod("setAllowEmpty", meProp(_me, "m_rSloganField"), 1)
  if (lingoBinary("neq", t_sSlogan, meProp(_me, "m_sSlogan"))) {
  if (callMethod("CheckContent", meProp(_me, "m_rSloganField"))) {
  var t_sTxt = callMethod("GetContent", meProp(_me, "m_rSloganField"));
  if (callNamed("stringp", t_sTxt)) {
  t_sTxt = callNamed("ParseCannedText", t_sTxt);
  }

  var t_mp_MsgToServer = new LingoPropList([]);
  var tCannedBlock = callNamed("TransformCannedToMsg", t_sTxt);
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  var tKey = callMethod("getPropAt", tCannedBlock, i);
  var tvalue = tCannedBlock[i];
  callMethod("addProp", t_mp_MsgToServer, tKey, tvalue)
  }

  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "ChangeSlogan", t_mp_MsgToServer)
  callNamed("executeMessage", "close_AvatarBuilder")
  } else {
  var t_sMsg = callNamed("getText", "set.check.slogan");
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckSlogan", 1, 1);
  callMethod("show", t)
  callMethod("setText", t, t_sMsg, "Error", "OK")
  }

  } else {
  callNamed("executeMessage", "close_AvatarBuilder")
  }

  }

}

