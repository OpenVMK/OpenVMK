-- Script
property m_iConfVersion
property m_sBaseUrl
property m_mpMemNumbers

on construct this
  m_iConfVersion = 1
  m_sBaseUrl = "http://"
  m_mpMemNumbers = [:]
  return 1
end
on deconstruct this
  return 1
end
on getConfigurationForRoom this, a_iID
  if variableExists("room." & a_iID) then
    t_sDataID = getVariable("room." & a_iID)
    return getVariableValue("ls." & t_sDataID)
  else
    exit
  end if
end
on initializeUrl this, a_sUrl
  this.extractVersionFromText(a_sUrl)
end
on pullFromUrl this, a_sUrl
  if not stringp(a_sUrl) then
    return error(this, "URL string was invalid. Cannot download loading screen configuration.", #pullFromUrl)
  end if
  tMemNum = queueDownload(a_sUrl, a_sUrl, #field, 1)
  return registerDownloadCallback(tMemNum, #loadingCallback, this.getID(), a_sUrl)
end
on PullConfigurationSequential this
  t_sURL = this.GetNewUrl()
  this.pullFromUrl(t_sURL)
end
on ResourcesReady this, a_iID
  t_mpConf = this.getConfigurationForRoom(a_iID)
  repeat with i = 1 to 4
    if not voidp(t_mpConf[i].getaProp(#img)) then
      if getDownLoadPercent(t_mpConf[i][#img]) < 1.0 then
        return 0
      end if
    end if
  end repeat
  return 1
end
on loadingCallback this, a_sUrl
  dumpVariableField(a_sUrl)
  t_sText = getMember(a_sUrl).text
  repeat with i = 1 to t_sText.line.count
    t_sLine = t_sText.line[i]
    t_sSeparator = offset("=", t_sLine)
    t_arConfVal = value(chars(t_sLine, t_sSeparator + 1, t_sLine.char.count))
    if listp(t_arConfVal) then
      repeat with t_mpItemConf in t_arConfVal
        t_sImgUrl = t_mpItemConf.getaProp(#img)
        if not voidp(t_sImgUrl) then
          tMemNum = queueDownload(t_sImgUrl, t_sImgUrl, #bitmap)
          m_mpMemNumbers.setaProp(t_sImgUrl, tMemNum)
        end if
      end repeat
    end if
  end repeat
  removeMember(a_sUrl)
end
on GetMemnumForUrl this, a_sUrl
  returm(m_mpMemNumbers.getaProp(a_sUrl))
end
on extractVersionFromText this, a_sText
  repeat with i = a_sText.length down to 1
    if a_sText.char[i] = "_" then
      m_sBaseUrl = chars(a_sText, 1, i)
      m_iConfVersion = value(chars(a_sText, i + 1, a_sText.length))
      exit repeat
    end if
    if i = 1 then
      return error(this, "Unable to extract version from loadingscreen source url!")
    end if
  end repeat
end
on GetNewUrl this
  m_iConfVersion = m_iConfVersion + 1
  t_sNewUrl = m_sBaseUrl & string(m_iConfVersion)
  return t_sNewUrl
end