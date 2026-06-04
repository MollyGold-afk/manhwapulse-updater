const admin = require("firebase-admin");

// Load Firebase credentials from GitHub Secrets
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function updateManhwa() {
  console.log("Checking for updates...");

  const seriesRef = db.collection("series");
  const snapshot = await seriesRef.get();

  snapshot.forEach(async (doc) => {
    const data = doc.data();

    // 🔥 MOCK LOGIC (replace with real scraping later)
    const newChapter = data.latestChapter + 1;

    console.log(`Checking ${data.title}`);

    // Example update condition (fake)
    if (Math.random() > 0.7) {
      await doc.ref.update({
        latestChapter: newChapter,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Updated: ${data.title} → Chapter ${newChapter}`);
    }
  });
}

updateManhwa().then(() => {
  console.log("Done");
});
