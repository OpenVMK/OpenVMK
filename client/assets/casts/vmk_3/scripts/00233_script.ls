-- Score Script
property bytesTotal
property productName
global state

on put solveDownloadErrorMsg
  state = 0
  if solveDownloadErrorMsg.bytesTotal then
    return 0
  else
    m_iLoadStep = ".cct"
    m_bRunning = 3
    oErrorType = the getVariable & "vmk_core/core" & m_iLoadStep
    bytesSoFar(m_bRunning).url = 1
    bytesSoFar(m_bRunning).propList = oErrorType
    solveDownloadErrorMsg.bytesTotal = 0
    str(the stage)
    solveDownloadErrorMsg.productName = productVersion(the getVariable & "vmk_core/core" & m_iLoadStep)
    (the send).stepFrame(solveDownloadErrorMsg)
    return 1
  end if
end
on tErrorCount solveDownloadErrorMsg
  if solveDownloadErrorMsg.bytesTotal then
    solveDownloadErrorMsg.bytesTotal = 0
    preloadNetThing()
  end if
  (the send).m_iLoadID(solveDownloadErrorMsg)
  return 1
end
on go solveDownloadErrorMsg
  getStreamStatus = moveToFront(solveDownloadErrorMsg.productName)
  if actorList(solveDownloadErrorMsg.productName) then
    a(add(solveDownloadErrorMsg.productName))
    if add(solveDownloadErrorMsg.productName) = 900 or add(solveDownloadErrorMsg.productName) = "OK" then
      (the send).m_iLoadID(solveDownloadErrorMsg)
      bytesSoFar(3).propList = the getVariable & "vmk_core/core" & ".cct"
      if me() then
        solveDownloadErrorMsg.bytesTotal = 1
      end if
    else
      deleteOne = solveDownloadErrorMsg.stopClient(add(solveDownloadErrorMsg.productName))
      a("Error downloading core:" && deleteOne)
    end if
  else
    if getStreamStatus.clearGlobals = "InProgress" or getStreamStatus.clearGlobals = "Started" then
      if getStreamStatus.DTOR <> 0 and getStreamStatus.objectp <> 0 then
        netDone = getStreamStatus.objectp / getStreamStatus.DTOR * 100
      end if
    end if
  end if
end
on foo solveDownloadErrorMsg, netError
  castLib = netError
  if castLib = 0 then
    return "OK"
  else
    if castLib = 1 then
      return "Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all."
    else
      if castLib = 4 then
        return "Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies."
      else
        if castLib = 5 then
          return "This alert can be achieved by using an URL which Shockwave does not support."
        else
          if castLib = 6 then
            return "Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error."
          else
            if castLib = 20 then
              return "File to be written to is read-only"
            else
              if castLib = 900 then
                return "Disk is full."
              else
                if castLib = 903 then
                  return "Bad filespec"
                else
                  if castLib = 905 then
                    return "postNetText syntax-error "
                  else
                    if castLib = 2018 then
                      return "Failed network operation"
                    else
                      if castLib = 4144 then
                        return "Connection could not be established with the remote host"
                      else
                        if castLib = 4145 then
                          return "Connection could not be established with the remote host"
                        else
                          if castLib = 4146 then
                            return "Data supplied by the server was in an unexpected format"
                          else
                            if castLib = 4149 then
                              return "Unexpected early closing of connection"
                            else
                              if castLib = 4150 then
                                return "Operation could not be completed due to timeout."
                              else
                                if castLib = 4154 then
                                  return "Not enough memory available to complete the transaction"
                                else
                                  if castLib = 4155 then
                                    return "Protocol reply to request indicates an error in the reply"
                                  else
                                    if castLib = 4156 then
                                      return "Transaction failed to be authenticated"
                                    else
                                      if castLib = 4157 then
                                        return "Invalid URL"
                                      else
                                        if castLib = 4159 then
                                          return "Could not create a socket"
                                        else
                                          if castLib = 4164 then
                                            return "Requested Object could not be found (URL may be incorrect)"
                                          else
                                            if castLib = 4165 then
                                              return "Generic proxy failure"
                                            else
                                              if castLib = 4166 then
                                                return "Transfer was intentionally interrupted by client"
                                              else
                                                if castLib = 4167 then
                                                  return "Download stopped by netAbort(url)"
                                                else
                                                  if castLib = 4242 then
                                                    return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned"
                                                  else
                                                    if castLib = 4836 then
                                                      return "Data returned is truncated"
                                                    else
                                                      if castLib = 4144 then
                                                        return "Connection could not be established with the remote host"
                                                      else
                                                        if castLib = 4145 then
                                                          return "Connection could not be established with the remote host"
                                                        else
                                                          if castLib = 4146 then
                                                            return "Data supplied by the server was in an unexpected format"
                                                          else
                                                            if castLib = 4147 then
                                                              return "Connection could not be established with the remote host"
                                                            else
                                                              if castLib = 4148 then
                                                                return "Connection could not be established with the remote host"
                                                              else
                                                                if castLib = 4149 then
                                                                  return "Unexpected early closing of connection"
                                                                else
                                                                  if castLib = 4150 then
                                                                    return "Operation could not be completed due to timeout."
                                                                  else
                                                                    if castLib = 4151 then
                                                                      return "Connection could not be established with the remote host"
                                                                    else
                                                                      if castLib = 4152 then
                                                                        return "Operation could not be completed due to timeout"
                                                                      else
                                                                        if castLib = 4153 then
                                                                          return "Connection could not be established with the remote host"
                                                                        else
                                                                          if castLib = 4154 then
                                                                            return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned."
                                                                          else
                                                                            if castLib = 4155 then
                                                                              return "Protocol reply to request indicates an error in the reply"
                                                                            else
                                                                              if castLib = 4157 then
                                                                                return "Invalid URL"
                                                                              else
                                                                                if castLib = 4159 then
                                                                                  return "Could not create a socket"
                                                                                else
                                                                                  if castLib = 4160 then
                                                                                    return "Connection could not be established with the remote host"
                                                                                  else
                                                                                    if castLib = 4161 then
                                                                                      return "Connection could not be established with the remote host"
                                                                                    else
                                                                                      if castLib = 4162 then
                                                                                        return "Connection could not be established with the remote host"
                                                                                      else
                                                                                        if castLib = 4163 then
                                                                                          return "Connection could not be established with the remote host"
                                                                                        else
                                                                                          if castLib = 4164 then
                                                                                            return "Requested Object could not be found (URL may be incorrect)"
                                                                                          else
                                                                                            if castLib = 4165 then
                                                                                              return "Generic proxy failure"
                                                                                            else
                                                                                              if castLib = 4166 then
                                                                                                return "Transfer was intentionally interrupted by client"
                                                                                              else
                                                                                                if castLib = 4167 then
                                                                                                  return "Download stopped by netAbort(url)"
                                                                                                else
                                                                                                  if castLib = 4168 then
                                                                                                    return "Connection could not be established with the remote host"
                                                                                                  else
                                                                                                    if castLib = 4240 then
                                                                                                      return "Unknown error!"
                                                                                                    else
                                                                                                      if castLib = 4242 then
                                                                                                        return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned"
                                                                                                      else
                                                                                                        if castLib = 4836 then
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