// let allUsers = JSON.parse(localStorage.getItem("usersList") || "[]");
// let teamtask = JSON.parse(localStorage.getItem("teamtaskList") || "[]");
const uri = "http://localhost:8080/api/alltasks/";
let worklogs =[];
let teamtask=[];
// = JSON.parse(localStorage.getItem("workLogList") || "[]");
var obj;

function logout() {
  sessionStorage.clear();
  alert("log out..")
  location.href = "login.html"
}

function data() {
  teamtask.filter(x => x.status === "Completed").length
  obj = {
    "totalTask": teamtask.length,
    "completedTask": teamtask.filter(x => x.status === "Completed").length,
    // "incompletedTask":worklogs.filter(x=>x.status==="Inprogress").length,
    "incompletedTask": teamtask.filter(x => x.status === "Inprogress").length,

    "taskExceededDueDate": 2
  };

}

function getLogs() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      teamtask=JSON.parse(xhttp.responseText);
      // _displayItems(JSON.parse(xhttp.responseText));
      console.log(JSON.parse(xhttp.responseText));
    
  // worklogs

  var html = "";
  for (var i = 0; i < teamtask.length; i++) {
    html += "<tr>";
    html +=
      "<td>" +
      teamtask[i].taskname +
      "<td>" +
      teamtask[i].description +
      "<td>" +
      teamtask[i].assigneto +
      "<td>" +
      teamtask[i].assignedate +
      "<td>" +
      teamtask[i].duedate +
      "<td>" +
      teamtask[i].status +
      "</td>";
    html += "</tr>";
  }
  document.getElementById("logs").innerHTML = html;
  addOptions();
  data();
  document.getElementById("data1").innerHTML = obj.totalTask;
  document.getElementById("data2").innerHTML = obj.completedTask;
  document.getElementById("data3").innerHTML = obj.incompletedTask;
  document.getElementById("data4").innerHTML = obj.taskExceededDueDate;
  // +"\n"+obj.incompletedTask +obj.taskExceededDueDate
  myFunction('1');
}
};
xhttp.open("GET", uri, true);
xhttp.send();
}

function addOptions() {
  document.getElementById("userDropdown").innerHTML = "";
  $("#profileForm #userDropdown").length = 0;

  var jsonArray = JSON.parse(localStorage.getItem("usersList") || "[]");
  var userOnly = jsonArray.filter((person) => person.role === "U");

  var select = document.getElementById("userDropdown");
  var option;
  for (var i = 0; i < userOnly.length; i++) {
    option = document.createElement("option");
    option.text = userOnly[i]["username"];
    select.add(option);
    console.log(option)
  }
}

function setteamtask() {
  if (localStorage) {
    localStorage.setItem("teamtaskList", JSON.stringify(teamtask));
    // console.log(JSON.parse(localStorage.getItem("teamtaskList") || "[]"));
  } else {
    alert("Sorry, your browser do not support local storage.");
  }
}

function save() {
  var newteamtask = {
    taskname: document.getElementById("taskname").value,
    description: document.getElementById("description").value,
    assignedto: document.getElementById("userDropdown").value,
    assignedate: document.getElementById("assignedate").value,
    duedate: document.getElementById("duedate").value,


  };
  // console.log(index);
  console.log(newteamtask);
  teamtask.push(newteamtask);
  setteamtask();
  teamfun();
}

function performSearch() {
  // Declare variables
  var input, filter, table, tr, i, j, column_length, count_td;
  column_length = document.getElementById("myTable").rows[0].cells.length;
  input = document.getElementById("searchBoxText");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 1; i < tr.length; i++) {
    // except first(heading) row
    count_td = 0;
    for (j = 0; j < column_length - 1; j++) {
      // except first column
      td = tr[i].getElementsByTagName("td")[j];
      /* ADD columns here that you want you to filter to be used on */
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          count_td++;
        }
      }
    }
    if (count_td > 0) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

function Atest() {
  $(".htoggler").prop("checked", false);
}


function myFunction(curDiv) {

 var x = document.getElementById(curDiv);
  if (curDiv === "1") {
    
    document.getElementById("searchBox").style.display = "none";
    document.getElementById("taskSummary").style.display = "none";
    document.getElementById("statusTable").style.display = "block";
  }
  
  if (curDiv === "searchBox") {
   
    document.getElementById("searchBox").style.display = "block";
    document.getElementById("taskSummary").style.display = "none";
    document.getElementById("statusTable").style.display = "block";
  }
  if (curDiv === "taskSummary") {
    
    document.getElementById("searchBox").style.display = "none";
    document.getElementById("taskSummary").style.display = "block";
    document.getElementById("statusTable").style.display = "block";
  }
 
  async function load_home(url) {
    //   alert(e);
    // let url = "manageuser.html";
    content.innerHTML = await (await fetch(url)).text();
  }
  
  Atest();
}