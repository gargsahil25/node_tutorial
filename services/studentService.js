var studentData = require("../mocks/studentData.json");

module.exports.getStudentsPage = function(req, res) {
	// console.log(studentData);
	res.render('studentView.ejs', {
        students: studentData
    });
}

module.exports.getToppers = function(req, res) {
	var toppers = [];
	for (var i in studentData) {
		if ((studentData[i].scores.physics + studentData[i].scores.chemistry + studentData[i].scores.maths)/3 > 75) {
			toppers.push(studentData[i]);
		}
	}
	res.json(toppers);
}