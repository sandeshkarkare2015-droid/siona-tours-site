// Siona Tours — contact form → WhatsApp redirect

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("enquiryForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var whatsapp = form.whatsapp.value.trim();
    var email = form.email.value.trim();
    var pkg = form.package.value;
    var travellers = form.travellers.value.trim();
    var month = form.month.value;
    var message = form.message.value.trim();

    var lines = [
      "Hi Siona Tours! I'd like to enquire about a holiday package.",
      "",
      "Name: " + name,
      "WhatsApp Number: " + whatsapp,
    ];

    if (email) lines.push("Email: " + email);
    if (pkg) lines.push("Package: " + pkg);
    if (travellers) lines.push("Travellers: " + travellers);
    if (month) lines.push("Preferred Travel Month: " + month);
    if (message) lines.push("Message: " + message);

    var text = lines.join("\n");
    var url = "https://wa.me/" + SIONA_WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
    window.location.href = url;
  });
});
