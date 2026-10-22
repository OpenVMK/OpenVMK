// vmk_dock_handler.cct / CJCPSInterface / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_signUpBoard", undefined);
  setMeProp(_me, "m_sHighscoreWindowTitle", "JungleCruiseHighScore");
  setMeProp(_me, "m_sSignupWndTitle", "JungleCruiseSignup");
  setMeProp(_me, "m_ar_sPages", new LingoList(["jc.instructions.text", "jc.instructions.page.1", "jc.instructions.page.2", "jc.instructions.page.3", "jc.instructions.page.4", "jc.instructions.page.5"]));
  var t_ar_sImages = new LingoList(["jc.instructions.image1", "jc.instructions.image2", "jc.instructions.image3", "jc.instructions.image4", "jc.instructions.image5", "jc.instructions.image6"]);
  setMeProp(_me, "m_ar_rImages", new LingoList([]));
  for (var t_sImage of t_ar_sImages.toArray()) {
  callMethod("append", meProp(_me, "m_ar_rImages"), callNamed("member", t_sImage).image)
  }

  setMeProp(_me, "m_iCurPage", 1);
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("initSign"))
  callNamed("registerMessage", "room_tile_selection", callMethod("getID", _me), symbol("_TileSelection"))
  return 1;
}

