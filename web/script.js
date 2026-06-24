let contact = null;

function post(msg) {
    window.parent.postMessage(msg, "*");
}

function render() {
    if (!contact) return;

    document.getElementById("name").textContent =
        (contact.personal?.name) || "";

    document.getElementById("emailPrimary").textContent =
        (contact.emails?.primary) || "";

    const avatar = document.getElementById("avatar");
    avatar.innerHTML = "";

    if (contact.thumbnailUrl) {
        const img = document.createElement("img");
        img.src = contact.thumbnailUrl;
        avatar.appendChild(img);
    }

    const emails = document.getElementById("emails");
    emails.innerHTML = "";

    if (contact.emails) {
        Object.values(contact.emails).forEach(e => {
            if (!e) return;

            const div = document.createElement("div");
            div.className = "item";

            const span = document.createElement("span");
            span.textContent = e;

            const btn = document.createElement("button");
            btn.textContent = "Email";
            btn.onclick = () => post({ type: "sendEmail", value: e });

            div.appendChild(span);
            div.appendChild(btn);
            emails.appendChild(div);
        });
    }

    const phones = document.getElementById("phones");
    phones.innerHTML = "";

    if (contact.phoneNumbers) {
        Object.values(contact.phoneNumbers).forEach(p => {
            if (!p) return;

            const div = document.createElement("div");
            div.className = "item";

            const span = document.createElement("span");
            span.textContent = p;

            const btn = document.createElement("button");
            btn.textContent = "Anrufen";
            btn.onclick = () => post({ type: "callPhoneNumber", value: p });

            div.appendChild(span);
            div.appendChild(btn);
            phones.appendChild(div);
        });
    }
}

window.addEventListener("message", event => {
    contact = event.data.contact;
    render();
});