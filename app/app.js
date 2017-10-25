$('#search').on('submit', function (e) {
  e.preventDefault()
  var query = $(this).find('input').val()

  $.ajax({
    url: 'https://quiet-inlet-67115.herokuapp.com/api/search/all?q=' + query
  })
  .then(function (beerList) {
    console.log(beerList)
    var contentSelect = ''
    beerList.forEach (function (beer) {
      contentSelect += '<li data-id="' + beer.id + '">'
      contentSelect += beer.name
      contentSelect += '</li>'
    })
    $('#beerList ul').html(contentSelect)
    $('#beerList').removeClass('hidden')
    $('#beerInfo').addClass('hidden')
  })
})

$('#beerList ul').on('click', 'li', function () {
  var beerSelected = $(this).data('id')
  $.ajax({
    url: 'https://quiet-inlet-67115.herokuapp.com/api/beer/' + beerSelected
  })
  .then(function (beersInfo) {
    var defaultImage = 'img/images.jpeg'
    var beerImage = beersInfo.labels && beersInfo.labels.medium && beersInfo.labels.medium || defaultImage
    var name = beersInfo.name
    var content = beersInfo.style.description
    $('#beerThumbnail .thumbnail img').attr('src', beerImage)
    $('.caption h3').html(name)
    $('.caption p').html(content)
    $('#beerInfo').removeClass('hidden')
  })
})
