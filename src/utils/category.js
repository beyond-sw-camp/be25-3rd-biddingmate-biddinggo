const FALLBACK_CATEGORIES = [
  { id: 10, parentId: null, name: '시계', level: 1, hasChildren: true, selectable: false },
  { id: 11, parentId: 10, name: '명품 시계', level: 2, hasChildren: true, selectable: false },
  { id: 12, parentId: 11, name: '남성용 시계', level: 3, hasChildren: false, selectable: true },
  { id: 20, parentId: null, name: '가방', level: 1, hasChildren: true, selectable: false },
  { id: 21, parentId: 20, name: '럭셔리 백', level: 2, hasChildren: true, selectable: false },
  { id: 22, parentId: 21, name: '토트백', level: 3, hasChildren: false, selectable: true },
]

export function getFallbackCategories() {
  return FALLBACK_CATEGORIES
}

export function buildCategoryGroups(categories = [], selectedCategoryId = null) {
  const rows = categories.length ? categories : FALLBACK_CATEGORIES
  const selectedId = Number(selectedCategoryId)

  return rows.map((category) => ({
    id: Number(category.id),
    label: category.name,
    indent: Math.max(Number(category.level || 1) - 1, 0),
    active: Number(category.id) === selectedId,
    selectable: category.selectable === true || category.hasChildren === false || Number(category.level) === 3,
  }))
}

export function buildLeafCategoryOptions(categories = []) {
  const rows = categories.length ? categories : FALLBACK_CATEGORIES
  const byId = new Map(rows.map((category) => [Number(category.id), category]))

  return rows
    .filter((category) => category.selectable === true || category.hasChildren === false || Number(category.level) === 3)
    .map((category) => ({
      id: Number(category.id),
      label: buildCategoryPathLabel(category, byId),
    }))
    .sort((left, right) => left.label.localeCompare(right.label, 'ko'))
}

function buildCategoryPathLabel(category, byId) {
  const names = []
  let current = category

  while (current) {
    names.unshift(current.name)

    if (!current.parentId) {
      break
    }

    current = byId.get(Number(current.parentId)) || null
  }

  return names.join(' > ')
}
