# AssetFlow — Hackathon Plan (9:00 → 17:00, 4 people)

Commit every hour. Push to a shared branch; PR merges into `main` at each hour mark.

## People
- **P1** — Org setup + Notifications + wire-up
- **P2** — Assets directory + Allocation & Transfer
- **P3** — Resource Booking + Maintenance Kanban
- **P4** — Audit + Reports & Analytics

## Timeline

| Hour  | P1                                | P2                                | P3                                | P4                                |
|-------|-----------------------------------|-----------------------------------|-----------------------------------|-----------------------------------|
| 09-10 | DB migration: departments, categories, employees | DB migration: assets table + RLS | DB migration: bookings + maintenance | DB migration: audits + audit_items |
| 10-11 | Org setup UI (departments CRUD)   | Assets list + Register form       | Booking calendar + conflict check | Audit cycle screen + checklist    |
| 11-12 | Categories + Employees tabs       | Filters (category/status/dept)    | Kanban columns + drag/drop        | Auto-generate discrepancy report  |
| 12-13 | Notifications feed UI             | Allocation form + block re-alloc  | Approve/resolve moves asset state | Reports: utilization chart        |
| 13-14 | Filter tabs (All/Alerts/Approvals)| Transfer request + history        | Maintenance request → kanban flow | Reports: maintenance freq, idle   |
| 14-15 | Realtime notifications (subscribe)| QR/tag search                     | Booking heatmap data              | Export report (CSV/PDF)           |
| 15-16 | Role management (admin/manager)   | Polish + edge cases               | Polish + edge cases               | Polish + edge cases               |
| 16-17 | Bug bash + demo script            | Bug bash                          | Bug bash                          | Bug bash + deck                   |

## Commit protocol
1. Rebase off `main` at the top of the hour.
2. Small, focused commits — messages: `p2/assets: register form`.
3. Every screen wired to Lovable Cloud data before the next commit.

## Screens ↔ owners (from problem statement)
- S1 Login ✅ (done in scaffold)
- S2 Dashboard ✅ (done in scaffold — refine numbers later)
- S3 Org setup → P1
- S4 Assets → P2
- S5 Allocation & Transfer → P2
- S6 Resource Booking → P3
- S7 Maintenance kanban → P3
- S8 Audit → P4
- S9 Reports → P4
- S10 Notifications → P1

## Ground rules
- All colors/spacing via design tokens in `src/styles.css`. No `bg-white`, no hex in components.
- Every new public-schema table: `GRANT` + RLS + policies in the same migration.
- Never store roles on `profiles`. Use `user_roles` (already created) + `has_role()`.
