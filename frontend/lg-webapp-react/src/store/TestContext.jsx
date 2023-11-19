import { createContext, useReducer } from 'react';

const TestContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  // clearTest: () => {},
});

function TestReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const existingTestItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (existingTestItemIndex > -1) {
      const existingItem = state.items[existingTestItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingTestItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'REMOVE_ITEM') {
    const existingTestItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingTestItem = state.items[existingTestItemIndex];

    const updatedItems = [...state.items];

    if (existingTestItem.quantity === 1) {
      updatedItems.splice(existingTestItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingTestItem,
        quantity: existingTestItem.quantity - 1,
      };
      updatedItems[existingTestItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === 'CLEAR_CART') {
    return { ...state, items: [] };
  }

  return state;
}

export function TestContextProvider({ children }) {
  const [test, dispatchTestAction] = useReducer(testReducer, { items: [] });

  function addItem(item) {
    dispatchTestAction({ type: 'ADD_ITEM', item });
  }

  function removeItem(id) {
    dispatchTestAction({ type: 'REMOVE_ITEM', id });
  }

  function clearCart() {
    dispatchTestAction({ type: 'CLEAR_CART' });
  }

  const testContext = {
    items: test.items,
    addItem,
    removeItem,
    clearCart
  };

  return (
    <TestContext.Provider value={testContext}>{children}</TestContext.Provider>
  );
}

export default TestContext;