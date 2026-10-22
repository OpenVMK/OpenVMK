// vmk_hm_minigame.cct / CCollisionEngine / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_floors", new LingoPropList([]));
  setMeProp(_me, "m_ar_links", new LingoList([]));
  setMeProp(_me, "m_sActiveFloor", "");
  setMeProp(_me, "m_iTileSize", 16);
  setMeProp(_me, "m_ar_tiles3D", new LingoList([]));
  setMeProp(_me, "m_ar_tiles2D", new LingoList([]));
  setMeProp(_me, "m_ar_tileRef", new LingoList([]));
  setMeProp(_me, "bounce", 0.5);
  setMeProp(_me, "friction", 0.1);
  setMeProp(_me, "m_ar_furniture", new LingoList([]));
  setMeProp(_me, "detectedCollisions", new LingoList([]));
  setMeProp(_me, "m_ar_collisionObjects", new LingoList([]));
  setMeProp(_me, "m_ar_directions", new LingoList([]));
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", -float(1), -float(1), 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 0, -float(1), 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 1, -float(1), 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 1, 0, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 1, 1, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", 0, 1, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", -float(1), 1, 0))
  callMethod("append", meProp(_me, "m_ar_directions"), callNamed("vector", -float(1), 0, 0))
  setMeProp(_me, "m_iStatusDelay", 300);
  var t_iStatusDelay = callNamed("getVariableValue", "hm.editor.statusdelay");
  if ((lingoTruthy(callNamed("voidp", t_iStatusDelay)) ? 0 : 1)) {
  setMeProp(_me, "m_iStatusDelay", t_iStatusDelay);
  }

  callNamed("createTimeout", "HMGCollisionEngineUpdate", meProp(_me, "m_iStatusDelay"), symbol("update"), callMethod("getID", _me), undefined, 0)
  callNamed("registerMessage", symbol("ActivateCollisionEngine"), callMethod("getID", _me), symbol("setActive"))
  callNamed("registerMessage", symbol("AddTileCollisionObject"), callMethod("getID", _me), symbol("addCollisionObject"))
  callNamed("registerMessage", symbol("RemoveTileCollisionObject"), callMethod("getID", _me), symbol("removeCollisionObject"))
  return 1;
}

