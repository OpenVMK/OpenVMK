// c7d81c175a2637e0193f0cf7bfd014ba.cct / CGiftInterface / SendData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendData(_me: LingoMe) {
  var t_mp_dataToServer = new LingoPropList([]);
  callMethod("addProp", t_mp_dataToServer, symbol("int"), meProp(_me, "m_iInventoryID"))
  callMethod("addProp", t_mp_dataToServer, symbol("int"), meProp(_me, "m_iRef"))
  callMethod("addProp", t_mp_dataToServer, symbol("int"), callNamed("integer", meProp(_me, "m_BgType")))
  var t_bHd = 0;
  if (callMethod("CheckContent", meProp(_me, "m_rMessageHd"))) {
  var t_sTxt = callMethod("GetContent", meProp(_me, "m_rMessageHd"));
  if (callNamed("stringp", t_sTxt)) {
  t_sTxt = callNamed("ParseCannedText", t_sTxt);
  }

  var tCannedBlock = callNamed("TransformCannedToMsg", t_sTxt);
  var t_Length = tCannedBlock.count;
  for (var i = 1; i <= t_Length; ++i) {
  var tKey = callMethod("getPropAt", tCannedBlock, i);
  var tvalue = tCannedBlock[i];
  callMethod("addProp", t_mp_dataToServer, tKey, tvalue)
  }

  t_bHd = 1;
  }

  var t_bTxt = 0;
  if (callMethod("CheckContent", meProp(_me, "m_pComposeMessage"))) {
  t_sTxt = callMethod("GetContent", meProp(_me, "m_pComposeMessage"));
  if (callNamed("stringp", t_sTxt)) {
  t_sTxt = callNamed("ParseCannedText", t_sTxt);
  }

  tCannedBlock = callNamed("TransformCannedToMsg", t_sTxt);
  t_Length = tCannedBlock.count;
  for (var i = 1; i <= t_Length; ++i) {
  tKey = callMethod("getPropAt", tCannedBlock, i);
  tvalue = tCannedBlock[i];
  callMethod("addProp", t_mp_dataToServer, tKey, tvalue)
  }

  t_bTxt = 1;
  }

  if (lingoBinary("and", t_bTxt, t_bHd)) {
  callMethod("send", callNamed("getConnection", "VMK"), "WriteGiftMessage", t_mp_dataToServer)
  callNamed("removeObject", callMethod("getID", _me))
  }

}

