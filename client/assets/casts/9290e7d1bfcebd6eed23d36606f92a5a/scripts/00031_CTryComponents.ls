-- Script
property m_rWindow
property m_ar_components

on construct me
  m_ar_components = [:]
  m_ar_components.sort()
  m_rWindow = VOID
  createWindow("comptester")
  m_rWindow = getWindow("comptester")
  t_bSuccess = m_rWindow.merge("vmk_nav_guestrooms.window")
  m_rWindow.center()
  m_rWindow.registerProcedure(#_EventProc, me.getID(), #mouseUp)
  me.createComponentWindow()
  return 1
end
on deconstruct me
  if objectp(m_rWindow) then
    removeWindow("comptester")
  end if
  repeat with t_rComponent in m_ar_components
    removeObject(t_rComponent.getID())
  end repeat
  return 1
end
on createComponentWindow me
  t_ar_componentsPage = ["nav.roomlist": ["component.navigator.roomlist.title.xml", "component.navigator.roomlist.content.xml"]]
  repeat with i = 1 to t_ar_componentsPage.count
    t_sElemName = t_ar_componentsPage.getPropAt(i)
    t_ar_components = t_ar_componentsPage[i]
    t_rClientElement = m_rWindow.getElement(t_sElemName)
    t_rComponentsPage = createObject(getUniqueID(), "CUIComponentPage")
    t_rComponentsPage.setSize(t_rClientElement.pOwnW, t_rClientElement.pOwnH)
    t_rComponentsPage.setColor(rgb("#001F56"))
    repeat with t_sComponentName in t_ar_components
      t_rComponentsPage.addComponent(t_sComponentName)
    end repeat
    t_rImg = t_rComponentsPage.render()
    t_rClientElement.feedImage(t_rImg)
    m_ar_components[t_sElemName] = t_rComponentsPage
  end repeat
end
on _EventProc me, a_kEvent, a_sElemID, a_vParam
  if a_kEvent = #mouseUp then
    case a_sElemID of
      "nav.roomlist":
        t_ar_event = [#found: 0, #event: EMPTY, #client: VOID, #route: [:]]
        executeMessage("PlayInterfaceSound", "UI-click")
        t_rComponentPage = m_ar_components[a_sElemID]
        t_rComponentPage.EventProc(a_vParam, t_ar_event)
        if t_ar_event.found then
          t_rClientElement = m_rWindow.getElement(a_sElemID)
          case t_ar_event.event of
            "quest.delete":
            otherwise:
              put "[Component.event]" && t_ar_event.event

          end case
          t_rClientElement = m_rWindow.getElement(a_sElemID)
          t_rImg = t_rComponentPage.render()
          t_rClientElement.feedImage(t_rImg)
        end if
      "close":
        removeObject(me.getID())
      otherwise:
        put "Window-elem not found " && a_sElemID

    end case
  end if
end