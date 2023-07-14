import { FlatList, RefreshControl } from "react-native";
import QuotationsCard from "./QuotationsCard";
import QuotationsCardModel from "../../models/QuotationsCardModel";
import ListEmptyComponent from "../global/ListEmptyComponent";
import colors from "../../constants/colors";

interface QuotationsListProps {
  data: QuotationsCardModel[]
  fetching: boolean
  error: boolean
  handleApiCall: (props?: any) => void
}

function QuotationsList({ data, fetching, error, handleApiCall }: QuotationsListProps) {
  return <FlatList
    data={data}
    style={{ backgroundColor: colors.white, flex: 1 }}
    refreshControl={<RefreshControl refreshing={fetching} onRefresh={handleApiCall} />}
    ListEmptyComponent={<ListEmptyComponent
      fetching={fetching}
      onPress={handleApiCall}
      error={error} />}
    renderItem={({ item }) => (<QuotationsCard
      {...item}
    />)}
  />
}

export default QuotationsList