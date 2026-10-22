-- Behavior
property m_sName
property m_sDescription
property m_sDescription2
property m_sMusic
property m_iStartTime
property m_iQualifiedPercent
property m_ar_mp_selector
property m_sVisualBackground
property m_sVisualForegroundMask
property m_sVisualLightMask
property m_sVisualInterfaceMask
property m_iVisualBufferHeight
property m_iVisualFlashBrightness
property m_iVisualFlashDim
property m_fVisualIconSize
property m_iComboReward
property m_f3DViewPlaneDistance
property m_f3DNearClip
property m_f3DFarClip
property m_f3DViewMu
property m_i3DParticleLimit
property m_i3DEmitterLimit
property m_f3DGravity
property m_fLaunchZTilt
property m_fLaunchSidewaysRandom
property m_fLaunchZRandom
property m_iLookFeelInstructionsPause
property m_iLookFeelLevelChangePause
property m_iLookFeelGameOverPause
property m_iLookFeelHighScorePause
property m_iLookFeelNumHighScores
property m_ar_level
property m_ar_bonus
property m_iChecksum
property m_iMagic

on construct me
  m_sName = EMPTY
  m_iChecksum = 0
  m_iMagic = 38342
  m_iComboReward = 0
  return 1
end
on deconstruct me
  return 1
end
on LoadXML me, i_sDocument
  m_iChecksum = 0
  m_iComboReward = 0
  t_rXML = CreateXML(getMember(i_sDocument).text)
  tRoot = t_rXML.GetRoot()
  if t_rXML.Search("type", "FIREWORKS", 0) then
    tRootXML = CreateXML()
    tRootXML.copy(t_rXML.GetNode())
    m_sName = t_rXML.GetParam("STAGE")
    m_iStartTime = t_rXML.GetParam("STARTTIME")
    m_iQualifiedPercent = value(t_rXML.GetParam("QUALIFIEDPERCENT"))
    tRootXML.GetRoot()
    repeat with tChild in tRootXML[1][#child]
      if tChild[#type] = "VISUAL" then
        m_sVisualBackground = tChild[#param]["BACKGROUND"]
        m_sVisualForegroundMask = tChild[#param]["FGMASK"]
        m_sVisualLightMask = tChild[#param]["LIGHTMASK"]
        m_sVisualInterfaceMask = tChild[#param]["INTERFACEMASK"]
        m_iVisualBufferHeight = value(tChild[#param]["BUFFERHEIGHT"])
        m_iVisualFlashBrightness = value(tChild[#param]["FLASHBRIGHTNESS"])
        m_iVisualFlashDim = value(tChild[#param]["FLASHDIM"])
        m_sDescription = tChild[#param]["DESCRIPTION"]
        m_sDescription2 = tChild[#param]["DESCRIPTION2"]
        m_fVisualIconSize = 1.0
      end if
      if tChild[#type] = "THREEDEE" then
        m_f3DViewPlaneDistance = value(tChild[#param]["VPD"])
        m_f3DNearClip = value(tChild[#param]["NEARCLIP"])
        m_f3DFarClip = value(tChild[#param]["FARCLIP"])
        m_f3DViewMu = value(tChild[#param]["MU"])
        m_i3DParticleLimit = value(tChild[#param]["PARTICLELIMIT"])
        m_i3DEmitterLimit = value(tChild[#param]["EMITTERLIMIT"])
        m_f3DGravity = value(tChild[#param]["GRAVITY"])
      end if
      if tChild[#type] = "LAUNCH" then
        m_fLaunchZTilt = value(tChild[#param]["ZTILT"])
        m_fLaunchSidewaysRandom = value(tChild[#param]["SIDEWAYSRANDOM"])
        m_fLaunchZRandom = value(tChild[#param]["ZRANDOM"])
      end if
      if tChild[#type] = "LOOKNFEEL" then
        m_iLookFeelInstructionsPause = value(tChild[#param]["INSTRUCTIONSPAUSE"])
        m_iLookFeelLevelChangePause = value(tChild[#param]["LEVELCHANGEPAUSE"])
        m_iLookFeelGameOverPause = value(tChild[#param]["GAMEOVERPAUSE"])
        m_iLookFeelHighScorePause = value(tChild[#param]["HIGHSCOREPAUSE"])
        m_iLookFeelNumHighScores = value(tChild[#param]["NUMHIGHSCORES"])
      end if
      if tChild[#type] = "SELECTOR" then
        m_ar_mp_selector = []
        repeat with i = 1 to tChild[#child].count()
          tEntry = tChild[#child][i]
          case tEntry[#type] of
            "ICON":
              m_ar_mp_selector.append([#type: tEntry[#param]["TYPE"], #name: tEntry[#param]["NAME"]])

          end case
        end repeat
      end if
      if tChild[#type] = "LEVEL" then
        m_sMusic = tChild[#param]["MUSIC"]
        m_iComboReward = value(tChild[#param]["COMBOREWARD"])
      end if
    end repeat
    m_iChecksum = bitXor(m_iChecksum, m_iMagic)
  end if
end
on getSelectorPayload me, a_iType
  repeat with t_rSelector in m_ar_mp_selector
    if integer(t_rSelector[#type]) = a_iType then
      return t_rSelector[#name]
    end if
  end repeat
  return EMPTY
end
on loadServerParameters me, i_ar_params
  m_ar_bonus = i_ar_params[#bonus]
  m_ar_level = []
  repeat with i = 1 to i_ar_params[#shots].count
    tEntry = i_ar_params[#shots][i]
    m_ar_level.append([#t: tEntry[#shotTimeInMsecs] / 1000.0, #f: me.getSelectorPayload(tEntry[#type]), #pos: vector(tEntry[#x], tEntry[#y], tEntry[#z]), #id: tEntry[#shotId], #type: tEntry[#type]])
    me.AddToChecksum(tEntry[#shotTimeInMsecs] * 100)
    me.AddToChecksum(me.getSelectorPayload(tEntry[#type]).length)
    me.AddToChecksum(tEntry[#x])
    me.AddToChecksum(tEntry[#y])
    me.AddToChecksum(tEntry[#z])
  end repeat
end
on GetVisualBackground me
  return m_sVisualBackground
end
on GetVisualForegroundMask me
  return m_sVisualForegroundMask
end
on GetVisualLightMask me
  return m_sVisualLightMask
end
on GetVisualInterfaceMask me
  return m_sVisualInterfaceMask
end
on GetVisualBufferHeight me
  return m_iVisualBufferHeight
end
on GetVisualFlashBrightness me
  return m_iVisualFlashBrightness
end
on GetVisualFlashDim me
  return m_iVisualFlashDim
end
on GetVisualIconSize me
  return m_fVisualIconSize
end
on Get3DViewPlaneDistance me
  return m_f3DViewPlaneDistance
end
on Get3DNearClip me
  return m_f3DNearClip
end
on Get3DFarClip me
  return m_f3DFarClip
end
on Get3DViewMu me
  return m_f3DViewMu
end
on Get3DParticleLimit me
  return m_i3DParticleLimit
end
on Get3DEmitterLimit me
  return m_i3DEmitterLimit
end
on Get3DGravity me
  return m_f3DGravity
end
on GetLaunchZTilt me
  return m_fLaunchZTilt
end
on GetLaunchSidewaysRandom me
  return m_fLaunchSidewaysRandom
end
on GetLaunchZRandom me
  return m_fLaunchZRandom
end
on GetLookFeelInstructionsPause me
  return m_iLookFeelInstructionsPause
end
on GetLookFeelLevelChangePause me
  return m_iLookFeelLevelChangePause
end
on GetLookFeelGameOverPause me
  return m_iLookFeelGameOverPause
end
on GetLookFeelHighScorePause me
  return m_iLookFeelHighScorePause
end
on GetLookFeelNumHighScores me
  return m_iLookFeelNumHighScores
end
on GetLevel me
  return m_ar_level
end
on GetBonusCombination me
  return m_ar_bonus
end
on GetComboReward me
  return m_iComboReward
end
on GetDescription me
  return m_sDescription
end
on GetDescription2 me
  return m_sDescription2
end
on GetSelectorContent me
  return m_ar_mp_selector
end
on GetMusic me
  return m_sMusic
end
on GetStartTime me
  return m_iStartTime
end
on GetQualifiedPercent me
  return m_iQualifiedPercent
end
on GetChecksum me
  return m_iChecksum
end
on AddToChecksum me, a_value
  m_iChecksum = m_iChecksum + 3 + integer(a_value)
end