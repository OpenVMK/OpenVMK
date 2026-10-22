// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CCannedTextManager / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (lingoBinary("and", callNamed("netDone", meProp(_me, "m_netID")), (lingoTruthy(meProp(_me, "m_bGotRaw")) ? 0 : 1))) {
  var tText = callNamed("netTextResult", meProp(_me, "m_netID"));
  var t_bError = 0;
  if (lingoBinary("eq", callNamed("netError", meProp(_me, "m_netID")), "OK")) {
  setMeProp(_me, "m_ar_rawList", callNamed("value", tText));
  } else {
  t_bError = 1;
  }

  if (lingoBinary("or", callNamed("voidp", meProp(_me, "m_ar_rawList")), t_bError)) {
  var tMsg = callMethod("solveNetErrorMsg", callNamed("getDownloadManager"), callNamed("netError", meProp(_me, "m_netID")));
  if ((lingoTruthy(callNamed("DialogWindowExists", "DictionaryError")) ? 0 : 1)) {
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "DictionaryError", 1, 1);
  callMethod("setText", t, "Cannot start VMK. The game was unable to download all required resources. Please first check your Internet connection and Firewall settings and then retry logging into the game. If the problem persists, please send feedback using the feedback forms in VMK.com.", "ERROR", "OK")
  callMethod("show", t)
  return 0;
  }

  }

  setMeProp(_me, "m_dictionary", callNamed("createObject", "VMK_Dictionary", "CDictionary"));
  setMeProp(_me, "m_bGotRaw", 1);
  setMeProp(_me, "m_bDecrunched", 0);
  callNamed("ShowCustomLoadingScreen", 0)
  if (callNamed("createWindow", "dict_status_wnd", "vmk_loadbar.window")) {
  var t_rWnd = callNamed("getWindow", "dict_status_wnd");
  callMethod("center", t_rWnd)
  callMethod("setText", callMethod("getElement", t_rWnd, "basic.content.text"), callNamed("getText", "dict.preparing"))
  callNamed("createObject", "dict_status_bar", "Loading Bar Class")
  var t_rProps = new LingoPropList([]);
  callMethod("setaProp", t_rProps, symbol("buffer"), callMethod("getProperty", callMethod("getElement", t_rWnd, "bar"), symbol("buffer")).image)
  callMethod("setaProp", t_rProps, symbol("width"), 200)
  callMethod("setaProp", t_rProps, symbol("height"), 20)
  callMethod("setaProp", t_rProps, symbol("type"), symbol("other"))
  callMethod("Define", callNamed("getObject", "dict_status_bar"), callMethod("getID", _me), t_rProps)
  }

  callMethod("lock", callNamed("getWindowManager"))
  }

  if (lingoBinary("and", meProp(_me, "m_bGotRaw"), (lingoTruthy(meProp(_me, "m_bDecrunched")) ? 0 : 1))) {
  t = theProperty("milliSeconds");
  setMeProp(_me, "m_fPercentReady", callMethod("DecrunchABunchOfWords", _me, 100));
  callMethod("setText", callMethod("getElement", callNamed("getWindow", "dict_status_wnd"), "basic.content.text"), lingoBinary("join", lingoBinary("join", lingoBinary("join", callNamed("getText", "dict.preparing"), "\r"), callNamed("integer", lingoBinary("mul", meProp(_me, "m_fPercentReady"), 100))), "%"))
  t = lingoBinary("sub", theProperty("milliSeconds"), t);
  setMeProp(_me, "m_iTimeElapsed", lingoBinary("add", meProp(_me, "m_iTimeElapsed"), t));
  } else {
  if (meProp(_me, "m_bDecrunched")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", "Dictionary parsed in", meProp(_me, "m_iTimeElapsed")), "ms."))
  callMethod("unlock", callNamed("getWindowManager"))
  callNamed("RemoveCustomLoadingScreen")
  callNamed("removeUpdate", callMethod("getID", _me))
  callNamed("removeObject", "dict_status_bar")
  callNamed("removeWindow", "dict_status_wnd")
  callNamed("executeMessage", symbol("dictionary_ready"))
  callMethod("ProcessReadyCallback", callMethod("GetProcessManager", callNamed("getThread", symbol("main")).component), meProp(_me, "m_iProcessNumber"))
  }

  }

}

