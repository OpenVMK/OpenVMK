// vmk_pirates2_minigame.cct / CPiratesInterface / initMessageBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initMessageBar(_me: LingoMe) {
  /* global */ var g_profInterface = globalVar("g_profInterface");
  /* global */ var g_gfxCbNormal = globalVar("g_gfxCbNormal");
  /* global */ var g_gfxCbGolden = globalVar("g_gfxCbGolden");
  /* global */ var g_gfxCbRed = globalVar("g_gfxCbRed");
  /* global */ var g_gfxCbWhite = globalVar("g_gfxCbWhite");
  /* global */ var g_gfxCbFire = globalVar("g_gfxCbFire");
  /* global */ var g_gfxPickupAmmo = globalVar("g_gfxPickupAmmo");
  /* global */ var g_gfxPickupAmmoGolden = globalVar("g_gfxPickupAmmoGolden");
  /* global */ var g_gfxPickupHealth = globalVar("g_gfxPickupHealth");
  /* global */ var g_gfxPickupFlag1 = globalVar("g_gfxPickupFlag1");
  /* global */ var g_gfxPickupFlag2 = globalVar("g_gfxPickupFlag2");
  callMethod("setRedScore", meProp(_me, "m_piratesBar"), 0)
  callMethod("setBlueScore", meProp(_me, "m_piratesBar"), 0)
  callMethod("setRedVault", meProp(_me, "m_piratesBar"), 0)
  callMethod("setBlueVault", meProp(_me, "m_piratesBar"), 0)
  callMethod("SetTeam1Wins", meProp(_me, "m_piratesBar"), 0, 0)
  callMethod("showVault", meProp(_me, "m_piratesBar"), callMethod("GetParam", meProp(_me, "m_myShip"), "Team"))
  setMeProp(_me, "m_bMessageBarInitialized", 1);
}

