// vmk_junglecruise_minigame.cct / CAnimalManager / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tTime = theProperty("milliSeconds");
  var dt = lingoBinary("div", lingoBinary("sub", tTime, meProp(_me, "m_lastTime")), float(1000));
  setMeProp(_me, "m_lastTime", tTime);
  var t_mp_nuVisibleList = new LingoPropList([]);
  for (var tAnimal of meProp(_me, "m_mp_visibleAnimals").toArray()) {
  if ((lingoTruthy(callNamed("voidp", callMethod("GetFactor", tAnimal))) ? 0 : 1)) {
  tTime = callMethod("GetParam", tAnimal, "Time");
  tTime = lingoBinary("sub", tTime, dt);
  callMethod("SetParam", tAnimal, "Time", tTime)
  var tstate = callMethod("GetParam", tAnimal, "State");
  if (lingoBinary("and", lingoBinary("lt", lingoBinary("mul", tTime, 30), callMethod("GetParam", tAnimal, "Leave").count), lingoBinary("neq", tstate, symbol("leave")))) {
  callMethod("SetParam", tAnimal, "State", symbol("leave"))
  callMethod("SetParam", tAnimal, "FrameNum", 1)
  setMeProp(_me, "m_iNextPuffRef", lingoBinary("add", meProp(_me, "m_iNextPuffRef"), 1));
  callMethod("CreatePuff", _me, callMethod("GetParam", tAnimal, "WorldPosition"), meProp(_me, "m_iNextPuffRef"), callMethod("GetParam", tAnimal, "Scale"))
  }

  if (lingoBinary("gt", tTime, float(0))) {
  callMethod("addProp", t_mp_nuVisibleList, callMethod("GetParam", tAnimal, "Reference"), tAnimal)
  } else {
  callMethod("RemoveAnimal", _me, tAnimal)
  }

  continue;
  }

  callMethod("RemoveAnimal", _me, tAnimal)
  }

  setMeProp(_me, "m_mp_visibleAnimals", t_mp_nuVisibleList);
  var t_ar_newpuffs = new LingoList([]);
  for (var tObj of meProp(_me, "m_ar_puffs").toArray()) {
  if ((lingoTruthy(callNamed("voidp", callMethod("GetFactor", tObj))) ? 0 : 1)) {
  if (callMethod("IsRemovable", callMethod("GetFactor", tObj))) {
  callMethod("RemovePuff", _me, callMethod("GetParam", callMethod("getObject", tObj), "Reference"))
  continue;
  }

  callMethod("append", t_ar_newpuffs, tObj)
  }

  }

  setMeProp(_me, "m_ar_puffs", t_ar_newpuffs);
}

