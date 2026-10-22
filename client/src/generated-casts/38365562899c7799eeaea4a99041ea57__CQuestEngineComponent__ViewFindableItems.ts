// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / ViewFindableItems

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ViewFindableItems(_me: LingoMe, t_ar_data: LingoValue) {
  callMethod("HideFindableItem", _me)
  for (var i = 1; i <= t_ar_data[symbol("item_count")]; ++i) {
  var t_rSprite = callMethod("initQuestItemSprite", _me);
  var t_iTileReference = t_ar_data[symbol("item_array")][i][symbol("tileReference")];
  var t_iFindableItemCode = t_ar_data[symbol("item_array")][i][symbol("findableItemCode")];
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  var t_rTile = callMethod("_AccessIndexed", t_rContext, t_iTileReference, "tile");
  if (callNamed("objectp", t_rTile)) {
  var t_sMemName = lingoBinary("join", lingoBinary("join", "item_", t_iFindableItemCode), "_0_0_3_1_0");
  var t_rMem = callNamed("getMember", t_sMemName);
  if (lingoBinary("eq", t_rMem, 0)) {
  callNamed("put", lingoBinary("joinPad", "Error, could not find member", t_sMemName))
  return;
  }

  setThePropOf(t_rSprite, "member", callNamed("member", t_sMemName));
  var t_vPos = callMethod("GetScrPos", t_rTile);
  setThePropOf(t_rSprite, "locH", t_vPos.x);
  setThePropOf(t_rSprite, "locV", t_vPos.y);
  setThePropOf(t_rSprite, "locZ", t_vPos.z);
  setThePropOf(t_rSprite, "width", t_rMem.width);
  setThePropOf(t_rSprite, "height", t_rMem.height);
  }

  }

}

