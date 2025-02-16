export interface Weapon {
  id: string
  name: string
  image: string
  inputHandler: (event: React.MouseEvent) => void
}
