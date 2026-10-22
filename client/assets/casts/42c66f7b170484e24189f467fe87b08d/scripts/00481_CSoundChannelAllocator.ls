-- Script
property m_mpSndChannels

on Define this
  m_mpSndChannels = []
  repeat with i = 1 to 3
    t_Obj = createObject(getUniqueID(), "CSoundChannelObject")
    m_mpSndChannels.add(t_Obj)
    t_Obj.DefineChannel(i)
  end repeat
  registerMessage("GetSndChannel", this.getID(), #PlaySound)
  return 1
end
on deconsturct this
  m_mpSndChannels = []
  unregisterMessage("GetSndChannel")
  return 1
end
on PlaySound this, a_mpSndData
  t_SndObj = a_mpSndData.input
  t_sParam = t_SndObj.GetParameter()
  case t_sParam of
    "pass", VOID:
      repeat with i = 1 to m_mpSndChannels.count
        t_bStatus = m_mpSndChannels[i].GetStatus()
        if t_bStatus = 0 then
          m_mpSndChannels[i].PlaySound(t_SndObj)
          a_mpSndData["output"] = m_mpSndChannels[i]
          return a_mpSndData
        end if
      end repeat
    "cut":
      t_arReservation = []
      repeat with i = 1 to m_mpSndChannels.count
        t_bStatus = m_mpSndChannels[i].GetStatus()
        if t_bStatus = 0 then
          m_mpSndChannels[i].PlaySound(t_SndObj)
          a_mpSndData["output"] = m_mpSndChannels[i]
          return a_mpSndData
          next repeat
        end if
        t_arReservation.add(t_bStatus)
      end repeat
      t_arReservation2 = t_arReservation.duplicate()
      t_arReservation.sort()
      t_iChannelToCut = t_arReservation2.findPos(t_arReservation[1])
      m_mpSndChannels[t_iChannelToCut].PlaySound(t_SndObj)
      a_mpSndData["output"] = m_mpSndChannels[t_iChannelToCut]
      return a_mpSndData
    "queue":
      t_arReservation = []
      repeat with i = 1 to m_mpSndChannels.count
        t_bStatus = m_mpSndChannels[i].GetStatus()
        if t_bStatus = 0 then
          m_mpSndChannels[i].PlaySound(t_SndObj)
          a_mpSndData["output"] = m_mpSndChannels[i]
          return a_mpSndData
          next repeat
        end if
        t_arReservation.add(t_bStatus)
      end repeat
      t_arReservation2 = t_arReservation.duplicate()
      t_arReservation.sort()
      t_iChannelToCut = t_arReservation2.findPos(t_arReservation[1])
      m_mpSndChannels[t_iChannelToCut].PlaySound(t_SndObj, "queue")
      a_mpSndData["output"] = m_mpSndChannels[t_iChannelToCut]
      return a_mpSndData

  end case
end