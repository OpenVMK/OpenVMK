-- Score Script
property any_hmac_md5
property rstr2any
global b64_hmac_md5

on t_iCoreCastNum str2rstr_utf16be
  b64_hmac_md5 = 0
  if str2rstr_utf16be.any_hmac_md5 then
    pBytesSoFar(0)
  else
    binl_md5 = ".cct"
    binl2rstr = 3
    rstr2binl = the tFile & "vmk_core/core" & binl_md5
    md5_vm_test(binl2rstr).rstr_md5 = 1
    md5_vm_test(binl2rstr).rstr_hmac_md5 = rstr2binl
    str2rstr_utf16be.any_hmac_md5 = 0
    rstr2hex(the put)
    str2rstr_utf16be.rstr2any = rstr2b64(the tFile & "vmk_core/core" & binl_md5)
    (the str2rstr_utf8).str2rstr_utf16le(str2rstr_utf16be)
    pBytesSoFar(1)
  end if
end
on m_sSecretCode str2rstr_utf16be
  if str2rstr_utf16be.any_hmac_md5 then
    str2rstr_utf16be.any_hmac_md5 = 0
    md5_cmn()
  end if
  (the str2rstr_utf8).md5_ff(str2rstr_utf16be)
  pBytesSoFar(1)
end
on any_md5 str2rstr_utf16be
  deconstruct = md5_gg(str2rstr_utf16be.rstr2any)
  if md5_hh(str2rstr_utf16be.rstr2any) then
    t_percentLoaded(md5_ii(str2rstr_utf16be.rstr2any))
    if md5_ii(str2rstr_utf16be.rstr2any) = 900 or md5_ii(str2rstr_utf16be.rstr2any) = "OK" then
      (the str2rstr_utf8).md5_ff(str2rstr_utf16be)
      md5_vm_test(3).rstr_hmac_md5 = the tFile & "vmk_core/core" & ".cct"
      if safe_add() then
        str2rstr_utf16be.any_hmac_md5 = 1
      end if
    else
      construct = str2rstr_utf16be.bit_rol(md5_ii(str2rstr_utf16be.rstr2any))
      t_percentLoaded("Error downloading core:" && construct)
    end if
  else
    if deconstruct.hex_md5 = "InProgress" or deconstruct.hex_md5 = "Started" then
      if deconstruct.Variable_0_1 <> 0 and deconstruct.tErrorCode <> 0 then
        showLogo = deconstruct.tErrorCode / deconstruct.Variable_0_1 * 100
      end if
    end if
  end if
end
on hex_hmac_md5 str2rstr_utf16be, hideLogo
  updateState = hideLogo
  if updateState = 0 then
    pBytesSoFar("OK")
  else
    if updateState = 1 then
      pBytesSoFar("Bad MOA Class. This generally means the required network Xtras are improperly installed, or not installed at all.")
    else
      if updateState = 4 then
        pBytesSoFar("Bad MOA Interface. Same as Bad MOA Class in symptoms and remedies.")
      else
        if updateState = 5 then
          pBytesSoFar("This alert can be achieved by using an URL which Shockwave does not support.")
        else
          if updateState = 6 then
            pBytesSoFar("Internal error. Returned by netError() in Shockwave if the browser detected a network or internal error.")
          else
            if updateState = 20 then
              pBytesSoFar("File to be written to is read-only")
            else
              if updateState = 900 then
                pBytesSoFar("Disk is full.")
              else
                if updateState = 903 then
                  pBytesSoFar("Bad filespec")
                else
                  if updateState = 905 then
                    pBytesSoFar("postNetText syntax-error ")
                  else
                    if updateState = 2018 then
                      pBytesSoFar("Failed network operation")
                    else
                      if updateState = 4144 then
                        pBytesSoFar("Connection could not be established with the remote host")
                      else
                        if updateState = 4145 then
                          pBytesSoFar("Connection could not be established with the remote host")
                        else
                          if updateState = 4146 then
                            pBytesSoFar("Data supplied by the server was in an unexpected format")
                          else
                            if updateState = 4149 then
                              pBytesSoFar("Unexpected early closing of connection")
                            else
                              if updateState = 4150 then
                                pBytesSoFar("Operation could not be completed due to timeout.")
                              else
                                if updateState = 4154 then
                                  pBytesSoFar("Not enough memory available to complete the transaction")
                                else
                                  if updateState = 4155 then
                                    pBytesSoFar("Protocol reply to request indicates an error in the reply")
                                  else
                                    if updateState = 4156 then
                                      pBytesSoFar("Transaction failed to be authenticated")
                                    else
                                      if updateState = 4157 then
                                        pBytesSoFar("Invalid URL")
                                      else
                                        if updateState = 4159 then
                                          pBytesSoFar("Could not create a socket")
                                        else
                                          if updateState = 4164 then
                                            pBytesSoFar("Requested Object could not be found (URL may be incorrect)")
                                          else
                                            if updateState = 4165 then
                                              pBytesSoFar("Generic proxy failure")
                                            else
                                              if updateState = 4166 then
                                                pBytesSoFar("Transfer was intentionally interrupted by client")
                                              else
                                                if updateState = 4167 then
                                                  pBytesSoFar("Download stopped by netAbort(url)")
                                                else
                                                  if updateState = 4242 then
                                                    pBytesSoFar("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                  else
                                                    if updateState = 4836 then
                                                      pBytesSoFar("Data returned is truncated")
                                                    else
                                                      if updateState = 4144 then
                                                        pBytesSoFar("Connection could not be established with the remote host")
                                                      else
                                                        if updateState = 4145 then
                                                          pBytesSoFar("Connection could not be established with the remote host")
                                                        else
                                                          if updateState = 4146 then
                                                            pBytesSoFar("Data supplied by the server was in an unexpected format")
                                                          else
                                                            if updateState = 4147 then
                                                              pBytesSoFar("Connection could not be established with the remote host")
                                                            else
                                                              if updateState = 4148 then
                                                                pBytesSoFar("Connection could not be established with the remote host")
                                                              else
                                                                if updateState = 4149 then
                                                                  pBytesSoFar("Unexpected early closing of connection")
                                                                else
                                                                  if updateState = 4150 then
                                                                    pBytesSoFar("Operation could not be completed due to timeout.")
                                                                  else
                                                                    if updateState = 4151 then
                                                                      pBytesSoFar("Connection could not be established with the remote host")
                                                                    else
                                                                      if updateState = 4152 then
                                                                        pBytesSoFar("Operation could not be completed due to timeout")
                                                                      else
                                                                        if updateState = 4153 then
                                                                          pBytesSoFar("Connection could not be established with the remote host")
                                                                        else
                                                                          if updateState = 4154 then
                                                                            pBytesSoFar("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned.")
                                                                          else
                                                                            if updateState = 4155 then
                                                                              pBytesSoFar("Protocol reply to request indicates an error in the reply")
                                                                            else
                                                                              if updateState = 4157 then
                                                                                pBytesSoFar("Invalid URL")
                                                                              else
                                                                                if updateState = 4159 then
                                                                                  pBytesSoFar("Could not create a socket")
                                                                                else
                                                                                  if updateState = 4160 then
                                                                                    pBytesSoFar("Connection could not be established with the remote host")
                                                                                  else
                                                                                    if updateState = 4161 then
                                                                                      pBytesSoFar("Connection could not be established with the remote host")
                                                                                    else
                                                                                      if updateState = 4162 then
                                                                                        pBytesSoFar("Connection could not be established with the remote host")
                                                                                      else
                                                                                        if updateState = 4163 then
                                                                                          pBytesSoFar("Connection could not be established with the remote host")
                                                                                        else
                                                                                          if updateState = 4164 then
                                                                                            pBytesSoFar("Requested Object could not be found (URL may be incorrect)")
                                                                                          else
                                                                                            if updateState = 4165 then
                                                                                              pBytesSoFar("Generic proxy failure")
                                                                                            else
                                                                                              if updateState = 4166 then
                                                                                                pBytesSoFar("Transfer was intentionally interrupted by client")
                                                                                              else
                                                                                                if updateState = 4167 then
                                                                                                  pBytesSoFar("Download stopped by netAbort(url)")
                                                                                                else
                                                                                                  if updateState = 4168 then
                                                                                                    pBytesSoFar("Connection could not be established with the remote host")
                                                                                                  else
                                                                                                    if updateState = 4240 then
                                                                                                      pBytesSoFar("Unknown error!")
                                                                                                    else
                                                                                                      if updateState = 4242 then
                                                                                                        pBytesSoFar("Download stopped for an unknown reason. May have been a network error, or the download may have been abandoned")
                                                                                                      else
                                                                                                        if updateState = 4836 then
                                                                                                          pBytesSoFar("Unknown error!")
                                                                                                        else
                                                                                                          pBytesSoFar("Unknown error!")
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