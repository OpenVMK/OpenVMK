// vmk_pirates_minigame.cct / Profiler / ProfilerReset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ProfilerReset(_me: LingoMe) {
  /* global */ var g_profShipFactorAcc = globalVar("g_profShipFactorAcc");
  /* global */ var g_profCannonballFactorAcc = globalVar("g_profCannonballFactorAcc");
  /* global */ var g_profCloudFactorAcc = globalVar("g_profCloudFactorAcc");
  /* global */ var g_profShipVisualizerAcc = globalVar("g_profShipVisualizerAcc");
  /* global */ var g_profCannonballVisualizerAcc = globalVar("g_profCannonballVisualizerAcc");
  /* global */ var g_profCloudVisualizerAcc = globalVar("g_profCloudVisualizerAcc");
  /* global */ var g_profComponent = globalVar("g_profComponent");
  /* global */ var g_profInterface = globalVar("g_profInterface");
  /* global */ var g_profShipFactor = globalVar("g_profShipFactor");
  /* global */ var g_profCannonballFactor = globalVar("g_profCannonballFactor");
  /* global */ var g_profCloudFactor = globalVar("g_profCloudFactor");
  /* global */ var g_profShipVisualizer = globalVar("g_profShipVisualizer");
  /* global */ var g_profCannonballVisualizer = globalVar("g_profCannonballVisualizer");
  /* global */ var g_profCloudVisualizer = globalVar("g_profCloudVisualizer");
  /* global */ var g_profCollisionAcc = globalVar("g_profCollisionAcc");
  /* global */ var g_profCollision = globalVar("g_profCollision");
  setGlobal("g_profShipFactor", globalVar("g_profShipFactorAcc"));
  setGlobal("g_profCannonballFactor", globalVar("g_profCannonballFactorAcc"));
  setGlobal("g_profCloudFactor", globalVar("g_profCloudFactorAcc"));
  setGlobal("g_profShipVisualizer", globalVar("g_profShipVisualizerAcc"));
  setGlobal("g_profCannonballVisualizer", globalVar("g_profCannonballVisualizerAcc"));
  setGlobal("g_profCloudVisualizer", globalVar("g_profCloudVisualizerAcc"));
  setGlobal("g_profCollision", globalVar("g_profCollisionAcc"));
  setGlobal("g_profShipFactorAcc", 0);
  setGlobal("g_profCannonballFactorAcc", 0);
  setGlobal("g_profCloudFactorAcc", 0);
  setGlobal("g_profShipVisualizerAcc", 0);
  setGlobal("g_profCannonballVisualizerAcc", 0);
  setGlobal("g_profCloudVisualizerAcc", 0);
  setGlobal("g_profCollisionAcc", 0);
}

