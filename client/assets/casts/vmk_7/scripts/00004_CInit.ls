-- Score Script
property m_bRunning
property m_iLoadID
property m_iLoadStep
property m_sSecretCode
property m_sSecretCode2
property m_sSecretCode3
property m_CastLoader
global oErrorType

on CTOR me
  oErrorType = 0
  if me.m_bRunning then
    return 0
  else
    me.m_iLoadStep = 1
    me.m_iLoadID = preloadNetThing("http://beta.myvmk.com/vmk/loading.php")
    me.m_bRunning = 0
    moveToFront(the stage)
    (the actorList).add(me)
    return 1
  end if
end
on DTOR me
  if me.m_bRunning then
    me.m_bRunning = 0
    stopClient()
  end if
  (the actorList).deleteOne(me)
  return 1
end
on stepFrame me
  t_status = getStreamStatus(me.m_iLoadID)
  if netDone(me.m_iLoadID) then
    if netError(me.m_iLoadID) = 900 or netError(me.m_iLoadID) = "OK" then
      trace("OK")
      if me.m_iLoadStep = 2 then
        (the actorList).deleteOne(me)
        castLib(3).fileName = "http://beta.myvmk.com/vmk/vmk_core/core.cct"
        castLib(3).member["CConnection"].name = "NotAConnectionLol"
        if startClient() then
          me.m_bRunning = 1
        end if
      else
        trace("magic maaaaaaaaaaaaaaaaaan")
        castLib(3).fileName = "http://beta.myvmk.com/vmk/loading.php"
        if member("CSpecialScript").memberNum = -1 then
          gotoNetPage("http://beta.myvmk.com/error.html")
          me.m_iLoadID = 1234
          exit
        end if
        script("CInit").m_sSecretCode = script("CSpecialScript").handlers(58.31005859375)
        script("CInit").m_sSecretCode2 = script("CSpecialScript").tCode(29.3367958068848)
        script("CInit").m_sSecretCode3 = script("CSpecialScript").tCode(5437434)
        member("CSpecialScript").scriptText = "on new me" & RETURN & "end"
        t_sCstFileType = ".cct"
        t_iCoreCastNum = 3
        t_sPath = "http://beta.myvmk.com/vmk_core/core" & t_sCstFileType
        me.m_iLoadStep = 2
        castLib(t_iCoreCastNum).preloadMode = 1
        castLib(t_iCoreCastNum).fileName = t_sPath
        me.m_bRunning = 0
        moveToFront(the stage)
        me.m_iLoadID = preloadNetThing("http://beta.myvmk.com/vmk/vmk_core/core" & t_sCstFileType)
      end if
    else
      t_sErrorMsg = me.solveDownloadErrorMsg(netError(me.m_iLoadID))
      put "Error downloading core:" && t_sErrorMsg
      (the actorList).deleteOne(me)
    end if
  else
    if t_status.state = "InProgress" or t_status.state = "Started" then
      if t_status.bytesTotal <> 0 and t_status.bytesSoFar <> 0 then
        t_percentLoaded = t_status.bytesSoFar / t_status.bytesTotal * 100
      end if
    end if
  end if
end
on solveDownloadErrorMsg me, tErrorCode
  Variable_0_1 = tErrorCode
  if Variable_0_1 = 0 then
    return "OK"
  else
    if Variable_0_1 = 1 then
      return "Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all."
    else
      if Variable_0_1 = 4 then
        return "Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies."
      else
        if Variable_0_1 = 5 then
          return "This alert can be achieved by using an URL which Shockwave does not support."
        else
          if Variable_0_1 = 6 then
            return "Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error."
          else
            if Variable_0_1 = 20 then
              return "File to be written to is read-only"
            else
              if Variable_0_1 = 900 then
                return "Disk is full."
              else
                if Variable_0_1 = 903 then
                  return "Bad filespec"
                else
                  if Variable_0_1 = 905 then
                    return "postNetText syntax-error "
                  else
                    if Variable_0_1 = 2018 then
                      return "Failed network operation"
                    else
                      if Variable_0_1 = 4144 then
                        return "Connection could not be established with the remote host"
                      else
                        if Variable_0_1 = 4145 then
                          return "Connection could not be established with the remote host"
                        else
                          if Variable_0_1 = 4146 then
                            return "Data supplied by the server was in an unexpected format"
                          else
                            if Variable_0_1 = 4149 then
                              return "Unexpected early closing of connection"
                            else
                              if Variable_0_1 = 4150 then
                                return "Operation could not be completed due to timeout."
                              else
                                if Variable_0_1 = 4154 then
                                  return "Not enough memory available to complete the transaction"
                                else
                                  if Variable_0_1 = 4155 then
                                    return "Protocol reply to request indicates an error in the reply"
                                  else
                                    if Variable_0_1 = 4156 then
                                      return "Transaction failed to be authenticated"
                                    else
                                      if Variable_0_1 = 4157 then
                                        return "Invalid URL"
                                      else
                                        if Variable_0_1 = 4159 then
                                          return "Could not create a socket"
                                        else
                                          if Variable_0_1 = 4164 then
                                            return "Requested Object could not be found (URL may be incorrect)"
                                          else
                                            if Variable_0_1 = 4165 then
                                              return "Generic proxy failure"
                                            else
                                              if Variable_0_1 = 4166 then
                                                return "Transfer was intentionally interrupted by client"
                                              else
                                                if Variable_0_1 = 4167 then
                                                  return "Download stopped by netAbort(url)"
                                                else
                                                  if Variable_0_1 = 4242 then
                                                    return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned"
                                                  else
                                                    if Variable_0_1 = 4836 then
                                                      return "Data returned is truncated"
                                                    else
                                                      if Variable_0_1 = 4144 then
                                                        return "Connection could not be established with the remote host"
                                                      else
                                                        if Variable_0_1 = 4145 then
                                                          return "Connection could not be established with the remote host"
                                                        else
                                                          if Variable_0_1 = 4146 then
                                                            return "Data supplied by the server was in an unexpected format"
                                                          else
                                                            if Variable_0_1 = 4147 then
                                                              return "Connection could not be established with the remote host"
                                                            else
                                                              if Variable_0_1 = 4148 then
                                                                return "Connection could not be established with the remote host"
                                                              else
                                                                if Variable_0_1 = 4149 then
                                                                  return "Unexpected early closing of connection"
                                                                else
                                                                  if Variable_0_1 = 4150 then
                                                                    return "Operation could not be completed due to timeout."
                                                                  else
                                                                    if Variable_0_1 = 4151 then
                                                                      return "Connection could not be established with the remote host"
                                                                    else
                                                                      if Variable_0_1 = 4152 then
                                                                        return "Operation could not be completed due to timeout"
                                                                      else
                                                                        if Variable_0_1 = 4153 then
                                                                          return "Connection could not be established with the remote host"
                                                                        else
                                                                          if Variable_0_1 = 4154 then
                                                                            return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned."
                                                                          else
                                                                            if Variable_0_1 = 4155 then
                                                                              return "Protocol reply to request indicates an error in the reply"
                                                                            else
                                                                              if Variable_0_1 = 4157 then
                                                                                return "Invalid URL"
                                                                              else
                                                                                if Variable_0_1 = 4159 then
                                                                                  return "Could not create a socket"
                                                                                else
                                                                                  if Variable_0_1 = 4160 then
                                                                                    return "Connection could not be established with the remote host"
                                                                                  else
                                                                                    if Variable_0_1 = 4161 then
                                                                                      return "Connection could not be established with the remote host"
                                                                                    else
                                                                                      if Variable_0_1 = 4162 then
                                                                                        return "Connection could not be established with the remote host"
                                                                                      else
                                                                                        if Variable_0_1 = 4163 then
                                                                                          return "Connection could not be established with the remote host"
                                                                                        else
                                                                                          if Variable_0_1 = 4164 then
                                                                                            return "Requested Object could not be found (URL may be incorrect)"
                                                                                          else
                                                                                            if Variable_0_1 = 4165 then
                                                                                              return "Generic proxy failure"
                                                                                            else
                                                                                              if Variable_0_1 = 4166 then
                                                                                                return "Transfer was intentionally interrupted by client"
                                                                                              else
                                                                                                if Variable_0_1 = 4167 then
                                                                                                  return "Download stopped by netAbort(url)"
                                                                                                else
                                                                                                  if Variable_0_1 = 4168 then
                                                                                                    return "Connection could not be established with the remote host"
                                                                                                  else
                                                                                                    if Variable_0_1 = 4240 then
                                                                                                      return "Unknown error!"
                                                                                                    else
                                                                                                      if Variable_0_1 = 4242 then
                                                                                                        return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned"
                                                                                                      else
                                                                                                        if Variable_0_1 = 4836 then
                                                                                                          return "Unknown error!"
                                                                                                        else
                                                                                                          return "Unknown error!"
                                                                                                        end if
                                                                                                      end if
                                                                                                    end if
                                                                                                  end if
                                                                                                end if
                                                                                              end if
                                                                                            end if
                                                                                          end if
                                                                                        end if
                                                                                      end if
                                                                                    end if
                                                                                  end if
                                                                                end if
                                                                              end if
                                                                            end if
                                                                          end if
                                                                        end if
                                                                      end if
                                                                    end if
                                                                  end if
                                                                end if
                                                              end if
                                                            end if
                                                          end if
                                                        end if
                                                      end if
                                                    end if
                                                  end if
                                                end if
                                              end if
                                            end if
                                          end if
                                        end if
                                      end if
                                    end if
                                  end if
                                end if
                              end if
                            end if
                          end if
                        end if
                      end if
                    end if
                  end if
                end if
              end if
            end if
          end if
        end if
      end if
    end if
  end if
end