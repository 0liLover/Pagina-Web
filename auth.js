import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyABld3pwDd9q-27vmP2-A85xjOk4R038Go",
  authDomain: "bdpaginapinto.firebaseapp.com",
  databaseURL: "https://bdpaginapinto-default-rtdb.firebaseio.com",
  projectId: "bdpaginapinto",
  storageBucket: "bdpaginapinto.firebasestorage.app",
  messagingSenderId: "242386376652",
  appId: "1:242386376652:web:be52f8cf494e9f82876f69"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const redirectOnSuccess = "inicio.html";

function showMessage(element, message) {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("d-none");
}

function hideMessage(element) {
  if (!element) return;
  element.textContent = "";
  element.classList.add("d-none");
}

function setLoading(loadingElement, isLoading) {
  if (!loadingElement) return;
  loadingElement.classList.toggle("d-none", !isLoading);
}

function getAuthErrorMessage(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "El correo no es válido.";
    case "auth/user-not-found":
      return "No existe una cuenta con ese correo.";
    case "auth/wrong-password":
      return "La contraseña es incorrecta.";
    case "auth/email-already-in-use":
      return "Ese correo ya está registrado.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "auth/too-many-requests":
      return "Se han realizado demasiados intentos. Intenta más tarde.";
    default:
      return "Ocurrió un error. Intenta de nuevo.";
  }
}

function attachRegister(form, emailInput, passwordInput, confirmInput, errorElement, loadingElement) {
  if (!form || !emailInput || !passwordInput || !confirmInput) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideMessage(errorElement);
    setLoading(loadingElement, true);

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmInput.value.trim();

    if (password !== confirmPassword) {
      showMessage(errorElement, "Las contraseñas no coinciden.");
      setLoading(loadingElement, false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = redirectOnSuccess;
    } catch (error) {
      showMessage(errorElement, getAuthErrorMessage(error));
    } finally {
      setLoading(loadingElement, false);
    }
  });
}

function attachLogin(form, emailInput, passwordInput, errorElement, loadingElement) {
  if (!form || !emailInput || !passwordInput) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideMessage(errorElement);
    setLoading(loadingElement, true);

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = redirectOnSuccess;
    } catch (error) {
      showMessage(errorElement, getAuthErrorMessage(error));
    } finally {
      setLoading(loadingElement, false);
    }
  });
}

attachRegister(
  document.getElementById("registerForm"),
  document.getElementById("registroCorreo"),
  document.getElementById("registroClave"),
  document.getElementById("registroClaveConfirm"),
  document.getElementById("errorMessage"),
  document.getElementById("loadingMessage")
);

attachRegister(
  document.getElementById("registerFormIndex"),
  document.getElementById("registerCorreoIndex"),
  document.getElementById("registerClaveIndex"),
  document.getElementById("registerClaveConfirmIndex"),
  document.getElementById("registerErrorIndex"),
  document.getElementById("registerLoadingIndex")
);

attachLogin(
  document.getElementById("loginForm"),
  document.getElementById("loginCorreo"),
  document.getElementById("loginClave"),
  document.getElementById("loginError"),
  document.getElementById("loginLoading")
);
