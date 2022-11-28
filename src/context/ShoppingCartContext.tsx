import React, { createContext, ReactNode, useContext, useState } from "react"
import ShoppingCart from "../components/ShoppingCart"

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

// Ad to cart + increment / decrement / remove
type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  // Ouvrir / fermer le store
  const [isOpen, setIsOpen] = useState(false)
  //sotre all cart information
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0,
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  // Si ça retourne qqchose afficher quantité sinon afficher 0 si on a rien
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }
  // Vérifier si on a pas d'item si il y en a pas il faut l'ajouter au panier
  function increaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
        // si l'item existe => incrément de 1
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  // Vérifier si la quantité = 1 si oui => possibilité de retirer 1 qté du panier
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
        // si l'item existe => décrément de 1
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  // Supprimer le panier
  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}
