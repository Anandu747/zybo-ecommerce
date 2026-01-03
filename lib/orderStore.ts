"use client";

import { create } from "zustand";

type Order = {
  id: string;
  product: string;
  image: string;
  size: number;
  color: string;
  price: number;
  status: string;
};

type Store = {
  orders: Order[];
  addOrder: (order: Order) => void;
};

export const useOrderStore = create<Store>((set) => ({
  orders: [],
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
}));
