var add_btn = document.querySelector('.add');
var list_area = document.querySelector('.list-area');


add_btn.addEventListener('click', function () {
	var add_text = document.querySelector('.add-text').value;
	var li = `<li>
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


	delete_btn.forEach(function (el) {
		el.addEventListener('click', function () {
			el.parentElement.parentElement.style.display = 'none';
		})
	});

	edit_btn.forEach(function (el) {
		el.addEventListener('click', function () {
			el.parentElement.parentElement.children[0].innerHTML = document.querySelector('.add-text').value;
		})
	})

});