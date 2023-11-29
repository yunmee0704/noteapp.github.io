var add_btn = document.querySelector('.add');
var list_area = document.querySelector('.list-area');


add_btn.addEventListener('click', function () {
	var add_text = document.querySelector('.add-text').value;
	var li = `	<li>
					<input type="radio" name="" id="" class="check">
					<p class="text-box">${add_text}</p>
					<div class="button-box">
							<button class="edit">수정</button>
							<button class="delete">삭제</button>
					</div>
				</li>`
	list_area.insertAdjacentHTML('beforeend', li);
	document.querySelector('.add-text').value = '';

	var edit_btn = document.querySelectorAll('.edit');
	var delete_btn = document.querySelectorAll('.delete');
	var check_btn =document.querySelectorAll('.check');

	//삭제
	delete_btn.forEach(function (el) {
		el.addEventListener('click', function () {
			el.parentElement.parentElement.style.display = 'none';
		})
	});

	//수정
	edit_btn.forEach(function (el) {
		el.addEventListener('click', function () {
			document.querySelector('.add-text').value = el.parentElement.parentElement.children[1].innerHTML;
			add_btn.innerHTML='수정';
			add_btn.addEventListener('click', function () {
				el.parentElement.parentElement.children[1].innerHTML = document.querySelector('.add-text').value;
				add_btn.innerHTML='+';
			})

		})
	})

	//완료표시
	check_btn.forEach(function(el){
		el.addEventListener('click',function(){
			el.parentElement.children[1].style.textDecoration ='line-through'
		})
	})

});