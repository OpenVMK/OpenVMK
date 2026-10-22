// vmk_tutorial.cct / CTutorial / ReadTutorial

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ReadTutorial(_me: LingoMe, i_sMemberName: LingoValue) {
  callNamed("dumpVariableField", callNamed("getMember", "tutorial"))
  setMeProp(_me, "m_mp_sequence", callNamed("getVariableValue", "JungleCruiseTutorialSequence"));
  setMeProp(_me, "m_boatSlowPoint", callNamed("getVariableValue", "JungleCruiseTutorialBoatSlowPoint"));
  setMeProp(_me, "m_avatarToBoatPoint", callNamed("getVariableValue", "JungleCruiseTutorialAvatarToBoatPoint"));
  setMeProp(_me, "m_avatarWaitPos", callNamed("getVariableValue", "JungleCruiseTutorialAvatarWaitPos"));
  setMeProp(_me, "m_fLastTime", lingoBinary("div", theProperty("milliSeconds"), float(1000)));
  setMeProp(_me, "m_fInitTime", meProp(_me, "m_fLastTime"));
}

