import { connect } from "react-redux";
import QuotationsList from "../../../../components/organism/QuotationsList";
import actions from "../../../../store/actions";
import QuotationsCardModel from "../../../../models/QuotationsCardModel";
import { useEffect } from "react";

interface CancelledQuotationsTabProps {
  data: QuotationsCardModel[]
  fetching: boolean
  error: boolean
  success: boolean
  fetchCancelledQuotations: (userId: string) => void
  user: any
}

function CancelledQuotationsTab({ data, user, fetching, error, success, fetchCancelledQuotations }: CancelledQuotationsTabProps) {

  useEffect(() => {
    // fetchCancelledQuotations(user._id)
    fetchCancelledQuotations('64656e68bec729d8efdbb90a')
  }, [])
  return <QuotationsList
    data={data}
    fetching={fetching}
    error={error}
    handleApiCall={() => fetchCancelledQuotations('64656e68bec729d8efdbb90a')}
  />
}

const mapStateToProps = (state: any) => ({
  fetching: state.Quotations.fetchingCancelledQuotations,
  error: state.Quotations.fetchingCancelledQuotationsFailure,
  success: state.Quotations.fetchingCancelledQuotationsSuccess,
  data: state.Quotations.cancelledQuotations,
  user: state.Auth.user,
})

const mapDispatchToProps = {
  fetchCancelledQuotations: actions.fetchCancelledQuotations
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelledQuotationsTab)