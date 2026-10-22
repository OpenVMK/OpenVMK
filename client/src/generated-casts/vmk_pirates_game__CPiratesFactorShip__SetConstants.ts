// vmk_pirates_game.cct / CPiratesFactorShip / SetConstants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetConstants(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  callMethod("SetParam", callMethod("getObject", _me), "BoundsType", symbol("triplecircle"))
  callMethod("SetParam", callMethod("getObject", _me), "1stRadius", 1000)
  callMethod("SetParam", callMethod("getObject", _me), "2ndRadius", 1500)
  callMethod("SetParam", callMethod("getObject", _me), "3rdRadius", 1000)
  callMethod("SetParam", callMethod("getObject", _me), "1stOffset", 1500)
  callMethod("SetParam", callMethod("getObject", _me), "3rdOffset", -float(1500))
  callMethod("SetParam", callMethod("getObject", _me), "LargestRadius", 2500)
  callMethod("SetParam", callMethod("getObject", _me), "NavigationStopRadius", 1423)
  callMethod("SetParam", callMethod("getObject", _me), "BowCannonOffset", 2000)
  callMethod("SetParam", callMethod("getObject", _me), "SideCannonOffset", 1000)
  callMethod("SetParam", callMethod("getObject", _me), "Speed", 700)
  callMethod("SetParam", callMethod("getObject", _me), "Velocity", callNamed("intvector", 0, 0, 0))
  callMethod("SetParam", callMethod("getObject", _me), "Health", 5)
  callMethod("SetParam", callMethod("getObject", _me), "MaxHealth", 5)
  callMethod("SetParam", callMethod("getObject", _me), "Ammo", new LingoList([0, 0, 0, 0, 0]))
  callMethod("SetParam", callMethod("getObject", _me), "MaxAmmo", 5)
  callMethod("SetParam", callMethod("getObject", _me), "State", 0)
  callMethod("SetParam", callMethod("getObject", _me), "NavigationTarget", callNamed("intvector", 0, 0, 0))
  callMethod("SetParam", callMethod("getObject", _me), "Score", 0)
  callMethod("SetParam", callMethod("getObject", _me), "WindAffects", 1)
  callMethod("SetParam", callMethod("getObject", _me), "ArcStart", 0)
  callMethod("SetParam", callMethod("getObject", _me), "ArcEnd", 90)
  callMethod("SetParam", callMethod("getObject", _me), "WhirlpoolThrow", callNamed("intvector", 0, 0, 0))
  callMethod("SetParam", callMethod("getObject", _me), "LastMove", theProperty("milliSeconds"))
  callMethod("setCollisionVisualization", callMethod("GetVisual", callMethod("getObject", _me)), 0)
  callMethod("SetSpeedAndHealth", _me)
  callMethod("updateConstants", callMethod("GetVisual", callMethod("getObject", _me)))
}

