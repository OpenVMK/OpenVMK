-- Script
global gMain
global gGlobal

on exitFrame me
  gMain = 0
  gotoNetMovie(gGlobal[#pFiles][#pGame])
end