# Claude Prompts — Microsoft Word

Use these prompts when asking Claude to draft Word documents for Citi Maju — letters, proposals, reports, site instructions, and other formal documents.

---

## Master Context Block

Paste this at the start of any Claude session involving Citi Maju Word documents:

```
You are drafting a formal document for Citi Maju Group, a Klang Valley construction and engineering contractor. Follow these rules:

Company: Always "Citi Maju Group" (general) or the specific entity: "Citi Maju Engineering Sdn Bhd" / "Citi Maju Construction Sdn Bhd" only in legal/contract contexts.
Tagline: "Trusted. Certified. Delivered."
Contact: inquiry@citimaju.com | www.citimaju.com | +6012-379 6562 (Director)
Territory: Always "Klang Valley" — never "KL and Selangor"
Services (Engineering): Large-scale water reticulation
Services (Construction): Renovation, pipe jacking, directional drilling, hot tapping, smaller reticulation works
Do NOT mention machinery rental.
Certifications (Engineering only): CIDB G7 Grade · SPAN Registered · Air Selangor Approved Contractor

Writing style:
- Active voice, direct sentences, under 25 words per sentence
- No filler phrases: no "as per your kind request", no "please do not hesitate", no "we are pleased to"
- No response time promises
- Numbers 1–9 spelled out; 10 and above as numerals
- Dates in format: 15 April 2025
- Oxford comma in lists

Typography (for formatting instructions):
- Document title / H1: Cormorant Garamond 400
- Section headings / H2: Cormorant Garamond 400
- Sub-headings / H3+: Sora 600
- Body text: Noto Sans 400, 10pt, line height 1.65
- Labels, eyebrows: Sora 300, ALL CAPS
```

---

## Prompt 1 — Formal Letter

```
[Paste master context block above first]

Draft a formal letter on behalf of Citi Maju [Group / Engineering / Construction] regarding:

Subject: [What the letter is about]
Recipient: [Name, designation, company, address]
Sender: [Name and designation — e.g., Ivan Ignatius Ang, Director, Operations]
Entity issuing the letter: [Group / Engineering / Construction]
Date: [Date]
Key points to cover:
1. [First point]
2. [Second point]
3. [Third point — add as many as needed]
Attachments (if any): [List]

Format:
- Reference line above the salutation: [Ref or leave blank]
- Subject line in bold
- Appropriate salutation and sign-off
- Full letterhead details are handled by the template — just provide the letter body and sign-off block
```

---

## Prompt 2 — Quotation Document

```
[Paste master context block above first]

Draft a quotation document for Citi Maju [Engineering / Construction].

Quotation reference: [CME-Q-YYYY-XXX or CMC-Q-YYYY-XXX]
Date: [Date]
Valid for: [e.g., 30 days]
Client: [Name, company, address]
Project: [Project name and location]

Scope of works: [Describe the scope in detail — I will review and adjust]
Exclusions: [List what is not included — or ask me to suggest standard exclusions]
Pricing: [Provide the line items and amounts, or ask me to format a table with placeholders]
Payment terms: [e.g., monthly progress billing, 30-day payment, 5% retention]
Additional notes: [Any specific terms or conditions]

Format the document with:
- A clear scope section with bullet points
- A pricing table (item, description, unit, quantity, rate, amount)
- A subtotal and total row
- An exclusions section
- Payment terms section
- A validity statement
- Signatory block for the Director
```

---

## Prompt 3 — Proposal Document

```
[Paste master context block above first]

Draft a proposal document for Citi Maju [Engineering / Construction] for the following:

Client: [Client name or type]
Project: [Project name and description]
Purpose of proposal: [e.g., "respond to an invitation to tender for water reticulation at a new township"]
Our proposed approach: [Describe in your own words — or ask me to suggest based on project type]
Relevant certifications to highlight: [Engineering: CIDB G7, SPAN, Air Selangor | Construction: list relevant]
Any known competition or differentiation angle: [e.g., "we have done similar projects in the same developer's township"]

Structure the proposal as:
1. Cover page content (title, client, date, reference)
2. Company overview (one paragraph, credentials-forward)
3. Understanding of requirements (restate and interpret the brief)
4. Proposed scope and methodology
5. Credentials and project references (table format)
6. Commercial summary (placeholder — I will insert pricing from the quotation)
7. Closing paragraph and contact
```

---

## Prompt 4 — Progress Report

```
[Paste master context block above first]

Draft a monthly progress report for the following project:

Project: [Project name]
Client: [Client name]
Contract reference: [Ref no.]
Report period: [Month and year]
Report number: [e.g., Report No. 6]
Report reference: [CME-PR-XXXX-006 format]

Data to include:
- Overall completion: [%]
- This period activities: [List what was done]
- Programme status: [On time / Behind by X days / Ahead by X days. Reason: ]
- Issues and risks: [List — or state "No significant issues this period"]
- Client actions required: [List — or state "None"]
- Next period plan: [List planned activities]
- Attachments to reference: [e.g., site photos, test records]

Write in factual, third-person tone. No padding. Section headings in bold. Use a table for the programme status and issues sections.
```

---

## Prompt 5 — Site Instruction

```
[Paste master context block above first]

Draft a site instruction for the following:

SI Reference: [CME-SI-XXXX-XXX or CMC-SI-XXXX-XXX]
Date: [Date]
Project: [Project name and contract reference]
Issued by: [Name and designation]
Issued to: [Name and designation — site supervisor or subcontractor]

Instruction: [Describe clearly what is to be done. Include: what, where, how, any constraints]
Affected area / location: [Specific location or chainage]
Effect on programme: [None / Anticipated delay of X days]
Commercial impact: [No commercial impact / Variation Order to follow — Ref: ]
Attachments: [Sketch ref, drawing ref, or none]

Format the instruction body as three short paragraphs:
1. Context (why this instruction is being issued)
2. The instruction (what must be done, where, and how)
3. Commercial and programme impact statement

Include an acknowledgement table at the bottom for Issued By and Received By signatures.
```
