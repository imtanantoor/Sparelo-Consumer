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
    fetchApprovedQuotations(user._id)
  }, [deleteSuccess])

  return <QuotationsList
    data={data}
    fetching={fetching}
    error={error}
    handleApiCall={() => fetchApprovedQuotations(user._id)}
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