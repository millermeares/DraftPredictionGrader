let results = require("./Results");
var csv = require("csvtojson");
let entryFile="./Entry/NFL_Draft_Predictions.csv";
csv().fromFile(entryFile).then(function(obj){
    parseAndGradeTeams(obj);
});


const parseAndGradeTeams = function(obj) {
    let teams = []
    let result = null;
    obj.forEach(item => {
        let username = item.Username;
        let team = new results.PredictionSet(username, item);
        if(username==='results') {
            result = team;
        } else {
            teams.push(team);
        }
    });
    gradeTeams(teams, result);
};

const gradeTeams = function(entries, result) {
    entries.forEach(entry => gradeTeam(entry, result));
    entries.sort((a, b) => (a.getGrade() > b.getGrade()) ? -1 : 1);
    entries.forEach(entry => {
        console.log(entry.getUsername() + ': ' + entry.getGrade());
    });
}

const gradeTeam = function(entry, result) {
    let result_set = result.getSet();
    let entry_set = entry.getSet();
    let grade = 0;
    // console.log(result);
    Object.entries(result_set).forEach(([key, value]) => {
        let entry_answer = entry_set[key];
        let result_answer = result_set[key];
        if(!result_answer || !entry_answer) {
            return;
        }
        if(!isNaN(result_answer)) {
            // this is a draft spot. 
            let diff = Math.abs(entry_answer - result_answer);
            if(diff <= 15) {
                grade += diff
            } else if(diff >= 16 && diff <= 30) {
                grade += 0;
            } else {
                grade += (-1 * (diff-30));
            }
        } else {
            if(entry_answer === result_answer){
                grade += 10;
            }
        }
    });
    entry.setGrade(grade);
}