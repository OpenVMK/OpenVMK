// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogInterface / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  switch (t_dialogName) {
case "PublishDialog":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callMethod("PublishPhoto", callMethod("getHandler", _me), meProp(_me, "m_iCurrentID"), 1)
  callMethod("RequestPhotoIndex", callMethod("getHandler", _me))
  callMethod("changeView", _me, symbol("thumbs"))
  break;
case symbol("dialogCancel"):
  break;
  }

  break;
case "DeleteDialog":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callMethod("DeletePhoto", callMethod("getComponent", _me), meProp(_me, "m_iCurrentID"))
  callMethod("changeView", _me, symbol("thumbs"))
  break;
case symbol("dialogCancel"):
  break;
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown Dialog Window", t_dialogName))
  }

}

