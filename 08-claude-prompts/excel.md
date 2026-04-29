# Claude Prompts — Microsoft Excel

Use these prompts when asking Claude to structure Excel workbooks, generate formulas, or produce templates for Citi Maju financial and project tracking documents.

---

## Master Context Block

Paste this at the start of any Claude session involving Citi Maju Excel work:

```
You are helping build an Excel workbook for Citi Maju Group, a Klang Valley construction and engineering contractor. Apply these conventions:

Currency: Malaysian Ringgit (RM). Format: RM #,##0.00
Dates: DD/MM/YYYY format in cells. Display as "15 Apr 2025" in headers where formatting allows.
Entity: Citi Maju Engineering Sdn Bhd or Citi Maju Construction Sdn Bhd — whichever is the operating entity for this document.
Project reference format: [CME or CMC]-[Type]-[Year]-[XXX]
Colour coding for workbooks (applied via conditional formatting or manual fill):
  - Header rows: #071E3D (Deep Navy) fill, #FFFFFF text
  - Sub-header rows: #1B4F8A (Brand Blue) fill, #FFFFFF text
  - Alternating data rows: #FFFFFF and #F7F4EF (Cream)
  - Total / summary rows: #0D3362 (Blue Mid) fill, #FFFFFF text
  - Alert / overdue: #FFF3CD fill (light amber), #0D1B2E text
  - Completed items: #E8F1FB (Blue Pale) fill
Font: Calibri (Excel default — Noto Sans is not Excel-native). Titles: 12pt bold. Headers: 10pt bold. Data: 10pt.
```

---

## Prompt 1 — Bill of Quantities (BOQ)

```
[Paste master context block above first]

Create a Bill of Quantities Excel template for Citi Maju [Engineering / Construction].

Project details to include in the header:
- Project name: [Name]
- Contract reference: [Ref]
- Date: [Date]
- Prepared by: [Name]

The BOQ should have the following columns:
Item No. | Description | Unit | Quantity | Unit Rate (RM) | Amount (RM) | Remarks

Include the following sections (each as a group with a header row):
[List sections — e.g., "Earthworks, Pipe Supply, Pipe Installation, Pressure Testing, Reinstatement, Preliminaries"]

Include:
- A subtotal row per section (SUM of the section amount column)
- A grand total row at the bottom
- A contingency row (5% of grand total) below the grand total
- A contract value row (grand total + contingency)
- Conditional formatting: highlight rows where Remarks contains "TBC" in amber

Provide me with:
1. The column headers and suggested widths
2. The formula structure for subtotals and grand total
3. How to set up the conditional formatting rule
4. The cell reference structure so I can copy it correctly
```

---

## Prompt 2 — Project Cost Tracker

```
[Paste master context block above first]

Create a project cost tracking workbook for Citi Maju. This workbook tracks planned vs actual costs across all active projects.

Sheet 1 — Summary Dashboard:
Columns: Project Name | Contract Value (RM) | Billed To Date (RM) | Collected (RM) | Outstanding (RM) | Completion % | Status
- Outstanding = Billed To Date − Collected
- Status: formula-based: "On Track" if Completion % ≥ Billed %; "At Risk" if behind; "Completed" if 100%
- Colour code Status column: On Track = Blue Pale fill; At Risk = amber fill; Completed = green fill

Sheet 2 — Project Detail (one tab per project, or parameterised):
Columns: Cost Item | Budget (RM) | Committed (RM) | Actual Spent (RM) | Variance (RM) | % Used | Notes
- Variance = Budget − Actual Spent
- % Used = Actual Spent / Budget
- Highlight rows where % Used > 90% in amber; > 100% in red

Give me the formulas, the conditional formatting rules, and a recommended sheet structure.
```

---

## Prompt 3 — Progress Billing Schedule

```
[Paste master context block above first]

Create a progress billing schedule in Excel for Citi Maju [Engineering / Construction].

Project: [Project name]
Contract value: RM [Amount]
Start date: [Date]
Target completion: [Date]
Payment terms: [e.g., monthly, 30-day payment, 5% retention]

Columns: Month | Planned Work % | Cumulative % | Claim Amount (RM) | Retention Held (RM) | Net Payable (RM) | Invoice Date | Payment Due Date | Received Date | Status

Formulas needed:
- Claim Amount = Contract Value × (this month's % − previous cumulative %)
- Retention Held = Claim Amount × 5%
- Net Payable = Claim Amount − Retention Held
- Payment Due Date = Invoice Date + 30 days
- Status: "Paid" if Received Date is filled; "Overdue" if today > Payment Due Date and not paid; "Pending" otherwise

Include a summary row at the bottom totalling: Total Claimed, Total Retention, Total Net Payable, Total Received.

Provide conditional formatting for the Status column:
- Paid: Blue Pale fill
- Overdue: amber fill
- Pending: no fill
```

---

## Prompt 4 — Quotation Log

```
[Paste master context block above first]

Create a quotation log workbook to track all quotations issued by Citi Maju.

Columns: Ref No. | Date Issued | Entity (Eng/Con) | Client | Project Description | Amount (RM) | Valid Until | Status | Follow-Up Date | Notes

Status options: Submitted | Won | Lost | Expired | Pending Client

Formatting:
- Won: Blue Pale fill
- Lost: light grey fill
- Expired: light grey fill
- Pending Client: no fill, bold
- Submitted (within validity): no fill

Add a summary section at the top or on a separate sheet:
- Total quotations issued (year-to-date)
- Total value of Won quotations (RM)
- Total value of Pending quotations (RM)
- Win rate (Won ÷ (Won + Lost), %)

Provide the formulas using COUNTIF, SUMIF, and how to reference the status column.
```

---

## Prompt 5 — Site Daily Log

```
[Paste master context block above first]

Create a daily site log Excel sheet for Citi Maju. This is filled in by the site supervisor each day.

Header block (static): Project Name | Contract Reference | Site Supervisor | Report Date

Daily log columns:
Date | Weather | Workers (Own) | Workers (Sub) | Equipment on Site | Works Completed Today | Quantity / Progress | Issues or Delays | Visitor / Inspector | Remarks

Notes:
- Weather: dropdown list — Sunny, Partly Cloudy, Rainy, Thunderstorm, Works Suspended
- Issues or Delays: if filled in, highlight the row in amber
- This sheet is duplicated for each day — or structured as a continuous log with one row per day

At the bottom of each week (every 5 working days), include a weekly subtotal row:
- Sum of own workers and sub-workers for the week
- A notes cell for the weekly supervisor summary

Provide the dropdown setup instructions and the conditional formatting rule for the Issues column.
```
