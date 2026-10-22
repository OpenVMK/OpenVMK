// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogComponent / catalogPhotoInfo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function catalogPhotoInfo(_me: LingoMe, tdata: LingoValue, a_iID: LingoValue) {
  var tPublished = tdata.content.word[2];
  var tCaption = tdata.content.word.range(3, tdata.content.word.count);
  var tPhoto = callMethod("getaProp", meProp(_me, "m_mp_photos"), a_iID);
  if ((lingoTruthy(callNamed("voidp", tPhoto)) ? 0 : 1)) {
  setThePropOf(tPhoto, "Caption", tCaption);
  setThePropOf(tPhoto, "published", tPublished);
  }

}

