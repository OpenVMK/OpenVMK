-- Script
property m_st_todo
property m_st_done
property m_rActiveSubtask
property m_rInterface
property m_ar_results
property m_rOwner
property m_iLastAction

on construct me
  m_ar_results = [:]
  m_st_todo = createObject(getUniqueID(), "CStructStack")
  m_st_done = createObject(getUniqueID(), "CStructStack")
  m_rInterface = createObject(getUniqueID(), "CQuestInterface")
  m_rInterface.setManager(me)
  m_iLastAction = #none
  return 1
end
on deconstruct me
  if objectp(m_rInterface) then
    removeObject(m_rInterface.getID())
  end if
  if objectp(m_st_todo) then
    removeObject(m_st_todo.getID())
  end if
  if objectp(m_st_done) then
    removeObject(m_st_done.getID())
  end if
  return 1
end
on SetOwner me, t_rOwner
  if objectp(t_rOwner) then
    m_rOwner = t_rOwner
  end if
end
on GetOwner me
  return m_rOwner
end
on skip me, a_bScrapSubtask
  if not m_st_todo.isEmpty() then
    if a_bScrapSubtask then
      m_st_todo.pop()
    else
      m_st_done.push(m_st_todo.pop())
    end if
  end if
  m_iLastAction = #resolve
end
on Activate me
  if m_st_todo.isEmpty() then
    me.broadcastResults()
  else
    if m_iLastAction = #tryquit then
      removeObject(me.getID())
    else
      m_rActiveSubtask = m_st_todo.top()
      me.ActivateSubtaskInterface(m_rActiveSubtask)
    end if
  end if
end
on populate me, a_ar_subtasks, a_bOntop
  if a_bOntop then
    repeat with i = a_ar_subtasks.count down to 1
      t_rSubtask = a_ar_subtasks[i]
      m_st_todo.push(t_rSubtask)
    end repeat
  else
    repeat with t_rSubtask in a_ar_subtasks
      m_st_todo.unshift(t_rSubtask)
    end repeat
  end if
  m_iLastAction = #populate
end
on flushSubtasks me
  m_st_todo.flush()
  m_ar_results.deleteAll()
end
on cancelSubtask me, a_bScrapSubtask
  if not m_st_done.isEmpty() then
    if a_bScrapSubtask then
      m_st_todo.pop()
    else
      m_st_todo.push(m_st_done.pop())
    end if
    m_iLastAction = #cancel
  else
    m_iLastAction = #tryquit
  end if
end
on resolveSubtask me, a_bScrapSubtask
  if not m_st_todo.isEmpty() then
    if a_bScrapSubtask then
      m_st_todo.pop()
    else
      m_st_done.push(m_st_todo.pop())
    end if
  end if
  m_iLastAction = #resolve
end
on getInterface me
  return m_rInterface
end
on hide me
  m_rInterface.close()
end
on show me
  m_rInterface.open()
end
on ActivateSubtaskInterface me, t_sSubtask
  m_rInterface._ChangePage(t_sSubtask)
  m_rInterface.open()
  if objectp(m_rOwner) then
    t_iTargetHandler = #ChangePageEvent
    if m_rOwner.handlers().getOne(t_iTargetHandler) > 0 then
      call(t_iTargetHandler, m_rOwner, me.getID(), t_sSubtask)
    end if
  end if
end
on appendSubResult me, t_ar_results
  repeat with i = 1 to t_ar_results.count
    t_iProp = t_ar_results.getPropAt(i)
    t_iValue = t_ar_results[i]
    m_ar_results[t_iProp] = t_iValue
  end repeat
end
on getResults me
  return m_ar_results
end
on broadcastResults me
  if objectp(m_rOwner) then
    t_iTargetHandler = #QuestDialogBroadcastEvent
    if m_rOwner.handlers().getOne(t_iTargetHandler) > 0 then
      call(t_iTargetHandler, m_rOwner, me.getID(), me.getResults())
    end if
  end if
  removeObject(me.getID())
end
on toString me
  t_s = "Subtasks status:" & RETURN
  t_s = t_s & "  Todo" && m_st_todo.toString() & RETURN
  t_s = t_s & "  Done" && m_st_done.toString() & RETURN
  return t_s
end