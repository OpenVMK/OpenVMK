// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogRoomsView / CancelRoomBuy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CancelRoomBuy(_me: LingoMe) {
  var t_sWndName = "RoomNameWnd";
  if (callNamed("windowExists", t_sWndName)) {
  callNamed("removeWindow", t_sWndName)
  }

}

