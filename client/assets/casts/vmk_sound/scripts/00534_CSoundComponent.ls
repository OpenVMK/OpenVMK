-- Script
on construct me
  registerMessage(#Initialize, me.getID(), #AllCastsDone)
  registerMessage(#set_AllSoundsOn, me.getID(), #setAllSoundsOn)
  registerMessage(#set_MusicOn, me.getID(), #setMusicOn)
  registerMessage(#set_FxOn, me.getID(), #setFxOn)
  registerMessage(#set_AllSoundsOff, me.getID(), #setAllSoundsOff)
  registerMessage(#set_MusicOff, me.getID(), #setMusicOff)
  registerMessage(#set_FxOff, me.getID(), #setFxOff)
  registerMessage(#adjustVolume_allSounds, me.getID(), #adjustVolumeAllSounds)
  registerMessage(#adjustVolume_music, me.getID(), #adjustVolumeMusic)
  registerMessage(#adjustVolume_fx, me.getID(), #adjustVolumeFx)
  registerMessage("PlayInterfaceSound", me.getID(), #InterfaceSnd)
  registerMessage("PlayFxSound", me.getID(), #FxSnd)
  return 1
end
on deconstruct me
  unregisterMessage(#set_AllSoundsOn)
  unregisterMessage(#set_MusicOn)
  unregisterMessage(#set_FxOn)
  unregisterMessage(#set_AllSoundsOff)
  unregisterMessage(#set_MusicOff)
  unregisterMessage(#set_FxOff)
  unregisterMessage(#adjustVolume_allSounds)
  unregisterMessage(#adjustVolume_music)
  unregisterMessage(#adjustVolume_fx)
  unregisterMessage("PlayInterfaceSound")
  unregisterMessage("PlayFxSound")
  removeObject("SoundChannelAllocator")
  return 1
end
on AllCastsDone me
  me.setAllSoundsOn()
  createObject("SoundTracker", "CSoundTracker")
  t_Obj = createObject("SoundChannelAllocator", "CSoundChannelAllocator")
  t_Obj.Define()
end
on setAllSoundsOn me
  if objectExists(#session) then
    getObject(#session).set("music", 1)
    getObject(#session).set("fx", 1)
    getObject(#session).set("ui", 1)
    getObject(#session).set("volume", 240)
  end if
end
on setMusicOn me
  if objectExists(#session) then
    getObject(#session).set("music", 1)
  end if
end
on setUiSoundOn me
  if objectExists(#session) then
    getObject(#session).set("ui", 1)
  end if
end
on setFxOn me
  if objectExists(#session) then
    getObject(#session).set("fx", 1)
  end if
end
on setAllSoundsOff me
  if objectExists(#session) then
    getObject(#session).set("fx", 0)
    getObject(#session).set("ui", 0)
    getObject(#session).set("music", 0)
    getObject(#session).set("volume", 0)
  end if
end
on setMusicOff me
  if objectExists(#session) then
    getObject(#session).set("music", 0)
  end if
end
on setFxOff me
  if objectExists(#session) then
    getObject(#session).set("fx", 0)
  end if
end
on setUiSoundOff me
  if objectExists(#session) then
    getObject(#session).set("ui", 0)
  end if
end
on InterfaceSnd me, a_sSoundName
  t_bUiSnd = getObject(#session).get("ui")
  if t_bUiSnd then
    t_Obj = createObject(#temp, "CSoundObject")
    t_Obj.Define(a_sSoundName)
    t_Obj.SetSoundType("ui")
    t_Obj.PlaySound()
  end if
end
on FxSnd me, a_sSoundName, a_sParam, a_mp_Data
  t_bUiSnd = getObject(#session).get("fx")
  if t_bUiSnd then
    t_Obj = createObject(#temp, "CSoundObject")
    t_Obj.Define(a_sSoundName)
    t_Obj.SetSoundType("fx")
    if a_sParam <> VOID then
      t_Obj.SetParameter("cut")
    end if
    t_Obj.PlaySound()
    if listp(a_mp_Data) then
      a_mp_Data[#obj] = t_Obj
    end if
  end if
end
on adjustVolumeAllSounds me, a_iAmount
  getObject(#session).set("volume", a_iAmount)
end