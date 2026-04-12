export const assets = {
  heroBackground: 'https://www.figma.com/api/mcp/asset/2c032067-2d24-4567-b3e8-93b8314cf536',
  watchImage: 'https://www.figma.com/api/mcp/asset/efb38393-6d05-42e3-bdbd-49d9c50c580f',
  homeIcon: 'https://www.figma.com/api/mcp/asset/cd652fb8-c0c4-4340-b0fd-ab57c46cacc2',
  categoryIcon: 'https://www.figma.com/api/mcp/asset/74cf0ac8-a459-4052-b743-87dee931bff0',
  registerIcon: 'https://www.figma.com/api/mcp/asset/cfd6b14c-3cb6-4eb7-99a8-5f03989fc719',
  inspectionIcon: 'https://www.figma.com/api/mcp/asset/d48c2f9f-af52-43c5-a115-5c3eb00869bf',
  heartIcon: 'https://www.figma.com/api/mcp/asset/4df025dc-4a10-4be3-aabb-72d7cd09fbbc',
  listWatchImage: 'https://www.figma.com/api/mcp/asset/e8c9af76-2653-419a-8da5-b7a65a36822d',
}

export const navigationItems = [
  { label: '홈', icon: assets.homeIcon, key: 'home', route: '/' },
  { label: '카테고리', icon: assets.categoryIcon, key: 'list', route: '/auctions' },
  { label: '경매 등록', icon: assets.registerIcon, key: 'register', route: '/register' },
  { label: '검수', icon: assets.inspectionIcon, key: 'inspection', route: '/inspection' },
]
