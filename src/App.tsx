
import { ReactComponent as GithubLogo } from '@assets/github.svg'
import DatasetViewerExample from '@view/DatasetViewerExample'
import './App.css'

function App () {
  return (
    <div className="App">

      <div className='flex justify-between items-center pl-10 pr-10 h-10 bg-yellow-200'>
        <h1 className='font-sans text-lg'>Dataset-Viewer-Example</h1>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <GithubLogo />
        </a>
      </div>
      <div className='container mx-auto'>
        <DatasetViewerExample />
      </div>

    </div>
  )
}

export default App
