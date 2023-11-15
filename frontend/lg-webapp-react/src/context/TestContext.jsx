import { createContext, useReducer } from 'react';

const TableContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  // clearTable: () => {},
});

function tableReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingTableItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingTableItemIndex > -1) {
      const existingItem = state.items[existingTableItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingTableItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingTableItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingTableItem = state.items[existingTableItemIndex];

    const updatedItems = [...state.items];

    if (existingTableItem.quantity === 1) {
      updatedItems.splice(existingTableItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingTableItem,
        quantity: existingTableItem.quantity - 1,
      };
      updatedItems[existingTableItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
}

export function TableContextProvider({ children }) {
  const [table, dispatchTableAction] = useReducer(tableReducer, { items: [] });

  function addItem(item) {
    dispatchTableAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchTableAction({ type: 'REMOVE_ITEM', id });
  }

  function clearCart() {
    dispatchTableAction({ type: 'CLEAR_CART' });
  }

  const tableContext = {
    items: table.items,
    addItem,
    removeItem,
    clearCart
  };

  return (
    <TableContext.Provider value={tableContext}>{children}</TableContext.Provider>
  );
}

export default TableContext;