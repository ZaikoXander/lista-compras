export default function formatPrice(price: string): string {
  return price.replace('.', ',')
}
