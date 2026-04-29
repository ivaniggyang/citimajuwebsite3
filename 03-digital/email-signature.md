# Email Signature

## Standard Signature — All Staff

Every outgoing email must include the standard Citi Maju email signature. The signature is set in plain text with minimal HTML — it must render correctly in Gmail, Outlook, and mobile clients without heavy formatting.

---

## Signature Template (HTML)

Copy and configure this in your email client's signature settings. Replace the bracketed fields with your own details.

```html
<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Noto Sans', Arial, sans-serif; font-size: 13px; color: #0D1B2E; line-height: 1.5;">
  <tr>
    <td style="padding-right: 16px; border-right: 1px solid #C8921A; vertical-align: top;">
      <!-- Logo block -->
      <img src="[HOSTED_LOGO_URL]" alt="Citi Maju" width="48" style="display: block; margin-bottom: 4px;">
    </td>
    <td style="padding-left: 16px; vertical-align: top;">
      <!-- Name -->
      <div style="font-family: Georgia, 'Times New Roman', serif; font-size: 15px; font-weight: normal; color: #071E3D; margin-bottom: 2px;">
        [Full Name]
      </div>
      <!-- Title -->
      <div style="font-family: Arial, sans-serif; font-size: 10px; font-weight: normal; letter-spacing: 0.1em; text-transform: uppercase; color: #3A5068; margin-bottom: 8px;">
        [Job Title] &nbsp;·&nbsp; [Department or Entity]
      </div>
      <!-- Divider -->
      <div style="border-top: 1px solid #E8F1FB; margin-bottom: 8px;"></div>
      <!-- Contact -->
      <div style="font-size: 12px; color: #3A5068;">
        <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #6B849C;">M</span>&nbsp;
        <a href="tel:[MOBILE]" style="color: #0D1B2E; text-decoration: none;">[+601X-XXX XXXX]</a>
        &nbsp;&nbsp;
        <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #6B849C;">E</span>&nbsp;
        <a href="mailto:inquiry@citimaju.com" style="color: #1B4F8A; text-decoration: none;">inquiry@citimaju.com</a>
      </div>
      <div style="font-size: 12px; color: #3A5068; margin-top: 3px;">
        <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: #6B849C;">W</span>&nbsp;
        <a href="http://www.citimaju.com" style="color: #1B4F8A; text-decoration: none;">www.citimaju.com</a>
      </div>
      <!-- Entity name -->
      <div style="margin-top: 10px; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #6B849C;">
        Citi Maju Group &nbsp;·&nbsp; Klang Valley
      </div>
    </td>
  </tr>
</table>
```

---

## Plain Text Fallback

For clients that do not render HTML, use this plain text version:

```
[Full Name]
[Job Title] | Citi Maju Group

M: +601X-XXX XXXX
E: inquiry@citimaju.com
W: www.citimaju.com

Klang Valley, Malaysia
```

---

## Director Signature (Ivan Ignatius Ang)

```
Ivan Ignatius Ang
Director, Operations | Citi Maju Group

M: +6012-379 6562
E: inquiry@citimaju.com
W: www.citimaju.com

Klang Valley, Malaysia
```

---

## Signature Rules

**Include in every email.** Do not omit the signature on replies or forwards — some clients strip it, but always paste it back if needed.

**Do not add:** Inspirational quotes, social media icons (until social channels are officially established), "sent from my iPhone" notices (suppress this in mobile settings), legal disclaimers unless instructed by the company's legal adviser.

**Do not modify:** Font, colours, or layout. The signature must be consistent across all staff.

**Entity in signature:** Use "Citi Maju Group" in the entity line for general correspondence. Use "Citi Maju Engineering Sdn Bhd" or "Citi Maju Construction Sdn Bhd" only if the email relates specifically to that entity's work and the client relationship requires it.

**Logo in signature:** Host the CM mark SVG on a reliable URL (e.g., the company website or a CDN). Do not attach it as an inline image — it will trigger spam filters and render as an attachment in many clients.

---

## Setting Up in Gmail

1. Open Gmail → Settings → See all settings → Signature
2. Create a new signature named "Citi Maju Standard"
3. Paste the HTML code above (switch to HTML view in the editor if available, or use a browser extension like "Gmail Signature Formatter")
4. Set it as the default for new emails and replies
5. Save changes and send a test email to yourself to verify rendering
