// ---- CASES ----
var CASES = {
    freight: {
      steps: ["Open the carrier portal", "Log in", "Enter the shipment details",
              "Copy the rate and validity date", "Paste into the quotes sheet",
              "Repeat for two more carriers"],
      breaks: "the carrier redesigns their portal",
      cond: "Get me three quotes from different carriers, and make sure they're still good on the day we book.",
      survives: "you get a quote"
    },
    invoice: {
      steps: ["Download the invoice from the vendor portal", "Open the PO in NetSuite",
              "Match each line item by hand", "Check the goods-receipt note",
              "Flag anything over tolerance", "Email the budget holder for sign-off"],
      breaks: "the vendor changes their invoice layout",
      cond: "Only pay it if the lines match the PO and we actually received the goods. Someone other than the raiser signs it off.",
      survives: "the invoice arrives"
    },
    hire: {
      steps: ["Chase the signed contract", "Check right-to-work documents",
              "Raise an IT ticket for the laptop", "Ask each system owner for an account",
              "Follow up on whatever is missing", "Repeat the day before they start"],
      breaks: "IT changes how tickets are raised",
      cond: "Don't let anyone start until the contract is signed, right to work is checked, and their laptop and accounts are ready.",
      survives: "the accounts get created"
    }
  };

// ---- VERTICALS ----
var VERTICALS = {
    freight: {
      cards: [
        { name: "Booking a shipment", sub: "Quote to confirmed booking",
          goal: "Shipment booked",
          rules: [
            ["ok",   "three quotes, distinct carriers, valid past booking"],
            ["ok",   "carrier on an approved lane, rate inside band"],
            ["ok",   "confirmation number matches the selected quote"],
            ["late", "HS code accepted at customs entry"] ],
          ft: "The last rule resolves days later. The booking reopens if customs rejects." },
        { name: "Clearing an accessorial", sub: "Carrier bills for something extra",
          goal: "Accessorial charge cleared",
          rules: [
            ["ok",   "charge type appears on the signed rate agreement"],
            ["ok",   "event evidenced by the driver's own timestamps"],
            ["wait", "over threshold, so an owner signs it off"] ],
          ft: "A person makes the call. The evidence is ready before they see it." }
      ]
    },
    procurement: {
      cards: [
        { name: "Paying an invoice", sub: "Three-way match before payment",
          goal: "Invoice cleared for payment",
          rules: [
            ["ok",   "every line item appears on the PO"],
            ["ok",   "totals agree within tolerance"],
            ["ok",   "goods receipted against this PO"],
            ["wait", "approved by someone other than the raiser"] ],
          ft: "Waiting on a person — approval is a judgement call, so it goes to one." },
        { name: "Raising a PO", sub: "Before money is committed",
          goal: "Purchase order raised",
          rules: [
            ["ok",   "budget line exists and has room this quarter"],
            ["ok",   "vendor is active and approved to trade"],
            ["wait", "second quote held, or a waiver on file"] ],
          ft: "Rules read the same whether it is £400 or £40,000. Only the threshold moves." }
      ]
    },
    vendor: {
      cards: [
        { name: "Onboarding a vendor", sub: "Before the first order",
          goal: "Vendor ready to trade",
          rules: [
            ["ok",   "registration resolves to an active company"],
            ["ok",   "bank details confirmed on a second channel"],
            ["late", "insurance in force, cover above our minimum"] ],
          ft: "Insurance stops holding the day the policy lapses. The vendor reopens." },
        { name: "A vendor changes bank details", sub: "The request nobody wants to get wrong",
          goal: "Bank change accepted",
          rules: [
            ["ok",   "request arrives from a known contact at the vendor"],
            ["ok",   "new details confirmed on a channel we already held"],
            ["wait", "countersigned by finance, never the requester"] ],
          ft: "The rule that matters is the one about who is allowed to confirm." }
      ]
    },
    hr: {
      cards: [
        { name: "Starting a new hire", sub: "Offer to day one",
          goal: "New hire ready for day one",
          rules: [
            ["ok",   "countersigned contract, start date matches offer"],
            ["late", "right to work checked, visa valid past start"],
            ["wait", "laptop shipped, accounts created for every system"] ],
          ft: "Right to work reopens when a visa approaches expiry." },
        { name: "Someone leaves", sub: "The one that quietly gets skipped",
          goal: "Leaver closed out",
          rules: [
            ["ok",   "access revoked everywhere it was granted"],
            ["ok",   "company property returned or written off"],
            ["late", "final pay reconciled after the last timesheet"] ],
          ft: "The access list is the one from onboarding, so nothing is missed by memory." }
      ]
    },
    finance: {
      cards: [
        { name: "Closing the month", sub: "Ready for the controller",
          goal: "Month-end close ready",
          rules: [
            ["ok",   "every uninvoiced shipment accrued at rate-card"],
            ["ok",   "bank lines matched to ledger within tolerance"],
            ["wait", "variances over threshold explained by an owner"],
            ["late", "no invoice arrives later for an accrued period"] ],
          ft: "A late invoice reopens a closed month rather than silently restating it." },
        { name: "Reconciling a statement", sub: "Vendor says we owe, ledger disagrees",
          goal: "Statement reconciled",
          rules: [
            ["ok",   "every open invoice matched to a ledger entry"],
            ["ok",   "differences aged and attributed to a cause"],
            ["wait", "anything unexplained raised with the vendor"] ],
          ft: "The unexplained set is the output. It is meant to be small and named." }
      ]
    }
  };

