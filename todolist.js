//요소 선택 및 배열 선언
const todoList = document.getElementById('todo-list')
const todoForm = document.getElementById('todo-form')


let todoArr=[];



//로컬저장소에 저장하기
 function saveTools(){
    const todoString = JSON.stringify(todoArr);
    localStorage.setItem('myTodos',todoString)
    displayTodos()
 }
//로컬저장소에서 가져오기
function loadTodos(){
   const myTodos = localStorage.getItem('myTodos')
    if(myTodos !== null){
        todoArr = JSON.parse(myTodos)
        displayTodos()
    }  
   
}

loadTodos()//로드 되면 로컬저장소에서 가져온 것 보여주기

//할일 삭제하기
function handleTodoDelBtnClick(clickedId){    
   
    todoArr = todoArr.filter(function(aTodo){
        return aTodo.todoId !== clickedId//배열의 각 자료들의 todoId를 비교해서 둘 다 다른 것들만 정제하여 갱신하기        
    })
    
    displayTodos()//보여주기
    saveTools()//로컬저장소에 저장하기
}



//한일 완료 체크하기
function handleTodoItemClick(clickedId){
    todoArr = todoArr.map(function(aTodo){
        if(aTodo.todoId === clickedId){
            return{
                ...aTodo, //할일리스트의 배열을 가져오기
                todoDone: !aTodo.todoDone//false를 true,true를 false로 바꿈
            }
        }else{
            return aTodo
        }
        
    })
    
    displayTodos()

    saveTools()
}

//할일 보여주기
function displayTodos(){    
    todoList.innerHTML=''//초기화 한 후에 진행함. 안그러면 누적된 데이터가 매번 보여짐 
   
    todoArr.forEach(function(aTodo){//로컬스토리지에서 가져온 투두리스트의 자료들만큼
        const todoItem = document.createElement('li')//li 생성
        const div1 =document.createElement('div')//div 생성
        const div2 =document.createElement('div')//div 생성
        div2.className='save-btn-box';
        todoItem.appendChild(div1);
        todoItem.appendChild(div2);
        const EditSaveBtn = document.createElement('span')
        EditSaveBtn.textContent='저장'
       
        const todoContent = document.createElement('textarea')//내용들어갈 부분 
        const btnGroup = document.createElement('p')//버튼그룹 생성
        const todoDelBtn = document.createElement('span')//삭제버튼 생성
        const todoDoneBtn = document.createElement('span')//수정버튼 생성
        todoDelBtn.textContent='삭제'//그 안에 들어갈 삭제버튼 생성
        todoDoneBtn.textContent='완료'//그 안에 들어갈 삭제버튼 생성
        todoContent.textContent = aTodo.todoText //li안에 들어갈 내용은 투두리스트 배열의 각 자료의 내용
        todoItem.title='클릭하면 완료됨'//li위에 마우스를 올리면 완료하는 방법 나옴
        todoDelBtn.title='클릭하면 삭제됨'//삭제버튼 위에 마우스 올리면 삭제하는법 설명        
      

        // 완료스타일
        if(aTodo.todoDone){//만약 todoDone이 true가 되면
            todoItem.classList.add('done')//done클래스를 붙여 완료표시 스타일 줌
        }else{ //아니면
            todoItem.classList.add('yet')//done클래스 안의 스타일을 사라지게.
            
        }        

        // 완료표시
        todoDoneBtn.addEventListener('click',function(){
            handleTodoItemClick(aTodo.todoId);               
        })

        // 삭제
        todoDelBtn.addEventListener('click',function(){            
            handleTodoDelBtnClick(aTodo.todoId)         
        })

        //할일 수정하기
        function handletodoEditBtnClick(clickedId){
            todoArr = todoArr.map(function(aTodo){
                if(aTodo.todoId === clickedId){    
                return {
                    ...aTodo,
                    todoText : todoContent.value                        
                }           
                }else{
                    return aTodo
                }      
            }
            
            )
            
            displayTodos()//보여주기
            saveTools()//로컬저장소에 저장하기  
  
        }
        // 수정컨트롤러나오기
        todoContent.addEventListener('click',function(){
            var elementsToHide = document.querySelectorAll('.save-btn-box');
            elementsToHide.forEach(function (element) {
                element.style.display = 'none';
            });
            div2.style.display='block';
            div2.classList.add('show'); //edit-controller 보이도록
        })
        //수정버튼 클릭시
        EditSaveBtn.addEventListener('click',function(e){          
            handletodoEditBtnClick(aTodo.todoId) //수정하여 배열에 다시 수정 저장 후 로컬스토리지에 저장            
        })   
    
      
        todoList.appendChild(todoItem)//새로운 내용 추가
        div1.appendChild(todoContent)//버튼그룹 추가
        div1.appendChild(btnGroup)//버튼그룹 추가
        div2.appendChild(EditSaveBtn);
        
      
        btnGroup.appendChild(todoDelBtn)//삭제버튼 추가
        btnGroup.appendChild(todoDoneBtn)//수정버튼 추가
    })

    if(todoArr.length !==0){
        document.querySelector('.left-message').classList.add('on')
        var leftTodo = document.getElementsByClassName('yet').length;//클래스가 yet인 것 갯수 찾기
        document.querySelector('.left-message strong').textContent = leftTodo; // 남은 해야할 일 갯수 텍스트로 넣기 
    }else{
        document.querySelector('.left-message').classList.remove('on')
    }


}


//할일 추가하기
todoForm.addEventListener('submit',function(e){
        e.preventDefault()//submit는 페이지가 새로고침하는 기능이 있어서 방지.
        if(todoForm.todo.value !== ''){//인풋창에 값이 공백이 아니면!
        // 내용,자료별 고유아이디, 할일 완료여부를 담은 자료를 객체로 저장함
        const toBeAdded ={
            todoText:todoForm.todo.value,//인풋창에 입력한 내용
            todoId:new Date().getTime(),
            todoDone: false//다 하지 않은 상태
        }
       
        todoForm.todo.value=''//입력 후 인풋창 초기화
        todoArr.push(toBeAdded)//자료배열에 새로운 자료 객체 추가
        displayTodos()//보여주기
        saveTools()//로컬스토리지에 저장   
    }
})


