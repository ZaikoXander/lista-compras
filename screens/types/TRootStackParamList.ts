import type IProduct from "../ProductList/types/IProduct"

type TRootStackParamList = {
  "Lista de produtos": undefined
  "Criar/Editar produto": {
    product?: IProduct
    mode: "edit" | "create"
    updateListListener: () => void
  },
  "Lista de compras": undefined
  "Última compra": undefined
  "Histórico de compras": undefined
}

export default TRootStackParamList
