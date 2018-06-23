var dataPath = "json/index.json"

/* load jason data */
$.getJSON(dataPath, function(data) {

  /* Add Page title */
  addToElementId("page-title", data.name);

  /* Add Breadcrumb */
  addToElementId("breadcrumb", buildBreadCrumb(data).join(""));

  /* Add Page Content */
  addToElementId("new-row", buildCatContent(data).join(""));

  /* Add copyright */
  addToElementId("copyright", buildCopyright());

});


/* add elements to DOM */
function addToElementId(selector, output) {
  document.getElementById(selector).innerHTML = output;
}

/* Build category page contents */
function buildCatContent(data) {


  var items = [];
  items.push("<div class='row'>");
  for (i = 0; i < Object.keys(data.groups).length; i++) {
    //altImages = buildAltImages(data.groups[1]).join("");

    if (i % 3 == 0 && i != 0) {
      items.push("</div><div class='row'>");
    }
    items.push("<div class='col-md-4'> " +
      "<div itemscope itemtype='http://schema.org/Product' class='card text-center' id=" +
      data.groups[i].id + " >" +
      "<img class='card-img-top img-fluid' src='" +
      data.groups[i].hero.href + "' alt='" +
      data.groups[i].name + "'>" +
      "<div class='row'><div class='col-3'>" +
      " <img class='thumbnail img-fluid' class='img-fluid' src='" +
      data.groups[i].thumbnail.href + "' alt='" +
      data.groups[i].thumbnail.rel + "'></div>" +
      buildAltImages(data.groups[i]).join("") +
      "</div>" +
      "<div class='card-body'>" +
      "<h3 itemprop='name' class='h6 card-title' id='product" + i + "'>" +
      data.groups[i].name +
      "</h3><p itemprop='price' class='card-text'> " +
      "<span itemprop='offers' itemscope itemtype='http://schema.org/AggregateOffer' > "+
      "<span itemprop='lowPrice'>$" +
      data.groups[i].priceRange.selling.low +
      "</span>-" + "<span itemprop='highPrice'>$" +
      data.groups[i].priceRange.selling.high + "</span></span></p>" +
      "<a class='btn btn-secondary' href=" +
      data.groups[i].links.www +
      " role='button'>View details »</a></div>" +
      "</div></div>");
  }
  items.push("</div>");
  return items;
}

/* Build thumbnails */
function buildAltImages(product) {

  var imageCollect = [];

  for (j = 0; j < Object.keys(product.images).length; j++) {
    imageCollect.push("<div class='col-3'><img class='thumbnail img-fluid' src='" +
      product.images[j].href + "' alt='" +
      product.images[j].rel + "'></div>");
  }

  return imageCollect;
}

/* Build breadcrumb */
function buildBreadCrumb(data) {

  var url = data.id.split('/');

  var items = [];

  for (i = 0; i < url.length; i++) {

    urlPath = []
    for (j = 0; j <= i; j++) {
      urlPath.push(url[j] + "/");
    }

    if (i + 1 == url.length) {
      items.push("<li class='breadcrumb-item active' aria-current='page'>" +
        url[i] + "</li>");
    } else {
      items.push("<li class='breadcrumb-item'><a href=/" +
        urlPath.join("") + ">" + url[i] + "</a></li>");
    }
  }
  return items;
}

/* Build copyright */
function buildCopyright() {
  var d = new Date();
  var year = d.getFullYear();
  return "&copy; West Elm " + year;
}

/* Function to make all elements of a class the same height */
function setHeight(selectorName) {
  var maxHeight = 0;
  $(selectorName).each(function() {
    maxHeight = parseFloat($(this).outerHeight()) > maxHeight ? parseFloat($(this).outerHeight()) : maxHeight;
  });
  $(selectorName).height(maxHeight); // Set max height for all elements
}

/* Ensure headings on content blocks have the same height */
window.onload = setHeight(function() {
  setHeight('.card-title')
});

/* Ensure headings on content blocks have the same height */
$(window).resize(function() {
  setHeight('.card-title')
});

/* make category thumbnail images appear in main iamge area */
$(document).on('click', '.thumbnail', function() {
  var parent_id = $(this).parents('.text-center').attr('id');
  var src = $(this).attr("src");
  $("#" + parent_id + " .card-img-top").attr("src", src);
});
