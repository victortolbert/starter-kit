// Yank theme color from localStorage and use it.
document.documentElement.style.setProperty('--mainColor', localStorage.getItem('userThemeColor'))

const colorInput = document.querySelector('#choose-theme-color')

colorInput.addEventListener('change', function () {
  // Theme the site!
  document.documentElement.style.setProperty('--mainColor', this.value)

  // Save the value for next time page is visited.
  localStorage.setItem('userThemeColor', this.value)
})
