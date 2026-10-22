// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogInterface / placePosterEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function placePosterEnd(_me: LingoMe, t_iWall: LingoValue, t_veC: LingoValue) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "place photo", meProp(_me, "m_iCurrentID")), "on wall"), t_iWall), "at"), t_veC))
  callMethod("PlacePhotoOnWall", callMethod("getHandler", _me), meProp(_me, "m_iCurrentID"), t_iWall, callNamed("integer", t_veC.x), callNamed("integer", t_veC.y), callNamed("integer", t_veC.z))
  callMethod("show", callNamed("getWindow", meProp(_me, "m_sWindowTitle")))
  callNamed("unregisterMessage", "place_poster_end", callMethod("getID", _me))
}

