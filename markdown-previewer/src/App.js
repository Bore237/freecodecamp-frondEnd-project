import './App.css';
import Editor from './component/Editor';
import Previewer from './component/Previewer';
import markdownText from './component/Editor'

function App() {
 
  return (
    <div className="App">
       <Editor
        iconTitle = "bi:fire"
        titleName = "Editor"
        moveIcon = "fa:arrows-alt"
        markdownText = {markdownText}
       />
        <Previewer
          iconTitle = "bi:fire"
          titleName = "Previewer"
          moveIcon = "fa:arrows-alt"
          markdownText = {markdownText}
       />
    </div>
  );
}

export default App;
