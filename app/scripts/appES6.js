class Book{

  constructor(title,author,isbn){
    this.title=title;
    this.author=author;
    this.isbn=isbn;
  }

  
}

class Storage{
  
  static getBook(){
    let bookArr;
    if(localStorage.getItem('books')===null){
      bookArr=[];
    }else{
      bookArr=JSON.parse(localStorage.getItem('books'))
    }
      return bookArr;

  }
  static addBook(book){
    const bookArr=Storage.getBook();
    bookArr.push(book);
    console.log(bookArr);
    localStorage.setItem('books',JSON.stringify(bookArr));



  }

  static displayBook(){
   let books=Storage.getBook();
   books.forEach(element => {

      const list= document.getElementById('book-list');
      const row= document.createElement('tr');

      row.innerHTML=`
        <td>${element.title}</td>
        <td>${element.author}</td>
        <td>${element.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
      `
        list.appendChild(row);
      });
  }

  static removeBook(e){
    console.log(e.target.parentElement.parentElement)
  }
}

class UI{
  addBookList(book){
    const list= document.getElementById('book-list');
    const row= document.createElement('tr');

    row.innerHTML=`
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X</a></td>
    `
      list.appendChild(row);

      Storage.addBook(book);

  }

  showAlert(msg,clas){
    
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

  deleteItem(e){
    if(confirm('Want to delete book')){
      if(e.target.className==='delete')
      e.target.parentElement.parentElement.remove();
      
    }
  }

  clearField(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
  }

}


Storage.displayBook();


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