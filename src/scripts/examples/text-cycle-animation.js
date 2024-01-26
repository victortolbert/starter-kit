// setup colour change
$('.text-fader .text-content .colour').each(function () {
  const textSplit = $(this).text().split('')
  let returnHTML = ''

  $.each(textSplit, (intIndex, objValue) => {
    returnHTML += `<span class="letter">${objValue}</span>`
  })

  $(this).html(returnHTML)
})

$('.text-fader .text-content:first-child').addClass('in')

const textFaderDelay = 6000
const textFaderAnimationSpeed = 1000
const colourChangeDelay = 2000

function nextText($current) {
  let hasNext

  if ($current.next('.text-fader .text-content').length > 0)
    hasNext = true
  else
    hasNext = false

  setTimeout(() => {
    $current.find('.colour').addClass('go')
  }, colourChangeDelay)

  setTimeout(() => {
    $current.removeClass('in').addClass('out')

    setTimeout(() => {
      $current.find('.colour').removeClass('go')
      $current.removeClass('out')

      if (hasNext)
        $current.next('.text-fader .text-content').addClass('in')
      else
        $('.text-fader .text-content:first-child').addClass('in')

      nextText($('.text-fader .text-content.in'))
    }, textFaderAnimationSpeed)
  }, textFaderDelay)
}

nextText($('.text-fader .text-content.in'))
