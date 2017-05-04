//@flow

export type BasicDisplay = {
  width: Number, height: Number, x: Number, y: Number
}

export type ElectronDisplay = {
  bounds :BasicDisplay
}

export type Bounds = {
  x: number, y: number
}

export type DisplayProperties = {
  width: number,
  height: number,
  x: number,
  y: number
}

export type File = {
  name :string,
  path :string,
  size :number,
  type :string,
  lastModified :number
}
