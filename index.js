var add_btn = document.querySelector('.add'); //추가버튼
var list_area = document.querySelector('.list-area'); //투두리스트 영역


function add_list(a) { //투두리스트에 요소와 내용 추가하는 내용 함수
	var li = `	<li>
						<input type="radio" name="" id="" class="check">
							 <p class="text-box">${a}</p>
						<div class="button-box">
								<button class="edit">수정</button>
								<button class="delete">삭제</button>
						</div>
					</li>`
	list_area.insertAdjacentHTML('beforeend', li);
	document.querySelector('.add-text').value = '';
}

function set_list() {
	var todo_arr = localStorage.getItem('todo'); //로컬스토리지에 있는 데이터 가져와서 변수에 넣기
	todo_arr = JSON.parse(todo_arr);
	if (todo_arr !== null) {
		for (i = 0; i < todo_arr.length; i++) {
			add_list(todo_arr[i]); // 투두리스트를 로컬스토리지 데이터 내용으로 그려줌.
		}

	} else {
		todo_arr = []; //로컬스토리지 내용이 없으면 빈배열로 정의.
	}
}

set_list();

//로컬리스트에 있는 데이터를 투두리스트에 뿌려줌.


//로컬스토리지에 추가
add_btn.addEventListener('click', function () {
	todo_arr = localStorage.getItem('todo');
	todo_arr = JSON.parse(todo_arr);
	var add_text = document.querySelector('.add-text').value; //input 창 내용
	if (add_text === '') {
		return false; // 인풋 창에 아무것도 없으면 작동안함
	} else {
		todo_arr.push(add_text); //추가하는 내용 투두리스트 배열에 추가


		// 로컬스토리지 세팅 추가기능 함수로 저장
		todo_arr2 = JSON.stringify(todo_arr); //추가된 투두리스트 json형태로
		localStorage.setItem('todo', todo_arr2); // 로컬스토리지에 todo 키 값의 배열 세팅
		list_area.innerHTML = ''; //전체리스트 지운 후 
		set_list(); //추가된 내용이 있는 리스트로 다시 그려줌.
	}
});

var edit_btn = document.querySelectorAll('.edit');
var delete_btn = document.querySelectorAll('.delete');
var check_btn = document.querySelectorAll('.check');

//완료체크
check_btn.forEach(function (el) {
	el.addEventListener('click', function () {
		el.parentElement.children[1].style.textDecoration = 'line-through';
	})
});


//삭제



delete_btn.forEach(function (el, index) {
	el.addEventListener('click', function () {		
		todo_arr = localStorage.getItem('todo');
		todo_arr = JSON.parse(todo_arr);
		todo_arr.splice(index, 1);
		todo_arr2 = JSON.stringify(todo_arr);
		localStorage.setItem('todo', todo_arr2);
		list_area.innerHTML = ''; //전체리스트 지운 후 
		set_list();
	});
	console.log(delete_btn)
	return delete_btn;

});


// add_btn.addEventListener('click', function () {
// 	var add_text = document.querySelector('.add-text').value;

// 	if(add_text === '' || add_btn.innerHTML ==='수정'){
// 		return false;
// 	}else{
// 		var li = `	<li>
// 					<input type="radio" name="" id="" class="check">
// 					<p class="text-box">${add_text}</p>
// 					<div class="button-box">
// 							<button class="edit">수정</button>
// 							<button class="delete">삭제</button>
// 					</div>
// 				</li>`
// 	list_area.insertAdjacentHTML('beforeend', li);
// 	document.querySelector('.add-text').value = '';
// 	}



// 	//삭제
// 	delete_btn.forEach(function (el) {
// 		el.addEventListener('click', function () {
// 			el.parentElement.parentElement.style.display = 'none';
// 		})
// 	});

// 	//수정
// 	edit_btn.forEach(function (el,index) {
// 		el.addEventListener('click', function () {
// 			document.querySelector('.add-text').value = el.parentElement.parentElement.children[1].innerHTML;
// 			add_btn.innerHTML='수정';		
// 			document.querySelector('.add').addEventListener('click', function () {
// 				el.parentElement.parentElement[index].innerHTML = document.querySelector('.add-text').value;
// 				add_btn.innerHTML='+';		
// 			})			
// 		})
// 	})
// 	document.querySelector('.add-text').value=''

// 	//완료표시


// });