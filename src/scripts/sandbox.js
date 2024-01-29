const elem = document.querySelector('div')
const shadowRoot = elem.attachShadow({ mode: 'open' })

shadowRoot.innerHTML = `
  <style>
    p {
      /* ↓ Only styles <p>s inside the element’s Shadow DOM */
      font-family: sans-serif;
    }
  </style>
  <p>A sans-serif paragraph</p>
`
