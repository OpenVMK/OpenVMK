// d0e535313898676eb605277339b50f27.cct / CAvatarClothesLoader / AssetsLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AssetsLoaded(_me: LingoMe, a_iCloth: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_rGridLoadAnim"))) {
  return;
  }

  var t_iPos = callMethod("findPos", meProp(_me, "m_ar_ClothesToLoad"), a_iCloth);
  if (lingoBinary("gt", t_iPos, 0)) {
  callMethod("deleteAt", meProp(_me, "m_ar_ClothesToLoad"), t_iPos)
  }

  if (lingoBinary("eq", meProp(_me, "m_ar_ClothesToLoad").count, 0)) {
  var m_bAllClothesLoaded = 1;
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "loadingscreen")) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), "loadingscreen"), symbol("visible"), 0)
  var t_ar_elements = new LingoList(["change.ht.-1", "part.ht.preview", "change.ht.1", "change.hr.-1", "part.hr.preview", "change.hr.1", "change.hd.-1", "part.hd.preview", "change.hd.1", "change.ch.-1", "part.ch.preview", "change.ch.1", "change.pn.-1", "part.pn.preview", "change.pn.1", "change.sh.-1", "part.sh.preview", "change.sh.1", "human.preview.img", "change.hr.color.-1", "part.color.hr.preview", "change.hr.color.1", "change.hd.color.-1", "part.color.hd.preview", "change.hd.color.1", "set.myslogan.hd", "set.myslogan", "set.imready.button", "set.nohats.info", "back2"]);
  for (var i = 1; i <= t_ar_elements.count; ++i) {
  var t_sElemName = t_ar_elements[i];
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), t_sElemName)) {
  callMethod("setProperty", callMethod("getElement", meProp(_me, "m_rWindow"), t_sElemName), symbol("visible"), 1)
  }

  }

  }

  if (callNamed("objectp", meProp(_me, "m_rGridLoadAnim"))) {
  callMethod("SetBufferElement", meProp(_me, "m_rGridLoadAnim"), undefined)
  callNamed("removeUpdate", callMethod("getID", meProp(_me, "m_rGridLoadAnim")))
  }

  }

  callMethod("AllClothesLoaded", callNamed("getThread", symbol("AvatarFactory")).handler, meProp(_me, "m_mp_DataList"))
  }

}

