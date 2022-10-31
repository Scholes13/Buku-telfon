// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCOjYGMcJ04g4fdhIlT4TQSVUPQdfhm_ZA",
    authDomain: "bukutelfon-b7f83.firebaseapp.com",
    projectId: "bukutelfon-b7f83",
    storageBucket: "bukutelfon-b7f83.appspot.com",
    messagingSenderId: "56185164778",
    appId: "1:56185164778:web:1872f3b3bebeb544ef9893",
    measurementId: "G-ZNKD7GCMVX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let database = firebase.database();
  let namaV = document.getElementById("nama");
  let nohpV = document.getElementById("nohp");
  let tbody = document.getElementById("tbody");
  let editnama = document.getElementById("editnama");
  let editnohp = document.getElementById("editnohp");
  let idV = document.getElementById("id");
  //Create Data
  
  function createData() {
    let data = {
      nama: namaV.value,
      nohp: nohpV.value
    };
    database.ref("bukutelepon").push(data);
    namaV.value = "";
    nohpV.value = "";
  }
  
  // Read Data
  database.ref("bukutelepon").on("value", ambildata);
  function ambildata(snapshoot) {
    let table = "";
    let no = 1;
    snapshoot.forEach((data) => {
      // console.log(data.val());
      table += `
            <tr>   
              <th scope="row">${no}</th>
              <td>${data.val().nama}</td>
              <td>${data.val().nohp}</td>
              <td><button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editRow('${data.key}')">
              Edit
              </button>
              <button type="button" class="btn btn-danger" onclick="deleteRow('${data.key}') ">Hapus</button>
              
              
              </td>
            </tr>
      
      `;
      no++;
    });
  
    tbody.innerHTML = table;
  }
  
  //show data edit
  function editRow(id) {
    database.ref("bukutelepon/" + id).on("value", function (snapshoot) {
      editnama.value = snapshoot.val().nama;
      editnohp.value = snapshoot.val().nohp;
      idV.value = id;
    });
  }
  
  //update data
  function updateData() {
    let updateData = document.getElementById("updateData");
    let data = {
      nama: editnama.value,
      nohp: editnohp.value
    };
    database.ref("bukutelepon/" + idV.value).update(data);
    updateData.setAttribute("data-bs-dismiss", "modal");
  }
  
  function deleteRow(id) {
    database.ref("bukutelepon/" + id).remove();
  }