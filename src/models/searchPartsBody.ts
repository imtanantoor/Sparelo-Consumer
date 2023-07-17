interface SearchPartsBody {
  category: string | number;
  brand: string | number;
  model: string | number;
  manufacturingYear: number;
  itemInPair: boolean;
  user: string;
}

export default SearchPartsBody;
