-- Script
property m_mp_SetsToSplit
property m_mp_castList
property m_mp_CastmemberList
property m_mp_SetsAndCasts
property m_mp_MemberList
property m_mpFinalList

on construct me
  m_mp_castList = [:]
  m_mp_CastmemberList = [:]
  m_mp_SetsAndCasts = [:]
  m_mp_MemberList = [:]
  GetNeededData()
  return 1
end
on deconstruct me
  return 1
end
on GetNeededData me
  m_mp_SetsToSplit = [:]
  t_mp_AllSets = getVariable("AllAvailableSets")
  if listp(t_mp_AllSets) then
    repeat with i = 1 to t_mp_AllSets.count
      if t_mp_AllSets.getPropAt(i) <> "hd" and t_mp_AllSets.getPropAt(i) <> "hr" then
        t_mp_PartList = [:]
        repeat with e = 1 to t_mp_AllSets[i].count
          m_mp_SetsToSplit.addProp(t_mp_AllSets[i].getPropAt(e), t_mp_AllSets[i][e][1])
        end repeat
      end if
    end repeat
    repeat with i = 1 to m_mp_SetsToSplit.count
      repeat with e = 1 to m_mp_SetsToSplit[i].count
        t_sName = m_mp_SetsToSplit[i].getPropAt(e) & "_" & m_mp_SetsToSplit[i][e]
        t_iPos = m_mp_MemberList.findPos(t_sName)
        t_sSetId = m_mp_SetsToSplit.getPropAt(i)
        if t_iPos = 0 then
          m_mp_MemberList.addProp(t_sName, [t_sSetId])
          next repeat
        end if
        m_mp_MemberList[t_iPos].add(t_sSetId)
      end repeat
    end repeat
  end if
end
on Generatecasts me, a_sPart, a_iUpToNumber, a_iMemberToCast
  e = 0
  f = 0
  t_iMod = a_iUpToNumber mod a_iMemberToCast
  t_iListAmount = a_iUpToNumber / a_iMemberToCast
  e = 1
  repeat with i = 1 to t_iListAmount
    me.ListAllGraphics(a_sPart, e, e + a_iMemberToCast - 1)
    e = e + a_iMemberToCast
  end repeat
  if t_iMod > 0 then
    me.ListAllGraphics(a_sPart, e, e + t_iMod)
  end if
  me.AssignCasts()
end
on ListAllGraphics me, a_sPart, a_i1, a_i2
  m_mp_castList = [:]
  t_sCastName = "vmk_avatar_" & a_sPart & "_" & a_i1 & "_" & a_i2
  t_ar_PartList = []
  t_ar_PartList.add(a_sPart)
  case a_sPart of
    "lpn":
      t_ar_PartList.add("rpn")
      t_sCastName = "vmk_avatar_pn_" & a_i1 & "_" & a_i2
    "lsh":
      t_ar_PartList.add("rsh")
      t_sCastName = "vmk_avatar_sh_" & a_i1 & "_" & a_i2
    "ch":
      t_ar_PartList.add("ch2")
      t_sCastName = "vmk_avatar_ch_" & a_i1 & "_" & a_i2
    "ls":
      t_ar_PartList.add("rs")
      t_sCastName = "vmk_avatar_s_" & a_i1 & "_" & a_i2
    "rpn":
      t_ar_PartList.add("lpn")
      t_sCastName = "vmk_avatar_pn_" & a_i1 & "_" & a_i2
    "rsh":
      t_ar_PartList.add("lsh")
      t_sCastName = "vmk_avatar_sh_" & a_i1 & "_" & a_i2
    "ch2":
      t_ar_PartList.add("ch")
      t_sCastName = "vmk_avatar_ch_" & a_i1 & "_" & a_i2
    "rs":
      t_ar_PartList.add("ls")
      t_sCastName = "vmk_avatar_s_" & a_i1 & "_" & a_i2

  end case
  m_mp_castList.addProp(t_sCastName, [])
  repeat with u = 1 to t_ar_PartList.count
    a_sPart = t_ar_PartList[u]
    repeat with i = a_i1 to a_i2
      m_mp_SetsAndCasts.addProp(a_sPart & "_" & i, t_sCastName)
      repeat with e = 0 to 4
        t_sName = "std_" & a_sPart & "_" & i & "_" & e & "_0"
        if memberExists(t_sName) then
          m_mp_castList[t_sCastName].add(t_sName)
        end if
        t_sName = "sit_" & a_sPart & "_" & i & "_" & e & "_0"
        if memberExists(t_sName) then
          m_mp_castList[t_sCastName].add(t_sName)
        end if
        repeat with f = 0 to 1
          t_sName = "drk_" & a_sPart & "_" & i & "_" & e & "_" & f
          if memberExists(t_sName) then
            m_mp_castList[t_sCastName].add(t_sName)
          end if
        end repeat
        repeat with f = 0 to 1
          t_sName = "wav_" & a_sPart & "_" & i & "_" & e & "_" & f
          if memberExists(t_sName) then
            m_mp_castList[t_sCastName].add(t_sName)
          end if
        end repeat
        repeat with f = 0 to 3
          t_sName = "wlk_" & a_sPart & "_" & i & "_" & e & "_" & f
          if memberExists(t_sName) then
            m_mp_castList[t_sCastName].add(t_sName)
          end if
        end repeat
      end repeat
    end repeat
  end repeat
  if m_mp_castList[1].count > 0 then
    me.SplitItems(m_mp_castList.getPropAt(1), m_mp_castList)
  end if
end
on SplitItems me, a_sNewCastName, a_mpMemberList
  tItemMembers = a_mpMemberList
  tItemMembers.sort()
  tEmptyCast = _movie.castLib["vmk_furni_exporter"]
  t_ec = tEmptyCast.number
  tEmptyCastFilename = castLib(t_ec).fileName
  tEmptyCastName = castLib(t_ec).name
  repeat with i = 1 to tItemMembers.count
    castLib(t_ec).name = a_sNewCastName
    repeat with n = 1 to tItemMembers[i].count
      tTarget = member(castLib(t_ec).findEmpty(), t_ec).number
      getMember(tItemMembers[i][n]).duplicate(25)
      castLib(1).member[25].move(tTarget)
      getMember(tItemMembers[i][n]).erase()
    end repeat
    tFileName = the moviePath & castLib(t_ec).name & ".cst"
    put "Saving " & tFileName & " ..."
    castLib(t_ec).save(tFileName)
    repeat with t = castLib(t_ec).member.count down to 1
      castLib(t_ec).member[t].erase()
    end repeat
  end repeat
  t_ec = tEmptyCast.number
  tEmptyCastFilename = "vmk_furni_exporter.cst"
  tEmptyCastName = "vmk_furni_exporter"
  castLib(t_ec).name = tEmptyCastName
  castLib(t_ec).fileName = tEmptyCastFilename
end
on AssignCasts me
  t_mp_SetAndCasts = [:]
  repeat with i = 1 to m_mp_SetsAndCasts.count
    t_sMemberID = m_mp_SetsAndCasts.getPropAt(i)
    t_sCastName = m_mp_SetsAndCasts[i]
    t_ar_Sets = m_mp_MemberList[t_sMemberID]
    if listp(t_ar_Sets) then
      repeat with e = 1 to t_ar_Sets.count
        t_sSetId = t_ar_Sets[e]
        t_iPos = t_mp_SetAndCasts.findPos(t_sSetId)
        if t_iPos = 0 then
          t_mp_SetAndCasts.addProp(t_sSetId, [t_sCastName])
          next repeat
        end if
        if t_mp_SetAndCasts[t_sSetId].findPos(t_sCastName) = 0 then
          t_mp_SetAndCasts[t_sSetId].add(t_sCastName)
        end if
      end repeat
    end if
  end repeat
  m_mpFinalList = t_mp_SetAndCasts
  put "assigned.."
end
on UpdateList me
  m_mpFinalList.sort()
  t_sTxt = getMember("listaa").text
  t_sTxt = t_sTxt & RETURN & RETURN & m_mpFinalList
  getMember("listaa").text = t_sTxt
end