// vmk_horseshoe_shop_handler.cct / CVMKHorseshoeShopHandler / openCatalogPage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function openCatalogPage(_me: LingoMe, tMsg: LingoValue) {
  var superCategory = callMethod("GetIntFrom", tMsg.connection);
  var subCategory = callMethod("GetIntFrom", tMsg.connection);
  callNamed("executeMessage", "showCatalogPage", superCategory, subCategory)
}

