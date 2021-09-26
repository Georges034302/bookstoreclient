import './App.css';
import BookListView from './components/BookList';
import HeaderBarView from './components/HeaderBar';
import AddBookView from './components/AddBook';

function App() {
  return (
    <div className="App" >
      <HeaderBarView/>
      <BookListView />
      <AddBookView/>
    </div>
    );
}

export default App;