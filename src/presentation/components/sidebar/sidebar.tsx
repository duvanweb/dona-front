import { useEffect } from 'react'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { useSidebarStore } from '@/stores/use-sidebar-store'
import { SidebarContent } from './sidebar-content'

export function Sidebar() {
  const open = useSidebarStore((s) => s.open)
  const setOpen = useSidebarStore((s) => s.setOpen)
  const close = useSidebarStore((s) => s.close)

  // Close the mobile drawer when the viewport grows to desktop.
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)')
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) close()
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [close])

  return (
    <>
      {/* Desktop: in-flow sticky aside (hidden on mobile) */}
      <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 flex-col border-r bg-sidebar md:flex">
        <SidebarContent onNavigate={close} />
      </aside>

      {/* Mobile: left Sheet drawer (no-op when closed) */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 bg-sidebar p-0">
          <SheetTitle className="sr-only">Menú lateral</SheetTitle>
          <SidebarContent onNavigate={close} />
        </SheetContent>
      </Sheet>
    </>
  )
}
