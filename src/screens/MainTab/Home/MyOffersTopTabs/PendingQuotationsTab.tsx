import { connect } from "react-redux";
import QuotationsList from "../../../../components/organism/QuotationsList";
import actions from "../../../../store/actions";
import QuotationsCardModel from "../../../../models/QuotationsCardModel";
import { useEffect } from "react";

interface PendingQuotationsTabProps {
  data: QuotationsCardModel[]
  fetching: boolean
  error: boolean
  success: boolean
  fetchPendingQuotations: (userId: string) => void
  user: any
}

function PendingQuotationsTab({ data, user, fetching, error, success, fetchPendingQuotations }: PendingQuotationsTabProps) {

  useEffect(() => {
    // fetchCancelledQuotations(user._id)
    fetchPendingQuotations('64656e68bec729d8efdbb90a')
  }, [])
  return <QuotationsList
    data={data}
    fetching={fetching}
    error={error}
    handleApiCall={() => fetchPendingQuotations('64656e68bec729d8efdbb90a')}
  />
}

const mapStateToProps = (state: any) => ({
  fetching: state.Quotations.fetchingPendingQuotations,
  error: state.Quotations.fetchingPendingQuotationsFailure,
  success: state.Quotations.fetchingPendingQuotationsSuccess,
  data: state.Quotations.pendingQuotations,
  user: state.Auth.user,
})

const mapDispatchToProps = {
  fetchPendingQuotations: actions.fetchPendingQuotations
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingQuotationsTab)