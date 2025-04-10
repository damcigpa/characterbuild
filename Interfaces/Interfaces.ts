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
  comments: Comment[]
  userLiked: boolean
}

export interface Comment {
  id: number
  userId: number
  comment: string
  characterId: number
  commenter: Commenter
}

interface Commenter {
  id: number
  name: string
}
export type CharacterTestInterface = Pick<
  CharacterInterface,
  'id' | 'name' | 'image' | 'likes' | 'dexterity'
>
