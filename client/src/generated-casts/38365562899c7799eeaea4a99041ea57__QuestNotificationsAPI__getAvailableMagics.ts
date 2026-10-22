// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / getAvailableMagics

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAvailableMagics(_me: LingoMe) {
  var t_ar_magics = new LingoList([]);
  if (lingoBinary("neq", callNamed("getObject", "MagicMenu"), 0)) {
  var t_rMagic = callNamed("getObject", "MagicMenu");
  var t_ar_wornmagics = callMethod("duplicate", callNamed("getObject", "MagicMenu").m_mp_FxList);
  for (var t_ar_magic of t_ar_wornmagics.toArray()) {
  var t_ar_new = new LingoPropList([]);
  t_ar_new[symbol("id")] = t_ar_magic[symbol("ItemId")];
  callMethod("append", t_ar_magics, t_ar_new)
  }

  }

  var t = new LingoPropList([]);
  callMethod("GetItemsByCategory", callMethod("getComponent", callNamed("getThread", "inventory")), symbol("pins"), t)
  for (var t_ar_magic of t.toArray()) {
  if (lingoBinary("gt", t_ar_magic[symbol("param")], 0)) {
  t_ar_new = new LingoPropList([]);
  t_ar_new[symbol("id")] = t_ar_magic[symbol("code")];
  callMethod("append", t_ar_magics, t_ar_new)
  }

  }

  return t_ar_magics;
}

