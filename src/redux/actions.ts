export const SET_DATA = 'SET_DATA';

export interface DataItem {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: { customer: string; review: string; score: number }[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
  }[];
}

interface SetDataAction {
  type: typeof SET_DATA;
  payload: DataItem[];
}

export type ActionTypes = SetDataAction;

export const setData = (data: DataItem[]): ActionTypes => ({
  type: SET_DATA,
  payload: data,
});
