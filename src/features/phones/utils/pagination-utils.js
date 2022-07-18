export function paginate(array, pageSize, pageNumber) {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

export function getTotalPages(total, limit) {
  return Math.ceil(total / limit);
}
