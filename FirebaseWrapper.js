var wrappedInitializeApp = null;
var wrappedFirestore = null;
let app = null;
const firebaseConfig = {
    apiKey: "AIzaSyCw-_e4hKQgCrs2QKK6j5fLyaZDhZYKh20",
    authDomain: "bsdk-9c040.firebaseapp.com",
    databaseURL: "https://bsdk-9c040-default-rtdb.firebaseio.com",
    projectId: "bsdk-9c040",
    storageBucket: "bsdk-9c040.appspot.com",
    messagingSenderId: "190275903465",
    appId: "1:190275903465:web:392e91f5f0b1234248f578"
};

function FirebaseWrapper(){

}

FirebaseWrapper.prototype.init = async function(){
    wrappedInitializeApp = (await import('firebase/app')).initializeApp;
    wrappedFirestore = (await import('firebase/firestore'));

    app = wrappedInitializeApp(firebaseConfig);
};

FirebaseWrapper.prototype.storeId = async function(id, transactionId, campaignName) {
    const db = wrappedFirestore.getFirestore(app);
    const coll = wrappedFirestore.collection(db, "BSDKPremiumUsers");
    const document = wrappedFirestore.doc(coll, "Users-" + id);
    try {
        let data = {
            "UserId": id,
            "Timestamp": new Date().getTime()
        };
        if (transactionId) data["TransactionId"] = transactionId;
        if (campaignName) data["CampaignName"] = campaignName;

        const docRef = await wrappedFirestore.setDoc(document , data); //.then(console.log).catch(console.error);

    } catch(msg) {
        console.error("Error adding document: ", msg);
        return "failure";
    };
    return "success";
};

FirebaseWrapper.prototype.getId=async function (id) {
    const db = wrappedFirestore.getFirestore(app);
    const coll = wrappedFirestore.collection(db, "BSDKPremiumUsers");
    const document = wrappedFirestore.doc(coll, "Users-" + id);
    try {
        const docRef =await  wrappedFirestore.getDoc(document)
        return docRef.data();
    } catch(msg) {
        console.error("Error adding document: ", msg);
    }
};

module.exports = FirebaseWrapper;