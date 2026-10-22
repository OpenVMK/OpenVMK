-- Script
property m_bReady
property m_LoopSnd_obj
property m_iType
property m_sSoundName

on construct this
  m_bReady = 0
  m_LoopSnd_obj = VOID
  m_iType = VOID
  m_sSoundName = EMPTY
  registerObject(getUniqueID(), this)
  registerMessage("close_Settings", this.getID(), #checkSoundSettings)
  registerMessage("countSoundItems", this.getID(), #countSoundItems)
  return 1
end
on deconstruct this
  executeMessage("StopRoomSound")
  t_ar_check = []
  executeMessage("countSoundItems", t_ar_check)
  t_iItemCount = t_ar_check.count
  if t_iItemCount > 1 then
    executeMessage("StopRoomSound")
    t_iItemNum = random(t_iItemCount - 1)
    t_ar_check[t_iItemNum].PlaySound()
    t_ar_check[t_iItemNum].update()
  else
    if t_iItemCount = 1 then
      executeMessage("StopRoomSound")
      executeMessage("LoadRoomSound")
    end if
  end if
  unregisterObject(this.getID())
  callAncestor(#deconstruct, this)
  return 1
end
on StopSound this
  executeMessage("StopRoomSound")
end
on checkSoundSettings this
  t_bMusic = getObject(#session).get("music")
  t_bFx = getObject(#session).get("fx")
  t_bUi = getObject(#session).get("ui")
  t_iVolume = getObject(#session).get("volume")
  if not t_bMusic then
    this.StopSound()
  else
    this.PlaySound()
  end if
end
on PlaySound this
  m_sSoundName = "SoundFurni" & m_iType
  if memberExists(m_sSoundName & "sound.xml") then
    executeMessage("StopRoomSound")
    executeMessage("LoadRoomSound", m_sSoundName)
  else
    m_sSoundName = EMPTY
    put "xmls are missing:" && m_sSoundName
  end if
end
on update this
  if voidp(m_iType) or m_sSoundName = EMPTY then
    m_iType = value(this.getObject().GetParam("TYPE"))
    this.PlaySound()
  end if
end
on countSoundItems this, a_ar_counter
  a_ar_counter.add(this)
end