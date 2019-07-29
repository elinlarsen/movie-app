export default function filterBy(search, list, by) {
    let res;
    let searchLC = search.toLowerCase();
    search !== null
      ? (res = list.filter(item =>
          item[by]
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(searchLC)
        ))
      : (res = list);
    return res;
  }