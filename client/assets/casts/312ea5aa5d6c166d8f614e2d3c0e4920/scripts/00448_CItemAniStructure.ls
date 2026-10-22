-- Script
property m_rStructure
property m_iType

on construct me
  m_rStructure = VOID
  m_iType = VOID
  return 1
end
on deconstruct me
  if objectp(m_rStructure) then
    m_rStructure.close()
  end if
  m_rStructure = VOID
  return 1
end
on Init me, t_iType
  t_sMemName = "item." & t_iType & ".ani.xml"
  if getmemnum(t_sMemName) > 0 then
    t_rMem = getMember(t_sMemName)
    m_rStructure = CreateXML(t_rMem.text)
    return 1
  end if
  return 0
end
on GetStates me
  t_ar_states = []
  if objectp(m_rStructure) then
    t_animation = []
    if m_rStructure.Search("type", "ANI", 1) then
      repeat with tstate in m_rStructure.GetNode().child
        case tstate.type of
          "STATE":
            tPos = tstate.param.findPos("NUM")
            t_bContinue = 0
            if tPos <> 0 then
              tParamValue = value(tstate.param[tPos])
              t_ar_states.append(tParamValue)
            end if

        end case
      end repeat
    end if
  end if
  return t_ar_states
end
on GetInteractive me
  t_bInteractive = 1
  if objectp(m_rStructure) then
    if m_rStructure.Search("type", "ANI", 1) then
      t_bInteractive = value(m_rStructure.GetNode().param["INTERACTIVE"])
    end if
  end if
  return t_bInteractive
end
on getDelay me
  t_iDelay = 5
  if objectp(m_rStructure) then
    if m_rStructure.Search("type", "ANI", 1) then
      t_iMaxDelay = value(m_rStructure.GetNode().param["DELAY"])
      t_iDelay = max(1, t_iMaxDelay)
    end if
  end if
  return t_iDelay
end
on getStateProps me
  t_ar_states = []
  if objectp(m_rStructure) then
    t_animation = []
    if m_rStructure.Search("type", "ANI", 1) then
      repeat with tstate in m_rStructure.GetNode().child
        case tstate.type of
          "STATE":
            tPos = tstate.param.findPos("NUM")
            t_bContinue = 0
            if tPos <> 0 then
              tParamValue = value(tstate.param[tPos])
              t_ar_states.append(tParamValue)
            end if

        end case
      end repeat
    end if
  end if
  return t_ar_states
end
on returnAnimatedBlocks me, a_iState, a_iDirection, a_ar_props
  a_ar_props[#condition] = EMPTY
  a_ar_props[#sound] = EMPTY
  a_ar_props[#loop] = 0
  t_rXML = m_rStructure
  if objectp(t_rXML) then
    t_animation = []
    if t_rXML.Search("type", "ANI", 1) then
      t_iMaxDelay = value(t_rXML.GetNode().param["DELAY"])
      a_ar_props[#delay] = max(1, t_iMaxDelay)
      repeat with tstate in t_rXML.GetNode().child
        case tstate.type of
          "STATE":
            tPos = tstate.param.findPos("NUM")
            t_bContinue = 0
            if tPos <> 0 then
              tParamValue = value(tstate.param[tPos])
              if tParamValue = a_iState then
                t_bContinue = 1
              end if
            end if
            if t_bContinue then
              tPos = tstate.param.findPos("SOUND")
              if tPos <> 0 then
                a_ar_props[#sound] = tstate.param["SOUND"]
              end if
              tPos = tstate.param.findPos("LOOP")
              if tPos <> 0 then
                a_ar_props[#loop] = value(tstate.param["LOOP"])
              end if
              repeat with tDirection in tstate.child
                case tDirection[#type] of
                  "DIR":
                    tPos = tDirection.param.findPos("NUM")
                    t_bContinue = 0
                    if tPos <> 0 then
                      tParamValue = value(tDirection.param[tPos])
                      if tParamValue = a_iDirection then
                        t_bContinue = 1
                      end if
                    end if
                    if t_bContinue then
                      tPos = tstate.param.findPos("CONDITION")
                      if tPos <> 0 then
                        a_ar_props[#condition] = tstate.param["CONDITION"]
                      end if
                      repeat with tBlock in tDirection.child
                        case tBlock[#type] of
                          "BLK":
                            t_ar_block = [:]
                            t_ar_block[#num] = value(tBlock.param["NUM"])
                            t_ar_block[#sprites] = []
                            repeat with tSprite in tBlock.child
                              case tSprite.type of
                                "SPR":
                                  t_ar_sprite = [:]
                                  t_ar_sprite[#mode] = #playing
                                  t_ar_sprite[#num] = value(tSprite.param["NUM"])
                                  t_ar_sprite[#index] = 1
                                  t_ar_sprite[#loops] = 0
                                  t_ar_sprite[#frames] = []
                                  t_ar_sprite[#events] = [:]
                                  repeat with tKeyframe in tSprite.child
                                    case tKeyframe.type of
                                      "FRAME":
                                        t_sMem = tKeyframe.param["MEMBER"]
                                        if objectp(t_sMem) then
                                          t_rMem = t_sMem
                                        else
                                          t_rMem = getMember(t_sMem)
                                          if t_rMem.number <= 0 then
                                            put "Could not find anim-mbr" && t_sMem
                                            t_rMem = getMember("null")
                                          end if
                                          tKeyframe.param["MEMBER"] = t_rMem
                                        end if
                                        t_ar_sprite[#frames].append(t_rMem)
                                      "EVENT":
                                        t_sFrame = string(t_ar_sprite[#frames].count)
                                        t_ar_sprite[#events][t_sFrame] = tKeyframe.param["VALUE"]

                                    end case
                                  end repeat
                                  t_ar_block[#sprites].append(t_ar_sprite)

                              end case
                            end repeat
                            if t_ar_block[#sprites].count > 0 then
                              t_animation.append(t_ar_block)
                            end if

                        end case
                      end repeat
                      a_ar_props[#frames] = t_animation.duplicate()
                      return 1
                    end if

                end case
              end repeat
            end if

        end case
      end repeat
      return 0
    else
      return 0
    end if
  else
    return 0
  end if
end