
const form = document.getElementById("regform");
const memberList = document.getElementById("memberList");
const count = document.getElementById("count");
const successMsg = document.getElementById("successMsg");
const themeButton = document.getElementById("theme");

let members = [];

const fields = [
  "name", "email", "password", "confirm-password",
  "gender", "dob", "country", "phone", "bio"
];

function showError(id, message) {
  const error = document.getElementById(id + "Error");
  if (error) error.textContent = message;
}

function clearErrors() {
  [
    "name", "email", "password", "confirm",
    "gender", "dob", "country", "phone", "bio"
  ].forEach(id => showError(id, ""));
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();
  successMsg.textContent = "";
  successMsg.classList.add("hidden");

  const member = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value,
    confirm: document.getElementById("confirm-password").value,
    gender: document.getElementById("gender").value,
    dob: document.getElementById("dob").value,
    country: document.getElementById("country").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    bio: document.getElementById("bio").value.trim()
  };

  let valid = true;

  function invalid(id, message) {
    showError(id, message);
    valid = false;
  }

  if (member.name.length < 2)
    invalid("name", "Enter your full name.");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email))
    invalid("email", "Enter a valid email address.");

  if (member.password.length < 8)
    invalid("password", "Use at least 8 characters.");

  if (member.confirm !== member.password)
    invalid("confirm", "Passwords do not match.");

  if (!member.gender)
    invalid("gender", "Select your gender.");

  if (!member.dob || new Date(member.dob) >= new Date())
    invalid("dob", "Enter a valid date of birth.");

  if (!member.country)
    invalid("country", "Enter your country.");

  if (!/^[+0-9\s()-]{7,20}$/.test(member.phone))
    invalid("phone", "Enter a valid phone number.");

  if (member.bio.length < 10)
    invalid("bio", "Write at least 10 characters about yourself.");

  if (members.some(item =>
    item.email.toLowerCase() === member.email.toLowerCase()
  )) {
    invalid("email", "This email is already registered.");
  }

  if (!valid) return;

  // Never display or store the password in the member list.
  members.push({
    name: member.name,
    email: member.email,
    country: member.country
  });

  renderMembers();
  form.reset();

  successMsg.textContent = "Registration successful!";
  successMsg.classList.remove("hidden");
});

function renderMembers() {
  memberList.replaceChildren();

  count.textContent = members.length;

  if (members.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No members yet. Register someone to begin.";
    memberList.appendChild(empty);
    return;
  }

  members.forEach(member => {
    const item = document.createElement("li");
    item.className = "member-item";

    const name = document.createElement("strong");
    name.textContent = member.name;

    const email = document.createElement("p");
    email.textContent = member.email;

    const country = document.createElement("p");
    country.textContent = member.country;

    item.append(name, email, country);
    memberList.appendChild(item);
  });
}

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");

  themeButton.textContent =
    document.body.classList.contains("dark-mode")
      ? "Light Mode"
      : "Dark Mode";
});
