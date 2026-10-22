// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, _this: LingoValue, a_rWindow: LingoValue) {
  setMeProp(_me, "m_rWindow", a_rWindow);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("merge", meProp(_me, "m_rWindow"), "vmk_set_avatar.window")
  var t_ar_elements = new LingoList(["change.ht.-1", "part.ht.preview", "change.ht.1", "change.hr.-1", "part.hr.preview", "change.hr.1", "change.hd.-1", "part.hd.preview", "change.hd.1", "change.ch.-1", "part.ch.preview", "change.ch.1", "change.pn.-1", "part.pn.preview", "change.pn.1", "change.sh.-1", "part.sh.preview", "change.sh.1", "human.preview.img", "change.hr.color.-1", "part.color.hr.preview", "change.hr.color.1", "change.hd.color.-1", "part.color.hd.preview", "change.hd.color.1", "set.myslogan.hd", "set.myslogan", "set.imready.button", "set.nohats.info", "back2"]);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  for (var i = 1; i <= t_ar_elements.count; ++i) {
  var t_sElemName = t_ar_elements[i];
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), t_sElemName)) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), t_sElemName), symbol("visible"), 0)
  }

  }

  }

  var t_sWndName = callMethod("getProperty", meProp(_me, "m_rWindow"), symbol("title"));
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "set.nohats.info"), symbol("visible"), 0)
  setMeProp(_me, "m_rSloganField", callNamed("CreateCannedField", t_sWndName, "set.myslogan"));
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "loadingscreen")) {
  var t_Img = callMethod("getProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "loadingscreen"), symbol("image"));
  callMethod("fill", t_Img, t_Img.rect, callNamed("rgb", 39, 86, 146))
  }

  callMethod("setAllowFreeWords", meProp(_me, "m_rSloganField"), 0)
  callMethod("setAllowFriendNames", meProp(_me, "m_rSloganField"), 0)
  return 1;
  }

}

