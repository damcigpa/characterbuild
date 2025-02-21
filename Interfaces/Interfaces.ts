export interface Weapon {
  id: string
  name: string
  image: string
  inputHandler: (event: React.MouseEvent) => void
  inputType: string
  formType: string
}

export type WeaponId = Pick<Weapon, 'id'>

