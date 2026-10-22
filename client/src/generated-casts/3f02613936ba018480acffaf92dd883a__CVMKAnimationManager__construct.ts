// 3f02613936ba018480acffaf92dd883a.cct / CVMKAnimationManager / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bCheckState", 0);
  setMeProp(_me, "m_bRoomReady", 0);
  setMeProp(_me, "m_iRefCounter", 1);
  setMeProp(_me, "m_ar_rAnimations", new LingoPropList([]));
  setMeProp(_me, "m_ar_sriteDefaults", callMethod("createProperties", _me, "sprite.props"));
  callNamed("registerMessage", symbol("room_ready"), callMethod("getID", _me), symbol("RoomReady"))
  callNamed("registerMessage", symbol("changeAnimationState"), callMethod("getID", _me), symbol("setState"))
  callNamed("receiveUpdate", callMethod("getID", _me))
  return 1;
}

