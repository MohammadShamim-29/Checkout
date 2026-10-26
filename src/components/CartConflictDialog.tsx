import { useApp } from '../context/AppContext'
import { Modal } from './Modal'

export function CartConflictDialog() {
  const { pendingAdd, cartRestaurant, confirmPendingAdd, cancelPendingAdd } =
    useApp()

  if (!pendingAdd || !cartRestaurant) return null

  return (
    <Modal
      open
      onClose={cancelPendingAdd}
      title="Start a new cart?"
      description={`Your cart currently has items from ${cartRestaurant.name}.`}
      footer={
        <>
          <button
            type="button"
            className="button button--secondary"
            onClick={cancelPendingAdd}
          >
            Keep current cart
          </button>
          <button
            type="button"
            className="button button--primary"
            onClick={confirmPendingAdd}
            data-autofocus
          >
            Start new cart
          </button>
        </>
      }
    >
      <div className="conflict-card">
        <img src={pendingAdd.item.image} alt="" />
        <div>
          <strong>{pendingAdd.item.name}</strong>
          <span>
            from {pendingAdd.restaurant.name} · {pendingAdd.quantity} × ৳
            {pendingAdd.item.price}
          </span>
        </div>
      </div>
      <p className="modal-copy">
        A Pathao Food cart is limited to one restaurant at a time. Starting a
        new cart will remove the items from {cartRestaurant.name}.
      </p>
    </Modal>
  )
}
