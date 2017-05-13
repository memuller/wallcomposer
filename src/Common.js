//@flow

export type BasicDisplay = {
  width: number, height: number, x: number, y: number
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

export type Bitmap = {
  data :Array<any>,
  height: number,
  width: number
}

export type Image = {
  bitmap :Bitmap,
  _originalMime: string,
  getBase64: function,
  getBuffer: function
}

export type Message = {
  kind: string,
  text: string
}
