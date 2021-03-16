var projects = [];

function saveProjects(){
    //create an object that stores the data of the form.
    var project = {
        clientname: document.getElementById('clientname').value,
        projectname: document.getElementById('projectname').value,
        budget: document.getElementById('budget').value
    }
    //console.log(project);
    //now push this object in the projects array
    projects.push(project);
    //console.log(projects);
    localStorage.setItem('BudgetPlanner', JSON.stringify(projects));
}
var projects2 = [];
var sum = 0;
//create a function that retrieves the data from the sessionStorage and 
//puts that data into a table.
function genTable(){
    var retrievedData = localStorage.getItem('BudgetPlanner');
    projects2 = JSON.parse(retrievedData);

 var html = '<table class= "tableClass">';
 html += '<tr>';
 //Top row of the table
 html += '<th class="thClass">' + "Client Name" + '</th>';
 html += '<th class="thClass">' + "Project Name" + '</th>';
 html += '<th class="thClass">' + "Budget" + '</th>';
 
 html += '</tr>';
 for( var i = 0; i < projects2.length; i++) {
  html += '<tr>';
  for( var j in projects2[i] ) {
    html += '<td class="tdClass">' + projects2[i][j] + '</td>';
    
  }

  sum = sum + parseInt(projects2[i].budget);

  html += '</tr>';
 }

 console.log(sum);

 html += '</table>';
 document.getElementById('container').innerHTML = html;

}
