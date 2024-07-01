import { create } from 'zustand';
import { type TaxesStore, createTaxesStore } from './creator';

export const useTaxesStore = create<TaxesStore>(createTaxesStore);
