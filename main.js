const lists = [
    {
      title: 'sprint',
      tasks: [
        {description: "create the app for android", date: new Date().toLocaleDateString()},
        {description: "create with electron js", date: new Date().toLocaleDateString()}
      ],
    },
    {
      title: 'todo',
      tasks: [
        {description: "project to angular with kadkhodaei", date: new Date().toLocaleDateString()},
        {description: "fill the input", date: new Date().toLocaleDateString()}
      ],
    },
    {
      title: 'doing',
      tasks: [
        {description: "validation from with js", date: new Date().toLocaleDateString()},
        {description: "create the library for react", date: new Date().toLocaleDateString()}
      ],
    },
  ]
  
  function loadListsData(){
    const container = document.getElementById('lists')
    let htmlString = lists.map((list,index) => {
      return (
        `
        <div class='list'>
        <button class="delete-list" onclick="deleteList(${index})">✖</button>
          <h1 class="list-header"><input class="input-header" placeholder="please type topic..." value="${list.title}" onchange="changeTitle(event,${index})" /></h1>
         <div class="list-ul" ondrop="drop(event)" ondragover="allowDrop(event)" id="drag${index}"> ${loadTasks(list.tasks, index)}</div>
          <hr>
          <input class="task-input" id="input${index}" type="text" placeholder="please type task...">
          <button class="add-card" onclick="addTask(${index})">Add Card</button>
        </div>
        `
      )
    })
    htmlString = htmlString.join('') + `<button class="add-list-button list-dimension" onclick="addList()">Add a list...</button>`
    container.innerHTML = htmlString
  }
  
  function changeTitle(e,i){
      lists[i].title = e.target.value
      console.log(lists)
      loadListsData()
  }
  
  function loadTasks(tasks, j){
    return `
      <ul>
      ${tasks.map((task,index) => {
        return ` <li class="list-item" draggable="true" ondrop="drop(event)" ondragover="allowDrop(event)" ondragstart="drag(event)" id="drag${tasks}"><button class="delete-task" onclick="deletetask(${j},${index})">✖</button>${task.description}<div class="card__data">${task.date}</div></li>`
      }).join('')}
      </ul>
    `
  }
  
  function addList(){
    lists.push({title: '', tasks: []})
    loadListsData()
  }
  
  function addTask(i){
    const input = document.getElementsByClassName('task-input')[i]
    const task = {description: input.value, date: new Date().toLocaleDateString()}
    if(input.value == ''){
      alert('plase fill input...')
      return false;
    }
    lists[i].tasks.push(task);
    loadListsData()
  }
  
  function deleteList(i){
    lists.splice(i,1)
    loadListsData()
  }
  
  function deletetask(j, i){
    lists[j].tasks.splice(i,1);
    loadListsData();
  }
  
  
  
  
  //Drag & Drop
  
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  
  }
  
  loadListsData()