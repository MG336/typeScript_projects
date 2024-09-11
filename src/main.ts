import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import * as variables from './projects/typing_of_variables.ts';
import './projects/interface.ts'
import './projects/functions_with_types.ts'
import './projects/use_union_type.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <h1>TypeScript Project</h1>
    <section>
      <h2>Typing of variables</h2>
      <p>${variables.userName}</p>
      <p>${variables.number}</p>
      <p>${variables.id}</p>
    </section>
  
  `


    


// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
