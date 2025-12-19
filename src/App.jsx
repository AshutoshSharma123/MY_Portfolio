import { Navbar,Welcome ,Dock} from "#components"
import Terminal from "#windows";
import gsap from "gsap";
import { Draggable } from "gsap/all"
gsap.registerPlugin(Draggable)
const App = () => {
  return (
<>
<Navbar />
<Welcome />
<Dock />

<Terminal />
</>
  )
}

export default App