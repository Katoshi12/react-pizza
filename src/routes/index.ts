export const routes = {
  home: () => "/",
  cart: () => "/cart",
  profile: () => "/profile",
  pizza: (id: string | number) => `/pizza/${ id }`,
  notFound: () => "*",
}