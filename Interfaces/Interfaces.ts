export interface Weapon {
  id: number
  name: string
  image: string
  inputHandler: (event: React.MouseEvent) => void
  inputType: string
  formType: string
}

export type WeaponId = Pick<Weapon, 'id'>

export type Item = Pick<Weapon, 'name' | 'image' | 'id'> 

export interface CharacterInterface {
  id: number
  name: string
  image: string
  likes: number
  dexterity: number
  weapons: Item[]
  armors: Item[]
  talismans: Item[]
  sorceries: Item[]
  incantations: Item[]
}

