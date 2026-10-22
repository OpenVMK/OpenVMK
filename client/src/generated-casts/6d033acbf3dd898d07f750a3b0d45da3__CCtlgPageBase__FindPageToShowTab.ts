// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCtlgPageBase / FindPageToShowTab

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FindPageToShowTab(_me: LingoMe, _this: LingoValue, a_iSuperCat: LingoValue, a_iSubCat: LingoValue) {
  for (var supercat of meProp(_me, "m_mp_CatalogData")[1].toArray()) {
  for (var i = 4; i <= supercat.count; ++i) {
  if (lingoBinary("eq", callMethod("getaProp", supercat, symbol("id")), a_iSuperCat)) {
  if (lingoBinary("eq", callMethod("getaProp", supercat[i], symbol("id")), a_iSubCat)) {
  var t_sPageName = callMethod("getPropAt", supercat, i);
  switch (t_sPageName) {
case "Furniture":
  return symbol("furniture");
case "Pins":
  return symbol("pins");
case "Posters":
  return symbol("posters");
case "Specials!":
  return symbol("specials");
case "Tops":
case "Bottoms":
case "Shose":
case "Hats":
  return symbol("clothes");
case "GuestRooms":
  return symbol("rooms");
  break;
  break;
  break;
  }

  return symbol("furniture");
  }

  }

  }

  }

  return undefined;
}

