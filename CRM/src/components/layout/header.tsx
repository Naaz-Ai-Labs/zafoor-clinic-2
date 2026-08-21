"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, Menu } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { NavContent } from "@/components/layout/sidebar-nav"
import { initials } from "@/lib/format"
import { logout } from "@/actions/auth"

export function Header({ user }: { user: { name: string; role: string } }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-2 sm:gap-4 border-b bg-background/95 backdrop-blur px-3 sm:px-4 lg:px-6">
      {/* Mobile Hamburger Drawer Trigger */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger
          render={
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          }
        />
        <SheetContent side="left" className="p-0 w-72 max-w-[85vw]">
          <SheetTitle className="sr-only">Zafoor Clinic Navigation Menu</SheetTitle>
          <NavContent role={user.role} onNavigate={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Global Search Bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients by name, UHID, phone…"
            className="pl-9 h-9 text-xs sm:text-sm"
          />
        </div>
      </form>

      {/* New Patient CTA Button */}
      <Button
        size="sm"
        className="gap-1 sm:gap-1.5 h-9 shrink-0 px-2.5 sm:px-3 text-xs sm:text-sm font-medium"
        nativeButton={false}
        render={
          <Link href="/patients/new">
            <Plus className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">New Patient</span>
            <span className="sm:hidden">New</span>
          </Link>
        }
      />

      {/* User Avatar & Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <button className="flex items-center gap-2 rounded-full outline-none shrink-0" aria-label="User Menu">
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9 ring-1 ring-border">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                  {initials(user.name)}
                </AvatarFallback>
              </Avatar>
            </button>
          }
        />
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs font-normal text-muted-foreground capitalize">{user.role.replace("_", " ").toLowerCase()}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem render={<Link href="/settings/signature" className="w-full">Settings & Signature</Link>} />
          <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:text-destructive">
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
