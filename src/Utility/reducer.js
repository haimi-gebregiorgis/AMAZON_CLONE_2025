import { Type } from "./action.type";
export const initialState = {
  basket: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      // Check if the item already exists in the basket
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (!existingItem) {
       return {
        ...state,
        basket: [...state.basket, { ...action.item, amount: 1 }], // Initialize quantity to 1
       }
      } else {
        const updatedBasket = state.basket.map((item) => {
          if (item.id === action.item.id) {
            return { ...item, amount: item.amount + 1 }; // Increment quantity
          }
          return item;
        });
        return {
          ...state,
          basket: updatedBasket,
        };
      }
    }
    case Type.REMOVE_FROM_BASKET: {
     const index = state.basket.findIndex(
        (item) => item.id === action.id
      );
      let newBasket = [...state.basket];
      if (index >= 0) {
       if(newBasket[index].amount > 1) {
          newBasket[index]={...newBasket[index],amount:newBasket[index].amount-1} // Decrement quantity
        }else {
          newBasket.splice(index, 1); // Remove item if quantity is 1
        }
        return {
          ...state,
          basket: newBasket,
        };
      } else {
        console.warn(`Can't remove product (id: ${action.id}) as it's not in the basket!`);
      }
      return {
        ...state,
        basket: newBasket,
      };
    }

    default:
      return state;
  }
};
