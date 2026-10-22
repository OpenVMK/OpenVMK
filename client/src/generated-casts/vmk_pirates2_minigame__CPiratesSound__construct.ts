// vmk_pirates2_minigame.cct / CPiratesSound / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_rSea", callNamed("sound", 7));
  setMeProp(_me, "m_rMusic", callNamed("sound", 6));
  setMeProp(_me, "m_rCountDown", callNamed("sound", 8));
  setMeProp(_me, "m_ar_rFX", new LingoList([]));
  meProp(_me, "m_ar_rFX")[1] = callNamed("createObject", symbol("random"), "CSoundObject");
  meProp(_me, "m_ar_rFX")[2] = callNamed("createObject", symbol("random"), "CSoundObject");
  meProp(_me, "m_ar_rFX")[3] = callNamed("createObject", symbol("random"), "CSoundObject");
  meProp(_me, "m_ar_rFX")[4] = callNamed("createObject", symbol("random"), "CSoundObject");
  setMeProp(_me, "m_iChannel", 1);
  setMeProp(_me, "m_iSeldomAcc", 1);
  setMeProp(_me, "m_mp_sSoundList", new LingoPropList([]));
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "Cannon", new LingoList(["PG-broadside-1", "PG-broadside-2", "PG-cannon-2"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "BroadSide", new LingoList(["PG-broadside-1", "PG-broadside-2"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "Hit", new LingoList(["PG-cannon-6", "PG-cannon-7", "PG-cannon-9", "PG-cannon-11", "PG-hit-4", "PG-hit-5"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "Splash", new LingoList(["PG-miss-water"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "Acknowledge", new LingoList(["UI-click"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "Fanfare", new LingoList(["PG-fanfare"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "Countdown", new LingoList(["PVO-three", "PVO-two", "PVO-one", "PVO-timetosetsail"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "Moonlight", new LingoList(["PG-moonlight"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "Panic", new LingoList(["PG-panic"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "Preshoot", new LingoList(["PG-preshoot-II"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "LoadCannon", new LingoList(["PG-load-cannon-II"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "Fanfare", new LingoList(["PG-fanfare"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "DropFlag", new LingoList(["POTC2-SFX-drop-flag"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "FlagToBase", new LingoList(["POTC2-SFX-flagtobase"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "TurnIntoRowboat", new LingoList(["POTC2-SFX-turnintoarobot"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "SeaMonsterAttack", new LingoList(["POTC2-SFX-seamonster"]))
  callMethod("setaProp", meProp(_me, "m_mp_sSoundList"), "GoldenCannonball", new LingoList(["POTC2-SFX-goldencannonball"]))
  callMethod("sort", meProp(_me, "m_mp_sSoundList"))
  setMeProp(_me, "m_mp_rVOList", new LingoPropList([]));
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("Acknowledge"), new LingoList([callNamed("getMember", "PVO-shipsahoy"), callNamed("getMember", "PVO-apirateslifeforme"), callNamed("getMember", "PVO-aicaptain")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("fire"), new LingoList([callNamed("getMember", "PVO-blastthose"), callNamed("getMember", "PVO-cannonsaway"), callNamed("getMember", "PVO-runashotacross"), callNamed("getMember", "PVO-takethis")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("CannonsReady"), new LingoList([callNamed("getMember", "PVO-cannonsreadycaptain")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("LowHealth"), new LingoList([callNamed("getMember", "PVO-hullbreached")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("OutOfAmmo"), new LingoList([callNamed("getMember", "PVO-outofammo")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("OwnTeamWins"), new LingoList([callNamed("getMember", "PVO-goodworkmehardies")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("OtherTeamWins"), new LingoList([callNamed("getMember", "PVO-wevelost")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("OwnShipHit"), new LingoList([callNamed("getMember", "PVO-shivermetimbers"), callNamed("getMember", "PVO-wevebeenhit")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("GetHealth"), new LingoList([callNamed("getMember", "PVO-weverepairedtheship")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("GetAmmo"), new LingoList([callNamed("getMember", "PVO-abountofcargoisyours")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("GetFlag"), new LingoList([callNamed("getMember", "POTC2-SFX-pickup-flag")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("Death"), new LingoList([callNamed("getMember", "PG-death")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("BlowShip"), new LingoList([callNamed("getMember", "PVO-wevebeensunk")]))
  callMethod("setaProp", meProp(_me, "m_mp_rVOList"), symbol("TimeLow"), new LingoList([callNamed("getMember", "PVO-timeisrunningout")]))
  callMethod("sort", meProp(_me, "m_mp_rVOList"))
  return 1;
}

