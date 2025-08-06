
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newuser = { name, username, password };

    // Save to localStorage and sessionStorage
    let localuser = JSON.parse(localStorage.getItem("users")) || [];
    let sessionuser = JSON.parse(sessionStorage.getItem("users")) || [];

    localuser.push(newuser);
    sessionuser.push(newuser);

    localStorage.setItem("users", JSON.stringify(localuser));
    sessionStorage.setItem("users", JSON.stringify(sessionuser));

    // Save to cookie
    setUserCookie(newuser);

    // Save to IndexedDB
    saveUserToIndexedDB(newuser);

    alert("Data saved successfully");
    window.location.href = "login.html";
  });

  function setUserCookie(user) {
    const expires = new Date();
    expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const expiry = "expires=" + expires.toUTCString() + "; path=/";

    document.cookie = "username=" + encodeURIComponent(user.username) + ";" + expiry;
    document.cookie = "name=" + encodeURIComponent(user.name) + ";" + expiry;
    document.cookie = "password=" + encodeURIComponent(user.password) + ";" + expiry;
  }

  // -------------------------------
  // ✅ IndexedDB Function
  function saveUserToIndexedDB(user) {
    const request = indexedDB.open("UserDB", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      const store = db.createObjectStore("users", { keyPath: "username" });
      store.createIndex("name", "name", { unique: false });
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction("users", "readwrite");
      const store = transaction.objectStore("users");
      store.put(user);
    };

    request.onerror = function () {
      console.error("Error opening IndexedDB");
    };
  }

