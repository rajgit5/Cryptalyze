import { combineReducers } from "redux";
import { themeReducer } from "./ThemeSlice";
import { currencyReducer } from "./CurrencySlice";
const rootReducer = combineReducers({
  theme: themeReducer,
  currency: currencyReducer,
});

export default rootReducer;
