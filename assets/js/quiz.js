$(document).ready(()=>{

	// Setting API URLS
	const FETCH_QUESTIONS = "https://alphacoders.ga/projects/quizAPI/fetchQuestions.php";
	const CHECK_ANSWER = "https://alphacoders.ga/projects/quizAPI/checkAnswer.php";
	// Render Single Question
	function renderQuestion(q_id, q_no, question, opt_1, opt_2, opt_3, opt_4) {
		return `
			<ul class="question-item">
				<h2 id="q" class="question" q-id="`+ q_id +`">`+ q_no +`) `+ question +`</h2>
				<li>
					<div class="option" opt-id="1">
						<div class="option-number">1</div>
						<div class="option-text">`+ opt_1 +`</div>
					</div>
				</li>
				<li>
					<div class="option" opt-id="2">
						<div class="option-number">2</div>
						<div class="option-text">`+ opt_2 +`</div>
					</div>
				</li>
				<li>
					<div class="option" opt-id="3">
						<div class="option-number">3</div>
						<div class="option-text">`+ opt_3 +`</div>
					</div>
				</li>
				<li>
					<div class="option" opt-id="4">
						<div class="option-number">4</div>
						<div class="option-text">`+ opt_4 +`</div>
					</div>
				</li>
			</ul>
		`;
	}

	// Loading Questions
	function loadQuestions() {
		let output = "";
		$.ajax({
			url: FETCH_QUESTIONS,
			method: "GET",
			dataType: "json",
			success: function (data) {
				x = data;
				if (x.status != false) {
					for(let i = 0; i < x.length; i++){
						output += renderQuestion(x[i].q_id, x[i].q_no, x[i].question, x[i].opt_1, x[i].opt_2, x[i].opt_3, x[i].opt_4);
					}
					$(".progress-bar-container").hide();
					$("#questions").html(output);
				}
			},
			error: function () {
				console.log("err wd fetch qnsts req");
			}
		});
	}
	loadQuestions();

	// Capturing option click
	$("#questions").on('click', '.option', function () {
		let myThis = this;
		let opt_id = $(this).attr('opt-id');
		let q_id = $(this).closest(".question-item").children("h2").attr('q-id');
		let data = JSON.stringify({ q_id:q_id, opt_id:opt_id });
		$.ajax({
			url: CHECK_ANSWER,
			method: "POST",
			data: data,
			dataType: "json",
			success: function (data) {
				if (data.result == true) {
					$(myThis).css('border', '3px solid green');
				}
				else if (data.result == false){
					$(myThis).css('border', '3px solid red');
				}
			},
			error: function () {
				console.log('err with check answer req');
			}
		});
	});	

}); //main