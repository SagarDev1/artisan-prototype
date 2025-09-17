
// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBDN-anb09JMlQOZnd8sBCCFwVJq1B3iCY",
  authDomain: "artisan-ai-assistant-44976.firebaseapp.com",
  projectId: "artisan-ai-assistant-44976",
  storageBucket: "artisan-ai-assistant-44976.appspot.com", // ✅ fixed
  messagingSenderId: "297978618369",
  appId: "1:297978618369:web:06d0646c27b364f47dd600",
  measurementId: "G-WJ4FL7HQGT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const uploadForm = document.getElementById("uploadForm");
const productList = document.getElementById("productList");

// Handle form submit
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const imageUrl = document.getElementById("productImageUrl").value; // Paste URL

  await db.collection("products").add({
    name,
    price,
    imageUrl,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });

  alert("✅ Product uploaded!");
  uploadForm.reset();
  loadProducts();
});

// Load products from Firestore
async function loadProducts() {
  productList.innerHTML = "";
  const snapshot = await db.collection("products").orderBy("createdAt", "desc").get();
  snapshot.forEach((doc) => {
    const data = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${data.name}</strong> - ₹${data.price || "N/A"}<br>
      ${data.imageUrl ? `<img src="${data.imageUrl}" width="120">` : ""}
    `;
    productList.appendChild(li);
  });
}

// Load on page open
loadProducts();



// Test Firestore write
db.collection("test").add({ msg: "hello", time: Date.now() })
  .then(() => console.log("✅ Test write successful"))
  .catch(err => console.error("❌ Test write failed", err));
