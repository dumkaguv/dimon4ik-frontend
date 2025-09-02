export type UserDocument = {
  documentId: number
  type: 'FRONT' | 'BACK'
  fileUrl: string
  createdAt: string
  updatedAt: string
}
