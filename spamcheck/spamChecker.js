const spamList = {
    urgency: [
        "Access", "Access now", "Act", "Act immediately", "Act now", "Act now!", "Action", "Action required",
        "Apply here", "Apply now", "Apply now!", "Apply online", "Become a member", "Before it's too late",
        "Being a member", "Buy", "Buy direct", "Buy now", "Buy today", "Call", "Call free", "Call free/now",
        "Call me", "Call now", "Call now!", "Can we have a minute of your time?", "Cancel now", "Cancellation required",
        "Claim now", "Click", "Click below", "Click here", "Click me to download", "Click now", "Click this link",
        "Click to get", "Click to remove", "Contact us immediately", "Deal ending soon", "Do it now", "Do it today",
        "Don't delete", "Don't hesitate", "Don't waste time", "Don't delete", "Exclusive deal", "Expire", "Expires today",
        "Final call", "For instant access", "For Only", "For you", "Friday before [holiday]", "Get it away",
        "Get it now", "Get now", "Get paid", "Get started", "Get started now", "Great offer", "Hurry up",
        "Immediately", "Info you requested", "Information you requested", "Instant", "Limited time", "New customers only",
        "Now", "Now only", "Offer expires", "Once in lifetime", "Only", "Order now", "Order today", "Please read",
        "Purchase now", "Sign up free", "Sign up free today", "Supplies are limited", "Take action", "Take action now",
        "This won't last", "Time limited", "Today", "Top urgent", "Trial", "Urgent", "What are you waiting for?",
        "While supplies last", "You are a winner"
    ],
    shady: [
        "0 down", "All", "All natural", "All natural/new", "All new", "All-natural", "All-new", "Allowance",
        "As seen on", "As seen on Oprah", "At no cost", "Auto email removal", "Avoice bankruptcy", "Avoid",
        "Beneficial offer", "Beneficiary", "Bill 1618", "Brand new pager", "Bulk email", "Buying judgements",
        "Buying judgments", "Cable converter", "Calling creditors", "Can you help us?", "Cancel at any time",
        "Cannot be combined", "Celebrity", "Cell phone cancer scam", "Certified", "Chance", "Cheap", "Cheap meds",
        "Cialis", "Claims", "Claims not to be selling anything", "Claims to be in accordance with some spam law",
        "Claims to be legal", "Clearance", "Collect", "Collect child support", "Compare", "Compare now",
        "Compare online", "Compare rates", "Compete for your business", "Confidentiality", "Congratulations",
        "Consolidate debt and credit", "Consolidate your debt", "Copy accurately", "Copy DVDs", "COVID",
        "Cures", "Cures baldness", "Diagnostic", "DIAGNOSTICS", "Diet", "Dig up dirt on friends", "Direct email",
        "Direct marketing", "Eliminate debt", "Explode your business", "Fast viagra delivery", "Finance"]
    };


    function checkSpam() {
  const emailText = document.getElementById("emailText").value;
  const counts = { urgency: 0, shady: 0, money: 0, overpromise: 0 };
  const matches = { urgency: [], shady: [], money: [], overpromise: [] };

  Object.keys(spamList).forEach((category) => {
    spamList[category].forEach((phrase) => {
      const regex = new RegExp('\\b' + phrase + '\\b', 'gi');
      const matchCount = (emailText.match(regex) || []).length;

      if (matchCount > 0) {
        counts[category] += matchCount;
        matches[category].push(phrase);
      }
    });
  });

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";

  Object.keys(counts).forEach((category) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `<strong>${category}:</strong> ${counts[category]} matches - ${matches[category].join(', ')}`;
    resultDiv.appendChild(categoryDiv);
  });

  const highlightedTextDiv = document.getElementById("highlightedText");
  highlightedTextDiv.innerHTML = "";

  let highlightedText = emailText;
  Object.keys(spamList).forEach((category) => {
    spamList[category].forEach((phrase) => {
      const regex = new RegExp('\\b(' + phrase + ')\\b', 'gi');
      highlightedText = highlightedText.replace(regex, `<span style="background-color: ${getCategoryColor(category)}">$1</span>`);
    });
  });

  highlightedTextDiv.innerHTML = highlightedText;
}

function getCategoryColor(category) {
  switch (category) {
    case "urgency":
      return "yellow";
    case "shady":
      return "pink";
    case "money":
      return "cyan";
    case "overpromise":
      return "lime";
    default:
      return "transparent";
  }
}
