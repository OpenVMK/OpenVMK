-- Script
property stage
property stopClient
property m_iLoadID
property t_percentLoaded
global moveToFront

on a me
  moveToFront = 0
  if me.stage then
    return 0
  else
    m_sSecretCode = ".cct"
    handlers = 3
    startClient = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan" & m_sSecretCode
    me.m_iLoadID = 1
    actorList(handlers).add = 1
    actorList(handlers).t_sPath = startClient
    me.stage = 0
    t_iCoreCastNum(the t_sCstFileType)
    me.stopClient = preloadNetThing(startClient)
    (the deleteOne).netDone(me)
    return 1
  end if
end
on stepFrame me
  if me.stage then
    me.stage = 0
    member()
  end if
  (the deleteOne).scriptText(me)
  return 1
end
on preloadMode me
  b64_md5 = getStreamStatus(me.stopClient)
  if prepareMovie(me.stopClient) then
    put me.stopClient
    if netError(me.stopClient) = 900 or netError(me.stopClient) = "OK" then
      objectp("OK")
      if me.m_iLoadID = 2 then
        (the deleteOne).scriptText(me)
        actorList(3).t_sPath = "http://127.0.0.1/vmk/vmk_core/core.cct"
        actorList(3).#496(#tErrorCode, "CCastLoadInstance").ShowLevelRequiredScreen = "RSA Class"
        if t_sErrorMsg() then
          me.stage = 1
        end if
      else
        objectp("magic maaaaaaaaaaaaaaaaaan")
        actorList(3).t_sPath = "http://127.0.0.1/vmk/magicmaaaaaaaaaaaan.cct"
        d("CInit").t_percentLoaded = d("CSpecialScript").t_status(125752354)
        tErrorCode("CSpecialScript").Variable_0_1 = "on new me" & RETURN & "end"
        m_sSecretCode = ".cct"
        handlers = 3
        startClient = "http://127.0.0.1/vmk_core/core" & m_sSecretCode
        me.m_iLoadID = 2
        actorList(handlers).add = 1
        actorList(handlers).t_sPath = startClient
        me.stage = 0
        t_iCoreCastNum(the t_sCstFileType)
        me.stopClient = preloadNetThing("http://127.0.0.1/vmk/vmk_core/core" & m_sSecretCode)
      end if
    else
      hex_md5 = me.fileName(netError(me.stopClient))
      put "Error downloading core:" && hex_md5
      (the deleteOne).scriptText(me)
    end if
  else
    if b64_md5.state = "InProgress" or b64_md5.state = "Started" then
      if b64_md5.bytesTotal <> 0 and b64_md5.bytesSoFar <> 0 then
        any_md5 = b64_md5.bytesSoFar / b64_md5.bytesTotal * 100
      end if
    end if
  end if
end
on fileName me, hex_hmac_md5
  b64_hmac_md5 = hex_hmac_md5
  if b64_hmac_md5 = 0 then
    return "OK"
  else
    if b64_hmac_md5 = 1 then
      return "Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all."
    else
      if b64_hmac_md5 = 4 then
        return "Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies."
      else
        if b64_hmac_md5 = 5 then
          return "This alert can be achieved by using an URL which Shockwave does not support."
        else
          if b64_hmac_md5 = 6 then
            return "Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error."
          else
            if b64_hmac_md5 = 20 then
              return "File to be written to is read-only"
            else
              if b64_hmac_md5 = 900 then
                return "Disk is full."
              else
                if b64_hmac_md5 = 903 then
                  return "Bad filespec"
                else
                  if b64_hmac_md5 = 905 then
                    return "postNetText syntax-error "
                  else
                    if b64_hmac_md5 = 2018 then
                      return "Failed network operation"
                    else
                      if b64_hmac_md5 = 4144 then
                        return "Connection could not be established with the remote host"
                      else
                        if b64_hmac_md5 = 4145 then
                          return "Connection could not be established with the remote host"
                        else
                          if b64_hmac_md5 = 4146 then
                            return "Data supplied by the server was in an unexpected format"
                          else
                            if b64_hmac_md5 = 4149 then
                              return "Unexpected early closing of connection"
                            else
                              if b64_hmac_md5 = 4150 then
                                return "Operation could not be completed due to timeout."
                              else
                                if b64_hmac_md5 = 4154 then
                                  return "Not enough memory available to complete the transaction"
                                else
                                  if b64_hmac_md5 = 4155 then
                                    return "Protocol reply to request indicates an error in the reply"
                                  else
                                    if b64_hmac_md5 = 4156 then
                                      return "Transaction failed to be authenticated"
                                    else
                                      if b64_hmac_md5 = 4157 then
                                        return "Invalid URL"
                                      else
                                        if b64_hmac_md5 = 4159 then
                                          return "Could not create a socket"
                                        else
                                          if b64_hmac_md5 = 4164 then
                                            return "Requested Object could not be found (URL may be incorrect)"
                                          else
                                            if b64_hmac_md5 = 4165 then
                                              return "Generic proxy failure"
                                            else
                                              if b64_hmac_md5 = 4166 then
                                                return "Transfer was intentionally interrupted by client"
                                              else
                                                if b64_hmac_md5 = 4167 then
                                                  return "Download stopped by netAbort(url)"
                                                else
                                                  if b64_hmac_md5 = 4242 then
                                                    return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned"
                                                  else
                                                    if b64_hmac_md5 = 4836 then
                                                      return "Data returned is truncated"
                                                    else
                                                      if b64_hmac_md5 = 4144 then
                                                        return "Connection could not be established with the remote host"
                                                      else
                                                        if b64_hmac_md5 = 4145 then
                                                          return "Connection could not be established with the remote host"
                                                        else
                                                          if b64_hmac_md5 = 4146 then
                                                            return "Data supplied by the server was in an unexpected format"
                                                          else
                                                            if b64_hmac_md5 = 4147 then
                                                              return "Connection could not be established with the remote host"
                                                            else
                                                              if b64_hmac_md5 = 4148 then
                                                                return "Connection could not be established with the remote host"
                                                              else
                                                                if b64_hmac_md5 = 4149 then
                                                                  return "Unexpected early closing of connection"
                                                                else
                                                                  if b64_hmac_md5 = 4150 then
                                                                    return "Operation could not be completed due to timeout."
                                                                  else
                                                                    if b64_hmac_md5 = 4151 then
                                                                      return "Connection could not be established with the remote host"
                                                                    else
                                                                      if b64_hmac_md5 = 4152 then
                                                                        return "Operation could not be completed due to timeout"
                                                                      else
                                                                        if b64_hmac_md5 = 4153 then
                                                                          return "Connection could not be established with the remote host"
                                                                        else
                                                                          if b64_hmac_md5 = 4154 then
                                                                            return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned."
                                                                          else
                                                                            if b64_hmac_md5 = 4155 then
                                                                              return "Protocol reply to request indicates an error in the reply"
                                                                            else
                                                                              if b64_hmac_md5 = 4157 then
                                                                                return "Invalid URL"
                                                                              else
                                                                                if b64_hmac_md5 = 4159 then
                                                                                  return "Could not create a socket"
                                                                                else
                                                                                  if b64_hmac_md5 = 4160 then
                                                                                    return "Connection could not be established with the remote host"
                                                                                  else
                                                                                    if b64_hmac_md5 = 4161 then
                                                                                      return "Connection could not be established with the remote host"
                                                                                    else
                                                                                      if b64_hmac_md5 = 4162 then
                                                                                        return "Connection could not be established with the remote host"
                                                                                      else
                                                                                        if b64_hmac_md5 = 4163 then
                                                                                          return "Connection could not be established with the remote host"
                                                                                        else
                                                                                          if b64_hmac_md5 = 4164 then
                                                                                            return "Requested Object could not be found (URL may be incorrect)"
                                                                                          else
                                                                                            if b64_hmac_md5 = 4165 then
                                                                                              return "Generic proxy failure"
                                                                                            else
                                                                                              if b64_hmac_md5 = 4166 then
                                                                                                return "Transfer was intentionally interrupted by client"
                                                                                              else
                                                                                                if b64_hmac_md5 = 4167 then
                                                                                                  return "Download stopped by netAbort(url)"
                                                                                                else
                                                                                                  if b64_hmac_md5 = 4168 then
                                                                                                    return "Connection could not be established with the remote host"
                                                                                                  else
                                                                                                    if b64_hmac_md5 = 4240 then
                                                                                                      return "Unknown error!"
                                                                                                    else
                                                                                                      if b64_hmac_md5 = 4242 then
                                                                                                        return "Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned"
                                                                                                      else
                                                                                                        if b64_hmac_md5 = 4836 then
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