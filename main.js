document.getElementById("button").onclick = function generatePass(){
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+}{:;[]=-<>";
    let password = "";

    for(let i = 0; i <= 15; i++){
        let random = Math.floor(Math.random() * chars.length);
        password += chars.substring(random, random+1);
    }
    
    document.getElementById("input").value = password
}
