// vmk_hm_minigame.cct / CCollisionEngine / parseRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseRoom(_me: LingoMe) {
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  if (callNamed("voidp", t_rContext)) {
  callNamed("put", "ERROR, Could not hook Room!")
  return;
  }

  var t_ar_floors = callMethod("createCollisionmap", _me, t_rContext);
  var t_ar_links = callMethod("getRoomLinks", _me, t_rContext);
  var t_ar_links3D = callMethod("links2positions", _me, t_rContext, t_ar_links);
  callMethod("setTileRefs", _me, t_ar_floors)
  callMethod("setFloors", _me, t_ar_floors)
  callMethod("SetTileSize", _me, 16)
  callMethod("setLinks", _me, t_ar_links3D)
  var t_ar_mp_elemProps = new LingoList([]);
  var t_mp_mp_furniMap = new LingoPropList([]);
  callNamed("RipFurni", t_ar_mp_elemProps, t_mp_mp_furniMap, new LingoPropList([303, symbol("Coffin"), 313, symbol("Door"), 320, symbol("Door"), 356, symbol("Door"), 357, symbol("Door"), 312, symbol("loop"), 82, symbol("loop"), 5, symbol("loop")]))
  callMethod("AddFurniture", _me, t_ar_mp_elemProps, t_mp_mp_furniMap, t_ar_floors)
}

