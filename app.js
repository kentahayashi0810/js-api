console.log("App.js発動");

const wikiInput = document.getElementById("js-wikipedia-input");
const wikiButton = document.getElementById("js-wikipedia-button");
const wikiBody = document.getElementById("js-wikipedia-body");

const wikiFetch = async (inputValue) => {
  const fetchValue = fetch(
    `https://ja.wikipedia.org/w/api.php?format=json&action=query&origin=*&list=search&srlimit=45&srsearch=${inputValue}`,
    {
      method: "GET",
    }
  )
    .then((value) => {
      return value.json();
    })
    .catch(() => {
      alert("Wikipediaに上手くアクセスできないようです。");
    });

  const valueJson = await fetchValue;
  const valueTargets = valueJson.query.search;

  if (!valueTargets.length) {
    const wikiNull = document.createElement("p");
    wikiNull.classList.add("p-wikipedia__null");
    wikiNull.textContent("検索したワードはヒットしませんでした。");
    wikiBody.appendChild(wikiNull);
  } else {
    console.log("キーワードヒット");
    const elemWrap = document.createElement("div");
    elemWrap.classList.add("p-wikipedia__main");

    for (const elem of valueTargets) {
      // 記事ブロック作成
      const elemBlock = document.createElement("a");
      elemBlock.classList.add("p-wikipedia__block");
      elemBlock.setAttribute("target", "_blank");
      elemBlock.setAttribute("rel", "noopener noreferrer");
      const elemId = elem.pageid;
      elemBlock.setAttribute(
        "href",
        `http://jp.wikipedia.org/?curid=${elemId}`
      );

      const elemSpan = document.createElement("span");
      elemSpan.classList.add("p-wikipedia__block-ttl");
      const elemTitle = elem.title;
      elemSpan.textContent = elemTitle;

      const elemSpan2 = document.createElement("span");
      elemSpan2.classList.add("p-wikipedia__block-date");
      const elemDate = elem.timestamp;
      const elemDateSliced = elemDate.slice(0, 10).replace(/-/g, ".");
      elemSpan2.textContent = elemDateSliced;

      elemBlock.appendChild(elemSpan);
      elemBlock.appendChild(elemSpan2);
      elemWrap.appendChild(elemBlock);
    }
    wikiBody.appendChild(elemWrap);
  }
};

const wikiData = () => {
  console.log("wikiData発動");
  wikiBody.innerHTML = "";
  const inputValue = wikiInput.value;
  wikiFetch(inputValue);
};

wikiButton.addEventListener("click", wikiData);
