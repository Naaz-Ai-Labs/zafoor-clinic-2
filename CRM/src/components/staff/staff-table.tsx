"use client"

import { useState, useTransition } from "react"
import { toast } from "sonner"
import {
  MoreHorizontal,
  Pencil,
  KeyRound,
  Shield,
  Stethoscope,
  UserCheck,
  Receipt,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Phone,
  Mail,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditStaffDialog } from "@/components/staff/edit-staff-dialog"
import { ResetPasswordDialog } from "@/components/staff/reset-password-dialog"
import { toggleStaffStatus, syncDefaultStaffAccounts } from "@/actions/staff"
import { initials } from "@/lib/format"
import type { StaffRole } from "@/generated/prisma/client"

type StaffMember = {
  id: string
  name: string
  email: string
  phone: string | null
  role: StaffRole
  specialization: string | null
  consultationFee: number | null
  active: boolean
  createdAt: Date
  _count?: {
    appointmentsAsDoctor: number
    encountersAsDoctor: number
    registeredPatients: number
  }
}

const roleBadgeConfig: Record<
  StaffRole,
  { label: string; icon: typeof Shield; color: string }
> = {
  ADMIN: { label: "Administrator (Full Control)", icon: Shield, color: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200" },
  DOCTOR: { label: "Doctor (EMR & Consult)", icon: Stethoscope, color: "bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-200" },
  RECEPTIONIST: { label: "Receptionist (Selective Access)", icon: UserCheck, color: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200" },
  BILLING: { label: "Receptionist (Selective Access)", icon: UserCheck, color: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200" },
}

export function StaffTable({ staffList }: { staffList: StaffMember[] }) {
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [resetStaff, setResetStaff] = useState<{ id: string; name: string; email: string } | null>(null)
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const [pending, startTransition] = useTransition()

  function handleToggleStatus(staff: StaffMember) {
    const nextState = !staff.active
    startTransition(async () => {
      try {
        await toggleStaffStatus(staff.id, nextState)
        toast.success(`${staff.name} is now ${nextState ? "Active" : "Deactivated"}`)
      } catch (err: any) {
        toast.error(err?.message || "Could not update status")
      }
    })
  }

  function handleSyncDefaults() {
    startTransition(async () => {
      try {
        const res = await syncDefaultStaffAccounts()
        toast.success(`Successfully synced ${res.count} staff accounts in Supabase`)
      } catch (err: any) {
        toast.error(err?.message || "Failed to sync accounts")
      }
    })
  }

  return (
    <>
      <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b bg-muted/20">
          <div>
            <h2 className="font-semibold text-sm">Staff Directory ({staffList.length})</h2>
            <p className="text-xs text-muted-foreground">All authenticated accounts synced with Supabase PostgreSQL</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={pending}
            onClick={handleSyncDefaults}
            className="gap-1.5 text-xs h-8 self-start sm:self-auto"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${pending ? "animate-spin" : ""}`} />
            Sync Default Accounts
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Details / Clinical</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {staffList.map((staff) => {
                const roleConfig = roleBadgeConfig[staff.role]
                const RoleIcon = roleConfig.icon

                return (
                  <tr key={staff.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 ring-1 ring-border shrink-0">
                          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                            {initials(staff.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">{staff.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{staff.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge variant="outline" className={`gap-1.5 text-xs font-medium py-0.5 px-2 ${roleConfig.color}`}>
                        <RoleIcon className="h-3.5 w-3.5" />
                        {roleConfig.label}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5 text-xs text-muted-foreground">
                        {staff.phone ? (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-muted-foreground shrink-0" />
                            <span>{staff.phone}</span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground/60 italic">No phone</span>
                        )}
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground shrink-0" />
                          <span className="truncate max-w-[140px]">{staff.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {staff.role === "DOCTOR" ? (
                        <div className="text-xs space-y-0.5">
                          <p className="font-medium text-foreground truncate max-w-[200px]">
                            {staff.specialization || "General Consultation"}
                          </p>
                          <p className="text-muted-foreground">
                            Fee: <span className="font-semibold text-foreground">₹{staff.consultationFee ?? 500}</span>
                            {staff._count ? ` · ${staff._count.encountersAsDoctor} consultations` : ""}
                          </p>
                        </div>
                      ) : staff.role === "RECEPTIONIST" ? (
                        <span className="text-xs text-muted-foreground">
                          {staff._count ? `${staff._count.registeredPatients} registered patients` : "Front Desk Access"}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">System Administration</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {staff.active ? (
                        <Badge variant="outline" className="gap-1 text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-xs font-medium">
                          <CheckCircle2 className="h-3 w-3 text-emerald-600" /> Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1 text-muted-foreground text-xs">
                          <XCircle className="h-3 w-3 text-muted-foreground" /> Inactive
                        </Badge>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Staff options</span>
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            className="cursor-pointer gap-2"
                            onClick={() => {
                              setEditingStaff(staff)
                              setEditDialogOpen(true)
                            }}
                          >
                            <Pencil className="h-4 w-4 text-muted-foreground" />
                            <span>Edit Details</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="cursor-pointer gap-2"
                            onClick={() => {
                              setResetStaff(staff)
                              setResetDialogOpen(true)
                            }}
                          >
                            <KeyRound className="h-4 w-4 text-muted-foreground" />
                            <span>Reset Password</span>
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            className={`cursor-pointer gap-2 ${staff.active ? "text-destructive focus:text-destructive" : "text-emerald-600"}`}
                            disabled={pending}
                            onClick={() => handleToggleStatus(staff)}
                          >
                            {staff.active ? (
                              <>
                                <XCircle className="h-4 w-4" />
                                <span>Deactivate Login</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-4 w-4" />
                                <span>Activate Login</span>
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Staff Dialog */}
      <EditStaffDialog
        staff={editingStaff}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />

      {/* Reset Password Dialog */}
      <ResetPasswordDialog
        staff={resetStaff}
        open={resetDialogOpen}
        onOpenChange={setResetDialogOpen}
      />
    </>
  )
}
