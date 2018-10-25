// Book constructor

function Book(title,author,isbn){
  this.title=title;
  this.author=author;
  this.isbn=isbn;
}

// UI constructor

function UI(){

  // this.addBookList=function(book){
  //   const list= document.getElementById('book-list');
  //   const row= document.createElement('tr');
    
  //   row.innerHTML=`
  //     <td>${book.title}</td>
  //     <td>${book.author}</td>
  //     <td>${book.isbn}</td>
  //     <td><a href="#" class="delete">X</a></td>
  //   `
  //     list.appendChild(row);
  //   }

}


UI.prototype.addBookList=function(book){
const list= document.getElementById('book-list');
const row= document.createElement('tr');

row.innerHTML=`
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
`
  list.appendChild(row);
}

UI.prototype.showAlert=function(msg,clas){

const div = document.createElement('div');
div.className=`alert ${clas}`;
div.innerHTML=msg;

const container= document.querySelector('.container')
const boookform=document.querySelector('#book-form')

container.insertBefore(div,boookform);

setTimeout(function(){
  document.querySelector('.alert').remove();
},2000);

}



UI.prototype.clearField=function(){
  document.getElementById('title').value='';
  document.getElementById('author').value='';
  document.getElementById('isbn').value='';
}
//Event Listener

UI.prototype.deleteItem=function(e){
if(confirm('Want to delete book')){
  if(e.target.className==='delete')
  e.target.parentElement.parentElement.remove()
}
  
}
document.getElementById('book-form').addEventListener('submit',function(e){

  // Get form values

  const title=document.getElementById('title').value,
        author=document.getElementById('author').value,
        isbn=document.getElementById('isbn').value;

  // Instantiate book

  const book = new Book(title,author,isbn);

  const ui= new UI();

  // validate

  if(title===''|| author===''||isbn===''){
    ui.showAlert('Please fill in all details','error')
  }else{
    ui.addBookList(book);
    ui.showAlert(`Book added to list`,'success');
    

  }

  ui.clearField();
  
  e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click',function(e){
 const ui = new UI();
 ui.deleteItem(e);

 ui.showAlert('Book deleted ','success');

});