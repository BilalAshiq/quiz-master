$(document).ready(()=>{

	// Setting API URLS
	const FETCH_QUESTIONS = "https://alphacoders.ga/projects/quizAPI/fetchQuestions.php";
	const ADD_QUESTION = "https://alphacoders.ga/projects/quizAPI/addQuestion.php";
	const DEL_QUESTION = "https://alphacoders.ga/projects/quizAPI/delQuestion.php";
	const FETCH_QUESTION = "https://alphacoders.ga/projects/quizAPI/fetchQuestion.php";
	const UPDATE_QUESTION = "https://alphacoders.ga/projects/quizAPI/updateQuestion.php";

	// Triming a long string
	function limitText(str, len) {
		return str.substr(0, len)+"...";
	}

	// Load questions table
	function loadTable() {
		output = "";
		$.ajax({
			url: FETCH_QUESTIONS,
			method: "GET",
			dataType: "json",
			success: function (data) {
				x = data;
				for(let i = 0; i < x.length; i++){
					output += "<tr><td>"+ x[i].q_no +"</td><td class='mobile-hidden'>"+ limitText(x[i].question, 15) +"</td><td>"+ x[i].correct +"</td><td><button class='edit btn btn-primary' q-id='"+ x[i].q_id +"'>Edit</button><button class='del btn btn-danger ml-2' q-id='"+ x[i].q_id +"'>Delete</button></td></tr>";
				}
				$("#main-table").html(output);
			},
			error: function () {
				console.log("err wd fetch req");
			}
		});
	}
	loadTable();

	// Saving Question
	$("#subBtn").click((e)=>{
		e.preventDefault();

		let question = $("#question").val();
		let qno = $("#qno").val();
		let opt1 = $("#opt-1").val();
		let opt2 = $("#opt-2").val();
		let opt3 = $("#opt-3").val();
		let opt4 = $("#opt-4").val();
		let correct = $("#correct").val();

		if (question == "" || qno == "" || opt1 == "" || opt2 == "" || opt3 == "" || opt4 == "" || correct == "0") {
			alert("All Fields Are Required");
		}
		else {
			let rawData = { qno:qno, question:question, opt1:opt1, opt2:opt2, opt3:opt3, opt4:opt4, correct:correct };
			let data = JSON.stringify(rawData);
			$.ajax({
				url: ADD_QUESTION,
				method: "POST",
				data: data,
				dataType: "json",
				success: function (data) {
					if (data.status == true) {
						$(".form")[0].reset();
						loadTable();
					}
				},
				error: function () {
					console.log("err wd add qstn req");
				}
			});
		}
	});

	// Deleting questions
	$("#main-table").on('click', '.del', function () {
		let id = $(this).attr('q-id');
		let data = JSON.stringify({ id:id });
		$.ajax({
			url: DEL_QUESTION,
			method: "POST",
			data: data,
			dataType: "json",
			success :function (data) {
				loadTable();
				alert(data.msg);
			},
			error: function () {
				console.log("err wd del req");
			}
		});
	})

	// Editing Question
	$("#main-table").on('click', '.edit', function () {
		$("#subBtn").hide();
		$("#update").show();

		let id = $(this).attr('q-id');
		let data = JSON.stringify({ id:id });
		$.ajax({
			url: FETCH_QUESTION,
			method: "POST",
			data: data,
			dataType: "json",
			success :function (data) {
				x = data;
				$("#question").val(x.question);
				$("#qno").val(x.q_no);
				$("#opt-1").val(x.opt_1);
				$("#opt-2").val(x.opt_2);
				$("#opt-3").val(x.opt_3);
				$("#opt-4").val(x.opt_4);
				$("#correct").val(x.correct);
			},
			error: function () {
				console.log("err wd del req");
			}
		});
	})

	// Update Question
	$("#update").click(()=>{
		let qno = $("#qno").val();
		let question = $("#question").val();
		let opt1 = $("#opt-1").val();
		let opt2 = $("#opt-2").val();
		let opt3 = $("#opt-3").val();
		let opt4 = $("#opt-4").val();
		let correct = $("#correct").val();
		
		let rawData = { qno:qno, question:question, opt1:opt1, opt2:opt2, opt3:opt3, opt4:opt4, correct:correct };
		let data = JSON.stringify(rawData);

		$.ajax({
				url: UPDATE_QUESTION,
				method: "POST",
				data: data,
				dataType: "json",
				success: function (data) {
					$(".form")[0].reset();
					loadTable();
					$("#subBtn").show();
					$("#update").hide();
					alert("Updated!");
				},
				error: function () {
					console.log("err wd add qstn req");
				}
			});
	});

}); //main