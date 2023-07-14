import { connect } from "react-redux";
import QuotationsList from "../../../../components/organism/QuotationsList";
import actions from "../../../../store/actions";
import QuotationsCardModel from "../../../../models/QuotationsCardModel";
import { useEffect } from "react";
import QuotationsSlice from "../../../../store/slices/quotationsSlice";

interface PendingQuotationsTabProps {
  data: QuotationsCardModel[]
  fetching: boolean
  error: boolean
  success: boolean
  deleteSuccess: boolean
  deletingQuotation: boolean
  fetchPendingQuotations: (userId: string) => void
  deleteQuotation: (id: string) => void
  resetDeleteState: () => void
  user: any
}

function PendingQuotationsTab({ data, user, fetching, error, deleteSuccess, deletingQuotation, success, fetchPendingQuotations, deleteQuotation, resetDeleteState }: PendingQuotationsTabProps) {

  useEffect(() => {
    fetchPendingQuotations(user._id)
    if (deleteSuccess) {
      resetDeleteState()
    }
  }, [deleteSuccess])

  function handleDelete(id: string) {
    deleteQuotation(id)
  }

  return <QuotationsList
    data={data}
    fetching={fetching}
    error={error}
    handleApiCall={() => fetchPendingQuotations('64656e68bec729d8efdbb90a')}
    showDeleteButton
    deletingQuotation={deletingQuotation}
    onDeletePress={handleDelete}
  />
}

const mapStateToProps = (state: any) => ({
  fetching: state.Quotations.fetchingPendingQuotations,
  error: state.Quotations.fetchingPendingQuotationsFailure,
  success: state.Quotations.fetchingPendingQuotationsSuccess,
  data: state.Quotations.pendingQuotations,
  deleteSuccess: state.Quotations.deleteSuccess,
  deletingQuotation: state.Quotations.deletingQuotation,
  user: state.Auth.user,
})

const mapDispatchToProps = {
  fetchPendingQuotations: actions.fetchPendingQuotations,
  deleteQuotation: actions.deleteQuotation,
  resetDeleteState: QuotationsSlice.actions.resetDeleteState
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingQuotationsTab)