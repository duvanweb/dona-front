import { Hexagon, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSidebarStore } from '@/stores/use-sidebar-store'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const toggle = useSidebarStore((s) => s.toggle)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-2 px-4">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggle}
          aria-label="Abrir menú lateral"
        >
          <Menu />
        </Button>

        <div className="flex items-center gap-2 font-semibold">
          <Hexagon className="size-5 text-primary" />
          <span className="text-base">dona-front</span>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
