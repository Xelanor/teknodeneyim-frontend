const isProfane = (list, string) => {
  return list.includes(string)
}

const replaceWord = (string) => {
  let len = string.length
  return "*".repeat(len)
}

const FilterBadwords = (list, string) => {
  return string.split(/(\s+)/).map((word) => {
    return isProfane(list, word) ? replaceWord(word) : word;
  }).join('');
}

export default FilterBadwords;