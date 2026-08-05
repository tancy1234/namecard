

async function loadUser() {

    const params = new URLSearchParams(window.location.search);

    const userId = params.get("id");

    try {

        const response = await fetch("users.json");

        const users = await response.json();

        let user;

        if (userId) {

            user = users.find(u => u.id === userId);

        } else {

            user = users[0];

        }

        if (!user) {

            document.querySelector(".name-card").innerHTML = `
                <h2>User Not Found</h2>
                <p>Please check the name card ID.</p>
            `;

            return;
        }

        document.getElementById("company").textContent = user.company;

        document.getElementById("name").textContent = user.name;

        document.getElementById("position").textContent = user.position;

        document.getElementById("department").textContent = user.department;

        document.getElementById("phone").innerHTML = `
            <a href="tel:${user.phone}">
                ${user.phone}
            </a>
        `;

        document.getElementById("email").innerHTML = `
            <a href="mailto:${user.email}">
                ${user.email}
            </a>
        `;

        document.getElementById("website").innerHTML = `
            <a href="${user.website}" target="_blank">
                ${user.website}
            </a>
        `;

        document.getElementById("address").textContent = user.address;


        // Social media

        const linkedinButton = document.getElementById("linkedin");

        if (user.social && user.social.linkedin) {

            linkedinButton.href = user.social.linkedin;

        } else {

            linkedinButton.style.display = "none";

        }

    } catch (error) {

        console.error("Error loading users.json:", error);

    }
}


function saveContact() {

    const name = document.getElementById("name").textContent.trim();
    const company = document.getElementById("company").textContent.trim();

    const phoneElement = document.querySelector("#phone a");
    const emailElement = document.querySelector("#email a");
    const websiteElement = document.querySelector("#website a");

    const phone = phoneElement
        ? phoneElement.textContent.trim()
        : "";

    const email = emailElement
        ? emailElement.textContent.trim()
        : "";

    const website = websiteElement
        ? websiteElement.href
        : "";

    const vCard = `BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:${company}
TEL;TYPE=CELL:${phone}
EMAIL:${email}
URL:${website}
END:VCARD`;

    const blob = new Blob(
        [vCard],
        {
            type: "text/vcard;charset=utf-8"
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `${name}.vcf`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

async function saveNameCard() {

    const card = document.querySelector(".name-card");

    try {

        const canvas = await html2canvas(card, {
            scale: 3,
            backgroundColor: "#ffffff"
        });

        const link = document.createElement("a");

        const name = document.getElementById("name").textContent;

        link.download = `${name}-Name-Card.png`;

        link.href = canvas.toDataURL("image/png");

        link.click();

    } catch (error) {

        console.error("Error saving name card:", error);

        alert("Unable to save the name card.");

    }

}


loadUser();
