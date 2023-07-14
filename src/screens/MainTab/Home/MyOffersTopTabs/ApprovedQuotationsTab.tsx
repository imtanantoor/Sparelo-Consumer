import { connect } from "react-redux";
import QuotationsList from "../../../../components/organism/QuotationsList";
import actions from "../../../../store/actions";
import QuotationsCardModel from "../../../../models/QuotationsCardModel";
import { useEffect } from "react";

interface ApprovedQuotationsTabProps {
  data: QuotationsCardModel[]
  fetching: boolean
  error: boolean
  success: boolean
  deleteSuccess: boolean
  fetchApprovedQuotations: (userId: string) => void
  user: any
}

function ApprovedQuotationsTab({ data, user, fetching, error, deleteSuccess, success, fetchApprovedQuotations }: ApprovedQuotationsTabProps) {

  useEffect(() => {
    // fetchCancelledQuotations(user._id)
    fetchApprovedQuotations('64656e68bec729d8efdbb90a')
  }, [deleteSuccess])

  return <QuotationsList
    data={data}
    fetching={fetching}
    error={error}
    handleApiCall={() => fetchApprovedQuotations('64656e68bec729d8efdbb90a')}
  />
}

const mapStateToProps = (state: any) => ({
  fetching: state.Quotations.fetchingApprovedQuotations,
  error: state.Quotations.fetchingApprovedQuotationsFailure,
  success: state.Quotations.fetchingApprovedQuotationsSuccess,
  data: state.Quotations.approvedQuotations,
  deleteSuccess: state.Quotations.deleteSuccess,
  user: state.Auth.user,
})

const mapDispatchToProps = {
  fetchApprovedQuotations: actions.fetchApprovedQuotations
}

export default connect(mapStateToProps, mapDispatchToProps)(ApprovedQuotationsTab)