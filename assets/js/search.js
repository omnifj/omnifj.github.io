(function () {
  var input = document.getElementById("search-input");
  var results = document.getElementById("search-results");
  var empty = document.getElementById("search-empty");
  var count = document.getElementById("search-count");
  var posts = [];

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function pad(num) {
    return num < 10 ? "0" + num : "" + num;
  }

  function render(list) {
    if (!input.value.trim()) {
      results.innerHTML = "";
      empty.hidden = true;
      count.textContent = "";
      return;
    }

    empty.hidden = list.length > 0;
    count.textContent = list.length + " RESULTS";

    results.innerHTML = list
      .map(function (post, index) {
        var meta =
          "<time>" +
          escapeHtml(post.date) +
          "</time>" +
          (post.categories.length
            ? "<span>/</span><span>" + escapeHtml(post.categories[0]) + "</span>"
            : "") +
          "<span>/</span><span>" +
          post.readingTime +
          " MIN READ</span>";

        return (
          '<article class="post-row">' +
          '<a href="' +
          post.permalink +
          '" class="post-row-link" aria-label="阅读全文：' +
          escapeHtml(post.title) +
          '"></a>' +
          '<div class="post-row-index" aria-hidden="true">' +
          pad(index + 1) +
          "</div>" +
          '<div class="post-row-body">' +
          '<div class="post-row-meta">' +
          meta +
          "</div>" +
          "<h3><a href=\"" +
          post.permalink +
          '">' +
          escapeHtml(post.title) +
          "</a></h3>" +
          (post.summary ? "<p>" + escapeHtml(post.summary) + "</p>" : "") +
          "</div>" +
          '<span class="post-row-arrow" aria-hidden="true">↗</span>' +
          "</article>"
        );
      })
      .join("");
  }

  function search(query) {
    var q = query.trim().toLowerCase();
    if (!q) {
      render([]);
      return;
    }

    var list = posts.filter(function (post) {
      return (
        post.title.toLowerCase().indexOf(q) !== -1 ||
        post.summary.toLowerCase().indexOf(q) !== -1 ||
        post.content.toLowerCase().indexOf(q) !== -1 ||
        post.tags.join(" ").toLowerCase().indexOf(q) !== -1 ||
        post.categories.join(" ").toLowerCase().indexOf(q) !== -1
      );
    });

    render(list);
  }

  fetch("/index.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      posts = data;
      input.disabled = false;
      var params = new URLSearchParams(window.location.search);
      if (params.get("q")) {
        input.value = params.get("q");
        search(input.value);
      }
    })
    .catch(function () {
      empty.hidden = false;
      empty.textContent = "搜索索引加载失败。";
    });

  var timer;
  input.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      search(input.value);
    }, 150);
  });
})();
