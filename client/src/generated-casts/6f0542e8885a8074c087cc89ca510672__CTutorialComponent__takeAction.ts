// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialComponent / takeAction

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function takeAction(_me: LingoMe, t_ID: LingoValue) {
  var t_bOK = 0;
  var tMessenger = callNamed("getThread", "Messenger");
  if (lingoBinary("neq", tMessenger, 0)) {
  if (lingoBinary("eq", callMethod("getMessengerState", callMethod("getComponent", tMessenger)), symbol("normal"))) {
  t_bOK = 1;
  }

  }

  if ((lingoTruthy(t_bOK) ? 0 : 1)) {
  return;
  }

  var t_bAllowTutorials = callMethod("getTutorialsVisibleState", _me);
  if (lingoBinary("and", t_bAllowTutorials, (lingoTruthy(callNamed("voidp", meProp(_me, "m_pTutorialsData"))) ? 0 : 1))) {
  var t_desc = new LingoPropList([symbol("name"), "", symbol("description"), "", symbol("Caption"), "", symbol("link"), ""]);
  if (callMethod("getTutorialByID", meProp(_me, "m_pTutorialsData"), t_ID, t_desc)) {
  var t_txt = t_desc.description;
  var t_title = t_desc.Caption;
  var t = callNamed("createTutorialWindow", callMethod("getID", _me), t_desc.name, 3, 1);
  if (lingoBinary("eq", t_desc.link.length, 0)) {
  callMethod("setText", t, t_txt, t_title, 0)
  } else {
  callMethod("setText", t, t_txt, t_title, 1, t_desc.link)
  }

  callNamed("createTimeout", callNamed("getUniqueID"), lingoBinary("add", 500, callNamed("random", 500)), symbol("openTutorialDialogWindow"), callMethod("getID", _me), t, 1)
  callMethod("append", meProp(_me, "m_pTakenActions"), t_ID)
  } else {
  callNamed("put", "Tutorials not ready")
  }

  }

}

