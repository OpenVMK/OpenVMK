// vmk_tutorial.cct / CStage / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_sName", "");
  setMeProp(_me, "m_sRoomName", "");
  setMeProp(_me, "m_sMusic", "");
  setMeProp(_me, "m_sAtmos", "");
  setMeProp(_me, "m_iStartTime", 0);
  setMeProp(_me, "m_iEndTime", 0);
  setMeProp(_me, "m_sDirection", "");
  setMeProp(_me, "m_bUseSpot", 0);
  setMeProp(_me, "m_mp_animalSets", new LingoPropList([]));
  setMeProp(_me, "m_splines", new LingoList([undefined, undefined, undefined]));
  setMeProp(_me, "m_deviation", 0);
  setMeProp(_me, "m_ar_hazards", new LingoList([]));
  setMeProp(_me, "m_ar_powerups", new LingoList([]));
  setMeProp(_me, "m_ar_leftboundary", new LingoList([]));
  setMeProp(_me, "m_ar_rightboundary", new LingoList([]));
  setMeProp(_me, "m_iBoundaryAccuracy", 4);
  setMeProp(_me, "m_ar_markers", new LingoList([]));
  setMeProp(_me, "m_p_CollisionMapSprite", undefined);
  setMeProp(_me, "m_bVisualizeBoundaries", callNamed("getVariableValue", "junglecruise.collisionboundaries.visible"));
  setMeProp(_me, "m_i_collisionBounce", callNamed("getVariableValue", "boat.forces.collisionBounce"));
  setMeProp(_me, "m_i_collisionFriction", callNamed("getVariableValue", "boat.forces.collisionFriction"));
  setMeProp(_me, "m_p_CollisionEngine", undefined);
  if (meProp(_me, "m_bVisualizeBoundaries")) {
  setMeProp(_me, "m_p_CollisionMapSprite", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  }

  setMeProp(_me, "m_ar_script", new LingoList([]));
  return 1;
}

