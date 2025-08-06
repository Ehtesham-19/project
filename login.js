const login=document.getElementById("login");
login.addEventListener("submit",function(event){
    event.preventDefault();
    const enterusername=document.getElementById("username").value;
    const enterpw=document.getElementById("pw").value;
    const users=JSON.parse(localStorage.getItem("users"))||[];
    const matcheduser=users.find(user=>
        user.username===enterusername&&user.password===enterpw
    );
   if (matcheduser) {
    alert("login successfully");

    sessionStorage.setItem("loggedInUser", JSON.stringify(matcheduser));

    window.location.href = "todo.html";
}
else{
        alert("login failed")
    }
    
})